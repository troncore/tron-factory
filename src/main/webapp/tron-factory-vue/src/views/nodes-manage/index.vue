<template>
  <div class="nodes-manage page-view">
    <div class="help-tools">
      <el-button @click="handleAddNode">{{ $t('nodesManage.addNode') }}</el-button>
      <el-button @click="handleConfig">{{ $t('nodesManage.config') }}</el-button>
      <el-button @click="handleDeploy">{{ $t('nodesManage.deploy') }}</el-button>
      <el-button @click="handleRefresh">{{ $t('nodesManage.refresh') }}</el-button>
    </div>


    <el-table
      :data="tableData"
      :empty-text="$t('base.emptyData')"
      v-loading="tableLoading"
      class="custom-table"
      header-align="center"
      border>
      <el-table-column prop="ip" :label="$t('nodesManage.nodeIP')" align="center"></el-table-column>
      <el-table-column prop="port" :label="$t('nodesManage.nodePort')" align="center"></el-table-column>
      <el-table-column :label="$t('nodesManage.isSR')" align="center">
        <template slot-scope="scope">
          <el-tag size="medium" type="success" v-if="scope.row.isSR">YES</el-tag>
          <el-tag size="medium" type="danger" v-else>NO</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('nodesManage.deployStatus')" align="center">
        <template slot-scope="scope">
          <el-tag size="medium" type="success" v-if="scope.row.isDeploy">{{$t('nodesManage.deployed')}}</el-tag>
          <el-tag size="medium" type="danger" v-else>{{$t('nodesManage.unDeploy')}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="java_tron_version" :label="$t('nodesManage.version')+'(java-tron)'" align="center"></el-table-column>

      <el-table-column prop="status" :label="$t('base.operate')" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleLogs(scope.row)">{{$t('base.logs') }}</el-button>
          <el-button type="text" @click="handleUpdate(scope.row)">{{$t('base.modify') }}</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">{{$t('base.delete') }}</el-button>
          <el-button type="text" @click="handleDetail(scope.row)">{{$t('base.detail') }}</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: "nodes-manage",
  data () {
    return {
      tableData: [],
      tableLoading: false,
    }
  },
  methods: {
    handleAddNode() {
      this.$router.push({
        path: '/nodes-manage/node-edit'
      })
    },
    handleConfig() {

    },
    handleDeploy() {

    },
    handleRefresh() {

    },
    handleLogs(row) {

    },
    handleUpdate(row) {

    },
    handleDelete(row) {

    },
    handleDetail(row) {

    },
  }
}
</script>

<style lang="scss" scoped>
.nodes-manage {
  .help-tools {
    margin-bottom: 20px;
  }
}
</style>
