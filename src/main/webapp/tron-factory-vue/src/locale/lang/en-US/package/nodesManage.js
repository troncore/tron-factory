export default {
  nodesManage: 'Nodes Management',
  addNode: 'Add Node',
  modifyNode: 'Edit Node',
  nodeDetail: 'Node Detail',
  oneClickDeployment: 'Start',
  deploy: 'Deploy',
  encryption: 'Signature Algorithm',

  sshUserName: 'SSH Username',
  isSR: 'SR',
  nodeIP: 'Node IP',
  nodePort: 'Node Port',
  deployStatus: 'Status',
  unDeploy: 'Pending',
  deployed: 'Success',
  javaTronVersion: 'Version',

  pleaseAddNode: 'Please add at least one node',
  allNodeDeployed: 'All nodes are deployed ',
  pleaseDoneConfig: 'Configuration is required',
  needSRnoSyncCheck: 'At lesast one SR node information synchronization is OFF',
  todoConfig: 'Configuration is required,please fill in the configuration first',
  inputLater: 'Later',
  inputNow: 'Fill it now',
  sureConfigDeploy: 'Do you comfirm to deploy with the current configuration?',
  updateConfig: 'Modify',
  sureDeploy: 'Comfirm',
  deployingTips: 'Deploying. Please check log or deploy status later',
  viewLog: 'Check Log',
  logDialogTitle: 'Log',
  emptyLog: 'No log',
  loadingLog: 'Checking',
  deployComplete: 'Succcessfully deployed',
  deployFail: 'Failed deployed',

  nodeType: 'Node Type',
  nodeConfig: 'Node Configuration',
  SSH: 'SSH',
  fullNode: 'Full Node',
  superNode: 'Super Node',
  sshConnectType: 'Authentication Methods',
  keyConnect: 'Public Key',
  passwordConnect: 'Password',
  sshPassword: 'Password',
  sshPort: 'Port',
  SRNode: 'SR node(witness node)',
  syncCheck: 'needSyncCheck',
  saveAddressPriKey: 'Please keep your address and private key in a safe place. Once the node is created, it will not be recovered.',
  sshConnectFail: 'SSH is unable to connect,please check the SSH configuration',
  addressNotPrikey: 'Private key and address does not match',
  addNodeSuccess: 'Successfully added',
  addNodeFail: 'Failed added',
  updateNodeSuccess: 'Successful updated',
  updateNodeFail: 'Failed updated',
  deleteNodeTipsTitle: 'Notice',
  deleteNodeTips: 'Are you sure you want to delete this node?',
  deleteNodeSuccess: 'Successful deleted',

  helpTips: {
    crypto: 'Signature Algorithm can not be changed after nodes added',
    deployFile: 'Deploy requires local release file path like /Users/xxx/xxx/java-tron-1.0.0.zip',
    fullNode: 'FullNode has the complete block chain data, can update data in real time. <br/>It can broadcast the transactions and provide api service',
    superNode: 'Super Representative(abbr: SR) is the block producer in the block chain.They verify<br/>the transactions and write the transactions into the blocks in turn',
    SSH: 'The deployment file needs to be uploaded on the server through SSH',
    url: 'Office website of SR',
    voteCount: 'Determine the initial ordering of SR',
    sshUserName: 'Username',
    sshPassword: 'Password',
    sshPort: 'Port',
    ip: 'FullNode IP',
    port: 'FullNode Port',
    isSR: 'SR is witnessnode, ON for a witness node, OFF for a bare FullNode',
    needSyncCheck: 'The information of each node on the chain is regularly synchronized if SyncCheck is ON. <br/>One chain must have one SR with SyncCheck OFF',
    publicKey: 'Address in Base58Check format',
    privateKey: 'Private Key(256-bits, hex encoded)',
  },

  valid: {
    maxNodeLength: 'Maximum of 20 Nodes',
    inputID: 'Please input ID',
    positiveInteger: 'Positive number required',
    rightIP: 'Please input vaid IP address',
    disabledLocalIP: 'Local IP is not supported',
    hasSameIP: 'IP already exists in list',
    maxPortValue: 'Port number illegal',
    inputURL: 'Please input URL for this witness',
    inputVoteCount: 'Please input vote count',
    gteZeroInt: 'Please input a number greater than or equal to 0',
    maxNumberValue: 'maximum exceeded',
    maxVoteCountValue: 'Vote Count exceeds maximum',
    publicKey: 'Please input address in Base58Check format',
    inputPrivateKey: 'Please input 256-bits private key (hex encoded)',

    inputFilePath: 'Enter path of java-tron release file',
    inputRightPath: 'Enter path of java-tron release file like java-tron-1.0.0.zip',
  },
}
