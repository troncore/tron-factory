/**
 * @see: https://apollo.vuejs.org/
 */
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import Vue from 'vue'
import VueApollo from 'vue-apollo'
Vue.use(VueApollo)

// 与 API 的 HTTP 连接
const httpLink = createHttpLink({
  // 你需要在这里使用绝对路径
  uri: 'https://api.trongrid.io/wallet/getnodeinfo',
})

// 缓存实现
const cache = new InMemoryCache()

// 创建 apollo 客户端
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

// 保存可以在接下来被所有子组件使用的 Apollo 客户端实例
const apolloProvider = new VueApollo({
  // 支持多客户端
  // 在查询中使用 'client' 选项
  // 或在 apollo 定义中使用 '$client'
  // clients: {
  //   a: apolloClientA,
  //   b: apolloClientB,
  // },
  // 默认客户端
  defaultClient: apolloClient,
  errorHandler (error) {
    console.log('Global error handler')
    console.error(error)
  },
})

export default apolloProvider