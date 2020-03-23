export default {
  configuration: '配置',
  quickConfig: '快速配置',
  defineConfig: '自定义配置',
  importConfig: '导入配置文件',

  genesisInfo: '创世信息',
  baseConfig: '基础配置',
  netWorkConfig: 'HTTP/RPC 配置',
  databaseConfig: '数据库基础配置',
  p2pConfig: 'P2P 配置',
  crossChainConfig: '跨链配置',
  moduleFunction: '模块函数',

  moreSetting: '高级配置',

  accountInfo: '账户信息',
  addNew: '新增',
  witnessNodeInfo: 'Witness 节点信息',
  assetDialogTitle: 'Asset 配置',
  assetAddSuccess: '添加 asset 成功',
  assetAddFail: '添加 asset 失败',
  assetUpdateSuccess: '修改 asset 成功',
  assetUpdateFail: '修改 asset 失败',
  assetDeleteSuccess: '删除 asset 成功',
  assetDeleteFail: '删除 asset 失败',
  witnessDialogTitle: 'Witness 配置',

  selectDatabaseConfig: '数据库引擎',
  isWriteSync: '是否同步写入',
  isOpenTransaction: '是否打开 transaction',
  isOpenIndexDirectory: '是否打开 index 开关',
  isNeedToUpdateAsset: '是否需要更新 assets',

  consensusModule: '共识模块',
  transactionModule: '交易模块',
  customTransactionModule: '自定义交易模块',
  consensusModuleSaveSuccess: '保存共识模块成功',
  transactionModuleSaveSuccess: '保存交易模块成功',

  assetSaveSuccess: '保存创世信息配置成功',
  baseSaveSuccess: '保存基础配置成功',
  networkSaveSuccess: '保存网络链接配置成功',
  databaseSaveSuccess: '保存数据库配置成功',
  p2pSaveSuccess: '保存 P2P 配置成功',

  helpTips: {
    accountName: '账户名',
    accountType: '账户类型',
    address: 'Base58Check 地址',
    balance: '账户初始余额, 单位 SUN',

    chainId: '当前区块链 ID',
    maintenanceTimeInterval: '维护期的时间间隔',
    blockProposalExpireTime: '提案失效时间',
    nodeBlockProducedTimeOut: '节点区块产生超时比例',
    nodeMinParticipationRate: '节点最小参与度',

    maxHttpConnectNumber: '最大 HTTP 连接数',
    httpFullNodePort: 'FullNode HTTP 端口',
    httpSolidityPort: 'FullNode HTTP Solidity 端口',
    rpcPort: 'FullNode RPC 端口',
    rpcSolidityPort: 'FullNode RPC Solidity 端口',

    p2pVersion: 'P2P 版本号',
    listenPort: '监听端口',
    seedNodeList: '初始种子节点列表',
    maxActiveNodes: '最大活跃节点数',
    maxActiveNodesWithSameIp: '同一 IP 最大活跃节点数',
  },

  valid: {
    inputRightAddress: '请输入正确地址',
    maxVoteCountValue: 'Vote Count 填写额超过最大值',
    gteZeroInt: '请输入大于或等于0的整数',
    gtZeroInt: '请输入大于0的整数',
    maxNumberValue: '数值超过最大范围',
    maxPortValue: '端口号不能超过 65535',
    listenPort: '请输入listen端口号',
    mainnetPlaceholder: '主网 p2pversion 不可使用',
    testnetPlaceholder: '测试网 p2pversion 不可使用',
    specialPlaceholder: '特定网络 p2pversion 不可使用',
    validTwoDecimal: '精度不对',

    checkCustomTransaction: '请勾选自定义交易模块',
    inputCustomTransaction: '请填写自定义交易模块路径（以.jar结束）',
    pathEndJAR: '请填写以.jar为结尾的路径',
  },
}