<template>
  <div class="explorer-node">

    <div class="node-summary im-card">
      <div class="node-item node-ip">
        <span class="label">{{ $t('explorer.nodeIP')}}：</span>
        <span class="value">{{ nodeIP }}</span>
      </div>
      <div class="node-item http-port">
        <span class="label">{{ $t('explorer.httpPort')}}：</span>
        <span class="value">{{ nodePort }}</span>
      </div>
      <div class="node-item operator">
        <el-button type="text" class="update" @click="$emit('update')">{{ $t('base.modify')}}</el-button>
        <el-button type="text" class="delete" @click="$emit('delete')">{{ $t('base.delete')}}</el-button>
      </div>
    </div>

    <div class="node-detail im-card">
      <el-tabs v-model="activeTab">
        <el-tab-pane :label="$t('explorer.blockChainInfo')" name="1">
          <chain-info v-if="activeTab === '1'" :config-form="configForm"/>
        </el-tab-pane>

        <el-tab-pane :label="$t('explorer.nodeInfo')" name="2">
          <node-info v-if="activeTab === '2'" :config-form="configForm" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import ChainInfo from "./ChainInfo"
  import NodeInfo from "./NodeInfo"

  export default {
    name: "explorer-node",
    components: {
      ChainInfo,
      NodeInfo,
    },
    props: {
      canExplorerNode: Boolean,
      configForm: Object,
    },
    data () {
      return {
        activeTab: '1'
      }
    },
    computed: {
      nodeIP () {
        return this.configForm.nodeURL.split(':')[0]
      },
      nodePort () {
        return this.configForm.nodeURL.split(':')[1]
      }
    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
.explorer-node {
  .node-summary {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 50px;
    font-size: 14px;
    color: font-color();

    .node-item {
      display: flex;
      align-items: center;
      & + .node-item {
        margin-left: 100px;
      }
      &:last-child {
        margin-left: auto;
      }

      .el-button {
        padding: 0;
      }
    }
  }

  .node-detail {
    margin-top: 20px;
    /*border-top: 1px solid rgba(230, 230, 230, .5);*/
    padding: 0 20px 20px;
  }

  /deep/ .el-tabs {
    .el-tabs__item {
      font-size: 14px;
    }
  }
}
</style>
