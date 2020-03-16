export default {
  configuration: 'Configuration',
  quickConfig: '快速配置',
  defineConfig: '自定义配置',
  importConfig: '导入配置文件',

  genesisInfo: 'Genesis Configuration',
  baseConfig: 'Basic Configuration',
  netWorkConfig: 'HTTP/RPC Configuration',
  databaseConfig: 'Database Configuration',
  p2pConfig: 'P2P Configuration',
  crossChainConfig: 'Cross-Chain Configuration',
  moduleFunction: '模块函数',

  moreSetting: 'Advanced Configuration',

  accountInfo: '账户信息', // asset list
  addNew: '新增',
  witnessNodeInfo: 'Witness 节点信息', // witness list
  assetDialogTitle: 'Asset Configuration',
  assetAddSuccess: 'Add Asset Successful',
  assetAddFail: 'Add Asset Failed',
  assetUpdateSuccess: 'Update Asset Successful',
  assetUpdateFail: 'Update Asset Failed',
  assetDeleteSuccess: 'Delete Asset Successful',
  assetDeleteFail: 'Delete Asset Failed',
  witnessDialogTitle: 'Witness Configuration',

  selectDatabaseConfig: 'Database Engine',
  isWriteSync: 'Is Write Sync ON',
  isOpenTransaction: 'Is transaction allowed',
  isOpenIndexDirectory: 'Is index switch opened',
  isNeedToUpdateAsset: 'Need to update asset?',

  consensusModule: 'Consensus Module',
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

    p2pVersion: 'P2P Version Number',
    listenPort: 'Listen Port',
    seedNodeList: 'Initial Seed Nodes List',
    maxActiveNodes: 'Maximum Active Nodes Number',
    maxActiveNodesWithSameIp: 'Maximum Node Count of one IP',
  },

  valid: {
    inputRightAddress: 'Please input correct address',
    maxVoteCountValue: 'Vote Count exceeds maximum',
    gteZeroInt: 'Please input a number greater than or equal to 0',
    gtZeroInt: 'Please input a number greater than 0',
    maxNumberValue: 'maximum exceeded',
    maxPortValue: 'Port number illegal',
    listenPort: 'Please input listen port',
    mainnetPlaceholder: 'mainnet p2pversion is illegal',
    testnetPlaceholder: 'testnet p2pversion is illegal',
    specialPlaceholder: 'specific p2pversion is illegal',
    validTwoDecimal: 'invalid precision',

    checkCustomTransaction: 'Please enable custom transaction module first',
    inputCustomTransaction: 'Please input custom transaction module path (ended with .jar)',
    pathEndJAR: 'Please input a path ended with .jar',
  },
}
