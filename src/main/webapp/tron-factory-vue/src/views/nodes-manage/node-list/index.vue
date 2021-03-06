<template>
  <div class="node-list">
    <div class="form-item">
      <span class="label">
        {{$t('nodesManage.encryption')}}<el-tooltip effect="dark" :content="$t('nodesManage.helpTips.crypto')" placement="top"><i class="fa fa-question-circle-o" style="margin: 0 5px;"></i> </el-tooltip>:
      </span>
      <el-radio-group v-model="form.crypto" :disabled="tableLoading || !!tableData.length" @change="handleChangeCrypto">
        <el-radio :label="'eckey'">ECKey</el-radio>
        <el-radio :label="'sm2'">SM2</el-radio>
      </el-radio-group>
    </div>

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
      <el-table-column prop="ip" :label="$t('nodesManage.nodeIP')" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.isDeployed">{{ scope.row.ip }}</span>
          <el-link v-else type="primary" @click="handleDetail(scope.row)">{{ scope.row.ip }}</el-link>
        </template>
      </el-table-column>
      <!--<el-table-column prop="port" :label="$t('nodesManage.nodePort')" align="center"></el-table-column>-->
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

      <!--<el-table-column prop="javaTronVersion" :label="$t('nodesManage.javaTronVersion')" align="center"></el-table-column>-->

      <el-table-column prop="operate" :label="$t('base.operate')">
        <template slot-scope="scope">
          <el-button v-if="scope.row.ifShowLog" type="text" @click="handleLogs(scope.row)">{{$t('nodesManage.deployLog') }}</el-button>
          <el-button v-if="scope.row.isDeployed" type="text" @click="handleDetail(scope.row)">{{$t('nodesManage.nodeDetails') }}</el-button>

          <el-button v-if="!scope.row.isDeployed" type="text" @click="handleUpdate(scope.row)">{{$t('base.edit') }}</el-button>
          <el-button v-if="!scope.row.isDeployed" type="text" @click="handleDelete(scope.row)">{{$t('base.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- deploy node  -->
    <deploy-dialog
      v-if="deployDialogVisible"
      :visible.sync="deployDialogVisible"
      :deployLoading.sync="deployLoading"
      @refreshList="getNodeList"
      @checkDeployStatus="checkDeployStatus"/>

    <!-- view deploy log-->
    <log-dialog v-if="logDialogVisible" :visible.sync="logDialogVisible" :current-row="currentRow" />

  </div>
</template>

<script>
import LogDialog from "./components/LogDialog";
import DeployDialog from "./components/DeployDialog";
export default {
  name: "node-list",
  components: { LogDialog, DeployDialog },
  data () {
    return {
      form: {
        crypto: '',
      },
      tableData: [],
      tableLoading: false,
      deployLoading: false,

      deployDialogVisible: false,
      logDialogVisible: false,

      currentRow: {},
      timeID: null,
    }
  },
  created() {
    this.getCrypto()
    this.getNodeList()
  },
  destroyed() {
    clearTimeout(this.timeID)
  },
  methods: {
    getCrypto () {
      this.$_api.nodesManage.getCrypto({}, (err, res = {}) => {
        if (err) return
        this.form.crypto = res.crypto || this.form.crypto
      })
    },

    handleChangeCrypto () {
      this.$_api.nodesManage.updateCrypto(this.form, (err, res) => {
        if (err) return
        this.$notify({
          type: 'success',
          title: this.$t('base.successful'),
          message: this.$t('base.success.update'),
        })
      })
    },


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

    // ready deploy node
    handleDeploy() {
      let errorMsg = ''
      if (!this.tableData.length)
        errorMsg = this.$t('nodesManage.pleaseAddNode')
      else if (this.tableData.every(node => node.isDeployed))
        errorMsg = this.$t('nodesManage.allNodeDeployed')
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

      this.checkConfigStatus()
    },

    checkConfigStatus () {
      this.deployLoading = true
      this.$_api.configuration.checkConfig({}, (err, res = {}) => {
        this.deployLoading = false
        if (err) return
        if (res.status === 0) {
          // config ok
          this.$confirm(this.$t('nodesManage.sureConfigDeploy'), this.$t('base.tips'), {
            cancelButtonText: this.$t('nodesManage.updateConfig'),
            confirmButtonText: this.$t('nodesManage.sureDeploy'),
            center: true,
            customClass: 'im-message-box',
            cancelButtonClass: 'im-message-cancel-button primary',
            confirmButtonClass: 'im-message-confirm-button primary',
          }).then(() => {
            setTimeout(() => this.deployDialogVisible = true, 200)

          }).catch(() => {
            this.$router.push({
              path: '/configuration/quick'
            })
          })

        } else if (res.status === 1) {
          // do config

          this.$confirm(this.$t('nodesManage.todoConfig'), this.$t('base.tips'), {
            cancelButtonText: this.$t('nodesManage.inputLater'),
            confirmButtonText: this.$t('nodesManage.inputNow'),
            center: true,
            customClass: 'im-message-box',
            cancelButtonClass: 'im-message-cancel-button primary',
            confirmButtonClass: 'im-message-confirm-button primary',
          }).then(() => {
            this.$router.push({
              path: '/configuration/quick'
            })
          }).catch(() => {})
        }
      })
    },


    // refresh deployed node list
    checkDeployStatus () {
      let flag = false
      this.deployLoading = true
      this.timeID = setInterval(() => {
        if (!flag) {
          flag = true // the network may slow，avoid frequently to call ajax

          this.$_api.nodesManage.checkNode({}, (err, res) => {
            flag = false
            if (err) {
              this.deployLoading = false
              clearInterval(this.timeID)
              return
            }

            // check all deployed node whether if finish deployed
            if (res === true) {
              this.deployLoading = false
              this.getNodeList()
              clearInterval(this.timeID)
            }
          })
        }
      }, 1000 * 3)
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
  .form-item {
    margin-bottom: 20px;
    span {
      margin-right: 10px;
      color: #606266;
    }
  }

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
