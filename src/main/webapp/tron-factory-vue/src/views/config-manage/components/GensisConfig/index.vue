<template>
  <div class="genesis-config">
    <el-card shadow="hover">
      <div class="box-header" @click="showContent = !showContent">
        <i :class="showContent ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
        {{ $t('tronSettingGenesis') }}
      </div>

      <div class="box-body" v-if="showContent">
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="asset">
              <el-button class="newAsset" @click="handleAddAsset">new asset</el-button>
              <el-row v-for="(item, index) in genesisBlockAssets" :key="index">
                <div class="assetList">
                  <el-button @click="handleAddAsset(false, item, index)" style="width:100%">{{ item.accountName }}</el-button>
                  <i class="closeIcon el-icon-circle-close" @click="handleDeleteAssets(index)"></i>
                </div>
              </el-row>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="witeness">
              <el-button class="newWiteness" disabled>witness</el-button>
              <el-row v-for="(item, index) in genesisBlockWitnesses" :key="index">
                <el-button @click="handleViewWitness(item, index)" style="width:100%">{{ item.address }}</el-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <div class="box-footer right">
      <el-button size="small" type="primary" @click="handleSubmit">{{ $t('tronSettingNextStep') }}</el-button>
    </div>

    <!-- add asset-->
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
      showContent: true,

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

      this.$_api.settingApi.genesisSettingApi({ assets: this.genesisBlockAssets}, (err, res) => {
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
  margin-top: 40px;
  padding-right: 80px;
}
.textCenter {
  text-align: center;
}
.box-footer {
  &.right {
    margin-top: 40px;
    text-align: right;
  }
}
.box-body {
  margin-top: 40px;
}
.asset,
.witeness {
  position: relative;
  margin: 0 auto;
  // max-width: 600px;
  min-height: 200px;
  padding: 20px 15px;
  border: 1px solid #ccc;
  button {
    margin-top: 15px;
  }
}

.asset {
  .newAsset {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: -20px;
  }
}
.witeness {
  .newWiteness {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: -20px;
  }
}
.assetDialogForm {
  padding: 0 30px 0 20px;
}
.assetList {
  position: relative;
  // background: pink;
  .closeIcon {
    position: absolute;
    right: -8px;
    top: 8px;
  }
}
</style>
