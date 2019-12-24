<template>
  <el-dialog
    :title="$t('tronNodeBulkDeployment')"
    :visible.sync="dialogVisible"
    width="600px"
    center>

    <div class="dialog-content">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model.trim="form.filePath"></el-input>
      <div class="el-upload__tip">{{ $t('deploymentUpload') }}</div>
    </div>


    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">{{ $t('tronNodeCancel') }}</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">{{ $t('tronNodeSave') }}</el-button>
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
          this.$message({
            type: 'warning',
            message: this.$t('deploymentPath'),
          })
          return
        }

        // error file
        if (!~this.form.filePath.indexOf('java-tron-1.0.0.zip')) {
          this.$message({
            type: 'warning',
            message: this.$t('deploymentCorrectPath'),
          })
          return
        }

        this.$emit('deploy', this.form)
      },
    }
  }
</script>

<style scoped>

</style>
