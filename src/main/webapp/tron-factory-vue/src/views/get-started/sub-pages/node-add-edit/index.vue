<template>
  <div class="node-add-edit">
    <div class="page-title">{{ $t(this.isAddPage ? '添加节点': '修改节点') }}</div>
    <el-form ref="form" :rules="formRules" :model="form" size="medium" label-width="120px" label-position="left">
      <div class="chain-info im-card">
        <div class="card-header">{{ $t('服务器信息') }}</div>
        <div class="card-body">
          <el-form-item prop="ip">
            <span slot="label">{{ $t('服务器IP') }}</span>
            <el-input v-model.trim="form.ip" class="width-300" tabindex="1" clearable :placeholder="$t('请输入服务器ip地址')" />
          </el-form-item>
          <el-form-item prop="listenPort">
            <span slot="label">{{ $t('监听端口') }}</span>
            <el-input v-model.trim="form.listenPort" type="number" min="0" max="65535" class="width-300" tabindex="2" clearable :placeholder="$t('请输入监听端口')" />
          </el-form-item>
        </div>
        <div class="card-header">{{ $t('SSH信息') }}</div>
        <div class="card-body">
          <el-form-item prop="port" >
            <span slot="label">{{ $t('端口') }}</span>
            <el-input v-model.trim="form.port" type="number" min="0" max="65535" class="width-300" tabindex="4" clearable :placeholder="$t('请输入ssh启用的端口')" />
          </el-form-item>
          <el-form-item prop="sshConnectType">
            <span slot="label">{{ $t('安全验证方式') }}</span>
            <el-radio v-model="form.sshConnectType" :label="1">{{ $t('口令登陆') }}</el-radio>
            <el-radio v-model="form.sshConnectType" :label="2">{{ $t('密钥登陆') }}</el-radio>
          </el-form-item>
          <el-form-item prop="userName" :class="{'margin-bottom-0': form.sshConnectType !== 1}">
            <span slot="label">{{ $t('用户名') }}</span>
            <el-input v-model.trim="form.userName" class="width-300" tabindex="3" clearable :placeholder="$t('请输入连接ssh的用户名')" />
          </el-form-item>
          <el-form-item prop="sshPassword" class="margin-bottom-0" v-if="form.sshConnectType === 1">
            <span slot="label">{{ $t('密码') }}</span>
            <el-input v-model.trim="form.sshPassword" class="width-300" tabindex="5" clearable :placeholder="$t('请输入连接ssh的密码')" />
          </el-form-item>
        </div>
      </div>

      <div class="chain-info im-card">
        <div class="card-header">{{ $t('节点类型') }}</div>
        <div class="card-body">
          <el-form-item prop="isSR" label-width="0" :class="{'margin-bottom-0':!form.isSR}">
            <el-radio v-model="form.isSR" :label="true">{{ $t('超级代表') }} <im-tooltip :content="$t('nodesManage.helpTips.superNode')"/></el-radio>
            <el-radio v-model="form.isSR" :label="false">{{ $t('普通节点') }} <im-tooltip :content="$t('nodesManage.helpTips.fullNode')"/></el-radio>
          </el-form-item>
        </div>
        <div class="card-header" v-if="form.isSR">{{ $t('超级代表信息') }}</div>
        <div class="card-body" v-if="form.isSR">
          <el-form-item prop="url">
            <span slot="label" class="space-between">URL <im-tooltip :content="$t('nodesManage.helpTips.url')" /></span>
            <el-input v-model.trim="form.url" class="width-300" tabindex="6" clearable :placeholder="$t('nodesManage.valid.inputURL')" />
          </el-form-item>
          <el-form-item prop="voteCount">
            <span slot="label" class="space-between">{{ $t('投票数量') }} <im-tooltip :content="$t('nodesManage.helpTips.voteCount')" /></span>
            <el-input v-model.trim="form.voteCount" class="width-300" tabindex="7" clearable :placeholder="$t('nodesManage.valid.inputVoteCount')" />
          </el-form-item>
          <el-form-item class="address" prop="publicKey">
            <span slot="label" class="space-between">address <im-tooltip :content="$t('nodesManage.helpTips.publicKey')" /></span>
            <el-input v-model.trim="form.publicKey" class="width-600" tabindex="8" clearable :placeholder="$t('nodesManage.valid.publicKey')" />
          </el-form-item>
          <el-form-item class="private-key margin-bottom-0" prop="privateKey">
            <span slot="label" class="space-between">privateKey <im-tooltip :content="$t('nodesManage.helpTips.privateKey')" /></span>
            <el-input
              v-model.trim="form.privateKey"
              class="width-600"
              tabindex="9"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              :placeholder="$t('nodesManage.valid.inputPrivateKey')"/>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div class="page-footer">
      <el-button class="im-button large" type="primary" :disabled="disabled" :loading="loading" @click="handleSubmit">{{ $t(isAddPage ? 'base.add' : 'base.modify') }}</el-button>
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.cancel') }}</el-button>
    </div>
  </div>
</template>

<script>
  import ImTooltip from "@/components/ImTooltip"
  import { transferBigIntToString } from "@/utils/common";
  import { formRules } from "@/utils/validate"
  export default {
    name: "node-add-edit",
    components: { ImTooltip },
    data () {
      return {
        form: {
          ip: '',
          listenPort: '',
          port: 22,
          sshConnectType: 1, // 1 password, 2 key
          userName: '',
          sshPassword: '',
          isSR: true,
          url: 'http://',
          voteCount: '',
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

        let portBaseLimit = [
          { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false ), trigger: 'blur', },
          { validator: formRules.numMax(65535, this.$t('base.valid.maxPortValue')), trigger: 'blur', },
        ]

        return {
          ip: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
            { validator: formRules.validIP(this.$t('nodesManage.valid.rightIP'), ), trigger: 'blur', },
            { required: true, validator: validLocalRule, trigger: 'blur', },
          ],
          listenPort: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
            ...portBaseLimit
          ],
          userName: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
          ],
          port: [
            { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
            ...portBaseLimit
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
              this.$confirm(this.$t('nodesManage.saveAddressPriKey'), this.$t('base.tips'), {
                cancelButtonText: this.$t('base.cancel'),
                confirmButtonText: this.$t('base.confirm'),
                center: true,
                customClass: 'im-message-box',
                cancelButtonClass: 'im-message-cancel-button primary',
                confirmButtonClass: 'im-message-confirm-button primary',
              }).then(() => this.addNode(params))
                .catch(() => {
                this.$notify.info({
                  title: this.$t('base.cancel'),
                  message: this.$t('base.cancel'),
                })
              })
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
          listenPort: this.form.listenPort,
          userName: this.form.userName,
          port: this.form.port,
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
            message: this.$t('当前所编辑的节点为无效节点!'),
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
                errorMsg = 'nodesManage.sshConnectFail'
                break
              case 2:
                errorMsg = 'nodesManage.addressNotPrikey'
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
            let msg = this.isAddPage ? '添加节点成功' : '修改节点成功'
            this.$notify.success({
              title: this.$t('base.successful'),
              message: this.$t(msg),
            })
            this.$router.push('/get-started/dashboard')
          }
        })
      },

      handleCancel () {
        history.back()
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
.width-300 {
  width: 300px
}
.width-600 {
  width: 600px
}
.margin-bottom-0 {
  margin-bottom: 0;
}
</style>
