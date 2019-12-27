<template>
  <div class="page-view node-list">
    <div class="page-header">
      <el-button icon="el-icon-plus" @click="handleClickAddBtn" type="primary">{{ $t('tronNodeAdd') }}</el-button>
    </div>

    <el-card class="page-main custom-card">
      <el-table
        class="custom-table"
        v-loading="listLoading"
        ref="multipleTable"
        :empty-text="$t('tronNodesNoData')"
        :data="tableData"
        stripe>

        <el-table-column prop="id" label="ID" />

        <el-table-column prop="userName" :label="$t('tronNodeName')" />

        <el-table-column prop="ip" label="IP/HOST" />

        <el-table-column prop="port" label="SSH PORT" />

        <el-table-column :label="$t('tronNodeWhetherIsSR')">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.isSR">yes</el-tag>
            <el-tag type="danger" v-else>no</el-tag>
          </template>
        </el-table-column>

        <el-table-column :label="$t('tronNodeOperate')" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClickEditBtn(scope.row)">{{ $t('tronNodeModify') }}</el-button>
            <el-button type="text" @click="handleDeleteNode(scope.row.id)">{{ $t('tronNodeDelete')}}</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>

    <div class="page-footer align-right">
      <el-button :type="nextBtnType" :disabled="isNextBtnDisabled" @click="handleNextStep">{{ $t('base.nextStep') }}</el-button>
    </div>

    <!-- node add and edit  -->
    <add-or-edit-node-dialog
      v-if="nodeObj.visible"
      :visible.sync="nodeObj.visible"
      :is-adding="nodeObj.isAdding"
      :node-list="tableData"
      :node-detail="nodeObj.detail"
      @success="getNodeList"/>
  </div>
</template>
<script>
import AddOrEditNodeDialog from './components/AddOrEditNodeDialog'

export default {
  name: 'node-list',
  components: {
    AddOrEditNodeDialog,
  },
  data() {
    return {
      tableData: [],
      listLoading: false,
      nextBtnType: 'info',
      isNextBtnDisabled: true,

      nodeObj: {
        visible: false,
        detail: {},
        isAdding: 0,
      },
    }
  },
  created() {
    this.getNodeList()
  },
  methods: {
    // get table data
    getNodeList() {
      this.$_api.nodeApi.allNodeInfo({}, (err, res = []) => {
        if (err) return

        if (res.length > 0) {
          this.nextBtnType = 'primary'
          this.isNextBtnDisabled = false
        } else {
          this.nextBtnType = 'info'
          this.isNextBtnDisabled = true
        }

        this.tableData = res.sort((x, y) => x.id - y.id)
      })
    },

    // add node
    handleClickAddBtn() {
      if (this.tableData.length > 20) {
        this.$message({
          type: 'info',
          message: this.$t('tronNodesMaxTips'),
        })
        return
      }
      this.nodeObj.detail = {
        url: 'http://',
      }

      this.nodeObj.isAdding = true
      this.nodeObj.visible = true
    },

    // edit node
    handleClickEditBtn(val) {
      this.nodeObj.detail = {
        ...val,
        url: JSON.stringify(val.url).slice(3).slice(0, -3),
        privateKey: Array(64).fill('*').join(''),
      }
      sessionStorage.setItem('currentnode', val.ip)

      this.nodeObj.isAdding = false
      this.nodeObj.visible = true
    },

    // delete node
    handleDeleteNode(id) {
      this.$confirm(this.$t('tronNodesDeleteTips'), this.$t('tronNodesDeleteTipsTitle'), {
        confirmButtonText: this.$t('tronNodeDetermine'),
        cancelButtonText: this.$t('tronNodeCancel'),
        type: 'warning',
      }).then(() => {
        this.$_api.nodeApi.deleteNote({ id }, err => {
          if (err) return

          this.$message.success(this.$t('tronNodesDeleteSuccess'))
          this.getNodeList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('tronNodesCancelDelete'),
        })
      })
    },

    // skip next
    handleNextStep() {
      this.$_api.nodeApi.initConfigApi({}, err => {
        if (err) return

        this.$router.push({ path: '/config_manage' })
      })
    },
  },
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.node-list {
  .page-header {
    margin-bottom: 24px;
  }

  .page-footer {
    margin-top: 30px;
  }
}
</style>
