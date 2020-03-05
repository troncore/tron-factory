<template>
  <div class="node-list">
    <div class="help-tools">
      <el-button class="el-icon-plus" type="primary" @click="handleAddNode"> {{ $t('nodesManage.addNode') }}</el-button>
      <el-button class="el-icon-caret-right" type="success" :loading="deployLoading" @click="handleDeploy"> {{ $t('nodesManage.deploy') }}</el-button>
    </div>

    <el-table
      :data="tableData"
      :empty-text="$t('base.emptyData')"
      v-loading="tableLoading"
      class="custom-table im-card"
      header-align="center">
      <el-table-column prop="ip" :label="$t('nodesManage.nodeIP')" align="center"></el-table-column>
      <el-table-column prop="port" :label="$t('nodesManage.nodePort')" align="center"></el-table-column>
      <el-table-column :label="$t('nodesManage.isSR')" align="center">
        <template slot-scope="scope">
          <span class="color-success" v-if="scope.row.isSR">YES</span>
          <span class="color-info" v-else>NO</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('nodesManage.deployStatus')" align="center">
        <template slot-scope="scope">
          <el-tag size="mini" type="success" v-if="scope.row.deployed_status">{{$t('nodesManage.deployed')}}</el-tag>
          <el-tag size="mini" type="info" v-else>{{$t('nodesManage.unDeploy')}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="java_tron_version" :label="$t('nodesManage.version')+'(java-tron)'" align="center"></el-table-column>

      <el-table-column prop="status" :label="$t('base.operate')">
        <template slot-scope="scope">
          <el-button type="text" @click="handleLogs(scope.row)">{{$t('base.logs') }}</el-button>
          <el-button v-if="scope.row.deployed_status" type="text" @click="handleDetail(scope.row)">{{$t('base.detail') }}</el-button>
          <el-button v-if="!scope.row.deployed_status" type="text" @click="handleUpdate(scope.row)">{{$t('base.edit') }}</el-button>
          <el-button v-if="!scope.row.deployed_status" type="text" @click="handleDelete(scope.row)">{{$t('base.delete') }}</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: "node-list",
  data () {
    return {
      tableData: [],
      tableLoading: false,
      deployLoading: false,
    }
  },
  created() {
    this.getNodeList()
  },
  methods: {
    getNodeList () {
      this.tableLoading = true
      this.$_api.nodesManage.getNodeList({}, (err, res) => {
        this.tableLoading = false
        if (err) return

        this.tableData = res
      })
    },

    handleAddNode() {
      this.$router.push({
        path: '/nodes-manage/node-add'
      })
    },

    handleUpdate(row) {
      this.$router.push({
        path: '/nodes-manage/node-edit'
      })
    },

    handleDetail(row) {
      this.$router.push({
        path: '/nodes-manage/node-detail'
      })
    },

    handleDelete(row) {

    },

    handleDeploy() {

    },

    handleLogs(row) {

    },
  }
}
</script>

<style lang="scss" scoped>
.node-list {
  .help-tools {
    margin-bottom: 20px;
    .el-button + .el-button {
      margin-left: 20px;
    }
  }
}
.color-success {
  color: #67c23a;
}
.color-info {
  color: #909399;
}
</style>
