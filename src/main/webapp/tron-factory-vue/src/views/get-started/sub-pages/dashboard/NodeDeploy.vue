<template>
  <el-dialog
    :visible.sync="dialogVisible"
    custom-class="im-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="680px"
    center>
    <div slot="title" class="dialog-header">
      <div class="title">{{ $t('getStarted.dashboard.runNodeDialogTitle')}}</div>
    </div>

    <div class="dialog-content">
      <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" v-model.trim="form.filePath"></el-input>
      <div class="el-upload__tip">{{ $t('getStarted.dashboard.checkFilePath') }}</div>
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
      deployLoading: {
        type: Boolean,
        required: true,
      },
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
            message: this.$t('getStarted.dashboard.inputFilePath'),
            type: 'warning'
          });
          return
        }

        // error file
        if (!this.form.filePath.endsWith('java-tron-1.0.0.zip')) {
          this.$notify({
            title: this.$t('base.warning'),
            message: this.$t('getStarted.dashboard.endRightPath'),
            type: 'warning'
          });
          return
        }

        this.startDeploy()

        this.$emit('update:visible', false)
        this.$emit('update:deployLoading', true)
      },

      // deploy node
      startDeploy () {
        this.loading = true
        this.$_api.getStarted.deployNode({
          ids: this.ids,
          filePath: this.form.filePath,
        }, (err, res = {}) => {
          this.$emit('update:deployLoading', false)
          this.loading = false

          if (err) return

          if (res.hasOwnProperty('status')) {
            let message = ''
            switch (res.status) {
              case 0:
                message = 'getStarted.dashboard.runSuccessTips'
                break
              case 1:
                message = 'getStarted.dashboard.runFailTips'
                break
              case 2:
                message = 'getStarted.dashboard.runFailSomeTips'
                break
              case 3:
                message = 'getStarted.dashboard.runExistTips'
                break
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

          this.$emit('getNodeList')
        })
      },
    },
  }
</script>

<style scoped>

</style>
