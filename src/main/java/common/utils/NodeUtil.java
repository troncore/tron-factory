package common.utils;

import common.Common;
import config.*;
import entity.WitnessEntity;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import response.Response;
import response.ResultCode;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;

import static common.LogConfig.LOG;
import static common.Util.writeJsonFile;

public class NodeUtil {

    ConfigGenerator configGenerator = new ConfigGenerator();

    ArrayList<WitnessEntity> witnessnodes = new ArrayList<>();

    //更新节点全部信息
    public JSONObject updateNodesInfo(JSONArray nodes, JSONObject json, long id , HashMap<String,String> ipList, int listenPort, int httpFullNodePort, int rpcFullNodePort, boolean isDeleteNode, HashMap<String,Integer> nodeHttpPortMap, HashMap<String,Integer> nodeRpcPortMap) {

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

        if(!configGenerator.updateConfig(new HttpRpcPortConfig(rpcFullNodePort, httpFullNodePort), id, String.format("%s_%s", Common.configFiled, id+""))){
            LOG.error("update httpRpcPort config file failed");
            return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, "update httpRpcPort config file failed").toJSONObject();
        }

        if (!configGenerator.updateConfig(witnessConfig, Common.configFiled)) {
            LOG.error("update witness config file failed");
            return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, "update witness config file failed").toJSONObject();
        }

        if(!isDeleteNode){
            //更新listenPort信息
            boolean result = configGenerator.updateConfig(
                    new ListenPortConfig((int) listenPort), id, String.format("%s_%s", Common.configFiled, id+""));

            if (!result) {
                return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.updateConfigFileFailed).toJSONObject();
            }
        }


        json.put(Common.nodesFiled, nodes);
        json.put(Common.ipListFiled, ipList);
        json.put(Common.nodeHttpPortMapField, nodeHttpPortMap);
        json.put(Common.nodeRpcPortMapField, nodeRpcPortMap);

        if (!writeJsonFile(json)) {
            return new Response(ResultCode.INTERNAL_SERVER_ERROR.code, Common.writeJsonFileFailed).toJSONObject();
        }

        return new Response(ResultCode.OK_NO_CONTENT.code, "").toJSONObject();
    }

    //更新节点信息
    public JSONObject updateNodesInfo(JSONArray nodes, JSONObject json, ArrayList<String> ipList) {

        for (int i = 0; i < nodes.size(); i++) {
            JSONObject node = (JSONObject) nodes.get(i);
            boolean isSR = (Boolean) node.get(Common.isSRFiled);

            if (isSR) {
                witnessnodes.add(new WitnessEntity((String) node.get(Common.publicKeyFiled),
                        (String) node.get(Common.urlFiled), (String) node.get(Common.voteCountFiled)));
            }
        }

        if(null != ipList){
            configGenerator.updateConfig(new SeedNodeConfig(ipList), Common.configFiled);
            configGenerator.updateConfig(new ActiveConfig(ipList), Common.configFiled);
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


}
