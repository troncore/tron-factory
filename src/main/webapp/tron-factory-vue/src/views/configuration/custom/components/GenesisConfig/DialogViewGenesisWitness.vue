<template>
  <el-dialog
    :visible.sync="dialogVisible"
    custom-class="im-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="680px"
    center>

    <div slot="title" class="dialog-header">
      <div class="title">{{ $t('configuration.witnessDialogTitle') }}</div>
    </div>

    <div class="dialog-content">

      <el-form :model="witnessInfo" label-width="90px" label-position="left">
        <el-form-item label="address :" prop="address">
          {{ witnessInfo.address }}
        </el-form-item>

        <el-form-item label="URL :" prop="url">
          {{ witnessInfo.url }}
        </el-form-item>

        <el-form-item label="voteCount :" prop="voteCount">
          {{ witnessInfo.voteCount }}
        </el-form-item>
      </el-form>

    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "DialogViewGenesisWitness",
    props: {
      visible: {},
      witnessInfo: {},
    },
    computed: {
      dialogVisible: {
        get () {
          return this.visible
        },
        set (val) {
          this.$emit('update:visible', val)
        },
      },
    }
  }
</script>

<style scoped>

</style>
