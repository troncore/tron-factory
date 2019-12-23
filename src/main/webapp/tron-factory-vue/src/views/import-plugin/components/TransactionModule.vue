<template>
  <div class="transaction-module box-view">

    <el-card class="box-body" shadow="hover">
      <div @click="contentShow = !contentShow">
        <i :class="contentShow? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
        {{ $t('tronPluginConsensusModule') }}
      </div>

      <el-form
        v-if="contentShow"
        ref="form-box"
        class="form-box"
        :model="form"
        :rules="formRules"
        label-position="left">

        <el-form-item prop="transaction">
          <el-checkbox-group v-model="form.transaction">

            <el-checkbox :label="item.value" :key="ind" v-for="(item, ind) in transactionList">{{ item.label }}</el-checkbox>
            <br />

            <el-button type="text" size="small" @click="moreSetting = !moreSetting">{{ $t('tronMoreSetting') }}</el-button>

            <div v-if="moreSetting">
              <el-checkbox style="margin:0" :label="9">{{ $t('tronPluginCustomTradingModule') }}</el-checkbox>
              <br />
              <el-input
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                class="custom-transaction-input"
                size="small"
                :maxlength="300"
                v-model.trim="form.customTransaction"
                :placeholder="$t('tronPluginCustomTradingModulePlaceholder')">
              </el-input>
            </div>

          </el-checkbox-group>
        </el-form-item>

      </el-form>
    </el-card>


    <div class="box-footer align-right">
      <el-button size="small" type="primary" @click="handleCancel">{{ $t('tronSettingPreviousStep') }}</el-button>
      <el-button size="small" type="primary" @click="handleSubmit">{{ $t('tronSettingNextStep') }}</el-button>
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
            this.$_api.pluginApi.transactionApi(params, (err, res) => {
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
  padding-right: 80px;

  .form-box  {
    padding: 20px 0 0 20px;
  }

  .box-footer {
    &.align-right {
      margin-top: 40px;
      text-align: right;
    }
  }

  .el-checkbox {
    min-width: 199px
  }

  .custom-transaction-input {
    width: 715px;
  }
}
</style>
