export default {
  get: {
    getNodeList: '/api/allNodeInfo',  // old: deploy_status
    getNodeLogs: '/getLogInfo',   // old
    getCrypto: '/getCrypto',      // old

    getNodeInfo: '/api/nodeInfo',   // new
  },
  post: {
    addNoteInfo: '/api/nodeInfo',     // old:
    checkNode: '/checkNode',      // old
    deployNode: '/deployNode',    // old
    updateCrypto: '/crypto',      // old
    initConfig: '/initConfig',    // old
  },
  put: {
    editNoteInfo: '/api/nodeInfo',    // old:
  },
  delete: {
    deleteNoteInfo: '/api/nodeInfo',  // old:
  },
}
