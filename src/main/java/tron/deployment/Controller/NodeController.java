package tron.deployment.Controller;

import static common.LogConfig.LOG;
import static common.Util.*;
import static wallet.Wallet.*;

import ch.ethz.ssh2.Connection;
import com.googlecode.cqengine.query.simple.In;
import com.typesafe.config.Config;
import common.Args;
import common.Util;
import common.Common;
import common.utils.Hash;
import common.utils.HttpUtil;
import config.*;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

import org.springframework.web.bind.annotation.*;
import response.ResultCode;
import entity.WitnessEntity;

import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;
import org.tron.keystore.CipherException;
import response.Response;
import tron.deployment.shellExecutor.BashExecutor;
import wallet.Wallet;

@CrossOrigin
@RestController
@Component
@RequestMapping(value = "/")
@Slf4j
public class NodeController {

  private static boolean isEckey = true;

//  private static int listenPort = 0;
//  private static long id = 0L;
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

  private boolean isIpListenPortExist(JSONArray nodes, String ip, long listenPort) {
    for (int i = 0; i < nodes.size(); i++) {
      JSONObject node = (JSONObject) nodes.get(i);
      String nodeIp = (String) node.get(Common.ipFiled);
      long nodeListenPort = (Long) node.get(Common.listenPortField);
      if (nodeIp.equals(ip) && nodeListenPort==listenPort) {
        return true;
      }
    }
    return false;
  }

  private boolean isIpListenPortExist_update(JSONArray nodes, long id, String ip, long listenPort) {
    for (int i = 0; i < nodes.size(); i++) {
      JSONObject node = (JSONObject) nodes.get(i);
      long nodeId = (Long) node.get(Common.idFiled);
      String nodeIp = (String) node.get(Common.ipFiled);
      long nodeListenPort = (Long) node.get(Common.listenPortField);
      if(nodeId!=id){//比较时除去节点自身，避免未更新节点ip和listenport时，点击保存报ip和listenport重复
        if (nodeIp.equals(ip) && nodeListenPort==listenPort) {
          return true;
        }
      }
    }
    return false;
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
    //获取链的加密方式
    refresh();
    int status = 0;
    //获取请求数据 start
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
    int listenPort = (Integer) data.getOrDefault("listenPort", 18889);
    //获取请求数据 end

    //根据登录方式的不同，校验连通性 start
    BashExecutor bashExecutor = new BashExecutor();
    if(sshConnectType == 1 ){
      bashExecutor.callSSHPWDScript(ip, port, userName, sshPassword);
    }
    if(sshConnectType == 2){
      bashExecutor.callSSHScript(ip, port, userName);
    }
    JSONObject statusObj = new JSONObject();
    String sshStatus = checkSSHStatus(String.format(Common.sshLogFormat));
    if(sshStatus.equals(Common.connectFailedStatus)) {
      status = 1;
      statusObj.put("status",status);
      return new Response(ResultCode.OK.code, statusObj).toJSONObject();
    }
    //根据登录方式的不同，校验连通性 end

    //获取数据库节点信息
    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
    if (Objects.isNull(nodes)) {
      nodes = new JSONArray();
    }

    //保存历史id，采用id自增的方式，id初始值为0
    Long idMax = (Long) json.get(Common.idMaxFiled);
    long id = idMax + 1;
    json.put(Common.idMaxFiled, id);

    //校验节点是否已存在或ip和listenPort重复
    JSONObject node = Util.getNodeInfo(nodes, id);
    if (node != null) {
      return new Response(ResultCode.FORBIDDEND.code, "node id already exist").toJSONObject();
    }
    if (isIpListenPortExist(nodes, ip, listenPort)) {
      return new Response(ResultCode.FORBIDDEND.code, "ip&listenPort should be different").toJSONObject();
    }

    //更新iplist
//    ArrayList<ong,String> ipList = (ArrayList<long,String>) json.get(Common.ipListFiled);
//    ipList.add(ip+":"+listenPort);
    HashMap<String,String> ipList = (HashMap<String,String>) json.get(Common.ipListFiled);
    ipList.put(id+"",ip+"\":\""+listenPort);

    /*//初始化configStatus
    HashMap<Long, Integer> configStatusMap = (HashMap<Long, Integer>) json.get(Common.configStatusMapFiled);
    configStatusMap.put(id,0);*/

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

    //为每个节点生成一个配置文件 .config.conf_id start
    ConfigGenerator configGenerator = new ConfigGenerator();
    boolean result = configGenerator.generateConfig(String.format("%s_%s", Common.configFiled, id+""));
    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.generateConfigFileFailed).toJSONObject();
    }
    //为每个节点生成一个配置文件 .config.conf_id end

    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
    String createTime = df.format(new Date());// new Date()为获取当前系统时间

    newNode.put(Common.idFiled, id);
    newNode.put(Common.userNameFiled, userName);
    newNode.put(Common.portFiled, port);
    newNode.put(Common.ipFiled, ip);
//    newNode.put(Common.ipListFiled, ipList);
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
    newNode.put(Common.listenPortField, listenPort);
    newNode.put(Common.createTimeField, createTime);
    newNode.put(Common.configStatusFiled, 0);
    newNode.put(Common.deployStatusFiled, 0);
    newNode.put(Common.customTransactionFiled, "");
    newNode.put(Common.dbCustomFiled, "");
    newNode.put(Common.isError, false);
    nodes.add(newNode);
    return updateNodesInfo(nodes, json, id, ipList, listenPort, false);
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
    int listenPort = (Integer) data.getOrDefault("listenPort", "18889");

    JSONObject statusObj = new JSONObject();
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
    //校验节点修改后是否会ip和listenPort重复
    if (isIpListenPortExist_update(nodes, id, ip, listenPort)) {
      return new Response(ResultCode.FORBIDDEND.code, "ip&listenPort should be different").toJSONObject();
    }

    //更新iplist
//    ArrayList<String> ipList = (ArrayList<String>) json.get(Common.ipListFiled);
//    ipList.add(ip+":"+listenPort);
    HashMap<String,String> ipList = (HashMap<String,String>) json.get(Common.ipListFiled);
    ipList.put(id+"",ip+"\":\""+listenPort);

    //检验privatekey与address是否匹配
    boolean flag = key.length() != 0;
    nodes = removeNodeInfo(nodes, id, flag);
    if (isSR) {
      if(!flag){
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
      if (flag) {
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
    node.put(Common.listenPortField, listenPort);
    nodes.add(node);
    json.put(Common.nodesFiled, nodes);

    return updateNodesInfo(nodes, json, id, ipList, listenPort, false);
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

    return new Response(ResultCode.OK.code, "").toJSONObject();
  }

  //更新节点信息
  public JSONObject updateNodesInfo(JSONArray nodes, JSONObject json, long id , HashMap<String,String> ipList, int listenPort, boolean isDeleteNode) {
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

    ArrayList<String> ipListAll = new ArrayList<>();
    Collection<String> values = ipList.values() ;// 得到全部的value
    Iterator<String> iter = values.iterator() ;
    while(iter.hasNext()) {
      ipListAll.add(iter.next());
    }
    //为每个节点的配置文件更新witness信息
    GenesisWitnessConfig witnessConfig = new GenesisWitnessConfig();
    witnessConfig.setGenesisBlockWitnesses(witnessnodes);
    for (int i = 0; i < nodes.size(); i++) {
      JSONObject node = (JSONObject) nodes.get(i);
      long idNode = (Long) node.get(Common.idFiled);
      if (!configGenerator.updateConfig(witnessConfig, idNode, String.format("%s_%s", Common.configFiled, idNode+""))) {
        LOG.error("update witness config file failed");
        return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, "update witness config file failed").toJSONObject();
      }
      if(!configGenerator.updateConfig(new SeedNodeConfig(ipListAll), idNode, String.format("%s_%s", Common.configFiled, idNode+""))){
        LOG.error("update seedNode config file failed");
        return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, "update seedNode config file failed").toJSONObject();
      }
      if(!configGenerator.updateConfig(new ActiveConfig(ipListAll), idNode, String.format("%s_%s", Common.configFiled, idNode+""))){
        LOG.error("update active config file failed");
        return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, "update active config file failed").toJSONObject();
      }
    }

    if (!configGenerator.updateConfig(witnessConfig, Common.configFiled)) {
      LOG.error("update witness config file failed");
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, "update witness config file failed").toJSONObject();
    }

    if(!isDeleteNode){
      //更新listenPort信息
      boolean result = configGenerator.updateConfig(
              new ListenPortConfig(listenPort), id, String.format("%s_%s", Common.configFiled, id+""));

      if (!result) {
        return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
      }
    }

    json.put(Common.nodesFiled, nodes);
    json.put(Common.ipListFiled, ipList);

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
    int listenPort = 18889;

    HashMap<String,String> ipList = (HashMap<String,String>) json.get(Common.ipListFiled);
    ipList.remove(id+"");

    JSONArray newNodes = removeNodeInfo(nodes, id, true);
    if (newNodes.size() == nodes.size()) {
      return new Response(ResultCode.NOT_FOUND.code, Common.nodeIdNotExistFailed).toJSONObject();
    }
    //删除节点的配置文件 .config.conf_id start
    ConfigGenerator configGenerator = new ConfigGenerator();
    boolean result = configGenerator.deleteConfig(id);
    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.deleteConfigFileFailed).toJSONObject();
    }
    //判断是否为最后一个节点，是的话，删除整条链
    ChainController chainController = new ChainController();
    JSONObject canDeleteNode = chainController.canDeleteNode(id);
    JSONObject value = (JSONObject) canDeleteNode.get("data");
    int status  = (int) value.get("status");
    if(status == 2){
      //初始化配置文件的加密算法
      JSONObject jsonData = new JSONObject();
      jsonData.put(Common.cryptoEngine, "eckey");
      PluginConfig pluginConfig = new PluginConfig();
      pluginConfig.cryptoEngine(jsonData);
      //删除链
      json = readJsonFile();
      json.put(Common.chainNameFiled, "");
    }
    return updateNodesInfo(newNodes, json, id, ipList, listenPort, true);
  }

  @GetMapping(value = "/api/getDeployedNodeInfo")
  public JSONObject getDeployedNodeInfo(@RequestParam String url, int type) {
    HttpUtil httpUtil = new HttpUtil();
    JSONObject jsonObj = new JSONObject();
    Map<String, Object> nodeInfo = new HashMap<>();
    try{
      if(type == 1){
        nodeInfo = httpUtil.getInfo("http://"+url+"/wallet/getnodeinfo");
      }else if(type == 2){
        nodeInfo = httpUtil.getInfo(url+"/wallet/getnodeinfo");
      }
      jsonObj.put("result",nodeInfo);
      jsonObj.put("status", 1);
      return new Response(ResultCode.OK.code, jsonObj).toJSONObject();
    }catch (Exception e){
      return new Response(ResultCode.NOT_FOUND.code, "Failed to get node info, please check the url:"+url+"/wallet/getnodeinfo").toJSONObject();
    }

  }

  @GetMapping(value = "/api/getNowBlockInfo")
  public JSONObject getNowBlockInfo(@RequestParam String url, int type) {
    HttpUtil httpUtil = new HttpUtil();
    JSONObject jsonObj = new JSONObject();
    Map<String, Object> nowBlockInfo = new HashMap<>();
    try{
      if(type == 1){
        nowBlockInfo = httpUtil.getInfo("http://"+url+"/wallet/getnowblock");
      }else if(type == 2){
        nowBlockInfo = httpUtil.getInfo(url+"/wallet/getnowblock");
      }
      jsonObj.put("result",nowBlockInfo);
      jsonObj.put("status", 1);
      return new Response(ResultCode.OK.code, jsonObj).toJSONObject();
    }catch (Exception e){
      return new Response(ResultCode.NOT_FOUND.code, "Failed to get now block info, please check the url:"+url+"/wallet/getnowblock").toJSONObject();
    }
  }

  @GetMapping(value = "/api/stopNode")
  public JSONObject stopNode(@RequestParam long id) {
    BashExecutor bashExecutor = new BashExecutor();
    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
    long firstId = (long) json.get(Common.firstIdFiled);
    if (Objects.isNull(nodes)) {
      nodes = new JSONArray();
    }
    JSONObject node = Util.getNodeInfo(nodes, id);
    String ip = (String) node.get(Common.ipFiled);
    Long port = (Long) node.get(Common.portFiled);
    String userName = (String) node.get(Common.userNameFiled);
    String sshPassword = (String) node.get(Common.sshPasswordFiled);
    //执行部署脚本
    bashExecutor.callStopNodeScript(ip, port, userName,id,sshPassword);

    String status = checkIsStoped(String.format(Common.stopNodeFormat, id+""));
    DeployController deployController = new DeployController();
    if (status.equals(Common.stopNodeSuccessStatus)) {
      JSONObject oldNode = Util.getNodeInfo(nodes, id);
      oldNode.put(Common.isDeployedFiled, false);
      oldNode.put(Common.deployStatusFiled, 0);
      deployController.deleteNode(id);
      json = readJsonFile();
      JSONArray nowNodes = (JSONArray) json.get(Common.nodesFiled);
      if (Objects.isNull(nowNodes)) {
        nowNodes = new JSONArray();
      }
      nowNodes.add(oldNode);
      json.put(Common.nodesFiled, nowNodes);
      if(id == firstId){
        json.put(Common.firstIdFiled, -1);
      }
      updateNodesInfo(nowNodes, json);

    }
      return new Response(ResultCode.OK.code, "").toJSONObject();
  }

  //查询节点是否成功停止
  private String checkIsStoped(String path) {
    File file = new File(path);
    if (file.isFile() && file.exists()) {
      try {
        InputStreamReader read = new InputStreamReader(
                new FileInputStream(file), Common.encoding);
        BufferedReader bufferedReader = new BufferedReader(read);
        String lineTxt;

        while ((lineTxt = bufferedReader.readLine()) != null) {
          if(lineTxt.contains("successfully")){
            return Common.stopNodeSuccessStatus;
          }
          if (lineTxt.contains("failed")) {
            return Common.stopNodeFailStatus;
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
    return Common.stopNodeFailStatus;
  }

}
