let prefix = ''
// prefix = '/__server__'

export default {
  get: {
    getNodeList: prefix + '/api/allNodeInfo',  // old: deploy_status
    getNodeLog: '/api/getLogInfo',   // old
    getNodeInfo: '/api/nodeInfo',   // new
    checkNode: '/api/checkNode',      // old
    deployNode: '/api/deployNode',    // old

    // todo api
    getCrypto: '/api/getCrypto',      // old
  },
  post: {
    addNoteInfo: '/api/nodeInfo',     // old:

    // todo api
    updateCrypto: '/api/crypto',      // old
    initConfig: '/api/initConfig',    // old
  },
  put: {
    editNoteInfo: '/api/nodeInfo',    // old:
  },
  delete: {
    deleteNoteInfo: '/api/nodeInfo',  // old:
  },
}
