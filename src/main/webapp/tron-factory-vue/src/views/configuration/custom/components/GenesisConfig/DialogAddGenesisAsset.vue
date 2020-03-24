<template>
  <el-dialog
    :visible.sync="dialogVisible"
    custom-class="im-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="680px"
    center>
    <div slot="title" class="dialog-header">
      <div class="title">{{ $t('configuration.assetDialogTitle') }}</div>
    </div>

    <div class="dialog-content">
      <el-form ref="dialog-form" :rules="assetRules" :model="form" label-width="150px" label-position="right">
        <el-form-item prop="accountName">
          <span slot="label">
            accountName
            <el-tooltip effect="dark" :content="$t('configuration.helpTips.accountName')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>
          <el-input v-model.trim="form.accountName" tabindex="26" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <el-form-item prop="accountType">
          <span slot="label">
            accountType
            <el-tooltip effect="dark" :content="$t('configuration.helpTips.accountType')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>
          <el-select v-model="form.accountType" filterable clearable :placeholder="$t('base.pleaseSelect')">
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
            <el-tooltip effect="dark" :content="$t('configuration.helpTips.address')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>
          <el-input v-model.trim="form.address" tabindex="27" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>

        <el-form-item label="balance" prop="balance">
          <span slot="label">
            balance
            <el-tooltip effect="dark" :content="$t('configuration.helpTips.balance')" placement="top">
              <i class="fa fa-question-circle-o"></i>
            </el-tooltip>
          </span>
          <el-input v-model.trim="form.balance" tabindex="28" type="number" clearable :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>
      </el-form>

    </div>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="handleSubmit">{{ $t('base.save') }}</el-button>
      <el-button @click="dialogVisible = false">{{ $t('base.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import TronWeb from 'tronweb' // https://developers.tron.network/docs/tron-web-intro
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
        // {
        //   value: 'Contract',
        //   label: 'Contract',
        // },
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
      return {
        accountName: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
        ],
        accountType: [
          { required: true, message: this.$t('base.pleaseSelect'), trigger: 'blur', },
        ],
        address: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
        ],
        balance: [
          { required: true, message: this.$t('base.pleaseInput'), trigger: 'blur', },
        ],
      }
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

          this.$_api.configuration.genesisAssetConfig({ assets }, (err, res) => {
            this.loading = false
            if (err) return

            this.$message.success(this.$t('configuration.assetSaveSuccess'))
            this.$emit('success')
            this.dialogVisible = false
          })
        }
      })
    },

    checkBalance(balance) {
      return new Promise(resolve => {
        this.$_api.configuration.checkBalance({ balance }, (err, res) => {
          if (err) return resolve(false)

          if (res.result) {
            resolve(true)
          } else {
            this.$message.error(this.$t('configuration.valid.maxVoteCountValue'))
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
