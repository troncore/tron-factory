<p align="center">
  <img width="320" src="../src/main/webapp/tron-factory-vue/src/assets/logo.png">
</p>

简体中文 | [English](./steps/steps.md)

### 1.准备工作

目前TRON FACTORY对服务器的节点部署是通过SSH方式传输与通信，因此需要对服务器进行部署需要提前实现[免密登录](https://www.jianshu.com/p/13919b5ba8a2)或[密码登录](https://blog.csdn.net/li528405176/article/details/82810342)  
部署节点需要 [如何编译java-tron](https://tronprotocol.github.io/documentation-zh/developers/deployment/)

### 2.一键发链首页

（1）查看文档  
（2）一键部署，点击进入到部署管理页面<sup style="color:blue">[1]</sup>

### 3.节点管理

节点管理是对您所有在TRON FACTORY添加及部署的节点进行管理

#### 如何添加节点
首先选择您节点所要使用的签名算法，目前支持ECKey以及SM2两种签名算法<sup style="color:blue">[2]</sup>
点击左上角添加节点按钮进入到添加节点页面

必填字段包括

|                  必填字段                    |                        解释                         |
| :-----------------------------------------: | :-------------------------------------------------: |
|                   节点类型                   |                超级节点或全节点                |
|                  needSyncCheck              |   超级节点是否开启同步检测，此参数一条链必须有且只能有一个超级节点关闭（Super Node必填） |
|                URL                          |        超级节点的官网（Super Node必填）               |
| voteCount<sup style="color:blue">[3]</sup>  |          对应投票数量 （Super Node必填）              |
| address                                     | 根据私钥使用相应签名算法的超级节点地址（Super Node必填）  |
| privateKey<sup style="color:blue">[4]</sup> |       保存本地 64 位私钥 （Super Node必填）            |
|                     IP                      |                       节点服务器IP                   |
|                   用户名                     |                       SSH链接用户名                  |
|                    PORT                     |     SSH远程端口（数字且为正整数最大支持值 65535）         |
|                 安全验证方式                  |     SSH远程登录的安全验证方式，现在只支持密钥和密码2种     |
|                     密码                     |     SSH密码安全验证                                  |

点击完成<sup style="color:blue">[5]</sup> 保存并添加当前节点信息

### 4.配置

配置是对节点部署开启时的配置文件进行修改，相关参数可以参考java-tron的配置文件[主链部署配置文件](https://github.com/tronprotocol/tron-deployment/blob/master/main_net_config.conf)

#### 快速配置

快速配置是只修改部署的文件创世块信息和P2P信息而其他配置使用默认配置的功能，具体功能解释可以看自定义配置

#### 自定义配置

TRON FACTORY 1.2的自定义配置主要包含6个模块

##### 4.1.创世块信息

创世块信息配置主要包括 asset 配置和 witeness 配置  
asset 配置 可以新增和修改当前 asset 配置信息  
witeness 配置 可以查看当前 witeness 配置信息，即当前所有节点中是超级节点的配置信息

asset 配置必填字段包括：

|                 必填字段                  |               解释                |
| :---------------------------------------: | :-------------------------------: |
|                accountName                |              账户名               |
|                accountType                | 账户类型： AssetIssue 或 Contract |
|                  address                  | 地址<sup style="color:blue">[7]</sup>             |
| balance <sup style="color:blue">[5]</sup> |               余额                |

必须添加的asset（该账户为黑洞账户）：

|                必填字段                   |              必填值                |
| :---------------------------------------: | :-------------------------------: |
|                accountName                |  Blackhole<sup style="color:blue">[6]</sup>       |
|                accountType                |  AssetIssue |
|                  address                  | (eckey签名算法）TSJx5LZUDmRDKwQJHWAzpwDdAVm5F7UftB（sm2签名算法）TEJj71X5jJUCdZ4iMcJgqpYb5ECyDvHvDu|
| balance <sup style="color:blue">[5]</sup> |               -9223372036854775808                |

创世块信息点击下一步按钮保存当前配置

##### 4.2.基础配置

基础配置必填字段包括：

|       必填字段       |                             解释                             |
| :----------------------: | :----------------------------------------------------------: |
| MaintenanceTimeInterval  |     维护时间间隔 （数字且为正整数最大支持值 2147483647）     |
| blockProposalExpireTime  |   区块提案到期时间（数字且为正整数最大支持值 2147483647）    |
| nodeBlockProducedTimeOut | 节点区块产生超时比例 （数字0或正整数 取值范围为[0-100]） |
| nodeMinParticipationRate |   节点最小参与率 （数字0或正整数 取值范围为[0-100]）    |

基础配置点击下一步按钮保存当前配置

##### 4.3.网络链接配置(http/rpc)

网络链接配置必填字段包括：

|       必填字段       |                           解释                           |
| :------------------: | :------------------------------------------------------: |
|   httpFullNodePort   |   httpFullNode 端口（数字且为正整数最大支持值 65535）    |
| maxHttpConnectNumber | 最大 http 连接数 （数字0或正整数 取值范围[0-200]） |
|   httpSolidityPort   |   httpFullNode 端口 （数字且为正整数最大支持值 65535）   |
|       rpcPort        |       rpc 端口 （数字且为正整数最大支持值 65535）        |
|   rpcSolidityPort    |   rpcSolidity 端口 （数字且为正整数最大支持值 65535）    |
|   fullNodeEnable     |   是否开启fullNode                                   |
|   solidityEnable     |   是否开启solidityNode                               |

网络链接配置点击下一步按钮保存当前配置

##### 4.4.数据库基础配置

数据库基础配置必填字段包括：

|       必填字段       |  解释  |
| :------------------: | :----: |
|     数据库引擎     | LevelDB或RocksDB |
|     是否同步写入     | 是或否 |
| 是否打开 transaction | 是或否 |
| 自定义chainbase模块  | 上传自定义编译chainbase模块 |

数据库基础配置点击下一步按钮保存当前配置

##### 4.5.p2p 配置

p2p 配置必填字段包括：

|  必填字段  |                       解释                       |
| :--------: | :----------------------------------------------: |
| p2pVersion | p2p 版本 （数字且为正整数最大支持值 2147483647） |
| listenPort |  listen 端口 （数字且为正整数最大支持值 65535）  |
|  seedNode  |                 seedNode (勾选)                  |

高级配置字段包括：

|       高级配置字段       |                            解释                            |
| :----------------------: | :--------------------------------------------------------: |
|      maxActiveNodes      |     最大链接数 （数字且为正整数最大支持值 200])     |
| maxActiveNodesWithSameIp | 同一 ip 最大连接数 （数字且为正整数最大支持值 50) |
|   activeConnectFactor    | activeConnectFactor （数字为(0-1]之间的浮点数）  |
|      connectFactor       |    connectFactor （数数字为(0-1]之间的浮点数）     |

p2p 配置点击下一步按钮保存当前配置



##### 4.6.模块定制化

其主要包括: 共识模块, 交易模块

###### 共识模块

目前支持 DPOS

###### 交易模块

可以上传自己修改编译后的交易模块

### 5.节点部署

TRON FACTORY只支持全量部署，当节点全部添加完毕后进入节点管理页面点击部署会自动部署所有部署状态为未部署的节点   

点击部署后，选择编译后的java-tron部署包，具体java-tron编译生成部署包请查看[部署文档](https://tronprotocol.github.io/documentation-zh/developers/deployment/)

部署开始后，所有的节点将会依次进行部署，部署结束后可点击部署日志查看相应的部署结果，成功的节点部署状态将会变成已部署

#### 5.1查看日志

点击查看日志可以查看当前节点的日志。  

### 5.2 节点详情

点击可查看节点的详细配置

### 5.3 删除节点

未部署的节点可以进行删除

## 脚注

[1] 注：点击一键部署按钮就表明开始部署您的应用链

[2] 注：签名算法一旦添加过节点后就不能更改，只有将节点清空后才可以重新选择签名算法

[3] 注：voteCount 支持范围为 0 - 9223372036854775807

[4] 注：每次添加的超级节点 privateKey 不能重复

[5] 注：balance 范围为-9223372036854775808 至 9223372036854775807 ，为保证部署成功，请按照取值内范围填写

[6] 注：必须添加名为Blackhole 的asset，不同的签名算法，对应的地址也不相同

[7] 注：需填写对应当前签名算法的地址



## License

Copyright (c) 2020 Tron Factory
