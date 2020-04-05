<template>
  <div class="header-view header-nav">
    <!-- toggle aside nav -->
    <hamburger/>

    <div class="header-logo">
      <router-link to="/"><img class="logo-img" src="@/assets/images/logo.png" :title="siteTitle" :alt="siteTitle"/></router-link>
    </div>

    <div class="header-right nav-list">

      <div class="nav-item view-document" @click="viewDocument()">{{ $t('base.document') }}</div>

      <!-- choose language -->
      <im-locale class="nav-item"></im-locale>
    </div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Hamburger from './Hamburger'
import ImLocale from "@/components/ImLocale";

export default {
  name: 'header-nav',
  components: {
    ImLocale,
    Hamburger,
  },
  data() {
    return {
      siteTitle: 'TRON FACTORY',
    }
  },
  methods: {
    ...mapMutations('app', [
      "viewDocument"
    ]),
  },
}
</script>

<style lang="scss" scoped>
.header-nav {
  display: flex;
  align-items: center;
  height: 100%;
  background-color: white;
  font-size: 14px;
  color: #606266;

  .header-logo {
    width: 192px;
    .logo-img {
      width: 100%;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    margin: 0 64px 0 auto;
  }

  .nav-list {
    .nav-item {
      margin-left: 20px;
    }
  }

  .view-document {
    cursor: pointer;
  }
}
</style>
