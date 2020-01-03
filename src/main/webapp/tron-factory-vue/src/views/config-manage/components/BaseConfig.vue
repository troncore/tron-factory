<template>
  <div class="base-config">
    <el-card class="im-card">
      <div class="box-header title">{{ $t('tronSettingBase') }}</div>

      <div class="box-body">
        <el-form ref="base-config-form" :rules="baseRules" :model="form">
          <el-form-item label="chainId" prop="chainId">
            <el-input v-model.trim="form.chainId" :maxlength="50" :placeholder="$t('tronChainIdPlaceholder')"></el-input>
          </el-form-item>

          <el-form-item label="chainName" prop="chainName">
            <el-input v-model.trim="form.chainName" :maxlength="50" :placeholder="$t('tronChainNamePlaceholder')"></el-input>
          </el-form-item>

          <el-form-item label="MaintenanceTimeInterval" prop="block_maintenanceTimeInterval">
            <el-input v-model.trim="form.block_maintenanceTimeInterval" :maxlength="50" :placeholder="$t('tronblockBlockMaintenanceTimeIntervalPlaceholder')"></el-input>
          </el-form-item>

          <div class="more-form">
            <el-button class="el-icon-arrow-down el-icon--right" type="text" @click="showMore = !showMore">{{ $t('tronMoreSetting') }}</el-button>
          </div>

          <el-collapse-transition>
            <div v-if="showMore">
              <el-form-item label="blockProposalExpireTime" prop="block_proposalExpireTime">
                <el-input v-model.trim="form.block_proposalExpireTime" :maxlength="50" :placeholder="$t('tronblockProducedTimeOutePlaceholder')"></el-input>
              </el-form-item>

              <el-form-item label="nodeBlockProducedTimeOut" prop="node_blockProducedTimeOut">
                <el-input v-model.trim="form.node_blockProducedTimeOut" :maxlength="50" :placeholder="$t('tronblockNodeBlockProducedTimeOutPlaceholder')"></el-input>
              </el-form-item>

              <el-form-item label="nodeMinParticipationRate" prop="node_minParticipationRate">
                <el-input v-model.trim="form.node_minParticipationRate" :maxlength="50" :placeholder="$t('tronblockNodeMinParticipationRatePlaceholder')"></el-input>
              </el-form-item>
            </div>
          </el-collapse-transition>
        </el-form>
      </div>

      <div  class="box-footer align-right">
        <el-button class="im-button large" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
        <el-button class="im-button large" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
      </div>
    </el-card>

  </div>
</template>
<script>
import { isvalidateNum, isvalidateIntegerNum } from '@/utils/validate.js'
export default {
  name: 'base-config',
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
      showMore: false,
      loading: false,
    }
  },
  computed: {
    baseRules() {
      const validateNum = (rule, value, callback) => {
        if (!isvalidateNum(value)) {
          callback(new Error(this.$t('tronSettingNumberZeroPlaceholder')))
        } else {
          callback()
        }
      }
      const validNum = (rule, value, callback) => {
        if (!isvalidateIntegerNum(value)) {
          callback(new Error(this.$t('tronSettingNumberPlaceholder')))
        } else {
          callback()
        }
      }
      const validMaxNum = (rule, value, callback) => {
        if (value > 2147483647) {
          callback(new Error(this.$t('tronNumberPlaceholder')))
        } else {
          callback()
        }
      }
      const rules = {
        chainId: [
          {
            required: true,
            message: this.$t('tronChainIdPlaceholder'),
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingNumberPlaceholder'),
            validator: validateNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validMaxNum,
            trigger: 'blur',
          },
        ],
        chainName: [
          {
            required: true,
            message: this.$t('tronChainNamePlaceholder'),
            trigger: 'blur',
          },
        ],
        block_proposalExpireTime: [
          {
            required: true,
            message: this.$t('tronblockProducedTimeOutePlaceholder'),
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingNumberPlaceholder'),
            validator: validateNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validMaxNum,
            trigger: 'blur',
          },
        ],
        block_maintenanceTimeInterval: [
          {
            required: true,
            message: this.$t(
              'tronblockBlockMaintenanceTimeIntervalPlaceholder',
            ),
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingNumberPlaceholder'),
            validator: validateNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validMaxNum,
            trigger: 'blur',
          },
        ],
        node_blockProducedTimeOut: [
          {
            required: true,
            message: this.$t('tronblockNodeBlockProducedTimeOutPlaceholder'),
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingNumberPlaceholder'),
            validator: validateNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validMaxNum,
            trigger: 'blur',
          },
        ],
        node_minParticipationRate: [
          {
            required: true,
            message: this.$t('tronblockNodeMinParticipationRatePlaceholder'),
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingNumberZeroPlaceholder'),
            validator: validNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validMaxNum,
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
        this.form = { ...val.baseSettingConfig }
      },
      immediate: true,
    },
  },

  methods: {
    handleSubmit() {
      this.$refs['base-config-form'].validate(valid => {
        if (valid) {
          let params = {
            chainId: this.form.chainId,
            chainName: this.form.chainName,
            blockProducedTimeOut: this.form.node_blockProducedTimeOut,
            maintenanceTimeInterval: this.form.block_maintenanceTimeInterval,
            proposalExpireTime: this.form.block_proposalExpireTime,
            minParticipationRate: this.form.node_minParticipationRate,
          }

          this.loading = true
          this.$_api.configManage.baseSettingConfig(params, err => {
            this.loading = false
            if (err) return

            this.$message.success(this.$t('tronSettingBaseSaveSuccess'))
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
<style lang="scss" scoped>
@import "~@/assets/styles/base.scss";
.base-config {
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
