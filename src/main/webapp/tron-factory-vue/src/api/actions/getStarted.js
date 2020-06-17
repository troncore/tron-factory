let prefix = ''
prefix = '/__mock__'

export default {
  get: {
    hasBlockChain: prefix + '/api/hasBlockChain',
    getChainInfo: prefix + '/api/chainInfo',
    checkBalance: prefix + '/api/checkBalance',
    checkAddress: prefix + '/api/checkAddress',
  },
  post: {
    addChainInfo: prefix + '/api/chainInfo',
  },
  put: {
    updateChainInfo: prefix + '/api/chainInfo',
  },
}
