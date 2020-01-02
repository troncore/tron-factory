export default {
  get: {
    checkBalanceApi: '/checkBalance',
    originSettingApi: '/originConfig',
    getConfigInfo: '/config',
  },
  post: {
    oneClickApi: '/oneClick',
    // TODO
    genesisSettingApi: '/genesisAssetConfig',
    baseSettingApi: '/baseSettingConfig',
    p2pSettingApi: '/p2pconfig',
    dbconfigApi: '/dbconfig',
    networkconfig: '/networkconfig',
    crossChainConfig: '/crossChainConfig',
  },
}

// TODO genesis setting
/*export function genesisSettingApi(params) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        transformRequest: [function(data) {
            data = JSON.stringify(data)
            return data
        }],
        url: '/genesisAssetConfig',
        method: 'post',
        data: params
    })
}*/
