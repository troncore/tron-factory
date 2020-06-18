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
  },
  post: {
    addChainInfo: prefix + '/api/chainInfo',
  },
  put: {
    updateChainInfo: prefix + '/api/chainInfo',
  },
}
