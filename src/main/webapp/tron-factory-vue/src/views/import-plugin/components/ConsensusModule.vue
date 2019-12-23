<template>
  <div class="consensus-module">

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

        <el-form-item prop="consensus">
          <el-radio-group v-model="form.consensus">
            <el-radio :label="'dpos'">DPOS</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
    </el-card>

    <div class="box-footer align-right">
      <el-button size="small" type="primary" @click="handleSubmit">{{ $t('tronSettingNextStep') }}</el-button>
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
          this.$_api.pluginApi.consensusApi(params, (err, res) => {
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
.consensus-module {
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
