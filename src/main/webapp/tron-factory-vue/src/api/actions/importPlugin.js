export default {
  get: {
    pluginConfigApi: '/pluginConfig',
  },
  post: {
    dbEngineApi: '/dbEngine',
    transactionApi: '/transaction',
    consensusApi: '/consensus',
    cryptoApi: '/crypto',
  },
}

// TODO transaction setting
/*export function transactionApi(params) {
  return request({
    url: '/transaction',
    headers: {
      'Content-Type': 'application/json'
    },
    transformRequest: [function (data) {
      data = JSON.stringify(data)
      return data
    }],
    method: 'post',
    data: params
  })
}*/
