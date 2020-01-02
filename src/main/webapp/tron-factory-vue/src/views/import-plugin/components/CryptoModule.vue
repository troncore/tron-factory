<template>
  <div class="crypto-module">
    <el-card>
      <div class="box-header title">{{ $t('tronPluginCryptoModule') }}</div>

      <div class="box-body">
        <el-form ref="form-box" :model="form" :rules="formRules" label-position="top">

          <el-form-item prop="crypto">
            <el-radio-group v-model="form.crypto">
              <el-radio :label="'eckey'">eckey</el-radio>
              <el-radio :label="'sm2'">sm2</el-radio>
            </el-radio-group>
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
  name: 'crypto-module',
  props: {
    pluginInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        crypto: 'eckey',
      },
      contentShow: true,
      loading: false,

      formRules: {
        crypto: [{ required: true, message: this.$t('tronSettingPlaceholder'), trigger: 'blur', },],
      },
    }
  },

  watch: {
    pluginInfo: {
      handler (val = {}) {
        this.form.crypto = val.crypto || 'eckey'
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
          let params = {
            crypto: this.form.crypto
          }

          this.loading = true
          this.$_api.importPlugin.cryptoApi(params, (err, res) => {
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
.crypto-module {
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
  }

  .box-footer {
    margin-top: 40px;

    &.align-right {
      text-align: right;
    }
  }
}
</style>
