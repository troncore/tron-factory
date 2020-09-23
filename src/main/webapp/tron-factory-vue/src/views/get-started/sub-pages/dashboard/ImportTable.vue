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
      <div>批量导入节点数据时，其中每个节点的 IP 不能重复或在表格中已存在，且 SSH 服务默认支持口令登录，端口号为 22。如果不符合以上要求，建议单独添加节点。请先下载<span class="download-btn" :underline="false" @click="handleSubmit">导入模板</span>。</div>

      <div class="files-list">
        <input v-show="false" ref="import-file" type="file" accept="application/json" @change="handleChange" />
        <el-button type="primary" size="medium" @click="handleUploadFile"><i class="el-icon-upload2"></i> 上传文件</el-button>

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

    let handleChange = this.handleSubmit
  },
  methods: {
    handleSubmit() {
      let dataBlob = new Blob([ JSON.stringify(this.template, null, 2) ], { type: 'application/json' })

      webDownload(dataBlob, 'TRON-Factory 导入列表模板')

    },
    handleChange (e) {
      console.log(e.target.files)
    },
    handleUploadFile (e) {
      this.$refs['import-file'].click()
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
</style>
