<template>
  <div class="nodes-manage padding-20">

    <div class="nav-list">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/nodes-manage' }"><b>节点管理</b></el-breadcrumb-item>
        <el-breadcrumb-item v-if="opType === 'node-add'">添加节点</el-breadcrumb-item>
        <el-breadcrumb-item v-else-if="opType === 'node-edit'">修改节点</el-breadcrumb-item>
        <el-breadcrumb-item v-else-if="opType === 'node-detail'">节点详情</el-breadcrumb-item>
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
  data () {
    return {
      componentPageList: ['node-add', 'node-edit', 'node-detail']
    }
  },
  computed: {
    opType () {
      return this.$route.params.type
    },
    currentComponentPage () {
      let result = 'NodeList'
      switch (this.opType) {
        case 'node-add':
        case 'node-edit':
        case 'node-detail':
          result = 'NodeInfo'
          break
      }
      return result
    },
  },
  watch: {
    opType: {
      handler(type) {
        if (type && !this.componentPageList.includes(type))
          this.$router.push({path: '/nodes-manage'})
      },
      immediate: true
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
      }
    }
  }
}
</style>
