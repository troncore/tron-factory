<template>
  <div class="nodes-manage padding-20">

    <div class="nav-list">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/nodes-manage' }"><b>节点管理</b></el-breadcrumb-item>
        <el-breadcrumb-item v-if="pageType === 'add'">添加节点</el-breadcrumb-item>
        <el-breadcrumb-item v-else-if="pageType === 'edit'">修改节点</el-breadcrumb-item>
        <el-breadcrumb-item v-else-if="pageType === 'detail'">节点详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>


    <transition name="fade" mode="out-in">
      <component :is="currentComponentPage"/>
    </transition>
  </div>
</template>

<script>
import NodeList from './node-list'
export default {
  name: "nodes-manage",
  components: {
    NodeList,
    NodeInfo: () => import('./node-info'),
  },
  computed: {
    pageType () {
      return this.$route.params.type
    },
    currentComponentPage () {
      return ['add', 'edit', 'detail'].includes(this.pageType) ? 'NodeInfo' : 'NodeList'
    },
  },
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
      }
    }
  }
}
</style>
