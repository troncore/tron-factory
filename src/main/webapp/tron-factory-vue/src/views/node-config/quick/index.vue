<template>
  <div class="box-view quick-config">
    <div class="box-body">
      <div class="box-card">
        <el-form class="im-form" ref="p2p-config-form" :rules="formRules" :model="form" label-position="top">
          <el-form-item prop="httpFullNodePort">
            <span slot="label">httpFullNodePort <i class="help-tips">({{ $t('nodeConfig.helpTips.httpFullNodePort') }})</i></span>
            <el-input v-model.trim="form.httpFullNodePort" type="number" min="0" max="65535" clearable :placeholder="$t('base.pleaseInput')"></el-input>
          </el-form-item>

          <el-form-item prop="rpcPort" class="margin-bottom-0">
            <span slot="label">rpcPort <i class="help-tips">({{ $t('nodeConfig.helpTips.rpcPort') }})</i></span>
            <el-input v-model.trim="form.rpcPort" type="number" min="0" max="65535" clearable :placeholder="$t('base.pleaseInput')"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="box-footer">
      <el-button class="im-button large" :loading="loading" :disabled="disable" type="primary" @click="handleSubmit">{{ $t('base.complete') }}</el-button>
    </div>
  </div>
</template>

<script>

  import { formRules } from "@/utils/validate";
  import ImTooltip from "@/components/ImTooltip";
  export default {
    name: "quick-config",
    components: { ImTooltip },
    data () {
      return {
        form: {
          httpFullNodePort: '',
          rpcPort: '',
        },
        disable: true,
        loading: false,
      }
    },
    computed: {
      opNodeId () {
        let id = this.$route.query.id
        return /\d+/.test(id) ? Number(id) : undefined
      },
      formRules() {
        let portLimit = [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false ), trigger: 'blur', },
          { validator: formRules.numMax(65535, this.$t('base.valid.maxPortValue')), trigger: 'blur', },
        ]
        return {
          httpFullNodePort: [...portLimit],
          rpcPort: [...portLimit],
        }
      },
    },
    created () {
      this.getConfig()
    },
    methods: {
      getConfig () {
        if (!this.validNode()) return

        this.disable = true
        this.$_api.getStarted.getQuickConfig({ id: this.opNodeId }, (err, res = {}) => {
          if (err) return
          this.disable = false

          this.initForm(res)
        })
      },

      initForm(data) {
        this.form = {
          httpFullNodePort: data.node_http_fullNodePort,
          rpcPort: data.node_rpc_port,
        }
      },

      handleSubmit() {
        this.$refs['p2p-config-form'].validate(valid => {
          if (valid) {
            if (!this.validNode()) return

            let params = {
              id: this.opNodeId,
              httpFullNodePort: Number(this.form.httpFullNodePort),
              rpcPort: Number(this.form.rpcPort),
              configStatus: 1,
            }

            this.loading = true
            this.$_api.getStarted.setQuickConfig(params, err => {
              this.loading = false
              if (err) return

              this.$notify.success({
                title: this.$t('base.successful'),
                message: this.$t('base.success.operate')
              })

              this.$router.push('/get-started/dashboard')
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

  .el-form {
    width: 500px;
  }
  .box-footer {
    position: absolute;
    bottom: -40px;
    left: 20px;
    right: 20px;
    padding-bottom: 20px;
  }
}

.margin-bottom-0 {
  margin-bottom: 0;
}
</style>
