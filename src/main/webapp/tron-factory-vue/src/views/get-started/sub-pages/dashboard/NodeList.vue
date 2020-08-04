<template>
  <div class="node-list im-card">
    <div class="card-header">
      <div class="card-title">{{ $t('getStarted.dashboard.nodeInfo')}}</div>
      <div class="op-list">
        <el-button class="im-button mini" type="primary" @click="handleAddNode()"><i class="el-icon-plus"></i> {{ $t('getStarted.dashboard.addNode') }}</el-button>
        <el-button class="im-button mini" size="small" :disabled="!deployNodesIds || deployLoading" @click="handleDeploy()">
          <i :class="deployLoading ? 'el-icon-loading' : 'el-icon-caret-right'"></i> {{ $t(deployLoading ? 'getStarted.dashboard.runningNode' : 'getStarted.dashboard.runNode') }}
        </el-button>
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
              <el-tag size="mini" type="info" v-else>{{$t('getStarted.dashboard.deployStop')}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="createTime" width="240" :label="$t('getStarted.dashboard.createNodeTime')" align="center"></el-table-column>

          <el-table-column prop="operate" width="240" :label="$t('base.operate')" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handleDetail(scope.row)">{{ $t('base.view') }}</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button :disabled="scope.row.deployStatus === 1" type="text" @click="handleConfig(scope.row)">{{ $t('getStarted.dashboard.nodeConfig') }}</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button :disabled="scope.row.deployStatus !== 2" type="text" :loading="stopIndexs.includes(scope.$index)" @click="handleStop(scope.row, scope.$index)">
                {{ $t(stopIndexs.includes(scope.$index) ? '' : 'getStarted.dashboard.stopRunNode') }}
              </el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button :disabled="!scope.row.ifShowLog" type="text" @click="handleLog(scope.row)">
                <span :class="{'color-danger': scope.row.isError}">{{ $t('base.logs') }}</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <node-deploy
      :visible.sync="deployDialogVisible"
      :ids="deployNodesIds"
      :deploy-loading.sync="deployLoading"
      @getNodeList="() => getNodeList(true)"/>


    <!-- view deploy log-->
    <node-log v-if="logDialogVisible" :visible.sync="logDialogVisible" :current-row="currentRow" />
  </div>
</template>

<script>
  import NodeLog from "./NodeLog"
  import NodeDeploy from "./NodeDeploy";
  export default {
    name: "node-list",
    components: { NodeDeploy, NodeLog },
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
        logDialogVisible: false,
        deployDialogVisible: false,
        deployLoading: false,
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

          this.tableData.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())

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
          cancelButtonClass: 'im-message-cancel-button',
          confirmButtonClass: 'im-message-confirm-button',
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

    }
  }
</script>

<style lang="scss" scoped>
.node-list {
  .table-header {
    margin-bottom: 20px;
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
      float: right;
      display: inline-block;

      .el-button + .el-button {
        margin-left: 20px;
      }
    }
  }
}
</style>
