package tron.deployment.shellExecutor;

import static common.Common.logFormat;
import static common.LogConfig.LOG;

import common.Common;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

import java.lang.reflect.Array;
import java.util.ArrayList;


@Slf4j
public class BashExecutor {

    public void callScript(String ip, Long port, String userName, String jarPath, String privateKey, Long id, String plugin, String sshPassword, String dbCustom, String fullNodePort, String solidityPort, String listenPort, String rpcPort, String rpcsolidityPort, String chainId, String nodeId){

        try {
            String absolutePath = "";
            //密码登录：deployNodePWD.bash  密钥登录：deployNode.bash
            if(sshPassword.equals("")){
                absolutePath = System.getProperty("user.dir").concat("/deployNode.bash");
            }else{
                absolutePath = System.getProperty("user.dir").concat("/deployNodePWD.bash");
            }
            String configPath = String.format("%s_%s", Common.configFiled, id.toString());
            String[] cmdArray = {absolutePath, ip, port.toString(), userName, jarPath, configPath, plugin, sshPassword, id.toString()};
            cmdArray = ArrayUtils.add(cmdArray, privateKey);
            cmdArray = ArrayUtils.add(cmdArray, dbCustom);
            cmdArray = ArrayUtils.add(cmdArray, chainId);
            cmdArray = ArrayUtils.add(cmdArray, fullNodePort);
            cmdArray = ArrayUtils.add(cmdArray, solidityPort);
            cmdArray = ArrayUtils.add(cmdArray, listenPort);
            cmdArray = ArrayUtils.add(cmdArray, rpcPort);
            cmdArray = ArrayUtils.add(cmdArray, rpcsolidityPort);


            String logName = String.format("> ".concat(Common.logFormat),nodeId,id);
            cmdArray = ArrayUtils.add(cmdArray, logName);
            String cmd = StringUtils.join(cmdArray, " ");
            Process process= Runtime.getRuntime().exec(new String[]{"bash", "-c", cmd});
            process.waitFor();
            LOG.info("deploy cmd: {}", cmd);

        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

//密钥登录：添加节点时检查ssh连通性
    public void callSSHScript(String ip, int port, String userName){

        try {
            String absolutePath = System.getProperty("user.dir").concat("/sshConnect.bash");
            String[] cmdArray = {absolutePath, ip, port+"", userName};
            String logName = String.format("> ".concat(Common.sshLogFormat));
            cmdArray = ArrayUtils.add(cmdArray, logName);
            String cmd = StringUtils.join(cmdArray, " ");
            Process process= Runtime.getRuntime().exec(new String[]{"bash", "-c", cmd});
            process.waitFor();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

//密码登录：添加节点时检查ssh连通性
    public void callSSHPWDScript(String ip, int port, String userName, String sshPassword){

        try {
            String absolutePath = System.getProperty("user.dir").concat("/sshPWDConnect.bash");
            String[] cmdArray = {absolutePath, ip, port+"", userName, sshPassword};
            String logName = String.format("> ".concat(Common.sshLogFormat));
            cmdArray = ArrayUtils.add(cmdArray, logName);
            String cmd = StringUtils.join(cmdArray, " ");
            Process process= Runtime.getRuntime().exec(new String[]{"bash", "-c", cmd});
            process.waitFor();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    //检查用户上传的zip包路径是否正确
    public void callZipPathScript(String filePath){

        try {
            String absolutePath = System.getProperty("user.dir").concat("/checkZipPath.bash");
            String[] cmdArray = {absolutePath, filePath};
            String logName = String.format("> ".concat(Common.ZipPathFormat));
            cmdArray = ArrayUtils.add(cmdArray, logName);
            String cmd = StringUtils.join(cmdArray, " ");
            Process process= Runtime.getRuntime().exec(new String[]{"bash", "-c", cmd});
            process.waitFor();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    //检查用户上传的自定义jar包路径是否正确
    public void callDBJarPathScript(String filePath){

        try {
            String absolutePath = System.getProperty("user.dir").concat("/checkDBJarPath.bash");
            String[] cmdArray = {absolutePath, filePath};
            String logName = String.format("> ".concat(Common.dbJarPathFormat));
            cmdArray = ArrayUtils.add(cmdArray, logName);
            String cmd = StringUtils.join(cmdArray, " ");
            Process process= Runtime.getRuntime().exec(new String[]{"bash", "-c", cmd});
            process.waitFor();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    public void callStopNodeScript(String ip, Long port, String userName, Long id,  String chainId, String sshPassword){

        try {
            String absolutePath = "";
            //密码登录：deployNodePWD.bash  密钥登录：deployNode.bash
            if(sshPassword.equals("")){
                absolutePath = System.getProperty("user.dir").concat("/stopNode.bash");
            }else{
                absolutePath = System.getProperty("user.dir").concat("/stopNodePWD.bash");
            }
//            String configPath = String.format("%s_%s", Common.configFiled, id.toString());
            String[] cmdArray = {absolutePath, ip, port.toString(), userName, id.toString(), chainId, sshPassword};

            String logName = String.format("> ".concat(Common.stopNodeFormat), id.toString());
            cmdArray = ArrayUtils.add(cmdArray, logName);
            String cmd = StringUtils.join(cmdArray, " ");
            Process process= Runtime.getRuntime().exec(new String[]{"bash", "-c", cmd});
            process.waitFor();
            LOG.info("deploy cmd: {}", cmd);

        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    public void callStopPortScript(String ip, Long port, String userName, long id, String httpPort, String httpSolidityPort, String rpcPort, String rpcSolidityport, String listenPort, String sshPassword){

        try {
            String absolutePath = "";
            //密码登录：deployNodePWD.bash  密钥登录：deployNode.bash
            if(sshPassword.equals("")){
                absolutePath = System.getProperty("user.dir").concat("/stopPort.bash");
            }else{
                absolutePath = System.getProperty("user.dir").concat("/stopPortPWD.bash");
            }
//            String configPath = String.format("%s_%s", Common.configFiled, id.toString());
            String[] cmdArray = {absolutePath, ip, port.toString(), userName, httpPort,httpSolidityPort,rpcPort,rpcSolidityport,listenPort, sshPassword};

            String logName = String.format("> ".concat(Common.stopPortFormat), id+"");
            cmdArray = ArrayUtils.add(cmdArray, logName);
            String cmd = StringUtils.join(cmdArray, " ");
            Process process= Runtime.getRuntime().exec(new String[]{"bash", "-c", cmd});
            process.waitFor();
            LOG.info("deploy cmd: {}", cmd);

        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

}