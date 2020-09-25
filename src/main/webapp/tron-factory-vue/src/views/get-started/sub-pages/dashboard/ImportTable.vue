<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="im-dialog"
    width="900px"
    center>
    <div slot="title" class="dialog-header">
      <div class="title">{{ $t('getStarted.dashboard.importList') }}</div>
    </div>

    <div class="dialog-content">
      <!-- <dl>
        <dt>{{ $t('getStarted.dashboard.importTips1')}}</dt>
        <dd>{{ $t('getStarted.dashboard.importTips2')}}</dd>
        <dd>{{ $t('getStarted.dashboard.importTips3')}}</dd>
      </dl> -->

      <div class="table-header">
        <div class="left">
          <input v-if="isReset" v-show="false" ref="import-file" type="file" accept="application/json" @change="handleChange" />
          <el-button class="im-button mini" type="primary" :disabled="tableLoading" @click="handleUploadFile"><i class="el-icon-upload2"></i> {{ $t('getStarted.dashboard.selectFile') }}</el-button>
        </div>
        <div class="right">
          <el-button type="text" size="medium" @click="handleDownloadTPL">{{ $t('getStarted.dashboard.downloadImportTpl') }}</el-button>

          <el-tooltip placement="top">
            <div slot="content">
              <div>{{ $t('getStarted.dashboard.importTips1')}}</div>
              <div>{{ $t('getStarted.dashboard.importTips2')}}</div>
            </div>
            <el-button type="text" size="medium">{{ $t('getStarted.dashboard.importHelp')}}</el-button>
          </el-tooltip>
        </div>
      </div>

      <el-table
          :data="importData"
          :empty-text="$t('base.emptyData')"
          class="custom-table"
          border
          header-align="center"
          v-loading="tableLoading"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            align="center"
            width="60"
            :selectable="handleSelectable">
        </el-table-column>
        <el-table-column
            prop="ip"
            label="IP"
            align="center">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="Username"
            align="center">
        </el-table-column>
        <el-table-column
            prop="userName"
            :label="$t('getStarted.dashboard.isStandard')"
            align="center"
            width="120">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" v-if="scope.row.status === true">YES</el-tag>
            <el-tag type="danger" size="mini" v-else>NO</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="address"
            :label="$t('getStarted.dashboard.errorMessage')"
            align="center">
          <template slot-scope="scope">
            <span v-show="scope.row.status !== true">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="table-footer"><i>*</i> {{ $t('getStarted.dashboard.selectImportNodes') }}</div>

    </div>

    <div slot="footer" class="dialog-footer align-right">
      <el-button class="im-button mini" @click="dialogVisible = false">{{ $t('base.cancel') }}</el-button>
      <el-button class="im-button mini" type="primary" :disabled="!selectedNodes.length" :loading="loading" @click="handleSubmit">{{ $t('base.save') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>

import { webDownload } from "@/utils/common";
import ImTooltip from "@/components/ImTooltip"

export default {
  name: 'import-table',
  components: {
    ImTooltip,
  },
  props: ['visible'],
  data() {
    return {
      template: [
        {
          ip: 'IPv4 or Hostname',
          userName: 'ssh user name',
        },
        {
          ip: '127.0.0.1',
          userName: 'root',
        },
      ],
      isReset: false,
      rawData: [],
      importData: [],
      existList: [], // exist node list
      tableLoading: false,
      selectedNodes: [],
      loading: false,
    }
  },

  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      },
    }
  },
  watch: {
    dialogVisible (val) {
      if (val) this.getNodeList()
    }
  },

  created () {

  },
  methods: {
    handleDownloadTPL() {
      let dataBlob = new Blob([ JSON.stringify(this.template, null, 2) ], { type: 'application/json' })
      webDownload(dataBlob, this.$t('getStarted.dashboard.importTplName'))
    },


    handleUploadFile (e) {
      this.isReset = true
      this.$nextTick(() => {
        this.$refs['import-file'].click()
      })
    },

    handleChange (e) {
      let file = e.target.files[0]
      this.isReset = false
      if (!file) return

      let reader = new FileReader()
      reader.readAsText(file)

      reader.onload = () => {
        // 一个DOMString对象，包含了被读取文件的内容。
        if (reader.result) {
          let data = []
          try {
            data = JSON.parse(reader.result)
          } catch (e) {
            this.$notify.error({
              title: this.$t('base.warning'),
              message: this.$t('getStarted.dashboard.unvalidFileForJSON'),
            })
            return
          }
          this.rawData = data
          this.getNodeList()

        } else {
          this.$notify.error({
            title: this.$t('base.warning'),
            message: this.$t('getStarted.dashboard.emptyFile'),
          })
        }
      }
      reader.onerror = () => {
        console.log('reade file error: ', error)
        reader.abort()
      }
    },

    getNodeList () {
      if(!this.rawData.length) return
      this.tableLoading = true
      this.$_api.getStarted.getNodeList({}, (err, res) => {
        if (err) {
          this.tableLoading = false
          return 
        }
        this.existList = Array.isArray(res) ? res : []
        this.handleRawData()
      })
    },

    async handleRawData () {
      let awaitList = []
      for(let i = 0; i < this.rawData.length; i++) {
        awaitList.push(this.checkSSH(this.rawData[i]))
      }

      let resultStatus = []
      for(let i = 0; i < awaitList.length; i++) {
        resultStatus.push(await awaitList[i])
      }

      this.importData = this.rawData.map((node, index) => ({
        ip: node.ip,
        userName: node.userName,
        status: resultStatus[index]
      }))
      this.tableLoading = false
    },

    checkSSH (params) {
      return new Promise(resolve => {
        let paramsStatus = this.checkParams(params)
        if (paramsStatus) return resolve(paramsStatus)

        this.$_api.getStarted.checkSSH({
          ip: params.ip,
          sshConnectType: 2,
          userName: params.userName,
          port: 22,
          sshPassword: '',
        }, (err, res) => {
          if (err) return resolve('network error') // network error

          resolve(res === true ? true : this.$t('getStarted.dashboard.SSHConnectFail'))
        })
      })
    },

    checkParams (params) {
      const validIPv4 =  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(params.ip)
      const validHostname = /^(([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])$/.test(params.ip)

      if (!params.ip) return this.$t('getStarted.dashboard.emptyIP')
      if(validIPv4 || validHostname) {
        if (this.existList.some(node => node.ip === params.ip)) return this.$t('getStarted.dashboard.existIP')
        if (this.rawData.filter(node => node.ip === params.ip).length > 1) return this.$t('getStarted.dashboard.repeatIP')
        if (!params.userName) {
          return this.$t('getStarted.dashboard.emptySSHUsername')
        }
      }
      else {
        return this.$t('getStarted.dashboard.unValidIP')
      }
      return false
    },

    handleSelectable (row, index) {
      return row.status === true
    },
    handleSelectionChange (rows) {
      this.selectedNodes = rows
    },
    tableRowClassName({row, rowIndex}) {
      return row.status === true ? '' : 'error-node'
    },

    async handleSubmit () {
      this.loading = true

      let requestList = []
      for ( let i = 0; i < this.selectedNodes.length; i++ ) {
        let res = this.addNode(this.selectedNodes[i])
        requestList.push(res)
      }
      let resultList = []
      for ( let i = 0; i < requestList.length; i++ ) {
        resultList.push(await requestList[i])
      }

      this.loading = false
      this.$emit('refresh')

      if (resultList.every(Boolean)) {
        this.$notify.success({
          title: this.$t('base.successful'),
          message: this.$t('getStarted.dashboard.importSuccess'),
        })
        this.dialogVisible = false
      } else {
        this.getNodeList()
      }
    },

    addNode (params) {
      return new Promise(resolve => {
        let _params = {
          ip: params.ip,
          listenPort: '18888',
          port: 22,
          sshConnectType: 2, // 1 password, 2 key
          userName: params.userName,
          sshPassword: '',
          isSR: false,
          url: '',
          voteCount: '1000001',
          publicKey: '',
          privateKey: '',
        }

        this.$_api.getStarted.addNoteInfo(_params, (err, res = {}) => {
          if (err) return resolve(false)
          if (res.hasOwnProperty('status')) {
            let errorMsg = ''
            switch (res.status) {
              case 1:
                errorMsg = 'getStarted.nodesManage.sshConnectFail'
                break
              case 2:
                errorMsg = 'getStarted.nodesManage.addressNotPrivateKey'
                break
              default:
                errorMsg = 'base.error'
            }
            this.$notify.error({
              title: this.$t('base.error'),
              message: this.$t(errorMsg),
            })
            resolve(false)
          } else resolve(true)

        })
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.dialog-content {
  .table-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
.download-btn {
  color: theme-color();
  cursor: pointer;
}
.files-list {
  margin-bottom: 20px;
}
dl {
  margin: 0;
}
::v-deep .el-table {
  .error-node {
    background-color: rgba(255, 0, 0, 0.03);
  }
}
.table-footer {
  margin-top: 10px;
  color: font-color(.8);
}
</style>
