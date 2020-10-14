<template>
  <div class="connect-tronlink card-view">
    <div class="im-card card-main">
      <div class="card-header">
        <span class="card-title">连接 TronLink</span>
      </div>
      <div class="card-body">
        请连接 tronLink 钱包
      </div>
    </div>
    <div class="card-footer space-between">
      <el-button class="im-button largest" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button largest" :loading="loading" :disabled="disable" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "connect-tronlink",
  data () {
    return {
      form: {},
      formRules: {},
      loading: false,
      disable: false,
    }
  },
  methods: {
    handleCancel () {
      this.$emit('step', -1)
    },
    handleSubmit () {
      this.$emit('step', 1)
    }
  }
}
</script>

<style scoped>

</style>
