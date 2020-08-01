export default {
  configuration: 'Configuration',
  quickConfig: 'Fast Config',
  customConfig: 'Custom Config',
  opUnValidNode: 'Invalid node',

  moreSetting: 'Advanced Config',

  baseConfig: 'Basic Config',
  netWorkConfig: 'HTTP/RPC',
  databaseConfig: 'Database',
  p2pConfig: 'P2P',
  moduleFunction: 'Module',

  selectDatabaseConfig: 'Database Engine',
  isWriteSync: 'Write Synchronously',
  isOpenTransaction: 'Storage of Transaction Receipt',
  backupEnable: 'RocksDB Backup Settings',
  backupFrequency: 'Backup Frequency(Unit:Block)',
  dbCustomModule: 'Custom Chainbase Module',

  customTransactionModule: 'Custom Transaction Module',

  baseSaveSuccess: 'Basic configuration saved successfully',
  networkSaveSuccess: 'Network configuration saved successfully',
  databaseSaveSuccess: 'Database configuration saved successfully',
  p2pSaveSuccess: 'P2P configuration saved successfully',

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
    pathEndJAR: 'Please input a path ends with .jar',
  },
}
