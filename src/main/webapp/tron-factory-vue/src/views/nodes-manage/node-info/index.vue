<!-- node add、edit、detail-->
<template>
  <div class="node-info">
    <el-form :rules="formRules" :model="form" size="medium">
      <div class="im-card padding-20">
        <div class="service-type">
          <div class="title">服务器类型</div>
          <el-radio-group size="medium" v-model="form.serviceType">
            <el-radio-button label="local">本地部署</el-radio-button>
            <el-radio-button label="remote">远程部署</el-radio-button>
          </el-radio-group>
        </div>

        <el-form-item prop="ip">
          <span slot="label">
            FullNode IP
            <el-tooltip effect="dark" :content="$t('nodeList.helpTips.ip')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>

          <el-input v-model.trim="form.ip" tabindex="22" :maxlength="50" :placeholder="$t('nodeList.valid.rightIP')"></el-input>
        </el-form-item>

        <el-form-item prop="port">
            <span slot="label">
              FullNode Port
              <el-tooltip effect="dark" :content="$t('nodeList.helpTips.port')" placement="top">
                <i class="fa fa-question-circle-o"></i>
              </el-tooltip>
            </span>

          <el-input v-model.trim="form.port" tabindex="23" :maxlength="50" :placeholder="$t('nodeList.valid.maxPortValue')"></el-input>
        </el-form-item>

        <br />
        <el-form-item prop="userName">
            <span slot="label">{{ $t('nodeList.sshUserName') }}
              <el-tooltip effect="dark" :content="$t('nodeList.helpTips.sshUserName')" placement="top">
                <i class="fa fa-question-circle-o"></i>
              </el-tooltip>
            </span>

          <el-input v-model.trim="form.userName" tabindex="21" :maxlength="50" :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>
        <el-form-item prop="userName">
            <span slot="label">{{ $t('nodeList.sshUserName') }}
              <el-tooltip effect="dark" :content="$t('nodeList.helpTips.sshUserName')" placement="top">
                <i class="fa fa-question-circle-o"></i>
              </el-tooltip>
            </span>

          <el-input v-model.trim="form.userName" tabindex="21" :maxlength="50" :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>
        <el-form-item prop="userName">
            <span slot="label">{{ $t('nodeList.sshUserName') }}
              <el-tooltip effect="dark" :content="$t('nodeList.helpTips.sshUserName')" placement="top">
                <i class="fa fa-question-circle-o"></i>
              </el-tooltip>
            </span>

          <el-input v-model.trim="form.userName" tabindex="21" :maxlength="50" :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>
      </div>

      <div class="im-card padding-20">
        <div class="sr-header">
          <div class="header-item">
            <span class="title">SR节点</span>
            <el-tooltip effect="dark" :content="$t('nodeList.helpTips.isSR')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
            <el-switch v-model="form.isSR"></el-switch>
          </div>
          <div class="header-item">
            <span class="gray">同步检测</span>
            <el-tooltip effect="dark" :content="$t('nodeList.helpTips.isSR')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
            <el-switch v-model="form.needSyncCheck"></el-switch>
          </div>
        </div>

        <el-form-item prop="url">
          <span slot="label">
            URL
            <el-tooltip effect="dark" :content="$t('nodeList.helpTips.url')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>
          <el-input v-model.trim="form.url" tabindex="26" :maxlength="100" :placeholder="$t('nodeList.valid.inputURL')"></el-input>
        </el-form-item>

        <el-form-item prop="voteCount">
          <span slot="label">
            voteCount
            <el-tooltip effect="dark" :content="$t('nodeList.helpTips.voteCount')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>
          <el-input v-model.trim="form.voteCount" tabindex="27" type="number" :maxlength="20" :placeholder="$t('nodeList.valid.inputVoteCount')"></el-input>
        </el-form-item>

        <br />

        <el-form-item prop="privateKey">
          <span slot="label">
            privateKey
            <el-tooltip effect="dark" :content="$t('nodeList.helpTips.privateKey')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>
          <el-input v-model.trim="form.privateKey" tabindex="28" type="textarea" :maxlength="1000" :placeholder="$t('nodeList.valid.inputPrivateKey')"></el-input>
        </el-form-item>

        <el-form-item v-if="form.publicKey">
          <span slot="label">
            publicKey
            <el-tooltip effect="dark" :content="$t('nodeList.helpTips.publicKey')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>
          {{ form.publicKey }}
        </el-form-item>
      </div>
    </el-form>

    <div class="page-footer align-right">
      <el-button class="im-button large">{{ $t('base.cancel') }}</el-button>
      <el-button class="im-button large"  type="primary">{{ $t('base.complete') }}</el-button>
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
          userName: '',
          ip: '',
          port: '',
          isSR: true,
          needSyncCheck: false,
          url: 'http://',
          voteCount: '',
          privateKey: '',
        },
        nodeInfo: {},
      }
    },
    computed: {
      opType () {
        return this.$route.params.type
      },
      opNodeId () {
        return this.$route.params.id
      },
      formRules() {
        const validNum = (rule, value, callback) => {
          if (!isvalidateNum(value)) {
            callback(new Error(this.$t('nodeList.valid.positiveInteger')))
          } else {
            callback()
          }
        }
        const validVoteNum = (rule, value, callback) => {
          if (!isvalidateIntegerNum(value)) {
            callback(new Error(this.$t('nodeList.valid.gteZeroInt')))
          } else {
            callback()
          }
        }
        const validIpRule = (rule, value, callback) => {
          if (!isCorrectIp(value)) {
            callback(new Error(this.$t('nodeList.valid.rightIP')))
          } else {
            callback()
          }
        }
        const validLocalRule = (rule, value, callback) => {
          if (value == '127.0.0.1') {
            callback(new Error(this.$t('nodeList.valid.disabledLocalIP')))
          } else {
            callback()
          }
        }

        const validMaxNum = (rule, value, callback) => {
          if (value > 2147483647) {
            callback(new Error(this.$t('nodeList.valid.maxNumberValue')))
          } else {
            callback()
          }
        }
        const validPortNum = (rule, value, callback) => {
          if (value > 65535) {
            callback(new Error(this.$t('nodeList.valid.maxPortValue')))
          } else {
            callback()
          }
        }
        const validPrivateKey = (rule, value, callback) => {
          if (value.length !== 64) {
            callback(new Error(this.$t('nodeList.valid.inputPrivateKey')))
          } else {
            callback()
          }
        }
        return {
          id: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
            { required: true, validator: validNum, trigger: 'blur', },
            { required: true, validator: validMaxNum, trigger: 'blur', },
          ],
          userName: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ],
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

        this.$_api.nodesManage.getNodeDetail({id: this.opNodeId}, (err, res) => {
          if (err) return

          this.nodeInfo = res || {}
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .node-info {
    .im-card {
      margin-bottom: 20px;
      padding-bottom: 5px;

      .service-type {
        margin-bottom: 20px;
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

      .el-form-item__label {
        line-height: 30px;
      }
    }
  }
</style>
