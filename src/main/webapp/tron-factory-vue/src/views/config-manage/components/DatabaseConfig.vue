<template>
  <div class="database-config">
    <el-card>
      <div class="box-header title">{{ $t('tronSettingHttp') }}</div>
      <div class="box-body">
        <el-form ref="database-config-form" :rules="formRules" :model="form" label-position="top">
          <el-form-item :label="$t('tronSettingwriteSynchronously')" prop="storage_db_sync">
            <el-switch v-model="form.storage_db_sync"></el-switch>
          </el-form-item>

          <el-form-item :label="$t('tronSettingOpenTransaction')" prop="storage_transHistory_switch">
            <el-switch v-model="form.storage_transHistory_switch" active-value="on" inactive-value="off"></el-switch>
          </el-form-item>

          <el-form-item :label="$t('tronSelectDatabaseConfiguration')" prop="storage_db_engine">
            <el-radio-group v-model="form.storage_db_engine">
              <el-radio :label="'LEVELDB'">leveldb</el-radio>
              <el-radio :label="'ROCKSDB'">rocksdb</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('tronSettingIndexDirectory')" prop="storage_index_directory">
            <el-switch active-value="index"  inactive-value="is not open index directory" v-model="form.storage_index_directory"></el-switch>
          </el-form-item>

          <el-form-item :label="$t('tronSettingNeedToUpdateAsset')" prop="storage_needToUpdateAsset">
            <el-switch v-model="form.storage_needToUpdateAsset"></el-switch>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <div class="box-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button large" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
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
@import "~@/assets/styles/base.scss";
.database-config {
  /deep/ .el-card {
    .el-card__body {
      padding: 30px;
    }
  }

  .box-header {
    margin-bottom: 30px;
    &.title {
      font-size: 20px;
      font-weight: bold;
      color: #081C56;
    }
  }

  /deep/ .el-form-item {
    display: inline-block;
    margin-right: 150px;
    width: 350px;
    @media screen and (max-width: $media1680){
      margin-right: 120px;
      width: 300px;
    }

    .el-form-item__label {
      padding: 0;
      font-size: 16px;
      color: rgba(8, 28, 86, .7);
    }
  }
  .box-footer {
    margin-top: 40px;
    &.align-right {
      text-align: right;
    }
  }
}
</style>
