<template>
  <div class="block-info" v-loading="loading">
    <div class="info-item">
      <span class="label">{{ $t('explorer.high') }}：</span>
      <span class="value">{{ $t('12345') }}</span>
    </div>
    <div class="info-item">
      <span class="label">{{ $t('explorer.hashValue') }}：</span>
      <span class="value">{{ '0000000001233e3b151f48f3df7299e912dfba7dea5d0406a923e9abe96892c2' }}</span>
    </div>
    <div class="info-item">
      <span class="label">{{ $t('explorer.time') }}：</span>
      <span class="value"> {{ '2020-05-20 12:30:01' }}</span>
    </div>
    <div class="info-item">
      <span class="label">{{ $t('explorer.transactionNums') }}：</span>
      <span class="value">{{ $t('25') }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "block-info",
  props: {
    configForm: Object,
  },
  data () {
    return {
      blockInfo: {

      },
      loading: false,
    }
  },
  watch: {
    'configForm.refresh': {
      handler (val) {
        if (val) this.getBlockInfo()
      }
    }
  },
  created () {
    this.getBlockInfo()
  },
  methods: {
    getBlockInfo (params = {}) {
      this.configForm.refresh = false
      this.blockInfo = {}
      this.loading = true

      this.$_api.explorer.getBlockInfo({
        // type: params.nodeType,
        url: this.configForm.nodeURL,
      }, (err, res = {}) => {
        this.loading = false
        if (err) return

        this.blockInfo = res.result || {}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.block-info {
  font-size: 14px;
  color: font-color();

  .info-item {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    .label {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>