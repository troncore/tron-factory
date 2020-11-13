<template>
  <div class="verify-params card-view">
    <div class="im-card card-main">
      <div class="card-header">
        <span class="card-title">{{ $t(!deployLoading && !deploySuccess ? '确认发行参数' : (!deploySuccess ? '正在发行' : '发行完成')) }}</span>
      </div>
      <div class="card-body">
        <!-- 发行参数 -->
        <ul class="param-list" v-if="!deployLoading && !deploySuccess">
          <li class="item">
            <span class="name"><span class="align-justify">{{ $t('代币类型') }}</span>: </span>
            <span class="value">{{ form.tokenType }}</span>
          </li>
          <li class="item">
            <span class="name"><span class="align-justify">{{ $t('代币名称') }}</span>: </span>
            <span class="value">{{ form.tokenName }}</span>
          </li>
          <li class="item">
            <span class="name"><span class="align-justify">{{ $t('代币符号') }}</span>: </span>
            <span class="value">{{ form.tokenSymbol }}</span>
          </li>
          <li class="item">
            <span class="name"><span class="align-justify">{{ $t('小数位数') }}</span>: </span>
            <span class="value">{{ form.decimals }}</span>
          </li>
          <li class="item">
            <span class="name"><span class="align-justify">{{ $t('总发行量') }}</span>: </span>
            <span class="value">{{ form.totalSupply }}</span>
          </li>
          <li class="item">
            <span class="name"><span class="align-justify">{{ $t('代币所有者') }}</span>: </span>
            <span class="value">{{ form.tokenAccount }}</span>
          </li>
        </ul>
        <!-- 发行进度 -->
        <div class="deploy-progress" v-else-if="!deploySuccess">
          {{ progressText }}
        </div>
        <!-- 发行结果 -->
        <ul class="success-list" v-else>
          <li class="item">
            <span class="name"><span class="align-justify">{{ $t('合约名称') }}</span>: </span>
            <span class="value">{{ contract.name }}</span>
          </li>
          <li class="item">
            <span class="name"><span class="align-justify">{{ $t('合约创建者') }}</span>: </span>
            <el-link class="value" type="danger" target="_blank" :underline="false" :href="`https://${chain}tronscan.org/#/address/${contract.account}`">{{ contract.account }}</el-link>
          </li>
          <li class="item">
            <span class="name"><span class="align-justify">{{ $t('合约地址') }}</span>: </span>
            <el-link class="value" type="danger" target="_blank" :underline="false" :href="`https://${chain}tronscan.org/#/contract/${contract.address}/code`">{{ contract.address }}</el-link>
          </li>
          <li class="item">
            <span class="name"><span class="align-justify">{{ $t('交易哈希值') }}</span>: </span>
            <el-link class="value" type="danger" target="_blank" :underline="false" :href="`https://${chain}tronscan.org/#/transaction/${contract.id}`">{{ contract.id }}</el-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="card-footer space-between" v-if="!deploySuccess">
      <el-button class="im-button largest" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button largest" :loading="deployLoading" :disabled="disable" type="primary" @click="handleSubmit">{{ $t('base.submit') }}</el-button>
    </div>
    <div class="card-footer center" v-else>
      <el-button class="im-button largest" type="primary" @click="handleReDeploy"><i class="el-icon-coin"></i> {{ $t('继续发行') }}</el-button>
    </div>
  </div>
</template>

<script>
import * as wrapper from 'solc/wrapper'
import contract from './contract'

export default {
  name: "verify-params",
  data () {
    return {
      form: {},
      deploySuccess: false,
      contract: {
        name: '',
        account: '',
        address: '',
        id: '',
      },
      chain: 'nile.',
      signed: '',
      deployLoading: false,
      progressText: '',
      disable: false,
      timeId: null,
    }
  },
  created () {
    this.init()
    window.addEventListener('message', this.checkTronLinkNodeNet)
  },
  destroyed () {
    clearInterval(this.timeId)
    window.removeEventListener('message', this.checkTronLinkNodeNet)
  },
  methods: {
    init () {
      let tokenDIY = JSON.parse(localStorage.getItem('tokenDIY')) || {}
      // 已经有合约了
      if (tokenDIY.contract?.id) {
        this.deploySuccess = true
        this.contract = tokenDIY.contract
      }
      else {
        this.form = {
          tokenType: tokenDIY.tokenType || '--',
          tokenName : tokenDIY.tokenName || '--',     //token名称
          tokenSymbol : tokenDIY.tokenSymbol || '--',
          decimals : tokenDIY.decimals || '--',           //发行token的精度
          totalSupply : tokenDIY.totalSupply || '--',   //Token发行总量
          tokenAccount: tokenDIY.tokenAccount || '--', // 代币所有者
        }
      }
    },

    // 检测节点网络切换
    checkTronLinkNodeNet (e) {
      if (e.data.message?.action == "setNode") {
        let fullnode = e.data.message.data.node.fullNode
        if (fullnode.includes('api.trongrid')) this.chain = ''
        else if (fullnode.includes('nile')) this.chain = 'nile.'
      }
    },

    handleCancel () {
      this.$emit('step', -1)
    },
    handleSubmit () {
      this.deployLoading = true
      this.progressText = this.$t('合约编译中...')

      // 在下一个宏任务中编译部署，避免编译过久，卡住当前主线程任务
      setTimeout(async () => {
        const { abi, bytecode } = this.compile()
        const options = {
          name: this.form.tokenName, //合约名
          abi: abi,
          bytecode: '0x' + bytecode,
          feeLimit: 1000000000, //能够燃烧的trx的阀值
          parameters: [this.form.totalSupply, this.form.tokenName, this.form.tokenSymbol], // 合约的构造函数的参数列表
          userFeePercentage: 10,  //指定的使用该合约用户的资源占比
          originEnergyLimit: 10000000,
        }

        try{
          // 创建合约
          const unsigned = await window.tronWeb.transactionBuilder.createSmartContract(options, this.form.tokenAccount)
          this.progressText = this.$t('合约完成部署，请进行合约签名！')
          // 签名
          const signed = await window.tronWeb.trx.sign(unsigned)
          this.progressText = this.$t('签名完成')
          // 广播交易
          const broadcastResult = await window.tronWeb.trx.sendRawTransaction(signed)

          // 查询交易
          if (broadcastResult.result) {
            this.progressText = this.$t('交易广播成功，正在查询交易，请稍等...')
            this.timeId = setInterval(() => this.checkDeploy(signed.txID), 3000)
          } else {
            this.progressText = this.$t('交易广播失败')
            throw new Error(window.tronWeb.toAscii(broadcastResult.message))
          }

        } catch (error) {
          this.$notify({
            type: 'error',
            title: this.$t('base.error'),
            message: error
          })
          this.deployLoading = false
        }

      }, 0)

    },

    // 查询发行结果
    async checkDeploy (txID) {
      const transactionInfo = await window.tronWeb.trx.getTransactionInfo(txID)
      if (!transactionInfo) {
        clearInterval(this.timeId)
        throw new Error('Not getting transaction info!')
      }
      else if (transactionInfo.id && transactionInfo.receipt?.result === 'SUCCESS') {
        clearInterval(this.timeId)
        this.deployLoading = false
        this.$notify.success({
          title: this.$t('base.successful'),
          message: this.$t('Successful deployed contract!')
        })


        this.deploySuccess = true
        this.contract = {
          name: this.form.tokenName,
          account: this.form.tokenAccount,
          address: window.tronWeb.address.fromHex(transactionInfo.contract_address),
          id: transactionInfo.id,
        }

        // 存储
        let tokenDIY = JSON.parse(localStorage.getItem('tokenDIY')) || {}
        tokenDIY.contract = this.contract
        localStorage.setItem('tokenDIY', JSON.stringify(tokenDIY))
      }
    },

    // 合约编译
    compile () {
      let abi = ''
      let bytecode = ''

      try {
        const solc = wrapper(window.Module);
        const contractFile = 'tokenDIY.sol'
        const contractName = 'TokenDIY'
        const contractCode = contract(contractName)

        let input = {
          language: 'Solidity',
          sources: {
            [contractFile]: {
              content: contractCode
            }
          },
          settings: {
            outputSelection: {
              '*': {
                '*': ['*']
              }
            }
          }
        }

        let output = JSON.parse(solc.compile(JSON.stringify(input)))

        abi = JSON.stringify(output.contracts[contractFile][contractName].abi)

        bytecode = output.contracts[contractFile][contractName].evm.bytecode.object

      } catch (e) {
        abi = ''
        bytecode = ''
        console.log('Solidity compiler error: ', e)
        this.progressText = this.$t('合约编译错误：', e)
      }

      return { abi, bytecode }
    },

    handleReDeploy () {
      localStorage.removeItem('tokenDIY')
      this.$emit('step', -2)
    }
  }
}
</script>

<style lang="scss" scoped>
.verify-params {
  .param-list {
    margin: 0;
    padding: 0;
    list-style: none;

    .item {
      display: flex;
      line-height: 40px;
      .name {
        flex: 1;
        text-align: right;
        font-weight: bold;
      }
      .value {
        flex: 1;
        margin-left: 10px;
        text-align: left;
      }
    }
  }
  .deploy-progress {
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  .success-list {
    margin: 0;
    padding: 0;
    list-style: none;

    .item {
      display: flex;
      line-height: 40px;

      .name {
        font-weight: bold;
      }

      .value {
        margin-left: 10px;
        text-align: left;
      }
    }
  }
  .align-justify {
    display: inline-block;
    width: 80px;
    text-align-last: justify;
  }
}
</style>
