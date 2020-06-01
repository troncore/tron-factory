package tron.deployment.Controller;

import static common.LogConfig.LOG;
import static common.Util.parseConfig;
import static common.Util.readJsonFile;
import static common.Util.writeJsonFile;
import static wallet.Wallet.*;

import ch.ethz.ssh2.Connection;
import com.typesafe.config.Config;
import common.Args;
import common.Common;
import common.utils.HttpUtil;
import config.ActiveConfig;
import config.SeedNodeConfig;

import java.io.*;
import java.util.LinkedHashMap;

import org.springframework.web.bind.annotation.*;
import response.ResultCode;
import common.Util;
import entity.WitnessEntity;
import config.GenesisWitnessConfig;

import java.util.ArrayList;
import java.util.Map;
import java.util.Objects;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;
import org.tron.keystore.CipherException;
import response.Response;
import config.ConfigGenerator;
import tron.deployment.shellExecutor.BashExecutor;


@CrossOrigin
@RestController
@Component
@RequestMapping(value = "/")
@Slf4j
public class NodeController {

  private static boolean isEckey = true;

  private static int listenPort = 0;
  private static long id = 0L;
  static {
    refresh();
  }
  //获取config.conf中用户选用的加密算法
  private static void refresh() {
    parseConfig();
    if (Util.config.hasPath("crypto.engine")) {
      isEckey = Util.config.getString("crypto.engine").equalsIgnoreCase("eckey");
    }
  }
  //更新节点信息
  public JSONObject updateNodesInfo(JSONArray nodes, JSONObject json, ArrayList<String> ipList) {
    ConfigGenerator configGenerator = new ConfigGenerator();

    ArrayList<WitnessEntity> witnessnodes = new ArrayList<>();
    for (int i = 0; i < nodes.size(); i++) {
      JSONObject node = (JSONObject) nodes.get(i);
      boolean isSR = (Boolean) node.get(Common.isSRFiled);

      if (isSR) {
        witnessnodes.add(new WitnessEntity((String) node.get(Common.publicKeyFiled),
                (String) node.get(Common.urlFiled), (String) node.get(Common.voteCountFiled)));
      }
    }
    configGenerator.updateConfig(new SeedNodeConfig(ipList), Common.configFiled);
    configGenerator.updateConfig(new ActiveConfig(ipList), Common.configFiled);

    GenesisWitnessConfig witnessConfig = new GenesisWitnessConfig();
    witnessConfig.setGenesisBlockWitnesses(witnessnodes);

    if (!configGenerator.updateConfig(witnessConfig, Common.configFiled)) {
      LOG.error("update witness config file failed");
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, "update witness config file failed").toJSONObject();
    }

    json.put(Common.nodesFiled, nodes);

    if (!writeJsonFile(json)) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed).toJSONObject();
    }

    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }
  //删除节点信息
  public JSONArray removeNodeInfo(JSONArray nodes, Long id, boolean flag) {
    JSONArray newNodes = new JSONArray();
    for (int i = 0; i < nodes.size(); i++) {
      JSONObject node = (JSONObject) nodes.get(i);
      Long nodeID = (Long) node.get(Common.idFiled);
      if (nodeID.equals(id)) {
        String privateKeyFile = (String) node.get(Common.privateKeyFiled);
        File file = new File(String.format("%s/%s", Common.walletFiled, privateKeyFile));
        if (file.exists() && flag) {
          file.delete();
        }
      } else {
        newNodes.add(node);
      }
    }
    return newNodes;
  }

  //判断数据库中是否已存在相同ip
  private boolean isIpExist(JSONArray nodes, String ip) {
    for (int i = 0; i < nodes.size(); i++) {
      JSONObject node = (JSONObject) nodes.get(i);
      String nodeIp = (String) node.get(Common.ipFiled);
      if (nodeIp.equals(ip)) {
        return true;
      }
    }
    return false;
  }

  //带密码登录，检验连通性
  public static String SSHconnectPWD(String ip, String username, String sshPassword) {
    Connection conn = null;
    try {
      conn = new Connection(ip);
      conn.connect();
      boolean isAuthenticated = conn.authenticateWithPassword(username, sshPassword);
      if (isAuthenticated == false) {
        return Common.connectFailedStatus;
      }
    } catch (IOException e) {
      return Common.connectFailedStatus;
    }
    return Common.connectSuccessStatus;
  }

  //公钥登录，校验连通性：sshConnetct.bash，读取日志，判断是否ssh成功
  private String checkSSHStatus(String path) {
    File file = new File(path);
    if (file.isFile() && file.exists()) {
      try {
        InputStreamReader read = new InputStreamReader(
                new FileInputStream(file), Common.encoding);
        BufferedReader bufferedReader = new BufferedReader(read);
        String lineTxt;

        while ((lineTxt = bufferedReader.readLine()) != null) {
          if (lineTxt.contains(Common.connectSuccessStatus)) {
            return Common.connectSuccessStatus;
          }
          if (lineTxt.contains(Common.connectFailedStatus)) {
            return Common.connectFailedStatus;
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

  private String checkSSHPWDStatus(String path) {
    File file = new File(path);
    if (file.isFile() && file.exists()) {
      try {
        InputStreamReader read = new InputStreamReader(
                new FileInputStream(file), Common.encoding);
        BufferedReader bufferedReader = new BufferedReader(read);
        String lineTxt;

        while ((lineTxt = bufferedReader.readLine()) != null) {
          if (lineTxt.contains(Common.connectSuccessStatus)) {
            return Common.connectSuccessStatus;
          }
          if (lineTxt.contains(Common.connectFailedStatus)) {
            return Common.connectFailedStatus;
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

  //添加节点
  @PostMapping(value = "/api/nodeInfo")
  public JSONObject addNode(@RequestBody LinkedHashMap<String,Object> data) {
    refresh();
    int status = 0;
    String userName = (String) data.getOrDefault("userName", "node1");
    String ip = (String) data.getOrDefault("ip", "127.0.0.1");
    boolean isSR = (boolean) data.getOrDefault("isSR", false);
    String url = (String) data.getOrDefault("url", "");
    String privateKey = (String) data.getOrDefault("privateKey", "");
    String voteCount = (String) data.getOrDefault("voteCount", "");
    boolean needSyncCheck = (boolean) data.getOrDefault("needSyncCheck", true);
    int port =data.getOrDefault("port", "8090") instanceof String ?
            (Integer.parseInt((String)data.getOrDefault("port", "8090"))) :
            (int)data.getOrDefault("port", 8090);
    String sshPassword = (String) data.getOrDefault("sshPassword", "");
    int sshPort = data.getOrDefault("sshPort", "") instanceof String ?
            (Integer.parseInt((String)data.getOrDefault("sshPort", "22"))) :
            (int)data.getOrDefault("sshPort", 22);
    boolean isDeployed = (boolean) data.getOrDefault("isDeployed", false);
    String javaTronVersion = (String) data.getOrDefault("javaTronVersion", "4.1.0");
    int sshConnectType = data.getOrDefault("sshConnectType", "") instanceof String ?
            (Integer.parseInt((String)data.getOrDefault("sshConnectType", "0"))) :
            (int)data.getOrDefault("sshConnectType", 0);
    String publicKey = (String) data.getOrDefault("publicKey", "");
    JSONObject statusObj = new JSONObject();
    //1 password, 2 key
    /*if(sshConnectType == 1){
      String sshPwdStatus = SSHconnectPWD(ip, userName, sshPassword);
      if(sshPwdStatus.equals(Common.connectFailedStatus)) {
        status = 1;
        statusObj.put("status",status);
        return new Response(ResultCode.OK.code, statusObj).toJSONObject();
      }
    }*/

    BashExecutor bashExecutor = new BashExecutor();
    if(sshConnectType == 1 ){
      bashExecutor.callSSHPWDScript(ip, port, userName, sshPassword);
    }
    if(sshConnectType == 2){
      bashExecutor.callSSHScript(ip, port, userName);
    }
    String sshStatus = checkSSHStatus(String.format(Common.sshLogFormat));
    if(sshStatus.equals(Common.connectFailedStatus)) {
      status = 1;
      statusObj.put("status",status);
      return new Response(ResultCode.OK.code, statusObj).toJSONObject();
    }

    //获取配置文件中listenPort
    Util util = new Util();
    util.parseConfig();
    Config config = util.config;
    Args args = new Args();
    listenPort = (Integer)args.getListenPort(config);

    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);

    //保存历史id，采用id自增的方式
    Long idMax = (Long) json.get(Common.idMaxFiled);
    id = idMax + 1;
    json.put(Common.idMaxFiled, id);
    ArrayList<String> ipList = new ArrayList<>();

    for (int i = 0; i < nodes.size(); i++) {
      JSONObject node = (JSONObject) nodes.get(i);
//      Long nodeID = (Long) node.get(Common.idFiled);
      String nodeIp = (String) node.get(Common.ipFiled);
      ipList.add(nodeIp+"\":\""+listenPort);
      /*if(id <= nodeID){
        id = nodeID;
      }*/
    }

    ipList.add(ip+"\":\""+listenPort);

    if (Objects.isNull(nodes)) {
      nodes = new JSONArray();
    }
    JSONObject node = Util.getNodeInfo(nodes, id);
    if (node != null) {
      return new Response(ResultCode.FORBIDDEND.code, "node id already exist").toJSONObject();
    }

    if (isIpExist(nodes, ip)) {
      return new Response(ResultCode.FORBIDDEND.code, "ip should be different").toJSONObject();
    }

    JSONObject newNode = new JSONObject();
    if (isSR) {
      //校验用户输入的address(publicKey)和privateKey是否匹配,匹配失败时，status:2
      String path;
      String publicKeyCheck;
      try {
        path = Util.importPrivateKey(hexs2Bytes(privateKey.getBytes()));
        refresh();
        if (isEckey) {
          publicKeyCheck = private2AddressEckey(hexs2Bytes(privateKey.getBytes()));
        } else {
          publicKeyCheck = private2AddressSm2(hexs2Bytes(privateKey.getBytes()));
        }
        if(!publicKey.equals(publicKeyCheck)){
          status = 2;
          statusObj.put("status",status);
          return new Response(ResultCode.OK.code, statusObj).toJSONObject();
        }
        newNode.put(Common.privateKeyFiled, path);
        newNode.put(Common.publicKeyFiled, publicKey);
      } catch (CipherException | IOException e) {
        LOG.error(e.toString());
        return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.savePrivateKeyFailed).toJSONObject();
      }
    }

    newNode.put(Common.idFiled, id);
    newNode.put(Common.userNameFiled, userName);
    newNode.put(Common.portFiled, port);
    newNode.put(Common.ipFiled, ip);
    newNode.put(Common.ipListFiled, ipList);
    newNode.put(Common.isSRFiled, isSR);
    newNode.put(Common.urlFiled, url);
    newNode.put(Common.voteCountFiled, voteCount);
    newNode.put(Common.needSyncCheck, needSyncCheck);
    newNode.put(Common.sshPasswordFiled, sshPassword);
    newNode.put(Common.sshPortFiled, sshPort);
    newNode.put(Common.isDeployedFiled, isDeployed);
    newNode.put(Common.javaTronVersionFiled, javaTronVersion);
    newNode.put(Common.sshConnectTypeField, sshConnectType);
    newNode.put(Common.ifShowLogField, false);
    nodes.add(newNode);
    return updateNodesInfo(nodes, json, ipList);
  }

  //编辑节点信息
  @PutMapping(value = "/api/nodeInfo")
  public JSONObject updateNode(@RequestBody LinkedHashMap<String,Object> data) {
    int status = 0;
    String userName = (String) data.getOrDefault("userName", "node1");
    String ip = (String) data.getOrDefault("ip", "");
    boolean isSR = (boolean) data.getOrDefault("isSR", false);
    String url = (String) data.getOrDefault("url", "");
    String key = (String) data.getOrDefault("privateKey", "");
    String voteCount = (String) data.getOrDefault("voteCount", "");
    boolean needSyncCheck = (boolean) data.getOrDefault("needSyncCheck", false);
    long id =data.getOrDefault("id", "1") instanceof String ?
            (Long.parseLong((String)data.getOrDefault("id", "1"))) :
            (int) data.getOrDefault("id", 1);
    int port =data.getOrDefault("port", "8090") instanceof String ?
            (Integer.parseInt((String)data.getOrDefault("port", "8090"))) :
            (int)data.getOrDefault("port", 8090);
    String sshPassword = (String) data.getOrDefault("sshPassword", "");
    int sshPort = data.getOrDefault("sshPort", "") instanceof String ?
            (Integer.parseInt((String)data.getOrDefault("sshPort", "22"))) :
            (int)data.getOrDefault("sshPort", 22);
    boolean isDeployed = (boolean) data.getOrDefault("isDeployed", false);
    String javaTronVersion = (String) data.getOrDefault("javaTronVersion", "4.1.0");
    int sshConnectType = data.getOrDefault("sshConnectType", "") instanceof String ?
            (Integer.parseInt((String)data.getOrDefault("sshConnectType", "0"))) :
            (int)data.getOrDefault("sshConnectType", 0);
    String publicKey = (String) data.getOrDefault("publicKey", "");
    JSONObject statusObj = new JSONObject();
    //1 password, 2 key
    /*if(sshConnectType == 1){
      String sshPwdStatus = SSHconnectPWD(ip, userName, sshPassword);
      if(sshPwdStatus.equals(Common.connectFailedStatus)) {
        status = 1;
        statusObj.put("status",status);
        return new Response(ResultCode.OK.code, statusObj).toJSONObject();
      }
    }
    if(sshConnectType == 2){
      BashExecutor bashExecutor = new BashExecutor();
      bashExecutor.callSSHScript(ip, port, userName);
      String sshStatus = checkSSHStatus(String.format(Common.sshLogFormat));
      if(sshStatus.equals(Common.connectFailedStatus)) {
        status = 1;
        statusObj.put("status",status);
        return new Response(ResultCode.OK.code, statusObj).toJSONObject();
      }
    }*/

    BashExecutor bashExecutor = new BashExecutor();
    if(sshConnectType ==1 ){
      bashExecutor.callSSHPWDScript(ip, port, userName, sshPassword);
    }
    if(sshConnectType == 2){
      bashExecutor.callSSHScript(ip, port, userName);
    }
    String sshStatus = checkSSHStatus(String.format(Common.sshLogFormat));
    if(sshStatus.equals(Common.connectFailedStatus)) {
      status = 1;
      statusObj.put("status",status);
      return new Response(ResultCode.OK.code, statusObj).toJSONObject();
    }

    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
    JSONObject node = Util.getNodeInfo(nodes, id);
    if (node == null) {
      return new Response(ResultCode.NOT_FOUND.code, Common.nodeIdNotExistFailed).toJSONObject();
    }
    String ipOld = (String)node.get(Common.ipFiled);
    ArrayList<String> ipList = new ArrayList<>();

    for (int i = 0; i < nodes.size(); i++) {
      JSONObject nodeObj = (JSONObject) nodes.get(i);
      String nodeIp = (String) nodeObj.get(Common.ipFiled);
//      String nodeIp = (String) node.get(Common.ipFiled);
      if(ipOld != nodeIp) {
        ipList.add(nodeIp + "\":\"" + listenPort);
      }
    }
    ipList.add(ip+"\":\""+listenPort);

    boolean flag = key.length() != 0;
    nodes = removeNodeInfo(nodes, id, flag);
    if (isSR) {
      if(key.length() == 0){
        String privateKey = (String)node.get(Common.privateKeyFiled);
        String  privateKeyCheck=privateKey.substring(privateKey.lastIndexOf("-")+1, privateKey.lastIndexOf(".json"));
        if(!publicKey.equals(privateKeyCheck)){
          status = 2;
          statusObj.put("status",status);
          return new Response(ResultCode.OK.code, statusObj).toJSONObject();
        }
        node.put(Common.privateKeyFiled, privateKey);
        node.put(Common.publicKeyFiled, publicKey);
      }
      if (key.length() != 0) {
        String path;
        String publicKeyCheck;
//        refresh();
        try {
          path = Util.importPrivateKey(hexs2Bytes(key.getBytes()));
          refresh();
          if (isEckey) {
            publicKeyCheck = private2AddressEckey(hexs2Bytes(key.getBytes()));
          } else {
            publicKeyCheck = private2AddressSm2(hexs2Bytes(key.getBytes()));
          }
          if(!publicKey.equals(publicKeyCheck)){
            status = 2;
            statusObj.put("status",status);
            return new Response(ResultCode.OK.code, statusObj).toJSONObject();
          }
          node.put(Common.privateKeyFiled, path);
          node.put(Common.publicKeyFiled, publicKey);
        } catch (CipherException | IOException e) {
          LOG.error(e.toString());
          return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.savePrivateKeyFailed).toJSONObject();
        }
      }
    }

    node.put(Common.userNameFiled, userName);
    node.put(Common.portFiled, port);
    node.put(Common.ipFiled, ip);
    node.put(Common.isSRFiled, isSR);
    node.put(Common.urlFiled, url);
    node.put(Common.voteCountFiled, voteCount);
    node.put(Common.needSyncCheck, needSyncCheck);
    node.put(Common.sshPasswordFiled, sshPassword);
    node.put(Common.sshPortFiled, sshPort);
    node.put(Common.isDeployedFiled, isDeployed);
    node.put(Common.javaTronVersionFiled, javaTronVersion);
    node.put(Common.sshConnectTypeField, sshConnectType);
    nodes.add(node);
    json.put(Common.nodesFiled, nodes);

    return updateNodesInfo(nodes, json, ipList);
  }

  //编辑节点，查看节点详情
  @GetMapping(value ="/api/nodeInfo" )
  public JSONObject getNode(@RequestParam(value = "id", required = true, defaultValue = "1") Long id) {

    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
    if (Objects.isNull(nodes)) {
      nodes = new JSONArray();
    }

    JSONObject node = Util.getNodeInfo(nodes, id);
    if (node == null) {
      return new Response(ResultCode.NOT_FOUND.code, Common.nodeIdNotExistFailed).toJSONObject();
    }
    boolean isSR = (boolean)node.get(Common.isSRFiled);
    if(!isSR){
      node.put(Common.urlFiled, "");
      node.put(Common.voteCountFiled, "");
      node.put(Common.privateKeyFiled, "");
      node.put(Common.publicKeyFiled, "");
    }
    return new Response(ResultCode.OK.code, node).toJSONObject();
  }
  //获取节点列表
  @GetMapping(value = "/api/allNodeInfo")
  public JSONObject getAllNode(
  ) {

    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
    return new Response(ResultCode.OK.code, nodes).toJSONObject();
  }

  //初始化创世块信息
  @PostMapping(value = "/api/initConfig")
  public JSONObject initConfig() {
    ConfigGenerator configGenerator = new ConfigGenerator();
    if (!configGenerator.updateConfig(new SeedNodeConfig(new ArrayList<>()), Common.configFiled)) {
      LOG.error("update seed node config file failed");
    }

    ConfigControlller configControlller = new ConfigControlller();
    JSONObject jsonObject = new JSONObject();
    String address = null;
    refresh();
    if (isEckey) {
      address = "TSJx5LZUDmRDKwQJHWAzpwDdAVm5F7UftB";
    } else {
      address = "TEJj71X5jJUCdZ4iMcJgqpYb5ECyDvHvDu";
    }

    LinkedHashMap<String, String> stringStringLinkedHashMap = new LinkedHashMap<>();

    stringStringLinkedHashMap.put("accountName", "Blackhole");
    stringStringLinkedHashMap.put("accountType", "AssetIssue");
    stringStringLinkedHashMap.put("address", address);
    stringStringLinkedHashMap.put("balance", "-9223372036854775808");
    ArrayList<LinkedHashMap> linkedHashMaps = new ArrayList<>();

    linkedHashMaps.add(stringStringLinkedHashMap);
    jsonObject.put("assets", linkedHashMaps);

    configControlller.genesisSettingConfig(jsonObject);


    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  //更新节点信息，不含iplist
  public JSONObject updateNodesInfo(JSONArray nodes, JSONObject json) {
    ConfigGenerator configGenerator = new ConfigGenerator();

    ArrayList<WitnessEntity> witnessnodes = new ArrayList<>();
    for (int i = 0; i < nodes.size(); i++) {
      JSONObject node = (JSONObject) nodes.get(i);
      boolean isSR = (Boolean) node.get(Common.isSRFiled);

      if (isSR) {
        witnessnodes.add(new WitnessEntity((String) node.get(Common.publicKeyFiled),
                (String) node.get(Common.urlFiled), (String) node.get(Common.voteCountFiled)));
      }
    }

    GenesisWitnessConfig witnessConfig = new GenesisWitnessConfig();
    witnessConfig.setGenesisBlockWitnesses(witnessnodes);

    if (!configGenerator.updateConfig(witnessConfig, Common.configFiled)) {
      LOG.error("update witness config file failed");
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, "update witness config file failed").toJSONObject();
    }

    json.put(Common.nodesFiled, nodes);

    if (!writeJsonFile(json)) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed).toJSONObject();
    }

    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  //删除节点
  @DeleteMapping(value = "/api/nodeInfo")
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

    ArrayList<String> ipList = new ArrayList<>();
    for (int i = 0; i < nodes.size(); i++) {
      JSONObject nodeObj = (JSONObject) nodes.get(i);
      String nodeIp = (String) nodeObj.get(Common.ipFiled);
      if(nodeIp != ip){
        ipList.add(nodeIp+"\":\""+listenPort);
      }
    }
    JSONArray newNodes = removeNodeInfo(nodes, id, true);
    if (newNodes.size() == nodes.size()) {
      return new Response(ResultCode.NOT_FOUND.code, Common.nodeIdNotExistFailed).toJSONObject();
    }

    return updateNodesInfo(newNodes, json, ipList);
  }

  @GetMapping(value = "/api/getDeployedNodeInfo")
  public JSONObject getDeployedNodeInfo(@RequestParam(value = "url", required = true, defaultValue = "") String url) {
    HttpUtil httpUtil = new HttpUtil();
    JSONObject jsonObj = new JSONObject();
    try{
      Map<String, Object> nodeInfo = httpUtil.getInfo("http://"+url+"/wallet/getnodeinfo");
//    JSONObject json = JSONObject.fromObject(nodeInfo);
      jsonObj.put("result",nodeInfo);
//      jsonObj.put("status",1);
      return new Response(ResultCode.OK.code, jsonObj).toJSONObject();
//      return new Response(ResultCode.OK.code, nodeInfo).toJSONObject();
    }catch (Exception e){
      return new Response(ResultCode.NOT_FOUND.code, e.getMessage()).toJSONObject();
    }

  }

  @GetMapping(value = "/api/getNowBlockInfo")
  public JSONObject getNowBlockInfo(@RequestParam(value = "url", required = true, defaultValue = "") String url) {
    HttpUtil httpUtil = new HttpUtil();
    JSONObject jsonObj = new JSONObject();
    try {
      Map<String, Object> nowBlockInfo = httpUtil.getInfo("http://"+url+"/wallet/getnowblock");
//    JSONObject json = JSONObject.fromObject(nodeInfo);
      jsonObj.put("result",nowBlockInfo);
//      jsonObj.put("status",1);
      return new Response(ResultCode.OK.code, jsonObj).toJSONObject();
    }catch (Exception e){
      return new Response(ResultCode.NOT_FOUND.code, e.getMessage()).toJSONObject();
    }
  }
}
