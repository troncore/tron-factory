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
  public JSONObject dbConfig(
          @RequestParam(value = "isDBSync", required = false, defaultValue = "false") boolean isDBSync,
          @RequestParam(value = "isOpenTransaction", required = false, defaultValue = "on") String isOpenTransaction,
          @RequestParam(value = "dbEnine", required = false, defaultValue = "LEVELDB") String dbEnine,
          @RequestParam(value = "indexDirectory", required = false, defaultValue = "index") String indexDirectory,
          @RequestParam(value = "needToUpdateAsset", required = false, defaultValue = "true") boolean needToUpdateAsset
  ) {
    ConfigGenerator configGenerator = new ConfigGenerator();
    boolean result = configGenerator.updateConfig(new DBConfig(isDBSync, isOpenTransaction,
            dbEnine, indexDirectory, needToUpdateAsset), Common.configFiled);
    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
    }
    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  @PostMapping(value = "/networkconfig")
  public JSONObject networkConfig(
          @RequestParam(value = "maxHttpConnectNumber", required = false, defaultValue = "50") int maxHttpConnectNumber,
          @RequestParam(value = "rpcPort", required = false, defaultValue = "50051") int rpcPort,
          @RequestParam(value = "rpcSolidityPort", required = false, defaultValue = "50061") int solidityRPCPort,
          @RequestParam(value = "httpFullNodePort", required = false, defaultValue = "8090") int httpFullNodePort,
          @RequestParam(value = "httpSolidityPort", required = false, defaultValue = "8091") int httpSolidityPort
  ) {
    ConfigGenerator configGenerator = new ConfigGenerator();
    boolean result = configGenerator.updateConfig(new NetworkConfig(maxHttpConnectNumber, solidityRPCPort, rpcPort,
            httpFullNodePort, httpSolidityPort), Common.configFiled);
    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
    }

    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  @PostMapping("/p2pconfig")
  public JSONObject p2pConfig(
          @RequestParam(value = "p2pVersion", required = false, defaultValue = "0") int p2pVersion,
          @RequestParam(value = "maxActiveNodes", required = false, defaultValue = "30") int node_max_active_nodes,
          @RequestParam(value = "nodeActiveConnectFactor", required = false, defaultValue = "0.1") double activeConnectFactor,
          @RequestParam(value = "nodeMaxActiveNodesWithSameIp", required = false, defaultValue = "2") int nodeMaxActiveNodesWithSameIp,
          @RequestParam(value = "connectFactor", required = false, defaultValue = "0.3") double connectFactor,
          @RequestParam(value = "listenPort", required = false, defaultValue = "18883") int listenPort,
          @RequestBody List<String> ipList //seedNode
  ) {
    ConfigGenerator configGenerator = new ConfigGenerator();
    boolean result = configGenerator.updateConfig(new P2PConfig(p2pVersion, node_max_active_nodes,
            activeConnectFactor, nodeMaxActiveNodesWithSameIp, connectFactor, ipList, listenPort), Common.configFiled);

    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
    }
    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  @PostMapping(value = "/crossChainConfig")
  public JSONObject dbConfig(
          @RequestParam(value = "enableCrossChain", required = false, defaultValue = "false") boolean enableCrossChain,
          @RequestParam(value = "maxValidatorNumber", required = false, defaultValue = "4") int maxValidatorNumber,
          @RequestParam(value = "minValidatorNumber", required = false, defaultValue = "1") int minValidatorNumber,
          @RequestParam(value = "crossChainFee", required = false, defaultValue = "0.00") double crossChainFee
  ) {
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
  public JSONObject baseSettingConfig(
          @RequestParam(value = "chainId", required = false, defaultValue = "1") String chainId,
          @RequestParam(value = "chainName", required = false, defaultValue = "Parachain") String chainName,
          @RequestParam(value = "blockProducedTimeOut", required = false, defaultValue = "75") int blockProducedTimeOut,
          @RequestParam(value = "maintenanceTimeInterval", required = false, defaultValue = "21600000") int maintenanceTimeInterval,
          @RequestParam(value = "proposalExpireTime", required = false, defaultValue = "259200000") int proposalExpireTime,
          @RequestParam(value = "minParticipationRate", required = false, defaultValue = "15") int minParticipationRate) {
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
