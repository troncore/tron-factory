<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="im-dialog"
    width="800px"
    center>
    <div slot="title" class="dialog-header">
      <div class="title">{{ $t('getStarted.dashboard.importList') }}</div>
    </div>

    <div class="dialog-content">
      <dl>
        <dt>批量导入节点数据时:</dt>
        <dd>节点 IP 不能重复或在表格中已存在；</dd>
        <dd>节点 SSH 服务默认支持口令登录，端口号为 22。</dd>
      </dl>

      <div class="table-header">
        <div class="left">
          <input v-if="isReset" v-show="false" ref="import-file" type="file" accept="application/json" @change="handleChange" />
          <el-button class="im-button mini" type="primary" :disabled="tableLoading" @click="handleUploadFile"><i class="el-icon-upload2"></i> 选择文件</el-button>
        </div>
        <div class="right">
          <el-button type="text" size="medium" @click="handleDownloadTPL">下载导入模板</el-button>
        </div>
      </div>

      <el-table
          :data="importData"
          :empty-text="$t('base.emptyData')"
          class="custom-table"
          border
          header-align="center"
          v-loading="tableLoading"
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
            prop="address"
            label="Status"
            align="center">
          <template slot-scope="scope">
            <span v-show="scope.row.status !== true" class="red">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="table-footer"><i>*</i> {{ $t('请选择要导入的节点') }}</div>

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
      webDownload(dataBlob, 'TRON-Factory 导入列表模板')
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
              message: this.$t('文件内容格式不符合 JSON 规范'),
            })
            return
          }
          this.rawData = data
          this.getNodeList()

        } else {
          this.$notify.error({
            title: this.$t('base.warning'),
            message: this.$t('文件内容为空'),
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
        if (err) return
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
          if (err) return resolve('接口异常') // network error

          resolve(res === true ? true : this.$t('检测 SSH 连接失败'))
        })
      })
    },

    checkParams (params) {
      const validIPv4 =  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(params.ip)
      const validHostname = /^(([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])$/.test(params.ip)

      if(validIPv4 || validHostname) {
        if (this.existList.some(node => node.ip === params.ip)) return this.$t('IP 已添加')
        if (this.rawData.filter(node => node.ip === params.ip).length > 1) return this.$t('IP 重复')
        if (!params.userName) {
          return this.$t('SSH username 不可以为空')
        }
      }
      else {
        return this.$t('IP 格式不符合规范')
      }
      return false
    },

    handleSelectable (row, index) {
      return row.status === true
    },
    handleSelectionChange (rows) {
      this.selectedNodes = rows
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
          message: this.$t('节点列表导入成功'),
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
  margin-top: 0;
  color: font-color(.8);
}
.red {
  color: red;
}
.table-footer {
  margin-top: 10px;
  color: font-color(.8);
}
</style>
