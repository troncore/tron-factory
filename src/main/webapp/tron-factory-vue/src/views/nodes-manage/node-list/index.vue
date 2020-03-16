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
          <el-tag size="mini" type="success" v-if="scope.row.isDeployed">{{$t('nodesManage.deployed')}}</el-tag>
          <el-tag size="mini" type="info" v-else>{{$t('nodesManage.unDeploy')}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="javaTronVersion" :label="$t('nodesManage.javaTronVersion')" align="center"></el-table-column>

      <el-table-column prop="status" :label="$t('base.operate')">
        <template slot-scope="scope">
          <el-button type="text" @click="handleLogs(scope.row)">{{$t('base.logs') }}</el-button>
          <el-button v-if="scope.row.isDeployed" type="text" @click="handleDetail(scope.row)">{{$t('base.detail') }}</el-button>
          <el-button v-if="!scope.row.isDeployed" type="text" @click="handleUpdate(scope.row)">{{$t('base.edit') }}</el-button>
          <el-button v-if="!scope.row.isDeployed" type="text" @click="handleDelete(scope.row)">{{$t('base.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- view deploy log-->
    <log-dialog
      v-if="logDialogVisible"
      :visible.sync="logDialogVisible"
      :current-row="currentViewRow">
    </log-dialog>
  </div>
</template>

<script>
import LogDialog from "./components/LogDialog";
export default {
  name: "node-list",
  components: { LogDialog },
  data () {
    return {
      tableData: [],
      tableLoading: false,
      deployLoading: false,
      logDialogVisible: false,
      currentViewRow: {},
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
        path: '/nodes-manage/add'
      })
    },

    handleUpdate(row) {
      this.$router.push({
        path: '/nodes-manage/edit/' + row.id
      })
    },

    handleDetail(row) {
      this.$router.push({
        path: '/nodes-manage/detail/' + row.id
      })
    },

    handleDelete(row) {
      this.$confirm(this.$t('nodesManage.deleteNodeTips'), this.$t('nodesManage.deleteNodeTipsTitle'), {
        confirmButtonText: this.$t('base.confirm'),
        cancelButtonText: this.$t('base.cancel'),
        center: true,
        customClass: 'im-message-box',
        cancelButtonClass: 'im-message-cancel-button',
        confirmButtonClass: 'im-message-confirm-button',
      }).then(() => {
        this.$_api.nodesManage.deleteNoteInfo({ id: row.id }, err => {
          if (err) return

          this.$notify({
            type: 'success',
            title: this.$t('base.successful'),
            message: this.$t('base.success.delete'),
          })
          this.getNodeList()
        })
      }).catch(() => {
        this.$notify.info({
          title: this.$t('base.cancel'),
          message: this.$t('base.cancelDelete'),
        });
      })
    },

    // start deploy node
    async handleDeploy (params) {
      let errorMsg = ''
      if (!this.tableData.length)
        errorMsg = this.$t('nodesManage.pleaseAddNode')
      else if (this.tableData.every(node => node.isDeployed))
        errorMsg = this.$t('nodesManage.allNodeDeployed')
      // else if ('是否已完成配置') // TODO
      //   errorMsg = 'this.$t('nodesManage.pleaseAddNode')'
      else if (!this.tableData.some(node => node.isSR && !node.needSyncCheck))
        errorMsg = this.$t('nodesManage.needSRnoSyncCheck')

      if (errorMsg) {
        this.$notify({
          title: this.$t('base.warning'),
          message: errorMsg,
          type: 'warning'
        })
        return
      }

      this.deployLoading = true
      let deployPromises = this.tableData.map(node => this.deployNode(node, params))
      await Promise.all(deployPromises)

      this.$notify({
        title: this.$t('base.successful'),
        message: this.$t('nodesManage.deployingTips'),
        type: 'success'
      });

      this.pollCheckDeployment()
    },

    // deploy node
    deployNode (node = {}, params = {}) {
      return new Promise(resolve => {
        this.$_api.nodesManage.deployNode({
          id: node.id,
          isSR: node.isSR,
          path: params.filePath, // TODO  ignore params
        }, err => {
          if (err) resolve({id: node.id, ok: false})
          else resolve({id: node.id, ok: true})
        })
      })
    },

    // refresh deployed node list
    pollCheckDeployment () {
      let deployedNodeIds = this.tableData.map(node => node.id)

      let loading = false
      let timeID = setInterval(() => {
        if (!loading) {
          loading = true // the network may slow

          this.$_api.nodesManage.checkNode(deployedNodeIds, (err, res) => {
            loading = false
            if (err) {
              this.deployLoading = false
              clearInterval(timeID)
              return
            }

            // check all deployed node whether if finish deployed
            if (Object.values(res).every(val => val === 'deploy finish')) {
              this.deployLoading = false
              this.getNodeList()
              clearInterval(timeID)
            }
          })
        }

      }, 1000 * 5)
    },

    handleLogs(row) {
      this.logDialogVisible = true
      this.currentRow = row
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
