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

const layoutRoutes = routeList.map(route => Object.assign({
  path: route.path,
  name: route.name,
  component: () => import(`@/views/${route.name}`),
  meta: route.meta || {}
}))

const baseRoutes = [
  {
    path: "/sign-in",
    name: "sign-in",
    component: () => import('@/views/sign-in')
  },
  {
    path: "*",
    name: "404",
    component: () => import('@/views/404')
  },
]

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/nodes-manage',
    children: [
      ...layoutRoutes,
    ],
  },
  ...baseRoutes
]

const router = new VueRouter({
  routes,
})


router.beforeEach( async (to, from, next) => {
  try {
    if ((to.meta.auth || to.name === '404') && !store.getters['app/isSignIn']) {
      next('/sign-in')
    } else {
      next()
    }

  } catch (e) {
    next('/sign-in')
  }
})

export default router
