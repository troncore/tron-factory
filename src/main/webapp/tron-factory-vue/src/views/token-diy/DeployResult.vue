<template>
  <div class="deploy-result card-view">
    <div class="im-card card-main">
      <div class="card-header">
        <span class="card-title">{{ $t('发行成功') }}</span>
      </div>
      <div class="card-body">
        <ul class="success-list" >
          <li class="item">
            <span class="name">{{ $t('合约名称') }}: </span>
            <span class="value">{{ contract.name }}</span>
          </li>
          <li class="item">
            <span class="name">{{ $t('合约地址') }}: </span>
            <span class="value">{{ contract.id }}</span>
          </li>
          <li class="item">
            <span class="name">{{ $t('交易哈希值') }}: </span>
            <span class="value">{{ contract.address }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="card-footer center">
      <el-button class="im-button largest" type="primary" @click="handleReDeploy"><i class="el-icon-coin"></i> {{ $t('继续发行') }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "deploy-result",
  data () {
    return {
      form: {},
      deploySuccess: false,
      contract: {
        id: '',
        name: '',
        address: '',
      },
      signed: '',
      loading: false,
      disable: false,
      timeId: null,
    }
  },
  created () {
    this.init()
  },
  destroyed () {
    clearInterval(this.timeId)
  },
  methods: {
    init () {
      let tokenDIY = JSON.parse(localStorage.getItem('tokenDIY')) || {}

      // 已经有合约了
      if (tokenDIY.contract?.id) {
        this.deploySuccess = true
        this.contract = tokenDIY.contract
      } else {
        this.$emit('step', -3)
      }
    },
    handleCancel () {
      this.$emit('step', -1)
    },
    async handleSubmit () {
      this.loading = true

      const { abi, bytecode } = this.compile()

      const options = {
        name: this.form.tokenName, //合约名
        abi: abi,
        bytecode: '0x' + bytecode,

        feeLimit: 1000000000, //能够燃烧的trx的阀值，最大1000000000sun（1TRX = 1,000,000SUN）
        parameters: [this.form.totalSupply, this.form.tokenName, this.form.tokenSymbol], // 合约的构造函数的参数列表
        userFeePercentage: 10,  //指定的使用该合约用户的资源占比
        originEnergyLimit: 10000000, //创建者设置的，在一次合约执行或创建过程中创建者自己消耗的最大的energy，是大于0的整数
      }

      try{
        // 创建合约
        const unsigned = await window.tronWeb.transactionBuilder.createSmartContract(options, this.form.tokenAccount)
        // 签名
        const signed = await window.tronWeb.trx.sign(unsigned)
        // 广播交易
        const broadcastResult = await window.tronWeb.trx.sendRawTransaction(signed)
        // console.log('broadcastResult: ', broadcastResult)

        // 查询交易
        if (broadcastResult.result) {
          this.timeId = setInterval(() => this.checkDeploy(signed.txID), 3000)
        } else {
          throw new Error(window.tronWeb.toAscii(broadcastResult.message))
        }

      } catch (error) {
        this.$notify({
          type: 'error',
          title: this.$t('base.error'),
          message: error
        })
        this.loading = false
      }

    },

    // 验证发行结果
    async checkDeploy (txID) {
      const transactionInfo = await window.tronWeb.trx.getTransactionInfo(txID)
      console.log('transactionInfo: ', transactionInfo)

      if (!transactionInfo) {
        clearInterval(this.timeId)
        throw new Error('Not getting transaction info!')
      }
      else if (transactionInfo.id && transactionInfo.receipt?.result === 'SUCCESS') {
        clearInterval(this.timeId)
        this.loading = false
        this.$notify.success({
          title: this.$t('base.successful'),
          message: this.$t('Successful deployed contract!')
        })


        this.deploySuccess = true
        this.contract = {
          id: transactionInfo.id,
          name: this.form.tokenName,
          address: window.tronWeb.address.fromHex(transactionInfo.contract_address)
        }

        // 存储
        let tokenDIY = JSON.parse(localStorage.getItem('tokenDIY')) || {}
        tokenDIY.contract = this.contract
        localStorage.setItem('tokenDIY', JSON.stringify(tokenDIY))
      }
    },

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
  .param-list, .success-list {
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
}
</style>
