<template>
  <div class="box-view genesis-config">
    <div class="box-body">
      <div class="asset-list">
        <div class="asset-title">{{ $t('configuration.accountInfo') }}</div>
        <div class="asset-item" v-for="(item, index) in genesisBlockAssets" :key="index">
          <el-button class="op-btn" @click="handleAddAsset(false, item, index)"><i class="el-icon-edit"></i> {{ item.accountName }}</el-button>
          <i class="op-icon el-icon-delete" @click="handleDeleteAssets(index)"></i>
        </div>
        <div class="asset-item new-add" @click="handleAddAsset">
          <el-button class="op-btn">{{ $t('configuration.addNew') }}</el-button>
          <i class="op-icon el-icon-circle-plus-outline"></i>
        </div>
      </div>

      <div class="asset-list">
        <div class="asset-title">{{ $t('configuration.witnessNodeInfo') }}</div>
        <div class="asset-item" v-for="(item, index) in genesisBlockWitnesses" :key="index">
          <el-button class="op-btn" @click="handleViewWitness(item, index)">{{ item.address }}</el-button>
        </div>
      </div>
    </div>

    <div class="box-footer align-right">
      <el-button class="im-button large" :loading="loading" :disabled="configLoading" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
    </div>


    <!-- add or edit asset-->
    <add-asset-dialog
      v-if="assetDialogVisible"
      :visible.sync="assetDialogVisible"
      :is-adding="isAddingAsset"
      :genesis-block-assets="genesisBlockAssets"
      :asset-info="currentAssetInfo"
      :asset-index="currentAssetIndex"
      @success="getConfigInfo">
    </add-asset-dialog>

    <!-- view witness -->
    <view-witness-dialog
      v-if="witnessDialogVisible"
      :visible.sync="witnessDialogVisible"
      :witness-info="currentWitnessInfo">
    </view-witness-dialog>

  </div>
</template>
<script>
import AddAssetDialog from './DialogAddGenesisAsset'
import ViewWitnessDialog from './DialogViewGenesisWitness'

export default {
  name: 'genesis-config',
  components: { ViewWitnessDialog, AddAssetDialog },
  props: {
    initConfigInfo: {
      // type: Function,
      default () {
        return () => Promise.resolve({})
      }
    },
    configLoading: Boolean,
  },
  data() {
    return {
      configInfo: {},
      // for asset
      isAddingAsset: true,
      assetDialogVisible: false,
      currentAssetInfo: {},
      currentAssetIndex: -1,

      // for witness
      witnessDialogVisible: false,
      currentWitnessInfo: {
        address: '',
        url: '',
        voteCount: '',
        privateKey: '',
      },
      loading: false,
    }
  },
  computed: {
    genesisAssetConfig () {
      return this.configInfo.genesisAssetConfig || {}
    },
    genesisWitnessConfig () {
      return this.configInfo.genesisWitnessConfig || {}
    },
    genesisBlockAssets () {
      return this.genesisAssetConfig.genesis_block_assets || []
    },
    genesisBlockWitnesses () {
      return this.genesisWitnessConfig.genesis_block_witnesses || []
    },
  },

  created () {
    this.getConfigInfo()
  },

  methods: {
    getConfigInfo() {
      this.initConfigInfo('genesis').then(res => this.configInfo = res)
    },

    // add or edit asset
    handleAddAsset (isAdding = true, assetInfo = {}, index) {
      this.currentAssetInfo = {
        accountName: '',
        accountType: '',
        address: '',
        balance: '',
        ...(isAdding ? {} : assetInfo),
      }
      this.currentAssetIndex = isAdding ? this.genesisBlockAssets.length : index

      this.isAddingAsset = isAdding
      this.assetDialogVisible = true
    },

    // delete one asset
    handleDeleteAssets(index) {
      this.genesisBlockAssets.splice(index, 1)

      this.$_api.configuration.genesisAssetConfig({ assets: this.genesisBlockAssets}, (err, res) => {
        if (err) return

        this.$notify({
          type: 'success',
          title: this.$t('base.successful'),
          message: this.$t('configuration.assetDeleteSuccess')
        })
      })
    },

    // view witness detail
    handleViewWitness(item) {
      this.currentWitnessInfo = item
      this.witnessDialogVisible = true
    },

    // skit next step
    handleSubmit() {
      this.$emit('next-step')
    },
  },
}
</script>
<style lang="scss" scoped>
.genesis-config {
  .box-body {
    width: 100% !important;
    overflow: hidden;
  }
  .asset-list {
    flex: 1;
    position: relative;
    padding: 45px 0 0;
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
</style>
