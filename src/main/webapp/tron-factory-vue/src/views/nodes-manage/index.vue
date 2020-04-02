<template>
  <div class="nodes-manage padding-20">

    <div class="nav-list">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/nodes-manage' }">{{ $t('nodesManage.nodesManage') }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="pageType === 'add'">{{ $t('nodesManage.addNode') }}</el-breadcrumb-item>
        <el-breadcrumb-item v-else-if="pageType === 'edit'">{{ $t('nodesManage.modifyNode') }}</el-breadcrumb-item>
        <el-breadcrumb-item v-else-if="pageType === 'detail'">{{ $t('nodesManage.nodeDetail') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <transition name="fade" mode="out-in">
      <node-list v-if="!pageType"></node-list>
      <node-info v-else></node-info>
    </transition>
  </div>
</template>

<script>
export default {
  name: "nodes-manage",
  components: {
    NodeList: () => import('./node-list'),
    NodeInfo: () => import('./node-info'),
  },
  computed: {
    pageType () {
      this.activeMenuIndex()
      return this.$route.params.type
    },
  },
  mounted () {
    this.initP2PVersion()
    this.activeMenuIndex()
  },
  methods: {
    activeMenuIndex () {
      this.$eventBus.$emit('menuActiveIndex', '/nodes-manage')
    },
    initP2PVersion (){
      this.$_api.configuration.oneClick({}, err => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.nodes-manage {
  .nav-list {
    padding-bottom: 20px;
    /deep/ .el-breadcrumb {
      font-size: 18px;
      .el-breadcrumb__inner {
        font-size: 18px;

        &.is-link {
          color: #000;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
