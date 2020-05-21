<template>
  <div class="node-info">
    <div class="box-card node-config">
      <div class="box-header">{{ $t('节点配置') }}</div>
      <div class="box-body">
        <div class="config-item">
          <span class="label">{{ $t('节点IP') }}：</span>
          <span class="value">{{ $t('123.123.123.123') }}</span>
        </div>
        <div class="config-item">
          <span class="label">{{ $t('节点状态') }}：</span>
          <span class="value">{{ $t('正常') }}</span>
        </div>
        <div class="config-item">
          <span class="label">{{ $t('已链接的节点数') }}：</span>
          <span class="value">{{ $t('3') }}</span>
        </div>
        <div class="config-item">
          <span class="label">{{ $t('代码版本') }}：</span>
          <span class="value">{{ $t('3.7') }}</span>
        </div>
      </div>
    </div>
    <div class="box-card service-config">
      <div class="box-header">{{ $t('服务器配置') }}</div>
      <div class="box-body">
        <div class="config-item">
          <span class="label">{{ $t('cpu数量') }}：</span>
          <span class="value">{{ $t('123') }}</span>
        </div>
        <div class="config-item">
          <span class="label">{{ $t('cpu使用率') }}：</span>
          <span class="value">{{ $t('9.3%') }}</span>
        </div>
        <div class="config-item">
          <span class="label">{{ $t('虚拟机内存使用剩余') }}：</span>
          <span class="value">{{ $t('46.44G') }}</span>
        </div>
        <div class="config-item">
          <span class="label">{{ $t('内存使用率') }}：</span>
          <span class="value">{{ $t('12%') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "node-info"
}
</script>

<style lang="scss" scoped>
.node-info {
  font-size: 14px;
  color: font-color();

  .box-card {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }

    .box-header {
      margin-bottom: 10px;
      color: font-color();
      font-weight: bold;
    }
    .box-body {
      margin-left: 6em;
      .config-item {
        margin-bottom: 5px;
        &:last-child {
          margin-bottom: 0;
        }
        .label {
          display: inline-block;
          width: 180px;
        }
      }
    }
  }
}
</style>