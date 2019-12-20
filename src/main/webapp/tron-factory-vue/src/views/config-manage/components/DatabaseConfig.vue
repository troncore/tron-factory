<template>
  <div class="database-config">
    <el-card class="box-body" shadow="hover">
      <el-form ref="database-config-form" :rules="formRules" :model="form" label-width="250px" label-position="left">
        <div @click="showContent = !showContent">
          <i :class="showContent ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"/>
          {{ $t('tronSettingDb') }}
        </div>

        <template v-if="showContent">
          <el-form-item class="mgt20" :label="$t('tronSettingwriteSynchronously')" prop="storage_db_sync">
            <el-switch v-model="form.storage_db_sync"></el-switch>
          </el-form-item>

          <el-form-item :label="$t('tronSettingOpenTransaction')" prop="storage_transHistory_switch">
            <el-switch active-value="on" inactive-value="off" v-model="form.storage_transHistory_switch"></el-switch>
          </el-form-item>

          <el-form-item :label="$t('tronSelectDatabaseConfiguration')" prop="storage_db_engine">
            <el-radio-group v-model="form.storage_db_engine">
              <el-radio :label="'LEVELDB'">leveldb</el-radio>
              <el-radio :label="'ROCKSDB'">rocksdb</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('tronSettingIndexDirectory')" prop="storage_index_directory">
            <el-switch active-value="index" v-model="form.storage_index_directory"></el-switch>
          </el-form-item>

          <el-form-item :label="$t('tronSettingNeedToUpdateAsset')" prop="storage_needToUpdateAsset">
            <el-switch v-model="form.storage_needToUpdateAsset"></el-switch>
          </el-form-item>
        </template>
      </el-form>
    </el-card>

    <div class="box-footer align-right">
      <el-button size="small" type="primary" @click="handleCancel">{{ $t('tronSettingPreviousStep') }}</el-button>
      <el-button size="small" type="primary" @click="handleSubmit">{{ $t('tronSettingNextStep') }}</el-button>
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
          { required: true, message: this.$t('tronSettingPlaceholder'), trigger: 'change', },
        ],
        storage_transHistory_switch: { required: true, message: this.$t('tronSettingPlaceholder'), trigger: 'change', },
        storage_db_engine: { required: true, message: this.$t('tronSettingPlaceholder'), trigger: 'change', },
        storage_index_directory: { required: true, message: this.$t('tronSettingPlaceholder'), trigger: 'change', },
        storage_needToUpdateAsset: { required: true, message: this.$t('tronSettingPlaceholder'), trigger: 'change', },
      },
      showContent: true,
      loading: false,
    }
  },

  created () {
    this.form = { ...this.configInfo.dbConfig }
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
          // TODO POST
          this.$_api.settingApi.dbconfigApi(params, err => {
            this.loading = false
            if (err) return

            this.$message.success(this.$t('tronSettingDBSaveSuccess'))
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
  padding-right: 80px;

  .el-form-item {
    width: 600px;
  }

  .box-footer {
    &.align-right {
      margin-top: 40px;
      text-align: right;
    }
  }
}
</style>
