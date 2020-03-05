<template>
  <div class="nodes-manage padding-20">

    <div class="nav-list">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/nodes-manage' }"><b>节点管理</b></el-breadcrumb-item>
        <el-breadcrumb-item v-if="opType === 'add'" :to="{ path: '/nodes-manage/add' }">添加节点</el-breadcrumb-item>
        <el-breadcrumb-item v-else-if="opType === 'update'" :to="{ path: '/nodes-manage/update' }">修改节点</el-breadcrumb-item>
        <el-breadcrumb-item v-else-if="opType === 'detail'" :to="{ path: '/nodes-manage/detail' }">节点详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>


    <transition name="fade" mode="out-in">
      <component :is="currentViewComponent" :op-type="opType"/>
    </transition>
  </div>
</template>

<script>
import NodeList from './node-list'
export default {
  name: "nodes-manage",
  components: {
    NodeList,
    NodeEdit: () => import('./node-edit'),
    NodeDetail: () => import('./node-detail')
  },
  data () {
    return {

    }
  },
  computed: {
    // page operate type
    opType () {
      return this.$route.params.type
    },
    opNodeId () {
      return this.$route.params.id
    },
    currentViewComponent () {
      let result = 'NodeList'
      switch (this.opType) {
        case 'add':
        case 'update':
          result = 'NodeEdit'
          break
        case 'detail':
          result = 'NodeDetail'
          break
      }
      return result
    },
  },
  created() {
  },
  methods: {

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
