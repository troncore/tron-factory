<template>
  <el-dialog
    :visible.sync="dialogVisible"
    custom-class="im-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="680px"
    top="200px"
    center>
    <div slot="title" class="dialog-header">
      <div class="title">{{ dialogTitle }}</div>
      <div class="title-info">以下均为必填项</div>
    </div>

    <div class="dialog-content">
      <el-form
        ref="dialog-form"
        :rules="nodeRules"
        :model="form"
        label-width="150px"
        label-position="left"
        class="dialog-form">

        <el-form-item prop="id">
          <span slot="label">ID
            <el-tooltip effect="dark" :content="$t('deploymentNodeIdTips')" placement="top">
              <i class="im-icon-info"> </i>
            </el-tooltip>
          </span>

          <el-input v-model.trim="form.id" :maxlength="50" :placeholder="$t('tronNodeIDPlaceholder')" :disabled="!isAdding"></el-input>
        </el-form-item>

        <el-form-item prop="userName">
          <span slot="label">{{ $t('tronNodeName') }}
            <el-tooltip
              size="small"
              effect="dark"
              :content="$t('deploymentNodeUsernameTips')"
              placement="top">
              <i class="im-icon-info"></i>
            </el-tooltip>
          </span>

          <el-input v-model.trim="form.userName" :maxlength="50" :placeholder="$t('tronNodeNamePlaceholder')"></el-input>
        </el-form-item>

        <el-form-item prop="ip">
          <span slot="label">
            IP
            <el-tooltip class="item" effect="dark" :content="$t('deploymentNodeIpTips')" placement="top">
              <i class="im-icon-info"></i>
            </el-tooltip>
          </span>

          <el-input v-model.trim="form.ip" :maxlength="50" :placeholder="$t('tronNodeIpPlaceholder')"></el-input>
        </el-form-item>

        <el-form-item prop="port">
          <span slot="label">
            PORT
            <el-tooltip class="item" effect="dark" :content="$t('deploymentNodePortTips')" placement="top">
              <i class="im-icon-info"></i>
            </el-tooltip>
          </span>

          <el-input v-model.trim="form.port" :maxlength="50" :placeholder="$t('tronNodePortPlaceholder')"></el-input>
        </el-form-item>

        <el-form-item prop="isSR">
        <span slot="label">
          {{ $t('tronNodeWhetherIsSR') }}
          <el-tooltip class="item" effect="dark" :content="$t('deploymentNodeSrTips')" placement="top">
            <i class="im-icon-info"></i>
          </el-tooltip>
        </span>
          <el-select v-model="form.isSR" :placeholder="$t('tronNodeSRPlaceholder')">
            <el-option v-for="item in srAry" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <!-- SR info-->
        <template v-if="form.isSR">
          <el-form-item prop="needSyncCheck">
            <span slot="label">
              needSyncCheck
              <el-tooltip class="item" effect="dark" :content="$t('deploymentNodeSyncCheckTips')" placement="top">
                <i class="im-icon-info"></i>
              </el-tooltip>
            </span>

            <el-select v-model="form.needSyncCheck" :placeholder="$t('tronNodeSyncCheckPlaceholder')">
              <el-option
                v-for="item in syncCheckAry"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="url">
          <span slot="label">
            URL
            <el-tooltip class="item" effect="dark" :content="$t('deploymentNodeUrlTips')" placement="top">
              <i class="im-icon-info"></i>
            </el-tooltip>
          </span>

            <el-input
              :maxlength="100"
              v-model.trim="form.url"
              :placeholder="$t('tronNodeUrlPlaceholder')">
            </el-input>
          </el-form-item>

          <el-form-item prop="voteCount">
          <span slot="label">
            voteCount
            <el-tooltip class="item" effect="dark" :content="$t('tronNodeVoteNumberTips')" placement="top">
              <i class="im-icon-info"></i>
            </el-tooltip>
          </span>

            <el-input
              :maxlength="20"
              v-model.trim="form.voteCount"
              :placeholder="$t('tronNodeVoteNumberPlaceholder')">
            </el-input>
          </el-form-item>

          <el-form-item v-if="!isAdding" class="publickey">
          <span slot="label" style="padding-left:12px">
            publicKey
            <el-tooltip class="item" effect="dark" :content="$t('deploymentNodePublickKeyTips')" placement="top">
              <i class="im-icon-info"></i>
            </el-tooltip>
          </span>
            {{ form.publicKey }}
          </el-form-item>

          <el-form-item prop="privateKey">
          <span slot="label">
            privateKey
            <el-tooltip class="item" effect="dark" :content="$t('deploymentNodePrivateKeyTips')" placement="top">
              <i class="im-icon-info"></i>
            </el-tooltip>
          </span>

            <el-input
              type="textarea"
              :maxlength="1000"
              v-model.trim="form.privateKey"
              :placeholder="$t('tronNodePrivateKeyPlaceholder')">
            </el-input>
          </el-form-item>
        </template>
      </el-form>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button class="im-button" @click="dialogVisible = false">{{ $t('base.cancel') }}</el-button>
      <el-button class="im-button" type="primary" @click="handleSubmit" :loading="saveLoading">{{ $t('base.save') }}</el-button>
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
      saveLoading: false,
      dialogTitle: this.$t('tronNodeAdd'),
      form: {
        id: '',
        userName: '',
        ip: '',
        port: '',
        isSR: '',
      },

      srAry: [
        { id: 0, label: this.$t('tronNodeSrIs'), value: true },
        { id: 1, label: this.$t('tronNodeSrNo'), value: false },
      ],
      syncCheckAry: [
        { id: 0, label: this.$t('tronNodeSrIs'), value: true },
        { id: 1, label: this.$t('tronNodeSrNo'), value: false },
      ],
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
    nodeRules() {
      const validNum = (rule, value, callback) => {
        if (!isvalidateNum(value)) {
          callback(new Error(this.$t('tronSettingNumberPlaceholder')))
        } else {
          callback()
        }
      }
      const validVoteNum = (rule, value, callback) => {
        if (!isvalidateIntegerNum(value)) {
          callback(new Error(this.$t('tronSettingNumberZeroPlaceholder')))
        } else {
          callback()
        }
      }
      const validIpRule = (rule, value, callback) => {
        if (!isCorrectIp(value)) {
          callback(new Error(this.$t('tronNodeIpValidate')))
        } else {
          callback()
        }
      }
      const validLocalRule = (rule, value, callback) => {
        if (value == '127.0.0.1') {
          callback(new Error(this.$t('tronNodeIpLocalValidate')))
        } else {
          callback()
        }
      }

      const validMaxNum = (rule, value, callback) => {
        if (value > 2147483647) {
          callback(new Error(this.$t('tronNumberPlaceholder')))
        } else {
          callback()
        }
      }
      const validPortNum = (rule, value, callback) => {
        if (value > 65535) {
          callback(new Error(this.$t('tronPortNumberPlaceholder')))
        } else {
          callback()
        }
      }
      const validPrivateKey = (rule, value, callback) => {
        if (value.length !== 64) {
          callback(new Error(this.$t('tronNodeCorrectPrivateKeyPlaceholder')))
        } else {
          callback()
        }
        // const address = TronWeb.address.fromPrivateKey(value)
      }
      const rules = {
        id: [
          {
            required: true,
            message: this.$t('tronNodeIDPlaceholder'),
            trigger: 'blur',
          },
          {
            required: true,
            validator: validNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validMaxNum,
            trigger: 'blur',
          },
        ],
        userName: [
          {
            required: true,
            message: this.$t('tronNodeNamePlaceholder'),
            trigger: 'blur',
          },
        ],
        ip: [
          {
            required: true,
            message: this.$t('tronNodeIpPlaceholder'),
            trigger: 'blur',
          },
          {
            required: true,
            validator: validIpRule,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validLocalRule,
            trigger: 'blur',
          },
        ],
        port: [
          {
            required: true,
            message: this.$t('tronNodePortPlaceholder'),
            trigger: 'blur',
          },
          {
            required: true,
            validator: validNum,
            trigger: 'blur',
          },
          {
            required: true,
            validator: validPortNum,
            trigger: 'blur',
          },
        ],
        isSR: {
          required: true,
          message: this.$t('tronNodeSRPlaceholder'),
          trigger: 'blur',
        },
        needSyncCheck: {
          required: true,
          message: this.$t('tronNodeSyncCheckPlaceholder'),
          trigger: 'change',
        },
        url: [
          {
            required: true,
            message: this.$t('tronNodeUrlPlaceholder'),
            trigger: 'blur',
          },
        ],
        voteCount: [
          {
            required: true,
            message: this.$t('tronNodeVoteNumberTips'),
            trigger: 'blur',
          },
          {
            required: true,
            validator: validVoteNum,
            trigger: 'blur',
          },
        ],
        privateKey: [
          {
            required: true,
            message: this.$t('tronNodePrivateKeyPlaceholder'),
            trigger: 'blur',
          },
          {
            required: true,
            validator: validPrivateKey,
            trigger: 'blur',
          },
        ],
      }
      return rules
    },
  },
  watch: {
    isAdding: {
      handler(val) {
        this.dialogTitle = val ? this.$t('tronNodeAdd') : this.$t('tronNodeEditTitle')
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

          let api = this.isAdding ? 'addNote' : 'editNote'
          let msg = this.isAdding ? 'tronNodeAddSuccess' : 'tronNodeEditSuccess'

          this.$_api.nodeApi[api](params, err => {
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

      if (!(await this.checkBalance(params.voteCount))) {
        this.saveLoading = false
        return false
      }

      let validPrivateKey = Array(64)
        .fill('*')
        .join('')

      if (params.privateKey === validPrivateKey) delete params.privateKey

      let hasSameIP = ~this.nodeList.findIndex(item => item.ip === params.ip)
      if (hasSameIP) {
        this.$message.warning(this.$t('tronNodesIpNoSame'))
        this.saveLoading = false
        return false
      }

      return true
    },

    checkBalance(balance) {
      return new Promise(resolve => {
        this.$_api.settingApi.checkBalanceApi({ balance }, (err, res) => {
          if (err) return resolve(false)

          if (res.result) {
            resolve(true)
          } else {
            this.$message.error(this.$t('tronNodevoteCountNumberMaxPlaceholder'))
            resolve(false)
          }
        })
      })
    },
  },
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.dialog-form {
  padding: 0 20px;
}
.item {
  i {
    font-size: 12px;
  }
}
</style>
