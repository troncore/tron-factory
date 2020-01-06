<template>
  <el-dialog
    :visible.sync="dialogVisible"
    custom-class="im-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="680px"
    center>
    <div slot="title" class="dialog-header">
      <div class="title">{{ dialogTitle }}</div>
    </div>

    <div class="dialog-content">
      <el-form
        ref="dialog-form"
        :rules="formRules"
        :model="form"
        label-width="150px"
        label-position="right"
        class="dialog-form">

        <el-form-item prop="id">
          <span slot="label">ID
            <el-tooltip effect="dark" :content="$t('nodeList.helpTips.id')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>

          <el-input v-model.trim="form.id" type="number"  :maxlength="50" :placeholder="$t('nodeList.valid.positiveInteger')" :disabled="!isAdding"></el-input>
        </el-form-item>

        <el-form-item prop="userName">
          <span slot="label">{{ $t('nodeList.sshUserName') }}
            <el-tooltip effect="dark" :content="$t('nodeList.helpTips.sshUserName')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>

          <el-input v-model.trim="form.userName" :maxlength="50" :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <el-form-item prop="ip">
          <span slot="label">
            FullNode IP
            <el-tooltip effect="dark" :content="$t('nodeList.helpTips.ip')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>

          <el-input v-model.trim="form.ip" :maxlength="50" :placeholder="$t('nodeList.valid.rightIP')"></el-input>
        </el-form-item>

        <el-form-item prop="port">
          <span slot="label">
            FullNode Port
            <el-tooltip effect="dark" :content="$t('nodeList.helpTips.port')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>

          <el-input v-model.trim="form.port" :maxlength="50" :placeholder="$t('nodeList.valid.maxPortValue')"></el-input>
        </el-form-item>

        <el-form-item prop="isSR">
          <span slot="label">
            {{ $t('nodeList.isSR') }}
            <el-tooltip effect="dark" :content="$t('nodeList.helpTips.isSR')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>

          <el-switch v-model="form.isSR"></el-switch>
        </el-form-item>

        <!-- SR info-->
        <el-collapse-transition>
          <div v-if="form.isSR">
            <el-form-item prop="needSyncCheck">
              <span slot="label">
                needSyncCheck
                <el-tooltip effect="dark" :content="$t('nodeList.helpTips.needSyncCheck')" placement="top">
                  <i class="fa fa-question-circle-o"></i>
                </el-tooltip>
              </span>
              <el-switch v-model="form.needSyncCheck"></el-switch>
            </el-form-item>

            <el-form-item prop="url">
              <span slot="label">
                URL
                <el-tooltip effect="dark" :content="$t('nodeList.helpTips.url')" placement="top">
                  <i class="fa fa-question-circle-o"></i>
                </el-tooltip>
              </span>
              <el-input :maxlength="100" v-model.trim="form.url" :placeholder="$t('nodeList.valid.inputURL')"></el-input>
            </el-form-item>

            <el-form-item prop="voteCount">
              <span slot="label">
                voteCount
                <el-tooltip effect="dark" :content="$t('nodeList.helpTips.voteCount')" placement="top">
                  <i class="fa fa-question-circle-o"></i>
                </el-tooltip>
              </span>
              <el-input v-model.trim="form.voteCount" type="number" :maxlength="20" :placeholder="$t('nodeList.valid.inputVoteCount')"></el-input>
            </el-form-item>

            <el-form-item v-if="!isAdding">
              <span slot="label">
                publicKey
                <el-tooltip effect="dark" :content="$t('nodeList.helpTips.publicKey')" placement="top">
                  <i class="fa fa-question-circle-o"></i>
                </el-tooltip>
              </span>
              {{ form.publicKey }}
            </el-form-item>

            <el-form-item prop="privateKey">
              <span slot="label">
                privateKey
                <el-tooltip effect="dark" :content="$t('nodeList.helpTips.privateKey')" placement="top">
                  <i class="fa fa-question-circle-o"></i>
                </el-tooltip>
              </span>
              <el-input v-model.trim="form.privateKey" type="textarea" :maxlength="1000" :placeholder="$t('nodeList.valid.inputPrivateKey')"></el-input>
            </el-form-item>
          </div>
        </el-collapse-transition>
      </el-form>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSubmit" :loading="loading">{{ $t('base.save') }}</el-button>
      <el-button @click="dialogVisible = false">{{ $t('base.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { isvalidateNum, isCorrectIp, isvalidateIntegerNum } from '@/utils/validate.js'

export default {
  name: 'operationNode',
  props: ['visible', 'isAdding', 'nodeDetail', 'nodeList'],
  data() {
    return {
      form: {
        id: '',
        userName: '',
        ip: '',
        port: '',
        isSR: false,
        needSyncCheck: false,
      },
      dialogTitle: this.$t('nodeList.addNode'),
      loading: false,
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      },
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
    isAdding: {
      handler(val) {
        this.dialogTitle = val ? this.$t('nodeList.addNode') : this.$t('nodeList.updateNode')
      },
      immediate: true,
    },
  },
  created() {
    this.initForm()
  },
  methods: {
    initForm() {
      this.form = { ...this.form, ...this.nodeDetail }
    },

    async handleSubmit() {
      this.$refs['dialog-form'].validate(async valid => {
        if (valid) {
          let params = {}
          this.saveLoading = true
          if (!(await this.formatParams(params))) return

          let api = this.isAdding ? 'addNoteInfo' : 'editNoteInfo'
          let msg = this.isAdding ? 'nodeList.addNodeSuccess' : 'nodeList.updateNodeSuccess'

          this.$_api.nodeList[api](params, err => {
            this.saveLoading = false
            if (err) return

            this.$emit('success', true)
            this.$message.success(this.$t(msg))
            this.dialogVisible = false
          })
        }
      })
    },

    // format submit params
    async formatParams(params) {
      Object.assign(params, {
        ...this.form,
        url: `"${this.form.url}"`,
      })

      let hasSameIP = this.isAdding && ~this.nodeList.findIndex(item => item.ip === params.ip)
      if (hasSameIP) {
        this.$message.warning(this.$t('nodeList.valid.hasSameIP'))
        this.saveLoading = false
        return false
      }

      if (!(await this.checkBalance(params.voteCount))) {
        this.saveLoading = false
        return false
      }

      if (params.privateKey === Array(64).fill('*').join('')) delete params.privateKey

      return true
    },

    checkBalance(balance) {
      return new Promise(resolve => {
        this.$_api.configManage.checkBalance({ balance }, (err, res) => {
          if (err) return resolve(false)

          if (res.result) {
            resolve(true)
          } else {
            this.$message.error(this.$t('nodeList.valid.maxVoteCountValue'))
            resolve(false)
          }
        })
      })
    },
  },
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
