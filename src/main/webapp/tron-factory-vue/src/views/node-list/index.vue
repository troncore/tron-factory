<template>
  <div class="page-view node-list">
    <div class="box-view">
      <div class="page-header">
        <el-button class="im-button large" icon="el-icon-plus" :disabled="tableLoading || tableData.length > 20" @click="handleClickAddBtn" type="primary">{{ $t('tronNodeAdd') }}</el-button>
        <span v-if="tableData.length > 20" class="max-tips">({{ $t('tronNodesMaxTips') }})</span>
      </div>

      <el-table
        :data="tableData"
        :empty-text="$t('tronNodesNoData')"
        v-loading="tableLoading"
        class="custom-table"
        ref="multipleTable"
        header-align="center"
        border>

        <el-table-column prop="id" label="ID"  align="center"/>

        <el-table-column prop="userName" :label="$t('tronNodeName')"  align="center"/>

        <el-table-column prop="ip" label="IP/HOST"  align="center"/>

        <el-table-column prop="port" label="SSH PORT"  align="center"/>

        <el-table-column :label="$t('tronNodeWhetherIsSR')" align="center">
          <template slot-scope="scope">
            <el-tag size="medium" type="success" v-if="scope.row.isSR">YES</el-tag>
            <el-tag size="medium" type="danger" v-else>NO</el-tag>
          </template>
        </el-table-column>

        <el-table-column class-name="operator-btns" :label="$t('tronNodeOperate')" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClickEditBtn(scope.row)"><i class="el-icon-edit"></i></el-button>
            <span class="divider">|</span>
            <el-button type="text" @click="handleDeleteNode(scope.row.id)"><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="page-footer align-right">
        <el-button class="im-button large" :type="nextBtnType" :disabled="isNextBtnDisabled" :loading="loading" @click="handleNextStep">{{ $t('base.nextStep') }}</el-button>
      </div>
    </div>

    <!-- node add and edit  -->
    <add-or-edit-node-dialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :is-adding="isAdding"
      :node-list="tableData"
      :node-detail="nodeInfo"
      @success="getNodeList"/>
  </div>
</template>
<script>
import AddOrEditNodeDialog from './components/AddOrEditNodeDialog'
import { mapMutations } from "vuex";

export default {
  name: 'node-list',
  components: {
    AddOrEditNodeDialog,
  },
  data() {
    return {
      testVisible: false,
      tableData: [],
      tableLoading: false,

      dialogVisible: false,
      nodeInfo: {},
      isAdding: true,

      nextBtnType: 'info',
      isNextBtnDisabled: true,
      loading: false,
    }
  },
  created() {
    this.getNodeList()
  },
  methods: {
    ...mapMutations('app', {
      updateMenuList: 'updateMenuList',
    }),

    // get table data
    getNodeList() {
      this.tableLoading = true
      this.$_api.nodeList.allNodeInfo({}, (err, res = []) => {
        this.tableLoading = false
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
      this.nodeInfo = {
        url: 'http://',
      }

      this.isAdding = true
      this.dialogVisible = true
    },

    // edit node
    handleClickEditBtn(val) {
      this.nodeInfo = {
        ...val,
        url: JSON.stringify(val.url).slice(3).slice(0, -3),
        privateKey: Array(64).fill('*').join(''),
      }

      this.isAdding = false
      this.dialogVisible = true
    },

    // delete node
    handleDeleteNode(id) {
      this.$confirm(this.$t('tronNodesDeleteTips'), this.$t('tronNodesDeleteTipsTitle'), {
        confirmButtonText: this.$t('tronNodeDetermine'),
        cancelButtonText: this.$t('tronNodeCancel'),
        type: 'warning',
        center: true,
        customClass: 'im-message-box',
        cancelButtonClass: 'im-message-cancel-button',
        confirmButtonClass: 'im-message-confirm-button',
      }).then(() => {
        this.$_api.nodeList.deleteNoteInfo({ id }, err => {
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
      this.loading = true
      this.$_api.nodeList.initConfig({}, err => {
        this.loading = false
        if (err) return

        this.updateMenuList({ activeName: 'config-manage' })
        this.$router.push({ path: '/config-manage' })
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

  .max-tips {
    margin-left: 20px;
    font-size: 12px;
    color: red;
  }

  .page-footer {
    margin-top: 30px;
  }

  /deep/ .el-table {
    .el-table__body {
      .operator-btns .cell {
        display: flex;
        align-items: center;
        justify-content: center;

        .el-button {
          padding: 10px 0;
        }
        .divider {
          margin: 10px;
          color: #a5adb9;
        }
        i {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
