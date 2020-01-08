<template>
  <div class="box-view database-config">
    <div class="box-header title">{{ $t('configManage.databaseConfig') }}</div>
    <div class="box-body">
      <el-form ref="database-config-form" :rules="formRules" :model="form" label-position="top">
        <el-form-item :label="$t('configManage.isWriteSync')" prop="storage_db_sync">
          <el-switch v-model="form.storage_db_sync"></el-switch>
        </el-form-item>

        <el-form-item :label="$t('configManage.isOpenTransaction')" prop="storage_transHistory_switch">
          <el-switch v-model="form.storage_transHistory_switch" active-value="on" inactive-value="off"></el-switch>
        </el-form-item>

        <el-form-item :label="$t('configManage.selectDatabaseConfig')" prop="storage_db_engine">
          <el-radio-group v-model="form.storage_db_engine">
            <el-radio :label="'LEVELDB'">LevelDB</el-radio>
            <el-radio :label="'ROCKSDB'">RocksDB</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="$t('configManage.isOpenIndexDirectory')" prop="storage_index_directory">
          <el-switch active-value="index"  inactive-value="is not open index directory" v-model="form.storage_index_directory"></el-switch>
        </el-form-item>

        <el-form-item :label="$t('configManage.isNeedToUpdateAsset')" prop="storage_needToUpdateAsset">
          <el-switch v-model="form.storage_needToUpdateAsset"></el-switch>
        </el-form-item>
      </el-form>
    </div>

    <div class="box-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button large" :loading="loading" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'database-config',
  props: {
    configInfo: {
      type: Object,
      required: true,
    },
    initConfigInfo: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
      form: {},
      formRules: {
        storage_db_sync: [
          { required: true, message: this.$t('base.pleaseSelect'), trigger: 'change', },
        ],
      },
      showContent: true,
      loading: false,
    }
  },

  watch: {
    configInfo: {
      handler (val = {}) {
        this.form = { ...val.dbConfig }
      },
      immediate: true,
    },
  },

  methods: {
    handleSubmit() {
      this.$refs['database-config-form'].validate(valid => {
        if (valid) {
          let params = {
            isDBSync: this.form.storage_db_sync,
            isOpenTransaction: this.form.storage_transHistory_switch,
            dbEnine: this.form.storage_db_engine,
            indexDirectory: this.form.storage_index_directory,
            needToUpdateAsset: this.form.storage_needToUpdateAsset,
          }

          this.loading = true
          this.$_api.configManage.dbConfig(params, err => {
            this.loading = false
            if (err) return

            this.$message.success(this.$t('configManage.databaseSaveSuccess'))
            this.$emit('next-step')
          })
        }
      })
    },

    handleCancel() {
      this.$emit('prev-step')
    },
  },
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.database-config {
}
</style>
