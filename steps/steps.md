<p align="center">
  <img width="320" src="../src/main/webapp/tron-factory-vue/src/assets/logo.png">
</p>

English | [简体中文](./steps/steps.zh.md)

### 1.Ready to work

Need to implement SSH in advance [key login](https://www.digitalocean.com/community/tutorials/how-to-configure-ssh-key-based-authentication-on-a-linux-server) or [password login](https://serverpilot.io/docs/how-to-enable-ssh-password-authentication/) 

Deploy node needs [java-tron-1.0.0.zip build](https://tronprotocol.github.io/documentation-en/developers/deployment/)

### 2.Home
 
（1）Documentation  
（2）Click the start button to deploy nodesk<sup style="color:blue">[1]</sup>

### 3.Nodes manage

Node management is to manage all your nodes added and deployed in TRON FACTORY.

### How to add a node

At first select the signature algorithm to be used by your node.TRON FACTORY supports ECKey and SM2 signature algorithms currently.<sup style="color:blue">[2]</sup>
Click on the `Add Node`; in the upper left corner to add a Witness node or a FullNode node to the one-click chain network.
  
Required fields include：

|               Required field                |                                    Explanation                                     |
| :-----------------------------------------: | :--------------------------------------------------------------------------------: |
|                 node type                   |                                    Super Node or Full Node                         |
|                 needSyncCheck               | The infromation of each node on the chain is regularly synchronized if SyncCheck is ON. One chain must have one SR with SyncCheck OFF|
|                     URL                     |                            Url （Required for Witness）                            |
|                  voteCount<sup style="color:blue">[3]</sup>                   |               Number of corresponding votes （Required for Witness）               |
|                    address                  |           Super node address using corresponding signature algorithm based on private key （Required for Witness）               |
|                  privateKey<sup style="color:blue">[4]</sup>                 |         64-bit key saved locally(Required for Witness)                            |
|                     IP                      |                                      Node server IP                               |
|                    username                 |        Username for SSH                                                           |  
|                    port                     |        Port for SSH   (1~65535)                                                   |
|            authentication methods           |  Authentication methods for connection of SSH.Password and public key are supported now.        |
|                   password                  |               The password for connection of SSH                                  |

Click the complete button<sup style="color:blue">[5]</sup> to save current node information


### 4.Configuration

Configuration is to modify the configuration file of node deployment.You can learn the field details of configuration file by [main_net_config.conf](https://github.com/tronprotocol/tron-deployment/blob/master/main_net_config.conf).

#### Fast config

Fast configuration is to modify only the deployed file genesis block information and P2P information while other configurations use the default configuration.For more configuration you can choose custom config.

#### Custom config

Version 1.2 of TRON FACTORY include 6 modules,

##### 4.1.Genesis block

Genesis information configuration mainly includes asset configuration and witeness configuration.  
Asset configuration can add and modify current asset configuration information.  
Witeness configuration to view current witeness configuration information.

The required fields for asset configuration include:

|              Required field               |              Explanation              |
| :---------------------------------------: | :-----------------------------------: |
|                accountName                |             account name              |
|                accountType                | account type： AssetIssue  |
|                  address                  |                address<sup style="color:blue">[7]</sup>                 |
| balance <sup style="color:blue">[5]</sup> |                balance                |

The required asset(The blackhole account):

|                Required field             |              Required value               |
| :---------------------------------------: | :-------------------------------: |
|                accountName                |              Blackhole<sup style="color:blue">[6]</sup>               |
|                accountType                |  AssetIssue |
|                  address                  | (eckey signature algorithm:）TSJx5LZUDmRDKwQJHWAzpwDdAVm5F7UftB    （sm2 signature algorithm:）TEJj71X5jJUCdZ4iMcJgqpYb5ECyDvHvDu|
| balance <sup style="color:blue">[5]</sup> |               -9223372036854775808                |


Genesis block configuration click next button to save the current configuration

#####  4.2 Basic config

The basic configuration required fields include：

| Required field |                               Explanation                                |
| :------------: | :----------------------------------------------------------------------: |
|   MaintenanceTimeInterval    |      Maintenance interval (Number is a positive integer maximum support value 2147483647)      |
|   blockProposalExpireTime    | Block proposal expiration time (Number is a positive integer maximum support value 2147483647) |
|   nodeBlockProducedTimeOut   |  node Block Produced TimeOut (Number is a positive integer and the value range is [0-100])   |
|   nodeMinParticipationRate   |   node MinParticipationRate (Number 0 or positive integer and the value range is [0-100])    |

Basic configuration click the next button to save the current configuration

##### 4.3 Network link configuration(http/rpc)

Required fields for network link configuration include:

|    Required field    |                                       Explanation                                       |
| :------------------: | :-------------------------------------------------------------------------------------: |
|   httpFullNodePort   |      httpFullNode Port (Number is a positive integer maximum support value 65535)       |
| maxHttpConnectNumber | max http Connect Number (Number is a positive integer maximum support value 2147483647) |
|   httpSolidityPort   |      httpFullNode Port (Number is a positive integer maximum support value 65535)       |
|       rpcPort        |           rpc Port (Number is a positive integer maximum support value 65535)           |
|   rpcSolidityPort    |       rpcSolidity Port (Number is a positive integer maximum support value 65535)       |
|   fullNodeEnable     |   Whether to enable fullNode's http service                                 |
|   solidityEnable     |   Whether to enable solidityNode's http service                               |

Network link configuration click the next button to save the current configuration

##### 4.4 Database configuration

Database configuration required fields include：

|          Required field          | Explanation |
| :------------------------------: | :---------: |
|  Database engine                 |  LevelDB or RocksDB  |
|  Whether to write synchronously  |  Yes or no  |
| Whether to open the transaction  |  Yes or no  |
|  Custom chainbase Module   |  Upload custom compiled chainbase module  |

Database configuration click the next button to save the current configuration

##### 4.5 P2p configuration

P2p configuration required fields include：

| Required field |                                 Explanation                                 |
| :------------: | :-------------------------------------------------------------------------: |
|   p2pVersion   | p2p Version (Number is a positive integer maximum support value 2147483647) |
|   listenPort   |   listen Port (Number is a positive integer maximum support value 65535)    |
|    seedNode    |                              seedNode (check)                               |

Advanced configuration fields include：

| Advanced configuration field |                                        Explanation                                         |
| :--------------------------: | :----------------------------------------------------------------------------------------: |
|        maxActiveNodes        |      Max Active Nodes (Number is a positive integer maximum support value 200)      |
|   maxActiveNodesWithSameIp   | max Active NodesWithSameIp (Number is a positive integer maximum support value 50) |
|     activeConnectFactor      |         activeConnectFactor (Floating point number greater than 0 and less than or equal to 1)         |
|        connectFactor         |            connectFactor (Floating point number greater than 0 and less than or equal to 1)            |

P2p configuration click the next button to save the current configuration

##### 4.6 Module customization

Include two modules:consensus module and transaction module

###### Consensus module

Currently supports DPOS

###### transaction module

You can upload your own compiled transaction module.

### 5 Node deployment

TRON FACTORY only support deploy all nodes at one time.Nodes which deployment status are pending will be deployed when clicking deploy button. 

You will choose deployment files of java-tron after click deploy button.See [depolyment document](https://tronprotocol.github.io/documentation-en/developers/deployment/) to learn how to compile java-tron and generate deployment files.

All the nodes will be deployed in turn after click deploy button.You can check logs after the deployment is complete and the status of nodes will change to complete.

#### 5.1 Logs

Click logs to view the log of the node's deployment. 

### 5.2 Details

Click details to view the details of the node.

### 5.3 Delte

The node can be deleted which status is pending.

## Footnote

[1] Note: Click the `start` button is meant to start dveploying your private-chain. 

[2] Note: The signature algorithm cannot be changed once the node has been added.And only after the node is emptied the signature algorithm can be reselected.

[3] Note: The range of voteCount is 0 - 9223372036854775807.

[4] Note: The private key of each super node can't be repeated.

[5] Note: The balance range is between -9223372036854775808 and 9223372036854775807. To ensure successful deployment, please fill in the range of values.

[6] Note：Blackhole asset is required and different signature algorithm corresponding to different address.

[7] Note: Need to fill in the corresponding address of the current signature algorithm.

## License

Copyright (c) 2020 Tron Factory
