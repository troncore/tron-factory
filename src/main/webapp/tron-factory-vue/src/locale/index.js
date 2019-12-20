/**
 * http://kazupon.github.io/vue-i18n/
 */
import Vue from 'vue'
import locale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'
import en from './en-US'
import zh from './zh-CN'
Vue.use(VueI18n)

let curBrowserLang = navigator.language || navigator.userLanguage
if (sessionStorage.getItem('currentLang')) {
  curBrowserLang = sessionStorage.getItem('currentLang')
}

// eslint-disable-next-line no-unused-vars
let curLanAbbreviation = curBrowserLang
let languageAry = ['', 'en-US', 'zh-CN']
if (languageAry.indexOf(curBrowserLang) < 0) {
  curLanAbbreviation = 'en-US'
}

sessionStorage.setItem('currentLang', curBrowserLang)

const messages = {
  'en-US': en,
  'zh-CN': zh,
}
const i18n = new VueI18n({
  locale: curBrowserLang, // 设置默认语言
  messages,
  silentTranslationWarn: true,
})
locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换

export default i18n
