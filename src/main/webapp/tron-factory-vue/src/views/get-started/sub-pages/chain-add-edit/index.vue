<template>
  <div class="chain-add-edit">
    <div class="page-title">{{ $t(isAddPage ? $t('getStarted.chainManage.startCreate') : 'getStarted.chainManage.updateChain')}}</div>

    <!-- base-info -->
    <div class="base-info im-card padding-20">
      <div class="card-header">{{ $t('getStarted.chainManage.baseInfo')}}</div>
      <div class="card-body">
        <el-form :model="form" :rules="formRules" ref="form" label-width="160px" label-position="left" size="medium">
          <el-form-item prop="chainName">
            <span slot="label" class="space-between">
              {{ $t('getStarted.chainManage.chainNameLabel') }}
              <im-tooltip :content="$t('getStarted.chainManage.chainNameTips')" />
            </span>
            <el-input v-model.trim="form.chainName" tabindex="1" clearable maxlength="30" />
          </el-form-item>

          <el-form-item prop="crypto" required>
            <span slot="label" class="space-between">
              {{ $t('getStarted.chainManage.encryptionLabel') }}
              <im-tooltip :content="$t('getStarted.chainManage.encryptionTips')" />
            </span>
            <el-radio-group v-model="form.crypto" :disabled="!canChangeCrypto">
              <el-radio :label="'eckey'">ECKey</el-radio>
              <el-radio :label="'sm2'">SM2</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item prop="p2pVersion">
            <span slot="label" class="space-between">
              {{ $t('getStarted.chainManage.p2pVersionLabel') }}
              <im-tooltip :content="$t('getStarted.chainManage.p2pVersionTips')" />
            </span>
            <el-input v-model.trim="form.p2pVersion" tabindex="2" clearable />
          </el-form-item>

          <!-- todo -->
          <!--<el-form-item prop="consensus" required>
            <span slot="label" class="space-between">{{ $t('getStarted.chainManage.consensusModuleLabel') }}</span>
            <el-radio-group v-model="form.consensus">
              <el-radio :label="'dpos'">DPOS</el-radio>
            </el-radio-group>
          </el-form-item>-->
        </el-form>
      </div>
    </div>

    <!-- genesis-info -->
    <div class="genesis-info im-card padding-20">
      <div class="card-header">{{ $t('getStarted.chainManage.genesisAccount')}}（{{ genesisBlockAssets.length }}）</div>
      <div class="card-body">
        <div class="asset-list">
          <div class="asset-item" v-for="(item, index) in genesisBlockAssets" :key="index">
            <el-button class="op-btn" @click="openGenesisAssetDialog(false, item, index)"><i class="el-icon-edit"></i> {{ item.accountName }}</el-button>
            <i v-if="item.accountName !== 'Blackhole'" class="op-icon el-icon-delete" @click="handleDeleteAssets(index)"></i>
          </div>
          <div class="asset-item new-add" @click="openGenesisAssetDialog()">
            <el-button class="op-btn">{{ $t('base.add') }}</el-button>
            <i class="op-icon el-icon-circle-plus-outline"></i>
          </div>
        </div>

        <genesis-asset-dialog
          v-if="genesisAssetDialogVisible"
          :visible.sync="genesisAssetDialogVisible"
          :is-add="isAddGenesisAsset"
          :asset="currentGenesisAsset"
          :asset-list="genesisBlockAssets"
          @submit="handleSubmitGenesisAsset" />

      </div>
    </div>

    <div class="page-footer align-right">
      <el-button class="im-button large" @click="handleCancel">{{ $t('base.cancel') }}</el-button>
      <el-button class="im-button large" type="primary" :disabled="!canOperate" :loading="loading" @click="handleSubmit">{{ $t('base.save') }}</el-button>
    </div>
  </div>
</template>

<script>
  import ImTooltip from "@/components/ImTooltip"
  import GenesisAssetDialog from "./GenesisAssetDialog"

  import { formRules } from "@/utils/validate";

  export default {
    name: "chain-add-edit",
    components: { GenesisAssetDialog, ImTooltip },
    data () {
      return {
        form: {
          chainName: '',
          crypto: '', // eckey、sm2
          p2pVersion: '',
          consensus: '', // dpos
        },
        canChangeCrypto: true,
        genesisBlockAssets: [],
        genesisAssetDialogVisible: false,
        isAddGenesisAsset: true,
        currentGenesisAsset: {},
        currentGenesisAssetIndex: -1,

        canOperate: false, // true when no exit chain or exit chain that its status is un-run
        loading: false,
      }
    },
    computed: {
      formRules() {
        const checkName = (rule, value, callback) => {
          if (!/^[a-zA-z0-9]{1,30}$/.test(value)) callback(this.$t('getStarted.chainManage.chainNameCheckLength'))

          else callback()
        }

        return {
          chainName: [
            { required: true, message: ' ', trigger: 'change' },
            { validator: checkName, trigger: 'change' }
          ],
          p2pVersion: [
            { required: true, message: ' ', trigger: 'change', },
            { validator: formRules.numMin(0, this.$t('base.valid.gtZeroInt'), false), trigger: 'change', },
            { validator: formRules.numMax(2147483647, this.$t('base.valid.maxNumberValue') + ': 2147483647'), trigger: 'change', },
            { validator: formRules.numEqual(11111, this.$t('getStarted.chainManage.p2pVersionCheckMainNet')), trigger: 'change', },
            { validator: formRules.numEqual(20180622, this.$t('getStarted.chainManage.p2pVersionCheckTestNet')), trigger: 'change', },
            { validator: formRules.numEqual(1, this.$t('getStarted.chainManage.p2pVersionCheckSpecialNet')), trigger: 'change', },
          ],
        }
      },
      isAddPage () {
        return this.$route.params.status !== 'chain-edit'
      }
    },
    created () {
      this.init()
    },
    methods: {
      async init () {
        if (this.isAddPage) {
          // add chain
          if (await this.hasBlockChain()) {
            this.$notify({
              type: 'warning',
              title: this.$t('base.warning'),
              message: this.$t('getStarted.chainManage.existChain')
            })
          }
          else this.canOperate = true

        } else {
          // edit chain
          if (await this.hasBlockChain()) {
            this.checkChainPublish() // this.canOperate = true
          }
        }

        this.getChainInfo()
      },

      async hasBlockChain () {
        // this.loading = true
        return new Promise(resolve => {
          this.$_api.getStarted.hasBlockChain({}, (err, res) => {
            // this.loading = false
            if (err) return resolve(false)

            if (res === true) resolve(true)
            else resolve(false)
          })
        })
      },

      checkChainPublish () {
        this.$_api.getStarted.checkChainPublish({}, (err, res) => {
          if (err) {
            this.chainStatus = -1
            return
          }
          this.canOperate = res === 0
        })
      },

      getChainInfo () {
        this.$_api.getStarted.getChainInfo({}, (err, res = {}) => {
          if (err) return

          this.form.chainName = res.chainName

          this.canChangeCrypto = res.canChangeCrypto
          this.form.crypto = res.crypto

          this.form.p2pVersion = res.p2pVersion
          this.form.consensus = res.consensus

          this.genesisBlockAssets = res.genesisBlockAssets || []
        })
      },

      handleSubmit () {
        this.$refs['form'].validate(async valid => {
          if (valid) {
            if (this.genesisBlockAssets.findIndex(asset => asset.accountName === 'Blackhole') === -1) {
              this.$notify({
                type: 'warning',
                title: this.$t('base.warning'),
                message: this.$t('getStarted.chainManage.needBlackhole')
              })
              return
            }
            if (this.genesisBlockAssets.length <= 1) {
              this.$notify({
                type: 'warning',
                title: this.$t('base.warning'),
                message: this.$t('getStarted.chainManage.needMoreAsset')
              })
              return
            }

            this.loading = true

            this.$_api.getStarted.addChainInfo({
              ...this.form,
              genesisBlockAssets: this.genesisBlockAssets,
            }, err => {
              this.loading = false
              if (err) return
              this.$notify({
                type: 'success',
                title: this.$t('base.successful'),
                message: this.$t('base.success.operate')
              })
              this.$router.push('/get-started/dashboard')
            })
          }
        })
      },

      handleCancel () {
        this.$router.push('/get-started')
      },

      openGenesisAssetDialog (isAdd = true, asset = {}, index) {
        this.isAddGenesisAsset = isAdd
        this.currentGenesisAsset = asset
        this.currentGenesisAssetIndex = this.isAddGenesisAsset ? this.genesisBlockAssets.length : index
        this.genesisAssetDialogVisible = true
      },

      handleSubmitGenesisAsset (asset) {
        this.genesisBlockAssets.splice(this.currentGenesisAssetIndex, 1, asset)

        this.currentGenesisAsset = {}
        this.currentGenesisAssetIndex = -1
      },

      handleDeleteAssets (index) {
        this.genesisBlockAssets.splice(index, 1)
      }
    }
  }
</script>

<style lang="scss" scoped>
.chain-add-edit {
  .page-title {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 18px;
    color: $black-light;
  }

  .im-card {
    margin-bottom: 20px;
    .card-header {
      margin-bottom: 20px;
      font-weight: bold;
      color: $black-light;
    }
  }

  .base-info {
    .el-input {
      width: 360px;
    }
    .el-form {
      .el-form-item:last-child {
        margin-bottom: 0;
      }
    }
  }

  .genesis-info {
    padding-bottom: 0;
    .card-body {
      overflow: hidden;
    }
    .asset-list {
      flex: 1;
      position: relative;
      /*padding: 45px 0 0;*/
      border-radius: 5px;
      width: calc(100% + 100px);
      &:last-child {
        margin-bottom: 0;
      }
      .asset-title {
        position: absolute;
        top: 12px;
        left: 0;
        font-size: 14px;
        color: font-color();
      }

      .asset-item {
        display: inline-block;
        position: relative;
        margin-bottom: 20px;
        margin-right: 100px;
        width: 360px;

        .op-btn {
          padding: 0;
          height: 40px;
          line-height: 40px;
          width: 100%;
        }

        .op-icon {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translate(0, -50%);
          cursor: pointer;

          color: rgba(0, 0, 0, .4);

          &:hover {
            color: red;
          }
        }

        &.new-add {
          .op-btn {
            color: theme-color();
            border-color: #c6e2ff;
            background-color: #ecf5ff;
          }

          .op-icon {
            color: theme-color();
          }
        }
      }
    }
  }
}
</style>
