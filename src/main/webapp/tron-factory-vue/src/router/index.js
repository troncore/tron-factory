import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"
import Layout from '@/components/Layout'
import rawRoutes from "./route.json"

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(VueRouter)

// const baseRoutes = []

// for layout routes
const authRoutes = rawRoutes.map(route => Object.assign({
  path: route.path,
  name: route.name,  // equivalent to the view component file path
  component: () => import(`@/views/${route.name}`),
  meta: route.meta || {}
}))

const routes = [
  // ...baseRoutes,
  {
    path: '/',
    component: Layout,
    redirect: { name: 'get-started' },
    children: [
      ...authRoutes,
    ],
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
]

const router = new VueRouter({
  routes,
})


router.beforeEach( (to, from, next) => {
  next()
})

export default router
