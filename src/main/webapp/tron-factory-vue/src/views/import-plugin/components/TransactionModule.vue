<template>
  <div class="box-view transaction-module">
    <div class="box-body">
      <div class="box-card">
        <div class="card-header">{{ $t('importPlugin.consensusModule') }}</div>
        <div class="consensus-list">
          <span class="consensus-item">DPoS</span>
        </div>
      </div>

      <div class="box-card">
        <div class="card-header">{{ $t('importPlugin.transactionModule') }}</div>

        <el-form ref="form-box" :model="form" :rules="formRules" label-position="top">
          <el-form-item class="transaction-list" prop="transaction">
            <el-checkbox-group v-model="form.transaction">
              <el-checkbox :label="item.value" :key="ind" v-for="(item, ind) in transactionList">{{ item.label }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item class="custom-transaction" props="customTransaction">
            <el-checkbox v-model="checkCustomTransaction">{{ $t('importPlugin.customTransactionModule') }}</el-checkbox>
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

    <div class="box-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button large" :loading="loading" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
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
        showMore: false,
        checkCustomTransaction: false,
        customTransactionIndex: -1, // if customTransaction exist, return its index
        formRules: {
          transaction: [{ required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },],
        },
        contentShow: true,
        transactionList: require('../transactionModuleList.json') || [],
        moreSetting: false,

        loading: false,

      }
    },

    watch: {
      pluginInfo: {
        handler (val = {}) {
          this.form.customTransaction = val.customTransaction || ''
          this.form.transaction = val.transaction

          if (this.form.customTransaction) this.checkCustomTransaction = true
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
            if (this.checkCustomTransaction) {
              if (!this.form.customTransaction.length) {
                this.$message.warning(this.$t('importPlugin.valid.customTransaction'),)
                return
              }
              else if (!this.form.customTransaction.endsWith('.jar')) {
                this.$message.warning(this.$t('importPlugin.valid.pathEndJAR'),)
                return
              }
            } else if (this.form.customTransaction) {
              this.$message.warning(this.$t('importPlugin.valid.checkCustomTransaction'),)
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

              this.$message.success(this.$t('importPlugin.transactionModuleSaveSuccess'))
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
  &.box-view {
    .box-body {
      width: 100%;

      .more-form {
        margin: 0;
      }
    }
  }

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

  .custom-transaction {
    width: 50%;
    margin: 0;

    .el-checkbox__label {
      font-size: 16px;
      color: rgba(8, 28, 86, .7);
    }
  }
}
</style>
