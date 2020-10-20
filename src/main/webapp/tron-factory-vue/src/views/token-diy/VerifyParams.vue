<template>
  <div class="verify-params card-view">
    <div class="im-card card-main">
      <div class="card-header">
        <span class="card-title">确认发行参数</span>
      </div>
      <div class="card-body">

<!--        确认发行参数-->
<!--        批准发行-->
<!--        发币成功-->

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
      window.tronWeb.transactionBuilder.createToken({
        name : this.form.tokenName,//token名称,string格式
        abbreviation : this.form.tokenSymbol,//token简称,  string格式
        totalSupply : this.form.totalSupply,//Token发行总量
        precision : this.form.decimals,//发行token的精度

        description : "token-diy 一键发币",//Token 说明,  string格式
        url : "www.baidu.com",//Token 发行方的官网，string格式
        trxRatio : 1, // 定义token和trx的最小单位兑换比
        tokenRatio : 1, // 定义token和trx的最小单位兑换比
        saleStart : 1613176665206,//开启时间
        saleEnd : 1681047110000,//结束时间
        freeBandwidth : 0, // 是Token的总的免费带宽
        freeBandwidthLimit : 0, // 是每个token拥护者能使用本token的免费带宽
        frozenAmount : 0, //是token发行者可以在发行的时候指定冻结的token的数量
        frozenDuration : 0,
        // 是token发行者可以在发行的时候指定冻结的token的时间
        permission_id : 1//可选用于多重签名
      }, this.form.tokenAccount)

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
