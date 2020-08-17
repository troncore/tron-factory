<template>
  <div class="node-info" v-loading="loading">
    <div class="box-card node-config">
      <div class="box-header">{{ $t('explorer.nodeConfig') }}</div>
      <div class="box-body">
        <div class="config-item">
          <span class="label">{{ $t('explorer.linkedNodeNums') }}：</span>
          <span class="value">{{ nodeInfo.currentConnectCount }}</span>
        </div>
        <div class="config-item">
          <span class="label">{{ $t('explorer.codeVersion') }}：</span>
          <span class="value">{{ nodeInfo.codeVersion }}</span>
        </div>
      </div>
    </div>
    <div class="box-card service-config">
      <div class="box-header">{{ $t('explorer.serviceConfig') }}</div>
      <div class="box-body">
        <div class="config-item">
          <span class="label">{{ $t('explorer.cpuNums') }}：</span>
          <span class="value">{{ nodeInfo.cpuCount }}</span>
        </div>
        <div class="config-item">
          <span class="label">{{ $t('explorer.cupUseRate') }}：</span>
          <span class="value">{{ nodeInfo.cpuRate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "node-info",
  props: {
    configForm: Object,
  },
  data () {
    return {
      nodeInfo: {},
      loading: false,
    }
  },
  watch: {
    'configForm.refresh': {
      handler (val) {
        if (val) this.getNodeInfo()
      }
    }
  },
  created () {
    this.getNodeInfo()
  },
  methods: {
    getNodeInfo () {
      this.loading = true
      this.configForm.refresh = false

      this.nodeInfo = {
        currentConnectCount: '--',
        cpuCount: '--',
        cpuRate: '--',
        codeVersion: '--',
        jvmFreeMemory: '--',
        freeMemory: '--',
      }

      this.$_api.explorer.getDeployedNodeInfo({
        type: this.configForm.nodeType,
        url: this.configForm.nodeURL,
      }, (err, res = {}) => {
        this.loading = false
        if (err) return

        let result = res.result || {}

        let machineInfo = result.machineInfo || {}
        let cpuRate = '--'
        if (typeof machineInfo.cpuRate !== 'undefined' ) cpuRate = Number((machineInfo.cpuRate) * 100).toFixed(2) + '%'
        let jvmFreeMemory = '--'
        if (typeof machineInfo.jvmFreeMemory !== 'undefined' ) jvmFreeMemory = (Number(machineInfo.jvmFreeMemory) / 1024 / 1024).toFixed(2) + 'G'
        let freeMemory = '--'
        if (typeof machineInfo.freeMemory !== 'undefined' ) freeMemory = (Number(machineInfo.freeMemory) / 1024 / 1024).toFixed(2) + 'G'

        let configNodeInfo = result.configNodeInfo || {}


        this.nodeInfo = {
          currentConnectCount: result.currentConnectCount,
          cpuCount: machineInfo.cpuCount,
          cpuRate: cpuRate,
          codeVersion: configNodeInfo.codeVersion,
          jvmFreeMemory: jvmFreeMemory,
          freeMemory: freeMemory,
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.node-info {
  font-size: 14px;
  color: font-color();

  .box-card {
    .box-header {
      margin-bottom: 10px;
      color: font-color();
      font-weight: bold;
    }
    .box-body {
      padding: 10px 15px;
      border-radius: 4px;
      border: 1px solid theme-color(.2);
      background-color: theme-color(.02);

      .config-item {
        margin-bottom: 5px;
        &:last-child {
          margin-bottom: 0;
        }
        .label {
          display: inline-block;
          /*color: black;*/
          width: 200px;
        }

        .value {
          color: font-color(.8);
        }
      }
    }
  }

  .box-card + .box-card {
    margin-top: 20px;
  }
}
</style>
