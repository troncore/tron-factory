<template>
  <div class="custom-config">
    <ul class="im-steps config-steps">
      <li v-for="(step, index) in stepsList" class="im-step" :class="{'is-active': activeIndex === index + 1}">
        <div class="im-step__body" @click="handleStep(step, index + 1)">
          <span class="im-step__body-index">{{ index + 1 }}</span>
          <span class="im-step__body-title">{{ step.title }}</span>
        </div>
      </li>
    </ul>

    <div class="config-title">{{ activeIndex + '. ' + activeStep.title }}</div>


    <component :is="activeStep.component" :init-config-info="initConfigInfo" @prev-step="handlePrevStep" @next-step="handleNextStep"/>
  </div>
</template>

<script>
  import DatabaseConfig from './components/DatabaseConfig'
  export default {
    name: "custom-config",
    components: {
      GenesisConfig: () => import('./components/GenesisConfig'),
      BaseConfig: () => import('./components/BaseConfig'),
      NetworkConfig: () => import('./components/NetworkConfig'),
      DatabaseConfig,
      P2PConfig: () => import('./components/P2PConfig'),
      ModulesConfig: () => import('./components/ModulesConfig'),
    },
    data () {
      return {
        stepsList: [
          { title: this.$t('configuration.genesisInfo'), path: 'genesis', component: 'GenesisConfig',},
          { title: this.$t('configuration.baseConfig'), path: 'base', component: 'BaseConfig',},
          { title: this.$t('configuration.netWorkConfig'), path: 'network', component: 'NetworkConfig',},
          { title: this.$t('configuration.databaseConfig'), path: 'database', component: 'DatabaseConfig',},
          { title: this.$t('configuration.p2pConfig'), path: 'p2p', component: 'P2PConfig',},
          { title: this.$t('configuration.moduleFunction'), path: 'modules', component: 'ModulesConfig',},
        ],
      }
    },
    computed: {
      // genesis|base|network|database|p2p|modules
      stepPath () {
        return this.$route.params.step
      },
      activeIndex: {
        get () {
          return this.stepsList.findIndex(item => item.path === this.stepPath) + 1
        },
        set (val) {
          this.$router.push({
            path: '/configuration/custom/' + this.stepsList[val - 1].path
          })
        }
      },
      activeStep () {
        return this.stepsList[this.activeIndex - 1]
      }
    },
    created () {
      this.activeMenuIndex()
    },
    methods: {
      activeMenuIndex () {
        this.$eventBus.$emit('menuActiveIndex', '/configuration/quick')
      },

      handleStep (step, index) {
        this.activeIndex = index
      },

      // skip prev step
      handlePrevStep () {
        this.activeIndex -= 1
      },

      // skip next step
      handleNextStep () {
        this.activeIndex += 1
      },

      // get current stepPath configure info
      initConfigInfo (stepConfig) {
        stepConfig = stepConfig || this.stepPath // default current stepPath

        return new Promise(resolve => {
          this.$_api.configuration.getConfigInfo({}, (err, res = {}) => {
            if (err) return resolve({})

            if (stepConfig === 'genesis') {
              resolve({
                genesisAssetConfig: res.genesisAssetConfig,
                genesisWitnessConfig: res.genesisWitnessConfig
              })
            } else {
              let stepConfigKeys = {
                base: 'baseSettingConfig',
                network: 'networkConfig',
                database: 'dbConfig',
                p2p: 'p2pConfig',
              }
              resolve(res[stepConfigKeys[stepConfig]])
            }
          })
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
$step_color_done: rgba(0, 0, 0, .8);
$step_color_active: theme-color();
$step_color_todo: rgba(8, 28, 86, .5);
.custom-config {
  .im-steps {
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 15px 50px;
    list-style-type: none;
    font-size: 14px;
    font-weight: bold;
    color: $step_color_done;
    background-color: #F5F7FE;

    .im-step {
      display: flex;
      align-items: center;
      flex: 1 1 auto;
      &:last-child {
        flex: none;
      }
      &:not(:last-child):after {
        flex: 1;
        display: inline-block;
        margin: 0 15px;
        content: '';
        height: 1px;
        background-color: #C0C4CC;
      }
    }
    .im-step.is-active {
      color: $step_color_active;
      .im-step__body-index {
        color: white;
        border-color: $step_color_active;
        background-color: $step_color_active;
      }
    }
    .im-step.is-active ~ .im-step {
      color: $step_color_todo;
      .im-step__body-index {
        border-color: $step_color_todo;
      }
    }

    .im-step__body {
      cursor: pointer;
    }
    .im-step__body-index {
      display: inline-block;
      margin-right: 10px;
      width: 24px;
      height: 24px;
      line-height: 20px;
      text-align: center;
      vertical-align: middle;
      border: 2px solid $step_color_done;
      border-radius: 50%;
    }
    .im-step__body-title {
      display: inline-block;
      vertical-align: middle;
    }
  }

  .config-title {
    margin: 25px 0 15px;
    font-size: 18px;
    font-weight: bold;
    color: #081C56;
  }
}



/deep/ .box-view {
  padding: 0;

  .box-body {
    width: 500px;

    .more-form {
      margin-top: 20px;
      .el-button {
        font-size: 18px;
        font-weight: bold;
      }
    }

    /deep/ .el-form-item {
      .el-form-item__label {
        padding: 0;
        font-size: 16px;
        color: rgba(8, 28, 86, .7);

        .unit {
          font-size: 14px;
          color: rgba(8, 28, 86, .5);
        }
        .help-tips {
          font-size: 14px;
          color: rgba(8, 28, 86, .5);
        }
      }
    }
  }

  .box-footer {
    position: absolute;
    bottom: -60px;
    left: 20px;
    right: 20px;
    padding-bottom: 20px;
  }
}
</style>
