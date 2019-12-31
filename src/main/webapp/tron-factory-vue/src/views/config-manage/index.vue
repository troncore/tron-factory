<!--
  @description configure manage
  @Author: Jason.Kang
  @create_date: 2019-12-19
-->
<template>
  <div class="page-view config-manage">

    <div class="im-steps">
      <div :class="['im-step genesis', { active: 1 <= currentStep }]" @click="handleSkipStep(1)"><span>{{ $t('tronSettingGenesis') }}</span></div>
      <div :class="['im-step base', { active: 2 <= currentStep }]" @click="handleSkipStep(2)"><span>{{ $t('tronSettingBase') }}</span></div>
      <div :class="['im-step network', { active: 3 <= currentStep }]" @click="handleSkipStep(3)"><span>{{ $t('tronSettingHttp') }}</span></div>
      <div :class="['im-step database', { active: 4 <= currentStep }]" @click="handleSkipStep(4)"><span>{{ $t('tronSettingDb') }}</span></div>
      <div :class="['im-step p2p', { active: 5 <= currentStep }]" @click="handleSkipStep(5)"><span>{{ $t('tronSettingP2p') }}</span></div>
      <div :class="['im-step cross-chain', { active: 6 <= currentStep }]" @click="handleSkipStep(6)"><span>{{ $t('tronCrossChain') }}</span></div>
    </div>

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
        this.$router.push({ path: "/import-plugin" })
      }
    },

    // check p2p config seed node is selected
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
$media1680: 1680px;

.config-manage {
  .im-steps {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 60px auto 0;
    @media screen and (max-width: $media1680){
      margin-top: 30px;
    }

    .im-step {
      &:not(:last-child) {
        flex: 1;
      }
      position: relative;
      padding-top: 120px;
      height: 260px;
      cursor: pointer;
      @media screen and (max-width: $media1680){
        height: 220px;
      }
      &:last-child {
        width: 120px;
      }
      span {
        display: inline-block;
        width: 120px;
        text-align: center;
        color: #999;
      }
      &:before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        width: 122px;
        height: 120px;
        background-repeat: no-repeat;
        background-size: 94px auto;
        background-position: center center;
      }
      &.active:before {
        background-size: 100% auto;
      }
      &.active span {
        color: #333;
      }

      &.genesis:before {
        background-image: url(~@/assets/images/icon-chuangshi-disabled.png);
      }
      &.genesis.active:before {
        background-image: url(~@/assets/images/icon-chuangshi-active.png);
      }

      &.base:before {
        background-image: url(~@/assets/images/icon-jichu-disabled.png);
      }
      &.base.active:before {
        background-image: url(~@/assets/images/icon-jichu-active.png);
      }

      &.network:before {
        background-image: url(~@/assets/images/icon-lianjie-disabled.png);
      }
      &.network.active:before {
        background-image: url(~@/assets/images/icon-lianjie-active.png);
      }

      &.database:before {
        background-image: url(~@/assets/images/icon-shujuku-disabled.png);
      }
      &.database.active:before {
        background-image: url(~@/assets/images/icon-shujuku-active.png);
      }

      &.p2p:before {
        background-image: url(~@/assets/images/icon-p2p-disabled.png);
      }
      &.p2p.active:before {
        background-image: url(~@/assets/images/icon-p2p-active.png);
      }

      &.cross-chain:before {
        background-image: url(~@/assets/images/icon-kualian-disabled.png);
      }
      &.cross-chain.active:before {
        background-image: url(~@/assets/images/icon-kualian-active.png);
      }

      &:after {
        content: '';
        display: inline-block;
        position: absolute;
        right: calc((100% - 120px) / 2);
        top: 60px;
        transform: translate(50%, -50%);
        width: 48px;
        height: 35px;
        background-image: url(~@/assets/images/icon-stepjiantou.png);
        background-repeat: no-repeat;
        background-size: 100% auto;
      }

      &:last-child:after {
        display: none;
      }
    }
  }
}
</style>
