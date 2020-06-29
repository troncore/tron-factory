<template>
  <div class="box-view base-config">
    <div class="box-body">
      <el-form class="im-form" ref="base-config-form" :model="form" :rules="formRules">
        <el-form-item prop="block_maintenanceTimeInterval">
          <span slot="label">maintenanceTimeInterval <i class="help-tips">({{ $t('configuration.helpTips.maintenanceTimeInterval') }}: ms)</i></span>
          <el-input v-model.trim="form.block_maintenanceTimeInterval" type="number" min="0" max="2147483647" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <el-form-item prop="block_proposalExpireTime">
          <span slot="label">proposalExpireTime <i class="help-tips">({{ $t('configuration.helpTips.blockProposalExpireTime') }}: ms)</i></span>
          <el-input v-model.trim="form.block_proposalExpireTime" type="number" min="0" max="2147483647" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <el-form-item prop="node_blockProducedTimeOut">
          <span slot="label">producedTimeOut <i class="help-tips">({{ $t('configuration.helpTips.nodeBlockProducedTimeOut') }}: 0 - 100)</i></span>
          <el-input v-model.trim="form.node_blockProducedTimeOut" type="number" min="0" max="100" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <el-form-item prop="node_minParticipationRate">
          <span slot="label">participationRate <i class="help-tips">({{ $t('configuration.helpTips.nodeMinParticipationRate') }}: 0 - 100)</i></span>
          <el-input v-model.trim="form.node_minParticipationRate" type="number" min="0" max="100" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div  class="box-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button large" :loading="loading" :disabled="configLoading" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
    </div>
  </div>
</template>
<script>
import { formRules } from "@/utils/validate";
export default {
  name: 'base-config',
  props: {
    initConfigInfo: {
      type: Function,
      required: true,
    },
    configLoading: Boolean,
  },
  data() {
    return {
      form: {},
      showMore: false,
      loading: false,
    }
  },

  computed: {
    formRules () {
      return {
        block_maintenanceTimeInterval: [
          { required: true, message: this.$t('base.pleaseInput',), trigger: 'blur', },
          { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false), trigger: 'blur', },
          { validator: formRules.numMax(2147483647, this.$t('base.valid.maxNumberValue') + ': 2147483647'), trigger: 'blur', },
        ],
        block_proposalExpireTime: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false), trigger: 'blur', },
          { validator: formRules.numMax(2147483647, this.$t('base.valid.maxNumberValue') + ': 2147483647'), trigger: 'blur', },
        ],
        node_blockProducedTimeOut: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: formRules.numMin(0, this.$t('base.valid.gteZeroInt')), trigger: 'blur', },
          { validator: formRules.numMax(100, this.$t('base.valid.maxNumberValue') + ': 100'), trigger: 'blur', },
        ],
        node_minParticipationRate: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: formRules.numMin(0, this.$t('base.valid.gteZeroInt')), trigger: 'blur', },
          { validator: formRules.numMax(100, this.$t('base.valid.maxNumberValue') + ': 100'), trigger: 'blur', },
        ],
      }
    }
  },

  created () {
    this.getConfigInfo()
  },

  methods: {
    getConfigInfo() {
      this.initConfigInfo().then(res => this.form = res || {})
    },

    handleSubmit() {
      this.$refs['base-config-form'].validate(valid => {
        if (valid) {
          let params = {
            blockProducedTimeOut: this.form.node_blockProducedTimeOut,
            maintenanceTimeInterval: this.form.block_maintenanceTimeInterval,
            proposalExpireTime: this.form.block_proposalExpireTime,
            minParticipationRate: this.form.node_minParticipationRate,
          }

          this.loading = true
          this.$_api.configuration.baseSettingConfig(params, err => {
            this.loading = false
            if (err) return

            this.$notify({
              type: 'success',
              title: this.$t('base.successful'),
              message: this.$t('configuration.baseSaveSuccess')
            })
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
</style>
