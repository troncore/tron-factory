<template>
  <div class="explorer padding-20">
    <div class="page-title">{{ $t('explorer.explorer')}}</div>

    <div class="im-card" v-if="hideExplorer">
      <el-button class="add-node el-icon-plus" type="text" @click="dialogVisible = true">{{ $t('explorer.configNode')}}</el-button>
    </div>
    <explorer-node
      v-else
      :config-form="configForm"
      @update="handleUpdate"
      @delete="handleDelete" />

    <!-- dialog -->
    <config-node :visible.sync="dialogVisible" @initConfig="handleInitConfig" />
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
        hideExplorer: true,
        dialogVisible: false,
        configForm: {},
      }
    },
    methods: {
      handleInitConfig (configForm) {
        this.configForm = configForm

        this.hideExplorer = false
      },

      handleUpdate () {
        this.dialogVisible = true
      },

      handleDelete () {
        this.hideExplorer = true
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