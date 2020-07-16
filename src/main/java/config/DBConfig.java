package config;

import java.io.Serializable;

public class DBConfig implements Serializable {
  private static final long serialVersionUID = 1L;

  public String storage_index_directory;
  public boolean storage_db_sync;
  public String storage_transHistory_switch;
  public String  storage_db_engine;
  public boolean storage_needToUpdateAsset;

  public boolean storage_backup_enable;
  public String storage_backup_propPath;
  public String storage_backup_bak1path;
  public String storage_backup_bak2path;
  public int storage_backup_frequency;


  public DBConfig(boolean storage_db_sync, String storage_transHistory_switch, String storage_db_engine, String storage_index_directory, boolean storage_needToUpdateAsset) {
    this.storage_db_sync = storage_db_sync;
    this.storage_transHistory_switch = storage_transHistory_switch;
    this.storage_db_engine = storage_db_engine;
    this.storage_index_directory = storage_index_directory;
    this.storage_needToUpdateAsset = storage_needToUpdateAsset;
  }
  public DBConfig(boolean storage_db_sync, String storage_transHistory_switch, String storage_db_engine, boolean storage_needToUpdateAsset) {
    this.storage_db_sync = storage_db_sync;
    this.storage_transHistory_switch = storage_transHistory_switch;
    this.storage_db_engine = storage_db_engine;
    this.storage_needToUpdateAsset = storage_needToUpdateAsset;
  }
  public DBConfig(boolean storage_db_sync, String storage_db_engine, boolean storage_backup_enable, int storage_backup_frequency) {
    this.storage_db_sync = storage_db_sync;
    this.storage_db_engine = storage_db_engine;
    this.storage_backup_enable = storage_backup_enable;
    this.storage_backup_frequency = storage_backup_frequency;
  }

  public DBConfig(boolean storage_db_sync, String storage_db_engine, String storage_transHistory_switch, boolean storage_backup_enable, int storage_backup_frequency) {
    this.storage_db_sync = storage_db_sync;
    this.storage_db_engine = storage_db_engine;
    this.storage_transHistory_switch = storage_transHistory_switch;
    this.storage_backup_enable = storage_backup_enable;
    this.storage_backup_frequency = storage_backup_frequency;
  }
  /*public DBConfig(boolean storage_db_sync, String storage_db_engine, String storage_transHistory_switch) {
    this.storage_db_sync = storage_db_sync;
    this.storage_db_engine = storage_db_engine;
    this.storage_transHistory_switch = storage_transHistory_switch;
  }*/

}
