<template>
  <div class="get-started">
    <div class="loading-mask" v-if="loading" v-loading="loading"></div>
    <div class="page-main" v-else>
      <div v-if="showStart" class="page-body im-card">
        <div class="summary">
          {{ $t('getStarted.summaryChain') }}
        </div>
        <div class="description">
          {{ $t('getStarted.descriptionChain') }}
        </div>
        <el-button type="primary" class="im-button largest" @click="handleCreate">{{ $t('getStarted.startCreate') }}</el-button>
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
    padding-top: 10%;

    .summary {
      margin-bottom: 50px;
      font-size: 24px;
      font-weight: bold;
      color: font-color();
    }
    .description {
      margin-bottom: 100px;
      font-size: 16px;
      color: font-color();
    }
  }
}
</style>
