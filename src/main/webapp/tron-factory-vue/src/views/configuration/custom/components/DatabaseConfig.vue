<template>
  <div class="box-view database-config">
    <div class="box-body">
      <el-form ref="database-config-form" :model="form" :rules="formRules" label-position="left" label-width="200px">

        <el-form-item :label="$t('configuration.selectDatabaseConfig')" prop="storage_db_engine">
          <el-radio-group v-model="form.dbEnine">
            <el-radio :label="'LEVELDB'">LevelDB</el-radio>
            <el-radio :label="'ROCKSDB'">RocksDB</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('configuration.isWriteSync')" prop="storage_db_sync">
          <el-switch v-model="form.isDBSync"></el-switch>
        </el-form-item>

        <el-form-item :label="$t('configuration.isOpenTransaction')" prop="storage_transHistory_switch">
          <el-switch v-model="form.isOpenTransaction" active-value="on" inactive-value="off"></el-switch>
        </el-form-item>

        <el-form-item :label="$t('configuration.isNeedToUpdateAsset')" prop="storage_needToUpdateAsset">
          <el-switch v-model="form.needToUpdateAsset"></el-switch>
        </el-form-item>

        <div class="more-setting">
          <el-checkbox v-model="checkDBCustom" @change="handleChangeCheckCustom"><span class="check-label">{{ $t('configuration.dbCustomModule') }}</span></el-checkbox>
        </div>
        <el-form-item
          ref="db-custom"
          class="db-custom"
          prop="dbCustom">
          <el-input
            v-model.trim="form.dbCustom"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            :maxlength="300"
            :disabled="!checkDBCustom"
            :placeholder="$t(checkDBCustom ? 'configuration.valid.inputDBCustom': 'configuration.valid.checkDBCustom')">
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="box-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button large" :loading="loading" :disabled="configLoading" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
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
    },
    configLoading: Boolean,
  },
  data() {
    return {
      form: {
        dbEnine: '',
        isDBSync: false,
        isOpenTransaction: '',
        needToUpdateAsset: false,
        dbCustom: '',
      },
      checkDBCustom: false,
      showContent: true,
      loading: false,
    }
  },
  computed: {
    formRules() {
      const pathEndJAR = (rule, value, callback) => {
        if (this.checkDBCustom && !this.form.dbCustom.endsWith('.jar')) {
          callback(new Error(this.$t('configuration.valid.pathEndJAR')))
        } else {
          callback()
        }
      }
      return {
        dbCustom: [
          { required: this.checkDBCustom, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: pathEndJAR, trigger: 'blur', },
        ]
      }
    },
  },

  created () {
    this.getConfigInfo()
  },

  methods: {
    getConfigInfo() {
      this.initConfigInfo().then((res ={}) => {
        this.form.dbEnine = res.storage_db_engine
        this.form.isDBSync = res.storage_db_sync
        this.form.isOpenTransaction = res.storage_transHistory_switch
        this.form.needToUpdateAsset = res.storage_needToUpdateAsset
        this.form.dbCustom = res.storage_db_custom || ''

        this.checkDBCustom = !!this.form.dbCustom
      })
    },

    handleChangeCheckCustom (val) {
      if (val) {
        setTimeout(this.$refs['db-custom'].clearValidate, 0)
      }
    },
    handleSubmit() {
      this.$refs['database-config-form'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$_api.configuration.dbConfig(this.form, err => {
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
  .box-body {
    width: 100% !important;
  }
  .el-form {
    /deep/.el-form-item {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 10px;
      }
      .el-form-item__label {
        color: font-color();
      }
    }
  }

  /deep/ .more-setting {
    margin: 10px 0;
    .check-label {
      font-size: 14px;
      color: font-color();
    }
  }

  /deep/ .db-custom {
    width: 50%;
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>
