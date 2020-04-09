<template>
  <div class="box-view quick-config">
    <div class="box-body">
      <div class="box-card">
        <div class="config-title">{{ $t('configuration.genesisInfo') }}</div>
        <genesis-config :init-config-info="initConfigInfo"></genesis-config>
      </div>

      <div class="box-card">
        <div class="config-title">{{ $t('configuration.p2pConfig') }}</div>
        <el-form class="im-form" ref="p2p-config-form" :rules="formRules" :model="form" label-position="top">
          <el-form-item prop="node_p2p_version" label="p2pVersion">
            <span slot="label">p2pVersion <i class="help-tips">({{ $t('configuration.helpTips.p2pVersion') }})</i></span>
            <el-input v-model.trim="form.node_p2p_version" type="number" min="0" max="2147483647" :placeholder="$t('base.pleaseInput')"></el-input>
          </el-form-item>

          <el-form-item label="listenPort" prop="node_listen_port">
            <span slot="label">listenPort <i class="help-tips">({{ $t('configuration.helpTips.listenPort') }})</i></span>
            <el-input v-model.trim="form.node_listen_port" type="number" min="0" max="65535" :placeholder="$t('base.pleaseInput')"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="box-footer align-right">
      <el-button class="im-button large" :loading="loading" :disabled="configLoading" type="primary" @click="handleSubmit">{{ $t('base.complete') }}</el-button>
    </div>

  </div>
</template>

<script>
  import GenesisConfig from "../custom/components/GenesisConfig";
  import { formRules } from "@/utils/validate";
  export default {
    name: "quick-config",
    components: { GenesisConfig },
    data () {
      return {
        form: {
          node_p2p_version: '',
          node_listen_port: '',
        },
        loading: false,
        configLoading: false,
      }
    },
    computed: {
      formRules() {
        return {
          node_p2p_version: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
            { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false), trigger: 'blur', },
            { validator: formRules.numMax(2147483647, this.$t('base.valid.maxNumberValue') + ': 2147483647'), trigger: 'blur', },
            { validator: formRules.numEqual(11111, this.$t('configuration.valid.mainnetPlaceholder') + ': 11111'), trigger: 'blur', },
            { validator: formRules.numEqual(20180622, this.$t('configuration.valid.testnetPlaceholder') + ': 20180622'), trigger: 'blur', },
            { validator: formRules.numEqual(1, this.$t('configuration.valid.specialPlaceholder') + ': 1'), trigger: 'blur', },
          ],
          node_listen_port: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
            { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false ), trigger: 'blur', },
            { validator: formRules.numMax(65535, this.$t('base.valid.maxPortValue')), trigger: 'blur', },
          ],
        }
      },
    },
    methods: {
      // get configure info: invoke in genesis-config
      initConfigInfo (stepConfig) {
        return new Promise(resolve => {
          this.configLoading = true
          this.$_api.configuration.getConfigInfo({}, (err, res = {}) => {
            if (err) return resolve({})
            this.configLoading = false
            if (stepConfig === 'genesis') {
              resolve({
                genesisAssetConfig: res.genesisAssetConfig,
                genesisWitnessConfig: res.genesisWitnessConfig
              })
            }

            this.form.node_p2p_version = res.p2pConfig.node_p2p_version
            this.form.node_listen_port = res.p2pConfig.node_listen_port
          })
        })
      },

      handleSubmit() {
        this.$refs['p2p-config-form'].validate(valid => {
          if (valid) {
            let params = {
              p2pVersion: this.form.node_p2p_version,
              listenPort: this.form.node_listen_port,
              configStatus: 0,
            }

            this.loading = true
            this.$_api.configuration.p2pConfig(params, err => {
              this.loading = false
              if (err) return

              this.$notify({
                type: 'success',
                title: this.$t('base.successful'),
                message: this.$t('base.success.operate')
              })

              this.$router.push({
                path: '/nodes-manage'
              })
            })
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
.quick-config {
  padding: 0;
  .box-card {
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
  }
  .config-title {
    /*margin-bottom: 15px;*/
    font-size: 18px;
    font-weight: bold;
    color: #081C56;
  }

  /deep/ .genesis-config {
    padding: 0;
    .box-footer {
      display: none;
    }
  }

  .el-form {
    width: 500px;
  }
  .box-footer {
    position: absolute;
    bottom: -60px;
    left: 20px;
    right: 20px;
    padding-bottom: 20px;
  }
}
</style>
