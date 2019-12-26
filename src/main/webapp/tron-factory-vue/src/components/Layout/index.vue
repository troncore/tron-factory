<template>
  <div class="app-wrapper">
    <div class="app-header">
      <header-nav></header-nav>
    </div>

    <div class="app-body">
      <div class="app-sidebar">
        <sidebar />
      </div>

      <div class="app-main">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain } from './components'
import HeaderNav from "./components/HeaderNav";

import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    HeaderNav,
    Sidebar,
    AppMain,
  },
  computed: {

    sidebar() {
      return this.$store.state.app.sidebar
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      }
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  .app-header {
    height: 60px;
  }
  .app-body {
    display: flex;
    max-width: 1920px;
    height: calc(100vh - 60px);
  }
  .app-sidebar {
    display: inline-block;
    flex-basis: auto;
    height: 100%;
    overflow: auto;
  }

  .app-main {
    flex: 1;
    height: 100%;
    overflow: auto;
  }
}

</style>
