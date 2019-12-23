<template>
  <div class="crypto-module">

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

        <el-form-item prop="crypto">
          <el-radio-group v-model="form.crypto">
            <el-radio :label="'eckey'">eckey</el-radio>
            <el-radio :label="'sm2'">sm2</el-radio>
          </el-radio-group>
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
          this.$_api.pluginApi.cryptoApi(params, (err, res) => {
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
  padding-right: 80px;

  .form-box {
    padding: 20px 0 0 20px;
  }

  .box-footer {
    &.align-right {
      margin-top: 40px;
      text-align: right;
    }
  }
}
</style>
