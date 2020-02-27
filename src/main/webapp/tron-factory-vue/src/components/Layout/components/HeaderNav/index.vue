<template>
  <div class="header-view header-nav">
    <!-- toggle aside nav -->
    <hamburger/>

    <div class="header-logo">
      <router-link to="/"><img class="logo-img" src="@/assets/images/logo.png" :title="siteTitle" :alt="siteTitle"/></router-link>
    </div>

    <div class="header-right">

      <div class="user-info" v-if="isSignIn">
        <el-button type="text" class="sign-out" @click="handleSignOut">登出</el-button>
      </div>

      <!-- choose language -->
      <el-dropdown class="lang-dropdown hover-effect" trigger="click" @command="handleCommand">
        <div class="avatar-wrapper">{{ currentLang || 'Language' }}<i class="el-icon-caret-bottom" /></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(value, key) in languages" :key="key" :command="key">
            {{ value }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
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
    ])
  },
  created () {
    this.getLang()
  },
  methods: {
    ...mapMutations('app', [
      "signOut"
    ]),
    getLang () {
      let lang = localStorage.getItem('currentLang')
      this.currentLang = this.languages[lang || 'en-US']
    },

    handleSignOut () {
      this.signOut()
      this.$router.push('/sign-in')
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
      .sign-out {
        cursor: pointer;
      }
    }

    .lang-dropdown {
      margin-left: 30px;
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
