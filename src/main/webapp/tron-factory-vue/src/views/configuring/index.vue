<template>
  <div class="configuring padding-20">
    <div class="page-title">配置</div>

    <div class="im-card">
      <el-tabs v-model="activeName">
        <el-tab-pane label="快速配置" name="quick"></el-tab-pane>
        <el-tab-pane label="自定义配置" name="define"></el-tab-pane>
        <el-tab-pane label="导入配置文件" name="import"></el-tab-pane>
      </el-tabs>

      <component :is="activeComponent" />
    </div>
  </div>
</template>

<script>
export default {
  name: "configuring",
  components: {
    QuickConfig: () => import('./quick'),
    DefineConfig: () => import('./define'),
    ImportConfig: () => import('./import'),
  },
  data () {
    return {
    }
  },
  computed: {
    activeName: {
      get () {
        this.activeMenuIndex()
        return this.$route.params.type
      },
      set (val) {
        this.$router.push({
          path: '/configuring/' + val
        })
      }
    },
    activeComponent () {
      switch (this.activeName) {
        case 'quick':
          return 'QuickConfig'
        case 'define':
          return 'DefineConfig'
        case 'import':
          return 'ImportConfig'
      }
    },
  },
  mounted () {
    this.activeMenuIndex()
  },
  methods: {
    activeMenuIndex () {
      this.$eventBus.$emit('menuActiveIndex', '/configuring/quick')
    }
  }
}
</script>

<style lang="scss" scoped>
.configuring {
  .page-title {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 18px;
    color: #000000;
  }

  .im-card {
    padding: 10px 20px 20px;
  }
  .el-tabs {
    margin-bottom: 10px;
  }
}
</style>
