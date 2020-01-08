<template>
  <div class="page-view deploy-nodes">

    <div class="box-view">
      <div class="page-header">
        <el-button class="im-button large" :loading="batchDeployLoading" type="primary" @click="handleOpenDeployDialog">{{ $t('deployNodes.batchDeploy') }}</el-button>
      </div>
      <el-table
        :data="tableData"
        :empty-text="$t('base.emptyData')"
        v-loading="tableLoading"
        class="custom-table"
        header-align="center"
        border
        @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="100" align="center"></el-table-column>

        <el-table-column prop="id" label="ID" align="center"></el-table-column>

        <el-table-column prop="userName" :label="$t('deployNodes.sshUserName')" align="center"></el-table-column>

        <el-table-column prop="ip" label="HOST" align="center"></el-table-column>

        <el-table-column prop="port" label="SSH PORT" align="center"></el-table-column>

        <el-table-column :label="$t('deployNodes.isSR')" align="center">
          <template slot-scope="scope">
            <el-tag size="medium" type="success" v-if="scope.row.isSR">YES</el-tag>
            <el-tag size="medium" type="danger" v-else>NO</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="status" :label="$t('base.operate')" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleViewDeployLog(scope.row)">{{$t('deployNodes.viewLog') }}</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <!-- deploy node  -->
    <deploy-dialog
      v-if="deployDialogVisible"
      :visible.sync="deployDialogVisible"
      @deploy="handleDeploy">
    </deploy-dialog>

    <!-- view deploy log-->
    <log-dialog
      v-if="logDialogVisible"
      :visible.sync="logDialogVisible"
      :current-row="currentViewRow">
    </log-dialog>
  </div>
</template>
<script>
import DeployDialog from "./components/DeployDialog"
import LogDialog from "./components/LogDialog"

export default {
  name: 'deploy-nodes',
  components: { LogDialog, DeployDialog },
  data() {
    return {
      batchDeployLoading: false,

      tableData: [],
      tableLoading: false,
      tableSelections: [],
      currentViewRow: {},

      deployDialogVisible: false,
      logDialogVisible: false,

    }
  },
  computed: {
    batchDeployBtnType () {
      return this.tableSelections.length ?  'success' : 'info'
    }
  },

  created() {
    this.getNodeList()
  },

  methods: {
    // get table data
    getNodeList () {
      this.tableLoading = true
      this.$_api.nodeList.allNodeInfo({}, (err, res) => {
        this.tableLoading = false
        if (err) return

        this.tableData = res.sort((a, b) => a.id - b.id)
      })
    },

    // record selected table data
    handleSelectionChange(val) {
      this.tableSelections = val
    },

    // open deploy dialog
    handleOpenDeployDialog() {
      if (!this.tableSelections.length) {
        this.$message({
          type: 'warning',
          message: this.$t('deployNodes.mustSelectNodes'),
        })
        return
      }

      this.deployDialogVisible = true
    },

    // start deploy node
    async handleDeploy (params) {
      this.deployDialogVisible = false

      this.batchDeployLoading = true
      let deployPromises = this.tableSelections.map(node => this.deployNode(node, params))
      await Promise.all(deployPromises)

      this.$message({
        type: 'success',
        message: this.$t('deployNodes.deployingTips'),
      })

      this.refreshDeployedNodeList()
    },

    // deploy node
    deployNode (node = {}, params = {}) {
      return new Promise(resolve => {
        this.$_api.nodeList.deployNode({
          id: node.id,
          isSR: node.isSR,
          path: params.filePath,
        }, err => {
          if (err) resolve({id: node.id, ok: false})
          else resolve({id: node.id, ok: true})
        })
      })
    },

    // refresh deployed node list
    refreshDeployedNodeList () {
      let deployedNodeIds = this.tableSelections.map(node => node.id)

      let loading = false
      let timeID = setInterval(() => {
        if (!loading) {
          loading = true // the network may slow

          this.$_api.nodeList.checkNode(deployedNodeIds, (err, res) => {
            loading = false
            if (err) {
              this.batchDeployLoading = false
              clearInterval(timeID)
              return
            }

            // check all deployed node whether if finish deployed
            if (Object.values(res).every(val => val === 'deploy finish')) {
              this.batchDeployLoading = false
              clearInterval(timeID)
            }
          })
        }

      }, 1000 * 5)
    },

    // view deploy log
    handleViewDeployLog (row) {
      this.logDialogVisible = true
      this.currentViewRow = row
    },

  },
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.deploy-nodes {
  .page-header {
    margin-bottom: 20px;
  }
}
</style>
