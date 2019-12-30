<!-- 产品/销售 添加属性 - 属性要求 - 选择型 -->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :append-to-body="false"
    class="im-dialog"
    width="50%">

    <div slot="title" class="dialog-header"></div>

    <div class="dialog-content">
      阿斯顿发生
    </div>


    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="handleSubmit">保存</el-button>
      <el-button size="mini" @click="handleCancel">取消</el-button>
    </div>

  </el-dialog>
</template>

<script>
  export default {
    name: "im-dialog",
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      title: String,
    },
    data () {
      return {

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

      },
      handleCancel () {

      },
    }
  }
</script>

<style lang='scss' scoped>
/deep/ .im-dialog {
  .el-dialog__header {}
  .el-dialog__body {
    padding: 0 20px 20px;

    .footer-btns {
      margin-top: 20px;
      text-align: right;
    }
  }
}
</style>
