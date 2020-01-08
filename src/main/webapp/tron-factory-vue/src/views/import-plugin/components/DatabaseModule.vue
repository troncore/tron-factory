<template>
  <div class="database-module box-view">
    <div class="box-header title">{{ $t('tronPluginDatabaseModule') }}</div>

    <div class="box-body">

      <el-form ref="form-box" :model="form" :rules="formRules" label-position="top">

        <el-form-item prop="dbEngine">
          <el-radio-group v-model="form.dbEngine">
            <el-radio disabled :label="'leveldb'">LevelDB</el-radio>
            <el-radio disabled :label="'rocksdb'">RocksDB</el-radio>
          </el-radio-group>
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
  name: 'database-module',
  props: {
    pluginInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        dbEngine: 'leveldb',
      },
      contentShow: true,
      loading: false,

      formRules: {
        dbEngine: [{ required: true, message: this.$t('tronSettingPlaceholder'), trigger: 'blur', },],
      },
    }
  },

  watch: {
    pluginInfo: {
      handler (val = {}) {
        this.form.dbEngine = val.dbEngine || 'leveldb'
      },
      immediate: true,
    },
  },

  methods: {
    handleCancel () {
      this.$emit('prev-step')
    },

    handleSubmit() {
      this.$refs['form-box'].validate(valid => {
        if (valid) {
          let params = {
            dbEngine: this.form.dbEngine
          }

          this.loading = true
          this.$_api.importPlugin.dbEngineApi(params, (err, res) => {
            this.loading = false
            if (err) return

            this.$message.success(this.$t('tronPluginDatabaseSaveSuccess'))
            this.$emit('next-step')
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
