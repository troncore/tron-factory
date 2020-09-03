<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="im-dialog"
    width="680px"
    center>
    <div slot="title" class="dialog-header">
      <div class="title">{{ $t('getStarted.chainManage.'+ (isAdd ? 'assetDialogAddTitle' : 'assetDialogEditTitle')) }}</div>
    </div>

    <div class="dialog-content">
      <el-form ref="dialog-form" :rules="formRules" :model="form" label-width="150px" label-position="left">
        <el-form-item prop="accountName">
          <span slot="label" class="space-between">
            {{ $t('getStarted.chainManage.accountNameLabel') }}
            <im-tooltip :content="$t('getStarted.chainManage.accountNameTips')" />
          </span>
          <el-input v-model.trim="form.accountName" tabindex="26" :disabled="asset.accountName === 'Blackhole'" clearable></el-input>
        </el-form-item>

        <el-form-item prop="accountType">
          <span slot="label" class="space-between">
            {{ $t('getStarted.chainManage.accountTypeLabel') }}
            <im-tooltip :content="$t('getStarted.chainManage.accountTypeTips')" />
          </span>
          <el-select v-model="form.accountType" style="width: 100%;" clearable placeholder=" ">
            <el-option
              v-for="item in accountTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="address">
          <span slot="label" class="space-between">
            {{ $t('getStarted.chainManage.addressLabel') }}
            <im-tooltip :content="$t('getStarted.chainManage.addressTips')" />
          </span>
          <el-input v-model.trim="form.address" tabindex="27" clearable class="address-input" />
        </el-form-item>

        <el-form-item label="balance" prop="balance" class="margin-bottom-0">
          <span slot="label" class="space-between">
            {{ $t('getStarted.chainManage.balanceLabel') }}
            <im-tooltip :content="$t('getStarted.chainManage.balanceTips')" />
          </span>
          <el-input v-model.trim="form.balance" tabindex="28" clearable >
            <!--
            <el-select v-model="form.unit" slot="append" style="width:80px;">
              <el-option label="SUN" value="SUN"></el-option>
              <el-option label="TRX" value="TRX"></el-option>
            </el-select>
            -->
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" class="dialog-footer align-right">
      <el-button class="im-button mini" @click="dialogVisible = false">{{ $t('base.cancel') }}</el-button>
      <el-button class="im-button mini" type="primary" :loading="loading" @click="handleSubmit">{{ $t('base.save') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>

import { transferBigIntToString } from "@/utils/common"
import ImTooltip from "@/components/ImTooltip";
export default {
  name: 'genesis-asset-dialog',
  components: { ImTooltip },
  props: [ 'visible', 'isAdd', 'asset', 'assetList'],
  data() {
    return {
      form: {
        accountName: '',
        accountType: '',
        address: '',
        balance: '',
        // unit: 'SUN',
      },
      accountTypeOptions: [
        {
          value: 'AssetIssue',
          label: 'AssetIssue',
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
    formRules() {
      let longIntMax = BigInt(2**63) - BigInt(1)
      let longIntMin = -BigInt(2**63)

      let longIntRange = (rule, value, callback) => {
        let errorMessage = ''

        if (!/^(-)?\d+$/.test(value)) errorMessage = this.$t('base.valid.integer')
        else if (BigInt(value) < longIntMin) errorMessage = this.$t('base.valid.minNumberValue') + ': ' + longIntMin
        else if (BigInt(value) > longIntMax) errorMessage = this.$t('base.valid.maxNumberValue') + ': ' + longIntMax

        if (errorMessage) callback(new Error(errorMessage))
        else callback()
      }

      let repeatAssetName  = (rule, value, callback) => {
        let errorMessage = this.$t('getStarted.chainManage.accountNameCheckRepeat')
        let existAssets = this.assetList.filter(asset => this.asset !== asset && asset.accountName === this.form.accountName)
        if ( existAssets.length) callback(new Error(errorMessage))
        else callback()
      }

      return {
        accountName: [
          { required: true, message: ' ', trigger: 'change', },
          { validator: repeatAssetName, trigger: 'change', },
        ],
        accountType: [
          { required: true, message: ' ', trigger: 'change', },
        ],
        address: [
          { required: true, message: ' ', trigger: 'change', },
        ],
        balance: [
          { required: true, message: ' ', trigger: 'change', },
          { validator: longIntRange, trigger: 'change', },
        ],
      }
    },
  },

  created () {
    this.form = {
      accountName: this.asset.accountName,
      accountType: this.asset.accountType || 'AssetIssue',
      address: this.asset.address,
      balance: this.asset.balance,
    }
  },
  methods: {
    async handleSubmit() {
      this.$refs['dialog-form'].validate(async valid => {
        if (valid) {
          this.loading = true
          let checkAddress = this.checkAddress(this.form.address)
          if (!await checkAddress) {
            this.loading = false
            return false
          }

          this.form.balance = transferBigIntToString(this.form.balance)

          this.$emit('submit', this.form)
          this.dialogVisible = false
        }
      })
    },

    checkAddress(address) {
      return new Promise(resolve => {
        this.$_api.getStarted.checkAddress({ address }, (err, res) => {
          if (err) return resolve(false)

          if (res.result) {
            resolve(true)
          } else {
            this.$notify({
              type: 'warning',
              title: this.$t('base.warning'),
              message: this.$t('getStarted.chainManage.addressCheckValid')
            })
            resolve(false)
          }
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.item {
  i {
    font-size: 12px;
  }
}
.address-input {
  /deep/ .el-input__inner {
    font-family: "Lucida Console", Monaco, monospace !important;
  }
}
</style>
