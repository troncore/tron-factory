<template>
  <div class="box-view  network-config">
    <div class="box-body">
      <el-form class="im-form" ref="network-config-form" :rules="formRules" :model="form">

        <div class="switch-item">
          <span class="label">fullNodeEnable </span>
          <el-switch v-model="form.node_http_fullNodeEnable"></el-switch>
        </div>
        <el-form-item prop="node_http_fullNodePort">
          <span slot="label">httpFullNodePort <i class="help-tips">({{ $t('configuration.helpTips.httpFullNodePort') }})</i></span>
          <el-input v-model.trim="form.node_http_fullNodePort" type="number" min="0" max="65535" :disabled="!form.node_http_fullNodeEnable" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>
        <el-form-item prop="node_maxHttpConnectNumber">
          <span slot="label">maxHttpConnectNumber <i class="help-tips">({{ $t('configuration.helpTips.maxHttpConnectNumber') + ': 0 - 200' }})</i></span>
          <el-input v-model.trim="form.node_maxHttpConnectNumber" type="number" min="0" max="200" :disabled="!form.node_http_fullNodeEnable" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <div class="switch-item">
          <span class="label">solidityEnable </span>
          <el-switch v-model="form.node_http_solidityEnable"></el-switch>
        </div>

        <el-form-item prop="node_http_solidityPort">
          <span slot="label">httpSolidityPort <i class="help-tips">({{ $t('configuration.helpTips.httpSolidityPort') }})</i></span>
          <el-input v-model.trim="form.node_http_solidityPort" type="number" min="0" max="65535" :disabled="!form.node_http_solidityEnable"  clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <br>

        <el-form-item prop="node_rpc_port">
          <span slot="label">rpcPort <i class="help-tips">({{ $t('configuration.helpTips.rpcPort') }})</i></span>
          <el-input v-model.trim="form.node_rpc_port" type="number" min="0" max="65535" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <el-form-item prop="node_rpc_solidityPort">
          <span slot="label">rpcSolidityPort <i class="help-tips">({{ $t('configuration.helpTips.rpcSolidityPort') }})</i></span>
          <el-input v-model.trim="form.node_rpc_solidityPort" type="number" min="0" max="65535" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div  class="box-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button large" :loading="loading" :disabled="configLoading" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
    </div>

  </div>
</template>
<script>
import { formRules } from "@/utils/validate";
export default {
  name: 'network-config',
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
        node_http_fullNodeEnable: true,
        node_maxHttpConnectNumber: '',
        node_http_fullNodePort: '',
        node_http_solidityEnable: true,
        node_http_solidityPort: '',
        node_rpc_port: '',
        node_rpc_solidityPort: '',
      },

      loading: false,
    }
  },
  computed: {
    formRules() {
      let validatePort = [
        { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false ), trigger: 'blur', },
        { validator: formRules.numMax(65535, this.$t('base.valid.maxPortValue')), trigger: 'blur', },
      ]
      let validateHttpConnectNumber = [
        { validator: formRules.numMin(0, this.$t('base.valid.gteZeroInt'), ), trigger: 'blur', },
        { validator: formRules.numMax(200, this.$t('base.valid.maxNumberValue') + ': 200'), trigger: 'blur', },
      ]

      return {
        node_http_fullNodePort: [
          { required: this.form.node_http_fullNodeEnable, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ...(this.form.node_http_fullNodeEnable ? validatePort : [])
        ],
        node_maxHttpConnectNumber: [
          { required: this.form.node_http_fullNodeEnable, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ...(this.form.node_http_fullNodeEnable ? validateHttpConnectNumber : [])
        ],
        node_http_solidityPort: [
          { required: this.form.node_http_solidityEnable, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ...(this.form.node_http_solidityEnable ? validatePort : [])
        ],
        node_rpc_port: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ...validatePort
        ],
        node_rpc_solidityPort: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ...validatePort
        ],
      }
    },
  },

  created () {
    this.getConfigInfo()
  },

  methods: {
    getConfigInfo() {
      this.initConfigInfo().then(res => this.form = res || {})
    },

    handleSubmit() {
      this.$refs['network-config-form'].validate(valid => {
        if (valid) {
          let params = {
            fullNodeEnable: this.form.node_http_fullNodeEnable,
            maxHttpConnectNumber: this.form.node_http_fullNodeEnable ? this.form.node_maxHttpConnectNumber : undefined,
            httpFullNodePort: this.form.node_http_fullNodeEnable ? this.form.node_http_fullNodePort : undefined,

            solidityEnable: this.form.node_http_solidityEnable,
            httpSolidityPort: this.form.node_http_solidityEnable ? this.form.node_http_solidityPort : undefined,

            rpcPort: this.form.node_rpc_port,
            rpcSolidityPort: this.form.node_rpc_solidityPort,
          }

          this.loading = true
          this.$_api.configuration.networkConfig(params, err => {
            this.loading = false
            if (err) return

            this.$notify({
              type: 'success',
              title: this.$t('base.successful'),
              message: this.$t('configuration.networkSaveSuccess')
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
<style lang="scss">
  .network-config {
    .switch-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      margin-top: 50px;
      &:first-child {
        margin-top: 0;
      }
      color: rgba(8, 28, 86, 1);
      .label {
        display: inline-block;
        width: 220px;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
</style>
