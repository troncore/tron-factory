<template>
  <div class="box-view cross-chain-config">
    <div class="box-body">
      <el-form class="im-form" ref="cross-chain-config-form" :model="form" :rules="crossChainRules" label-position="top">
        <el-form-item label="enableCrossChain" prop="enableCrossChain" class="baseFormItem mgt20">
          <el-switch disabled  v-model="form.enableCrossChain"></el-switch>
        </el-form-item>

        <br/>

        <el-form-item label="maxValidatorNumber" prop="maxValidatorNumber" class="baseFormItem">
          <el-input v-model.trim="form.maxValidatorNumber" :maxlength="50" :placeholder="$t('tronMaxValidatorNumberPlaceholder')" disabled></el-input>
        </el-form-item>

        <el-form-item label="minValidatorNumber" prop="minValidatorNumber" class="baseFormItem">
          <el-input v-model.trim="form.minValidatorNumber" :maxlength="50" :placeholder="$t('tronMinValidatorNumberPlaceholder')" disabled></el-input>
        </el-form-item>

        <el-form-item label="crossChainFee" prop="crossChainFee" class="baseFormItem">
          <el-input-number
            v-model.trim="form.crossChainFee"
            :min="0"
            :step="0.01"
            :maxlength="50"
            controls-position="right"
            :placeholder="$t('tronSettingPlaceholder')"
            disabled>
          </el-input-number>
        </el-form-item>
      </el-form>

    </div>

    <div class="box-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button large" :loading="loading" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cross-chain-config',
  props: {
    configInfo: {
      type: Object,
      required: true,
    },
    initConfigInfo: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
      form: {},
      loading: false,
    }
  },

  computed: {
    crossChainRules() {
      /* number Positive integer */
      function isvalidateNum(str) {
        const reg = /^[0-9]*[1-9][0-9]*$/
        return reg.test(str)
      }

      /* twoDecimal */
      function twoDecimal(str) {
        const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
        return reg.test(str)
      }

      const validNum = (rule, value, callback) => {
        if (!isvalidateNum(value)) {
          callback(new Error(this.$t('tronSettingNumberPlaceholder')))
        } else {
          callback()
        }
      }
      const validMaxNumRange = (rule, value, callback) => {
        if (value > 2147483647) {
          callback(new Error(this.$t('tronNumberPlaceholder')))
        } else {
          callback()
        }
      }
      const validMaxNum = (rule, value, callback) => {
        if (
          this.form.minValidatorNumber &&
          value < this.form.minValidatorNumber
        ) {
          callback(new Error(this.$t('tronSettingMaxNumberPlaceholder')))
        } else {
          callback()
        }
      }
      const validMinNum = (rule, value, callback) => {
        if (
          this.form.maxValidatorNumber &&
          value > this.form.maxValidatorNumber
        ) {
          callback(new Error(this.$t('tronSettingMinNumberPlaceholder')))
        } else {
          callback()
        }
      }
      const validTwoDecimalFun = (rule, value, callback) => {
        if (!twoDecimal(value)) {
          callback(new Error(this.$t('validTwoDecimal')))
        } else {
          callback()
        }
      }
      const rules = {
        enableCrossChain: [
          {
            required: true,
            message: this.$t('tronSettingPlaceholder'),
            trigger: 'change',
          },
        ],
        maxValidatorNumber: [
          {
            required: true,
            message: this.$t('tronMaxValidatorNumberPlaceholder'),
            trigger: 'change',
          },
          {
            message: this.$t('tronSettingNumberPlaceholder'),
            validator: validNum,
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingMaxNumberPlaceholder'),
            validator: validMaxNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validMaxNumRange,
            trigger: 'blur',
          },
        ],
        minValidatorNumber: [
          {
            required: true,
            message: this.$t('tronMinValidatorNumberPlaceholder'),
            trigger: 'change',
          },
          {
            message: this.$t('tronSettingNumberPlaceholder'),
            validator: validNum,
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingMinNumberPlaceholder'),
            validator: validMinNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validMaxNumRange,
            trigger: 'blur',
          },
        ],
        crossChainFee: [
          {
            required: true,
            message: this.$t('tronSettingPlaceholder'),
            trigger: 'change',
          },
          {
            message: this.$t('tronSettingNumberTwoDecimal'),
            validator: validTwoDecimalFun,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validMaxNumRange,
            trigger: 'blur',
          },
        ],
      }
      return rules
    },
  },

  watch: {
    configInfo: {
      handler (val = {}) {
        this.form = { ...val.crossChainConfig }
      },
      immediate: true,
    },
  },

  methods: {
    handleSubmit() {
      this.$refs['cross-chain-config-form'].validate(valid => {
        if (valid) {
          let params = { ...this.form }

          this.loading = true
          this.$_api.configuration.crossChainConfig(params, err => {
            this.loading = false
            if (err) return

            this.$message.success(this.$t('tronSettingp2pSaveSuccess'))
            this.$emit('next-step')
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
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
