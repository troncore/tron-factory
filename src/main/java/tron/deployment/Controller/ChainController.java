package tron.deployment.Controller;

import com.typesafe.config.Config;
import common.Args;
import common.Common;
import common.Util;
import common.utils.HttpUtil;
import config.*;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.tron.core.config.args.Account;
import response.Response;
import response.ResultCode;
import java.io.*;
import java.util.*;

import static common.Util.*;
import static wallet.Wallet.*;

@CrossOrigin
@RestController
@Component
@RequestMapping(value = "/")
@Slf4j
public class ChainController {

  //判断是否存在私链
  @GetMapping(value = "/api/hasBlockChain")
  public JSONObject HasBlockChain() {
    JSONObject json = readJsonFile();
    String chainName = (String) json.get(Common.chainNameFiled);
    if(!chainName.equals("")){
      return new Response(ResultCode.OK.code, true).toJSONObject();
    }else{
      return new Response(ResultCode.OK.code, false).toJSONObject();
    }
  }

  //创建区块链信息
  @PostMapping(value = "/api/chainInfo")
  public JSONObject addChainInfo(@RequestBody LinkedHashMap<String,Object> data) {

    //获取请求数据 start
    String chainName = (String) data.getOrDefault("chainName", "");
    String crypto = (String) data.getOrDefault("crypto", "eckey");
    int p2pVersion = data.getOrDefault("p2pVersion", "0") instanceof String ?
            (Integer.parseInt((String) data.getOrDefault("p2pVersion", "0"))) :
            (int) data.getOrDefault("p2pVersion", 0);
    String consensus = (String) data.getOrDefault("consensus", "");
    Object o = data.getOrDefault("genesisBlockAssets", "");
    ArrayList<LinkedHashMap> arrayList = (ArrayList<LinkedHashMap>) o;

    //获取请求数据 end
    long chainId = Calendar.getInstance().getTimeInMillis() / 1000; //创建时根据时间戳生成链的唯一标识chainId

    //把chainId，链的名称和共识信息写入数据库 start
    JSONObject json = readJsonFile();
    json.put(Common.chainNameFiled, chainName);
    json.put(Common.consensusFiled, consensus);
    json.put(Common.chainIdFiled, chainId);
    if (!writeJsonFile(json)) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed).toJSONObject();
    }
    //把链的名称和共识信息写入数据库 end

    //把加密算法写入配置文件 start
    JSONObject jsonData = new JSONObject();
    jsonData.put(Common.cryptoEngine, crypto);
    PluginConfig pluginConfig = new PluginConfig();
    pluginConfig.cryptoEngine(jsonData);
    //把加密算法写入配置文件 end

    //把p2pVersion写入配置文件
    if(p2pVersion != 0){
      ConfigGenerator configGenerator = new ConfigGenerator();
      boolean result = configGenerator.updateConfig(new P2PVersion(p2pVersion), Common.configFiled);
      if (!result) {
        return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
      }
    }

    //把genesisBlockAssets写入配置文件
    ConfigControlller configControlller = new ConfigControlller();
    JSONObject jsonObject = new JSONObject();
    ArrayList<LinkedHashMap> linkedHashMaps = new ArrayList<>();

    for (LinkedHashMap linkedHashMap : arrayList) {
      String accountName = (String) linkedHashMap.get(Common.accountNameField);
      String accountType = (String) linkedHashMap.get(Common.accountTypeField);
      String address = (String) linkedHashMap.get(Common.addressFiled);
      String balance = (String) linkedHashMap.get(Common.balanceField);

      LinkedHashMap<String, String> stringStringLinkedHashMap = new LinkedHashMap<>();
      stringStringLinkedHashMap.put("accountName", accountName);
      stringStringLinkedHashMap.put("accountType", accountType);
      stringStringLinkedHashMap.put("address", address);
      stringStringLinkedHashMap.put("balance", balance);

      linkedHashMaps.add(stringStringLinkedHashMap);
    }
    jsonObject.put("assets", linkedHashMaps);
    configControlller.genesisSettingConfig(jsonObject);

    return new Response(ResultCode.OK.code, "").toJSONObject();
  }

  //查询区块链信息
  @GetMapping(value = "/api/chainInfo")
  public JSONObject getChainInfo() {

    JSONObject jsonObj = new JSONObject();

    //从数据库中获取链的名称和共识信息 start
    JSONObject json = readJsonFile();
    String chainName = (String) json.get(Common.chainNameFiled);
    String consensus = (String) json.get(Common.consensusFiled);
    jsonObj.put(Common.chainNameFiled, chainName);
    jsonObj.put(Common.consensusFiled, consensus);
    //从数据库中获取链的名称和共识信息 end

    if(chainName.equals("")){
      long p2pVersion = Calendar.getInstance().getTimeInMillis() / 1000;
      jsonObj.put(Common.P2PVersionField,p2pVersion);
    }else{
      //从配置文件中获取p2pVersion
      jsonObj.put(Common.P2PVersionField,Args.getP2pVersionFromConfig(Util.config)+"");
    }

    //从配置文件中获取加密算法 start
    Util.parseConfig();
    jsonObj.put(Common.cryptoEngine, Args.getCrypto(Util.config));
    //从配置文件中获取加密算法 end

    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
    if(nodes.size() == 0){
      jsonObj.put(Common.canChangeCryptoField,true);
    }else{
      jsonObj.put(Common.canChangeCryptoField,false);
    }

    //从配置文件中获取genesisBlockAssets
    List<Account> linkedHashMaps = Args.getAccountsFromConfig(Util.config);
    List<LinkedHashMap<String, Object>> linkedHash = new ArrayList<>();

    for(int i = 0;i<linkedHashMaps.size();i++){
      LinkedHashMap<String, Object> stringStringLinkedHashMap = new LinkedHashMap<>();
      stringStringLinkedHashMap.put("accountName", linkedHashMaps.get(i).getAccountName().toStringUtf8());
      stringStringLinkedHashMap.put("accountType", linkedHashMaps.get(i).getAccountType().toString());
      stringStringLinkedHashMap.put("address", encode58Check(linkedHashMaps.get(i).getAddress()));
      stringStringLinkedHashMap.put("balance", linkedHashMaps.get(i).getBalance()+"");
      linkedHash.add(stringStringLinkedHashMap);
    }
    jsonObj.put("genesisBlockAssets", linkedHash);

    return new Response(ResultCode.OK.code, "", jsonObj).toJSONObject();
  }

  //编辑区块链信息
  @PutMapping(value = "/api/chainInfo")
  public JSONObject modifyChainInfo(@RequestBody LinkedHashMap<String,Object> data) {

    //获取请求数据 start
    String chainName = (String) data.getOrDefault("chainName", "");
    String crypto = (String) data.getOrDefault("crypto", "eckey");
    int p2pVersion = data.getOrDefault("p2pVersion", "0") instanceof String ?
            (Integer.parseInt((String) data.getOrDefault("p2pVersion", "0"))) :
            (int) data.getOrDefault("p2pVersion", 0);
    String consensus = (String) data.getOrDefault("consensus", "");
    Object o = data.getOrDefault("genesisBlockAssets", "");
    ArrayList<LinkedHashMap> arrayList = (ArrayList<LinkedHashMap>) o;

    //获取请求数据 end

    //把链的名称和共识信息写入数据库 start
    JSONObject json = readJsonFile();
    json.put(Common.chainNameFiled, chainName);
    json.put(Common.consensusFiled, consensus);
    if (!writeJsonFile(json)) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed).toJSONObject();
    }
    //把链的名称和共识信息写入数据库 end

    //把加密算法写入配置文件 start
    JSONObject jsonData = new JSONObject();
    jsonData.put(Common.cryptoEngine, crypto);
    PluginConfig pluginConfig = new PluginConfig();
    pluginConfig.cryptoEngine(jsonData);
    //把加密算法写入配置文件 end

    //把p2pVersion写入配置文件
    if(p2pVersion != 0){
      ConfigGenerator configGenerator = new ConfigGenerator();
      boolean result = configGenerator.updateConfig(new P2PVersion(p2pVersion), Common.configFiled);
      if (!result) {
        return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
      }
    }

    //把genesisBlockAssets写入配置文件
    ConfigControlller configControlller = new ConfigControlller();
    JSONObject jsonObject = new JSONObject();
    ArrayList<LinkedHashMap> linkedHashMaps = new ArrayList<>();

    for (LinkedHashMap linkedHashMap : arrayList) {
      String accountName = (String) linkedHashMap.get(Common.accountNameField);
      String accountType = (String) linkedHashMap.get(Common.accountTypeField);
      String address = (String) linkedHashMap.get(Common.addressFiled);
      String balance = (String) linkedHashMap.get(Common.balanceField);

      LinkedHashMap<String, String> stringStringLinkedHashMap = new LinkedHashMap<>();
      stringStringLinkedHashMap.put("accountName", accountName);
      stringStringLinkedHashMap.put("accountType", accountType);
      stringStringLinkedHashMap.put("address", address);
      stringStringLinkedHashMap.put("balance", balance);

      linkedHashMaps.add(stringStringLinkedHashMap);
    }
    jsonObject.put("assets", linkedHashMaps);
    configControlller.genesisSettingConfig(jsonObject);

    return new Response(ResultCode.OK.code, "").toJSONObject();
  }

  @DeleteMapping(value = "/api/deleteChain")
  public JSONObject deleteChain() {
    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);

    if (Objects.isNull(nodes)) {
      nodes = new JSONArray();
    }
    ConfigGenerator configGenerator = new ConfigGenerator();
    for(int i=0;i<nodes.size();i++){
      JSONObject node = (JSONObject) nodes.get(i);
      long id = (long) node.get(Common.idFiled);
      HashMap<String,String> ipList = (HashMap<String,String>) json.get(Common.ipListFiled);

      boolean result = configGenerator.deleteConfig(id);
      if (!result) {
        return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.deleteConfigFileFailed).toJSONObject();
      }
      String privateKeyFile = (String) node.get(Common.privateKeyFiled);
      File file = new File(String.format("%s/%s", Common.walletFiled, privateKeyFile));
      if (file.exists()) {
        file.delete();
      }

      ipList.remove(id+"");
    }
    nodes = new JSONArray();
    json.put(Common.chainNameFiled, "");
    json.put(Common.firstIdFiled, -1);
    json.put(Common.nodesFiled, nodes);
    json.put(Common.idMaxFiled, 0);
    if (!writeJsonFile(json)) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed, false).toJSONObject();
    }
    NodeController nodeController = new NodeController();
    nodeController.initConfig();
    return new Response(ResultCode.OK.code, "",true).toJSONObject();
  }

  @GetMapping(value = "/api/canDeleteNode")
  //status: 0 表示可以直接删除； 1 表示节点正在运行，不可以删除； 2 表示节点可以删除，但是最后一个节点，提示用户是否要删除，同时删除该区块链；
  public JSONObject canDeleteNode(@RequestParam long id) {
    JSONObject statusObj = new JSONObject();
    int status = 0;
    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
    JSONObject node = Util.getNodeInfo(nodes, id);
    boolean isDepolyed = (boolean) node.get(Common.isDeployedFiled);
    if(isDepolyed){
      status = 1;
    }else{
      if(nodes.size() == 1){
        status = 2;
      }
    }
    statusObj.put("status",status);
    return new Response(ResultCode.OK.code, statusObj).toJSONObject();
  }

  //检测私链是否发布
  @GetMapping(value = "/api/checkChainPublish")
  public JSONObject checkChainPublish() {
    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
    long firstId = (long) json.get(Common.firstIdFiled);
    if(firstId != -1) {
      Map<String, Object> nowBlockInfo = new HashMap<>();
      JSONObject node = getNodeInfo(nodes, firstId);
      String ip = (String) node.get(Common.ipFiled);
      Util util = new Util();
      util.parseConfig(firstId);
      Config config = util.config;
      Args args = new Args();
      int httpPort = args.getHTTPFullNodePort(config);
      if(!isHostConnection(ip, httpPort)){
        return new Response(ResultCode.OK.code, "", 1).toJSONObject();
      }
      String url = "http://" + ip + ":" + httpPort + "/wallet/getnowblock";
      HttpUtil httpUtil = new HttpUtil();
      try {
        nowBlockInfo = httpUtil.getInfo(url);
        if (!nowBlockInfo.isEmpty()) {
          return new Response(ResultCode.OK.code, "", 2).toJSONObject();
        }else {
          return new Response(ResultCode.OK.code, "", 1).toJSONObject();
        }
      } catch (Exception e) {
        return new Response(ResultCode.NOT_FOUND.code, "Failed to get now block info, please check the url:" + url).toJSONObject();
      }
    }
    return new Response(ResultCode.OK.code, "", 0).toJSONObject();
  }

  @GetMapping(value = "/api/checkNode")
  public JSONObject checkNode(@RequestParam String ids) {
    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
    if (Objects.isNull(nodes)) {
      nodes = new JSONArray();
    }
   // 0: 节点已成功启动； 1: 发布失败，节点未启动成功，请查看日志; 2: 部分节点未启动成功，请查看日志
    String[] split = ids.split(",");//以逗号分割
    int idSize = split.length;
    int successCount = 0;
    for (int i = 0; i < idSize; i++) {
      long id = Long.parseLong(split[i]);
      JSONObject node = Util.getNodeInfo(nodes, id);
      boolean isDeployed = (boolean) node.get(Common.isDeployedFiled);
      if(isDeployed){
        successCount+=1;
      }
    }
    JSONObject statusObj = new JSONObject();
    int status = 0;
    if(successCount == 0) {
      status = 1;
    }else if(successCount < idSize) {
      status = 2;
    }
    statusObj.put("status",status);
    return new Response(ResultCode.OK.code, statusObj).toJSONObject();
  }
}
