import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

import Layout from '@/components/Layout'
import routeList from "./route.json"
import menuList from './menu.json'

Vue.use(VueRouter)

const vueRoutes = routeList.map(route => Object.assign({
  path: route.path,
  name: route.name,
  component: () => import(`@/views/${route.name}`),
  meta: route.meta || {}
}))

export const allRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/get-start',
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
  routes: allRoutes,
})


function isDisabledMenuItem (menuList = [], itemName) {
  return menuList.some(menuItem => {
    if(menuItem.name === itemName && menuItem.disabled) return true

    if (Array.isArray(menuItem.children)) return isDisabledMenuItem(menuItem.children, itemName)
  })
}

router.beforeEach( async (to, from, next) => {
  try {
    await store.dispatch('app/SET_MENU_LIST', { menuList })

    if (isDisabledMenuItem(store.getters['app/menuList'], to.name)) {
      next('/')
    } else {
      next()
    }

  } catch (e) {
    console.log(e)
    next('/')
  }
})

export default router
