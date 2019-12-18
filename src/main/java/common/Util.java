package common;

import static wallet.Wallet.store2Keystore;
import static wallet.WalletFile.createWalletFile;

import com.typesafe.config.ConfigFactory;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.tron.keystore.CipherException;
import wallet.WalletFile;

public class Util {
  public static com.typesafe.config.Config config;
  protected static final Logger logger = LoggerFactory.getLogger("Util");


  public static void parseConfig() {
    File confFile = new File(Common.configFiled);
    config = ConfigFactory.parseFile(confFile);
  }

  public static JSONObject readJsonFile() {
    JSONParser parser = new JSONParser();
    JSONObject jsonObject = null;
    try {
      Object obj = parser.parse(new FileReader(Common.databaseFiled));
      jsonObject = (JSONObject) obj;
    } catch (IOException | ParseException e) {
      logger.error(e.getMessage());
    }
    return jsonObject;
  }

  public static boolean writeJsonFile(JSONObject json) {
    Writer write;

    try {
      write = new OutputStreamWriter(new FileOutputStream(Common.databaseFiled), StandardCharsets.UTF_8);
      write.write(json.toString());
      write.flush();
      write.close();
    } catch (IOException e) {
      logger.error(e.getMessage());
      return false;
    }
    return true;
  }

  public static JSONObject getNodeInfo(JSONArray nodes, Long id) {
    for (int i = 0; i < nodes.size(); i++) {
      JSONObject node = (JSONObject) nodes.get(i);
      Long nodeID = (Long) node.get(Common.idFiled);
      if (nodeID.equals(id)) {
        return node;
      }
    }
    return null;
  }

  public static String importPrivateKey(byte[] priKey) throws CipherException, IOException {
    WalletFile walletFile = createWalletFile(new byte[]{}, priKey);
    String keystoreName = store2Keystore(walletFile);
    return keystoreName;
  }

}
