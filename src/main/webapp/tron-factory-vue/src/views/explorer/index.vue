<template>
  <div class="explorer padding-20">
    <div class="page-title">{{ $t('浏览')}}</div>

    <div class="im-card" v-if="!canExplorerNode">
      <el-button class="add-node el-icon-plus" type="text" @click="handleAdd">{{ $t('配置节点')}}</el-button>
    </div>
    <explorer-node v-else @update="handleUpdate" @delete="handleDelete" />

    <config-node :visible.sync="dialogVisible" @success="handleAddSuccessful" />
  </div>
</template>

<script>
  import ExplorerNode from "./explorer-node";
  import ConfigNode from "./ConfigNode";
  export default {
    name: "explorer",
    components: { ConfigNode, ExplorerNode },
    data () {
      return {
        dialogVisible: false,
        canExplorerNode: false,
      }
    },
    methods: {
      handleAdd () {
        this.dialogVisible = true
      },

      handleAddSuccessful () {
        this.canExplorerNode = true
      },

      handleUpdate () {
        this.dialogVisible = true
      },

      handleDelete () {
        this.canExplorerNode = false
      }

    }
  }
</script>


<style lang="scss" scoped>
.explorer {
  position: relative;
  .page-title {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 18px;
    color: #000000;
  }

  .add-node {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 100%;
    height: 50px;
    font-size: 14px;
  }
}
</style>
>