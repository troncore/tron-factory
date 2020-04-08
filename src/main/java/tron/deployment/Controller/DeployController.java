package tron.deployment.Controller;

import static common.LogConfig.LOG;
import static common.Util.parseConfig;
import static common.Util.readJsonFile;

import com.typesafe.config.Config;
import common.Args;
import common.Common;
import config.BlockSettingConfig;
import config.ConfigGenerator;
//import config.DBConfig;
import config.P2PVersion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import response.ResultCode;
import common.Util;
import wallet.Wallet;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Objects;

import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;
import org.tron.keystore.CipherException;
import response.Response;
import tron.deployment.shellExecutor.BashExecutor;


@CrossOrigin
@RestController
@Component
@RequestMapping(value = "/")
@Slf4j
public class DeployController {
    protected static final Logger logger = LoggerFactory.getLogger("DeployController");
    String[] portOccupied = null;
    private String checkNodeStatus(String path) {
        File file = new File(path);
        if (file.isFile() && file.exists()) {
            try {
                InputStreamReader read = new InputStreamReader(
                        new FileInputStream(file), Common.encoding);
                BufferedReader bufferedReader = new BufferedReader(read);
                String lineTxt;

                while ((lineTxt = bufferedReader.readLine()) != null) {
                    if (lineTxt.contains(Common.deploySuccessStatus)) {
                        return Common.deploySuccessStatus;
                    }
                }
                bufferedReader.close();
                read.close();

            } catch (Exception e) {
                LOG.error(e.toString());
            }
        } else {
            return Common.notFoundStatus;
        }
        return Common.deployFailedStatus;
    }
//查询节点是否部署成功
    private String checkIsDeployed(String path) {
        boolean isDeployed = true;
        File file = new File(path);
        if (file.isFile() && file.exists()) {
            try {
                InputStreamReader read = new InputStreamReader(
                        new FileInputStream(file), Common.encoding);
                BufferedReader bufferedReader = new BufferedReader(read);
                String lineTxt;

                while ((lineTxt = bufferedReader.readLine()) != null) {
                    if (lineTxt.contains(Common.pid)) {
                        String[] logArray = lineTxt.split(" ");
                        for(int i=0;i<logArray.length;i++){
                            if(logArray[i].equals("")){
                                isDeployed = false;
                                break;
                            }
                        }
                        if(isDeployed){
                            return Common.deployFinishStatus;
                        }
                    }
                    if(lineTxt.contains(Common.expectIsNotInstalled)){
                        return Common.expectIsNotInstalled;
                    }
                    if (lineTxt.contains(Common.connectFailedStatus)) {
                        return Common.connectFailedStatus;
                    }
                    if(lineTxt.contains(Common.canNotFindZip)){
                        return Common.canNotFindZip;
                    }
                    if(lineTxt.contains(Common.portIsOccupied)){
                        portOccupied = lineTxt.split("]");
                        return Common.portIsOccupied;
                    }

                }

                bufferedReader.close();
                read.close();

            } catch (Exception e) {
                LOG.error(e.toString());
            }
        } else {
            return Common.notFoundStatus;
        }
        return Common.deployFailedStatus;
    }
//	private boolean isBlockNeedSync(JSONArray nodes, Long id) {
//		for (int i = 0; i< nodes.size(); i++) {
//			JSONObject node = (JSONObject) nodes.get(i);
//			Long nodeID = (Long) node.get(Common.idFiled);
//			if (id.compareTo(nodeID) > 0) {
//				return true;
//			}
//		}
//		return false;
//	}
//校验zip包路径是否正确
    private String checkZipPath(String path) {
        File file = new File(path);
        if (file.isFile() && file.exists()) {
            try {
                InputStreamReader read = new InputStreamReader(
                        new FileInputStream(file), Common.encoding);
                BufferedReader bufferedReader = new BufferedReader(read);
                String lineTxt;

                while ((lineTxt = bufferedReader.readLine()) != null) {
                    if (lineTxt.contains(Common.canNotFindZip)) {
                        return Common.canNotFindZip;
                    }
                    if(lineTxt.contains((Common.findZip))){
                        return Common.findZip;
                    }
                }
                bufferedReader.close();
                read.close();

            } catch (Exception e) {
                LOG.error(e.toString());
            }
        } else {
            return Common.notFoundStatus;
        }
        return Common.connectFailedStatus;
    }

    @GetMapping(value = "/api/checkNode")
    public JSONObject checkDeployStatus() {
        boolean isDeployed = true;
        JSONObject json = readJsonFile();
        JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);

        for (int i = 0; i < nodes.size(); i++) {
            JSONObject node = (JSONObject) nodes.get(i);
            Long id = (Long) node.get(Common.idFiled);
            String status = checkNodeStatus(String.format(Common.logFormat, id.toString()));
            if(status.equals(Common.deployFailStatus)) isDeployed = false;
        }
        return new Response(ResultCode.OK.code, isDeployed).toJSONObject();

    }

    @GetMapping(value = "/api/checkConfig")
    public JSONObject checkConfigStatus() {
        JSONObject json = readJsonFile();
        Long configStatus = (Long) json.get(Common.configStatusFiled);
        JSONObject statusObj = new JSONObject();
        statusObj.put("status",configStatus);
        return new Response(ResultCode.OK.code, statusObj).toJSONObject();
    }

    @GetMapping(value = "/api/deployNode")
    public JSONObject deploy(@RequestParam(value = "filePath", required = true, defaultValue = "") String filePath) {

        //获取配置文件中各端口号，便于校验端口是否冲突
        String fullNodePort = "null";
        String solidityPort = "null";
        String listenPort = "18889";
        String rpcPort = "50051";
        String rpcsolidityPort = "50061";

        boolean isfullNodeEnable = false;
        boolean issolidityEnable = false;
        parseConfig();
        if (Util.config.hasPath("node.http.fullNodeEnable")) {
            isfullNodeEnable = Util.config.getBoolean("node.http.fullNodeEnable");
            if(isfullNodeEnable){
                if (Util.config.hasPath("node.http.fullNodePort")) {
                    fullNodePort =Util.config.getString("node.http.fullNodePort");
                }
            }
        }
        if (Util.config.hasPath("node.http.solidityEnable")) {
            issolidityEnable = Util.config.getBoolean("node.http.solidityEnable");
            if(issolidityEnable){
                if (Util.config.hasPath("node.http.solidityPort")) {
                    solidityPort =Util.config.getString("node.http.solidityPort");
                }
            }
        }
        if (Util.config.hasPath("node.listen.port")) {
            listenPort =Util.config.getString("node.listen.port");
        }
        if (Util.config.hasPath("node.rpc.port")) {
            rpcPort =Util.config.getString("node.rpc.port");
        }
        if (Util.config.hasPath("node.rpc.solidityPort")) {
            rpcsolidityPort =Util.config.getString("node.rpc.solidityPort");
        }

        //执行checkZipPath.bash，判断zip包路径正确性
        BashExecutor bashExecutor = new BashExecutor();
        bashExecutor.callZipPathScript(filePath);
        String checkZipPath = checkZipPath(String.format(Common.ZipPathFormat));
        if(checkZipPath.equals(Common.canNotFindZip)) {
            return new Response(ResultCode.OK.code, Common.canNotFindZip).toJSONObject();
        }

        JSONObject json = readJsonFile();
        JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
        if (Objects.isNull(nodes)) {
            nodes = new JSONArray();
        }

        ArrayList<String> ipList = (ArrayList<String>) json.get(Common.ipListFiled);

        //部署所有未部署的节点
        for (int i = 0; i < nodes.size(); i++) {
            JSONObject node = (JSONObject) nodes.get(i);
            boolean isDeployed = (boolean) node.get(Common.isDeployedFiled);
            if (!isDeployed) {
                Long id = (Long) node.get(Common.idFiled);
                String path = filePath;
                boolean isSR = (Boolean) node.get(Common.isSRFiled);
                String privateKeypath = (String) node.get(Common.privateKeyFiled);
                String privateKey = null;
                boolean blockNeedSync = true;
                if (isSR) {
                    try {
                        privateKey = Wallet.getPrivateString(String.format("%s/%s", Common.walletFiled, privateKeypath));
                        blockNeedSync = (Boolean) node.get(Common.needSyncCheck);
                    } catch (CipherException | IOException e) {
                        LOG.error(e.toString());
                        return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, "load privateKey info failed").toJSONObject();
                    }
                }
                ConfigGenerator configGenerator = new ConfigGenerator();
                boolean result = configGenerator.updateConfig(
                        new BlockSettingConfig(blockNeedSync), String.format("%s_%s", Common.configFiled, id.toString()));

                if (!result) {
                    return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
                }

                String ip = (String) node.get(Common.ipFiled);
                Long port = (Long) node.get(Common.portFiled);
                String userName = (String) node.get(Common.userNameFiled);
                String sshPassword = (String) node.get(Common.sshPasswordFiled);

                //用户自定义交易模块
                String plugin = "null";
                if (json.containsKey(Common.customTransactionFiled)
                        && ((String) json.get(Common.customTransactionFiled)).length() != 0) {
                    plugin = (String) json.get(Common.customTransactionFiled);
                }

                //用户自定义数据库模块
                String dbCustom = (String) json.get(Common.dbCustomFiled);
                if(dbCustom.equals("")){
                    dbCustom="null";
                }

                //执行部署脚本
                if (Objects.nonNull(privateKey)) {
                    bashExecutor.callScript(ip, port, userName, path, privateKey, id, plugin, sshPassword, dbCustom, fullNodePort, solidityPort,listenPort, rpcPort, rpcsolidityPort );
                } else {
                    bashExecutor.callScript(ip, port, userName, path, "null", id, plugin, sshPassword, dbCustom, fullNodePort, solidityPort,listenPort, rpcPort, rpcsolidityPort);
                }

                String status = checkIsDeployed(String.format(Common.logFormat, id.toString()));
                if(status.equals(Common.deployFinishStatus)) isDeployed = true;
                if(status.equals(Common.expectIsNotInstalled)){
                    return new Response(ResultCode.FAILED.code, "expect is not installed").toJSONObject();
                }
                if(status.equals(Common.connectFailedStatus)){
                    return new Response(ResultCode.UNAUTHORIZED.code, ip+": ssh connect failed").toJSONObject();
                }
                if(status.equals(Common.canNotFindZip)){
                    return new Response(ResultCode.UNAUTHORIZED.code, path+": "+Common.canNotFindZip).toJSONObject();
                }
                if(status.equals(Common.portIsOccupied)){
                    return new Response(ResultCode.FAILED.code, portOccupied[1]).toJSONObject();
                }

                if(isDeployed){ //如果部署成功，更新节点部署状态
                    NodeController nc  = new NodeController();
                    JSONObject nodeOld = Util.getNodeInfo(nodes, id);
                    nodeOld.put(Common.isDeployedFiled, isDeployed);
                    nc.deleteNode(id);
                    json = readJsonFile();
                    JSONArray newNodes = (JSONArray) json.get(Common.nodesFiled);
                    if (Objects.isNull(newNodes)) {
                        newNodes = new JSONArray();
                    }
                    newNodes.add(nodeOld);
                    json.put(Common.nodesFiled, newNodes);
                    nc.updateNodesInfo(newNodes, json, ipList);

                    return new Response(ResultCode.OK.code, "Deploy successful", isDeployed).toJSONObject();
                }
                else return new Response(ResultCode.FAILED.code, "Deploy fail", isDeployed).toJSONObject();

            }

        }
        return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
    }


//查看部署日志
    @GetMapping(value = "/api/getLogInfo")
    public JSONObject deploy(
            @RequestParam(value = "id", required = false, defaultValue = "1") Long id
    ) {
        int status = 0;
        String logName = String.format(Common.logFormat, id.toString());
        File file = new File(logName);
        List<String> result = new ArrayList<>();
        if (file.isFile() && file.exists()) {
            try {
                InputStreamReader read = new InputStreamReader(
                        new FileInputStream(file), Common.encoding);
                BufferedReader bufferedReader = new BufferedReader(read);
                String lineTxt;

                while ((lineTxt = bufferedReader.readLine()) != null) {
                    result.add(lineTxt);
                    if(lineTxt.contains(Common.deploySuccessStatus)) {
                        status = 1;
                    }
                    if(lineTxt.contains(Common.deployFailStatus)) {
                        status = -1;
                    }
                }
                bufferedReader.close();
                read.close();

            } catch (Exception e) {
                LOG.error(e.getMessage());
                return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, "read log info failed").toJSONObject();
            }
        } else {
            return new Response(ResultCode.OK.code, "").toJSONObject();
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put(Common.logInfoFiled, result);
        jsonObject.put(Common.deployStatus, status);
        return new Response(ResultCode.OK.code, jsonObject).toJSONObject();
    }
}