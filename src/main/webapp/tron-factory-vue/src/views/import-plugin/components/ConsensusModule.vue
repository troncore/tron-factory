<template>
  <div class="consensus-module box-view">
    <div class="box-header title">{{ $t('tronPluginConsensusModule') }}</div>

    <div class="box-body">

      <el-form ref="form-box" :model="form" :rules="formRules" label-position="top">
        <el-form-item prop="consensus">
          <el-radio-group v-model="form.consensus">
            <el-radio :label="'dpos'">DPOS</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="box-footer align-right">
      <el-button class="im-button large" :loading="loading" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'consensus-module',
  props: {
    pluginInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        consensus: 'dpos',
      },
      contentShow: true,
      loading: false,

      formRules: {
        consensus: [{ required: true, message: this.$t('tronSettingPlaceholder'), trigger: 'blur', },],
      },
    }
  },

  watch: {
    pluginInfo: {
      handler (val = {}) {
        this.form.consensus = val.consensus || 'dpos'
      },
      immediate: true,
    },
  },

  methods: {
    handleSubmit() {
      this.$refs['form-box'].validate(valid => {
        if (valid) {
          let params = {
            consensus: this.form.consensus
          }

          this.loading = true
          this.$_api.importPlugin.consensusApi(params, (err, res) => {
            this.loading = false
            if (err) return

            this.$message.success(this.$t('tronPluginConsensusSaveSuccess'))
            this.$emit('next-step')
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
