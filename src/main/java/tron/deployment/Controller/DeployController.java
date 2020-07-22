package tron.deployment.Controller;

import static common.LogConfig.LOG;
import static common.Util.*;
import static wallet.Wallet.hexs2Bytes;

import com.typesafe.config.Config;
import common.Args;
import common.Common;
import common.utils.Hash;
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
import java.util.*;

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
    NodeController nc  = new NodeController();
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

    @GetMapping(value = "/api/checkDeployStatus")
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

    @GetMapping(value = "/api/checkConfigStatus")
    public JSONObject checkConfigStatus() {
        JSONObject json = readJsonFile();
        Long configStatus = (Long) json.get(Common.configStatusFiled);
        JSONObject statusObj = new JSONObject();
        statusObj.put("status",configStatus);
        return new Response(ResultCode.OK.code, statusObj).toJSONObject();
    }

    @GetMapping(value = "/api/getDeployedNode")
    public JSONObject getDeployedNode(@RequestParam(value = "isDeployedNode", required = true, defaultValue = "true") boolean isDeployedNode) {
        JSONObject json = readJsonFile();
        JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
        if (Objects.isNull(nodes)) {
            nodes = new JSONArray();
        }
        //获取配置文件中listenPort
        /*Util util = new Util();
        util.parseConfig();
        Config config = util.config;
        Args args = new Args();
        int listenPort = args.getListenPort(config);
        ArrayList<String> seedNodeIpList = (ArrayList<String>)args.getSeedNode(config);*/

        ArrayList<String> deployedIpList = new ArrayList<>();
        //如果需要列出已成功部署的节点，则需要遍历所有节点，isDeployed=true时，添加到deployedIpList
        //如果不论是否部署过，是否部署成功，则返回seed_node_ip_list
        if(isDeployedNode){
            for (int i = 0; i < nodes.size(); i++) {
                JSONObject node = (JSONObject) nodes.get(i);
                boolean isDeployed = (boolean) node.get(Common.isDeployedFiled);
                if(isDeployed){
                    String nodeIp = (String) node.get(Common.ipFiled);
                    long httpPort = (long)node.get(Common.httpPortFiled);
                    deployedIpList.add(nodeIp+":"+httpPort);
                }
            }
        }
        JSONObject deployedIpObj = new JSONObject();
        deployedIpObj.put("deployedIpList",deployedIpList);
        return new Response(ResultCode.OK.code, deployedIpObj).toJSONObject();
    }

    public JSONObject deployNode(long id, String filePath){
        JSONObject json = readJsonFile();
        JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
        if (Objects.isNull(nodes)) {
            nodes = new JSONArray();
        }
        Util util = new Util();
        parseConfig(id);
        Config config = util.config;
        Args args = new Args();
        int fullNodePort = args.getHTTPFullNodePort(config);
        int solidityPort = args.getHTTPSolidityNodePort(config);
        int listenPort = args.getListenPort(config);
        int rpcPort = args.getRPCFullNodePort(config);
        int rpcsolidityPort = args.getRPCSolidityNodePort(config);

        //更新节点部署日志查看状态
        JSONObject node = Util.getNodeInfo(nodes, id);
        boolean isSR = (Boolean) node.get(Common.isSRFiled);
        node.put(Common.ifShowLogField, true);
        deleteNode(id);
        json = readJsonFile();
        JSONArray newNodes = (JSONArray) json.get(Common.nodesFiled);
        if (Objects.isNull(newNodes)) {
            newNodes = new JSONArray();
        }
        newNodes.add(node);
        json.put(Common.nodesFiled, newNodes);
        nc.updateNodesInfo(newNodes, json);

        //部署所有节点
        String path = filePath;
        String privateKeypath = (String) node.get(Common.privateKeyFiled);
        String privateKey = null;

        //更新节点http端口
        JSONObject nodeOldHttp = Util.getNodeInfo(nodes, id);
        nodeOldHttp.put(Common.httpPortFiled, fullNodePort);
        deleteNode(id);
        json = readJsonFile();
        JSONArray newNodeHttp = (JSONArray) json.get(Common.nodesFiled);
        if (Objects.isNull(newNodeHttp)) {
            newNodeHttp = new JSONArray();
        }
        newNodeHttp.add(nodeOldHttp);
        json.put(Common.nodesFiled, newNodeHttp);
        nc.updateNodesInfo(newNodeHttp, json);

        if (isSR) {
            try {
                privateKey = Wallet.getPrivateString(String.format("%s/%s", Common.walletFiled, privateKeypath));
            } catch (CipherException | IOException e) {
                LOG.error(e.toString());
                return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, "load privateKey info failed").toJSONObject();
            }
        }

        String ip = (String) node.get(Common.ipFiled);
        Long port = (Long) node.get(Common.portFiled);
        String userName = (String) node.get(Common.userNameFiled);
        String sshPassword = (String) node.get(Common.sshPasswordFiled);

        //用户自定义交易模块
        String plugin = (String) node.get(Common.customTransactionFiled);
        if (plugin.equals("")) {
            plugin = "null";
        }

        //用户自定义数据库模块
        String dbCustom = (String) node.get(Common.dbCustomFiled);
        if (dbCustom.equals("")) {
            dbCustom = "null";
        }

        //执行部署脚本
        BashExecutor bashExecutor = new BashExecutor();
        if (Objects.nonNull(privateKey)) {
            bashExecutor.callScript(ip, port, userName, path, privateKey, id, plugin, sshPassword, dbCustom, fullNodePort+"", solidityPort+"", listenPort+"", rpcPort+"", rpcsolidityPort+"");
        } else {
            bashExecutor.callScript(ip, port, userName, path, "null", id, plugin, sshPassword, dbCustom, fullNodePort+"", solidityPort+"", listenPort+"", rpcPort+"", rpcsolidityPort+"");
        }
        return new Response(ResultCode.OK.code, "").toJSONObject();

    }
    public boolean checkIsDeploy(long id){
        JSONObject json = readJsonFile();
        JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
        if (Objects.isNull(nodes)) {
            nodes = new JSONArray();
        }
        JSONObject node = Util.getNodeInfo(nodes, id);
        boolean isDeployed = false;
        String status = checkIsDeployed(String.format(Common.logFormat, id+""));
        if (status.equals(Common.deployFinishStatus)) isDeployed = true;
        /*if (status.equals(Common.expectIsNotInstalled)) {
            return new Response(ResultCode.FAILED.code, "expect is not installed").toJSONObject();
        }
        if (status.equals(Common.connectFailedStatus)) {
            return new Response(ResultCode.UNAUTHORIZED.code, "ssh connect failed").toJSONObject();
        }
        if (status.equals(Common.canNotFindZip)) {
            return new Response(ResultCode.UNAUTHORIZED.code, Common.canNotFindZip).toJSONObject();
        }
        if (status.equals(Common.portIsOccupied)) {
            return new Response(ResultCode.FAILED.code, portOccupied[1]).toJSONObject();
        }*/
        if (isDeployed) { //如果部署成功，更新节点部署状态
//
            JSONObject oldNode = Util.getNodeInfo(nodes, id);
            oldNode.put(Common.isDeployedFiled, isDeployed);
            oldNode.put(Common.deployStatusFiled, 1);
            deleteNode(id);
            json = readJsonFile();
            JSONArray nowNodes = (JSONArray) json.get(Common.nodesFiled);
            if (Objects.isNull(nowNodes)) {
                nowNodes = new JSONArray();
            }
            nowNodes.add(oldNode);
            json.put(Common.nodesFiled, nowNodes);
            nc.updateNodesInfo(nowNodes, json);
        }
        return isDeployed;
    }

    public void updateNodeInfo(long id, HashMap<Object, Object> map){
        JSONObject json = readJsonFile();
        JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
        if (Objects.isNull(nodes)) {
            nodes = new JSONArray();
        }
        JSONObject oldNode = Util.getNodeInfo(nodes, id);
        for (Object key : map.keySet()) {
            oldNode.put(key, map.get(key));
        }
        deleteNode(id);
        json = readJsonFile();
        JSONArray nowNodes = (JSONArray) json.get(Common.nodesFiled);
        if (Objects.isNull(nowNodes)) {
            nowNodes = new JSONArray();
        }
        nowNodes.add(oldNode);
        json.put(Common.nodesFiled, nowNodes);
        nc.updateNodesInfo(nowNodes, json);
    }

    @PostMapping(value = "/api/deployNode")
    public JSONObject deploy(@RequestBody LinkedHashMap<String,Object> data) throws CipherException, IOException, InterruptedException {
//0: 节点已成功启动； 1: 发布失败，节点未启动成功，请查看日志; 2: 部分节点未启动成功，请查看日志； 3: 当前存在正在启动中的节点，请稍后再试；
        JSONObject json = readJsonFile();
        JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
        if (Objects.isNull(nodes)) {
            nodes = new JSONArray();
        }
        if((long)json.get(Common.deployStatusFiled) == 3){
            JSONObject statusObj = new JSONObject();
            statusObj.put("status", 3);
            return new Response(ResultCode.OK.code, statusObj).toJSONObject();
        }
        String ids = (String) data.get("ids");
        String filePath = (String) data.get("filePath");

        //判断区块链是否已发布，未发布时判断SR节点数量是否>=1
        String[] split = ids.split(",");//以逗号分割
        int idSize = split.length;
        long[] idArr = new long[idSize];
        for (int i = 0; i < idSize; i++) {
            long id = Long.parseLong(split[i]);
            idArr[i] = id;
        }
        ChainController chainController = new ChainController();
        JSONObject jsonObject = chainController.checkChainPublish();
        int publishStatus = (int) jsonObject.get("data");
        int SRNum = 0;
        JSONObject statusObj = new JSONObject();
        int deployStatus = 0;
        boolean ifCheckZipPath = false;
        BashExecutor bashExecutor = new BashExecutor();
        long idSR = -1;
        if(publishStatus == 0) { //未发布时需随机选取1个SR作为初始节点，配置为不开启同步，启动该节点
            for (int count = 0; count < idArr.length; count++) {
                int SRCount = 0;
                JSONObject node = Util.getNodeInfo(nodes, idArr[count]);
                boolean isSR = (Boolean) node.get(Common.isSRFiled);
                if (isSR) {
                    SRCount += 1;
                    if (SRCount == 1) {//初始节点
                        idSR = idArr[count];
                        ConfigGenerator configGenerator = new ConfigGenerator();
                        boolean result = configGenerator.updateConfig(new BlockSettingConfig(false), idSR, String.format("%s_%s", Common.configFiled, idSR + ""));
                        //执行checkZipPath.bash，判断zip包路径正确性，仅第一次循环时校验
                        if (!ifCheckZipPath) {
                            ifCheckZipPath = true;
                            bashExecutor.callZipPathScript(filePath);
                            String checkZipPath = checkZipPath(String.format(Common.ZipPathFormat));
                            if (checkZipPath.equals(Common.canNotFindZip)) {
                                return new Response(ResultCode.OK.code, Common.canNotFindZip).toJSONObject();
                            }
                        }
                        deployStatus = 3;
                        json = readJsonFile();
                        nodes = (JSONArray) json.get(Common.nodesFiled);
                        json.put(Common.nodesFiled, nodes);
                        json.put(Common.deployStatusFiled, deployStatus);
                        if (!writeJsonFile(json)) {
                            return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed).toJSONObject();
                        }

                        deployNode(idArr[count], filePath);
                        if (!checkIsDeploy(idArr[count])) {//如果未成功启动
                            HashMap<Object, Object> map = new HashMap<>();
                            map.put(Common.isError, true);
                            updateNodeInfo(idArr[count], map);

                            deployStatus = 1;
                            json = readJsonFile();
                            nodes = (JSONArray) json.get(Common.nodesFiled);
                            json.put(Common.nodesFiled, nodes);
                            json.put(Common.deployStatusFiled, deployStatus);
                            if (!writeJsonFile(json)) {
                                return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed).toJSONObject();
                            }
                            statusObj.put("status", deployStatus);
                            return new Response(ResultCode.OK.code, statusObj).toJSONObject();
                        }else { //启动成功则更新节点状态
                            HashMap<Object, Object> map = new HashMap<>();
                            map.put(Common.isDeployedFiled, true);
                            map.put(Common.deployStatusFiled, 1);
                            map.put(Common.isError, false);
                            updateNodeInfo(idArr[count], map);
                        }
                    }
                    if(count == idArr.length-1){
                        deployStatus = 0;
                    }
                    break;
                }
                for (count = 0; count < idArr.length && idArr[count] != idSR; count++) {
                    deployNode(idArr[count], filePath);
                    if (!checkIsDeploy(idArr[count])) {//如果未成功启动
                        HashMap<Object, Object> map = new HashMap<>();
                        map.put(Common.isError, true);
                        updateNodeInfo(idArr[count], map);

                        deployStatus = 2;
                        statusObj.put("status", deployStatus);
                    }else { //启动成功则更新节点状态
                        HashMap<Object, Object> map = new HashMap<>();
                        map.put(Common.isDeployedFiled, true);
                        map.put(Common.deployStatusFiled, 1);
                        map.put(Common.isError, false);
                        updateNodeInfo(idArr[count], map);
                    }
                    if(count == idArr.length-1 && deployStatus != 2){
                        deployStatus = 0;
                    }
                }
            }
        }else{
            int deployNum = 0;
            for (int count = 0; count < idArr.length ; count++) {
                deployNum += 1;
                if(deployNum ==1 ) {
                    if (!ifCheckZipPath) {
                        ifCheckZipPath = true;
                        bashExecutor.callZipPathScript(filePath);
                        String checkZipPath = checkZipPath(String.format(Common.ZipPathFormat));
                        if (checkZipPath.equals(Common.canNotFindZip)) {
                            return new Response(ResultCode.OK.code, Common.canNotFindZip).toJSONObject();
                        }
                    }
                }
                deployStatus = 3;
                json = readJsonFile();
                nodes = (JSONArray) json.get(Common.nodesFiled);
                json.put(Common.nodesFiled, nodes);
                json.put(Common.deployStatusFiled, deployStatus);
                if (!writeJsonFile(json)) {
                    return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed).toJSONObject();
                }

                deployNode(idArr[count], filePath);
                if (!checkIsDeploy(idArr[count])) {//如果未成功启动
                    HashMap<Object, Object> map = new HashMap<>();
                    map.put(Common.isError, true);
                    updateNodeInfo(idArr[count], map);

                    deployStatus = 2;
                    statusObj.put("status", deployStatus);
                }else {
                    HashMap<Object, Object> map = new HashMap<>();
                    map.put(Common.isDeployedFiled, true);
                    map.put(Common.deployStatusFiled, 1);
                    map.put(Common.isError, false);
                    updateNodeInfo(idArr[count], map);
                }
                if(count == idArr.length-1 && deployStatus != 2){
                    deployStatus = 0;
                }
            }
        }

        json = readJsonFile();
        nodes = (JSONArray) json.get(Common.nodesFiled);
        json.put(Common.nodesFiled, nodes);
        json.put(Common.deployStatusFiled, deployStatus);
        if (!writeJsonFile(json)) {
            return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed).toJSONObject();
        }
        statusObj.put("status", deployStatus);

        return new Response(ResultCode.OK.code, statusObj).toJSONObject();
    }

    @GetMapping(value = "/api/getDeployStatus")
    public JSONObject getDeployStatus() {
        JSONObject json = readJsonFile();
        int deployStatus = (int) json.get(Common.deployStatusFiled);
        JSONObject statusObj = new JSONObject();
        statusObj.put("status", deployStatus);
        return new Response(ResultCode.OK.code, statusObj).toJSONObject();
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

    public JSONObject deleteNode(@RequestParam(value = "id", required = true, defaultValue = "1") Long id) {

        JSONObject json = readJsonFile();
        JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
        if (Objects.isNull(nodes)) {
            nodes = new JSONArray();
        }
        JSONObject node = Util.getNodeInfo(nodes, id);
        if (node == null) {
            return new Response(ResultCode.NOT_FOUND.code, Common.nodeIdNotExistFailed).toJSONObject();
        }
        String ip = (String) node.get(Common.ipFiled);
        NodeController nc = new NodeController();
        //获取配置文件中listenPort
        Util util = new Util();
        util.parseConfig(id);
        Config config = util.config;
        Args args = new Args();
        int listenPort = (Integer)args.getListenPort(config);

        ArrayList<String> ipList = new ArrayList<>();
        for (int i = 0; i < nodes.size(); i++) {
            JSONObject nodeObj = (JSONObject) nodes.get(i);
            String nodeIp = (String) nodeObj.get(Common.ipFiled);
            if(nodeIp != ip){
                ipList.add(nodeIp+"\":\""+listenPort);
            }
        }
        JSONArray newNodes = nc.removeNodeInfo(nodes, id, false);
        if (newNodes.size() == nodes.size()) {
            return new Response(ResultCode.NOT_FOUND.code, Common.nodeIdNotExistFailed).toJSONObject();
        }

        return nc.updateNodesInfo(newNodes, json, ipList);
    }
}
