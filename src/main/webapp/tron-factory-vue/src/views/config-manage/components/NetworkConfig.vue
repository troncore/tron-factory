<template>
  <div class="network-config">
    <el-card class="box-body" shadow="hover">
      <el-form ref="network-config-form" :rules="networkRules" :model="form" label-width="200px" label-position="left">

        <div @click="showContent = !showContent">
          <i :class="showContent ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          {{ $t('tronSettingHttp') }}
        </div>

        <template v-if="showContent">
          <el-form-item label="maxHttpConnectNumber" prop="node_maxHttpConnectNumber" class="baseFormItem mgt20">
            <el-input
              size="small"
              :maxlength="50"
              v-model.trim="form.node_maxHttpConnectNumber"
              :placeholder="$t('tronmaxHttpConnectNumberPlaceholder')">
            </el-input>
          </el-form-item>

          <el-form-item class="baseFormItem" label="httpFullNodePort" prop="node_http_fullNodePort">
            <el-input
              size="small"
              :maxlength="50"
              v-model.trim="form.node_http_fullNodePort"
              :placeholder="$t('tronhttpFullNodePortPlaceholder')">
            </el-input>
          </el-form-item>

          <el-form-item class="baseFormItem" label="httpSolidityPort" prop="node_http_solidityPort">
            <el-input
              size="small"
              :maxlength="50"
              v-model.trim="form.node_http_solidityPort"
              :placeholder="$t('tronhttpHttpSolidityPortPlaceholder')">
            </el-input>
          </el-form-item>

          <el-form-item class="baseFormItem" label="rpcPort" prop="node_rpc_port">
            <el-input
              size="small"
              :maxlength="50"
              v-model.trim="form.node_rpc_port"
              :placeholder="$t('tronhttpRpcPortPlaceholder')">
            </el-input>
          </el-form-item>

          <el-form-item class="baseFormItem" label="rpcSolidityPort" prop="node_rpc_solidityPort">
            <el-input
              size="small"
              :maxlength="50"
              v-model.trim="form.node_rpc_solidityPort"
              :placeholder="$t('tronhttpRpcSolidityPortPlaceholder')">
            </el-input>
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
  data() {
    return {
      showContent: true,
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

  created () {
    this.form = { ...this.configInfo.networkConfig }
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
          // TODO POST
          /*this.$_api.settingApi.networkSettingApi(params, err => {
            this.loading = false
            if (err) return

            this.$message.success(this.$t('tronSettingNetworkSaveSuccess'))
            this.$emit('next-step')
          })*/
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
