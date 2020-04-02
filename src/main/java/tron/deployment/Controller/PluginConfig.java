package tron.deployment.Controller;

import static common.Util.parseConfig;
import static common.Util.readJsonFile;
import static common.Util.writeJsonFile;
import static org.tron.core.config.args.Storage.getDbEngineFromConfig;

import common.Args;
import common.Common;
import common.Util;
import config.ActuatorConfig;
//import config.BlockSettingConfig;
import config.ConfigGenerator;
import config.CryptoConfig;
//import config.NetworkConfig;
import org.spongycastle.util.Strings;
import org.springframework.web.bind.annotation.*;
import response.ResultCode;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;
import response.Response;

@CrossOrigin
@RestController
@Component
@RequestMapping(value = "/")
public class PluginConfig {

  @PostMapping(value = "/api/consensus")
  public JSONObject consensus(@RequestBody JSONObject jsonData){
    String consensus = (String) jsonData.getOrDefault("consensus", "dpos");
//    @RequestParam(value = "consensus", required = false, defaultValue = "dpos") String consensus
    JSONObject json = readJsonFile();
    json.put(Common.consensusFiled, consensus);
    if (!writeJsonFile(json)) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed).toJSONObject();
    }
    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  @PostMapping(value = "/api/transaction")
  public JSONObject transaction(
      @RequestBody JSONObject jsonObject
  ){

    if (!jsonObject.containsKey(Common.transactionFiled) || !jsonObject.containsKey(Common.customTransactionFiled)) {
      return new Response(ResultCode.FAILED.code, "miss transaction or custom transaction").toJSONObject();
    }

    JSONObject json = readJsonFile();

    List<String> transactions = (ArrayList<String>)jsonObject.get(Common.transactionFiled);

    String customTransaction = (String) jsonObject.get(Common.customTransactionFiled);
    json.put(Common.customTransactionFiled, customTransaction);
    ConfigGenerator configGenerator = new ConfigGenerator();
    if (!configGenerator.updateConfig(new ActuatorConfig(transactions), Common.configFiled)) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
    }

    int configStatus = jsonObject.getOrDefault("configStatus", "1") instanceof String ?
            (Integer.parseInt((String)jsonObject.getOrDefault("configStatus", "1"))) :
            (int)jsonObject.getOrDefault("configStatus", 1);
    if(configStatus == 0) {
      json.put(Common.configStatusFiled, configStatus);
    }
    if (!writeJsonFile(json)) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed).toJSONObject();
    }
    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  @PostMapping(value = "/api/dbEngine")
  public JSONObject dbEngine(@RequestBody JSONObject jsonData){
    String dbEngine = (String) jsonData.getOrDefault("dbEngine", "leveldb");

//    @RequestParam(value = "dbEngine", required = false, defaultValue = "leveldb") String dbEngine
//  ){

    JSONObject json = readJsonFile();
    json.put(Common.dbEngineFiled, dbEngine);
    if (!writeJsonFile(json)) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed).toJSONObject();
    }
    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  @PostMapping(value = "/api/crypto")
  public JSONObject cryptoEngine(@RequestBody JSONObject jsonData){
    String eckey = (String) jsonData.getOrDefault("crypto", "eckey");

//    @RequestParam(value = "crypto", required = false, defaultValue = "eckey") String eckey
//  ){
    ConfigGenerator configGenerator = new ConfigGenerator();
    boolean result = configGenerator.updateConfig(new CryptoConfig(eckey), Common.configFiled);
    parseConfig();

    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed).toJSONObject();
    }
    ConfigControlller configControlller = new ConfigControlller();
    JSONObject jsonObject = new JSONObject();
    String address = null;
    if (eckey.equals("eckey")) {
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

  @GetMapping(value = "/api/pluginConfig")
  public JSONObject pluginConfig() {
    JSONObject json = readJsonFile();
    JSONObject result = new JSONObject();
    result.put(Common.consensusFiled, json.get(Common.consensusFiled));
    result.put(Common.dbEngineFiled, Strings.toLowerCase(getDbEngineFromConfig(Util.config)));
    result.put(Common.customTransactionFiled, json.get(Common.customTransactionFiled));
    Util.parseConfig();
    result.put(Common.transactionFiled, Args.getActuatorSet(Util.config));
    result.put(Common.cryptoEngine, Args.getCrypto(Util.config));

    return new Response(ResultCode.OK.code, result).toJSONObject();
  }

  @GetMapping(value = "/api/getCrypto")
  public JSONObject getCrypto(@RequestParam(value = "crypto", required = false, defaultValue =
      "eckey") String eckeySm2) {
    parseConfig();
    if (Util.config.hasPath("crypto.engine")) {
      eckeySm2 = Util.config.getString("crypto.engine");
    }
    ConfigGenerator configGenerator = new ConfigGenerator();
    boolean result = configGenerator.updateConfig(new CryptoConfig(eckeySm2), Common.configFiled);
    if (!result) {
      return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed).toJSONObject();
    }
    JSONObject resultJson = new JSONObject();
    resultJson.put(Common.cryptoEngine, eckeySm2);
    return new Response(ResultCode.OK.code, resultJson).toJSONObject();
  }
}
