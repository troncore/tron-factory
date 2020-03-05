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
      <el-dropdown class="lang-dropdown hover-effect" trigger="click" @command="handleCommand">
        <div class="avatar-wrapper">{{ currentLang || 'Language' }}<i class="el-icon-caret-bottom" /></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(value, key) in languages"
            :key="key"
            :command="key">
            {{ value }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Hamburger from './Hamburger'

export default {
  name: 'header-nav',
  components: {
    Hamburger,
  },
  data() {
    return {
      siteTitle: 'TRON FACTORY',
      currentLang: '',
      languages: {
        'en-US': 'English',
        'zh-CN': '简体中文',
      },
    }
  },
  computed: {
    ...mapGetters('app', [
      "isSignIn",
      "userInfo"
    ])
  },
  created () {
    this.getLang()
  },
  methods: {
    ...mapActions('app', [
      "signOut"
    ]),
    getLang () {
      let lang = localStorage.getItem('currentLang')
      this.currentLang = this.languages[lang || 'en-US']
    },

    handleSignOut () {
      this.signOut().then(() => {
        this.$router.push('/sign-in')
      })
    },

    handleCommand(val) {
      this.currentLang = this.languages[val]
      this.$i18n.locale = val
      localStorage.setItem('currentLang', val)
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

    .lang-dropdown {
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background-color: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>
