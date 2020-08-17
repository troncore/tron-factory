<template>
  <div class="explorer padding-20">
    <div class="page-title">{{ $t('explorer.explorer')}}</div>

    <div class="im-card" v-if="hideExplorer">
      <el-button class="add-node" type="text" @click="dialogVisible = true"><i class="el-icon-plus"></i> {{ $t('explorer.configNode')}}</el-button>
    </div>
    <!-- result -->
    <select-result v-else :config-form="configForm" @update="handleUpdate" @delete="handleDelete" />

    <!-- dialog -->
    <select-node v-if="dialogVisible" :visible.sync="dialogVisible" @initConfig="handleInitConfig" />
  </div>
</template>

<script>
  import SelectResult from "./select-result";
  import SelectNode from "./SelectNode";
  export default {
    name: "explorer",
    components: { SelectNode, SelectResult },
    data () {
      return {
        hideExplorer: true,
        dialogVisible: false,
        configForm: {},
      }
    },
    created () {
      this.activeMenuIndex()
      this.getConfigForm()
    },
    methods: {
      // for keep-alive reactive the side-nav highlight
      activeMenuIndex () {
        this.$eventBus.$emit('menuActiveIndex', '/explorer')
      },

      getConfigForm () {
        let rawStr = localStorage.getItem('configForm')
        let configForm = rawStr && JSON.parse(rawStr)
        if (configForm && configForm.nodeType && configForm.nodeURL) {
          this.handleInitConfig(configForm)
        } else {
          localStorage.removeItem('configForm')
        }
      },

      handleInitConfig (configForm) {
        localStorage.setItem('configForm', JSON.stringify(configForm))
        this.configForm = configForm
        this.hideExplorer = false
      },

      handleUpdate () {
        this.dialogVisible = true
      },

      handleDelete () {
        localStorage.removeItem('configForm')
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
