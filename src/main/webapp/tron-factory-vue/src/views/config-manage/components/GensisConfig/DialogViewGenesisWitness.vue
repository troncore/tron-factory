<template>
  <el-dialog
    :visible.sync="dialogVisible"
    custom-class="im-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="680px"
    center>

    <div slot="title" class="dialog-header">
      <div class="title">{{ $t('tronWitenessSetting') }}</div>
    </div>

    <div class="dialog-content">

      <el-form :model="witnessInfo" label-width="120px" label-position="right">
        <el-form-item label="Address :" prop="address">
          {{ witnessInfo.address }}
        </el-form-item>

        <el-form-item label="URL :" prop="url">
          {{ witnessInfo.url }}
        </el-form-item>

        <el-form-item label="VoteCount :" prop="voteCount">
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
