import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout'
import routes from "./route.json"

Vue.use(VueRouter)


export const allRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/get-start',

    children: routes.map(route => Object.assign({
      path: route.path,
      name: route.name,
      component: () => import(`@/views/${route.name}`),
      meta: route.meta || {}
    })),
  },

  {
    path: '*',
    redirect: '/404',
  },
]

export const allMenuRoutes = []
export const authMenuRoutes = []


const router = new VueRouter({
  routes: allRoutes,
})

router.beforeEach((to, from, next) => {
  const authMenu = JSON.parse(sessionStorage.getItem('authMenu') || '[]')

  next()
})

export default router
