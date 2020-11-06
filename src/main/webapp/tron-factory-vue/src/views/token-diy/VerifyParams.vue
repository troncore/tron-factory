<template>
  <div class="verify-params card-view">
    <div class="im-card card-main">
      <div class="card-header">
        <span class="card-title">{{ $t(deploySuccess ? '发行成功' : '确认发行参数') }}</span>
      </div>
      <div class="card-body">
        <ul class="param-list" v-if="!deploySuccess">
          <li class="item">
            <span class="name">{{ $t('代币类型') }}: </span>
            <span class="value">{{ form.tokenType }}</span>
          </li>
          <li class="item">
            <span class="name">{{ $t('代币名称') }}: </span>
            <span class="value">{{ form.tokenName }}</span>
          </li>
          <li class="item">
            <span class="name">{{ $t('代币符号') }}: </span>
            <span class="value">{{ form.tokenSymbol }}</span>
          </li>
          <li class="item">
            <span class="name">{{ $t('小数位数') }}: </span>
            <span class="value">{{ form.decimals }}</span>
          </li>
          <li class="item">
            <span class="name">{{ $t('总发行量') }}: </span>
            <span class="value">{{ form.totalSupply }}</span>
          </li>
          <li class="item">
            <span class="name">{{ $t('代币所有者账号') }}: </span>
            <span class="value">{{ form.tokenAccount }}</span>
          </li>
        </ul>
        <ul class="success-list" v-else>
          <li class="item">
            <span class="name">{{ $t('合约名称') }}: </span>
            <span class="value">{{ contract.name }}</span>
          </li>
          <li class="item">
            <span class="name">{{ $t('合约创建者') }}: </span>
            <el-link class="value" type="danger" target="_blank" :underline="false" :href="`https://${chain}tronscan.org/#/address/${contract.account}`">{{ contract.account }}</el-link>
          </li>
          <li class="item">
            <span class="name">{{ $t('合约地址') }}: </span>
            <el-link class="value" type="danger" target="_blank" :underline="false" :href="`https://${chain}tronscan.org/#/contract/${contract.address}/code`">{{ contract.address }}</el-link>
          </li>
          <li class="item">
            <span class="name">{{ $t('交易哈希值') }}: </span>
            <el-link class="value" type="danger" target="_blank" :underline="false" :href="`https://${chain}tronscan.org/#/transaction/${contract.id}`">{{ contract.id }}</el-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="card-footer space-between" v-if="!deploySuccess">
      <el-button class="im-button largest" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button largest" :loading="loading" :disabled="disable" type="primary" @click="handleSubmit">{{ $t('base.submit') }}</el-button>
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
    handleCancel () {
      this.$emit('step', -1)
    },
    handleSubmit () {
      this.loading = true

      // 在下一个宏任务中编译部署，避免编译过久，卡住主线程
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
          console.log('unsigned:',unsigned)
          // 签名
          const signed = await window.tronWeb.trx.sign(unsigned)
          console.log('sign:',signed)
          // 广播交易
          const broadcastResult = await window.tronWeb.trx.sendRawTransaction(signed)
          // console.log('broadcastResult: ', broadcastResult)

          // 查询交易
          if (broadcastResult.result) {
            this.$notify.success({
              title: this.$t('base.successful'),
              message: this.$t('广播交易成功!')
            })

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

      }, 0)

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
  .success-list {
    margin: 0;
    padding: 0;
    list-style: none;

    .item {
      display: flex;
      line-height: 40px;

      .name {
        width: 120px;
        text-align: right;
        font-weight: bold;
      }

      .value {
        margin-left: 10px;
        text-align: left;
      }
    }
  }
}
</style>
