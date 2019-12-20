<!--
@description configure manage
@Author: Jason.Kang
@create_date: 2019-12-19
-->
<template>
  <div class="app-container">
    <el-steps :active="currentStep" align-center type="mini">
      <el-step @click.native="handleSkipStep(1)" :title="$t('tronSettingGenesis')"></el-step>
      <el-step @click.native="handleSkipStep(2)" :title="$t('tronSettingBase')"></el-step>
      <el-step @click.native="handleSkipStep(3)" :title="$t('tronSettingHttp')"></el-step>
      <el-step @click.native="handleSkipStep(4)" :title="$t('tronSettingDb')"></el-step>
      <el-step @click.native="handleSkipStep(5)" :title="$t('tronSettingP2p')"></el-step>
      <el-step @click.native="handleSkipStep(6)" :title="$t('tronCrossChain')"></el-step>
    </el-steps>

    <component
      :is="stepMapConfig[currentStep]"
      :config-info="configInfo"
      :init-config-info="initConfigInfo"
      @prev-step="handlePrevStep"
      @next-step="handleNextStep">
    </component>
  </div>
</template>
<script>
import GenesisConfig from './components/GensisConfig'
import BaseConfig from './components/BaseConfig'
import NetworkConfig from './components/NetworkConfig'
import DatabaseConfig from './components/DatabaseConfig'
import P2pConfig from './components/P2pConfig'
import CrossChainConfig from './components/CrossChainConfig'

export default {
  name: 'config-manage',
  components: {
    GenesisConfig,
    BaseConfig,
    NetworkConfig,
    DatabaseConfig,
    P2pConfig,
    CrossChainConfig,
  },
  data() {
    return {
      currentStep: 1,
      configInfo: {
        genesisAssetConfig: {},
        genesisWitnessConfig: {},
        baseSettingConfig: {},
        networkConfig: {},
        dbConfig: {},
        p2pConfig: {},
        crossChainConfig: {},
      },

      // key is current step
      // value is current component name
      stepMapConfig: {
        1: 'GenesisConfig',
        2: 'BaseConfig',
        3: 'NetworkConfig',
        4: 'DatabaseConfig',
        5: 'P2pConfig',
        6: 'CrossChainConfig',
      },
      stepRange: {
        min: 1,
        max: 6,
      },
    }
  },

  created() {
    this.initConfigInfo()
  },

  methods: {
    // get configure info
    initConfigInfo () {
      return new Promise(resolve => {
        this.$_api.settingApi.getConfigInfo({}, (err, res = {}) => {
          if (err) return

          this.configInfo = { ...this.configInfo, ...res }
          resolve(this.configInfo)
        })
      })
    },

    handleSkipStep(step) {
      if (!this.checkP2PConfigSeedNode(step)) return

      this.currentStep = step
    },

    // skip prev step
    handlePrevStep () {
      let step = this.currentStep - 1
      this.currentStep = step >= this.stepRange.min ? step : this.stepRange.min
    },

    // skip next step
    handleNextStep () {
      let step = this.currentStep + 1

      if (!this.checkP2PConfigSeedNode(step)) return

      if (step <= this.stepRange.max) {
        this.currentStep = step
        this.initConfigInfo()
      } else {
        this.$router.push({ path: "/plugin/list" })
      }
    },

    // check p2p config seed node need selected
    checkP2PConfigSeedNode (step) {
      if (step <= 5) return true

      let seedNodeIpList = this.configInfo.p2pConfig.seed_node_ip_list || []
      if (!seedNodeIpList.length) {
        this.$message.warning(this.$t('tronP2pSeedNodeSelectNextTips'))
        return false
      }
      return true
    },
  },
}
</script>
<style lang="scss" scoped>
.el-steps {
  margin-bottom: 20px;
}
</style>
