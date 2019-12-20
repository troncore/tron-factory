package config;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import com.typesafe.config.ConfigRenderOptions;

import common.Common;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Serializable;
import java.lang.reflect.Field;

public class ConfigGenerator {

    protected static final Logger logger = LoggerFactory.getLogger("ConfigGenerator");

    public boolean updateConfig(Serializable configuration, String newFile){
        // Load the original config file
        File defaultConfigFile = new File(Common.configFiled);
        Config defaultConfig = ConfigFactory.parseFile(defaultConfigFile);
        //use string builder to generate Config String
        StringBuilder configSB = new StringBuilder();
        Field[] fields = configuration.getClass().getFields();
        for(Field field : fields ){
            String fieldName = field.getName();
            // parse to right format
            fieldName = fieldName.replace("_",".");
            Object value = null;
            try {
                value = field.get(configuration); // get the value
            } catch (IllegalAccessException e) {
                logger.error(e.getMessage());
//                e.printStackTrace();
            }
            // generate the config string in typesafe's format
            if (value!=null) {
                configSB.append(fieldName).append("=")
                    .append(value.toString()).append(",");
            }
        }
        Config modifiedConfig = ConfigFactory.parseString(configSB.toString());
        Config newConfig = modifiedConfig.withFallback(defaultConfig);
        String configStr = newConfig.root().render(ConfigRenderOptions.defaults().setOriginComments(false).setComments(false).setJson(false));
        File tempConfigFile = new File(newFile);
        FileWriter fileWriter = null;
        try{
            tempConfigFile.delete();
            tempConfigFile.createNewFile();
            fileWriter = new FileWriter(tempConfigFile);
            fileWriter.write(configStr);
            fileWriter.flush();
//            fileWriter.close();
        }
        catch (IOException e){
            logger.error(e.getMessage());
//            e.printStackTrace();
            return false;
        } finally {
            try {
                fileWriter.close();
            } catch (IOException e) {
                logger.error(e.getMessage());
            }
        }
        return true;
    }
}
