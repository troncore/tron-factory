<template>
  <div class="box-view transaction-module">
    <el-card>

      <div class="box-header title">{{ $t('tronPluginTransactionModule') }}</div>

      <div class="box-body">

        <el-form ref="form-box" :model="form" :rules="formRules" label-position="top">
          <el-form-item class="transaction-list" prop="transaction">
            <el-checkbox-group v-model="form.transaction">
              <el-checkbox :label="item.value" :key="ind" v-for="(item, ind) in transactionList">{{ item.label }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <div class="more-form">
            <el-button type="text">{{ $t('tronMoreSetting') }}</el-button>
          </div>

          <el-form-item class="custom-transaction" props="customTransaction">
            <el-checkbox style="margin:0" :label="9">{{ $t('tronPluginCustomTradingModule') }}</el-checkbox>
            <el-input
              v-model.trim="form.customTransaction"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6 }"
              :maxlength="300"
              :placeholder="$t('tronPluginCustomTradingModulePlaceholder')">
            </el-input>
          </el-form-item>
        </el-form>

      </div>
    </el-card>


    <div class="box-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button large" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'transaction-module',
    props: {
      pluginInfo: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        form: {
          transaction: [],
          customTransaction: '',
        },
        formRules: {
          transaction: [{ required: true, message: this.$t('tronSettingPlaceholder'), trigger: 'blur', },],
        },
        contentShow: true,
        transactionList: require('./transactionModuleList.json') || [],
        moreSetting: false,

        loading: false,

      }
    },

    watch: {
      pluginInfo: {
        handler (val = {}) {
          this.form.customTransaction = val.customTransaction || ''
          this.form.transaction = val.transaction

          if (this.form.customTransaction) this.form.transaction.push(9)
        },
        immediate: true,
      },
    },

    methods: {
      handleCancel () {
        this.$emit('prev-step')
      },

      handleSubmit() {
        this.$refs['form-box'].validate(valid => {
          if (valid) {
            let checkStatus = 0

            if (this.form.customTransaction) {
              this.form.transaction.forEach(item => {
                if (item === 9) {
                  if ( this.form.customTransaction.length > 4 && this.form.customTransaction.endsWith('.jar')) checkStatus = 1
                  else checkStatus = 2
                }
                else checkStatus = 3
              })
            } else {
              if (this.form.transaction.indexOf(9) > 0) {
                checkStatus = 4
                this.$message.warning(this.$t('tronPluginCustomTradingModulePlaceholder'),)
              }
            }

            if (checkStatus === 1) {
              this.form.transaction.forEach((item, ind) => {
                if (item === 9)this.form.transaction.splice(ind, 1)
                else checkStatus = 3
              })
            } else if (checkStatus === 2) {
              this.$message({
                type: 'warning',
                message: this.$t('tronPluginDeploymentCorrectPathPlaceholder'),
              })
              return
            } else if (checkStatus === 3) {
              this.$message({
                type: 'warning',
                message: this.$t('tronPluginDeploymentCheckPathPlaceholder'),
              })
              return
            } else if (checkStatus === 4) {
              return
            }


            let params = {
              transaction: this.form.transaction,
              customTransaction: this.form.customTransaction
            }

            this.loading = true
            this.$_api.importPlugin.transactionApi(params, (err, res) => {
              this.loading = false
              if (err) return

              this.$message.success(this.$t('tronPluginInputSaveSuccess'))
              this.$emit('next-step')
            })
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
.transaction-module {
  /deep/ .el-card {
    .el-card__body {
      padding: 30px;
    }
  }

  .box-header {
    margin-bottom: 30px;
    &.title {
      font-size: 20px;
      font-weight: bold;
      color: #081C56;
    }
  }

  .more-form {
    margin-top: 20px;
    .el-button {
      font-size: 18px;
      font-weight: bold;
    }
  }

  /deep/ .el-form-item {
    display: inline-block;
    margin-right: 150px;
    width: 350px;

    .el-form-item__label {
      padding: 0;
      font-size: 16px;
      color: rgba(8, 28, 86, .7);
    }

    &.transaction-list {
      display: block;
      width: 100%;

      .el-checkbox {
        display: inline-flex;
        align-items: center;
        min-width: 199px;
        margin-right: 150px;
        margin-bottom: 30px;
      }
    }

    &.custom-transaction {
      width: 50%;
      .el-checkbox__label {
        font-size: 16px;
        color: rgba(8, 28, 86, .7);
      }
    }

  }

  .box-footer {
    margin-top: 40px;
    &.align-right {
      text-align: right;
    }
  }
}
</style>
