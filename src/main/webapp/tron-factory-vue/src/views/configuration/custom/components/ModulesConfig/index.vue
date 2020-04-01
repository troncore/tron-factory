<template>
  <div class="box-view import-plugin">

    <div class="box-card">
      <div class="card-header">{{ $t('configuration.consensusModule') }}</div>
      <div class="consensus-list">
        <el-select v-model="consensus" placeholder="请选择">
          <el-option label="DPoS" value="dpos"></el-option>
          <el-option :label="`PBFT(${$t('configuration.tempNotSupport')})`" value="pbft" disabled></el-option>
        </el-select>
      </div>
    </div>

    <div class="box-card">
      <div class="card-header">{{ $t('configuration.transactionModule') }}</div>
      <el-form ref="form-box" :rules="formRules" :model="form" label-position="top">

        <el-form-item class="transaction-list" prop="transaction">
          <el-checkbox-group v-model="form.transaction">
            <el-checkbox :label="item.value" :key="ind" v-for="(item, ind) in transactionList">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <div class="more-setting">
          <el-checkbox v-model="checkCustomTransaction" @change="handleChangeCheckCustom">{{ $t('configuration.customTransactionModule') }}</el-checkbox>
        </div>
        <el-form-item
          ref="custom-transaction"
          class="custom-transaction"
          prop="customTransaction">
          <el-input
            v-model.trim="form.customTransaction"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            :maxlength="300"
            :disabled="!checkCustomTransaction"
            :placeholder="$t(checkCustomTransaction ? 'configuration.valid.inputCustomTransaction': 'configuration.valid.checkCustomTransaction')">
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="box-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button large" :loading="loading" :disabled="configLoading" type="primary" @click="handleSubmit">{{ $t('base.complete') }}</el-button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: 'import-plugin',
  data() {
    return {
      form: {
        transaction: [],
        customTransaction: '',
      },
      consensus: [],
      checkCustomTransaction: false,
      transactionList: require('./transactionModuleList.json') || [],
      loading: false,
      configLoading: false,
    }
  },
  computed: {
    formRules() {
      const pathEndJAR = (rule, value, callback) => {
        if (this.checkCustomTransaction && !this.form.customTransaction.endsWith('.jar')) {
          callback(new Error(this.$t('configuration.valid.pathEndJAR')))
        } else {
          callback()
        }
      }
      return {
        customTransaction: [
          { required: this.checkCustomTransaction, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: pathEndJAR, trigger: 'blur', },
        ]
      }
    },
  },
  created() {
    this.initPluginInfo()
  },

  methods: {
    ...mapMutations('app', {
      updateMenuList: 'updateMenuList',
    }),

    // get plugin info
    initPluginInfo () {
      return new Promise(resolve => {
        this.configLoading = true
        this.$_api.configuration.getPluginConfig({}, (err, res = {}) => {
          this.configLoading = false
          if (err) return

          this.consensus = res.consensus
          this.form.customTransaction = res.customTransaction || ''
          this.checkCustomTransaction = !!this.form.customTransaction
          this.form.transaction = res.transaction || []
        })
      })
    },

    handleChangeCheckCustom (val) {
      if (val) {
        setTimeout(this.$refs['custom-transaction'].clearValidate, 0)
      }
    },

    handleSubmit() {
      this.$refs['form-box'].validate(valid => {
        if (valid) {
          let params = {
            transaction: this.form.transaction,
            customTransaction: this.checkCustomTransaction ? this.form.customTransaction : '',
            configStatus: 0,
          }

          this.loading = true
          this.$_api.configuration.setTransactionModule(params, (err, res) => {
            this.loading = false
            if (err) return

            this.$notify({
              type: 'success',
              title: this.$t('base.successful'),
              message: this.$t('base.success.operate')
            })

            this.$router.push({
              path: '/nodes-manage'
            })
          })
        }
      })
    },
    handleCancel() {
      this.$emit('prev-step')
    },
  },
}
</script>
<style lang="scss" scoped>
.import-plugin {
  .box-card {
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
    }
    .card-header {
      margin-bottom: 20px;
      font-size: 16px;
      color: font-color();
    }
  }

  .transaction-list {
    display: block;
    width: 100%;
    margin-bottom: 0;

    .el-checkbox {
      display: inline-flex;
      align-items: center;
      min-width: 200px;
      margin-right: 100px;
      margin-bottom: 14px;
    }
  }


  /deep/ .el-form-item {
    .el-form-item__label {
      padding: 0;
      font-size: 16px;
      color: font-color();
    }
  }

  /deep/ .more-setting {
    margin: 10px 0;

    .el-checkbox__label {
      font-size: 14px;
      color: font-color();
    }
  }

  .custom-transaction {
    width: 50%;
  }

}

</style>
