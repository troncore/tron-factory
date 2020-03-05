export default {
  get: {
    getNodeList: '/api/nodesManage/nodeList',
    getNodeDetail: '/api/nodesManage/nodeDetail',
    getNodeLogs: '/api/nodesManage/deployLogs',
  },
  post: {
    getNodeLogs: '/api/nodesManage/updateNode',
  },
  delete: {
    getNodeLogs: '/api/nodesManage/deleteNode',
  }
}
