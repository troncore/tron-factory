export default {
  get: {
    getCrypto: '/getCrypto',
    allNodeInfo: '/allNodeInfo',
    getLogInfo: '/getLogInfo',
  },
  post: {
    updateCrypto: '/crypto',
    addNoteInfo: '/nodeInfo',
    checkNode: '/checkNode',
    deployNode: '/deployNode',
    initConfig: '/initConfig',
  },
  put: {
    editNoteInfo: '/nodeInfo',
  },
  delete: {
    deleteNoteInfo: '/nodeInfo',
  },
}
