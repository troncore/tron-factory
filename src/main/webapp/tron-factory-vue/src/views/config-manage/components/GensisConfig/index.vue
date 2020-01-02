<template>
  <div class="genesis-config">
    <el-card>
      <div class="box-header title">{{ $t('tronSettingGenesis') }}</div>

      <div class="box-body">
        <div class="asset-list">
          <el-button type="text" class="add-asset" @click="handleAddAsset">Add Asset</el-button>
          <div class="asset-item" v-for="(item, index) in genesisBlockAssets" :key="index">
            <el-button @click="handleAddAsset(false, item, index)" style="width:100%">{{ item.accountName }}</el-button>
            <i class="delete-btn el-icon-circle-close" @click="handleDeleteAssets(index)"></i>
          </div>
        </div>

        <div class="asset-list">
          <el-button type="text" class="add-asset" disabled>Witness</el-button>
          <div class="asset-item" v-for="(item, index) in genesisBlockWitnesses" :key="index">
            <el-button @click="handleViewWitness(item, index)" style="width:100%">{{ item.address }}</el-button>
          </div>
        </div>
      </div>
    </el-card>

    <div class="box-footer align-right">
      <el-button class="im-button large" size="small" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
    </div>

    <!-- add or edit asset-->
    <add-asset-dialog
      v-if="assetDialogVisible"
      :visible.sync="assetDialogVisible"
      :is-adding="isAddingAsset"
      :genesis-block-assets="genesisBlockAssets"
      :asset-info="currentAssetInfo"
      :asset-index="currentAssetIndex"
      @success="initConfigInfo">
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
    configInfo: {
      type: Object,
      required: true,
    },
    initConfigInfo: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
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

  methods: {
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

      this.$_api.configManage.genesisAssetConfig({ assets: this.genesisBlockAssets}, (err, res) => {
        if (err) return

        this.$message.success(this.$t('tronSettingGenesisSaveSuccess'))
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
  /deep/ .el-card {
    .el-card__body {
      padding: 30px;
    }
  }
  .box-header {
    margin-bottom: 30px;
    &.title {
      font-size: 20px;
      font-weight: bold;
      color: #081C56;
    }
  }
  .box-body {
    display: flex;
    .asset-list {
      flex: 1;
      margin-right: 30px;
      position: relative;
      padding: 80px 100px 50px;
      border: 1px solid rgba(151, 151, 151, .2);
      border-radius: 5px;
      &:last-child {
        margin-right: 0;
      }

      .add-asset {
        position: absolute;
        top: 12px;
        left: 50px;
        font-size: 18px;
      }
      .asset-item {
        position: relative;
        margin-bottom: 30px;
        &:last-child {
          margin-bottom: 0;
        }
        .el-button {
          padding: 0;
          height: 50px;
          line-height: 50px;
        }
        .delete-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translate(0, -50%);
          cursor: pointer;
        }
      }
    }
  }

  .box-footer {
    margin-top: 40px;
    &.align-right {
      text-align: right;
    }
  }

}
</style>
