export default {
  configuration: 'Configuration',
  quickConfig: 'Fast Config',
  customConfig: 'Custom Config',
  importConfig: 'Import Config',

  genesisInfo: 'Genesis',
  baseConfig: 'Basic Config',
  netWorkConfig: 'HTTP/RPC',
  databaseConfig: 'Database',
  p2pConfig: 'P2P',
  crossChainConfig: 'Cross-Chain',
  moduleFunction: 'Module',

  moreSetting: 'Advanced Config',

  accountInfo: 'Asset List', // asset list
  addNew: 'Add',
  witnessNodeInfo: 'Witness list', // witness list
  assetDialogTitle: 'Asset configuration',
  assetAddSuccess: 'Successfully added',
  assetAddFail: 'Failed added',
  assetUpdateSuccess: 'Successfully added',
  assetUpdateFail: 'Failed added',
  assetDeleteSuccess: 'Successfully deleted',
  assetDeleteFail: 'Failed added',
  witnessDialogTitle: 'Witness Configuration',

  selectDatabaseConfig: 'Database Engine',
  isWriteSync: 'Write synchronously',
  isOpenTransaction: 'Transaction',
  isOpenIndexDirectory: 'Index switch opened',
  isNeedToUpdateAsset: 'Update asset',
  dbCustomModule: 'Custom chainbase Module',

  consensusModule: 'Consensus Module',
  tempNotSupport: 'Not Supported',
  otherConsensus: 'Other(In development)',
  transactionModule: 'Transaction Module',
  customTransactionModule: 'Custom Transaction Module',
  consensusModuleSaveSuccess: 'Saving Consensus Module Successful',
  transactionModuleSaveSuccess: 'Saving Transaction Module Successful',

  assetSaveSuccess: 'Genesis Configuration Save Successful',
  baseSaveSuccess: 'Basic Save Successful',
  networkSaveSuccess: 'Network Configuration Save Successful',
  databaseSaveSuccess: 'Database Configuration Save Successful',
  p2pSaveSuccess: 'P2P Configuration Save Successful',

  helpTips: {
    accountName: 'Account Name',
    accountType: 'Account Type',
    address: 'Address in Base58Check format',
    balance: 'Initial balance, in SUN',

    chainId: 'Chain ID',
    maintenanceTimeInterval: 'Maintenance Time Interval',
    blockProposalExpireTime: 'Proposal Expire Time',
    nodeBlockProducedTimeOut: 'Block Produced Time Out Percent',
    nodeMinParticipationRate: 'Min Participation Rate',

    maxHttpConnectNumber: 'Maximum HTTP Connection Number',
    httpFullNodePort: 'FullNode HTTP Port',
    httpSolidityPort: 'SolidityNode HTTP Port',
    rpcPort: 'FullNode RPC Port',
    rpcSolidityPort: 'FullNode Solidity RPC Port',

    p2pVersion: 'P2P Version',
    listenPort: 'Listen Port',
    seedNodeList: 'Initial Seed Nodes List',
    maxActiveNodes: 'Maximum Active Nodes Number',
    maxActiveNodesWithSameIp: 'Maximum Node Count of one IP',
  },

  valid: {
    inputRightAddress: 'Please input correct address',
    maxVoteCountValue: 'Vote Count exceeds maximum',
    listenPort: 'Please input listen port',
    mainnetPlaceholder: 'mainnet p2pversion is illegal',
    testnetPlaceholder: 'testnet p2pversion is illegal',
    specialPlaceholder: 'specific p2pversion is illegal',
    validTwoDecimal: 'invalid precision',
    checkDBCustom: 'Please enable custom chainbase module first',
    inputDBCustom: 'Please input custom chainbase module path (ended with .jar)',
    checkCustomTransaction: 'Please enable custom transaction module first',
    inputCustomTransaction: 'Please input custom transaction module path (ended with .jar)',
    pathEndJAR: 'Please input a path ended with .jar',
  },
}
