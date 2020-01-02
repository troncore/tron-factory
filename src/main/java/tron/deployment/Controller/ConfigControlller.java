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

import entity.AssetsEntity;
import common.Args;
import common.Common;
import java.util.LinkedHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import response.ResultCode;
import config.BaseSettingConfig;
import config.CrossChainConfig;
import config.DBConfig;
import config.GenesisAssetConfig;
import config.GenesisWitnessConfig;
import config.NetworkConfig;
import config.P2PConfig;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;
import response.Response;
import config.ConfigGenerator;


@CrossOrigin
@RestController
@Component
@RequestMapping(value = "/")
public class ConfigControlller {
  String chainId;
  String chainName;
  // db
  DBConfig dbConfig;

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
            Args.getHTTPFullNodePort(loadConfig), Args.getHTTPSolidityNodePort(loadConfig));

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

  @PostMapping(value = "/dbconfig")
  public JSONObject dbConfig(@RequestBody LinkedHashMap<String,Object> data) {
    boolean isDBSync = (boolean) data.getOrDefault("isDBSync", "false");
    String isOpenTransaction = (String) data.getOrDefault("isOpenTransaction", "on");
    String dbEnine = (String) data.getOrDefault("dbEnine", "LEVELDB");
    String indexDirectory = (String) data.getOrDefault("indexDirectory", "index");
    boolean needToUpdateAsset = (boolean) data.getOrDefault("needToUpdateAsset", "true");

//    @RequestParam(value = "isDBSync", required = false, defaultValue = "false") boolean isDBSync,
//          @RequestParam(value = "isOpenTransaction", required = false, defaultValue = "on") String isOpenTransaction,
//          @RequestParam(value = "dbEnine", required = false, defaultValue = "LEVELDB") String dbEnine,
//          @RequestParam(value = "indexDirectory", required = false, defaultValue = "index") String indexDirectory,
//          @RequestParam(value = "needToUpdateAsset", required = false, defaultValue = "true") boolean needToUpdateAsset
//  ) {
    ConfigGenerator configGenerator = new ConfigGenerator();
    boolean result = configGenerator.updateConfig(new DBConfig(isDBSync, isOpenTransaction,
            dbEnine, indexDirectory, needToUpdateAsset), Common.configFiled);
    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
    }
    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  @PostMapping(value = "/networkconfig")
  public JSONObject networkConfig(@RequestBody LinkedHashMap<String,Object> data) {
    int maxHttpConnectNumber = (int) data.getOrDefault("maxHttpConnectNumber", "50");
    int rpcPort = (int) data.getOrDefault("rpcPort", "50051");
    int solidityRPCPort = (int) data.getOrDefault("rpcSolidityPort", "50061");
    int httpFullNodePort = (int) data.getOrDefault("httpFullNodePort", "8090");
    int httpSolidityPort = (int) data.getOrDefault("httpSolidityPort", "8091");

    ConfigGenerator configGenerator = new ConfigGenerator();
    boolean result = configGenerator.updateConfig(new NetworkConfig(maxHttpConnectNumber, solidityRPCPort, rpcPort,
            httpFullNodePort, httpSolidityPort), Common.configFiled);
    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
    }

    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }


  @PostMapping("/p2pconfig")
  public JSONObject p2pConfig(@RequestBody LinkedHashMap<String,Object> data) {
    ArrayList<String> ipList= (ArrayList<String>) data.get("seed_node_ip_list");
    int p2pVersion = (int) data.getOrDefault("p2pVersion", 0);
    int node_max_active_nodes = (int) data.getOrDefault("maxActiveNodes", 30);
    double activeConnectFactor = (double) data.getOrDefault("nodeActiveConnectFactor", 0.1);
    int nodeMaxActiveNodesWithSameIp = (int) data.getOrDefault("nodeMaxActiveNodesWithSameIp", 2);
    double connectFactor = (double) data.getOrDefault("connectFactor", 0.3);
    int listenPort = (int) data.getOrDefault("listenPort", 18883);
    ConfigGenerator configGenerator = new ConfigGenerator();
    boolean result = configGenerator.updateConfig(new P2PConfig(p2pVersion, node_max_active_nodes,
            activeConnectFactor, nodeMaxActiveNodesWithSameIp, connectFactor, ipList, listenPort), Common.configFiled);

    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
    }
    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  @PostMapping(value = "/crossChainConfig")
  public JSONObject crossChainConfig(@RequestBody LinkedHashMap<String,Object> data) {
    boolean enableCrossChain = (boolean) data.getOrDefault("enableCrossChain", "false");
    int maxValidatorNumber = (int) data.getOrDefault("maxValidatorNumber", "4");
    int minValidatorNumber = (int) data.getOrDefault("minValidatorNumber", "1");
    double crossChainFee = (double) data.getOrDefault("crossChainFee", "0.01");

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

  @PostMapping(value = "/baseSettingConfig")
  public JSONObject baseSettingConfig(@RequestBody LinkedHashMap<String,Object> data) {
    String chainId = (String) data.getOrDefault("chainId", "1");
    String chainName = (String) data.getOrDefault("chainName", "Parachain");
    int blockProducedTimeOut = (int) data.getOrDefault("blockProducedTimeOut", 75);
    int maintenanceTimeInterval = (int) data.getOrDefault("maintenanceTimeInterval", 21600000);
    int proposalExpireTime = (int) data.getOrDefault("proposalExpireTime", 259200000);
    int minParticipationRate = (int) data.getOrDefault("minParticipationRate", 15);

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

  @PostMapping(value = "/genesisAssetConfig")
  public JSONObject genesisSettingConfig(@RequestBody JSONObject jsonObject) {
    if (!jsonObject.containsKey(Common.assetsFiled)) {
      return new Response(ResultCode.FAILED.code, "miss assets information").toJSONObject();
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

  @GetMapping(value = "/config")
  public JSONObject getConfig() {
    parseConfig();
    JSONObject configObject = getConfigJsonObject(config);
    return new Response(ResultCode.OK.code, configObject).toJSONObject();
  }

  @GetMapping(value = "/checkBalance")
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
}
