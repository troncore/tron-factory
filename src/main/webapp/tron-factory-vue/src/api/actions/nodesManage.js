let prefix = ''
// prefix = '/__server__'

export default {
  get: {
    getNodeList: '/api/allNodeInfo',
    getNodeLog: '/api/getLogInfo',
    getNodeInfo: '/api/nodeInfo',
    checkNode: '/api/checkNode',
    deployNode: '/api/deployNode',
    getCrypto: '/api/getCrypto',
    getDeployedNode: '/api/getDeployedNode',
    getDeployedNodeInfo: '/api/getDeployedNodeInfo'
  },
  post: {
    addNoteInfo: '/api/nodeInfo',
    updateCrypto: '/api/crypto',
  },
  put: {
    editNoteInfo: '/api/nodeInfo',
  },
  delete: {
    deleteNoteInfo: '/api/nodeInfo',
  },
}
