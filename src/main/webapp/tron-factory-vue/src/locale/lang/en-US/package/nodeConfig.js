export default {
  configuration: 'Configuration',
  quickConfig: 'Fast Config',
  customConfig: 'Custom Config',
  opUnValidNode: '当前所编辑的节点为无效节点',

  moreSetting: 'Advanced Config',

  baseConfig: 'Basic Config',
  netWorkConfig: 'HTTP/RPC',
  databaseConfig: 'Database',
  p2pConfig: 'P2P',
  moduleFunction: 'Module',

  selectDatabaseConfig: 'Database Engine',
  isWriteSync: 'Write synchronously',
  isOpenTransaction: '交易回执信息存储',
  backupEnable: 'RocksDB备份设置',
  backupFrequency: '备份间隔(块)',
  dbCustomModule: 'Custom chainbase Module',

  customTransactionModule: 'Custom Transaction Module',

  baseSaveSuccess: 'Basic Save Successful',
  networkSaveSuccess: 'Network Configuration Save Successful',
  databaseSaveSuccess: 'Database Configuration Save Successful',
  p2pSaveSuccess: 'P2P Configuration Save Successful',

  helpTips: {
    maintenanceTimeInterval: 'Maintenance Time Interval',
    blockProposalExpireTime: 'Proposal Expire Time',
    nodeBlockProducedTimeOut: 'Block Produced Time Out Percent',
    nodeMinParticipationRate: 'Min Participation Rate',

    maxHttpConnectNumber: 'Maximum HTTP Connection Number',
    httpFullNodePort: 'FullNode HTTP Port',
    httpSolidityPort: 'SolidityNode HTTP Port',
    rpcPort: 'FullNode RPC Port',
    rpcSolidityPort: 'FullNode Solidity RPC Port',

    maxActiveNodes: 'Maximum Active Nodes Number',
    maxActiveNodesWithSameIp: 'Maximum Node Count of one IP',
  },

  valid: {
    checkDBCustom: 'Please enable custom chainbase module first',
    inputDBCustom: 'Please input custom chainbase module path (ended with .jar)',
    checkCustomTransaction: 'Please enable custom transaction module first',
    inputCustomTransaction: 'Please input custom transaction module path (ended with .jar)',
    pathEndJAR: 'Please input a path ended with .jar',
  },
}
