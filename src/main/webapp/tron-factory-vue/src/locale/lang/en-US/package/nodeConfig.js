export default {
  configuration: 'Configuration',
  quickConfig: 'Quick Config',
  customConfig: 'Custom Config',
  opUnValidNode: 'Invalid node',

  moreSetting: 'More',
  baseConfig: 'Basic Config',
  netWorkConfig: 'HTTP/RPC',
  databaseConfig: 'Database',
  p2pConfig: 'P2P',
  moduleFunction: 'Module',

  selectDatabaseConfig: 'dbEngine',
  isWriteSync: 'storageDBSync',
  isOpenTransaction: 'storageTransHistory',
  backupEnable: 'backupEnable',
  backupFrequency: 'backupFrequency(Unit:Block)',
  dbCustomModule: 'custom chainbase module',

  customTransactionModule: 'Custom Transaction Module',

  baseSaveSuccess: 'Successfully saved basic configuration',
  networkSaveSuccess: 'Successfully saved network configuration',
  databaseSaveSuccess: 'Successfully saved database configuration',
  p2pSaveSuccess: 'Successfully saved P2P configuration',

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
    inputDBCustom: 'Please input custom chainbase module path (end with .jar)',
    checkCustomTransaction: 'Please enable custom transaction module first',
    inputCustomTransaction: 'Please input custom transaction module path (end with .jar)',
    pathEndJAR: 'Please input a path ends with .jar',
  },
}
