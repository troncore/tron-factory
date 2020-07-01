<template>
  <div class="node-list im-card">
    <div class="card-header">节点信息</div>
    <div class="card-body">
      <div class="table-header">
        <el-button class="im-button mini" size="mini" type="primary" @click="handleAddNode()"><i class="el-icon-plus"></i> {{ $t('添加节点') }}</el-button>
        <el-button class="im-button mini" size="mini" type="success"><i class="el-icon-caret-right"></i> {{ $t('启动节点') }}</el-button>
      </div>
      <div class="table-box">
        <el-table
          :data="tableData"
          :empty-text="$t('base.emptyData')"
          v-loading="tableLoading"
          class="custom-table"
          border
          header-align="center">
          <el-table-column
            type="selection" align="center"
            width="60"
            :selectable="handleSelectable">
          </el-table-column>
          <el-table-column prop="ip" :label="$t('IP')" align="center">
            <template slot-scope="scope">
              <!--<span v-if="!scope.row.isDeployed">{{ scope.row.ip }}</span>-->
              <el-link type="primary" @click="handleDetail(scope.row)">{{ scope.row.ip }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="listenPort" :label="$t('监听端口')" align="center"></el-table-column>
          <el-table-column prop="isSR" :label="$t('节点类型')" align="center">
            <template slot-scope="scope">
              <span class="color-success" v-if="scope.row.isSR">{{ $t('超级代表') }}</span>
              <span class="color-info" v-else>{{ $t('普通节点') }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="configStatus" :label="$t('配置状态')" align="center">
            <template slot-scope="scope">
              <el-tag size="mini" type="primary" v-if="scope.row.configStatus === 1">{{$t('已配置')}}</el-tag>
              <el-tag size="mini" type="info" v-else>{{$t('未配置')}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="deployStatus" :label="$t('运行状态')" align="center">
            <template slot-scope="scope">
              <el-tag size="mini" type="success" v-if="scope.row.deployStatus === 1">{{$t('运行中')}}</el-tag>
              <el-tag size="mini" type="info" v-else>{{$t('停止')}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="createTime" width="180" :label="$t('创建时间')" align="center"></el-table-column>

          <el-table-column prop="operate" width="180" :label="$t('操作')">
            <template slot-scope="scope">
              <el-button type="text" @click="handleConfig(scope.row)">{{ $t('配置') }}</el-button>
              <el-button type="text" @click="handleDetail(scope.row)">{{ $t('查看') }}</el-button>
              <el-button type="text" @click="handleStop(scope.row, scope.$index)" :disabled="stopIndexs.includes(scope.$index)" v-if="scope.row.deployStatus === 1">{{ $t('停止') }}</el-button>
              <el-button type="text" @click="handleLog(scope.row)" v-if="scope.row.ifShowLog">{{ $t('日志') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>


    <!-- view deploy log-->
    <node-log v-if="logDialogVisible" :visible.sync="logDialogVisible" :current-row="currentRow" />
  </div>
</template>

<script>
  import NodeLog from "./node-log"
  export default {
    name: "node-list",
    components: { NodeLog },
    props: {
      nodeList: Function
    },
    data () {
      return {
        tableData: [],
        tableLoading: false,
        currentRow: {},
        stopIndexs: [],
        logDialogVisible: false,
      }
    },
    created () {
      this.getNodeList()
    },
    methods: {
      getNodeList () {
        this.tableLoading = true
        this.$_api.getStarted.getNodeList({}, (err, res) => {
          this.tableLoading = false
          if (err) return
          this.tableData = Array.isArray(res) ? res : []

          this.$emit('nodeList', this.tableData)
        })
      },

      handleSelectable (row, index) {
        return row.deployStatus !== 1
      },

      handleAddNode () {
        this.$router.push('/get-started/node-add')
      },

      handleConfig (row) {
        this.$router.push('/node-config/quick?id='+ row.id)
      },

      handleDetail (row) {
        this.$router.push('/get-started/node-view?id='+ row.id)
      },

      handleStop (row, index) {
        this.$confirm(this.$t('是否要停止该节点'), this.$t('nodesManage.deleteNodeTipsTitle'), {
          confirmButtonText: this.$t('base.confirm'),
          cancelButtonText: this.$t('base.cancel'),
          center: true,
          customClass: 'im-message-box',
          cancelButtonClass: 'im-message-cancel-button',
          confirmButtonClass: 'im-message-confirm-button',
        })
          .then(() => this.stopNode(row, index))
          .catch(() => {
          this.$notify.info({
            title: this.$t('base.cancel'),
            message: this.$t('base.cancelDelete'),
          });
        })
      },

      stopNode (row, index) {
        this.stopIndexs.push(index)
        this.$_api.getStarted.stopNode({ id: row.id }, err => {
          let _index = this.stopIndexs.indexOf(index)
          this.stopIndexs.splice(_index, 1)
          if (err) return
          this.getNodeList()
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
    margin-bottom: 20px;
    font-weight: bold;
    color: $black-light;
  }
}
</style>
