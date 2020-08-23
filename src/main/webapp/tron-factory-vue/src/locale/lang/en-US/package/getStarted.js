export default {
  startCreate: 'Get Started',
  summaryChain: 'TRON Factory, blockchain customization based on the TRON framework. ',
  descriptionChain: 'Build your wishes blockchain with the TRON framework. TRON Factory comes with everything professional for enterprise users.',
  // 创建/修改区块链
  chainManage: {
    startCreate: 'Get Started',
    updateChain: 'Edit',
    baseInfo: 'Basics',
    chainNameLabel: 'Blockchain Name',
    chainNameTips: 'The name of your blockchain',
    chainNameCheckLength: 'Blockchain name can only contain digits and letters, and the length cannot exceed 30 characters',
    encryptionLabel: 'Signature Type',
    encryptionTips: 'Choose the signature type for your blockchain. Signature types in the same blockchain must be consistent',
    p2pVersionLabel: 'p2pVersion ',
    p2pVersionTips: 'p2pVersion in the same blockchain must be consistent',
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
    accountNameCheckRepeat: '该账户已添加',
    accountTypeLabel: 'accountType',
    accountTypeTips: 'The type of account',
    addressLabel: 'address',
    addressTips: 'Base58Check encoding',
    addressCheckValid: 'Invalid address',
    balanceLabel: 'balance',
    balanceTips: 'Initial balance of account',

    needBlackhole: '必须添加 Blackhole 账户',
    needMoreAsset: '至少再添加一个除 Blackhole 之外的账户',
    existChain: 'The blockchain have been created',
  },

  // 区块链信息、节点列表信息
  dashboard: {
    dashboard: 'Blockchain',
    chainInfo: 'Blockchain Configuration',
    chainName: 'Name',
    encryption: 'Signature',
    p2pVersion: 'p2pVersion',
    status: 'Status',
    unPublish: 'un-deployed',
    publishing: 'deploying',
    published: 'deployed',
    statusTips: 'Only "deployed" blockchain produces blocks',
    explorer: 'Explorer',
    stopDeleteChain: 'Active node exists',
    deleteChainWarningTips: 'Are you sure to delete?',

    // 节点列表
    nodeInfo: 'Node List',
    addNode: 'Add',
    ip: 'IP',
    listenPort: 'Listen Port',
    nodeType: 'Node Type',
    superNode: 'SR',
    fullNode: 'Full Node',
    configStatus: 'Config Status',
    statusOK: 'Configured',
    statusNO: 'Not configured',
    deployStatus: 'Node Status',
    deploySuccess: 'Running',
    deployStop: 'Stopped',
    createNodeTime: 'Created Time',
    nodeConfig: 'Config',
    stopRunNode: 'Stop',

    runNode: 'Deploy',
    pleaseAddNode: 'Node list is empty.',
    pleaseSelectNodes: 'No node selected',
    pleaseConfigNodes: 'All nodes must be configured',
    initRunSRCheck: 'When running the blockchain for the first time, the number of SR nodes in the selected list must be >> = 1 and an odd number.',
    runNodeDialogTitle: 'Launch Nodes',
    checkFilePath: 'Please upload a valid compilation and execution file (default path: /build/distributions/java-tron-1.0.0.zip)',
    inputFilePath: 'Please input the java-tron package path',
    endRightPath: 'The package path ends with java-tron-1.0.0.zip',
    runningNode: 'Launching',
    runFailTips: 'Fail to run node. Please check node logs.',
    runFailSomeTips: 'Warning. Part of nodes failed to run. Please check node logs.',
    runExistTips: 'Deployment is running. Please try again later..',
    runSuccessTips: 'Launch successfully',

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

    serverInfo: 'Server Setting',
    ip: '服务器地址',
    ipPlaceholder: 'IP/主机名',
    ipCheckRight: '请输入有效的服务器地址',
    listenPort: 'Listen Port',
    listenPortTips: 'P2P listen port',
    listenPortPlaceholder: 'Please input listen port',
    sshInfo: 'SSH Setting',
    port: 'SSH Port',
    portPlaceholder: 'Please input ssh port',
    sshConnectType: 'Secure Authentication',
    byPassword: 'Password',
    byPublicKey: 'Public Key',
    sshUserName: 'SSH Username',
    sshUserNamePlaceholder: 'Please input the ssh username',
    sshPassword: 'SSH Password',
    sshPasswordPlaceholder: 'Please input the ssh password',
    nodeType: 'Node Type',
    superNode: 'Super Representative',
    superNodeTips: 'Super representatives (SRs) produce blocks. Super representatives take turns to verify and package transactions broadcasted on the network.',
    fullNode: 'Full Node',
    fullNodeTips: 'A full node has complete and real-time blockchain data and is responsible for broadcasting and verifying transactions. Full nodes provide API services.',
    superNodeInfo: 'SR Configuration',
    url: 'URL',
    urlTips: 'The official website of the SR',
    urlPlaceholder: 'Please input URL for the SR',
    voteCount: 'Vote Count',
    voteCountTips: 'Enter the number of votes for the SR. The number of votes determines the block producing order.',
    voteCountPlaceholder: 'Please input vote count',
    voteCountCheckMax: 'Vote Count exceeds maximum',
    oneKey: '自动生成',
    publicKey: 'Address',
    publicKeyTips: 'Enter the address of the SR. The address must be Base58Check encoding.',
    publicKeyPlaceholder: 'Please input the address with Base58Check encoded',
    privateKey: 'PrivateKey',
    privateKeyTips: 'Enter the private key of the SR. The private key must be 256-bit hexadecimal code.',
    privateKeyPlaceholder: 'Please input 256-bits private key (Hexadecimal encoded)',
    privateKeyCheck: 'Please input a private key with a string length of 64',

    // 提交
    saveAddressPriKey: 'Please keep your address and private key in a safe place. Once the node is created, it will not be recovered.',
    sshConnectFail: 'SSH is unable to connect, please check the SSH configuration',
    addressNotPrivateKey: 'Private key and address does not match',
    addNodeSuccess: 'Successfully added',
    updateNodeSuccess: 'Successfully updated',
    deleteNodeTips: 'Do you confirm to delete this node?',
    deleteNodeSuccess: 'Successfully deleted',
    deleteNodeRunningTips: 'Fail to delete. The node is active.',
    deleteNodeLastTips: 'If the last node is deleted, the blockchain where this node is located will be deleted at the same time. Do you want to continue?',
    deleteNodeServerError: 'Server error',
  }
}
