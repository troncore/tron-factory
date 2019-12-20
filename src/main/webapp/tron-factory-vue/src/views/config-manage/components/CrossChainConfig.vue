<template>
  <div class="cross-chain-config">
    <el-card class="box-body" shadow="hover">

      <el-form ref="cross-chain-config-form" :model="form" :rules="crossChainRules" label-width="200px" label-position="left">
        <div @click="showContent = !showContent">
          <i :class="showContent ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          {{ $t('tronCrossChain') }}
        </div>

        <template v-if="showContent">
          <el-form-item label="enableCrossChain" prop="enableCrossChain" class="baseFormItem mgt20">
            <el-switch disabled size="small" v-model="form.enableCrossChain"></el-switch>
          </el-form-item>

          <el-form-item label="maxValidatorNumber" prop="maxValidatorNumber" class="baseFormItem">
            <el-input
              size="small"
              :maxlength="50"
              v-model.trim="form.maxValidatorNumber"
              :placeholder="$t('tronMaxValidatorNumberPlaceholder')"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item label="minValidatorNumber" prop="minValidatorNumber" class="baseFormItem">
            <el-input
              size="small"
              :maxlength="50"
              v-model.trim="form.minValidatorNumber"
              :placeholder="$t('tronMinValidatorNumberPlaceholder')"
              disabled>
            </el-input>
          </el-form-item>

          <el-form-item label="crossChainFee" prop="crossChainFee" class="baseFormItem">
            <el-input-number
              size="small"
              controls-position="right"
              :min="0"
              :step="0.01"
              :maxlength="50"
              v-model.trim="form.crossChainFee"
              :placeholder="$t('tronSettingPlaceholder')"
              disabled>
            </el-input-number>
          </el-form-item>
        </template>
      </el-form>

    </el-card>

    <div class="box-footer align-right">
      <el-button size="small" type="primary" @click="handleCancel">{{ $t('tronSettingPreviousStep') }}</el-button>
      <el-button size="small" type="primary" @click="handleSubmit">{{ $t('tronSettingNextStep') }}</el-button>
    </div>
  </div>
</template>
<script>
import { isvalidateNum, twoDecimal } from '@/utils/validate.js'
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
  computed: {
    crossChainRules() {
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
  data() {
    return {
      form: {},
      showContent: true,
      loading: false,
    }
  },

  created () {
    this.form = { ...this.configInfo.crossChainConfig }
  },

  methods: {
    handleSubmit() {
      this.$refs['cross-chain-config-form'].validate(valid => {
        if (valid) {
          let params = { ...this.form }

          this.loading = true
          // TODO POST
          this.$_api.settingApi.crossChainConfig(params, err => {
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
.cross-chain-config {
  padding-right: 80px;

  .el-form-item {
    width: 600px;
  }
  .box-footer {
    &.align-right {
      margin-top: 40px;
      text-align: right;
    }
  }
}
</style>
