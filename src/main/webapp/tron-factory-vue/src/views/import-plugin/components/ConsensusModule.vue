<template>
  <div class="consensus-module box-view">
    <div class="box-header title">{{ $t('importPlugin.consensusModule') }}</div>

    <div class="box-body">
      <div class="consensus-list">
        <span class="consensus-item">DPoS</span>
      </div>
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
      this.loading = true
      this.$_api.importPlugin.consensusApi(this.form, (err, res) => {
        this.loading = false
        if (err) return

        this.$message.success(this.$t('base.success.save'))
        this.$emit('next-step')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
