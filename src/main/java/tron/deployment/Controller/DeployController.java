package tron.deployment.Controller;

import static common.LogConfig.LOG;
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

    private String checkNodeStatus(String path) {
        File file = new File(path);
        if (file.isFile() && file.exists()) {
            try {
                InputStreamReader read = new InputStreamReader(
                        new FileInputStream(file), Common.encoding);
                BufferedReader bufferedReader = new BufferedReader(read);
                String lineTxt;

                while ((lineTxt = bufferedReader.readLine()) != null) {
                    if (lineTxt.contains(Common.deployFinishStatus)) {
                        return Common.deployFinishStatus;
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

    @PostMapping(value = "/api/oneClick")
    public JSONObject startDeployment() {
        int currentTime = (int) (System.currentTimeMillis() / 1000);
        ConfigGenerator configGenerator = new ConfigGenerator();
        boolean result = configGenerator.updateConfig(new P2PVersion(currentTime), Common.configFiled);
        if (!result) {
            return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
        }
        return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
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
            if(!status.equals(Common.deployFinishStatus)) isDeployed = false;
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

        Util util = new Util();
        util.parseConfig();
        Config config = util.config;
        Args args = new Args();
        int listenPort = (Integer)args.getListenPort(config);
        ArrayList<String> ipList = new ArrayList<>();
        for (int i = 0; i < nodes.size(); i++) {
            JSONObject node = (JSONObject) nodes.get(i);
            String nodeIp = (String) node.get(Common.ipFiled);
            ipList.add(nodeIp + "\":\"" + listenPort);
        }

        for (int i = 0; i < nodes.size(); i++) {
            JSONObject node = (JSONObject) nodes.get(i);
            boolean isDeployed = (boolean) node.get(Common.isDeployedFiled);
            if (!isDeployed) {
                Long id = (Long) node.get(Common.idFiled);
//                String path = (String) node.get(Common.pathFiled);
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
                String serviceType = (String) node.get(Common.serviceTypeFiled);
//                BashExecutor bashExecutor = new BashExecutor();
                String plugin = "null";
                if (json.containsKey(Common.customTransactionFiled)
                        && ((String) json.get(Common.customTransactionFiled)).length() != 0) {
                    plugin = (String) json.get(Common.customTransactionFiled);
                }

                if (Objects.nonNull(privateKey)) {
                    bashExecutor.callScript(ip, port, userName, path, privateKey, id, plugin, sshPassword, serviceType);
                } else {
                    bashExecutor.callScript(ip, port, userName, path, "", id, plugin, sshPassword, serviceType);
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
                    return new Response(ResultCode.UNAUTHORIZED.code, "Please upload java-tron.1.0.0.zip generated after java-tron build").toJSONObject();
                }
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

                if(isDeployed) return new Response(ResultCode.OK.code, "Deploy successful", isDeployed).toJSONObject();
                else return new Response(ResultCode.FAILED.code, "Deploy fail", isDeployed).toJSONObject();

            }

        }
        return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
    }



    @GetMapping(value = "/api/getLogInfo")
    public JSONObject deploy(
            @RequestParam(value = "id", required = false, defaultValue = "1") Long id
    ) {
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
        return new Response(ResultCode.OK.code, jsonObject).toJSONObject();
    }
}