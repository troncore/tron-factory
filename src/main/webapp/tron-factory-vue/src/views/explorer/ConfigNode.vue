<template>
  <el-dialog
    :visible.sync="dialogVisible"
    custom-class="im-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="680px"
    center>
    <div slot="title" class="dialog-header">
      <div class="title">{{ $t('explorer.configNode') }}</div>
    </div>

    <div class="dialog-content">
      <el-form ref="form" :model="form" :rules="formRules">
        <el-form-item prop="nodeURL">
          <el-select v-model="form.nodeURL" style="width: 100%;" clearable filterable :placeholder="$t('explorer.selectNodeURLPlaceholder')">
            <el-option
              v-for="item in deployedNodeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button class="im-button" @click="dialogVisible = false">{{ $t('base.cancel') }}</el-button>
      <el-button class="im-button" type="primary" @click="handleSubmit" :loading="loading">{{ $t('base.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "config-node",
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
    },
    data () {
      return {
        form: {
          nodeType: '1',
          nodeURL: '',
        },
        formRules: {
          nodeURL: [
            { required: true, message: this.$t('base.pleaseSelect'), trigger: 'change' }
          ]
        },
        nodeInfo: '',
        deployedNodeList: [],
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
      }
    },
    activated () {
      this.getDeployedNode()
    },
    methods: {
      getDeployedNode () {
        this.$_api.explorer.getDeployedNode({}, (err, res = {}) => {
          if (err) return
          let deployedIpList = res && res.deployedIpList || []
          this.deployedNodeList = deployedIpList.map(item => ({ label: item, value: item, }))
        })
      },
      handleSubmit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let configForm = {
              refresh: true,
              nodeType: this.form.nodeType,
              nodeURL: this.form.nodeURL,
            }
            this.$emit('initConfig', configForm)
            this.dialogVisible = false
          }
        })
      },
    },
  }
</script>

<style scoped lang="scss">
.el-dialog {
  .dialog-content {
    margin-bottom: 30px;
  }
  .node-type {
    margin-bottom: 10px;
  }
}
</style>
