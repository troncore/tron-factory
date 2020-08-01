export default {
  startCreate: 'Get Started',
  summaryChain: 'TRON Factory，基于TRON Framework定制化区块链',
  descriptionChain: '基于TRON Framework快速部署定制化区块链，为企业用户提供专业的区块链相关服务',

  // 创建/修改区块链
  chainManage: {
    startCreate: 'Get Started',
    updateChain: 'Edit',
    baseInfo: 'Basic Information',
    chainNameLabel: 'Blockchain Name',
    chainNameTips: 'Blockchain name is empty',
    chainNameCheckLength: 'It is composed of letters and numbers and the length cannot exceed 30',
    encryptionLabel: 'Signature Type',
    encryptionTips: 'Signature type of the nodes in a blockchain must be same',
    p2pVersionLabel: 'p2pVersion ',
    p2pVersionTips: 'p2pVersion of the nodes in a blockchain must be same',
    p2pVersionCheckMainNet: 'Illegal! The p2pVersion of TRON MainNet is 11111.',
    p2pVersionCheckTestNet: 'Illegal! The p2pVersion of TRON TestNet is 20180622.',
    p2pVersionCheckSpecialNet: 'Illegal! 1 is reserved.',
    consensusModuleLabel: 'Consensus',

    // 创世账户
    genesisAccount: 'Genesis Accounts',
    assetDialogAddTitle: 'Add Account',
    assetDialogEditTitle: 'Edit Account',
    accountNameLabel: 'accountName',
    accountNameTips: 'The name of account',
    accountTypeLabel: 'accountType',
    accountTypeTips: 'The type of account',
    addressLabel: 'address',
    addressTips: 'Base58Check encoding',
    addressCheckValid: 'Invalid address',
    balanceLabel: 'balance',
    balanceTips: 'Initial balance of account',

    existChain: 'The blockchain have been created',
  },

  // 区块链信息、节点列表信息
  dashboard: {
    dashboard: 'Dashboard',
    chainInfo: 'Blockchain Configuration',
    chainName: 'Blockchain Name',
    encryption: 'Signature Type',
    p2pVersion: 'p2pVersion',
    status: 'Blockchain Status',
    unPublish: 'Unreleased',
    publishing: 'Releasing',
    published: 'Released',
    statusTips: 'The released blockchain can produce blocks normally',
    explorer: 'Explorer',
    stopDeleteChain: 'Active node exists',
    deleteChainWarningTips: 'Do you confirm to delete？',

    // 节点列表
    nodeInfo: 'Node List',
    addNode: 'Add',
    ip: 'IP',
    listenPort: 'Listen Port',
    nodeType: 'Node Type',
    superNode: 'SR',
    fullNode: 'Full Node',
    configStatus: 'Config Status',
    statusOK: 'configured',
    statusNO: 'not configured',
    deployStatus: 'Node Status',
    deploySuccess: 'Running',
    deployStop: 'Stopped',
    createNodeTime: 'Create Time',
    nodeConfig: 'Config',
    stopRunNode: 'Stop',

    runNode: 'Launch',
    pleaseAddNode: 'Node list is empty.',
    pleaseSelectNodes: 'No node selected',
    pleaseConfigNodes: 'All nodes must be configured',
    initRunSRCheck: 'When running the blockchain for the first time, the number of SR nodes in the selected list must be >> = 1 and an odd number.',
    runNodeDialogTitle: 'Start',
    checkFilePath: 'Please upload a valid compilation and execution file (default path: /build/distributions/java-tron-1.0.0.zip)',
    inputFilePath: 'Please input the java-tron package path',
    endRightPath: 'The package path ends with java-tron-1.0.0.zip',
    runningNode: 'Starting',
    runFailTips: 'Fail to run node. Please check node logs.',
    runFailSomeTips: 'Warning. Part of nodes failed to run. Please check node logs.',
    runExistTips: 'Deployment is running. Please try again later..',
    runSuccessTips: 'Success',

    stopRunNodeTips: 'Do you confirm to stop the node',
    logDialogTitle: 'Deployment Log',
    emptyLog: 'No logs',
    loadingLog: 'Log is loading...',
  },

  // 添加、修改、查看节点
  nodesManage: {
    addNode: 'Add Node',
    editNode: 'Edit Node',
    nodeDetail: 'Node Details',
    opUnValidNode: 'Invalid node',
    viewUnValidNode: 'Invalid node',

    serverInfo: 'Server Configuration',
    ip: 'Server IP',
    ipPlaceholder: 'Please input the server ip address',
    ipCheckRight: 'Please input a valid IP address',
    ipCheckLocalhost: 'Local IP is not supported now',
    listenPort: 'Listen Port',
    listenPortPlaceholder: 'Please input listen port',
    sshInfo: 'SSH Configuration',
    port: 'SSH Port',
    portPlaceholder: 'Please input ssh port',
    sshConnectType: 'Secure Authentication',
    byPassword: 'Password',
    byPublicKey: 'Public key',
    sshUserName: 'SSH Username',
    sshUserNamePlaceholder: 'Please input the username to connect to ssh',
    sshPassword: 'SSH Password',
    sshPasswordPlaceholder: 'Please input the password to connect to ssh',
    nodeType: 'Node Type',
    superNode: 'Super Representative',
    superNodeTips: 'Super Representative(abbr: SR) is the block producer in the blockchain. They verify<br/>the transactions and write the transactions into the blocks in turn',
    fullNode: 'Full Node',
    fullNodeTips: 'FullNode has the complete blockchain data, can update data in real time. <br/>It can broadcast the transactions and provide api service',
    superNodeInfo: 'SR Configuration',
    url: 'URL',
    urlTips: 'Office website of SR',
    urlPlaceholder: 'Please input URL for the SR',
    voteCount: 'vote count',
    voteCountTips: 'Determine the initial ordering of SR',
    voteCountPlaceholder: 'Please input vote count',
    voteCountCheckMax: 'Vote Count exceeds maximum',
    publicKey: 'address',
    publicKeyTips: 'The encoding of address is Base58Check',
    publicKeyPlaceholder: 'Please input the address with Base58Check encoded',
    privateKey: 'privateKey',
    privateKeyTips: 'Please input 256-bits private key (Hexadecimal encoded)',
    privateKeyPlaceholder: 'Please input 256-bits private key (Hexadecimal encoded)',
    privateKeyCheck: 'Please input a private key with a string length of 64',

    // 提交
    saveAddressPriKey: 'Please keep your address and private key in a safe place. Once the node is created, it will not be recovered.',
    sshConnectFail: 'SSH is unable to connect, please check the SSH configuration',
    addressNotPrivateKey: 'Private key and address does not match',
    addNodeSuccess: 'Add successfully',
    updateNodeSuccess: 'Update successfully',
    deleteNodeTips: 'Do you confirm to delete this node?',
    deleteNodeSuccess: 'Delete successfully',
    deleteNodeRunningTips: 'Fail to delete. The node is active.',
    deleteNodeLastTips: 'If the last node is deleted, the blockchain where this node is located will be deleted at the same time. Do you want to continue?',
    deleteNodeServerError: 'Server error',
  }
}
