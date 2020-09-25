<template>
  <div class="node-list im-card">
    <div class="card-header">
      <div class="card-title">{{ $t('getStarted.dashboard.nodeInfo')}}</div>
      <div class="op-list">
        <div class="left">
        </div>
        <div class="right">
          <el-button class="im-button mini" :disabled="!deployNodesIds || reRunIndexs.length || deployLoading" @click="handleDeploy()">
            <i :class="deployLoading ? 'el-icon-loading' : 'el-icon-caret-right'"></i> {{ $t(deployLoading ? 'getStarted.dashboard.runningNode' : 'getStarted.dashboard.runNode') }}
          </el-button>
          <el-button class="im-button mini" type="primary" @click="handleAddNode()"><i class="el-icon-plus"></i> {{ $t('getStarted.dashboard.addNode') }}</el-button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-box">
        <el-table
          :data="tableData"
          :empty-text="$t('base.emptyData')"
          v-loading="tableLoading"
          class="custom-table"
          border
          header-align="center"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" width="60" :selectable="handleSelectable"></el-table-column>
          <el-table-column prop="ip" :label="$t('getStarted.dashboard.ip')" align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click="handleDetail(scope.row)">{{ scope.row.ip }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="listenPort" :label="$t('getStarted.dashboard.listenPort')" align="center"></el-table-column>
          <el-table-column prop="isSR" :label="$t('getStarted.dashboard.nodeType')" align="center">
            <template slot-scope="scope">
              <span class="color-success" v-if="scope.row.isSR">{{ $t('getStarted.dashboard.superNode') }}</span>
              <span class="color-info" v-else>{{ $t('getStarted.dashboard.fullNode') }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="deployStatus" :label="$t('getStarted.dashboard.deployStatus')" align="center">
            <template slot-scope="scope">
              <el-tag size="mini" type="success" v-if="scope.row.deployStatus === 1">{{$t('getStarted.dashboard.deploySuccess')}}</el-tag>
              <el-tag size="mini" type="info"  v-else>{{$t('getStarted.dashboard.deployStop')}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="createTime" :label="$t('getStarted.dashboard.createNodeTime')" align="center" width="200"></el-table-column>

          <el-table-column prop="operate" :label="$t('base.operate')" align="center" width="280">
            <template slot-scope="scope">
              <!-- 停止 -->
              <el-button  v-if="scope.row.showStop" :disabled="scope.row.deployStatus !== 1" type="text" @click="handleStop(scope.row, scope.$index)" :loading="stopIndexs.includes(scope.$index)">
                {{ $t(stopIndexs.includes(scope.$index) ? '' : 'getStarted.dashboard.stopRunNode') }}
              </el-button>
              <!-- 继续 -->
              <el-button v-else type="text" :disabled="deployLoading" @click="handleRerun(scope.row, scope.$index)" :loading="reRunIndexs.includes(scope.$index)">
                {{ $t(reRunIndexs.includes(scope.$index) ? '' : 'getStarted.dashboard.continueRunNode') }}
              </el-button>
              <el-divider direction="vertical"></el-divider>

              <!-- 详情 -->
              <el-button type="text" @click="handleDetail(scope.row)">{{ $t('base.detail') }}</el-button>
              <el-divider direction="vertical"></el-divider>

              <!-- 配置 -->
              <el-button :disabled="scope.row.deployStatus === 1" type="text" @click="handleConfig(scope.row)">{{ $t('getStarted.dashboard.nodeConfig') }}</el-button>
              <el-divider direction="vertical"></el-divider>

              <!-- 重置 -->
              <el-button :disabled="scope.row.deployStatus === 1" type="text" @click="handleReset(scope.row, scope.$index)" :loading="resetIndexs.includes(scope.$index)">
                {{ $t(resetIndexs.includes(scope.$index) ? '' : 'getStarted.dashboard.resetNode') }}
              </el-button>
              <el-divider direction="vertical"></el-divider>

              <!-- 日记 -->
              <el-button type="text" @click="handleLog(scope.row)"><span :class="{'color-danger': scope.row.isError}">{{ $t('base.logs') }}</span></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-footer">
        <el-button class="im-button mini" @click="handleImportTable"><i class="el-icon-upload2"></i> {{ $t('getStarted.dashboard.importList') }}</el-button>
        <el-button class="im-button mini" :disabled="!tableData.length" @click="handleExportTable"><i class="el-icon-download"></i> {{ $t('getStarted.dashboard.exportList') }}</el-button>
      </div>
    </div>

    <node-deploy
      :visible.sync="deployDialogVisible"
      :ids="deployNodesIds"
      :deploy-loading.sync="deployLoading"
      @getNodeList="() => getNodeList(true)"/>

    <!-- view deploy log-->
    <node-log v-if="logDialogVisible" :visible.sync="logDialogVisible" :current-row="currentRow" />

    <import-table :visible.sync="importDialogVisible" @refresh="getNodeList" />

  </div>
</template>

<script>
  import NodeLog from "./NodeLog"
  import NodeDeploy from "./NodeDeploy";
  import { webDownload } from "@/utils/common";
  import ImportTable from "./ImportTable";
  export default {
    name: "node-list",
    components: { ImportTable, NodeDeploy, NodeLog },
    props: {
      nodeList: Function,
      chainStatus: Number,
    },
    data () {
      return {
        tableData: [],
        tableLoading: false,
        currentRow: {},
        deployNodes: [],
        deployNodesIds: '',
        stopIndexs: [],
        reRunIndexs: [],
        resetIndexs: [],
        logDialogVisible: false,
        deployDialogVisible: false,
        deployLoading: false,
        importDialogVisible: false,
        timeID: null,
      }
    },
    created () {
      this.getNodeList()
    },
    destroyed() {
      clearInterval(this.timeID)
    },
    methods: {
      getNodeList (isCheckChainStatus) {
        this.tableLoading = true
        this.$_api.getStarted.getNodeList({}, (err, res) => {
          this.tableLoading = false
          if (err) return
          this.tableData = Array.isArray(res) ? res : []

          this.tableData.sort((a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime())

          // when all nodes stopped, it needs to re-check the chain status
          if (isCheckChainStatus) this.$emit('checkChainPublish')

          this.$emit('nodeList', this.tableData)
        })
      },

      handleAddNode () {
        this.$router.push('/get-started/node-add')
      },

      handleSelectable (row, index) {
        return row.deployStatus !== 1
      },

      handleSelectionChange (rows) {
        this.deployNodes = rows
        this.deployNodesIds = rows.map(item => item.id).join(',')
      },

      // ready deploy node
      handleDeploy() {
        let errorMsg = ''
        if (!this.tableData.length)
          errorMsg = this.$t('getStarted.dashboard.pleaseAddNode')
        else if (!this.deployNodesIds.length)
          errorMsg = this.$t('getStarted.dashboard.pleaseSelectNodes')
        else if (this.chainStatus === 0 && this.deployNodes.filter(node => node.isSR).length % 2 !== 1) {
          errorMsg = this.$t('getStarted.dashboard.initRunSRCheck')
        }

        if (errorMsg) {
          this.$notify.warning({
            title: this.$t('base.warning'),
            message: errorMsg,
          })
          return
        }

        this.deployDialogVisible = true
      },

      handleConfig (row) {
        this.$router.push('/node-config/quick?id='+ row.id)
      },

      handleDetail (row) {
        this.$router.push('/get-started/node-view?id='+ row.id)
      },

      handleStop (row, index) {
        this.$confirm(this.$t('getStarted.dashboard.stopRunNodeTips'), this.$t('base.tips'), {
          confirmButtonText: this.$t('base.confirm'),
          cancelButtonText: this.$t('base.cancel'),
          center: true,
          customClass: 'im-message-box',
        }).then(() => this.stopNode(row, index))
          .catch(err => console.log('err: ', err))
      },

      stopNode (row, index) {
        this.stopIndexs.push(index)
        this.$_api.getStarted.stopNode({ id: row.id }, err => {
          let _index = this.stopIndexs.indexOf(index)
          this.stopIndexs.splice(_index, 1)
          if (err) return
          this.getNodeList(true)
        })
      },

      handleLog (row) {
        this.logDialogVisible = true
        this.currentRow = row
      },

      handleReset(row, index) {
        this.$confirm(this.$t('getStarted.dashboard.resetNodeTips'), this.$t('base.tips'), {
          confirmButtonText: this.$t('base.confirm'),
          cancelButtonText: this.$t('base.cancel'),
          center: true,
          customClass: 'im-message-box',
        }).then(() => {

          this.resetIndexs.push(index)
          this.$_api.getStarted.resetNode({ id: row.id }, err => {
            let _index = this.resetIndexs.indexOf(index)
            this.resetIndexs.splice(_index, 1)

            if (err) return

            this.getNodeList()
          })

        }).catch(err => console.log('err: ', err))
      },

      handleRerun (row, index) {
        this.reRunIndexs.push(index)

        this.$_api.getStarted.deployNode({
          ids: row.id + '',
          filePath: 'null',
          runAgain: true,
        }, (err, res = {}) => {

          let _index = this.reRunIndexs.indexOf(index)
          this.reRunIndexs.splice(_index, 1)

          if (err) return

          if (res.hasOwnProperty('status')) {
            let message = ''
            switch (res.status) {
              case 0:
                message = 'getStarted.dashboard.runSuccessTips'
                break
              case 1:
                message = 'getStarted.dashboard.runFailTips'
                break
              case 2:
                message = 'getStarted.dashboard.runFailSomeTips'
                break
              case 3:
                message = 'getStarted.dashboard.runExistTips'
                break
            }

            if (res.status === 0) {
              this.$notify.success({
                title: this.$t('base.successful'),
                message: this.$t(message),
              })
            } else {
              this.$notify.error({
                title: this.$t('base.warning'),
                message: this.$t(message),
              })
            }
          }

          this.getNodeList()
        })
      },

      handleImportTable () {
        this.importDialogVisible = true
      },
      handleImportData (data = []) {

      },

      handleExportTable () {
        let data = this.tableData.map(node => ({
          "ip": node.ip,
          "sshPassword": node.sshPassword,
          "javaTronVersion": node.javaTronVersion,
          "userName": node.userName,
          "url": node.url,
          "port": node.port,
          "createTime": node.createTime,
          "isSR": node.isSR,
          "id": node.id,
          "voteCount": node.voteCount,
          "listenPort": node.listenPort,
          "needSyncCheck": node.needSyncCheck,
        }))

        let dataBlob = new Blob([ JSON.stringify(data, null, 2) ], { type: 'application/json' })

        webDownload(dataBlob, this.$t('getStarted.dashboard.exportFileName') + ' - ' + this.$_moment(Date.now()).format('YYYY-MM-DD HH_mm_ss'))
      }
    }
  }
</script>

<style lang="scss" scoped>
.node-list {
  .table-footer {
    margin-top: 20px;
    .el-button + .el-button {
      margin-left: 20px;
    }
  }
}

.im-card {
  padding: 20px;
  margin-bottom: 20px;
  .card-header {
    overflow: hidden;
    margin-bottom: 20px;
    .card-title {
      display: inline-block;
      margin-right: 15px;
      font-weight: bold;
      color: $black-light;
    }
    .op-list {
      //display: flex;
      //justify-content: space-between;
      float: right;
      display: inline-block;

      .el-button + .el-button {
        margin-left: 20px;
      }
    }
  }

}
</style>
