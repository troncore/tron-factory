<template>
  <div class="page-view import-plugin">
    <div class="box-view">
      <div class="page-body">

        <div class="box-card">
          <div class="card-header">{{ $t('importPlugin.consensusModule') }}</div>
          <div class="consensus-list">
            <span class="consensus-item">DPoS</span>
          </div>
        </div>

        <div class="box-card">
          <div class="card-header">{{ $t('importPlugin.transactionModule') }}</div>
          <el-form ref="form-box" :rules="formRules" :model="form" label-position="top">

            <el-form-item class="transaction-list" prop="transaction">
              <el-checkbox-group v-model="form.transaction">
                <el-checkbox :label="item.value" :key="ind" v-for="(item, ind) in transactionList">{{ item.label }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <div class="more-setting">
              <el-checkbox v-model="checkCustomTransaction" @change="handleChangeCheckCustom">{{ $t('importPlugin.customTransactionModule') }}</el-checkbox>
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
                :placeholder="$t(checkCustomTransaction ? 'importPlugin.valid.inputCustomTransaction': 'importPlugin.valid.checkCustomTransaction')">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div class="page-footer align-right">
        <el-button class="im-button large" :loading="loading" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
      </div>
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
      consensus: '',
      checkCustomTransaction: false,
      transactionList: require('./transactionModuleList.json') || [],
      loading: false,
    }
  },
  computed: {
    formRules() {
      const pathEndJAR = (rule, value, callback) => {
        if (this.checkCustomTransaction && !this.form.customTransaction.endsWith('.jar')) {
          callback(new Error(this.$t('importPlugin.valid.pathEndJAR')))
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
        this.$_api.importPlugin.pluginConfigApi({}, (err, res = {}) => {
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
          // if (this.form.customTransaction) {
          //   this.$message.warning(this.$t('importPlugin.valid.checkCustomTransaction'),)
          //   return
          // }

          let params = {
            transaction: this.form.transaction,
            customTransaction: this.checkCustomTransaction ? this.form.customTransaction : ''
          }

          this.loading = true
          this.$_api.importPlugin.transactionApi(params, (err, res) => {
            this.loading = false
            if (err) return

            this.$message.success(this.$t('base.success.save'))

            this.updateMenuList({ activeName: 'deploy-nodes' })

            this.$router.push({ path: "/deploy-nodes" })
          })
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/base.scss";

.import-plugin {
  .box-card {
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
    }
    .card-header {
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: bold;
      color: #081C56;
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

  /deep/ .more-setting {
    margin: 20px 0 10px;

    .el-checkbox__label {
      font-size: 16px;
      color: rgba(8, 28, 86, .7);
    }
  }

  .custom-transaction {
    width: 50%;
  }

  /deep/ .el-form-item {
    .el-form-item__label {
      padding: 0;
      font-size: 16px;
      color: rgba(8, 28, 86, .7);
    }
  }
  .box-footer {
    margin-top: 40px;
  }
}

</style>
