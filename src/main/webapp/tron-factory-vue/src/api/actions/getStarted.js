let prefix = ''
prefix = '/__mock__'

export default {
  get: {
    hasBlockChain: prefix + '/api/hasBlockChain',
    getChainInfo: prefix + '/api/chainInfo',
    checkBalance: prefix + '/api/checkBalance',
    checkAddress: prefix + '/api/checkAddress',
    checkChainPublish: prefix + '/api/checkChainPublish',

    getNodeList: prefix + '/api/allNodeInfo',
    getNodeInfo: prefix + '/api/nodeInfo',
    canDeleteNode: prefix + '/api/canDeleteNode',

    // node-config
    getQuickConfig: prefix + '/api/quickConfig',
    getBaseConfig: prefix + '/api/baseSettingConfig',
    getNetworkConfig: prefix + '/api/networkconfig',
    getDBConfig: prefix + '/api/dbconfig',
    getP2PConfig: prefix + '/api/p2pConfig',
    getPluginConfig: prefix + '/api/pluginConfig',
  },

  post: {
    addChainInfo: prefix + '/api/chainInfo',
    addNoteInfo: prefix + '/api/nodeInfo',

    // node-config
    setQuickConfig: prefix + '/api/quickConfig',
    setBaseConfig: prefix + '/api/baseSettingConfig',
    setNetworkConfig: prefix + '/api/networkconfig',
    setDBConfig: prefix + '/api/dbconfig',
    setP2PConfig: prefix + '/api/p2pConfig',
    setPluginConfig: prefix + '/api/pluginConfig',
  },

  put: {
    updateChainInfo: prefix + '/api/chainInfo',
    editNoteInfo: prefix + '/api/nodeInfo',
  },

  delete: {
    deleteChain: prefix + '/api/deleteChain',
    deleteNoteInfo: prefix + '/api/nodeInfo',
  },
}
