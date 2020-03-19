<template>
  <div class="header-view header-nav">
    <!-- toggle aside nav -->
    <hamburger/>

    <div class="header-logo">
      <router-link to="/"><img class="logo-img" src="@/assets/images/logo.png" :title="siteTitle" :alt="siteTitle"/></router-link>
    </div>

    <div class="header-right nav-list">

      <div class="nav-item view-document" @click="handleViewDocument">{{ $t('base.document') }}</div>

      <!-- choose language -->
      <im-locale class="nav-item"></im-locale>

      <i class="nav-item divider-line"></i>

      <div class="nav-item user-info" v-if="isSignIn">
        <span class="account">{{ userInfo.account }}</span>
        <i class="sign-out el-icon-switch-button" @click="handleSignOut"></i>
      </div>

    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
  computed: {
    ...mapGetters('app', [
      "isSignIn",
      "userInfo"
    ])
  },
  methods: {
    ...mapActions('app', [
      "signOut"
    ]),

    handleSignOut () {
      this.signOut().then(() => {
        this.$router.push('/sign-in')
      })
    },

    handleViewDocument() {
      let currentLanguage = localStorage.getItem('currentLang')
      if (currentLanguage === 'en-US') {
        window.open('http://39.106.174.213/kangjiancheng/tron-factory/blob/develop/README.md', '_blank')
      } else {
        window.open('http://39.106.174.213/kangjiancheng/tron-factory/blob/develop/README.zh-CN.md', '_blank')
      }
    },
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

  .divider-line {
    display: inline-block;
    height: 16px;
    width: 1px;
    background-color: rgba(0, 0, 0, .2);
  }

  .user-info {
    color: #081C56;
    font-size: 14px;
    .sign-out {
      margin-left: 5px;
      vertical-align: middle;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
}
</style>
