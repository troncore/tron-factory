package tron.deployment.Controller;

import static common.LogConfig.LOG;
import static common.Util.parseConfig;
import static common.Util.readJsonFile;
import static common.Util.writeJsonFile;
import static wallet.Wallet.hexs2Bytes;
import static wallet.Wallet.private2AddressEckey;
import static wallet.Wallet.private2AddressSm2;


import com.typesafe.config.Config;
import common.Common;
//import common.LogConfig;
import config.SeedNodeConfig;

//import java.util.List;

import java.util.LinkedHashMap;
import org.springframework.web.bind.annotation.*;
import response.ResultCode;
import common.Util;
import entity.WitnessEntity;
import config.GenesisWitnessConfig;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Objects;

import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;
import org.tron.keystore.CipherException;
import response.Response;
import config.ConfigGenerator;


@CrossOrigin
@RestController
@Component
@RequestMapping(value = "/")
@Slf4j
public class NodeController {

  private static boolean isEckey = true;

  static {
    refresh();
  }
  private static void refresh() {
    parseConfig();
    if (Util.config.hasPath("crypto.engine")) {
      isEckey = Util.config.getString("crypto.engine").equalsIgnoreCase("eckey");
    }
  }
  private JSONObject updateNodesInfo(JSONArray nodes, JSONObject json) {
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

  private JSONArray removeNodeInfo(JSONArray nodes, Long id, boolean flag) {
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

  @PostMapping(value = "/nodeInfo")
  public JSONObject addNode(@RequestBody LinkedHashMap<String,Object> data) {
    refresh();
    String userName = (String) data.getOrDefault("userName", "node1");
    String ip = (String) data.getOrDefault("ip", "127.0.0.1");
    boolean isSR = (boolean) data.getOrDefault("isSR", false);
    String url = (String) data.getOrDefault("url", "");
    String privateKey = (String) data.getOrDefault("privateKey", "");
    String voteCount = (String) data.getOrDefault("voteCount", "104");
    boolean needSyncCheck = (boolean) data.getOrDefault("needSyncCheck", true);
    Long id =data.getOrDefault("id", "1") instanceof String ?
        (Long.parseLong((String)data.getOrDefault("id", "1"))) :
        (Long) data.getOrDefault("id", 1);
    int port =data.getOrDefault("port", "8090") instanceof String ?
        (Integer.parseInt((String)data.getOrDefault("port", "8090"))) :
        (int)data.getOrDefault("port", 8090);


    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
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
      String path;
      String publicKey;
      try {
        path = Util.importPrivateKey(hexs2Bytes(privateKey.getBytes()));
        if (isEckey) {
          publicKey = private2AddressEckey(hexs2Bytes(privateKey.getBytes()));
        } else {
          publicKey = private2AddressSm2(hexs2Bytes(privateKey.getBytes()));
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
    newNode.put(Common.isSRFiled, isSR);
    newNode.put(Common.urlFiled, url);
    newNode.put(Common.voteCountFiled, voteCount);
    newNode.put(Common.needSyncCheck, needSyncCheck);
    nodes.add(newNode);

    return updateNodesInfo(nodes, json);
  }

  @PutMapping(value = "/nodeInfo")
  public JSONObject updateNode(@RequestBody LinkedHashMap<String,Object> data) {
    String userName = (String) data.getOrDefault("userName", "node1");
    String ip = (String) data.getOrDefault("ip", "127.0.0.1");
    boolean isSR = (boolean) data.getOrDefault("isSR", false);
    String url = (String) data.getOrDefault("url", "");
    String key = (String) data.getOrDefault("privateKey", "");
    String voteCount = (String) data.getOrDefault("voteCount", "104");
    boolean needSyncCheck = (boolean) data.getOrDefault("needSyncCheck", true);
    long id =data.getOrDefault("id", "1") instanceof String ?
        (Long.parseLong((String)data.getOrDefault("id", "1"))) :
        (int) data.getOrDefault("id", 1);
    int port =data.getOrDefault("port", "8090") instanceof String ?
        (Integer.parseInt((String)data.getOrDefault("port", "8090"))) :
        (int)data.getOrDefault("port", 8090);


    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
    JSONObject node = Util.getNodeInfo(nodes, id);
    if (node == null) {
      return new Response(ResultCode.NOT_FOUND.code, Common.nodeIdNotExistFailed).toJSONObject();
    }

    boolean flag = key.length() != 0;
    nodes = removeNodeInfo(nodes, id, flag);
    if (key.length() != 0) {
      String path;
      String publicKey;
      try {
        path = Util.importPrivateKey(hexs2Bytes(key.getBytes()));
        if (isEckey) {
          publicKey = private2AddressEckey(hexs2Bytes(key.getBytes()));
        } else {
          publicKey = private2AddressSm2(hexs2Bytes(key.getBytes()));
        }
        node.put(Common.privateKeyFiled, path);
        node.put(Common.publicKeyFiled, publicKey);
      } catch (CipherException | IOException e) {
        LOG.error(e.toString());
        return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.savePrivateKeyFailed).toJSONObject();
      }
    }

    node.put(Common.userNameFiled, userName);
    node.put(Common.portFiled, port);
    node.put(Common.ipFiled, ip);
    node.put(Common.isSRFiled, isSR);
    node.put(Common.urlFiled, url);
    node.put(Common.voteCountFiled, voteCount);
    node.put(Common.needSyncCheck, needSyncCheck);
    nodes.add(node);
    json.put(Common.nodesFiled, nodes);

    return updateNodesInfo(nodes, json);
  }


  @GetMapping(value ="/nodeInfo" )
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
    return new Response(ResultCode.OK.code, node).toJSONObject();
  }

  @GetMapping(value = "/allNodeInfo")
  public JSONObject getAllNode(
  ) {

    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
    return new Response(ResultCode.OK.code, nodes).toJSONObject();
  }

  @PostMapping(value = "/initConfig")
  public JSONObject initConfig() {
    ConfigGenerator configGenerator = new ConfigGenerator();
    if (!configGenerator.updateConfig(new SeedNodeConfig(new ArrayList<>()), Common.configFiled)) {
      LOG.error("update seed node config file failed");
    }
    return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
  }

  @DeleteMapping(value = "/nodeInfo")
  public JSONObject deleteNode(@RequestParam(value = "id", required = true, defaultValue = "1") Long id) {

    JSONObject json = readJsonFile();
    JSONArray nodes = (JSONArray) json.get(Common.nodesFiled);
    if (Objects.isNull(nodes)) {
      nodes = new JSONArray();
    }

    JSONArray newNodes = removeNodeInfo(nodes, id, true);
    if (newNodes.size() == nodes.size()) {
      return new Response(ResultCode.NOT_FOUND.code, Common.nodeIdNotExistFailed).toJSONObject();
    }

    return updateNodesInfo(newNodes, json);
  }

}
