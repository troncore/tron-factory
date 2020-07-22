export default {
  configuration: '节点配置',
  quickConfig: '快速配置',
  customConfig: '自定义配置',
  opUnValidNode: '当前所编辑的节点为无效节点',

  moreSetting: '高级配置',

  baseConfig: '基础配置',
  netWorkConfig: 'HTTP/RPC 配置',
  databaseConfig: '数据库基础配置',
  p2pConfig: 'P2P 配置',
  moduleFunction: '模块定制化',

  selectDatabaseConfig: '数据库引擎',
  isWriteSync: '同步写入',
  isOpenTransaction: '交易回执信息存储',
  backupEnable: 'RocksDB备份设置',
  backupFrequency: '备份间隔(块)',
  dbCustomModule: '自定义chainbase模块',

  customTransactionModule: '自定义Transaction模块',

  baseSaveSuccess: '保存基础配置成功',
  networkSaveSuccess: '保存网络链接配置成功',
  databaseSaveSuccess: '保存数据库配置成功',
  p2pSaveSuccess: '保存 P2P 配置成功',

  helpTips: {
    maintenanceTimeInterval: '维护期的时间间隔',
    blockProposalExpireTime: '提案失效时间',
    nodeBlockProducedTimeOut: '节点区块产生超时比例',
    nodeMinParticipationRate: '节点最小参与度',

    maxHttpConnectNumber: '最大 HTTP 连接数',
    httpFullNodePort: 'FullNode HTTP 端口',
    httpSolidityPort: 'FullNode HTTP Solidity 端口',
    rpcPort: 'FullNode RPC 端口',
    rpcSolidityPort: 'FullNode RPC Solidity 端口',

    maxActiveNodes: '最大活跃节点数',
    maxActiveNodesWithSameIp: '同一 IP 最大活跃节点数',
  },

  valid: {
    checkDBCustom: '请勾选自定义chainbase模块',
    inputDBCustom: '请填写自定义chainbase模块路径（以.jar结束）',
    checkCustomTransaction: '请勾选自定义Transaction模块',
    inputCustomTransaction: '请填写自定义Transaction模块路径（以.jar结束）',
    pathEndJAR: '请填写以.jar为结尾的路径',
  },
}
