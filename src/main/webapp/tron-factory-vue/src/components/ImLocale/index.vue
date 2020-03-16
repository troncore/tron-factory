<template>
  <el-dropdown class="im-locale hover-effect" trigger="click" @command="handleCommand">
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
</template>

<script>
export default {
  name: "im-locale",
  data() {
    return {
      currentLang: '',
      languages: {
        'en-US': 'English',
        'zh-CN': '简体中文',
      },
    }
  },
  created () {
    this.getLang()
  },
  methods: {
    getLang () {
      let lang = localStorage.getItem('currentLang')
      this.currentLang = this.languages[lang || 'en-US']
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
.im-locale {
  &.hover-effect {
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>
