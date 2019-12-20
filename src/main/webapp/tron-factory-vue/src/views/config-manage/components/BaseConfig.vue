/* * @Author: lxm * @Date: 2019-10-15 11:03:42 * @Last Modified by: lxm * @Last
Modified time: 2019-11-12 14:34:08 * @setting base setting */

<template>
  <div class="viewBranchDialog">
    <el-form
      ref="baseSettingDialogForm"
      :rules="baseRules"
      :model="form"
      label-width="230px"
      class="tronform"
      label-position="left"
    >
      <el-card shadow="hover">
        <el-row :gutter="12">
          <el-col :span="24">
            <div @click="showContent = !showContent">
              <i :class="showContent ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
              {{ $t('tronSettingBase') }}
            </div>
            <template v-if="showContent">
              <el-form-item label="chainId" prop="chainId" class="baseFormItem mgt20">
                <el-input :placeholder="$t('tronChainIdPlaceholder')" size="small" :maxlength="50" v-model.trim="form.chainId"></el-input>
              </el-form-item>

              <el-form-item label="chainName" prop="chainName" class="baseFormItem">
                <el-input v-model.trim="form.chainName" size="small" :maxlength="50" :placeholder="$t('tronChainNamePlaceholder')"></el-input>
              </el-form-item>

              <el-form-item class="baseFormItem" label="MaintenanceTimeInterval" prop="block_maintenanceTimeInterval">
                <el-input
                  size="small"
                  :maxlength="50"
                  v-model.trim="form.block_maintenanceTimeInterval"
                  :placeholder="$t('tronblockBlockMaintenanceTimeIntervalPlaceholder')">
                </el-input>
              </el-form-item>

              <el-button type="text" size="small" @click="moreSetting = !moreSetting">{{ $t('tronMoreSetting') }}</el-button>

              <template v-if="moreSetting">
                <el-form-item label="blockProposalExpireTime" prop="block_proposalExpireTime" class="baseFormItem">
                  <el-input
                    size="small"
                    :maxlength="50"
                    v-model.trim="form.block_proposalExpireTime"
                    :placeholder="$t('tronblockProducedTimeOutePlaceholder')">
                  </el-input>
                </el-form-item>

                <el-form-item class="baseFormItem" label="nodeBlockProducedTimeOut" prop="node_blockProducedTimeOut">
                  <el-input
                    size="small"
                    :maxlength="50"
                    v-model.trim="form.node_blockProducedTimeOut"
                    :placeholder="$t('tronblockNodeBlockProducedTimeOutPlaceholder')">
                  </el-input>
                </el-form-item>

                <el-form-item class="baseFormItem" label="nodeMinParticipationRate" prop="node_minParticipationRate">
                  <el-input
                    size="small"
                    :maxlength="50"
                    v-model.trim="form.node_minParticipationRate"
                    :placeholder="$t('tronblockNodeMinParticipationRatePlaceholder')">
                  </el-input>
                </el-form-item>
              </template>

            </template>
          </el-col>
        </el-row>
      </el-card>

      <el-form-item label-width="0" class="textRight">
        <el-button type="primary" size="small" @click="handleCancel">{{ $t('tronSettingPreviousStep') }}</el-button>
        <el-button type="primary" size="small" @click="handleSubmit('baseSettingDialogForm')">{{ $t('tronSettingNextStep') }}</el-button>
      </el-form-item>
    </el-form>
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
  data() {
    return {
      form: {},
      showContent: true,
      moreSetting: false,

      loading: false,
    }
  },

  created () {
    this.form = { ...this.configInfo.baseSettingConfig }
  },

  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
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
          this.$_api.settingApi.baseSettingApi(params, err => {
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
<style lang="scss" rel="stylesheet/scss" scoped>
.textCenter {
  text-align: center;
}
.textRight {
  margin-top: 40px;
  text-align: right;
}
.tronform {
  padding: 0 80px 0 0;
}
.baseFormItem {
  width: 580px;
}
</style>
