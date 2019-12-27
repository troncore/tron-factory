<template>
  <div class="app-wrapper">
    <div class="app-header">
      <header-nav />
    </div>

    <div class="app-body">
      <div class="app-sidebar">
        <aside-nav />
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
import HeaderNav from './components/HeaderNav'
import AsideNav from './components/AsideNav'

export default {
  name: 'Layout',
  components: {
    HeaderNav,
    AsideNav,
  },
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  .app-header {
    position: relative;
    z-index: 1;
    height: 60px;
  }

  .app-body {
    display: flex;
    height: calc(100vh - 60px);

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
}

</style>
