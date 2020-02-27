import Vue from 'vue'
import VueRouter from 'vue-router'

import store from "@/store"
import Layout from '@/components/Layout'
import routeList from "./route.json"

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(VueRouter)

const vueRoutes = routeList.map(route => Object.assign({
  path: route.path,
  name: route.name,
  component: () => import(`@/views/${route.name}`),
  meta: route.meta || {}
}))

export const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/nodes-manage',
    children: [
      ...vueRoutes,
    ],
  },

  {
    path: '*',
    redirect: '/404',
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach( async (to, from, next) => {
  try {
    console.log(store.getters['app/isSignIn'])

    if (to.meta.auth && !store.getters['app/isSignIn']) {
      next('/sign-in')
    } else {
      next()
    }

  } catch (e) {
    next('/')
  }
})

export default router
