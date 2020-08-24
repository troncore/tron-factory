<template>
  <div class="node-add-edit">
    <div class="page-title">{{ $t(this.isAddPage ? 'getStarted.nodesManage.addNode': 'getStarted.nodesManage.editNode') }}</div>
    <el-form ref="form" :rules="formRules" :model="form" size="medium" label-width="160px" label-position="left">
      <div class="chain-info im-card">
        <div class="card-header">{{ $t('getStarted.nodesManage.serverInfo') }}</div>
        <div class="card-body">
          <el-form-item prop="ip">
            <span slot="label">{{ $t('getStarted.nodesManage.ip') }}</span>
            <el-input v-model.trim="form.ip" class="width-350" tabindex="1" :placeholder="$t('getStarted.nodesManage.ipPlaceholder')" clearable />
          </el-form-item>
          <el-form-item prop="listenPort">
            <span slot="label" class="space-between">
              {{ $t('getStarted.nodesManage.listenPort') }}
              <im-tooltip :content="$t('getStarted.nodesManage.listenPortTips')" />
            </span>
            <el-input v-model.trim="form.listenPort" type="number" min="1" max="65535" class="width-350" tabindex="2" clearable />
          </el-form-item>
        </div>

        <!-- shh config -->
        <div class="card-header">{{ $t('getStarted.nodesManage.sshInfo') }}</div>
        <div class="card-body">
          <el-form-item prop="sshConnectType" class="is-required">
            <span slot="label">{{ $t('getStarted.nodesManage.sshConnectType') }}</span>
            <el-radio v-model="form.sshConnectType" :label="2">{{ $t('getStarted.nodesManage.byPublicKey') }}</el-radio>
            <el-radio v-model="form.sshConnectType" :label="1">{{ $t('getStarted.nodesManage.byPassword') }}</el-radio>
          </el-form-item>
          <div class="line-item" :class="{'margin-bottom-0': form.sshConnectType === 2}">
            <el-form-item prop="userName" class="inline-block">
              <span slot="label">{{ $t('getStarted.nodesManage.sshUserName') }}</span>
              <el-input v-model.trim="form.userName" class="width-350" tabindex="3" clearable />
            </el-form-item>
            <el-form-item prop="port" class="inline-block" label-width="100px">
              <span slot="label">{{ $t('getStarted.nodesManage.port') }}</span>
              <el-input v-model.trim="form.port" class="port-item" type="number" min="1" max="65535" tabindex="4" clearable />
            </el-form-item>
          </div>
          <el-form-item prop="sshPassword" class="margin-bottom-0" v-if="form.sshConnectType === 1">
            <span slot="label">{{ $t('getStarted.nodesManage.sshPassword') }}</span>
            <el-input v-model.trim="form.sshPassword" class="width-350" tabindex="5" clearable />
          </el-form-item>
        </div>
      </div>

      <div class="chain-info im-card">
        <div class="card-header">{{ $t('getStarted.nodesManage.nodeType') }}</div>
        <div class="card-body">
          <el-form-item prop="isSR" label-width="0" :class="{'margin-bottom-0':!form.isSR}">
            <el-radio v-model="form.isSR" :label="true">{{ $t('getStarted.nodesManage.superNode') }} <im-tooltip :content="$t('getStarted.nodesManage.superNodeTips')"/></el-radio>
            <el-radio v-model="form.isSR" :label="false">{{ $t('getStarted.nodesManage.fullNode') }} <im-tooltip :content="$t('getStarted.nodesManage.fullNodeTips')"/></el-radio>
          </el-form-item>
        </div>
        <div class="card-header" v-if="form.isSR">{{ $t('getStarted.nodesManage.superNodeInfo') }}</div>
        <div class="card-body" v-if="form.isSR">
          <el-form-item prop="url">
            <span slot="label" class="space-between">
              {{ $t('getStarted.nodesManage.url') }}
              <im-tooltip :content="$t('getStarted.nodesManage.urlTips')" />
            </span>
            <el-input v-model.trim="form.url" class="width-350" tabindex="6" clearable placeholder="http://" />
          </el-form-item>
          <el-form-item prop="voteCount">
            <span slot="label" class="space-between">
              {{ $t('getStarted.nodesManage.voteCount') }}
              <im-tooltip :content="$t('getStarted.nodesManage.voteCountTips')" />
            </span>
            <el-input v-model.trim="form.voteCount" class="width-350" tabindex="7" clearable />
          </el-form-item>
          <el-form-item prop="publicKey">
            <span slot="label" class="space-between">
              {{ $t('getStarted.nodesManage.publicKey') }}
              <im-tooltip :content="$t('getStarted.nodesManage.publicKeyTips')" />
            </span>
            <div class="address-item">
              <el-input v-model.trim="form.publicKey" tabindex="8" clearable :placeholder="$t('getStarted.nodesManage.publicKeyPlaceholder')">
                <el-button slot="append" type="primary" class="one-key" @click="handleOneKey">{{ $t('getStarted.nodesManage.oneKey') }}</el-button>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item class="margin-bottom-0" prop="privateKey">
            <span slot="label" class="space-between">
              {{ $t('getStarted.nodesManage.privateKey') }}
              <im-tooltip :content="$t('getStarted.nodesManage.privateKeyTips')" />
            </span>
            <el-input
                v-model.trim="form.privateKey"
                tabindex="9"
                class="private-key"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                :placeholder="$t('getStarted.nodesManage.privateKeyPlaceholder')"/>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div class="page-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.cancel') }}</el-button>
      <el-button class="im-button large" type="primary" :disabled="disabled" :loading="loading" @click="handleSubmit">{{ $t('base.save') }}</el-button>
    </div>
  </div>
</template>

<script>
  import ImTooltip from "@/components/ImTooltip"
  import { transferBigIntToString } from "@/utils/common";
  import { formRules, validate } from "@/utils/validate"
  export default {
    name: "node-add-edit",
    components: { ImTooltip },
    data () {
      return {
        form: {
          ip: '',
          listenPort: '18888',
          port: 22,
          sshConnectType: 2, // 1 password, 2 key
          userName: '',
          sshPassword: '',
          isSR: true,
          url: 'http://',
          voteCount: '1000001',
          publicKey: '',
          privateKey: '',
        },
        nodeInfo: {}, // assign when edit
        tempPublicKey: '', // to compare whether it change origin publicKey
        safePrivateKey: Array(64).fill('*').join(''),
        disabled: false,
        loading: false,
      }
    },
    computed: {
      isAddPage () {
        return this.$route.params.status === 'node-add'
      },
      opNodeId () {
        let id = this.$route.query.id
        return /\d+/.test(id) ? Number(id) : undefined
      },
      formRules() {
        // for back-end data limit
        let longIntMax = BigInt(2**63) - BigInt(1)

        const longIntRange = (rule, value, callback) => {
          let errorMessage = ''

          if (!/^(-)?\d+$/.test(value)) errorMessage = this.$t('base.valid.integer')
          else if (value < 0) errorMessage = this.$t('base.valid.gteZeroInt')
          else if (BigInt(value) > longIntMax) errorMessage = this.$t('base.valid.maxNumberValue') + ': ' + longIntMax

          if (errorMessage) callback(new Error(errorMessage))
          else callback()
        }

        const validPrivateKey = (rule, value, callback) => {
          if (value.length !== 64) {
            callback(new Error(this.$t('getStarted.nodesManage.privateKeyCheck')))
          } else {
            callback()
          }
        }
        const validServerAddress = (rule, value, callback) => {
          const validIP =  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(value)
          const validName = /^(([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])$/.test(value)

          if(validIP || validName) callback()
          else callback(new Error(this.$t('getStarted.nodesManage.ipCheckRight')))
        }

        let portBaseLimit = [
          { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false ), trigger: 'change', },
          { validator: formRules.numMax(65535, this.$t('base.valid.maxPortValue')), trigger: 'change', },
        ]

        return {
          ip: [
            { required: true, message: ' ', trigger: 'change', },
            { validator: validServerAddress, trigger: 'change', },
          ],
          listenPort: [
            { required: true, message: ' ', trigger: 'change', },
            ...portBaseLimit
          ],
          userName: [
            { required: true, message: ' ', trigger: 'change', },
          ],
          port: [
            { required: true, message: ' ', trigger: 'change', },
            ...portBaseLimit
          ],
          sshPassword: [
            { required: true, message: ' ', trigger: 'change', },
          ],
          url: [
            { required: true, message: ' ', trigger: 'change', },
          ],
          voteCount: [
            { required: true, message: ' ', trigger: 'change', },
            { validator: longIntRange, trigger: 'change', },
          ],
          publicKey: [
            { required: true, message: ' ', trigger: 'change', },
          ],
          privateKey: [
            { required: true, message: ' ', trigger: 'change', },
            { required: true, validator: validPrivateKey, trigger: 'change', },
          ],
        }
      },
    },
    created () {
      this.getNodeInfo()
    },
    methods: {
      // when it's editing page
      getNodeInfo () {
        if (this.isAddPage || !this.validNode) return false

        this.form.isSR = false // for hide  layout when start render
        this.form.sshConnectType = 2 // for hide  layout when start render
        this.disabled = true

        this.$_api.getStarted.getNodeInfo({id: this.opNodeId}, (err, res = {}) => {
          if (err) return
          this.disabled = false
          this.nodeInfo = res

          this.initForm()
        })
      },

      initForm() {
        const nodeInfo = this.nodeInfo
        this.form = {
          ip: nodeInfo.ip || '',
          listenPort: nodeInfo.listenPort || '',
          sshConnectType: Number(nodeInfo.sshConnectType) || 1,
          userName: nodeInfo.userName || '',
          port: nodeInfo.port || 22,
          sshPassword: nodeInfo.sshPassword || '',
          isSR: nodeInfo.hasOwnProperty('isSR') ? Boolean(nodeInfo.isSR) : true,
          url: JSON.stringify(nodeInfo.url).slice(3).slice(0, -3) || 'http://',
          voteCount: nodeInfo.voteCount || '',
          publicKey: nodeInfo.publicKey || '',
          privateKey: nodeInfo.publicKey ? this.safePrivateKey : '',
        }
        this.tempPublicKey = nodeInfo.publicKey
      },

      handleSubmit () {
        this.$refs['form'].validate(valid => {
          if (valid) {
            const params = {}
            if (!this.initParams(params)) return

            if (params.isSR && (params.publicKey !== this.tempPublicKey || params.privateKey)) {
              // for show user to save private key tips
              this.$confirm(this.$t('getStarted.nodesManage.saveAddressPriKey'), this.$t('base.tips'), {
                cancelButtonText: this.$t('base.cancel'),
                confirmButtonText: this.$t('base.confirm'),
                center: true,
                customClass: 'im-message-box',
                cancelButtonClass: 'im-message-cancel-button primary',
                confirmButtonClass: 'im-message-confirm-button primary',
              }).then(() => this.addNode(params))
                .catch(err => console.log('err: ', err))
            } else this.addNode(params)
          }
        })
      },

      // format submit params
      initParams(params) {
        // invalid edit node
        if (!this.isAddPage && !this.validNode) return false

        let baseParams = {
          ip: this.form.ip,
          listenPort: Number(this.form.listenPort),
          userName: this.form.userName,
          port: Number(this.form.port),
          sshConnectType: this.form.sshConnectType,
          sshPassword: this.form.sshConnectType === 1 ? this.form.sshPassword : undefined,
          isSR: this.form.isSR,
        }

        let srParams = {
          url: `"${this.form.url}"`,
          voteCount: transferBigIntToString(this.form.voteCount),
          publicKey: this.form.publicKey,
          privateKey: this.form.privateKey !== this.safePrivateKey ? this.form.privateKey : undefined,
        }

        Object.assign(params, {
          id: !this.isAddPage && Number.isInteger(this.opNodeId) ? this.opNodeId : undefined,
          ...baseParams,
          ...(baseParams.isSR && srParams),
        })
        return true
      },

      validNode () {
        // edit node
        if (!/\d+/.test(this.opNodeId)) {
          this.$notify.warning({
            title: this.$t('base.warning'),
            message: this.$t('getStarted.nodesManage.opUnValidNode'),
          })
          return false
        }
        return true
      },

      addNode (params) {
        this.loading = true

        let api = this.isAddPage ? 'addNoteInfo' : 'editNoteInfo'
        this.$_api.getStarted[api](params, (err, res = {}) => {
          this.loading = false
          if (err) return

          if (res.hasOwnProperty('status')) {
            let errorMsg = ''
            switch (res.status) {
              case 1:
                errorMsg = 'getStarted.nodesManage.sshConnectFail'
                break
              case 2:
                errorMsg = 'getStarted.nodesManage.addressNotPrivateKey'
                break
              default:
                errorMsg = 'base.error'
            }
            this.$notify.error({
              title: this.$t('base.error'),
              message: this.$t(errorMsg),
            })
          } else {
            // default it's success
            let msg = this.isAddPage ? 'getStarted.nodesManage.addNodeSuccess' : 'getStarted.nodesManage.updateNodeSuccess'
            this.$notify.success({
              title: this.$t('base.successful'),
              message: this.$t(msg),
            })
            this.$router.push('/get-started')
          }
        })
      },

      handleCancel () {
        history.back()
      },

      handleOneKey () {
        this.$_api.getStarted.getOneKey({ }, (err, res = {}) => {
          if (err) return
          this.form.publicKey = res.publicKey
          this.form.privateKey = res.privateKey
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
.node-add-edit {
  margin-bottom: 100px;
}
.page-title {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 18px;
  color: $black-light;
}
.im-card {
  padding: 20px;
  margin-bottom: 20px;
  .card-header {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 14px;
    color: $black-light;
  }
}
.line-item {
  margin-bottom: 20px;
  .inline-block {
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 0;
  }
}

.el-form {
  .address-item {

    .el-input {
      width: 450px
    }
    .one-key {
      width: 100px;
    }
  }

  .port-item {
    width: 200px
  }

  .private-key {
    width: 700px;
  }

  .margin-bottom-0 {
    margin-bottom: 0;
  }

  .width-350 {
    width: 350px
  }
}

</style>
