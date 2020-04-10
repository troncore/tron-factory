<!-- node add、edit、detail-->
<template>
  <div class="node-info">
    <el-form ref="im-form" :rules="formRules" :model="form" size="medium">


      <!-- node type -->
      <div class="im-card padding-20">
        <div class="im-card__title">{{ $t('nodesManage.nodeType') }}</div>
        <el-form-item prop="isSR">
          <div class="radio-with-suffix">
            <el-radio v-model="form.isSR" :label="true" :disabled="isView">{{ $t('nodesManage.superNode') }}</el-radio>
            <im-tooltip :content="$t('nodesManage.helpTips.superNode')"/>
          </div>
          <div class="radio-with-suffix">
            <el-radio v-model="form.isSR" :label="false" :disabled="isView">{{ $t('nodesManage.fullNode') }}</el-radio>
            <im-tooltip :content="$t('nodesManage.helpTips.fullNode')"/>
          </div>
        </el-form-item>
        <!-- SR -->
        <div v-if="form.isSR">
          <el-form-item prop="needSyncCheck" label-width="140px">
            <span slot="label" class="space-between">{{ $t('nodesManage.syncCheck') }} <im-tooltip :content="$t('nodesManage.helpTips.needSyncCheck')" /></span>
            <el-switch v-model="form.needSyncCheck" :disabled="isView"></el-switch>
          </el-form-item><br />
          <el-form-item prop="url" label-width="140px">
            <span slot="label" class="space-between">URL <im-tooltip :content="$t('nodesManage.helpTips.url')" /></span>
            <el-input v-model.trim="form.url" tabindex="21" :disabled="isView" clearable :placeholder="$t('nodesManage.valid.inputURL')" />
          </el-form-item><br />
          <el-form-item prop="voteCount" label-width="140px">
            <span slot="label" class="space-between">voteCount <im-tooltip :content="$t('nodesManage.helpTips.voteCount')" /></span>
            <el-input v-model.trim="form.voteCount" tabindex="22" :disabled="isView" clearable :placeholder="$t('nodesManage.valid.inputVoteCount')" />
          </el-form-item><br />
          <el-form-item class="address" prop="publicKey" label-width="140px">
            <span slot="label" class="space-between">address <im-tooltip :content="$t('nodesManage.helpTips.publicKey')" /></span>
            <el-input v-model.trim="form.publicKey" tabindex="23" :disabled="isView" clearable :placeholder="$t('nodesManage.valid.publicKey')" />
          </el-form-item><br />
          <el-form-item class="private-key" v-if="opType !== 'detail'" prop="privateKey" label-width="140px">
            <span slot="label" class="space-between">privateKey <im-tooltip :content="$t('nodesManage.helpTips.privateKey')" /></span>
            <el-input v-model.trim="form.privateKey" tabindex="24" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :disabled="isView" :placeholder="$t('nodesManage.valid.inputPrivateKey')" />
          </el-form-item>
        </div>
      </div>


      <!-- node config -->
      <div class="im-card padding-20">
        <div class="im-card__title">{{ $t('nodesManage.nodeConfig')}}</div>
        <el-form-item prop="ip" label-width="140px">
          <span slot="label">{{ $t('nodesManage.nodeIP') }}</span>
          <el-input v-model.trim="form.ip" tabindex="25" :disabled="isView" clearable :placeholder="$t('nodesManage.valid.rightIP')" />
        </el-form-item>
      </div>


      <!-- SSH -->
      <div class="im-card padding-20">
        <div class="im-card__title">{{ $t('nodesManage.SSH')}} <im-tooltip :content="$t('nodesManage.helpTips.SSH')"/></div>
        <el-form-item prop="userName" label-width="140px">
          <span slot="label">{{ $t('nodesManage.sshUserName') }}</span>
          <el-input v-model.trim="form.userName" tabindex="26" :disabled="isView" clearable :placeholder="$t('base.pleaseInput')" />
        </el-form-item>
        <el-form-item class="ssh-port" prop="port" label-width="100px">
          <span slot="label">{{ $t('nodesManage.sshPort') }}</span>
          <el-input v-model.trim="form.port" type="number" min="0" max="65535" tabindex="27" :disabled="isView" clearable :placeholder="$t('base.pleaseInput')" />
        </el-form-item><br />
        <el-form-item prop="sshConnectType" label-width="140px">
          <span slot="label">{{ $t('nodesManage.sshConnectType') }}</span>
          <el-radio v-model="form.sshConnectType" :label="1" :disabled="isView">{{ $t('nodesManage.passwordConnect') }}</el-radio>
          <el-radio v-model="form.sshConnectType" :label="2" :disabled="isView">{{ $t('nodesManage.keyConnect') }}</el-radio>
        </el-form-item><br />
        <el-form-item v-if="form.sshConnectType === 1" class="ssh-password" prop="sshPassword" label-width="140px">
          <span slot="label">{{ $t('nodesManage.sshPassword') }}</span>
          <el-input v-model.trim="form.sshPassword" tabindex="28" :disabled="isView" clearable :placeholder="$t('base.pleaseInput')" />
        </el-form-item>
      </div>
    </el-form>


    <div class="page-footer">
      <el-button v-if="opType !== 'detail'" class="im-button large" type="primary" :disabled="submitDisabled" :loading="loading" @click="handleSubmit">{{ $t('base.complete') }}</el-button>
      <el-button class="im-button large" @click="handleCancel">{{ $t(opType !== 'detail' ? 'base.cancel' : 'base.return') }}</el-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { formRules } from "@/utils/validate"
  import ImTooltip from "@/components/ImTooltip"
  import { transferBigIntToString } from "@/utils/common";

  export default {
    name: "node-edit",
    components: { ImTooltip },
    data () {
      return {
        form: {
          ip: '',
          isSR: true,
          needSyncCheck: true,
          url: 'http://',
          voteCount: '',
          publicKey: '',
          privateKey: '',
          userName: '',
          port: 22,
          sshConnectType: 1, // 1 password, 2 key
          sshPassword: '',
        },
        tempIP: '',
        tempPublicKey: '',
        safePrivateKey: Array(64).fill('*').join(''),
        nodeInfo: {},
        loading: false,
        submitDisabled: false,

      }
    },
    computed: {
      ...mapGetters('app', [
        'currentGitBranch'
      ]),
      disabledLocalIP () {
        return  /(master|release)/.test(this.currentGitBranch)
      },
      opType () {
        return this.$route.params.type
      },
      isView () {
        return this.opType === 'detail'
      },
      isEdit () {
        return this.opType === 'edit'
      },
      opNodeId () {
        return this.$route.params.id
      },
      formRules() {
        let longIntMax = BigInt(2**63) - BigInt(1)

        const longIntRange = (rule, value, callback) => {
          let errorMessage = ''

          if (!/^(-)?\d+$/.test(value)) errorMessage = this.$t('base.valid.integer')
          else if (value < 0) errorMessage = this.$t('base.valid.gteZeroInt')
          else if (BigInt(value) > longIntMax) errorMessage = this.$t('base.valid.maxNumberValue') + ': ' + longIntMax

          if (errorMessage) callback(new Error(errorMessage))
          else callback()
        }

        const validLocalRule = (rule, value, callback) => {
          if (this.disabledLocalIP && value === '127.0.0.1') {
            callback(new Error(this.$t('nodesManage.valid.disabledLocalIP')))
          } else {
            callback()
          }
        }
        const validPrivateKey = (rule, value, callback) => {
          if (value.length !== 64) {
            callback(new Error(this.$t('nodesManage.valid.inputPrivateKey')))
          } else {
            callback()
          }
        }

        return {
          ip: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
            { validator: formRules.validIP(this.$t('nodesManage.valid.rightIP'), ), trigger: 'blur', },
            { required: true, validator: validLocalRule, trigger: 'blur', },
          ],
          port: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
            { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false ), trigger: 'blur', },
            { validator: formRules.numMax(65535, this.$t('base.valid.maxPortValue')), trigger: 'blur', },
          ],
          userName: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ],
          sshPassword: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ],
          url: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ],
          voteCount: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
            { validator: longIntRange, trigger: 'blur', },

          ],
          publicKey: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ],
          privateKey: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
            { required: true, validator: validPrivateKey, trigger: 'blur', },
          ],
        }
      },
    },
    watch: {
      opNodeId: {
        handler: 'getNodeInfo',
        immediate: true
      },
    },
    methods: {
      getNodeInfo () {
        if (this.opType === 'add' || !this.opNodeId) return
        this.form.isSR = false // for hide  layout when start render
        this.form.sshConnectType = 2 // for hide  layout when start render
        this.submitDisabled = true
        this.$_api.nodesManage.getNodeInfo({id: this.opNodeId}, (err, res = {}) => {
          if (err) return
          this.submitDisabled = false
          this.nodeInfo = res
          this.initForm()
        })
      },

      initForm() {
        const nodeInfo = this.nodeInfo
        this.form = {
          ip: nodeInfo.ip || '',
          isSR: nodeInfo.isSR !== undefined ? Boolean(nodeInfo.isSR) : true,
          needSyncCheck: nodeInfo.needSyncCheck !== undefined ? nodeInfo.needSyncCheck : false,
          url: JSON.stringify(nodeInfo.url).slice(3).slice(0, -3) || 'http://',
          voteCount: nodeInfo.voteCount || '',
          publicKey: nodeInfo.publicKey || '',
          privateKey: nodeInfo.publicKey ? this.safePrivateKey : '',
          userName: nodeInfo.userName || '',
          port: nodeInfo.port || 22,
          sshConnectType: nodeInfo.sshConnectType || 1,
          sshPassword: nodeInfo.sshPassword || '',
        }
        this.tempPublicKey = nodeInfo.publicKey
      },

      async handleSubmit() {
        this.$refs['im-form'].validate(async valid => {
          if (valid) {
            const params = {}
            this.loading = true
            if (!(await this.initParams(params))) return

            if (params.isSR && (params.publicKey !== this.tempPublicKey || params.privateKey)) {
              this.$confirm(this.$t('nodesManage.saveAddressPriKey'), this.$t('base.tips'), {
                cancelButtonText: this.$t('base.cancel'),
                confirmButtonText: this.$t('base.confirm'),
                center: true,
                customClass: 'im-message-box',
                cancelButtonClass: 'im-message-cancel-button primary',
                confirmButtonClass: 'im-message-confirm-button primary',
              }).then(() => {
                this.addNode(params)
              }).catch(() => {

                this.$notify.info({
                  title: this.$t('base.cancel'),
                  message: this.$t('base.cancel'),
                })
                this.loading = false
              })
            } else {
              this.addNode(params)
            }
          }
        })
      },

      // format submit params
      async initParams(params) {
        let baseParams = {
          id: this.opType === 'edit' && this.opNodeId ? this.opNodeId : undefined,
          ip: this.form.ip,
          isSR: this.form.isSR,
          userName: this.form.userName,
          port: this.form.port,
          sshConnectType: this.form.sshConnectType,
          sshPassword: this.form.sshConnectType === 1 ? this.form.sshPassword : undefined,
        }
        let srParams = {
          needSyncCheck: this.form.needSyncCheck,
          url: `"${this.form.url}"`,
          voteCount: transferBigIntToString(this.form.voteCount),
          publicKey: this.form.publicKey,
          privateKey: this.form.privateKey !== this.safePrivateKey ? this.form.privateKey : undefined,
        }

        if (srParams.voteCount && !(await this.checkBalance(params.voteCount))) {
          this.loading = false
          return false
        }

        Object.assign(params, {
          ...baseParams,
          ...(baseParams.isSR && srParams),
        })
        return true
      },

      checkBalance(balance) {
        return new Promise(resolve => {
          this.$_api.configuration.checkBalance({ balance }, (err, res) => {
            if (err) return resolve(true)

            if (res.result) {
              resolve(true)
            } else {
              this.$message.error(this.$t('nodesManage.valid.maxVoteCountValue'))
              resolve(false)
            }
          })
        })
      },

      addNode (params) {
        let api = this.opType === 'add' ? 'addNoteInfo' : 'editNoteInfo'
        let msg = this.opType === 'add' ? 'nodesManage.addNodeSuccess' : 'nodesManage.updateNodeSuccess'
        this.$_api.nodesManage[api](params, (err, res = {}) => {
          this.loading = false
          if (err) return

          if (!res.status) {
            this.$notify({
              type: 'success',
              title: this.$t('base.successful'),
              message: this.$t(msg),
            })

            this.$router.push({
              path: '/nodes-manage'
            })
          } else {
            let errorMsg = 'base.error'
            if (res.status === 1)
              errorMsg = 'nodesManage.sshConnectFail'
            else if (res.status === 2)
              errorMsg = 'nodesManage.addressNotPrikey'

            this.$notify.error({
              title: this.$t('base.error'),
              message: this.$t(errorMsg),
            })
          }
        })
      },

      handleCancel () {
        this.$router.push({
          path: '/nodes-manage'
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .node-info {
    margin-bottom: 100px;

    .im-card {
      margin-bottom: 20px;
      padding-bottom: 0;
      overflow: auto;
      .im-card__title {
        margin-bottom: 20px;
        font-size: 15px;
        font-weight: 500;
      }
    }

    /deep/ .el-form-item {
      display: inline-block;
      margin-right: 100px;
      margin-bottom: 20px;
      width: 400px;
      &.ssh-port {
        width: 250px;
        margin-right: 0;
      }
      &.address {
        width: 750px;
      }
      &.private-key {
        width: 750px;
      }

      .radio-with-suffix {
        display: inline;
        margin-right: 40px;
        .el-radio {
          margin-right: 5px;
        }
      }

      .el-form-item__label {
        display: flex;
        align-items: center;
        text-align: left;
        .space-between {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }

    .page-footer {
      .el-button + .el-button {
        margin-left: 20px;
      }
    }
  }
</style>
