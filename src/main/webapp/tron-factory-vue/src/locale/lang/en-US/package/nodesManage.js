export default {
  nodesManage: 'Nodes Management',
  addNode: 'Add Node',
  modifyNode: 'Edit Node',
  nodeDetail: 'Node Detail',
  oneClickDeployment: '一键部署',
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

  nodeType: '节点类型',
  nodeConfig: '节点配置',
  SSH: 'SSH',
  fullNode: 'Full Node',
  superNode: 'Super Node',
  sshConnectType: 'Authentication methods for SSH',
  passwordConnect: 'Password Authentication',
  keyConnect: 'Public Key Authentication',
  sshPassword: 'SSH Password',
  sshPort: 'SSH Port',
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
    fullNode: 'Full Node 介绍',
    superNode: 'Super Node 介绍',
    SSH: 'SSH 介绍',
    url: 'URL 介绍',
    voteCount: 'voteCount 介绍',
    sshUserName: 'SSH Username',
    sshPassword: 'SSH Password',
    sshPort: 'SSH Port',
    ip: 'FullNode IP',
    port: 'FullNode Port',
    isSR: 'SR is witnessnode, ON for a witness node, OFF for a bare FullNode',
    needSyncCheck: 'The infromation of each node on the chain is regularly synchronized if SyncCheck is ON. One chain must have one SR with SyncCheck OFF',
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
