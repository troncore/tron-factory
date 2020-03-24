<template>
  <div class="box-view database-config">
    <div class="box-body">
      <el-form class="im-form" ref="database-config-form" :model="form" label-position="left" label-width="200px">

        <el-form-item :label="$t('configuration.selectDatabaseConfig')" prop="storage_db_engine">
          <el-radio-group v-model="form.storage_db_engine">
            <el-radio :label="'LEVELDB'">LevelDB</el-radio>
            <el-radio :label="'ROCKSDB'">RocksDB</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('configuration.isWriteSync')" prop="storage_db_sync">
          <el-switch v-model="form.storage_db_sync"></el-switch>
        </el-form-item>

        <el-form-item :label="$t('configuration.isOpenTransaction')" prop="storage_transHistory_switch">
          <el-switch v-model="form.storage_transHistory_switch" active-value="on" inactive-value="off"></el-switch>
        </el-form-item>

        <el-form-item :label="$t('configuration.isNeedToUpdateAsset')" prop="storage_needToUpdateAsset">
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
    initConfigInfo: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
      form: {},
      showContent: true,
      loading: false,
    }
  },

  created () {
    this.getConfigInfo()
  },

  methods: {
    getConfigInfo() {
      this.initConfigInfo().then(res => this.form = res || {})
    },
    handleSubmit() {
      this.$refs['database-config-form'].validate(valid => {
        if (valid) {
          let params = {
            isDBSync: this.form.storage_db_sync,
            isOpenTransaction: this.form.storage_transHistory_switch,
            dbEnine: this.form.storage_db_engine,
            needToUpdateAsset: this.form.storage_needToUpdateAsset,
          }

          this.loading = true
          this.$_api.configuration.dbConfig(params, err => {
            this.loading = false
            if (err) return

            this.$notify({
              type: 'success',
              title: this.$t('base.successful'),
              message: this.$t('configuration.databaseSaveSuccess')
            })
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
