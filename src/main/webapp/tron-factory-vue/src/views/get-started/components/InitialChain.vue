<template>
  <div class="initial-chain">
    <div class="page-title">{{ $t('开始创建')}}</div>
    <div class="im-card padding-20">
      基本信息
    </div>
    <div class="page-footer">
      <el-button class="im-button large" type="primary" :disabled="disabled" :loading="loading" @click="handleSubmit">{{ $t('base.complete') }}</el-button>
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.cancel') }}</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "InitialChain",
    data () {
      return {
        disabled: false,
        loading: false,
      }
    },
    created () {

    },
    methods: {
      handleSubmit () {
        this.$router.push('/get-started/dashboard')

      },
      handleCancel () {

      }
    }
  }
</script>

<style lang="scss" scoped>
.initial-chain {
  .page-title {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 18px;
    color: #000000;
  }
}
</style>
