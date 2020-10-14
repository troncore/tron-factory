<template>
  <div class="verify-params card-view">
    <div class="im-card card-main">
      <div class="card-header">
        <span class="card-title">确认发行参数</span>
      </div>
      <div class="card-body">

        确认发行参数
        批准发行
        发币成功

      </div>
    </div>
    <div class="card-footer space-between">
      <el-button class="im-button largest" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button largest" :loading="loading" :disabled="disable" type="primary" @click="handleSubmit">{{ $t('base.submit') }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "verify-params",
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

    }
  }
}
</script>

<style scoped>

</style>
