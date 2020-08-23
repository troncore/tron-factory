let prefix = ''
// prefix = '/__mock__'

export default {
  get: {
    hasBlockChain: '/api/hasBlockChain',
    getChainInfo: '/api/chainInfo',
    checkBalance: '/api/checkBalance',
    checkAddress: '/api/checkAddress',
    checkChainPublish: '/api/checkChainPublish',

    getNodeList: '/api/allNodeInfo',
    getNodeInfo: '/api/nodeInfo',
    canDeleteNode: '/api/canDeleteNode',
    stopNode: '/api/stopNode',
    getNodeLog: '/api/getLogInfo',
    checkNode: '/api/checkNode',
    getOneKey: '/api/convertKey',

    // node-config
    getQuickConfig: '/api/quickConfig',
    getBaseConfig: '/api/baseSettingConfig',
    getNetworkConfig: '/api/networkconfig',
    getDBConfig: '/api/dbconfig',
    getP2PConfig: '/api/p2pConfig',
    getPluginConfig: '/api/pluginConfig',
  },

  post: {
    addChainInfo: '/api/chainInfo',
    addNoteInfo: '/api/nodeInfo',
    deployNode: '/api/deployNode',

    // node-config
    setQuickConfig: '/api/quickConfig',
    setBaseConfig: '/api/baseSettingConfig',
    setNetworkConfig: '/api/networkconfig',
    setDBConfig: '/api/dbconfig',
    setP2PConfig: '/api/p2pConfig',
    setPluginConfig: '/api/pluginConfig',
  },

  put: {
    updateChainInfo: '/api/chainInfo',
    editNoteInfo: '/api/nodeInfo',
  },

  delete: {
    deleteChain: '/api/deleteChain',
    deleteNoteInfo: '/api/nodeInfo',
  },
}
