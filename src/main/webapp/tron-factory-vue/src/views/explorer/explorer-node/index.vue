<template>
  <div class="explorer-node">

    <div class="node-summary im-card">
      <div class="node-item node-ip">
        <span class="label">{{ $t('节点IP')}}：</span>
        <span class="value">{{ '123.123.123.123' }}</span>
      </div>
      <div class="node-item http-port">
        <span class="label">{{ $t('HTTP端口')}}：</span>
        <span class="value">{{ '12345' }}</span>
      </div>
      <div class="node-item operator">
        <el-button type="text" class="update" @click="handleUpdate">{{ $t('修改')}}</el-button>
        <el-button type="text" class="delete" @click="handleDelete">{{ $t('删除')}}</el-button>
      </div>
    </div>

    <div class="node-detail im-card">
      <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane label="区块链信息" name="1"><block-chain-info /></el-tab-pane>
        <el-tab-pane label="节点信息" name="2"><node-info /></el-tab-pane>
        <el-tab-pane label="块信息" name="3"><block-info /></el-tab-pane>
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
    },
    data () {
      return {
        activeTab: '1'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
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