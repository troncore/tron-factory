<template>
  <div class="box-view database-config">
    <div class="box-body">
      <el-form ref="database-config-form" :model="form" :rules="formRules" label-position="left" label-width="200px">

        <el-form-item :label="$t('nodeConfig.selectDatabaseConfig')" prop="dbEngine">
          <el-radio-group v-model="form.dbEngine">
            <el-radio :label="'LEVELDB'">LevelDB</el-radio>
            <el-radio :label="'ROCKSDB'">RocksDB</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('nodeConfig.isWriteSync')" prop="isDBSync">
          <el-switch v-model="form.isDBSync"></el-switch>
        </el-form-item>

        <el-form-item :label="$t('nodeConfig.isOpenTransaction')" prop="isOpenTransaction">
          <el-switch v-model="form.isOpenTransaction"></el-switch>
        </el-form-item>

        <template v-if="form.dbEngine === 'ROCKSDB'">
          <el-form-item :label="$t('nodeConfig.backupEnable')" prop="backupEnable">
            <el-switch v-model="form.backupEnable"></el-switch>
          </el-form-item>

          <el-form-item :label="$t('nodeConfig.backupFrequency')" prop="backupFrequency">
            <el-input v-model.trim="form.backupFrequency" type="number" min="0" max="2147483647" clearable :placeholder="$t('base.pleaseInput')" style="width: 200px;"></el-input>
          </el-form-item>
        </template>

        <div class="more-setting">
          <el-checkbox v-model="checkDBCustom" @change="handleChangeCheckCustom"><span class="check-label">{{ $t('nodeConfig.dbCustomModule') }}</span></el-checkbox>
        </div>
        <el-form-item
          ref="db-custom"
          class="db-custom margin-bottom-0"
          prop="dbCustom">
          <el-input
            v-model.trim="form.dbCustom"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            :maxlength="300"
            :disabled="!checkDBCustom"
            :placeholder="$t(checkDBCustom ? 'nodeConfig.valid.inputDBCustom': 'nodeConfig.valid.checkDBCustom')">
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="box-footer">
      <el-button class="im-button large" :loading="loading" :disabled="disabled" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
    </div>
  </div>
</template>
<script>
import { formRules } from "@/utils/validate";
export default {
  name: 'database-config',
  data() {
    return {
      form: {
        id: '',
        dbEngine: '',
        isDBSync: false,
        isOpenTransaction: true,
        backupEnable: false,
        backupFrequency: '',
        dbCustom: '',
      },
      checkDBCustom: false,
      disabled: true,
      loading: false,
    }
  },
  computed: {
    opNodeId () {
      let id = this.$route.query.id
      return /\d+/.test(id) ? Number(id) : undefined
    },
    formRules() {
      const pathEndJAR = (rule, value, callback) => {
        if (this.checkDBCustom && !this.form.dbCustom.endsWith('.jar')) {
          callback(new Error(this.$t('nodeConfig.valid.pathEndJAR')))
        } else {
          callback()
        }
      }
      return {
        backupFrequency: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), ), trigger: 'blur', },
          { validator: formRules.numMax(2147483647, this.$t('base.valid.maxNumberValue') + ': 2147483647'), trigger: 'blur', },
        ],
        dbCustom: [
          { required: this.checkDBCustom, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: pathEndJAR, trigger: 'blur', },
        ]
      }
    },
  },

  created () {
    this.getConfig()
  },
  methods: {
    getConfig () {
      if (!this.validNode()) return

      this.disabled = true
      this.$_api.getStarted.getDBConfig({ id: this.opNodeId }, (err, res = {}) => {
        if (err) return
        this.disabled = false

        this.initForm(res)
      })
    },

    initForm(data) {
      this.form = {
        id: this.opNodeId,
        dbEngine: data.storage_db_engine,
        isDBSync: data.storage_db_sync,
        isOpenTransaction: data.storage_transHistory_switch,
        backupEnable: data.storage_backup_enable,
        backupFrequency: data.storage_backup_frequency,
        dbCustom: data.storage_db_custom,
      }
      this.checkDBCustom = !!this.form.dbCustom
    },

    handleSubmit() {
      this.$refs['database-config-form'].validate(valid => {
        if (valid) {
          let params = {
            id: this.opNodeId,
            dbEngine: this.form.dbEngine,
            isDBSync: this.form.isDBSync,
            isOpenTransaction: this.form.isOpenTransaction,
            backupEnable: this.form.backupEnable,
            backupFrequency: Number(this.form.backupFrequency),
            dbCustom:this.checkDBCustom ? this.form.dbCustom : '',
          }

          this.loading = true
          this.$_api.getStarted.setDBConfig(params, err => {
            this.loading = false
            if (err) return

            this.$notify.success({
              title: this.$t('base.successful'),
              message: this.$t('nodeConfig.databaseSaveSuccess')
            })
            this.$emit('next-step')
          })
        }
      })
    },

    handleChangeCheckCustom (val) {
      if (val) {
        setTimeout(this.$refs['db-custom'].clearValidate, 0)
      }
    },

    validNode () {
      // edit node
      if (!/\d+/.test(this.opNodeId)) {
        this.$notify.warning({
          title: this.$t('base.warning'),
          message: this.$t('nodeConfig.opUnValidNode'),
        })
        return false
      }
      return true
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
