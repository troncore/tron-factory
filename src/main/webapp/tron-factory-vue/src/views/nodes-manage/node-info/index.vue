<!-- node add、edit、detail-->
<template>
  <div class="node-info">
    <el-form ref="im-form" :rules="formRules" :model="form" label-width="100%" label-position="top" size="medium">
      <div class="im-card padding-20">
        <div class="service-type">
          <div class="title">{{ $t('nodesManage.serviceType') }}</div>
          <el-radio-group size="medium" v-model="form.serviceType" :disabled="isView">
            <el-radio-button label="local">{{ $t('nodesManage.localDeploy') }}</el-radio-button>
            <el-radio-button label="remote">{{ $t('nodesManage.remoteDeploy') }}</el-radio-button>
          </el-radio-group>
        </div>

        <el-form-item prop="ip">
          <span slot="label">
            FullNode IP
            <el-tooltip effect="dark" :content="$t('nodesManage.helpTips.ip')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>
          <el-input v-model.trim="form.ip" tabindex="21" :maxlength="50" :disabled="isView" :placeholder="$t('nodesManage.valid.rightIP')"></el-input>
        </el-form-item>

        <el-form-item prop="port">
            <span slot="label">
              FullNode Port
              <el-tooltip effect="dark" :content="$t('nodesManage.helpTips.port')" placement="top">
                <i class="fa fa-question-circle-o"></i>
              </el-tooltip>
            </span>
          <el-input v-model.trim="form.port" tabindex="22" :maxlength="50" :disabled="isView" :placeholder="$t('nodesManage.valid.maxPortValue')"></el-input>
        </el-form-item>

        <br/>

        <template v-if="form.serviceType === 'remote'">
          <el-form-item prop="userName">
            <span slot="label">{{ $t('nodesManage.sshUserName') }}
              <el-tooltip effect="dark" :content="$t('nodesManage.helpTips.sshUserName')" placement="top">
                <i class="fa fa-question-circle-o"></i>
              </el-tooltip>
            </span>
            <el-input v-model.trim="form.userName" tabindex="23" :maxlength="50" :disabled="isView" :placeholder="$t('base.pleaseInput')"></el-input>
          </el-form-item>

          <el-form-item prop="sshPassword">
            <span slot="label">{{ $t('nodesManage.sshPassword') }}
              <el-tooltip effect="dark" :content="$t('nodesManage.helpTips.sshPassword')" placement="top">
                <i class="fa fa-question-circle-o"></i>
              </el-tooltip>
            </span>
            <el-input v-model.trim="form.sshPassword" tabindex="24" :maxlength="100" :disabled="isView" :placeholder="$t('base.pleaseInput')"></el-input>
          </el-form-item>

          <el-form-item prop="sshPort">
            <span slot="label">{{ $t('nodesManage.sshPort') }}
              <el-tooltip effect="dark" :content="$t('nodesManage.helpTips.sshPort')" placement="top">
                <i class="fa fa-question-circle-o"></i>
              </el-tooltip>
            </span>
            <el-input v-model.trim="form.sshPort" tabindex="25" :maxlength="200" :disabled="isView" :placeholder="$t('base.pleaseInput')"></el-input>
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
          <div class="header-item" v-if="form.isSR">
            <span class="gray">{{ $t('nodesManage.syncCheck') }}</span>
            <el-tooltip effect="dark" :content="$t('nodesManage.helpTips.needSyncCheck')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
            <el-switch v-model="form.needSyncCheck" :disabled="isView"></el-switch>
          </div>
        </div>

        <template v-if="form.isSR">
          <el-form-item prop="url">
            <span slot="label">
              URL
              <el-tooltip effect="dark" :content="$t('nodesManage.helpTips.url')" placement="top">
                <i class="fa fa-question-circle-o"></i>
              </el-tooltip>
            </span>
            <el-input v-model.trim="form.url" tabindex="26" :maxlength="100" :disabled="isView" :placeholder="$t('nodesManage.valid.inputURL')"></el-input>
          </el-form-item>

          <el-form-item prop="voteCount">
            <span slot="label">
              voteCount
              <el-tooltip effect="dark" :content="$t('nodesManage.helpTips.voteCount')" placement="top">
                <i class="fa fa-question-circle-o"></i>
              </el-tooltip>
            </span>
            <el-input v-model.trim="form.voteCount" tabindex="27" type="number" :maxlength="20" :disabled="isView" :placeholder="$t('nodesManage.valid.inputVoteCount')"></el-input>
          </el-form-item>

          <br />

          <el-form-item v-if="publicKey">
            <span slot="label">
              publicKey
              <el-tooltip effect="dark" :content="$t('nodesManage.helpTips.publicKey')" placement="top">
                <i class="fa fa-question-circle-o"></i>
              </el-tooltip>
            </span>
            {{ publicKey }}
          </el-form-item>

          <br/>

          <el-form-item prop="privateKey" class="private-key" v-if="opType !== 'detail'">
            <span class="private-key__help" slot="label">
              privateKey
              <el-tooltip effect="dark" :content="$t('nodesManage.helpTips.privateKey')" placement="top">
                <i class="fa fa-question-circle-o"></i>
              </el-tooltip>
              <a class="key-tool" href="https://tronscan.org/#/tools/tron-convert-tool" target="_blank">Key 生成工具</a>
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
          port: '',
          userName: '',
          sshPassword: '',
          sshPort: 22,

          isSR: true,
          needSyncCheck: false,
          url: 'http://',
          voteCount: '',
          privateKey: '',
        },
        safePrivateKey: Array(64).fill('*').join(''),
        publicKey: '',
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
          if (value === '127.0.0.1') {
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
          /*id: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
            { required: true, validator: validNum, trigger: 'blur', },
            { required: true, validator: validMaxNum, trigger: 'blur', },
          ],*/
          ip: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
            { required: true, validator: validIpRule, trigger: 'blur', },
            { required: true, validator: validLocalRule, trigger: 'blur', },
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
          sshPort: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ],
          url: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ],
          voteCount: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
            { required: true, validator: validVoteNum, trigger: 'blur', },
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
          port: nodeInfo.port || '',
          userName: nodeInfo.userName || '',
          sshPassword: nodeInfo.sshPassword || '',
          sshPort: nodeInfo.sshPort || '',

          isSR: nodeInfo.isSR !== undefined ? Boolean(nodeInfo.isSR) : true,
          needSyncCheck: nodeInfo.needSyncCheck !== undefined ? nodeInfo.needSyncCheck : false,
          url: JSON.stringify(nodeInfo.url).slice(3).slice(0, -3) || 'http://',
          voteCount: nodeInfo.voteCount || '',
          privateKey: this.safePrivateKey,
        }
        this.publicKey = nodeInfo.publicKey
      },

      async handleSubmit() {
        this.$refs['im-form'].validate(async valid => {
          if (valid) {
            const params = {}
            this.loading = true
            if (!(await this.initParams(params))) return

            let api = this.opType === 'add' ? 'addNoteInfo' : 'editNoteInfo'
            let msg = this.opType === 'add' ? 'nodesManage.addNodeSuccess' : 'nodesManage.updateNodeSuccess'

            this.$_api.nodesManage[api](params, err => {
              this.loading = false
              if (err) return

              this.$notify({
                type: 'success',
                title: this.$t('base.successful'),
                message: this.$t(msg),
              })

              this.$router.push({
                path: '/nodes-manage'
              })
            })
          }
        })
      },

      // TODO 重复IP

      // format submit params
      async initParams(params) {
        let baseParams = {
          id: this.opType === 'edit' && this.opNodeId ? this.opNodeId : undefined,
          serviceType: this.form.serviceType,
          ip: this.form.ip,
          port: this.form.port,
          isSR: this.form.isSR,
        }

        let remoteParams = {
          userName: this.form.userName,
          sshPassword: this.form.sshPassword,
          sshPort: this.form.sshPort,
        }

        let srParams = {
          needSyncCheck: this.form.needSyncCheck,
          url: `"${this.form.url}"`,
          voteCount: this.form.voteCount,
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

      &.private-key {
        width: 720px;
      }

      .el-form-item__label {
        padding: 0;
        line-height: 30px;
      }
    }
    .key-tool {
      margin-left: 20px;
      color: theme-color();
      font-size: 12px;
    }
  }
</style>
