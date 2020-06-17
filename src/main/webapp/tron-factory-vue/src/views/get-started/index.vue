<template>
  <div class="get-started" v-loading="loading">
    <div v-if="!hasBlockChain" class="page-body im-card">
      <div class="description">
        {{ $t('一键发链，快速创建你自己的区块链') }}
      </div>
      <el-button type="primary" class="im-button largest" @click="handleStart">开始创建</el-button>
    </div>

    <component v-else :is="currentComponent" />
  </div>
</template>

<script>
  export default {
    name: "get-started",
    components: {
      CreateChain: () => import('./components/CreateChain') ,
      Dashboard: () => import('./components/Dashboard') ,
    },
    data () {
      return {
        loading: false,
        hasBlockChain: false,
        currentComponent: 'Dashboard',
        hasValidStatus: false,

        routeMapComponent: {
          'create-chain': 'CreateChain',
          'dashboard': 'Dashboard',
        }
      }
    },
    watch: {
      '$route': {
        handler (to, from) {
          // 对路由变化作出响应...
          if (to.params && to.params.status) {
            this.hasValidStatus = true
            this.currentComponent = this.routeMapComponent[to.params.status]
            if (this.currentComponent) {
              this.hasBlockChain = true
            }
            if (!this.currentComponent) this.hasValidStatus = false
          } else {
            this.init()
          }
        },
        immediate: true,
      }
    },
    created () {
      this.activeMenuIndex()
      // this.init()
    },
    methods: {
      activeMenuIndex () {
        this.$eventBus.$emit('menuActiveIndex', '/get-started')
      },
      init () {
        this.loading = true
        this.$_api.getStarted.hasBlockChain({}, (err, res) => {
          this.loading = false
          if (err) return

          if (typeof res === 'boolean') {
            this.hasBlockChain = res

            if (this.hasBlockChain) this.$router.push('/get-started/dashboard')
          }
        })
      },
      handleStart () {
        this.hasBlockChain = true
        this.$router.push('/get-started/create-chain')
      }
    }
  }
</script>

<style scoped lang="scss">
.get-started {
  height: 100%;
  min-height: 100%;
  padding: 20px;
  .page-body {
    height: 100%;
    text-align: center;
    padding-top: 15%;
    .description {
      margin-bottom: 50px;
      font-size: 20px;
      color: font-color();
    }
  }
}
</style>
