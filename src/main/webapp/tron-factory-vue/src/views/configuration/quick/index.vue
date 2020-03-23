<template>
  <div class="box-view quick-config">
    <div class="box-body">
      <div class="box-card">
        <div class="config-title">{{ $t('configuration.genesisInfo') }}</div>
        <genesis-config :init-config-info="initConfigInfo"></genesis-config>
      </div>

      <div class="box-card">
        <div class="config-title">{{ $t('configuration.p2pConfig') }}</div>
        <el-form ref="p2p-config-form" :rules="formRules" :model="form" label-position="top">
          <el-form-item prop="node_p2p_version" label="p2pVersion">
            <span slot="label">p2pVersion <i class="help-tips">({{ $t('configuration.helpTips.p2pVersion') }})</i></span>
            <el-input v-model.trim="form.node_p2p_version" type="number" :maxlength="50" :placeholder="$t('base.pleaseInput')"></el-input>
          </el-form-item>

          <el-form-item label="listenPort" prop="node_listen_port">
            <span slot="label">listenPort <i class="help-tips">({{ $t('configuration.helpTips.listenPort') }})</i></span>
            <el-input v-model.trim="form.node_listen_port" :maxlength="50" :placeholder="$t('base.pleaseInput')"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="box-footer align-right">
      <el-button class="im-button large" :loading="loading" type="primary" @click="handleSubmit">{{ $t('base.complete') }}</el-button>
    </div>

  </div>
</template>

<script>
  import GenesisConfig from "../define/components/GenesisConfig";
  import { isvalidateIntegerNum } from "@/utils/validate";
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
      }
    },
    computed: {
      formRules() {
        const validNum = (rule, value, callback) => {
          if (!isvalidateIntegerNum(value)) {
            callback(new Error(this.$t('configuration.valid.gteZeroInt')))
          } else {
            callback()
          }
        }
        const validMaxNum = (rule, value, callback) => {
          if (value > 2147483647) {
            callback(new Error(this.$t('configuration.valid.maxNumberValue')))
          } else {
            callback()
          }
        }
        const validMainnet = (rule, value, callback) => {
          if (value == 11111) {
            callback(new Error(this.$t('configuration.valid.mainnetPlaceholder')))
          } else {
            callback()
          }
        }
        const validTestNet = (rule, value, callback) => {
          if (value == 20180622) {
            callback(new Error(this.$t('configuration.valid.testnetPlaceholder')))
          } else {
            callback()
          }
        }
        const validSpecialNet = (rule, value, callback) => {
          if (value == 1) {
            callback(new Error(this.$t('configuration.valid.specialPlaceholder')))
          } else {
            callback()
          }
        }
        const validPortNum = (rule, value, callback) => {
          if (value > 65535) {
            callback(new Error(this.$t('configuration.valid.maxPortValue')))
          } else {
            callback()
          }
        }
        const rules = {
          node_p2p_version: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
            { validator: validNum, trigger: 'blur', },
            { validator: validMainnet, trigger: 'blur', },
            { validator: validTestNet, trigger: 'blur', },
            { validator: validSpecialNet, trigger: 'blur', },
            { validator: validMaxNum, trigger: 'blur', },
          ],
          node_listen_port: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
            { validator: validNum, trigger: 'blur', },
            { validator: validPortNum, trigger: 'blur', },
          ],
        }
        return rules
      },
    },
    created () {

    },
    methods: {
      // get configure info: invoke in genesis-config
      initConfigInfo (stepConfig) {
        return new Promise(resolve => {
          this.$_api.configuration.getConfigInfo({}, (err, res = {}) => {
            if (err) return resolve({})
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

    /deep/ .el-form-item {
      .el-form-item__label {
        padding: 0;
        font-size: 16px;
        color: rgba(8, 28, 86, .7);

        .unit {
          font-size: 14px;
          color: rgba(8, 28, 86, .5);
        }
        .help-tips {
          font-size: 14px;
          color: rgba(8, 28, 86, .5);
        }
      }
    }
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