<template>
  <div class="box-view base-config">
    <div class="box-body">
      <el-form class="im-form" ref="form" :model="form" :rules="formRules">
        <el-form-item prop="maintenanceTimeInterval">
          <span slot="label">
            maintenanceTimeInterval
            <i class="help-tips">({{ $t('nodeConfig.helpTips.maintenanceTimeInterval') }}: ms)</i>
          </span>
          <el-input
            v-model.trim="form.maintenanceTimeInterval"
            tabindex="1"
            type="number"
            min="1"
            max="2147483647"
            :disabled="!nodeInfo.showStop"
            clearable />
        </el-form-item>

        <el-form-item prop="proposalExpireTime">
          <span slot="label">
            proposalExpireTime
            <i class="help-tips">({{ $t('nodeConfig.helpTips.blockProposalExpireTime') }}: ms)</i>
          </span>
          <el-input
            v-model.trim="form.proposalExpireTime"
            tabindex="1"
            type="number"
            min="1"
            max="2147483647"
            :disabled="!nodeInfo.showStop"
            clearable />
        </el-form-item>

        <el-form-item prop="blockProducedTimeOut">
          <span slot="label">
            producedTimeOut
            <i class="help-tips">({{ $t('nodeConfig.helpTips.nodeBlockProducedTimeOut') }}: 0 - 100)</i>
          </span>
          <el-input
            v-model.trim="form.blockProducedTimeOut"
            tabindex="1"
            type="number"
            min="0"
            max="100"
            :disabled="!nodeInfo.showStop"
            clearable />
        </el-form-item>

        <el-form-item prop="minParticipationRate" class="margin-bottom-0">
          <span slot="label">
            minParticipationRate
            <i class="help-tips">({{ $t('nodeConfig.helpTips.nodeMinParticipationRate') }}: 0 - 100)</i>
          </span>
          <el-input
            v-model.trim="form.minParticipationRate"
            tabindex="1"
            type="number"
            min="0"
            max="100"
            :disabled="!nodeInfo.showStop"
            clearable />
        </el-form-item>
      </el-form>
    </div>

    <div  class="box-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.cancel') }}</el-button>
      <el-button class="im-button large" :loading="loading" :disabled="disabled" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
    </div>
  </div>
</template>
<script>
import { formRules } from "@/utils/validate";
export default {
  name: 'base-config',
  props: {
    nodeInfo: Object,
  },
  data() {
    return {
      form: {
        id: '',
        maintenanceTimeInterval: '',
        proposalExpireTime: '',
        blockProducedTimeOut: '',
        minParticipationRate: '',
      },
      showMore: false,
      disabled: false,
      loading: false,
    }
  },

  computed: {
    opNodeId () {
      let id = this.$route.query.id
      return /\d+/.test(id) ? Number(id) : undefined
    },
    formRules () {
      return {
        maintenanceTimeInterval: [
          { required: true, message: ' ', trigger: 'change', },
          { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false), trigger: 'change', },
          { validator: formRules.numMax(2147483647, this.$t('base.valid.maxNumberValue') + ': 2147483647'), trigger: 'change', },
        ],
        proposalExpireTime: [
          { required: true, message: ' ', trigger: 'change', },
          { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false), trigger: 'change', },
          { validator: formRules.numMax(2147483647, this.$t('base.valid.maxNumberValue') + ': 2147483647'), trigger: 'change', },
        ],
        blockProducedTimeOut: [
          { required: true, message: ' ', trigger: 'change', },
          { validator: formRules.numMin(0, this.$t('base.valid.gteZeroInt')), trigger: 'change', },
          { validator: formRules.numMax(100, this.$t('base.valid.maxNumberValue') + ': 100'), trigger: 'change', },
        ],
        minParticipationRate: [
          { required: true, message: ' ', trigger: 'change', },
          { validator: formRules.numMin(0, this.$t('base.valid.gteZeroInt')), trigger: 'change', },
          { validator: formRules.numMax(100, this.$t('base.valid.maxNumberValue') + ': 100'), trigger: 'change', },
        ],
      }
    }
  },
  created () {
    this.getConfig()
  },
  methods: {
    getConfig () {
      if (!this.validNode()) return

      this.disabled = true
      this.$_api.getStarted.getBaseConfig({ id: this.opNodeId }, (err, res = {}) => {
        if (err) return
        this.disabled = false

        this.initForm(res)
      })
    },

    initForm(data) {
      this.form = {
        id: this.opNodeId,
        maintenanceTimeInterval: data.block_maintenanceTimeInterval,
        proposalExpireTime: data.block_proposalExpireTime,
        blockProducedTimeOut: data.node_blockProducedTimeOut,
        minParticipationRate: data.node_minParticipationRate,
      }
    },

    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let params = {
            id: this.opNodeId,
            blockProducedTimeOut: Number(this.form.blockProducedTimeOut),
            maintenanceTimeInterval: Number(this.form.maintenanceTimeInterval),
            proposalExpireTime: Number(this.form.proposalExpireTime),
            minParticipationRate: Number(this.form.minParticipationRate),
          }

          this.loading = true
          this.$_api.getStarted.setBaseConfig(params, err => {
            this.loading = false
            if (err) return

            this.$notify.success({
              title: this.$t('base.successful'),
              message: this.$t('nodeConfig.baseSaveSuccess')
            })
            this.$emit('next-step')
          })
        }
      })
    },

    validNode () {
      // edit node
      if (!/\d+/.test(this.opNodeId)) {
        this.$notify.warning({
          title: this.$t('base.warning'),
          message: this.$t('nodeConfig.opUnValidNode'),
        })
        return false
      }
      return true
    },

    handleCancel() {
      this.$router.push('/get-started/dashboard')
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
