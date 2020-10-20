<template>
  <div class="token-params card-view">
    <div class="im-card card-main">
      <div class="card-header">
        <span class="card-title">代币发行参数</span>
      </div>
      <div class="card-body">
        <el-form class="im-form" ref="im-form" :rules="formRules" :model="form" label-position="top">
          <el-form-item prop="tokenName">
            <span slot="label">{{ $t('代币名称') }}</span>
            <div class="item-inner">
              <el-input v-model.trim="form.tokenName" size="large" maxlength="25" clearable />
              <span class="help-info">{{ $t('代币的名称，3 ~ 25个英文字符') }}</span>
            </div>
          </el-form-item>

          <el-form-item prop="tokenSymbol">
            <span slot="label">{{ $t('代币符号') }}</span>
            <div class="item-inner">
              <el-input v-model.trim="form.tokenSymbol" size="large" maxlength="4" clearable />
              <span class="help-info">{{ $t('3 ~ 4英文字符，例如ETH, BTC, BAT 等，不可包含空格') }}</span>
            </div>
          </el-form-item>

          <el-form-item prop="decimals">
            <span slot="label">{{ $t('小数位数') }}</span>
            <div class="item-inner">
              <el-input v-model.trim="form.decimals" size="large" maxlength="2" clearable />
              <span class="help-info">{{ $t('代币的小数位数，0 ~ 18位，大多数代币选择18位小数') }}</span>
            </div>
          </el-form-item>

          <el-form-item prop="totalSupply" class="margin-bottom-0">
            <span slot="label">{{ $t('总发行量') }}</span>
            <div class="item-inner">
              <el-input v-model.trim="form.totalSupply" size="large" clearable />
              <span class="help-info">{{ $t('要发行的代币总量，最小1，最大1000000000000000') }}</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="card-footer center">
      <el-button class="im-button largest" :loading="loading" :disabled="disable" type="primary" @click="handleSubmit">
        <i class="el-icon-coin"></i>
        {{ $t('tokenDIY.releaseToken') }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "token-params",
  data () {
    return {
      form: {
        tokenName : '',     //token名称
        tokenSymbol : '',
        decimals : '18',           //发行token的精度
        totalSupply : '',   //Token发行总量
        tokenType: 'trc20',
        tokenAccount: '', // 代币所有者
      },
      loading: false,
      disable: false,
    }
  },
  computed: {
    formRules() {
      const validTokenName = (rule, value, callback) => {
        if (/^[a-zA-Z]{3,25}$/.test(value)) {
          callback()
        } else {
          callback(new Error(' '))
        }
      }

      const validTokenSymbol = (rule, value, callback) => {
        if (/^[a-zA-Z]{3,4}$/.test(value)) {
          callback()
        } else {
          callback(new Error(' '))
        }
      }

      const validDecimals = (rule, value, callback) => {
        if (/^\d+$/.test(value) && value >= 0 && value <= 18) {
          callback()
        } else {
          callback(new Error(' '))
        }
      }

      const validTotalSupply = (rule, value, callback) => {
        if (/^\d+$/.test(value) && value >= 1 && value <= 1000000000000000) {
          callback()
        } else {
          callback(new Error(' '))
        }
      }

      return {
        tokenName: [
          { required: true, message: ' ', trigger: 'change', },
          { validator: validTokenName, trigger: 'change', },
        ],
        tokenSymbol: [
          { required: true, message: ' ', trigger: 'change', },
          { validator: validTokenSymbol, trigger: 'change', },
        ],
        decimals: [
          { required: true, message: ' ', trigger: 'change', },
          { validator: validDecimals, trigger: 'change', },
        ],
        totalSupply: [
          { required: true, message: ' ', trigger: 'change', },
          { validator: validTotalSupply, trigger: 'change', },
        ],
      }
    },
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let tokenDIY = JSON.parse(localStorage.getItem('tokenDIY')) || {}

      this.form = {
        tokenName : tokenDIY.tokenName ?? this.form.tokenName,     //token名称
        tokenSymbol : tokenDIY.tokenSymbol ?? this.form.tokenSymbol,
        decimals : tokenDIY.decimals ?? this.form.decimals,           //发行token的精度
        totalSupply : tokenDIY.totalSupply ?? this.form.totalSupply,   //Token发行总量
        tokenType: tokenDIY.tokenType ?? this.form.tokenType
      }
    },
    handleCancel () {

    },
    handleSubmit () {

      this.$refs['im-form'].validate(valid => {
        if (valid) {

          localStorage.setItem('tokenDIY', JSON.stringify(this.form))

          this.$emit('step', 1)
        }
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.im-form {

  .item-inner {
    display: flex;
    ::v-deep .el-input {
      width: 300px;
      .el-input__inner {
        height: 50px;
        line-height: 50px;
      }
    }
    .help-info {
      flex: 1;
      align-self: center;
      display: inline-block;
      margin-left: 50px;
      line-height: 20px;
      font-size: 14px;
      vertical-align: text-top;
    }
  }
}
</style>
