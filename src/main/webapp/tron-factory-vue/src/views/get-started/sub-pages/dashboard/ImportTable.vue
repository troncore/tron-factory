<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="im-dialog"
    width="680px"
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
      <div>如果不符合以上要求，建议单独添加节点。请先下载<span class="download-btn" :underline="false" @click="handleDownloadTPL">导入模板</span>。</div>

      <div class="files-list">
        <input v-show="false" ref="import-file" type="file" accept="application/json" @change="handleChange" />
        <el-button type="primary" size="medium" @click="handleUploadFile"><i class="el-icon-upload2"></i> 选择文件</el-button>
      </div>

    </div>

    <div slot="footer" class="dialog-footer align-right">
      <el-button class="im-button mini" @click="dialogVisible = false">{{ $t('base.cancel') }}</el-button>
      <el-button class="im-button mini" type="primary" :loading="loading" @click="handleSubmit">{{ $t('base.save') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>

import { webDownload } from "@/utils/common";

export default {
  name: 'import-table',
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
      importData: [],
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
    },

  },

  created () {

  },
  methods: {
    handleSubmit () {

    },

    handleDownloadTPL() {
      let dataBlob = new Blob([ JSON.stringify(this.template, null, 2) ], { type: 'application/json' })
      webDownload(dataBlob, 'TRON-Factory 导入列表模板')
    },

    handleUploadFile (e) {
      this.$refs['import-file'].click()
    },

    handleChange (e) {
      let file = e.target.files[0]
      if (!file) return

      let reader = new FileReader()
      reader.readAsText(file)

      reader.onload = () => {
        console.log('reader.result: ', reader.result)

        // 一个DOMString对象，包含了被读取文件的内容。
        if (reader.result) {
          let data = []
          try {
            data = JSON.parse(reader.result)
          } catch (e) {
            console.log(e)

            this.$notify.error({
              title: this.$t('base.warning'),
              message: this.$t('文件内容格式不符合 JSON 规范'),
            })
            return
          }
          this.handleImportData(data)
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
    async handleImportData (data) {
      // this.loading = true
      let awaitList = []
      for(let i = 0; i < data.length; i++) {
        // 第一条数据 检查 网络情况；
        // 之后 并发剩余所有的请求
        awaitList.push(this.checkSSH(data[i]))
      }

      let result = []
      for(let i = 0; i < awaitList.length; i++) {
        result.push(await awaitList[i])
      }
      console.log('result: ', result)
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
          if (err) return resolve('') // network error

          resolve(res === true ? 'OK' : this.$t('SSH 连接失败'))
        })
      })
    },

    checkParams (params) {
      const validIPv4 =  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(params.ip)
      const validHostname = /^(([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])$/.test(params.ip)

      if(validIPv4 || validHostname) {
        if (!params.userName) {
          return this.$t('SSH username 不可以为空')
        }
      }
      else {
        return this.$t('IP 格式不符合规范')
      }
      return ''
    }
  },
}
</script>
<style lang="scss" scoped>
.download-btn {
  color: theme-color();
  cursor: pointer;
}
.files-list {
  margin-top: 20px;
}
dl {
  margin-top: 0;
}
</style>
