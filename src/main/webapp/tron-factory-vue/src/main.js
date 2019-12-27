import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locale'

import ElementUI from 'element-ui'
import './assets/styles/element-ui.scss'
Vue.use(ElementUI)

// import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './assets/styles/index.scss' // global css

import './icons'

import api from './api'
Vue.prototype.$_api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
