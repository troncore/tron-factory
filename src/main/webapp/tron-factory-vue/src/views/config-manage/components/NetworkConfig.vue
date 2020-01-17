<template>
  <div class="box-view  network-config">

    <div class="box-header title">{{ $t('configManage.netWorkConfig') }}</div>

    <div class="box-body">
      <el-form ref="network-config-form" :rules="networkRules" :model="form">

        <div class="switch-item">
          <span class="label">fullNodeHttpEnable </span>
          <el-switch v-model="form.node_http_fullNodeEnable"></el-switch>
        </div>
        <el-form-item prop="node_maxHttpConnectNumber">
          <span slot="label">maxHttpConnectNumber <i class="help-tips">({{ $t('configManage.helpTips.maxHttpConnectNumber') }})</i></span>
          <el-input v-model.trim="form.node_maxHttpConnectNumber" :maxlength="50" :disabled="!form.node_http_fullNodeEnable" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>
        <el-form-item prop="node_http_fullNodePort">
          <span slot="label">httpFullNodePort <i class="help-tips">({{ $t('configManage.helpTips.httpFullNodePort') }})</i></span>
          <el-input v-model.trim="form.node_http_fullNodePort" :maxlength="50" :disabled="!form.node_http_fullNodeEnable" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <div class="switch-item">
          <span class="label">solidityNodeHttpEnable </span>
          <el-switch v-model="form.node_http_solidityEnable"></el-switch>
        </div>

        <el-form-item prop="node_http_solidityPort">
          <span slot="label">httpSolidityPort <i class="help-tips">({{ $t('configManage.helpTips.httpSolidityPort') }})</i></span>
          <el-input v-model.trim="form.node_http_solidityPort" :maxlength="50" :disabled="!form.node_http_solidityEnable"  clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <br>

        <el-form-item prop="node_rpc_port">
          <span slot="label">rpcPort <i class="help-tips">({{ $t('configManage.helpTips.rpcPort') }})</i></span>
          <el-input v-model.trim="form.node_rpc_port" :maxlength="50"clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <el-form-item prop="node_rpc_solidityPort">
          <span slot="label">rpcSolidityPort <i class="help-tips">({{ $t('configManage.helpTips.rpcSolidityPort') }})</i></span>
          <el-input v-model.trim="form.node_rpc_solidityPort" :maxlength="50" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div  class="box-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button large" :loading="loading" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
    </div>

  </div>
</template>
<script>
import { isvalidateNum } from '@/utils/validate.js'
import { isvalidateIntegerNum } from "@/utils/validate";
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
    networkRules() {
      const validNum = (rule, value, callback) => {
        if (!isvalidateIntegerNum(value)) {
          callback(new Error(this.$t('configManage.valid.gteZeroInt')))
        } else {
          callback()
        }
      }
      const validMaxNum = (rule, value, callback) => {
        if (value > 2147483647) {
          callback(new Error(this.$t('configManage.valid.maxNumberValue')))
        } else {
          callback()
        }
      }
      const validPortNum = (rule, value, callback) => {
        if (value > 65535) {
          callback(new Error(this.$t('configManage.valid.maxPortValue')))
        } else {
          callback()
        }
      }

      let node_maxHttpConnectNumber = [
        { required: !!this.form.node_http_fullNodeEnable, message: this.$t('base.pleaseInput'), trigger: 'blur', },
      ]
      let node_http_fullNodePort = [
        { required: !!this.form.node_http_fullNodeEnable, message: this.$t('base.pleaseInput'), trigger: 'blur', },
      ]
      if (!!this.form.node_http_fullNodeEnable) {
        node_maxHttpConnectNumber = node_maxHttpConnectNumber.concat([
          { validator: validNum, trigger: 'blur', },
          { validator: validMaxNum, trigger: 'blur', }
        ])
        node_http_fullNodePort = node_http_fullNodePort.concat([
          { validator: validNum, trigger: 'blur', },
          { validator: validPortNum, trigger: 'blur', },
        ])
      }

      let node_http_solidityPort = [
        { required: !!this.form.node_http_solidityEnable, message: this.$t('base.pleaseInput'), trigger: 'blur', },
      ]
      if (!!this.form.node_http_solidityEnable) {
        node_http_solidityPort = node_http_solidityPort.concat([
          { validator: validNum, trigger: 'blur', },
          { validator: validPortNum, trigger: 'blur', },
        ])
      }

      return {
        node_maxHttpConnectNumber,
        node_http_fullNodePort,
        node_http_solidityPort,
        node_rpc_port: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: validNum, trigger: 'blur', },
          { validator: validPortNum, trigger: 'blur', },
        ],
        node_rpc_solidityPort: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: validNum, trigger: 'blur', },
          { validator: validPortNum, trigger: 'blur', },
        ],
      }
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
            fullNodeHttpEnable: this.form.node_http_fullNodeEnable,
            maxHttpConnectNumber: this.form.node_http_fullNodeEnable ? this.form.node_maxHttpConnectNumber : undefined,
            httpFullNodePort: this.form.node_http_fullNodeEnable ? this.form.node_http_fullNodePort : undefined,

            solidityNodeHttpEnable: this.form.node_http_solidityEnable,
            httpSolidityPort: this.form.node_http_solidityEnable ? this.form.node_http_solidityPort : undefined,

            rpcPort: this.form.node_rpc_port,
            rpcSolidityPort: this.form.node_rpc_solidityPort,
          }

          this.loading = true
          this.$_api.configManage.networkConfig(params, err => {
            this.loading = false
            if (err) return

            this.$message.success(this.$t('configManage.networkSaveSuccess'))
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
