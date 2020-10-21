<template>
  <div class="verify-params card-view">
    <div class="im-card card-main">
      <div class="card-header">
        <span class="card-title">{{ $t('确认发行参数') }}</span>
      </div>
      <div class="card-body">
        <ul class="param-list">
          <li class="param-item">
            <span class="name">{{ $t('代币类型') }}: </span>
            <span class="value">{{ form.tokenType }}</span>
          </li>
          <li class="param-item">
            <span class="name">{{ $t('代币名称') }}: </span>
            <span class="value">{{ form.tokenName }}</span>
          </li>
          <li class="param-item">
            <span class="name">{{ $t('代币符号') }}: </span>
            <span class="value">{{ form.tokenSymbol }}</span>
          </li>
          <li class="param-item">
            <span class="name">{{ $t('小数位数') }}: </span>
            <span class="value">{{ form.decimals }}</span>
          </li>
          <li class="param-item">
            <span class="name">{{ $t('总发行量') }}: </span>
            <span class="value">{{ form.totalSupply }}</span>
          </li>
          <li class="param-item">
            <span class="name">{{ $t('代币所有者账号') }}: </span>
            <span class="value">{{ form.tokenAccount }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="card-footer space-between">
      <el-button class="im-button largest" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button largest" :loading="loading" :disabled="disable" type="primary" @click="handleSubmit">{{ $t('base.submit') }}</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "verify-params",
  data () {
    return {
      form: {},
      loading: false,
      disable: false,
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let tokenDIY = JSON.parse(localStorage.getItem('tokenDIY')) || {}

      this.form = {
        tokenType: tokenDIY.tokenType || '--',
        tokenName : tokenDIY.tokenName || '--',     //token名称
        tokenSymbol : tokenDIY.tokenSymbol || '--',
        decimals : tokenDIY.decimals || '--',           //发行token的精度
        totalSupply : tokenDIY.totalSupply || '--',   //Token发行总量
        tokenAccount: tokenDIY.tokenAccount || '--', // 代币所有者
      }
    },
    handleCancel () {
      this.$emit('step', -1)
    },
    handleSubmit () {
      const abi = ''
      const bytecode = ''

      // https://cn.developers.tron.network/reference#createsmartcontract-1
      const options = {
        feeLimit: 1000000000, //能够燃烧的trx的阀值，最大1000000000sun（1TRX = 1,000,000SUN）
        callValue: 0,         //本次调用往合约转账的trx（1TRX = 1,000,000SUN）
        tokenId:"",           //本次调用往合约中转账10币的id，如果没有，不需要设置
        tokenValue:0,         //本次调用往合约中转账10币的数量，如果不设置token_id，这项设置为0或者不设置
        userFeePercentage: 10,//指定的使用该合约用户的资源占比，是[0, 100]之间的整数。如果是0，则表示用户不会消耗资源。如果开发者资源消耗完了，才会完全使用用户的资源。
        originEnergyLimit: 10,//创建者设置的，在一次合约执行或创建过程中创建者自己消耗的最大的energy，是大于0的整数
        abi,                  //Abi 字符串格式
        bytecode,             //bytecode，需要是hexString格式
        parameter: "",        //构造函数的参数列表，需要按照ABI encoder编码后转话为hexString格式。如果构造函数没有参数，该参数可以不用设置。
        name:"Foo",           //合约名
        permissionId:1        //可选参数，多重签名时使用
      }

      const issuerAddress = ''

      window.tronWeb.transactionBuilder.createSmartContract(issuerAddress, options)
        .then(result=> {
          console.log(result)
        })
        .catch(error => {
          this.$notify({
            type: 'error',
            title: this.$t('base.error'),
            message: error
          })
        })
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

    .param-item {
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
