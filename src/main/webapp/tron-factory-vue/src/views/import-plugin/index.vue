<!--
  @description configure manage
  @Author: Jason.Kang
  @create_date: 2019-12-23
-->
<template>
  <div class="app-container import-plugin">

    <el-steps :active="currentStep" align-center type="mini">
      <el-step @click.native="handleSkipStep(1)" :title="$t('tronPluginConsensusModule')"></el-step>
      <el-step @click.native="handleSkipStep(2)" :title="$t('tronPluginTransactionModule')"></el-step>
      <el-step @click.native="handleSkipStep(3)" :title="$t('tronPluginDatabaseModule')"></el-step>
      <el-step @click.native="handleSkipStep(4)" :title="$t('tronPluginCryptoModule')"></el-step>
    </el-steps>

    <component
      :is="stepMapConfig[currentStep]"
      :plugin-info="pluginInfo"
      @prev-step="handlePrevStep"
      @next-step="handleNextStep" />

  </div>
</template>
<script>
import ConsensusModule from './components/ConsensusModule'
import TransactionModule from './components/TransactionModule'
import DatabaseModule from './components/DatabaseModule'
import CryptoModule from './components/CryptoModule'

export default {
  name: 'import-plugin',
  components: {
    ConsensusModule,
    TransactionModule,
    DatabaseModule,
    CryptoModule,
  },
  data() {
    return {
      // plugin module info
      pluginInfo: {},

      currentStep: 1,
      // key is current step
      // value is current component name
      stepMapConfig: {
        1: 'ConsensusModule',
        2: 'TransactionModule',
        3: 'DatabaseModule',
        4: 'CryptoModule',
      },
      stepRange: {
        min: 1,
        max: 4,
      },
    }
  },

  created() {
    this.initPluginInfo()
  },

  methods: {
    // get plugin info
    initPluginInfo () {
      return new Promise(resolve => {
        this.$_api.pluginApi.pluginConfigApi({}, (err, res = {}) => {
          if (err) return

          this.pluginInfo = res
          resolve(this.pluginInfo)
        })
      })
    },

    handleSkipStep(step) {
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

      if (step <= this.stepRange.max) {
        this.currentStep = step
        this.initPluginInfo()
      } else {
        this.$router.push({ path: "/deploy_nodes" })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.el-steps {
  margin-bottom: 20px;
}
.page-view {
  .box-footer {
    &.align-right {
      margin-top: 40px;
      text-align: right;
    }
  }
}

.textRight {
  margin-top: 40px;
  text-align: right;
}
.pluginSettingFormInput {
  width: 400px;
}
.singlePluginSettingFormInput {
  width: 715px;
}
</style>
