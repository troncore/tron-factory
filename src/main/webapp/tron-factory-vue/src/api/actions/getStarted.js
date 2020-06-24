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
    getNoteInfo: prefix + '/api/nodeInfo',
  },
  post: {
    addChainInfo: prefix + '/api/chainInfo',
    addNoteInfo: prefix + '/api/nodeInfo',
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
