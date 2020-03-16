<template>
  <div class="configuration padding-20">
    <div class="page-title">{{ $t('configuration.configuration')}}</div>

    <div class="im-card">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('configuration.quickConfig')" name="quick"></el-tab-pane>
        <el-tab-pane :label="$t('configuration.defineConfig')" name="define"></el-tab-pane>
        <!--<el-tab-pane label="$t('configuration.importConfig')" name="import"></el-tab-pane>-->
      </el-tabs>

      <component :is="activeComponent" />
    </div>
  </div>
</template>

<script>
export default {
  name: "configuration",
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
        if (val === 'define') val = 'define/genesis'

        this.$router.push({
          path: '/configuration/' + val
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
      this.$eventBus.$emit('menuActiveIndex', '/configuration/quick')
    }
  }
}
</script>

<style lang="scss" scoped>
.configuration {
  position: relative;
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
