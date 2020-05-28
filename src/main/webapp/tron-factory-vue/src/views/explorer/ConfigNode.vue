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
        <el-form-item class="node-type">
          <el-radio v-model="form.nodeType" label="1">{{ $t('explorer.deployedNode') }}</el-radio>
          <el-radio v-model="form.nodeType" label="2">{{ $t('explorer.defineNode') }}</el-radio>
        </el-form-item>
        <el-form-item v-if="form.nodeType === '1'" prop="deployedURL" key="deployedURL">
          <el-select v-model="form.deployedURL" style="width: 100%;" clearable filterable :placeholder="$t('base.pleaseSelect')">
            <el-option
              v-for="item in deployedNodeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.nodeType === '2'" prop="defineURL" key="defineURL">
          <el-input type="text" v-model="form.defineURL" style="width: 100%;" clearable :placeholder="$t('base.pleaseInput')"/>
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
          deployedURL: '',
          defineURL: '',
        },
        formRules: {
          deployedURL: [
            { required: true, message: this.$t('base.pleaseSelect'), trigger: 'change' }
          ],
          defineURL: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur' }
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
    created () {
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
              nodeURL: this.form.nodeType === '1' ? this.form.deployedURL : this.form.defineURL,
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
