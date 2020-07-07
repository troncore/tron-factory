<template>
  <div class="box-view import-plugin">
    <div class="box-card">
      <el-form ref="form-box" :rules="formRules" :model="form" label-position="top">
        <div class="more-setting">
          <el-checkbox v-model="checkCustomTransaction" @change="handleChangeCheckCustom">{{ $t('configuration.customTransactionModule') }}</el-checkbox>
        </div>
        <el-form-item
          ref="custom-transaction"
          class="custom-transaction margin-bottom-0"
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

    <div class="box-footer">
      <el-button class="im-button large" :loading="loading" :disabled="disabled" type="primary" @click="handleSubmit">{{ $t('base.complete') }}</el-button>
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'import-plugin',
    data() {
      return {
        form: {
          id: '',
          customTransaction: '',
        },
        checkCustomTransaction: false,
        loading: false,
        disabled: true,
      }
    },
    computed: {
      opNodeId () {
        let id = this.$route.query.id
        return /\d+/.test(id) ? Number(id) : undefined
      },
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
    created () {
      this.getConfig()
    },
    methods: {
      getConfig () {
        if (!this.validNode()) return

        this.disabled = true
        this.$_api.getStarted.getPluginConfig({ id: this.opNodeId }, (err, res = {}) => {
          if (err) return
          this.disabled = false

          this.initForm(res)
        })
      },

      initForm(data) {
        this.form = {
          id: this.opNodeId,
          customTransaction: data.customTransaction,
        }
        this.checkCustomTransaction = !!this.form.customTransaction
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
              id: this.opNodeId,
              customTransaction: this.checkCustomTransaction ? this.form.customTransaction : '',
              configStatus: 1,
            }

            this.loading = true
            this.$_api.getStarted.setPluginConfig(params, (err, res) => {
              this.loading = false
              if (err) return

              this.$notify.success({
                title: this.$t('base.successful'),
                message: this.$t('base.success.operate')
              })

              this.$router.push('/get-started/dashboard')
            })
          }
        })
      },
      validNode () {
        // edit node
        if (!/\d+/.test(this.opNodeId)) {
          this.$notify.warning({
            title: this.$t('base.warning'),
            message: this.$t('当前所编辑的节点为无效节点!'),
          })
          return false
        }
        return true
      },

      handleCancel() {
        this.$emit('prev-step')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .import-plugin {
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
