<template>
  <el-dialog
    :visible.sync="dialogVisible"
    custom-class="im-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="680px"
    center>
    <div slot="title" class="dialog-header">
      <div class="title">{{ $t('nodesManage.deploy') }}</div>
    </div>

    <div class="dialog-content">
      <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" v-model.trim="form.filePath"></el-input>
      <div class="el-upload__tip">{{ $t('nodesManage.helpTips.deployFile') }}</div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button class="im-button" @click="dialogVisible = false">{{ $t('base.cancel') }}</el-button>
      <el-button class="im-button" type="primary" @click="handleSubmit" :loading="loading">{{ $t('base.save') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "node-deploy",
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      ids: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
        form: {
          filePath: '',
        },
        loading: false
      }
    },
    computed: {
      dialogVisible: {
        get () {
          return this.visible
        },
        set (val) {
          this.$emit('update:visible', val)
        }
      },
    },
    methods: {
      handleSubmit () {
        if (!this.form.filePath) {
          this.$notify({
            title: this.$t('base.warning'),
            message: this.$t('nodesManage.valid.inputFilePath'),
            type: 'warning'
          });
          return
        }

        // error file
        if (!~this.form.filePath.indexOf('java-tron-1.0.0.zip')) {
          this.$notify({
            title: this.$t('base.warning'),
            message: this.$t('nodesManage.valid.inputRightPath'),
            type: 'warning'
          });
          return
        }

        this.startDeploy()
      },

      // deploy node
      startDeploy () {
        this.loading = true
        this.$_api.getStarted.deployNode({
          ids: this.ids,
          filePath: this.form.filePath,
        }, (err, res = {}) => {
          this.loading = false
          // this.$emit('refreshList')

          if (err) return

          if (res.hasOwnProperty('status')) {
            let message = ''
            switch (res.status) {
              case 0:
                message = '节点正在启动中，请稍等......'
                break
              case 1:
                message = '初次运行区块链节点时，其中SR节点数量必须>=1且为奇数'
                break
              default:
                message = '节点未启动成功，请查看日志'
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

          this.$emit('checkDeployStatus')
          this.$emit('update:visible', false)
        })
      },
    },
  }
</script>

<style scoped>

</style>
