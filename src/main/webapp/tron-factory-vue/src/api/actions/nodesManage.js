let prefix = ''
// prefix = '/__server__'

export default {
  get: {
    getNodeList: prefix + '/api/allNodeInfo',
    getNodeLog: '/api/getLogInfo',
    getNodeInfo: '/api/nodeInfo',   // new
    checkNode: '/api/checkNode',      // old
    deployNode: '/api/deployNode',    // old
    getCrypto: '/api/getCrypto',      // old
  },
  post: {
    addNoteInfo: '/api/nodeInfo',     // old:
    updateCrypto: '/api/crypto',      // old

    // todo api
    initConfig: '/api/initConfig',    // old
  },
  put: {
    editNoteInfo: '/api/nodeInfo',    // old:
  },
  delete: {
    deleteNoteInfo: '/api/nodeInfo',  // old:
  },
}
