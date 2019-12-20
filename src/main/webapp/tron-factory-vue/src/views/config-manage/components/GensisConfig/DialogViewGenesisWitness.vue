<template>
  <el-dialog
    center
    width="700px"
    :title="$t('tronWitenessSetting')"
    :visible.sync="dialogVisible">
    <el-form
      ref="witenessDialogForm"
      :model="witnessInfo"
      label-width="120px"
      label-position="left">
      <el-form-item label="address" prop="address">
        {{ witnessInfo.address }}
      </el-form-item>
      <el-form-item label="url" prop="url">
        {{ witnessInfo.url }}
      </el-form-item>
      <el-form-item label="voteCount" prop="voteCount">
        {{ witnessInfo.voteCount }}
      </el-form-item>
    </el-form>
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
