<template>
  <div :class="classObj" class="app-wrapper">
    <div class="app-header">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
    </div>
    <div style="padding:0">
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
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
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 0);
}
</style>
