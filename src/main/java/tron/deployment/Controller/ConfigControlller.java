package tron.deployment.Controller;

import static common.LogConfig.LOG;
import static common.Util.config;
import static common.Util.parseConfig;
import static common.Util.readJsonFile;
import static common.Util.writeJsonFile;
import static org.tron.core.config.args.Storage.getDbEngineFromConfig;
import static org.tron.core.config.args.Storage.getDbVersionSyncFromConfig;
import static org.tron.core.config.args.Storage.getIndexDirectoryFromConfig;
import static org.tron.core.config.args.Storage.getTransactionHistoreSwitchFromConfig;


//import com.google.inject.internal.cglib.core.$CodeGenerationException;
import com.typesafe.config.Config;
import common.Util;
import config.*;
import entity.AssetsEntity;
import common.Args;
import common.Common;

import java.io.*;
import java.util.*;

import org.springframework.web.bind.annotation.*;
//import response.ResultCode;

import java.lang.reflect.Field;
import java.util.concurrent.atomic.AtomicBoolean;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;
import response.Response;
import response.ResultCode;
import tron.deployment.shellExecutor.BashExecutor;
import wallet.Wallet;


@CrossOrigin
@RestController
@Component
@RequestMapping(value = "/")
public class ConfigControlller {
  long chainId;
  String chainName;
  // db
  DBConfig dbConfig;
  String dbCustom;

  // p2p
  P2PConfig p2pConfig;

  // network
  NetworkConfig networkConfig;

  // crossChain
  CrossChainConfig crossChainConfig;

  // baseSetting
  BaseSettingConfig baseSettingConfig;
  // genesisSetting
  GenesisAssetConfig genesisAssetConfig;

  // genesisWitnessConfig
  GenesisWitnessConfig genesisWitnessConfig;

  private void refresh() {
    Util util = new Util();
    util.parseConfig();
    Config config = util.config;
  }
  private void refresh(long id) {
    Util util = new Util();
    util.parseConfig(id);
    Config config = util.config;
  }

  private void initCrossSetting() {

    JSONObject json = readJsonFile();
    crossChainConfig = new CrossChainConfig((boolean) json.get(Common.enableCrossChainFiled),
            (Long) json.get(Common.maxValidatorNumberFiled), (Long) json.get(Common.minValidatorNumberFiled), (Double) json.get(Common.crossChainFeeFiled));
  }

  private void initBaseSettingConfig() {
    JSONObject json = readJsonFile();
    chainId = (long) json.get(Common.chainIdFiled);
    chainName = (String) json.get(Common.chainNameFiled);
    baseSettingConfig = new BaseSettingConfig(Args.getBlockProducedTimeOut(config), Args.getMaintenanceTimeInterval(config),
            Args.getProposalExpireTime(config), Args.getMinParticipationRate(config));
  }

  private String dbCustomConfig(long id) {
    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
    if (Objects.isNull(nodes)) {
      nodes = new JSONArray();
    }
    JSONObject node = Util.getNodeInfo(nodes, id);
    dbCustom = (String) node.get(Common.dbCustomFiled);
    return dbCustom;
  }

  private List<String> getSeedNode() {
    JSONObject json = readJsonFile();
    if (!json.containsKey(Common.nodesFiled)) {
      return new ArrayList<String>();
    }
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
    List<String> result = new ArrayList<>();
    for (int i = 0; i < nodes.size(); i++) {
      JSONObject node = (JSONObject) nodes.get(i);
      if (node.containsKey(Common.ipFiled) || node.containsKey(Common.portFiled)) {
        result.add(String.format("%s", node.get(Common.ipFiled)));
      }
    }
    return result;
  }


  private JSONObject generateJSONObject(Field[] fields, Serializable configuration) {
    JSONObject json = new JSONObject();
    for (Field field : fields) {
      String name = field.getName();
      try {
        Object value = field.get(configuration); // get the value
        json.put(name, value);
      } catch (IllegalAccessException e) {
        LOG.error(e.getMessage());
      }
    }
    return json;
  }

  private void loadConfig(com.typesafe.config.Config loadConfig) {
    // dbConfig
    dbConfig = new DBConfig(getDbVersionSyncFromConfig(loadConfig), getTransactionHistoreSwitchFromConfig(loadConfig),
            getDbEngineFromConfig(loadConfig), getIndexDirectoryFromConfig(loadConfig), Args.needToUpdateAsset(loadConfig));

    // p2pConfig
    p2pConfig = new P2PConfig(Args.getP2pVersionFromConfig(loadConfig), Args.getNodeMaxActiveNodes(loadConfig),
            Args.getActiveConnectFactor(loadConfig), Args.getNodeMaxActiveNodesWithSameIp(loadConfig),
            Args.getConnectFactor(loadConfig), Args.getSeedNode(loadConfig), Args.getListenPort(loadConfig));

    // network
    networkConfig = new NetworkConfig(Args.getMaxHttpConnectNumber(loadConfig), Args.getRPCSolidityNodePort(loadConfig), Args.getRPCFullNodePort(loadConfig),
            Args.getHTTPFullNodePort(loadConfig), Args.getHTTPSolidityNodePort(loadConfig),
            Args.getNodeHttpFullnodeEnable(loadConfig), Args.getNodeHttpSolidityEnable(loadConfig), Args.getNodeActive(loadConfig));

    // crossChain
    initCrossSetting();

    // baseSetting
    initBaseSettingConfig();

    // GenesisAsset
    genesisAssetConfig = new GenesisAssetConfig(Args.getAccountsFromConfig(loadConfig));

    // GenesisWitness
    genesisWitnessConfig = new GenesisWitnessConfig(Args.getWitnessesFromConfig(loadConfig));
  }

  @PostMapping(value = "/api/oneClick")
  public JSONObject startDeployment() {
    refresh();
    parseConfig();
    JSONObject configObject = getConfigJsonObject(config);
    JSONObject p2pConfig = (JSONObject) configObject.get("p2pConfig");
    int p2pVersion = (Integer) p2pConfig.get(Common.p2pVersionField);
    if(p2pVersion == 0){
      int currentTime = (int) (System.currentTimeMillis() / 1000);
      ConfigGenerator configGenerator = new ConfigGenerator();
      boolean result = configGenerator.updateConfig(new P2PVersion(currentTime), Common.configFiled);
      if (!result) {
        return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
      }
    }
    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  private JSONObject getConfigJsonObject(com.typesafe.config.Config loadConfig) {
    loadConfig(loadConfig);
    JSONObject configObject = new JSONObject();

    JSONObject dbObject = generateJSONObject(dbConfig.getClass().getFields(), dbConfig);
//    dbObject.put("storage_db_custom", dbCustomConfig());
    configObject.put("dbConfig", dbObject);

    JSONObject p2pObject = generateJSONObject(p2pConfig.getClass().getFields(), p2pConfig);
    p2pObject.put(Common.allNodesField, getSeedNode());
    configObject.put("p2pConfig", p2pObject);

    JSONObject networkObject = generateJSONObject(networkConfig.getClass().getFields(), networkConfig);
    configObject.put("networkConfig", networkObject);

    JSONObject crossChainObject = generateJSONObject(crossChainConfig.getClass().getFields(), crossChainConfig);
    configObject.put("crossChainConfig", crossChainObject);

    JSONObject baseSettingObject = generateJSONObject(baseSettingConfig.getClass().getFields(), baseSettingConfig);
    baseSettingObject.put(Common.chainIdFiled, chainId);
    baseSettingObject.put(Common.chainNameFiled, chainName);
    configObject.put("baseSettingConfig", baseSettingObject);

    JSONObject genesisAssetObject = generateJSONObject(genesisAssetConfig.getClass().getFields(), genesisAssetConfig);
    configObject.put("genesisAssetConfig", genesisAssetObject);

    JSONObject genesisWitnessObject = generateJSONObject(genesisWitnessConfig.getClass().getFields(), genesisWitnessConfig);
    configObject.put("genesisWitnessConfig", genesisWitnessObject);

    return configObject;
  }

  //获取数据库配置信息
 /* private JSONObject getDbConfigJsonObject(com.typesafe.config.Config loadConfig) {
//    loadConfig(loadConfig);
    dbConfig = new DBConfig(getDbVersionSyncFromConfig(loadConfig),
            getDbEngineFromConfig(loadConfig), Args.getBackupEnable(loadConfig), Args.getBackupFrequency(loadConfig),
            Args.needToUpdateAsset(loadConfig), Args.getDBCustom(loadConfig));

    JSONObject dbObject = generateJSONObject(dbConfig.getClass().getFields(), dbConfig);
    if(getTransactionHistoreSwitchFromConfig(loadConfig).equals("on")){
      dbObject.put("storage_transHistory_switch", true);
    }else{
      dbObject.put("storage_transHistory_switch", false);
    }

    return dbObject;
  }*/

  //获取数据库配置信息
  private JSONObject getDbConfigJsonObject(com.typesafe.config.Config loadConfig, long id) {
//    loadConfig(loadConfig);
    dbConfig = new DBConfig(getDbVersionSyncFromConfig(loadConfig),
            getDbEngineFromConfig(loadConfig), Args.getBackupEnable(loadConfig), Args.getBackupFrequency(loadConfig));
    JSONObject dbObject = generateJSONObject(dbConfig.getClass().getFields(), dbConfig);
    dbObject.put("storage_db_custom", dbCustomConfig(id));
    if(getTransactionHistoreSwitchFromConfig(loadConfig).equals("on")){
      dbObject.put("storage_transHistory_switch", true);
    }else{
      dbObject.put("storage_transHistory_switch", false);
    }

    return dbObject;
  }

  //获取p2p配置信息
  private JSONObject getP2PConfigJsonObject(com.typesafe.config.Config loadConfig) {
//    loadConfig(loadConfig);
    p2pConfig = new P2PConfig(Args.getP2pVersionFromConfig(loadConfig), Args.getNodeMaxActiveNodes(loadConfig),
            Args.getActiveConnectFactor(loadConfig), Args.getNodeMaxActiveNodesWithSameIp(loadConfig),
            Args.getConnectFactor(loadConfig), Args.getSeedNode(loadConfig), Args.getListenPort(loadConfig));
    JSONObject p2pObject = generateJSONObject(p2pConfig.getClass().getFields(), p2pConfig);
    p2pObject.put(Common.allNodesField, getSeedNode());
    return p2pObject;
  }

  //获取network配置信息
  private JSONObject getNetworkConfigJsonObject(com.typesafe.config.Config loadConfig) {
//    loadConfig(loadConfig);
    networkConfig = new NetworkConfig(Args.getMaxHttpConnectNumber(loadConfig), Args.getRPCSolidityNodePort(loadConfig), Args.getRPCFullNodePort(loadConfig),
            Args.getHTTPFullNodePort(loadConfig), Args.getHTTPSolidityNodePort(loadConfig),
            Args.getNodeHttpFullnodeEnable(loadConfig), Args.getNodeHttpSolidityEnable(loadConfig), Args.getNodeActive(loadConfig));
    JSONObject networkObject = generateJSONObject(networkConfig.getClass().getFields(), networkConfig);
    return networkObject;
  }

  //获取crossChain配置信息
  private JSONObject getCrossChainConfigJsonObject(com.typesafe.config.Config loadConfig) {
//    loadConfig(loadConfig);
    initCrossSetting();
    JSONObject crossChainObject = generateJSONObject(crossChainConfig.getClass().getFields(), crossChainConfig);
    return crossChainObject;
  }

  //获取BaseSetting配置信息
  private JSONObject getBaseSettingConfigJsonObject(com.typesafe.config.Config loadConfig) {
//    loadConfig(loadConfig);
    initBaseSettingConfig();
    JSONObject baseSettingObject = generateJSONObject(baseSettingConfig.getClass().getFields(), baseSettingConfig);
    return baseSettingObject;


  }

  //获取genesisAsset配置信息
  public JSONObject getGenesisAssetConfigJsonObject(com.typesafe.config.Config loadConfig) {
//    loadConfig(loadConfig);
    genesisAssetConfig = new GenesisAssetConfig(Args.getAccountsFromConfig(loadConfig));
    JSONObject configObject = new JSONObject();

    JSONObject genesisAssetObject = generateJSONObject(genesisAssetConfig.getClass().getFields(), genesisAssetConfig);
    configObject.put("genesisAssetConfig", genesisAssetObject);
    return configObject;
  }

  //获取genesisWitness配置信息
  private JSONObject getGenesisWitnessConfigJsonObject(com.typesafe.config.Config loadConfig) {
//    loadConfig(loadConfig);
    genesisWitnessConfig = new GenesisWitnessConfig(Args.getWitnessesFromConfig(loadConfig));
    JSONObject configObject = new JSONObject();

    JSONObject genesisWitnessObject = generateJSONObject(genesisWitnessConfig.getClass().getFields(), genesisWitnessConfig);
    configObject.put("genesisWitnessConfig", genesisWitnessObject);
    return configObject;
  }

  /*@PostMapping(value = "/api/dbconfig")
  public JSONObject dbConfig(@RequestBody LinkedHashMap<String, Object> data) {
    long id =data.getOrDefault("id", "1") instanceof String ?
            (Long.parseLong((String)data.getOrDefault("id", "1"))) :
            (int) data.getOrDefault("id", 1);
    boolean isDBSync = (boolean) data.getOrDefault("isDBSync", false);
    boolean OpenTransaction = (boolean) data.getOrDefault("isOpenTransaction", true);
    String dbEngine = (String) data.getOrDefault("dbEngine", "LEVELDB");
//    String indexDirectory = (String) data.getOrDefault("indexDirectory", "index");engine
    boolean needToUpdateAsset = (boolean) data.getOrDefault("needToUpdateAsset", true);
    boolean backupEnable = (boolean) data.getOrDefault("backupEnable", false);
    int backupFrequency = (int) data.getOrDefault("backupFrequency", 10000);

    String isOpenTransaction = "";
    if(OpenTransaction){
      isOpenTransaction = "on";
    }else{
      isOpenTransaction = "off";
    }
    // 自定义数据库配置
    String dbCustom = (String) data.getOrDefault("dbCustom", " ");
    //检查自定义数据库jar包路径是否正确
    if(!" ".equals(dbCustom)){
      BashExecutor bashExecutor = new BashExecutor();
      bashExecutor.callDBJarPathScript(dbCustom);
      String checkDBJarPath = checkDBJarPath(String.format(Common.dbJarPathFormat));
      if (checkDBJarPath.equals(Common.canNotFindZip)) {
        return new Response(ResultCode.NOT_FOUND.code, dbCustom+": "+Common.canNotFindZip).toJSONObject();
      }
    }

    ConfigGenerator configGenerator = new ConfigGenerator();
    boolean result = configGenerator.updateConfig(new DBConfig(isDBSync, dbEngine, backupEnable,
            backupFrequency, needToUpdateAsset, dbCustom), id, String.format("%s_%s", Common.configFiled, id));

    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
    }
    return new Response(ResultCode.OK.code, "").toJSONObject();
  }*/

  @PostMapping(value = "/api/dbconfig")
  public JSONObject dbConfig(@RequestBody LinkedHashMap<String, Object> data) {
    long id =data.getOrDefault("id", "1") instanceof String ?
            (Long.parseLong((String)data.getOrDefault("id", "1"))) :
            (int) data.getOrDefault("id", 1);
    boolean isDBSync = (boolean) data.getOrDefault("isDBSync", false);
    boolean OpenTransaction = (boolean) data.getOrDefault("isOpenTransaction", true);
    String dbEngine = (String) data.getOrDefault("dbEngine", "LEVELDB");
//    String indexDirectory = (String) data.getOrDefault("indexDirectory", "index");engine
//    boolean needToUpdateAsset = (boolean) data.getOrDefault("needToUpdateAsset", true);
    boolean backupEnable = (boolean) data.getOrDefault("backupEnable", false);
    int backupFrequency = (int) data.getOrDefault("backupFrequency", 10000);

    String isOpenTransaction = "";
    if(OpenTransaction){
      isOpenTransaction = "on";
    }else{
      isOpenTransaction = "off";
    }
    // 自定义数据库配置
    String dbCustom = (String) data.getOrDefault("dbCustom", "");
    //检查自定义数据库jar包路径是否正确
    if(!dbCustom.equals("")){
      BashExecutor bashExecutor = new BashExecutor();
      bashExecutor.callDBJarPathScript(dbCustom);
      String checkDBJarPath = checkDBJarPath(String.format(Common.dbJarPathFormat));
      if (checkDBJarPath.equals(Common.canNotFindZip)) {
        return new Response(ResultCode.NOT_FOUND.code, dbCustom+": "+Common.canNotFindZip).toJSONObject();
      }
    }
    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
    if (Objects.isNull(nodes)) {
      nodes = new JSONArray();
    }
    JSONObject oldNode = Util.getNodeInfo(nodes, id);
    oldNode.put(Common.dbCustomFiled, dbCustom);

    DeployController deployController = new DeployController();
    deployController.deleteNode(id);
    json = readJsonFile();
    JSONArray nowNodes = (JSONArray) json.get(Common.nodesFiled);
    if (Objects.isNull(nowNodes)) {
      nowNodes = new JSONArray();
    }
    nowNodes.add(oldNode);
    json.put(Common.nodesFiled, nowNodes);
    NodeController nodeController = new NodeController();
    nodeController.updateNodesInfo(nowNodes, json);

    ConfigGenerator configGenerator = new ConfigGenerator();
    if(dbEngine.equals("LEVELDB")){
      refresh(id);
      parseConfig(id);
      backupEnable = Args.getBackupEnable(config);
      backupFrequency = Args.getBackupFrequency(config);
    }
    boolean result = configGenerator.updateConfig(new DBConfig(isDBSync, dbEngine, isOpenTransaction, backupEnable, backupFrequency), id, String.format("%s_%s", Common.configFiled, id+""));
    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
    }
    return new Response(ResultCode.OK.code, "").toJSONObject();
  }

  @PostMapping(value = "/api/networkconfig")
  public JSONObject networkConfig(@RequestBody LinkedHashMap<String, Object> data) {
    long id =data.getOrDefault("id", "1") instanceof String ?
            (Long.parseLong((String)data.getOrDefault("id", "1"))) :
            (int) data.getOrDefault("id", 1);
    int maxHttpConnectNumber = data.getOrDefault("maxHttpConnectNumber", "50") instanceof String ?
            (Integer.parseInt((String) data.getOrDefault("maxHttpConnectNumber", "50"))) :
            (int) data.getOrDefault("maxHttpConnectNumber", 50);
    boolean httpFullNode = (boolean) data.getOrDefault("fullNodeEnable", true);
    boolean httpSolidity = (boolean) data.getOrDefault("solidityEnable", true);
    ArrayList<String> acrive = (ArrayList<String>) data.getOrDefault("active", null);

    Util util = new Util();
    util.parseConfig(id);
    Config config = util.config;
    Args args = new Args();
    int httpFullNodePort = args.getHTTPFullNodePort(config);
    int rpcPort = args.getRPCFullNodePort(config);
    int httpSolidityPort = args.getHTTPSolidityNodePort(config);
    int solidityRPCPort = args.getRPCSolidityNodePort(config);

    if(httpFullNode){
      httpFullNodePort = data.getOrDefault("httpFullNodePort", "8090") instanceof String ?
              (Integer.parseInt((String) data.getOrDefault("httpFullNodePort", "8090"))) :
              (int) data.getOrDefault("httpFullNodePort", 8090);
      rpcPort = data.getOrDefault("rpcPort", "50051") instanceof String ?
              (Integer.parseInt((String) data.getOrDefault("rpcPort", "50051"))) :
              (int) data.getOrDefault("rpcPort", 50051);
    }
    if(httpSolidity){
      httpSolidityPort = data.getOrDefault("httpSolidityPort", "8091") instanceof String ?
              (Integer.parseInt((String) data.getOrDefault("httpSolidityPort", "8091"))) :
              (int) data.getOrDefault("httpSolidityPort", 8091);
      solidityRPCPort = data.getOrDefault("rpcSolidityPort", "50061") instanceof String ?
              (Integer.parseInt((String) data.getOrDefault("rpcSolidityPort", "50061"))) :
              (int) data.getOrDefault("rpcSolidityPort", 50061);
    }
    ConfigGenerator configGenerator = new ConfigGenerator();
    boolean result = configGenerator.updateConfig(new NetworkConfig(maxHttpConnectNumber, solidityRPCPort, rpcPort,
            httpFullNodePort, httpSolidityPort, httpFullNode, httpSolidity, acrive), id, String.format("%s_%s", Common.configFiled, id+""));
    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
    }

    return new Response(ResultCode.OK.code, "").toJSONObject();
  }


  @PostMapping("/api/p2pConfig")
  public JSONObject p2pConfig(@RequestBody LinkedHashMap<String, Object> data) {
    long id =data.getOrDefault("id", "1") instanceof String ?
            (Long.parseLong((String)data.getOrDefault("id", "1"))) :
            (int) data.getOrDefault("id", 1);
    ArrayList<String> ipList = (ArrayList<String>) data.get("seed_node_ip_list");
    int p2pVersion = data.getOrDefault("p2pVersion", "0") instanceof String ?
            (Integer.parseInt((String) data.getOrDefault("p2pVersion", "0"))) :
            (int) data.getOrDefault("p2pVersion", 0);
    int node_max_active_nodes = data.getOrDefault("maxActiveNodes", "30") instanceof String ?
            (Integer.parseInt((String) data.getOrDefault("maxActiveNodes", "30"))) :
            (int) data.getOrDefault("maxActiveNodes", 30);
    double activeConnectFactor = data.getOrDefault("nodeActiveConnectFactor", "0.1") instanceof String ?
            (Double.parseDouble((String) data.getOrDefault("nodeActiveConnectFactor", "0.1"))) :
            (double) data.getOrDefault("nodeActiveConnectFactor", 0.1);
    int nodeMaxActiveNodesWithSameIp = data.getOrDefault("nodeMaxActiveNodesWithSameIp", "2") instanceof String ?
            (Integer.parseInt((String) data.getOrDefault("nodeMaxActiveNodesWithSameIp", "2"))) :
            (int) data.getOrDefault("nodeMaxActiveNodesWithSameIp", 2);
    double connectFactor = data.getOrDefault("connectFactor", "0.3") instanceof String ?
            (Double.parseDouble((String) data.getOrDefault("connectFactor", "0.3"))) :
            (double) data.getOrDefault("connectFactor", 0.3);
    int listenPort = data.getOrDefault("listenPort", "18883") instanceof String ?
            (Integer.parseInt((String) data.getOrDefault("listenPort", "18883"))) :
            (int) data.getOrDefault("listenPort", 18883);
    int configStatus = data.getOrDefault("configStatus", "1") instanceof String ?
            (Integer.parseInt((String) data.getOrDefault("configStatus", "1"))) :
            (int) data.getOrDefault("configStatus", 1);
    if (configStatus == 0) {
      JSONObject json = readJsonFile();
      json.put(Common.configStatusFiled, configStatus);
      if (!writeJsonFile(json)) {
        return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed).toJSONObject();
      }
    }
    ConfigGenerator configGenerator = new ConfigGenerator();
    boolean result = configGenerator.updateConfig(new P2PConfig(p2pVersion, node_max_active_nodes,
            activeConnectFactor, nodeMaxActiveNodesWithSameIp, connectFactor, ipList, listenPort), id, String.format("%s_%s", Common.configFiled, id+""));

    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
    }
    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  @PostMapping(value = "/api/crossChainConfig")
  public JSONObject crossChainConfig(@RequestBody LinkedHashMap<String, Object> data) {
    boolean enableCrossChain = (boolean) data.getOrDefault("enableCrossChain", false);
    int maxValidatorNumber = data.getOrDefault("maxValidatorNumber", "4") instanceof String ?
            (Integer.parseInt((String) data.getOrDefault("maxValidatorNumber", "4"))) :
            (int) data.getOrDefault("maxValidatorNumber", 4);
    int minValidatorNumber = data.getOrDefault("minValidatorNumber", "1") instanceof String ?
            (Integer.parseInt((String) data.getOrDefault("minValidatorNumber", "1"))) :
            (int) data.getOrDefault("minValidatorNumber", 1);
    double crossChainFee = data.getOrDefault("crossChainFee", "0.01") instanceof String ?
            (Double.parseDouble((String) data.getOrDefault("crossChainFee", "0.01"))) :
            (double) data.getOrDefault("crossChainFee", 0.01);

    JSONObject jsonObject = readJsonFile();
    jsonObject.put(Common.enableCrossChainFiled, enableCrossChain);
    jsonObject.put(Common.maxValidatorNumberFiled, maxValidatorNumber);
    jsonObject.put(Common.minValidatorNumberFiled, minValidatorNumber);
    jsonObject.put(Common.crossChainFeeFiled, crossChainFee);
    boolean result = writeJsonFile(jsonObject);
    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, "update json file failed").toJSONObject();
    }
    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  @PostMapping(value = "/api/baseSettingConfig")
  public JSONObject baseSettingConfig(@RequestBody JSONObject jsonData) {
    long id =jsonData.getOrDefault("id", "1") instanceof String ?
            (Long.parseLong((String)jsonData.getOrDefault("id", "1"))) :
            (int) jsonData.getOrDefault("id", 1);
    String chainId = (String) jsonData.getOrDefault("chainId", "1");
    String chainName = (String) jsonData.getOrDefault("chainName", "Parachain");
    int blockProducedTimeOut = jsonData.getOrDefault("blockProducedTimeOut", "75") instanceof String ?
            (Integer.parseInt((String) jsonData.getOrDefault("blockProducedTimeOut", "75"))) :
            (int) jsonData.getOrDefault("blockProducedTimeOut", 75);
    int maintenanceTimeInterval = jsonData.getOrDefault("maintenanceTimeInterval", "21600000") instanceof String ?
            (Integer.parseInt((String) jsonData.getOrDefault("maintenanceTimeInterval", "21600000"))) :
            (int) jsonData.getOrDefault("maintenanceTimeInterval", 21600000);
    int proposalExpireTime = jsonData.getOrDefault("proposalExpireTime", "259200000") instanceof String ?
            (Integer.parseInt((String) jsonData.getOrDefault("proposalExpireTime", "259200000"))) :
            (int) jsonData.getOrDefault("proposalExpireTime", 259200000);
    int minParticipationRate = jsonData.getOrDefault("minParticipationRate", "15") instanceof String ?
            (Integer.parseInt((String) jsonData.getOrDefault("minParticipationRate", "15"))) :
            (int) jsonData.getOrDefault("minParticipationRate", 15);

    JSONObject jsonObject = readJsonFile();
    jsonObject.put(Common.chainIdFiled, chainId);
    jsonObject.put(Common.chainNameFiled, chainName);
    boolean result = writeJsonFile(jsonObject);
    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, "update json file failed").toJSONObject();
    }
    ConfigGenerator configGenerator = new ConfigGenerator();
    result = configGenerator.updateConfig(new BaseSettingConfig(blockProducedTimeOut, maintenanceTimeInterval,
            proposalExpireTime, minParticipationRate), id, String.format("%s_%s", Common.configFiled, id+""));
    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
    }
    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  @PostMapping(value = "/api/genesisAssetConfig")
  public JSONObject genesisSettingConfig(@RequestBody JSONObject jsonObject) {
    if (!jsonObject.containsKey(Common.assetsFiled)) {
      return new Response(ResultCode.FAILED.code, "miss assets information").toJSONObject();
    }
    Object o = jsonObject.get(Common.assetsFiled);
    ArrayList<LinkedHashMap> arrayList = (ArrayList<LinkedHashMap>) o;
    AtomicBoolean base58check = new AtomicBoolean(false);
    for (LinkedHashMap linkedHashMap : arrayList) {
      String address = (String) linkedHashMap.get("address");
      byte[] bytes = Wallet.decode58Check(address);
      if (bytes == null) {
        base58check.set(true);
      }
    }
    if (base58check.get()) {
      return new Response(ResultCode.ADDRESS_ERROR.code, Common.invalidBase58CheckAddress).toJSONObject();
//        return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.invalidBase58CheckAddress).toJSONObject();
    }

    List<AssetsEntity> assets = (ArrayList<AssetsEntity>) jsonObject.get(Common.assetsFiled);
    ConfigGenerator configGenerator = new ConfigGenerator();
    GenesisAssetConfig genesisAssetConfig = new GenesisAssetConfig();
    genesisAssetConfig.genesis_block_assets = assets;
    boolean result = configGenerator.updateConfig(genesisAssetConfig, Common.configFiled);

    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
    }

    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  @GetMapping(value = "/api/checkAddress")
  public JSONObject checkAddress(@RequestParam(value = "address", required = true, defaultValue = "") String address) {
    boolean result = true;
//    String address = (String) jsonObject.get(Common.addressFiled);
    AtomicBoolean base58check = new AtomicBoolean(false);
    byte[] bytes = Wallet.decode58Check(address);
    if (bytes == null) {
      base58check.set(true);
    }
    if (base58check.get()) {
      result = false;
    }
    JSONObject jsonObj = new JSONObject();
    jsonObj.put("result", result);
    return new Response(ResultCode.OK.code, "", jsonObj).toJSONObject();
  }

  @GetMapping(value = "/api/config")
  public JSONObject getConfig() {
    refresh();
    parseConfig();
    JSONObject configObject = getConfigJsonObject(config);
    return new Response(ResultCode.OK.code, configObject).toJSONObject();

  }

  @GetMapping(value = "/api/dbconfig")
  public JSONObject getDbConfig(long id) {
    refresh(id);
    parseConfig(id);
    JSONObject configObject = getDbConfigJsonObject(config, id);
    return new Response(ResultCode.OK.code, configObject).toJSONObject();

  }

  @GetMapping(value = "/api/p2pConfig")
  public JSONObject getP2PConfig(long id) {
    refresh(id);
    parseConfig(id);
    JSONObject configObject = getP2PConfigJsonObject(config);
    return new Response(ResultCode.OK.code, configObject).toJSONObject();

  }

  @GetMapping(value = "/api/networkconfig")
  public JSONObject getNetworkConfig(long id) {
    refresh(id);
    parseConfig(id);
    JSONObject configObject = getNetworkConfigJsonObject(config);
    return new Response(ResultCode.OK.code, configObject).toJSONObject();

  }

  @GetMapping(value = "/api/CrossChainconfig")
  public JSONObject getCrossChainConfig(long id) {
    refresh(id);
    parseConfig(id);
    JSONObject configObject = getCrossChainConfigJsonObject(config);
    return new Response(ResultCode.OK.code, configObject).toJSONObject();

  }

  @GetMapping(value = "/api/baseSettingConfig")
  public JSONObject getBaseSettingConfig(long id) {
    refresh(id);
    parseConfig(id);
    JSONObject configObject = getBaseSettingConfigJsonObject(config);
    return new Response(ResultCode.OK.code, configObject).toJSONObject();

  }

  @GetMapping(value = "/api/GenesisAssetconfig")
  public JSONObject getGenesisAssetConfig() {
    refresh();
    parseConfig();
    JSONObject configObject = getGenesisAssetConfigJsonObject(config);
    return new Response(ResultCode.OK.code, configObject).toJSONObject();

  }

  @GetMapping(value = "/api/GenesisWitnessconfig")
  public JSONObject getGenesisWitnessConfig() {
    refresh();
    parseConfig();
    JSONObject configObject = getGenesisWitnessConfigJsonObject(config);
    return new Response(ResultCode.OK.code, configObject).toJSONObject();

  }

  @GetMapping(value = "/api/checkBalance")
  public JSONObject checkBalance(
          @RequestParam(value = "balance", required = true, defaultValue = "0") String balance
  ) {
    JSONObject jsonObject = new JSONObject();
    boolean flag = true;
    try {
      Long.parseLong(balance);
    } catch (NumberFormatException e) {
      flag = false;
    }
    jsonObject.put(Common.resultField, flag);
    return new Response(ResultCode.OK.code, jsonObject).toJSONObject();
  }

  //校验用户自定义数据库jar包路径正确性
  private String checkDBJarPath(String path) {
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
          if (lineTxt.contains((Common.findJar))) {
            return Common.findJar;
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

  @PostMapping(value = "/api/quickConfig")
  public JSONObject quickConfig(@RequestBody JSONObject jsonObject) {

    int id = (int) jsonObject.get(Common.idFiled);
    int httpFullNodePort = (int) jsonObject.get(Common.httpFullNodePortFiled);
    int rpcPort = (int) jsonObject.get(Common.rpcPortFiled);
    int configStatus = (int) jsonObject.get(Common.configStatusFiled);

    ConfigGenerator configGenerator = new ConfigGenerator();
    boolean result = configGenerator.updateConfig(new HttpRpcPortConfig(rpcPort,httpFullNodePort),id, String.format("%s_%s", Common.configFiled, id+""));


    /*HashMap<Integer, Integer> configStatusMap = (HashMap<Integer, Integer>) json.get(Common.configStatusMapFiled);
    configStatusMap.put(id,configStatus);*/

    //更新节点配置状态
    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
    JSONObject nodeOld = Util.getNodeInfo(nodes, (long) id);
    nodeOld.put(Common.configStatusFiled, configStatus);
    DeployController deployController = new DeployController();
    deployController.deleteNode((long)id);

    json = readJsonFile();
    JSONArray newNodes = (JSONArray) json.get(Common.nodesFiled);
    if (Objects.isNull(newNodes)) {
      newNodes = new JSONArray();
    }
    newNodes.add(nodeOld);
    json.put(Common.nodesFiled, newNodes);
    NodeController nodeController = new NodeController();
    nodeController.updateNodesInfo(newNodes, json);

    if(result){
      return new Response(ResultCode.OK.code, "保存成功").toJSONObject();
    }
    return new Response(ResultCode.OK.code, "保存失败").toJSONObject();
  }

  @GetMapping(value = "/api/quickConfig")
  public JSONObject quickConfig(@RequestParam long id) {
    Util util = new Util();
    util.parseConfig(id);
    Config config = util.config;
    Args args = new Args();
    int httpPort = args.getHTTPFullNodePort(config);
    int rpcPort = args.getRPCFullNodePort(config);

    JSONObject jsonObject = new JSONObject();
    jsonObject.put("node_http_fullNodePort", httpPort);
    jsonObject.put("node_rpc_port", rpcPort);

    return new Response(ResultCode.OK.code, "",jsonObject).toJSONObject();
  }

}