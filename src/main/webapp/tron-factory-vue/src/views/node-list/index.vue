/* * @Author: lxm * @Date: 2019-08-28 15:27:13 * @Last Modified by: lxm * @Last Modified time: 2019-11-12 11:30:38 *
@tron node list */
<template>
  <div class="app-container">
    <div class="tron-content">
      <div class="tron-filter-section">
        <el-button icon="el-icon-plus" size="small" @click="handleClickAddBtn" type="primary">{{          $t('tronNodeAdd') }}</el-button>
      </div>

      <div class="filter-container tron-table" id="tronTable">
        <el-table
          v-loading="listLoading"
          ref="multipleTable"
          :empty-text="$t('tronNodesNoData')"
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
          border
        >
          <el-table-column prop="id" label="ID" align="center" />

          <el-table-column prop="userName" :label="$t('tronNodeName')" align="center" />

          <el-table-column prop="ip" label="IP/HOST" align="center" />

          <el-table-column prop="port" label="SSH PORT" align="center" />

          <el-table-column :label="$t('tronNodeWhetherIsSR')" align="center">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.isSR">yes</el-tag>
              <el-tag type="danger" v-else>no</el-tag>
            </template>
          </el-table-column>

          <el-table-column :label="$t('tronNodeOperate')" align="center" width="200">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="handleClickEditBtn(scope.row)">{{
                $t('tronNodeModify')
              }}</el-button>
              <el-divider direction="vertical" />
              <el-button size="small" type="text" @click="handleDeleteNode(scope.row.id)">{{
                $t('tronNodeDelete')
              }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="mgt20">
        <el-button
          size="small"
          style="float:right"
          :type="allStepsBtnType"
          :disabled="allStepsBtnDisable"
          @click="handleNextStep"
          >{{ $t('tronNodeNextStep') }}</el-button
        >
      </div>
    </div>

    <!-- node add and edit  -->
    <add-or-edit-node-dialog
      v-if="nodeObj.visible"
      :visible.sync="nodeObj.visible"
      :is-adding="nodeObj.isAdding"
      :node-list="list"
      :node-detail="nodeObj.detail"
      @success="getNodeList"
    />
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
      list: [],
      listLoading: false,
      allStepsBtnType: 'info',
      allStepsBtnDisable: true,

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
          this.allStepsBtnType = 'primary'
          this.allStepsBtnDisable = false
        } else {
          this.allStepsBtnType = 'info'
          this.allStepsBtnDisable = true
        }

        this.list = res.sort((x, y) => x.id - y.id)
      })
    },

    // add node
    handleClickAddBtn() {
      if (this.list.length > 20) {
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
        url: JSON.stringify(val.url)
          .slice(3)
          .slice(0, -3),
        privateKey: Array(64)
          .fill('*')
          .join(''),
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
<style lang="scss" rel="stylesheet/scss" scoped></style>
