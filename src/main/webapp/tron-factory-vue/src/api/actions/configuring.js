export default {
  get: {
    checkBalance: '/api/checkBalance',
    originConfig: '/originConfig',
    getConfigInfo: '/config',

    pluginConfigApi: '/pluginConfig',
  },
  post: {
    initConfig: '/initConfig',    // old
    oneClick: '/oneClick',

    genesisAssetConfig: '/genesisAssetConfig',
    baseSettingConfig: '/baseSettingConfig',
    p2pConfig: '/p2pconfig',
    dbConfig: '/dbconfig',
    networkConfig: '/networkconfig',
    crossChainConfig: '/crossChainConfig',

    dbEngineApi: '/dbEngine',
    transactionApi: '/transaction',
    consensusApi: '/consensus',
    cryptoApi: '/crypto',
  },
  put: {
  },
  delete: {
  },
}
