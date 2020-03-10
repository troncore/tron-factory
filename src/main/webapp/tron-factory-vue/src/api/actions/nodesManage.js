export default {
  get: {
    getNodeList: '/api/allNodeInfo',  // old: deploy_status
    getNodeLog: '/api/getLogInfo',   // old
    getCrypto: '/api/getCrypto',      // old

    getNodeInfo: '/api/nodeInfo',   // new

    checkNode: '/api/checkNode',      // old
    deployNode: '/api/deployNode',    // old
  },
  post: {
    addNoteInfo: '/api/nodeInfo',     // old:
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
