<!-- node add、edit、detail-->
<template>
  <div class="node-info">
    <el-form class="im-form" ref="im-form" :rules="formRules" :model="form" label-width="100%" label-position="top" size="medium">
      <div class="im-card padding-20">
        <div class="service-type">
          <div class="title">{{ $t('nodesManage.serviceType') }}</div>
          <el-radio-group size="medium" v-model="form.serviceType" :disabled="isView || isEdit">
            <el-radio-button label="remote">{{ $t('nodesManage.remoteDeploy') }}</el-radio-button>
            <el-radio-button label="local">{{ $t('nodesManage.localDeploy') }}</el-radio-button>
          </el-radio-group>
        </div>

        <el-form-item prop="ip" ref="node-ip">
          <span slot="label">{{ $t('nodesManage.nodeIP') }}</span>
          <el-input v-model.trim="form.ip" tabindex="21" :maxlength="50" :disabled="isView || form.serviceType === 'local'" clearable :placeholder="$t('nodesManage.valid.rightIP')"></el-input>
        </el-form-item>

        <br/>

        <template v-if="form.serviceType === 'remote'">

          <el-form-item prop="sshConnectType">
            <span slot="label">{{ $t('nodesManage.sshConnectType') }}</span>
            <el-radio v-model="form.sshConnectType" :label="1" :disabled="isView">{{ $t('nodesManage.passwordConnect') }}</el-radio>
            <el-radio v-model="form.sshConnectType" :label="2" :disabled="isView">{{ $t('nodesManage.keyConnect') }}</el-radio>
          </el-form-item>
          <br/>
          <el-form-item prop="userName">
            <span slot="label">{{ $t('nodesManage.sshUserName') }}</span>
            <el-input v-model.trim="form.userName" tabindex="23" :maxlength="50" :disabled="isView" clearable :placeholder="$t('base.pleaseInput')"></el-input>
          </el-form-item>
          <br/>

          <template  v-if="form.sshConnectType === 1">
            <el-form-item prop="sshPassword">
              <span slot="label">{{ $t('nodesManage.sshPassword') }}</span>
              <el-input v-model.trim="form.sshPassword" tabindex="24" :maxlength="100" :disabled="isView" clearable :placeholder="$t('base.pleaseInput')"></el-input>
            </el-form-item>
            <br>
          </template>

          <el-form-item prop="port">
            <span slot="label">{{ $t('nodesManage.sshPort') }}</span>
            <el-input v-model.trim="form.port" type="number" tabindex="25" :maxlength="50" :disabled="isView" clearable :placeholder="$t('nodesManage.valid.maxPortValue')"></el-input>
          </el-form-item>
        </template>
      </div>

      <div class="im-card padding-20">
        <div class="sr-header">
          <div class="header-item">
            <span class="title">{{ $t('nodesManage.SRNode') }}</span>
            <el-tooltip effect="dark" :content="$t('nodesManage.helpTips.isSR')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
            <el-switch v-model="form.isSR" :disabled="isView"></el-switch>
          </div>
        </div>

        <template v-if="form.isSR">
          <el-form-item class="flex-horizontal">
            <span slot="label">
              {{ $t('nodesManage.syncCheck') }}
              <el-tooltip effect="dark" :content="$t('nodesManage.helpTips.needSyncCheck')" placement="top">
                <i class="fa fa-question-circle-o"></i>
              </el-tooltip>
            </span>
            <el-switch v-model="form.needSyncCheck" :disabled="isView"></el-switch>
          </el-form-item>

          <el-form-item prop="url">
            <span slot="label">
              URL
              <el-tooltip effect="dark" :content="$t('nodesManage.helpTips.url')" placement="top">
                <i class="fa fa-question-circle-o"></i>
              </el-tooltip>
            </span>
            <el-input v-model.trim="form.url" tabindex="26" :maxlength="100" :disabled="isView" clearable :placeholder="$t('nodesManage.valid.inputURL')"></el-input>
          </el-form-item>
          <br>

          <el-form-item prop="voteCount">
            <span slot="label">voteCount</span>
            <el-input v-model.trim="form.voteCount" type="number" tabindex="27" :maxlength="20" :disabled="isView" clearable :placeholder="$t('nodesManage.valid.inputVoteCount')"></el-input>
          </el-form-item>
          <br />

          <el-form-item prop="publicKey" class="address">
            <span slot="label">
              address
              <el-tooltip effect="dark" :content="$t('nodesManage.helpTips.publicKey')" placement="top">
                <i class="fa fa-question-circle-o"></i>
              </el-tooltip>
            </span>
            <el-input v-model.trim="form.publicKey" tabindex="27" :disabled="isView" clearable :placeholder="$t('nodesManage.valid.publicKey')"></el-input>
          </el-form-item>

          <br />

          <el-form-item prop="privateKey" class="private-key" v-if="opType !== 'detail'">
            <span class="private-key__help" slot="label">
              privateKey
              <el-tooltip effect="dark" :content="$t('nodesManage.helpTips.privateKey')" placement="top">
                <i class="fa fa-question-circle-o"></i>
              </el-tooltip>
            </span>
            <el-input
              v-model.trim="form.privateKey"
              tabindex="28"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              :maxlength="1000"
              :disabled="isView"
              :placeholder="$t('nodesManage.valid.inputPrivateKey')">
            </el-input>
          </el-form-item>
        </template>
      </div>
    </el-form>

    <div class="page-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t(opType !== 'detail' ? 'base.cancel' : 'base.return') }}</el-button>
      <el-button v-if="opType !== 'detail'" class="im-button large" type="primary" :loading="loading" @click="handleSubmit">{{ $t('base.complete') }}</el-button>
    </div>
  </div>
</template>

<script>
  import { isCorrectIp, isvalidateIntegerNum, isvalidateNum } from "@/utils/validate";

  export default {
    name: "node-edit",
    data () {
      return {
        form: {
          serviceType: 'remote',

          ip: '',
          port: 22,
          userName: '',
          sshConnectType: 1, // 1 password, 2 key
          sshPassword: '',

          isSR: true,
          needSyncCheck: false,
          url: 'http://',
          voteCount: '',
          publicKey: '',
          privateKey: '',
        },
        tempIP: '',
        tempPublicKey: '',
        safePrivateKey: Array(64).fill('*').join(''),
        nodeInfo: {},
        loading: false,
      }
    },
    computed: {
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
        const validNum = (rule, value, callback) => {
          if (!isvalidateNum(value)) {
            callback(new Error(this.$t('nodesManage.valid.positiveInteger')))
          } else {
            callback()
          }
        }
        const validVoteNum = (rule, value, callback) => {
          if (!isvalidateIntegerNum(value)) {
            callback(new Error(this.$t('nodesManage.valid.gteZeroInt')))
          } else {
            callback()
          }
        }
        const validIpRule = (rule, value, callback) => {
          if (!isCorrectIp(value)) {
            callback(new Error(this.$t('nodesManage.valid.rightIP')))
          } else {
            callback()
          }
        }
        const validLocalRule = (rule, value, callback) => {
          if (this.form.serviceType === 'remote' && value === '127.0.0.1') {
            callback(new Error(this.$t('nodesManage.valid.disabledLocalIP')))
          } else {
            callback()
          }
        }

        const validMaxNum = (rule, value, callback) => {
          if (value > 2147483647) {
            callback(new Error(this.$t('nodesManage.valid.maxNumberValue')))
          } else {
            callback()
          }
        }
        const validPortNum = (rule, value, callback) => {
          if (value > 65535) {
            callback(new Error(this.$t('nodesManage.valid.maxPortValue')))
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
            { required: true, validator: validIpRule, trigger: 'blur', },
            // { required: true, validator: validLocalRule, trigger: 'blur', },
          ],
          port: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
            { required: true, validator: validNum, trigger: 'blur', },
            { required: true, validator: validPortNum, trigger: 'blur', },
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
            { required: true, validator: validVoteNum, trigger: 'blur', },
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
      'form.serviceType': {
        handler (val) {
          this.$refs['node-ip'] && this.$refs['node-ip'].clearValidate()

          if (val === 'local') {
            this.tempIP = this.form.ip
            this.form.ip = '127.0.0.1'
          } else  {
            this.form.ip = this.tempIP
          }
        },
        immediate: true,
      }
    },
    methods: {
      getNodeInfo () {
        if (this.opType === 'add' || !this.opNodeId) return

        this.$_api.nodesManage.getNodeInfo({id: this.opNodeId}, (err, res = {}) => {
          if (err) return

          this.nodeInfo = res
          this.initForm()
        })
      },
      initForm() {
        const nodeInfo = this.nodeInfo
        this.form = {
          serviceType: nodeInfo.serviceType || 'remote',

          ip: nodeInfo.ip || '',
          port: nodeInfo.port || 22,
          userName: nodeInfo.userName || '',
          sshConnectType: nodeInfo.sshConnectType || 1,
          sshPassword: nodeInfo.sshPassword || '',

          isSR: nodeInfo.isSR !== undefined ? Boolean(nodeInfo.isSR) : true,
          needSyncCheck: nodeInfo.needSyncCheck !== undefined ? nodeInfo.needSyncCheck : false,
          url: JSON.stringify(nodeInfo.url).slice(3).slice(0, -3) || 'http://',
          voteCount: nodeInfo.voteCount || '',
          publicKey: nodeInfo.publicKey || '',
          privateKey: nodeInfo.publicKey ? this.safePrivateKey : '',
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
              errorMsg = 'nodesManage.helpTips.sshConnectFail'
            else if (res.status === 2)
              errorMsg = 'nodesManage.helpTips.addressNotPrikey'

            this.$notify.error({
              title: this.$t('base.error'),
              message: this.$t(errorMsg),
            })
          }
        })
      },

      // format submit params
      async initParams(params) {
        let baseParams = {
          id: this.opType === 'edit' && this.opNodeId ? this.opNodeId : undefined,
          serviceType: this.form.serviceType,
          ip: this.form.ip,
          isSR: this.form.isSR,
        }

        let remoteParams = {
          sshConnectType: this.form.sshConnectType,
          userName: this.form.userName,
          sshPassword: this.form.sshPassword,
          port: this.form.port,
        }

        let srParams = {
          needSyncCheck: this.form.needSyncCheck,
          url: `"${this.form.url}"`,
          voteCount: this.form.voteCount,
          publicKey: this.form.publicKey,
          privateKey: this.form.privateKey,
        }
        if (srParams.privateKey === this.safePrivateKey) delete srParams.privateKey

        if (srParams.voteCount && !(await this.checkBalance(params.voteCount))) {
          this.loading = false
          return false
        }

        Object.assign(params, {
          ...baseParams,
          ...(baseParams.serviceType === 'remote' && remoteParams),
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
    .im-card {
      margin-bottom: 20px;
      padding-bottom: 5px;

      .service-type {
        margin-bottom: 15px;
        .title {
          margin-bottom: 15px;
          font-size: 16px;
          font-weight: bold;
        }
      }
      .sr-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        .header-item {
          display: flex;
          align-items: center;
          .title {
            margin-right: 8px;
            font-size: 16px;
            font-weight: bold;
          }
          i {
            font-size: 14px;
            color: #606266;
          }
          .el-switch {
            margin-left: 20px;
          }
          .gray {
            margin-right: 8px;
            color: rgba(0, 0, 0, .5);
          }
          .gray + i {
            color: rgba(0, 0, 0, .5);
          }
        }

      }
    }

    /deep/ .el-form-item {
      display: inline-block;
      margin-right: 120px;
      margin-bottom: 15px;
      width: 300px;

      &.flex-horizontal {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .el-form-item__label {
          margin-right: 20px;
        }
      }
      &.address {
        width: 720px;
      }
      &.private-key {
        width: 720px;
      }
    }
    .key-tool {
      margin-left: 20px;
      color: theme-color();
      font-size: 12px;
    }
  }
</style>
