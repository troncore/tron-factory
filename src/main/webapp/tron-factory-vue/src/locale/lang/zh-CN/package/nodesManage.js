export default {
  nodesManage: '节点管理',
  addNode: '添加节点',
  modifyNode: '修改节点',
  nodeDetail: '节点详情',
  oneClickDeployment: '一键部署',
  deploy: '部署',
  encryption: '签名算法',

  sshUserName: 'SSH 用户名',
  isSR: 'SR节点',
  nodeIP: '节点 IP',
  nodePort: '节点端口',
  deployStatus: '部署状态',
  unDeploy: '未部署',
  deployed: '已部署',
  javaTronVersion: '版本号',

  pleaseAddNode: '请添加至少一个节点',
  allNodeDeployed: '节点都已部署',
  pleaseDoneConfig: '请先填写配置',
  needSRnoSyncCheck: '至少配置一个SR节点同步检测为false',
  todoConfig: '配置未填写，请先填写配置',
  inputLater: '稍后再说',
  inputNow: '立即填写',
  sureConfigDeploy: '确认使用当前配置进行部署',
  updateConfig: '修改配置',
  sureDeploy: '确认部署',
  deployingTips: '正在部署中, 请稍候日志或部署状态',
  viewLog: '查看日志',
  logDialogTitle: '部署日志',
  emptyLog: '当前部署暂无日志',
  loadingLog: '正在查询节点记录，请稍等',
  deployComplete: '部署完成',
  deployFail: '部署失败',
  deployLog: '部署日志',
  nodeDetails: '节点详情',

  nodeType: '节点类型',
  nodeConfig: '节点配置',
  SSH: 'SSH',
  fullNode: 'Full Node',
  superNode: 'Super Node',
  sshConnectType: '安全验证方式',
  keyConnect: '密钥',
  passwordConnect: '密码',
  sshPassword: '密码',
  sshPort: '端口',
  SRNode: 'SR节点(超级代表节点)',
  syncCheck: 'needSyncCheck',
  saveAddressPriKey: '请保管好你的地址和私钥，节点创建完成后丢失将无法找回',
  sshConnectFail: 'SSH无法连接，请重新配置',
  addressNotPrikey: '你的地址与私钥不相匹配',
  addNodeSuccess: '添加节点成功',
  addNodeFail: '添加节点失败',
  updateNodeSuccess: '修改节点成功',
  updateNodeFail: '修改节点失败',
  deleteNodeTipsTitle: '提示',
  deleteNodeTips: '此操作将删除该节点信息, 是否继续?',
  deleteNodeSuccess: '删除节点成功',

  helpTips: { // only for help info/comment
    crypto: '添加节点之后，签名算法不可修改',
    deployFile: '请上传有效的编译执行文件(默认路径：/build/distributions/java-tron-1.0.0.zip)',
    fullNode: 'FullNode 是拥有完整区块链数据的节点，能够实时更新数据，负责交易的广播和验证，<br/>提供操作区块链的api和查询数据的api。',
    superNode: '又称为超级代表（简称SR），主要用于生成区块，负责对网络上广播出来的交易数据进行验证，<br/>并将交易打包进区块中，打包区块的方式是通过SR之间轮流的方式进行打包。',
    SSH: '节点部署需要通过SSH的方式将部署文件放到服务器上',
    url: '超级代表的官方网址',
    voteCount: '超级代表的投票数量，确定超级代表的排序',
    sshUserName: '用户名',
    sshPassword: '密码',
    sshPort: '端口',
    ip: 'FullNode IP',
    port: 'FullNode 端口号',
    isSR: '配置节点是否为超级代表节点（即witness节点)，开启时为超级代表节点，关闭时为FullNode',
    needSyncCheck: '同步检测开启后会定期同步链上各节点信息，新链至少有一个 SR 此参数为 false，其他为 true',
    publicKey: 'Base58Check 地址',
    privateKey: '请输入私钥(256位, 16进制编码)',
  },

  valid: { // for form check
    maxNodeLength: '最多添加 20 个节点',
    inputID: '请输入 ID',
    rightIP: '请输入有效的 IP 地址',
    disabledLocalIP: '暂不支持本地 IP',
    hasSameIP: 'IP 不能和已有 IP 相同',
    inputURL: '请输入 Witness 的 URL',
    inputVoteCount: '请输入对应投票数量',
    maxVoteCountValue: 'Vote Count 填写额超过最大值',
    publicKey: '请输入格式为 Base58Check 的地址',
    inputPrivateKey: '请输入256位 private key (hex编码)',
    inputFilePath: '请输入 java-tron 软件包路径',
    inputRightPath: '软件包路径以 java-tron-1.0.0.zip 结尾',
  },
}
