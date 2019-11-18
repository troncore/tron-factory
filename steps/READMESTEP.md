<p align="center">
  <img width="320" src="https://tronscan.org/static/media/tron-banner-1.e40b3379.png">
</p>

English | [简体中文 ](https://github.com/wubinTron/one-click-deployment/blob/master/steps/READMESTEP.zh.md)

### 1.Preparations

### 2.Home for One Click Deployment

Mainly show the operation steps for one click deployment:   
(1）Introduction for one click deployment      
(2）New guide    
(3）Help document  
(4）Click start button to start deployment <sup style="color:blue">[1]</sup>

### 3.添加节点

(1) 点击选择左上角的添加节点，给一键发链网络添加 Witness 节点和 FullNode 节点

必填字段包括：

|                  必填字段                   |               解释                |
| :-----------------------------------------: | :-------------------------------: |
|    ID <sup style="color:blue">[2]</sup>     |            ssh 用户名             |
|                     IP                      |            FullNode Ip            |
|                    PORT                     |           FullNode 端口           |
|                     URL                     |    Witness Url （为 SR 必填）     |
|                  voteCount                  |    对应投票数量 （为 SR 必填）    |
| privateKey<sup style="color:blue">[3]</sup> | 保存本地 64 位私钥 （为 SR 必填） |

如下图所示：
![](https://github.com/wubinTron/one-click-deployment/blob/develop/steps/img/add_node.png)

(2）点击保存<sup style="color:blue">[4]</sup> 当前节点列表展示当前添加的节点信息 下一步按钮可以点击

(3) 节点列表 <sup style="color:blue">[5]</sup>

节点列表展示所有添加的节点

### 4.配置管理

(1)创世信息配置

创世信息配置主要包括 asset 配置和 witeness 配置
asset 配置 可以新增和修改当前 asset 配置信息
witeness 配置 可以查看当前 witeness 配置信息

asset 配置必填字段包括：

|                 必填字段                  |               解释                |
| :---------------------------------------: | :-------------------------------: |
|                accountName                |              账户名               |
|                accountType                | 账户类型： AssetIssue 或 Contract |
|                  address                  |               地址                |
| balance <sup style="color:blue">[6]</sup> |               余额                |

创世信息配置点击下一步按钮保存当前配置

(2)基础配置

基础配置必填字段包括：

| 必填字段  |  解释  |
| :-------: | :----: |
|  chainId  | 链 ID  |
| chainName | 链名称 |

高级配置字段包括：

|       高级配置字段       |         解释         |
| :----------------------: | :------------------: |
| MaintenanceTimeInterval  |     维护时间间隔     |
| blockProposalExpireTime  |   区块提案到期时间   |
| nodeBlockProducedTimeOut | 节点区块产生超时时间 |
| nodeMinParticipationRate |    节点最小参与率    |

基础配置点击下一步按钮保存当前配置

(3)网络链接配置(http/rpc)

网络链接配置必填字段包括：

|       必填字段       |       解释        |
| :------------------: | :---------------: |
| maxHttpConnectNumber | 最大 http 连接数  |
|   httpFullNodePort   | httpFullNode 端口 |
|   httpSolidityPort   | httpFullNode 端口 |
|       rpcPort        |     rpc 端口      |
|   rpcSolidityPort    | rpcSolidity 端口  |

络链接配置点击下一步按钮保存当前配置

(4)数据库基础配置

数据库基础配置必填字段包括：

|       必填字段       |  解释  |
| :------------------: | :----: |
|     是否同步写入     | 是或否 |
| 是否打开 transaction | 是或否 |
|    选择数据库配置    | 是或否 |
| 是否打开 index 开关  | 是或否 |
| 是否需要更新 assets  | 是或否 |

数据库基础配置点击下一步按钮保存当前配置

(5)p2p 配置

p2p 配置必填字段包括：

|  必填字段  |    解释     |
| :--------: | :---------: |
| p2pVersion |  p2p 版本   |
| listenPort | listen 端口 |
|  seedNode  |  seedNode   |

高级配置字段包括：

|       高级配置字段       |        解释         |
| :----------------------: | :-----------------: |
|      maxActiveNodes      |     最大链接数      |
| maxActiveNodesWithSameIp | 同一 ip 最大连接数  |
|   activeConnectFactor    | activeConnectFactor |
|      connectFactor       |    connectFactor    |

p2p 配置点击下一步按钮保存当前配置

(6)跨链配置

跨链配置必填字段包括：

|      必填字段      |     解释      |
| :----------------: | :-----------: |
|  enableCrossChain  | 是否允许跨链  |
| maxValidatorNumber |  最大验证数   |
| minValidatorNumber |  最小验证数   |
|   crossChainFee    | crossChainFee |

跨链配置点击下一步按钮保存当前跨链配置<sup style="color:blue">[7]</sup>

### 5.导入插件

(1)共识模块

目前支持 DPOS

共识模块点击下一步按钮保存当前共识模块设置

(2)交易模块

目前支持的模块如下，也可以自定义模块
AccountPermissionUpdate
AssetIssue
ClearABIContract
CreateAccount
ExchangeCreate
ExchangeInject
ExchangeTransaction
ExchangeWithdraw
FreezeBalance
ParticipateAssetIssue
ProposalApprove
ProposalCreate
ProposalDelete
SetAccountId
ShieldedTransfer
Transfer
TransferAsset
UnfreezeAsset
UnfreezeBalance
UpdateAccount
UpdateAsset
UpdateBrokerage
UpdateEnergyLimit
UpdateSettingContract
VoteWitness
WithdrawBalance
WitnessCreate
WitnessUpdate

交易模块点击下一步按钮保存当前共识模块设置

(3)数据库模块

支持 leveldb 和 rockdb

数据库模块点击下一步保存当前数据库模块<sup style="color:blue">[8]</sup>

### 6.节点部署

(1)批量部署

节点部署支持单个节点部署和多个节点批量部署
点击列表勾选按钮，勾选对应需要部署的节点，此时部署按钮为绿色
点击批量部署按钮，输入对应的 zip 包路径，如/home/user/java-tron/build/distributions/java-tron-1.0.0.zip
点击保存开始部署，在部署期间批量部署按钮为 loading 状态，此时可以点击查看日志查看部署详情，部署完成后批量部署按钮取消 loading 状态。

(2)查看日志

点击查看日志可以查看当前节点的日志 如果没有则会提示暂无节点日志
如果部署完成点击查看日志 日志会自动刷新 直至出现 deploy finish，则为部署完成

## 脚注

[1] 注：点击开始一键部署按钮，获取节点列表菜单权限，每次点击会重置菜单权限

[2] 注：id 和 ip 地址均不能相同

[3] 注：每次添加的节点 privateKey 不能重复

[4] 注：点击节点列表下一步按钮重置配置管理菜单权限，只展示配置管理菜单权限

[5] 注：当节点列表为空时候默认下一步按钮不可以点击，当节点列表都删除除时没有下一步菜单权限，节点列表最多支持 20 个节点

[6] 注：balance 范围在-9223372036854775808 和 9223372036854775807 之间，为保证部署成功，请按照取值内范围填写

[7] 注：点击配置管理最后一步骤跨链配置的下一步时，获取导入插件菜单权限，每次点击重置菜单权限

[8] 注：点击导入插件最后一步数据库模块的下一步时点击获取节点部署菜单权限，每次点击重置菜单权限

## License

Copyright (c) 2019 Tron