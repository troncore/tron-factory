<template>
  <div class="box-view base-config">
    <div class="box-body">
      <el-form class="im-form" ref="form" :model="form" :rules="formRules">
        <el-form-item prop="maintenanceTimeInterval">
          <span slot="label">maintenanceTimeInterval <i class="help-tips">({{ $t('nodeConfig.helpTips.maintenanceTimeInterval') }}: ms)</i></span>
          <el-input v-model.trim="form.maintenanceTimeInterval" type="number" min="0" max="2147483647" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <div class="more-form">
          <el-button type="text" @click="showMore = !showMore"><i class="el-icon-arrow-right"></i>{{ $t('nodeConfig.moreSetting') }}</el-button>
        </div>

        <el-collapse-transition>
          <div v-if="showMore">
            <el-form-item prop="proposalExpireTime">
              <span slot="label">proposalExpireTime <i class="help-tips">({{ $t('nodeConfig.helpTips.blockProposalExpireTime') }}: ms)</i></span>
              <el-input v-model.trim="form.proposalExpireTime" type="number" min="0" max="2147483647" clearable :placeholder="$t('base.pleaseInput')"></el-input>
            </el-form-item>

            <el-form-item prop="blockProducedTimeOut">
              <span slot="label">producedTimeOut <i class="help-tips">({{ $t('nodeConfig.helpTips.nodeBlockProducedTimeOut') }}: 0 - 100)</i></span>
              <el-input v-model.trim="form.blockProducedTimeOut" type="number" min="0" max="100" clearable :placeholder="$t('base.pleaseInput')"></el-input>
            </el-form-item>

            <el-form-item prop="minParticipationRate" class="margin-bottom-0">
              <span slot="label">minParticipationRate <i class="help-tips">({{ $t('nodeConfig.helpTips.nodeMinParticipationRate') }}: 0 - 100)</i></span>
              <el-input v-model.trim="form.minParticipationRate" type="number" min="0" max="100" clearable :placeholder="$t('base.pleaseInput')"></el-input>
            </el-form-item>
          </div>
        </el-collapse-transition>
      </el-form>
    </div>

    <div  class="box-footer">
      <el-button class="im-button large" :loading="loading" :disabled="disabled" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.cancel') }}</el-button>
    </div>
  </div>
</template>
<script>
import { formRules } from "@/utils/validate";
export default {
  name: 'base-config',
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
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false), trigger: 'blur', },
          { validator: formRules.numMax(2147483647, this.$t('base.valid.maxNumberValue') + ': 2147483647'), trigger: 'blur', },
        ],
        proposalExpireTime: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: formRules.numMin(0, this.$t('base.valid.gteZeroInt'), false), trigger: 'blur', },
          { validator: formRules.numMax(2147483647, this.$t('base.valid.maxNumberValue') + ': 2147483647'), trigger: 'blur', },
        ],
        blockProducedTimeOut: [
          { required: true, message: this.$t('base.pleaseInput',), trigger: 'blur', },
          { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false), trigger: 'blur', },
          { validator: formRules.numMax(100, this.$t('base.valid.maxNumberValue') + ': 100'), trigger: 'blur', },
        ],
        minParticipationRate: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: formRules.numMin(0, this.$t('base.valid.gteZeroInt')), trigger: 'blur', },
          { validator: formRules.numMax(100, this.$t('base.valid.maxNumberValue') + ': 100'), trigger: 'blur', },
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
