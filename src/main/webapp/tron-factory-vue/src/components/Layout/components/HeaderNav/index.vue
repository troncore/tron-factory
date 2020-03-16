<template>
  <div class="header-view header-nav">
    <!-- toggle aside nav -->
    <hamburger/>

    <div class="header-logo">
      <router-link to="/"><img class="logo-img" src="@/assets/images/logo.png" :title="siteTitle" :alt="siteTitle"/></router-link>
    </div>

    <div class="header-right">

      <div class="user-info" v-if="isSignIn">
        <span class="account">{{ userInfo.account }}</span>
        <i class="sign-out el-icon-switch-button" @click="handleSignOut"></i>
      </div>

      <i class="divider-line"></i>

      <!-- choose language -->
      <im-locale></im-locale>
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

    .divider-line {
      display: inline-block;
      height: 16px;
      width: 1px;
      background-color: rgba(0, 0, 0, .2);
      vertical-align: middle;
      margin: 0 15px;
    }
  }
}
</style>
