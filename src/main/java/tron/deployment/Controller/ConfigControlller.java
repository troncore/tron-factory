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
import java.util.LinkedHashMap;

import org.springframework.web.bind.annotation.*;
//import response.ResultCode;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
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
  String chainId;
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

  private void initCrossSetting() {

    JSONObject json = readJsonFile();
    crossChainConfig = new CrossChainConfig((boolean) json.get(Common.enableCrossChainFiled),
            (Long) json.get(Common.maxValidatorNumberFiled), (Long) json.get(Common.minValidatorNumberFiled), (Double) json.get(Common.crossChainFeeFiled));
  }

  private void initBaseSettingConfig() {
    JSONObject json = readJsonFile();
    chainId = (String) json.get(Common.chainIdFiled);
    chainName = (String) json.get(Common.chainNameFiled);
    baseSettingConfig = new BaseSettingConfig(Args.getBlockProducedTimeOut(config), Args.getMaintenanceTimeInterval(config),
            Args.getProposalExpireTime(config), Args.getMinParticipationRate(config));
  }

  private String dbCustomConfig() {
    JSONObject json = readJsonFile();
    dbCustom = (String) json.get(Common.dbCustomFiled);
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
            Args.getNodeHttpFullnodeEnable(loadConfig), Args.getNodeHttpSolidityEnable(loadConfig));

    // crossChain
    initCrossSetting();

    // baseSetting
    initBaseSettingConfig();

    // GenesisAsset
    genesisAssetConfig = new GenesisAssetConfig(Args.getAccountsFromConfig(loadConfig));

    // GenesisWitness
    genesisWitnessConfig = new GenesisWitnessConfig(Args.getWitnessesFromConfig(loadConfig));
  }

  private JSONObject getConfigJsonObject(com.typesafe.config.Config loadConfig) {
    loadConfig(loadConfig);
    JSONObject configObject = new JSONObject();

    JSONObject dbObject = generateJSONObject(dbConfig.getClass().getFields(), dbConfig);
    dbObject.put("storage_db_custom", dbCustomConfig());
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

  @PostMapping(value = "/api/dbconfig")
  public JSONObject dbConfig(@RequestBody LinkedHashMap<String, Object> data) {
    boolean isDBSync = (boolean) data.getOrDefault("isDBSync", false);
    String isOpenTransaction = (String) data.getOrDefault("isOpenTransaction", "on");
    String dbEnine = (String) data.getOrDefault("dbEnine", "LEVELDB");
//    String indexDirectory = (String) data.getOrDefault("indexDirectory", "index");
    boolean needToUpdateAsset = (boolean) data.getOrDefault("needToUpdateAsset", true);

    // 自定义数据库配置
    String dbCustom = (String) data.getOrDefault("dbCustom", "");
    //检查自定义数据库jar包路径是否正确
    BashExecutor bashExecutor = new BashExecutor();
    bashExecutor.callDBJarPathScript(dbCustom);
    String checkDBJarPath = checkDBJarPath(String.format(Common.dbJarPathFormat));
    if (checkDBJarPath.equals(Common.canNotFindJar)) {
      return new Response(ResultCode.OK.code, Common.canNotFindJar).toJSONObject();
    }

    JSONObject json = readJsonFile();
    json.put(Common.dbCustomFiled, dbCustom);
    if (!writeJsonFile(json)) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed).toJSONObject();
    }

    ConfigGenerator configGenerator = new ConfigGenerator();
//    boolean result = configGenerator.updateConfig(new DBConfig(isDBSync, isOpenTransaction,
//            dbEnine, indexDirectory, needToUpdateAsset), Common.configFiled);
    boolean result = configGenerator.updateConfig(new DBConfig(isDBSync, isOpenTransaction,
            dbEnine, needToUpdateAsset), Common.configFiled);
    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
    }
    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  @PostMapping(value = "/api/networkconfig")
  public JSONObject networkConfig(@RequestBody LinkedHashMap<String, Object> data) {
    int maxHttpConnectNumber = data.getOrDefault("maxHttpConnectNumber", "50") instanceof String ?
            (Integer.parseInt((String) data.getOrDefault("maxHttpConnectNumber", "50"))) :
            (int) data.getOrDefault("maxHttpConnectNumber", 50);
    int rpcPort = data.getOrDefault("rpcPort", "50051") instanceof String ?
            (Integer.parseInt((String) data.getOrDefault("rpcPort", "50051"))) :
            (int) data.getOrDefault("rpcPort", 50051);
    int solidityRPCPort = data.getOrDefault("rpcSolidityPort", "50061") instanceof String ?
            (Integer.parseInt((String) data.getOrDefault("rpcSolidityPort", "50061"))) :
            (int) data.getOrDefault("rpcSolidityPort", 50061);
    int httpFullNodePort = data.getOrDefault("httpFullNodePort", "8090") instanceof String ?
            (Integer.parseInt((String) data.getOrDefault("httpFullNodePort", "8090"))) :
            (int) data.getOrDefault("httpFullNodePort", 8090);
    int httpSolidityPort = data.getOrDefault("httpSolidityPort", "8091") instanceof String ?
            (Integer.parseInt((String) data.getOrDefault("httpSolidityPort", "8091"))) :
            (int) data.getOrDefault("httpSolidityPort", 8091);
    boolean httpFullNode = (boolean) data.getOrDefault("fullNodeEnable", true);
    boolean httpSolidity = (boolean) data.getOrDefault("solidityEnable", true);


    ConfigGenerator configGenerator = new ConfigGenerator();
    boolean result = configGenerator.updateConfig(new NetworkConfig(maxHttpConnectNumber, solidityRPCPort, rpcPort,
            httpFullNodePort, httpSolidityPort, httpFullNode, httpSolidity), Common.configFiled);
    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
    }

    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }


  @PostMapping("/api/p2pconfig")
  public JSONObject p2pConfig(@RequestBody LinkedHashMap<String, Object> data) {

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
            activeConnectFactor, nodeMaxActiveNodesWithSameIp, connectFactor, ipList, listenPort), Common.configFiled);

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
            proposalExpireTime, minParticipationRate), Common.configFiled);
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

  @GetMapping(value = "/api/config")
  public JSONObject getConfig() {
    refresh();
    parseConfig();
    JSONObject configObject = getConfigJsonObject(config);
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

  private String checkDBJarPath(String path) {
    File file = new File(path);
    if (file.isFile() && file.exists()) {
      try {
        InputStreamReader read = new InputStreamReader(
                new FileInputStream(file), Common.encoding);
        BufferedReader bufferedReader = new BufferedReader(read);
        String lineTxt;

        while ((lineTxt = bufferedReader.readLine()) != null) {
          if (lineTxt.contains(Common.canNotFindJar)) {
            return Common.canNotFindJar;
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
}