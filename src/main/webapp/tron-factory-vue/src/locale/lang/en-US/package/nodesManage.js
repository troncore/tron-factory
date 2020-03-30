export default {
  nodesManage: 'Nodes Management',
  addNode: 'Add Node',
  modifyNode: 'Edit Node',
  nodeDetail: 'Node Detail',
  deploy: 'Deploy',
  encryption: 'Signature Algorithm',

  sshUserName: 'SSH Username',
  isSR: 'SR',
  nodeIP: 'Node IP',
  nodePort: 'Node Port',
  deployStatus: 'Status',
  unDeploy: 'Pending',
  deployed: 'Success',
  javaTronVersion: 'Version of java-tron',

  addNodeSuccess: 'Successfully added',
  addNodeFail: 'Failed added',
  updateNodeSuccess: 'Successful updated',
  updateNodeFail: 'Failed updated',
  deleteNodeTipsTitle: 'Notice',
  deleteNodeTips: 'Are you sure you want to delete this node?',
  deleteNodeSuccess: 'Successful deleted',
  serviceType: 'Service',
  localDeploy: 'Local Deployment',
  remoteDeploy: 'Remote Deployment',
  sshPassword: 'SSH-Password',
  sshPort: 'SSH-Port',
  SRNode: 'SR node(witness node)',
  syncCheck: 'needSyncCheck',

  pleaseAddNode: 'Please add at least one node',
  allNodeDeployed: 'All nodes are deployed ',
  pleaseDoneConfig: 'Configuration is required',
  needSRnoSyncCheck: 'At lesast one SR node information synchronization is OFF',
  deployingTips: 'Deploying. Please check log or deploy status later',
  viewLog: 'Check Log',
  logDialogTitle: 'Log',
  emptyLog: 'No log',
  loadingLog: 'Checking',
  deployComplete: 'Succcessfully deployed',
  deployFail: 'Failed deployed',

  sshConnectType: '登录方式',
  passwordConnect: '口令登录',
  keyConnect: '密钥登录',
  addNodeTipsTitle: '提示',
  saveAddressPriKey: '请保管好你的地址和私钥，节点创建完成后丢失将无法找回',
  inputLater: '稍后再说',
  inputNow: '立即填写',

  helpTips: {
    crypto: 'Signature Algorithm can not be changed after nodes added',
    id: 'ID is the unique identifier',
    sshUserName: 'SSH Username',
    sshPassword: 'SSH Password',
    sshPort: 'SSH Port',
    ip: 'FullNode IP',
    port: 'FullNode Port',
    isSR: 'SR is witnessnode, ON for a witness node, OFF for a bare FullNode',
    needSyncCheck: 'The infromation of each node on the chain is regularly synchronized if SyncCheck is ON. One chain must have one SR with SyncCheck OFF',
    url: 'Official website of witness node',
    voteCount: 'voteCount',
    publicKey: 'Address',
    privateKey: 'Private Key(256-bits, hex encoded)',
    sshConnectFail: 'SSH无法连接，请重新配置',
    addressNotPrikey: '你的地址与私钥不相匹配',
    deployFile: 'Deploy requires local release file path like /Users/xxx/xxx/java-tron-1.0.0.zip',
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
    inputPrivateKey: 'Please input 256-bits private key (hex encoded)',

    inputFilePath: 'Enter path of java-tron release file',
    inputRightPath: 'Enter path of java-tron release file like java-tron-1.0.0.zip',
  },
}
