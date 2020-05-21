<template>
  <el-dialog
    :visible.sync="dialogVisible"
    custom-class="im-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="680px"
    center>
    <div slot="title" class="dialog-header">
      <div class="title">{{ $t('配置节点') }}</div>
    </div>

    <div class="dialog-content">
      <div class="form-item">
        <el-radio v-model="nodeType" label="1">{{ $t('已部署节点') }}</el-radio>
        <el-radio v-model="nodeType" label="2">{{ $t('自定义节点') }}</el-radio>
      </div>
      <div v-if="nodeType === '1'" class="form-item">
        <el-select v-model="deployedNode" style="width: 100%;" :placeholder="$t('请选择')">
          <el-option
            v-for="item in deployedNodeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div v-if="nodeType === '2'" class="form-item">
        <el-input type="text" v-model="defineNode" style="width: 100%;" :placeholder="$t('请输入')"/>
      </div>
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
        nodeType: '1',
        deployedNode: '',
        defineNode: '',
        nodeInfo: '',
        deployedNodeList: [{
          value: '1.1.1.1:1111',
          label: '1.1.1.1:1111'
        }, {
          value: '2.2.2.2:2222',
          label: '2.2.2.2:2222'
        }, {
          value: '3.3.3.3:3333',
          label: '3.3.3.3:3333'
        }],
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
        this.$emit('success', this.nodeInfo)
        this.dialogVisible = false
      },

    },
  }
</script>

<style scoped lang="scss">
.el-dialog {
  .dialog-content {
    margin-bottom: 30px;
  }
  .form-item {
    margin-bottom: 15px;
  }
}
</style>
