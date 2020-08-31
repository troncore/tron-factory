<template>
  <div class="get-started">
    <div class="loading-mask" v-if="loading" v-loading="loading"></div>
    <div class="page-main" v-else>
      <div v-if="showStart" class="page-body">
        <div class="summary">
          {{ $t('getStarted.summaryChain') }}
        </div>
        <div class="description">
          {{ $t('getStarted.descriptionChain') }}
        </div>
        <el-button type="primary" class="start-btn" @click="handleCreate">{{ $t('getStarted.startCreate') }}</el-button>

        <div class="guide-box">
          <div class="title"><span>{{ $t('getStarted.guideTitle') }}</span></div>
          <div class="guide-list">
            <div class="guide-item">
              <i class="guide-item__index">1</i>
              <div class="guide-item__body">
                <div class="guide-item__body-title">{{ $t('getStarted.firstStepTitle') }}</div>
                <div class="guide-item__body-detail">{{ $t('getStarted.firstStepContext') }}</div>
              </div>
            </div>
            <div class="guide-item">
              <i class="guide-item__index">2</i>
              <div class="guide-item__body">
                <div class="guide-item__body-title">{{ $t('getStarted.secondStepTitle') }}</div>
                <div class="guide-item__body-detail">{{ $t('getStarted.secondStepContext') }}</div>
              </div>
            </div>
            <div class="guide-item">
              <i class="guide-item__index">3</i>
              <div class="guide-item__body">
                <div class="guide-item__body-title">{{ $t('getStarted.thirdStepTitle') }}</div>
                <div class="guide-item__body-detail">{{ $t('getStarted.thirdStepContext') }}</div>
              </div>
            </div>
            <div class="guide-item">
              <i class="guide-item__index">4</i>
              <div class="guide-item__body">
                <div class="guide-item__body-title">{{ $t('getStarted.fourthStepTitle') }}</div>
                <div class="guide-item__body-detail">{{ $t('getStarted.fourthStepContext') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <component v-else :is="currentComponent" />
    </div>
  </div>
</template>

<script>
  const subPages = {
    'chain-add': () => import(/* webpackChunkName: "chain-add-edit" */ './sub-pages/chain-add-edit') ,
    'chain-edit': () => import(/* webpackChunkName: "chain-add-edit" */ './sub-pages/chain-add-edit') ,
    'dashboard': () => import(/* webpackChunkName: "dashboard" */ './sub-pages/dashboard') ,
    'node-add': () => import(/* webpackChunkName: "node-add-edit" */ './sub-pages/node-add-edit') ,
    'node-edit': () => import(/* webpackChunkName: "node-add-edit" */ './sub-pages/node-add-edit') ,
    'node-view': () => import(/* webpackChunkName: "node-view" */ './sub-pages/node-view') ,
  }

  export default {
    name: "get-started",
    components: {
      ...subPages,
    },
    data () {
      return {
        loading: false,
        showStart: true,
        currentComponent: '',
        hasValidStatus: false,
      }
    },
    watch: {
      '$route': {
        handler: 'handleRoute',
        immediate: true,
      }
    },
    created () {
      this.activeMenuIndex()
    },
    methods: {
      activeMenuIndex () {
        this.$eventBus.$emit('menuActiveIndex', '/get-started')
      },
      handleRoute (to) {
        this.loading = true
        let noAuth = ['chain-add'] // no chain and it can enter these pages
        let subPagesStatus = Object.keys(subPages)

        this.$_api.getStarted.hasBlockChain({}, (err, res) => {
          this.loading = false
          if (err) return

          if (res === true || noAuth.includes(to.params.status)) {
            this.showStart = false
            if (subPagesStatus.includes(to.params.status)) this.currentComponent = to.params.status
            else this.$router.push('/get-started/dashboard')
          } else {
            this.showStart = true
            this.$router.push('/get-started')
          }
        })
      },

      handleCreate () {
        this.$router.push('/get-started/chain-add')
      }
    }
  }
</script>

<style scoped lang="scss">
.get-started {
  height: 100%;
  min-height: 100%;
  padding: 20px;
  .loading-mask {
    height: 100%;
  }
  .page-main {
    height: 100%;
  }
  .page-body {
    height: 100%;
    text-align: center;
    padding-top: 100px;

    .summary {
      margin-bottom: 50px;
      font-size: 24px;
      font-weight: bold;
      color: font-color();
    }
    .description {
      font-size: 16px;
      color: font-color();
    }

    .start-btn {
      margin: 100px 0;
      padding: 0;
      width: 300px;
      height: 60px;
      line-height: 60px;
      font-size: 22px;
      box-shadow: 0 2px 40px 0 rgba(0, 0, 0, 0.1);
    }
  }

  .guide-box {
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 60px;
      color: font-color();

      span {
        width: 130px;
        font-size: 26px;
        font-weight: bold;
        text-align: center;
      }

      &:before,
      &:after {
        display: inline-block;
        content: ' ';
        width: calc((100% - 130px) / 2);
        height: 1px;
        opacity: 0.3;
        border: 1px solid rgba(0, 0, 0, .2);
      }
    }

    .guide-list {
      display: flex;
      text-align: left;

      .guide-item {
        flex: 1;
        display: flex;
        align-items: center;
        margin-right: 20px;
        padding: 20px;
        height: 120px;
        box-shadow: 0 2px 40px 0 rgba(4, 4, 64, 0.04);
        border-radius: 10px;
        background-color: #fff;

        &:last-child {
          margin-right: 0;
        }

        .guide-item__index {
          display: inline-block;
          margin-right: 20px;
          font-size: 44px;
          color: font-color(.2);
        }

        .guide-item__body-title {
          margin-bottom: 5px;
          font-size: 18px;
          font-weight: bold;
          color: font-color();
        }

        .guide-item__body-detail {
          font-size: 14px;
          color: font-color(.7);
        }
      }
    }
  }
}
</style>
