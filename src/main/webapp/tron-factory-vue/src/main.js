import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locale'

/**
 * element-ui
 */
import ElementUI from 'element-ui'
Vue.use(ElementUI)

import './assets/styles/index.scss' // global css

/**
 * axios
 */
import axios from './utils/ajax'
import api from './api'
Vue.prototype.$_api = api
Vue.prototype.$_request = axios.request

/**
 * eventBus
 */
Vue.prototype.$eventBus = new Vue()

/**
 * moment
 * this.$_moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
 * 2018-11-26 11:43:19
 */
import * as moment from 'moment';
Vue.prototype.$_moment = moment;

/**
 * TODO: GraphQL 待开发
 */
// import apolloProvider from './graphql'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  // apolloProvider,
  render: h => h(App),
}).$mount('#app')
