<template>
  <div class="network-config">
    <el-card>
      <div class="box-header title">{{ $t('tronSettingHttp') }}</div>

      <div class="box-body">
        <el-form ref="network-config-form" :rules="networkRules" :model="form">
          <el-form-item label="maxHttpConnectNumber" prop="node_maxHttpConnectNumber" class="baseFormItem mgt20">
            <el-input v-model.trim="form.node_maxHttpConnectNumber" :maxlength="50" :placeholder="$t('tronmaxHttpConnectNumberPlaceholder')"></el-input>
          </el-form-item>

          <el-form-item class="baseFormItem" label="httpFullNodePort" prop="node_http_fullNodePort">
            <el-input v-model.trim="form.node_http_fullNodePort" :maxlength="50" :placeholder="$t('tronhttpFullNodePortPlaceholder')"></el-input>
          </el-form-item>

          <el-form-item class="baseFormItem" label="httpSolidityPort" prop="node_http_solidityPort">
            <el-input v-model.trim="form.node_http_solidityPort" :maxlength="50" :placeholder="$t('tronhttpHttpSolidityPortPlaceholder')"></el-input>
          </el-form-item>

          <el-form-item class="baseFormItem" label="rpcPort" prop="node_rpc_port">
            <el-input v-model.trim="form.node_rpc_port" :maxlength="50" :placeholder="$t('tronhttpRpcPortPlaceholder')"></el-input>
          </el-form-item>

          <el-form-item class="baseFormItem" label="rpcSolidityPort" prop="node_rpc_solidityPort">
            <el-input v-model.trim="form.node_rpc_solidityPort" :maxlength="50" :placeholder="$t('tronhttpRpcSolidityPortPlaceholder')"></el-input>
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
import { isvalidateNum } from '@/utils/validate.js'
export default {
  name: 'network-config',
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
      form: {
        node_maxHttpConnectNumber: '',
        node_http_solidityPort: '',
        node_http_fullNodePort: '',
        node_rpc_port: '',
        node_rpc_solidityPort: '',
      },

      loading: false,
    }
  },
  computed: {
    networkRules() {
      const validNum = (rule, value, callback) => {
        if (!isvalidateNum(value)) {
          callback(new Error(this.$t('tronSettingNumberPlaceholder')))
        } else {
          callback()
        }
      }
      const validMaxNum = (rule, value, callback) => {
        if (value > 2147483647) {
          callback(new Error(this.$t('tronNumberPlaceholder')))
        } else {
          callback()
        }
      }
      const validPortNum = (rule, value, callback) => {
        if (value > 65535) {
          callback(new Error(this.$t('tronPortNumberPlaceholder')))
        } else {
          callback()
        }
      }
      const rules = {
        node_maxHttpConnectNumber: [
          {
            required: true,
            message: this.$t('tronmaxHttpConnectNumberPlaceholder'),
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingNumberPlaceholder'),
            validator: validNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validMaxNum,
            trigger: 'blur',
          },
        ],
        node_http_fullNodePort: [
          {
            required: true,
            message: this.$t('tronhttpFullNodePortPlaceholder'),
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingNumberPlaceholder'),
            validator: validNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validPortNum,
            trigger: 'blur',
          },
        ],
        node_http_solidityPort: [
          {
            required: true,
            message: this.$t('tronhttpHttpSolidityPortPlaceholder'),
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingNumberPlaceholder'),
            validator: validNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validPortNum,
            trigger: 'blur',
          },
        ],
        node_rpc_port: [
          {
            required: true,
            message: this.$t('tronhttpRpcPortPlaceholder'),
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingNumberPlaceholder'),
            validator: validNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validPortNum,
            trigger: 'blur',
          },
        ],
        node_rpc_solidityPort: [
          {
            required: true,
            message: this.$t('tronhttpRpcSolidityPortPlaceholder'),
            trigger: 'blur',
          },
          {
            message: this.$t('tronSettingNumberPlaceholder'),
            validator: validNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validPortNum,
            trigger: 'blur',
          },
        ],
      }
      return rules
    },
  },
  watch: {
    configInfo: {
      handler (val = {}) {
        this.form = { ...val.networkConfig }
      },
      immediate: true,
    },
  },

  methods: {
    handleSubmit() {
      this.$refs['network-config-form'].validate(valid => {
        if (valid) {
          let params = {
            maxHttpConnectNumber: this.form.node_maxHttpConnectNumber,
            rpcPort: this.form.node_rpc_port,
            rpcSolidityPort: this.form.node_rpc_solidityPort,
            httpFullNodePort: this.form.node_http_fullNodePort,
            httpSolidityPort: this.form.node_http_solidityPort,
          }

          this.loading = true
          this.$_api.settingApi.networkSettingApi(params, err => {
            this.loading = false
            if (err) return

            this.$message.success(this.$t('tronSettingNetworkSaveSuccess'))
            this.$emit('next-step')
          })
          this.$emit('next-step')
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
.network-config {
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
