<template>
  <div class="block-info">
    <div class="info-item">
      <span class="label">{{ $t('高度') }}：</span>
      <span class="value">{{ $t('12345') }}</span>
    </div>
    <div class="info-item">
      <span class="label">{{ $t('哈希值') }}：</span>
      <span class="value">{{ '0000000001233e3b151f48f3df7299e912dfba7dea5d0406a923e9abe96892c2' }}</span>
    </div>
    <div class="info-item">
      <span class="label">{{ $t('时间') }}：</span>
      <span class="value"> {{ '2020-05-20 12:30:01' }}</span>
    </div>
    <div class="info-item">
      <span class="label">{{ $t('交易量') }}：</span>
      <span class="value">{{ $t('25') }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "block-info"
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