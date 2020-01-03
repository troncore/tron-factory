<!--
  @description configure manage
  @Author: Jason.Kang
  @create_date: 2019-12-23
-->
<template>
  <div class="page-view import-plugin">

    <div class="im-steps">
      <div :class="['im-step consensus', { active: 1 <= currentStep, 'is-current': 1 === currentStep }]" @click="handleSkipStep(1)"><span>{{ $t('tronPluginConsensusModule') }}</span></div>
      <div :class="['im-step transaction', { active: 2 <= currentStep , 'is-current': 2 === currentStep}]" @click="handleSkipStep(2)"><span>{{ $t('tronPluginTransactionModule') }}</span></div>
      <div :class="['im-step database', { active: 3 <= currentStep, 'is-current': 3 === currentStep }]" @click="handleSkipStep(3)"><span>{{ $t('tronPluginDatabaseModule') }}</span></div>
      <!-- TODO -->
      <!--<div :class="['im-step crypto', { active: 4 <= currentStep }]" @click="handleSkipStep(4)"><span>{{ $t('tronPluginCryptoModule') }}</span></div>-->
    </div>

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

import { mapMutations } from "vuex";

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
        max: 3,
      },
    }
  },

  created() {
    this.initPluginInfo()
  },

  methods: {
    ...mapMutations('app', {
      updateAuthMenu: 'SET_AUTH_MENU',
    }),
    // get plugin info
    initPluginInfo () {
      return new Promise(resolve => {
        this.$_api.importPlugin.pluginConfigApi({}, (err, res = {}) => {
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
        this.updateAuthMenu({name: 'deploy-nodes'})

        this.$router.push({ path: "/deploy-nodes" })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
$media1680: 1680px;

.import-plugin {
  .im-steps {
    display: flex;
    justify-content: space-between;
    margin: 0 auto 50px;

    .im-step {
      &:not(:last-child) {
        flex: 1;
      }
      position: relative;
      padding-top: 120px;
      cursor: pointer;
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
      &.is-current span {
        font-size: 16px;
        font-weight: bold;
        color: theme-color();
      }

      &.consensus:before {
        background-image: url(~@/assets/images/icon-gongshimokuai-disabled.png);
      }
      &.consensus.active:before {
        background-image: url(~@/assets/images/icon-gongshimokuai-active.png);
      }

      &.transaction:before {
        background-image: url(~@/assets/images/icon-jiaoyimokuai-disabled.png);
      }
      &.transaction.active:before {
        background-image: url(~@/assets/images/icon-jiaoyimokuai-active.png);
      }

      &.database:before {
        background-image: url(~@/assets/images/icon-shujukumokuai-disabled.png);
      }
      &.database.active:before {
        background-image: url(~@/assets/images/icon-shujukumokuai-active.png);
      }

      &.crypto:before {
        background-image: url(~@/assets/images/icon-shujukumokuai-disabled.png);
      }
      &.crypto.active:before {
        background-image: url(~@/assets/images/icon-shujukumokuai-active.png);
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
