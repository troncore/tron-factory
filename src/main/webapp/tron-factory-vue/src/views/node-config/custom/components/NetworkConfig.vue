<template>
  <div class="box-view  network-config">
    <div class="box-body">
      <el-form class="im-form" ref="network-config-form" :rules="formRules" :model="form">

        <div class="switch-item">
          <span class="label">fullNodeEnable </span>
          <el-switch v-model="form.fullNodeEnable"></el-switch>
        </div>
        <el-form-item prop="httpFullNodePort">
          <span slot="label">httpFullNodePort <i class="help-tips">({{ $t('configuration.helpTips.httpFullNodePort') }})</i></span>
          <el-input v-model.trim="form.httpFullNodePort" type="number" min="0" max="65535" :disabled="!form.fullNodeEnable" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>
        <el-form-item prop="maxHttpConnectNumber">
          <span slot="label">maxHttpConnectNumber <i class="help-tips">({{ $t('configuration.helpTips.maxHttpConnectNumber') + ': 0 - 200' }})</i></span>
          <el-input v-model.trim="form.maxHttpConnectNumber" type="number" min="0" max="200" :disabled="!form.fullNodeEnable" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <div class="switch-item">
          <span class="label">solidityEnable</span>
          <el-switch v-model="form.solidityEnable"></el-switch>
        </div>

        <el-form-item prop="httpSolidityPort">
          <span slot="label">httpSolidityPort <i class="help-tips">({{ $t('configuration.helpTips.httpSolidityPort') }})</i></span>
          <el-input v-model.trim="form.httpSolidityPort" type="number" min="0" max="65535" :disabled="!form.solidityEnable"  clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>


        <el-form-item prop="rpcPort">
          <span slot="label">rpcPort <i class="help-tips">({{ $t('configuration.helpTips.rpcPort') }})</i></span>
          <el-input v-model.trim="form.rpcPort" type="number" min="0" max="65535" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <el-form-item prop="rpcSolidityPort" class="margin-bottom-0">
          <span slot="label">rpcSolidityPort <i class="help-tips">({{ $t('configuration.helpTips.rpcSolidityPort') }})</i></span>
          <el-input v-model.trim="form.rpcSolidityPort" type="number" min="0" max="65535" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div  class="box-footer">
      <el-button class="im-button large" :loading="loading" :disabled="disabled" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
    </div>

  </div>
</template>
<script>
import { formRules } from "@/utils/validate";
export default {
  name: 'network-config',
  data() {
    return {
      form: {
        id: '',
        fullNodeEnable: true,
        httpFullNodePort: '',
        maxHttpConnectNumber: '',
        solidityEnable: true,
        httpSolidityPort: '',
        rpcPort: '',
        rpcSolidityPort: '',
      },
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
      let validatePort = [
        { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false ), trigger: 'blur', },
        { validator: formRules.numMax(65535, this.$t('base.valid.maxPortValue')), trigger: 'blur', },
      ]
      let validateHttpConnectNumber = [
        { validator: formRules.numMin(0, this.$t('base.valid.gteZeroInt'), ), trigger: 'blur', },
        { validator: formRules.numMax(200, this.$t('base.valid.maxNumberValue') + ': 200'), trigger: 'blur', },
      ]

      return {
        httpFullNodePort: [
          { required: this.form.fullNodeEnable, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ...(this.form.fullNodeEnable ? validatePort : [])
        ],
        maxHttpConnectNumber: [
          { required: this.form.fullNodeEnable, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ...(this.form.fullNodeEnable ? validateHttpConnectNumber : [])
        ],
        httpSolidityPort: [
          { required: this.form.solidityEnable, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ...(this.form.solidityEnable ? validatePort : [])
        ],
        rpcPort: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ...validatePort
        ],
        rpcSolidityPort: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ...validatePort
        ],
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
      this.$_api.getStarted.getNetworkConfig({ id: this.opNodeId }, (err, res = {}) => {
        if (err) return
        this.disabled = false

        this.initForm(res)
      })
    },

    initForm(data) {
      this.form = {
        id: this.opNodeId,
        fullNodeEnable: data.node_http_fullNodeEnable,
        httpFullNodePort: data.node_http_fullNodePort,
        maxHttpConnectNumber: data.node_maxHttpConnectNumber,
        solidityEnable: data.node_http_solidityEnable,
        httpSolidityPort: data.node_http_solidityPort,
        rpcPort: data.node_rpc_port,
        rpcSolidityPort: data.node_rpc_solidityPort,
      }
    },

    handleSubmit() {
      this.$refs['network-config-form'].validate(valid => {
        if (valid) {
          let params = {
            id: this.opNodeId,
            fullNodeEnable: this.form.fullNodeEnable,
            httpFullNodePort: this.form.fullNodeEnable ? Number(this.form.httpFullNodePort) : undefined,
            maxHttpConnectNumber: this.form.fullNodeEnable ? Number(this.form.maxHttpConnectNumber) : undefined,
            solidityEnable: this.form.solidityEnable,
            httpSolidityPort: this.form.solidityEnable ? Number(this.form.httpSolidityPort) : undefined,
            rpcPort: Number(this.form.rpcPort),
            rpcSolidityPort: Number(this.form.rpcSolidityPort),
          }

          this.loading = true
          this.$_api.getStarted.setNetworkConfig(params, err => {
            this.loading = false
            if (err) return

            this.$notify.success({
              title: this.$t('base.successful'),
              message: this.$t('configuration.networkSaveSuccess')
            })
            this.$emit('next-step')
          })
        }
      })
    },

    validNode () {
      // edit node
      if (!/\d+/.test(this.opNodeId)) {
        this.$notify.warning({
          title: this.$t('base.warning'),
          message: this.$t('当前所编辑的节点为无效节点!'),
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
<style lang="scss">
  .network-config {
    .switch-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      margin-top: 20px;
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
