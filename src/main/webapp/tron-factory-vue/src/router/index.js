import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout'

Vue.use(VueRouter)

export const baseRoutes = [
  {
    path: '/',
    redirect: '/get-start',
  },
]
export const NotFoundRoutes = [
  {
    path: '*',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404'),
    meta: {
      name: '404',
      hidden: true,
    },
  },
]
export const authMenuRoutes = [
  {
    path: '/get-start',
    component: Layout,
    meta: {
      name: 'get-start', // for path
      title: 'getStart.name', // for menu
      disabled: false,
      isAuth: false,
      icon: 'el-icon-guide',
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "get-start" */ '@/views/get-start')
      },
    ],
  },

  {
    path: '/node-list',
    component: Layout,
    meta: {
      name: 'node-list',
      title: 'tronSettingMenuNodeList',
      disabled: true,
      icon: 'el-icon-s-operation',
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "node-list" */ '@/views/node-list'),
      },
    ],
  },

  {
    path: '/config-manage',
    component: Layout,
    meta: {
      name: 'config-manage',
      title: 'tronSettingMenuSetting',
      disabled: true,
      icon: 'el-icon-setting',
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "config-manage" */ '@/views/config-manage'),
      },
    ],
  },

  {
    path: '/import-plugin',
    component: Layout,
    meta: {
      name: 'import-plugin',
      title: 'tronSettingMenuPlugin',
      disabled: true,
      icon: 'el-icon-upload',
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "import-plugin" */ '@/views/import-plugin'),
      },
    ],
  },

  {
    path: '/deploy-nodes',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "deploy-nodes" */ '@/views/deploy-nodes'),
      },
    ],
    meta: {
      name: 'deploy-nodes',
      title: 'tronSettingMenuDeployment',
      disabled: true,
      icon: 'el-icon-share',
    },
  },
]
export const menuRoutes = [
  ...authMenuRoutes,
  {
    path: 'https://tronscan.org/',
    component: Layout,
    meta: {
      name: 'tronscan',
      title: 'tronscanMenu',
      disabled: false,
      icon: 'el-icon-link',
    },
  },
]

const routes = [...baseRoutes, ...menuRoutes, ...NotFoundRoutes]

const router = new VueRouter({
  scrollBehavior: () => ({
    y: 0,
  }),
  routes,
})

export default router
