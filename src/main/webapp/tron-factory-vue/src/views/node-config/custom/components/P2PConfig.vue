<template>
  <div class="box-view p2p-config">
    <div class="box-body">
      <el-form class="im-form" ref="p2p-config-form" :rules="formRules" :model="form" label-position="top">
        <el-form-item prop="maxActiveNodes">
          <span slot="label">maxActiveNodes <i class="help-tips">({{ $t('nodeConfig.helpTips.maxActiveNodes') }})</i></span>
          <el-input v-model.trim="form.maxActiveNodes" type="number" min="0" max="200" :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <el-form-item prop="maxActiveNodesWithSameIp">
          <span slot="label">maxActiveNodesWithSameIp <i class="help-tips">({{ $t('nodeConfig.helpTips.maxActiveNodesWithSameIp') }})</i></span>
          <el-input v-model.trim="form.maxActiveNodesWithSameIp" type="number" min="0" max="50" :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <el-form-item prop="activeConnectFactor">
          <span slot="label">activeConnectFactor</span>
          <el-input v-model.trim="form.activeConnectFactor" type="number" min="0" max="1" step="0.1" :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <el-form-item prop="connectFactor" class="margin-bottom-0">
          <span slot="label">connectFactor</span>
          <el-input v-model.trim="form.connectFactor" type="number" min="0" max="1" step="0.1" :placeholder="$t('base.pleaseInput')"></el-input>
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
  name: 'p2p-config',
  data() {
    return {
      form: {
        id: '',
        maxActiveNodes: '',
        maxActiveNodesWithSameIp: '',
        activeConnectFactor: '',
        connectFactor: '',
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
      return {
        maxActiveNodes: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false), trigger: 'blur', },
          { validator: formRules.numMax(200, this.$t('base.valid.maxNumberValue') + ': 200'), trigger: 'blur', },
        ],
        activeConnectFactor: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: formRules.numMin(0, this.$t('base.valid.gtZeroNum'), false, false), trigger: 'blur', },
          { validator: formRules.numMax(1, this.$t('base.valid.maxNumberValue') + ': 1', true, false), trigger: 'blur', },
        ],
        maxActiveNodesWithSameIp: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false), trigger: 'blur', },
          { validator: formRules.numMax(50, this.$t('base.valid.maxNumberValue') + ': 50'), trigger: 'blur', },
        ],
        connectFactor: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: formRules.numMin(0, this.$t('base.valid.gtZeroNum'), false, false), trigger: 'blur', },
          { validator: formRules.numMax(1, this.$t('base.valid.maxNumberValue') + ': 1', true, false), trigger: 'blur', },
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
      this.$_api.getStarted.getP2PConfig({ id: this.opNodeId }, (err, res = {}) => {
        if (err) return
        this.disabled = false

        this.initForm(res)
      })
    },

    initForm(data) {
      this.form = {
        id: this.opNodeId,
        maxActiveNodes: data.node_maxActiveNodes,
        maxActiveNodesWithSameIp: data.node_maxActiveNodesWithSameIp,
        activeConnectFactor: data.node_activeConnectFactor,
        connectFactor: data.node_connectFactor,
      }
    },

    handleSubmit() {
      this.$refs['p2p-config-form'].validate(valid => {
        if (valid) {
          let params = {
            id: this.opNodeId,
            maxActiveNodes: Number(this.form.maxActiveNodes),
            maxActiveNodesWithSameIp: Number(this.form.maxActiveNodesWithSameIp),
            activeConnectFactor: Number(this.form.activeConnectFactor),
            connectFactor: Number(this.form.connectFactor),
          }

          this.loading = true
          this.$_api.getStarted.setP2PConfig(params, err => {
            this.loading = false
            if (err) return

            this.$notify.success({
              title: this.$t('base.successful'),
              message: this.$t('nodeConfig.p2pSaveSuccess')
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

<style lang="scss" scoped>
.p2p-config {
  /deep/ .seed-node-list {
    display: block;
    width: 100%;

    .el-checkbox {
      display: inline-flex;
      align-items: center;
      margin-right: 120px;
      width: 300px;
      margin-bottom: 20px;

      .el-checkbox__label {
        flex: 1;
      }
      .el-input-group__prepend {
        width: 200px;
      }
    }
  }
}
</style>
