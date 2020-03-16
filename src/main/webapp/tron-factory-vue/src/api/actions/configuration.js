let prefix = ''
// prefix = '/__server__'

export default {
  get: {
    checkBalance: '/api/checkBalance',
    getConfigInfo: '/api/config',
    getPluginConfig: '/api/pluginConfig',

    // todo api
    originConfig: '/api/originConfig',
  },
  post: {
    genesisAssetConfig: '/api/genesisAssetConfig',
    baseSettingConfig: '/api/baseSettingConfig',
    p2pConfig: '/api/p2pconfig',
    dbConfig: '/api/dbconfig',
    networkConfig: '/api/networkconfig',
    setTransactionModule: '/api/transaction',

    // todo api
    initConfig: '/api/initConfig',    // old
    oneClick: '/api/oneClick',
    crossChainConfig: '/api/crossChainConfig',
    dbEngineApi: '/api/dbEngine',
    consensusApi: '/api/consensus',
    cryptoApi: '/api/crypto',
  },
  put: {
  },
  delete: {
  },
}
