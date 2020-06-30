<template>
  <div class="node-conf padding-20">
    <div class="page-title">{{ $t('节点配置')}}</div>

    <div class="im-card">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('快速配置')" name="quick"></el-tab-pane>
        <el-tab-pane :label="$t('自定义配置')" name="custom"></el-tab-pane>
      </el-tabs>

      <component :is="activeComponent" />
    </div>
  </div>
</template>

<script>
export default {
  name: "node-conf",
  components: {
    QuickConfig: () => import('./quick'),
    CustomConfig: () => import('./custom'),
  },
  data () {
    return {}
  },
  computed: {
    opNodeId () {
      let id = this.$route.query.id
      return /\d+/.test(id) ? Number(id) : undefined
    },
    activeName: {
      get () {
        // this.activeMenuIndex()
        return this.$route.params.type
      },
      set (val) {
        if (val === 'custom') val = 'custom/base'
        this.$router.push('/node-config/' + val + '?id=' + this.opNodeId)
      }
    },
    activeComponent () {
      switch (this.activeName) {
        case 'quick':
          return 'QuickConfig'
        case 'custom':
          return 'CustomConfig'
      }
    },
  },
  created () {
    this.activeMenuIndex()
    this.hasBlockChain()
  },
  methods: {
    activeMenuIndex () {
      this.$eventBus.$emit('menuActiveIndex', '/get-started')
    },
    hasBlockChain () {
      this.$_api.getStarted.hasBlockChain({}, (err, res) => {
        if (err) return
        if (res !== true) this.$router.push('/get-started')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.node-conf {
  margin-bottom: 100px;
  position: relative;
}
.page-title {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 18px;
  color: $black-light;
}

.el-tabs {
  /*margin-bottom: 10px;*/
}
.im-card {
  padding: 10px 20px 20px;
  margin-bottom: 20px;
  .card-header {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 14px;
    color: $black-light;
    @media all and (max-width: 1439px) {
      font-size: 15px;
    }
  }
}
</style>
