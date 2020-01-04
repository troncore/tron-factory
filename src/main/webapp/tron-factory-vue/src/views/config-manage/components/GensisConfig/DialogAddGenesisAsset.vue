<template>
  <el-dialog
    :visible.sync="dialogVisible"
    custom-class="im-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="680px"
    center>
    <div slot="title" class="dialog-header">
      <div class="title">{{ $t('tronAssetSetting') }}</div>
    </div>

    <div class="dialog-content">
      <el-form ref="dialog-form" :rules="assetRules" :model="form" label-width="150px" label-position="right">
        <el-form-item prop="accountName">
          <span slot="label">
            accountName
            <el-tooltip effect="dark" :content="$t('deploymentNodePortTips')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>
          <el-input v-model.trim="form.accountName" :maxlength="50" :placeholder="$t('tronAccountNamePlaceholder')"></el-input>
        </el-form-item>

        <el-form-item prop="accountType">
          <span slot="label">
            accountType
            <el-tooltip effect="dark" :content="$t('deploymentNodePortTips')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>
          <el-select v-model="form.accountType" :placeholder="$t('tronNodeSRPlaceholder')">
            <el-option
              v-for="item in accountTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="address">
          <span slot="label">
            address
            <el-tooltip effect="dark" :content="$t('deploymentNodePortTips')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>
          <el-input v-model.trim="form.address" :maxlength="50" :placeholder="$t('tronAddressPlaceholder')"></el-input>
        </el-form-item>

        <el-form-item label="balance" prop="balance">
          <span slot="label">
            balance
            <el-tooltip effect="dark" :content="$t('deploymentNodePortTips')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>
          <el-input v-model.trim="form.balance" :maxlength="22" :placeholder="$t('tronBalancePlaceholder')"></el-input>
        </el-form-item>
      </el-form>

    </div>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="handleSubmit">{{ $t('tronSettingSave') }}</el-button>
      <el-button @click="dialogVisible = false">{{ $t('tronSettingCancel') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import TronWeb from 'tronweb'
import { isAllNumber } from '@/utils/validate.js'
export default {
  name: 'DialogAddGenesisAsset',
  props: [
    'visible',
    'isAdding',
    'genesisBlockAssets',
    'assetInfo',
    'assetIndex',
  ],

  data() {
    return {
      form: {
        accountName: '',
        accountType: '',
        address: '',
        balance: '',
      },
      accountTypeOptions: [
        {
          value: 'AssetIssue',
          label: 'AssetIssue',
        },
        {
          value: 'Contract',
          label: 'Contract',
        },
      ],
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
    assetRules() {
      const validateNumber = (rule, value, callback) => {
        if (!isAllNumber(value)) {
          callback(new Error(this.$t('tronSettingValidateNumberPlaceholder')))
        } else {
          callback()
        }
      }

      const validAddress = (rule, value, callback) => {
        if (!TronWeb.isAddress(value)) {
          callback(new Error(this.$t('tronSettingAddressPlaceholder')))
        } else {
          callback()
        }
      }

      const rules = {
        accountName: [
          {
            required: true,
            message: this.$t('tronAccountNamePlaceholder'),
            trigger: 'blur',
          },
        ],
        accountType: [
          {
            required: true,
            message: this.$t('tronAccountTypePlaceholder'),
            trigger: 'blur',
          },
        ],
        address: [
          {
            required: true,
            message: this.$t('tronAddressPlaceholder'),
            trigger: 'blur',
          },
          {
            required: true,
            validator: validAddress,
            trigger: 'blur',
          },
        ],
        balance: [
          {
            required: true,
            message: this.$t('tronBalancePlaceholder'),
            trigger: 'blur',
          },
          {
            required: true,
            validator: validateNumber,
            trigger: 'blur',
          },
        ],
      }
      return rules
    },
  },

  created () {
    this.form = { ...this.form, ...this.assetInfo}
  },
  methods: {
    async handleSubmit() {
      this.$refs['dialog-form'].validate(async valid => {
        if (valid) {
          this.loading = true
          if (!(await this.checkBalance(this.form.balance))) {
            this.loading = false
            return false
          }

          let assets = [...this.genesisBlockAssets]
          assets.splice(this.assetIndex, 1, this.form)

          this.$_api.configManage.genesisAssetConfig({ assets }, (err, res) => {
            this.loading = false
            if (err) return

            this.$message.success(this.$t('tronSettingGenesisSaveSuccess'))
            this.$emit('success')
            this.dialogVisible = false
          })
        }
      })
    },

    checkBalance(balance) {
      return new Promise(resolve => {
        this.$_api.configManage.checkBalance({ balance }, (err, res) => {
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
.textCenter {
  text-align: center;
}
.textRight {
  text-align: right;
  margin-top: 30px;
}
.nodeDialogForm {
  padding: 0 20px;
}
.item {
  i {
    font-size: 12px;
  }
}
</style>
