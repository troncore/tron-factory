package tron.deployment.shellExecutor;

import static common.Common.logFormat;
import static common.LogConfig.LOG;

import common.Common;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;


@Slf4j
public class BashExecutor {

    public void callScript(String ip, Long port, String userName, String jarPath, String privateKey, Long id, String plugin, String sshPassword, String serviceType){

        try {
//            String absolutePath = System.getProperty("user.dir").concat("/deployNodeLocal.bash");
            String absolutePath = "";
            if(serviceType.equals("remote")){
                if(sshPassword.equals("")){
                    absolutePath = System.getProperty("user.dir").concat("/deployNode.bash");
                }else{
                    absolutePath = System.getProperty("user.dir").concat("/deployNodePWD.bash");
                }

            }else{
                absolutePath = System.getProperty("user.dir").concat("/deployNodeLocal.bash");
            }
            String configPath = String.format("%s_%s", Common.configFiled, id.toString());
            String[] cmdArray = {absolutePath, ip, port.toString(), userName, jarPath, configPath, plugin, sshPassword, id.toString()};
            if (privateKey.length() != 0) {
                cmdArray = ArrayUtils.add(cmdArray, privateKey);
            }
            String logName = String.format("> ".concat(logFormat), id.toString());
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

    public void callZipPathScript(String filePath){

        try {
            String absolutePath = System.getProperty("user.dir").concat("/sshConnect.bash");
            String[] cmdArray = {filePath};
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

}