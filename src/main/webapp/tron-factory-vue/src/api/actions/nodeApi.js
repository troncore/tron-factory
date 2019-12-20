export default {
  get: {
    allNodeInfo: '/allNodeInfo',
    deployLogInfoApi: '/getLogInfo',
  },
  post: {
    addNote: '/nodeInfo',
    nodeInfoApi: '/checkNode',
    deployNodeApi: '/deployNode',
    initConfigApi: '/initConfig',
  },
  put: {
    editNote: '/nodeInfo',
  },
  delete: {
    deleteNote: '/nodeInfo',
  },
}
