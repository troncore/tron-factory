export default {
  get: {
    getNodeList: '/api/allNodeInfo',  // old: deploy_status
    getNodeLogs: '/getLogInfo',   // old
    getCrypto: '/getCrypto',      // old

    getNodeInfo: '/nodeInfo',   // new
  },
  post: {
    addNoteInfo: '/nodeInfo',     // old:
    checkNode: '/checkNode',      // old
    deployNode: '/deployNode',    // old
    updateCrypto: '/crypto',      // old
    initConfig: '/initConfig',    // old
  },
  put: {
    editNoteInfo: '/nodeInfo',    // old:
  },
  delete: {
    deleteNoteInfo: '/nodeInfo',  // old:
  },
}
