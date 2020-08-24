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

    <component :is="activeStep.component" :node-info="nodeInfo" @prev-step="handlePrevStep" @next-step="handleNextStep"/>

  </div>
</template>

<script>
  export default {
    name: "custom-config",
    components: {
      BaseConfig: () => import('./components/BaseConfig'),
      NetworkConfig: () => import('./components/NetworkConfig'),
      DatabaseConfig: () => import('./components/DatabaseConfig'),
      P2PConfig: () => import('./components/P2PConfig'),
      ModulesConfig: () => import('./components/ModulesConfig'),
    },
    props: {
      nodeInfo: Object,
    },
    data () {
      return {
        stepsList: [
          { title: this.$t('nodeConfig.baseConfig'), name: 'base', component: 'BaseConfig',},
          { title: this.$t('nodeConfig.netWorkConfig'), name: 'network', component: 'NetworkConfig',},
          { title: this.$t('nodeConfig.databaseConfig'), name: 'database', component: 'DatabaseConfig',},
          { title: this.$t('nodeConfig.p2pConfig'), name: 'p2p', component: 'P2PConfig',},
          { title: this.$t('nodeConfig.moduleFunction'), name: 'modules', component: 'ModulesConfig',},
        ],
        configLoading: false,
      }
    },
    computed: {
      opNodeId () {
        let id = this.$route.query.id
        return /\d+/.test(id) ? Number(id) : undefined
      },
      stepPath () {
        return this.$route.params.step
      },
      activeIndex: {
        get () {
          return this.stepsList.findIndex(item => item.name === this.stepPath) + 1
        },
        set (val) {
          this.$router.push('/node-config/custom/' + this.stepsList[val - 1].name + '?id=' + this.opNodeId)
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
        this.$eventBus.$emit('menuActiveIndex', '/get-started')
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
      margin: 25px 0 12px;
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
        .el-button {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }

    .box-footer {
      position: absolute;
      bottom: -40px;
      left: 20px;
      right: 20px;
      padding-bottom: 20px;
    }
  }
</style>
