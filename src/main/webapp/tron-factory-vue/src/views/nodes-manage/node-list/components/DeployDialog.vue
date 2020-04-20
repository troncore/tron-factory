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
    name: "deploy-dialog",
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      deployLoading: {
        type: Boolean,
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
        this.$_api.nodesManage.deployNode(this.form, (err, res) => {
          this.loading = false
          this.$emit('refreshList')

          if (err) return

          this.$notify({
            title: this.$t('base.successful'),
            message: this.$t('nodesManage.deployingTips'),
            type: 'success'
          });

          this.$emit('checkDeployStatus')
          this.$emit('update:visible', false)
        })
      },
    },
  }
</script>

<style scoped>

</style>
