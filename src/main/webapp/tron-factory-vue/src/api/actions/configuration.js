let prefix = ''
// prefix = '/__server__'

export default {
  get: {
    checkBalance: '/api/checkBalance',
    getConfigInfo: '/api/config',
    checkConfig: '/api/checkConfig',
    getPluginConfig: '/api/pluginConfig',

    // todo api
    originConfig: '/api/originConfig',
  },
  post: {
    oneClick: '/api/oneClick', // init p2p version once
    genesisAssetConfig: '/api/genesisAssetConfig',
    baseSettingConfig: '/api/baseSettingConfig',
    p2pConfig: '/api/p2pconfig',
    dbConfig: '/api/dbconfig',
    networkConfig: '/api/networkconfig',
    setTransactionModule: '/api/transaction',

    // todo api
    initConfig: '/api/initConfig', // init default asset
    crossChainConfig: '/api/crossChainConfig',
    dbEngineApi: '/api/dbEngine',
    consensusApi: '/api/consensus',
  },
  put: {
  },
  delete: {
  },
}
