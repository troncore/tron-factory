<template>
  <div class="explorer-node">

    <div class="node-summary im-card">
      <template v-if="configForm.nodeType === '1'">
        <div class="node-item node-ip">
          <span class="label">{{ $t('explorer.nodeIP')}}：</span>
          <span class="value">{{ nodeIP }}</span>
        </div>
        <div class="node-item http-port">
          <span class="label">{{ $t('explorer.httpPort')}}：</span>
          <span class="value">{{ nodePort }}</span>
        </div>
      </template>
      <template v-else>
        <div class="node-item node-url">
          <span class="label">{{ $t('explorer.defineNodeLabel')}}：</span>
          <span class="value">{{ configForm.nodeURL }}</span>
        </div>
      </template>
      <div class="node-item operator">
        <el-button type="text" class="update" @click="handleUpdate">{{ $t('base.modify')}}</el-button>
        <el-button type="text" class="delete" @click="handleDelete">{{ $t('base.delete')}}</el-button>
      </div>
    </div>

    <div class="node-detail im-card">
      <el-tabs v-model="activeTab">
        <el-tab-pane :label="$t('explorer.blockChainInfo')" name="1">
          <block-chain-info v-if="activeTab === '1'" :config-form="configForm"/>
        </el-tab-pane>

        <el-tab-pane :label="$t('explorer.nodeInfo')" name="2">
          <node-info v-if="activeTab === '2'" :config-form="configForm" />
        </el-tab-pane>

        <!--<el-tab-pane :label="$t('explorer.blockInfo')" name="3">-->
        <!--  <block-info v-if="activeTab === '3'" :config-form="configForm" />-->
        <!--</el-tab-pane>-->
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import BlockChainInfo from "./components/BlockChainInfo";
  import NodeInfo from "./components/NodeInfo";
  import BlockInfo from "./components/BlockInfo";
  export default {
    name: "explorer-node",
    components: { BlockInfo, NodeInfo, BlockChainInfo },
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

      handleUpdate () {
        this.$emit('update')
      },

      handleDelete () {
        this.$emit('delete')
      }
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
