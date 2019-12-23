import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout'

Vue.use(VueRouter)

export const baseRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
]
export const NotFoundRoutes = [
  {
    path: '*',
    component: () => import('@/views/404'),
    meta: {
      name: '404',
      hidden: true,
    },
  },
]
export const menuRoutes = [
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index'),
        meta: {
          title: 'tronSettingMenuDashboard',
        },
      },
    ],
    meta: {
      name: 'Dashboard',
      icon: 'dashboard',
    },
  },
  {
    path: '/node_list',
    component: Layout,
    meta: {
      title: 'tronSettingMenuNode',
      name: 'tronSettingMenuNodeList',
      icon: 'tree',
    },
    children: [
      {
        path: '',
        component: () => import('@/views/node-list'),
        meta: {
          title: 'tronSettingMenuNodeList',
          roles: ['admin', 'node', 'setting', 'plugin', 'deploy'],
        },
      },
    ],
  },
  {
    path: '/config_manage',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/config-manage'),
        meta: {
          title: 'tronSettingMenuSetting',
          roles: ['admin', 'setting', 'plugin', 'deploy'],
        },
      },
    ],
    meta: {
      title: 'tronSettingMenuSetting',
      name: 'tronSettingMenuSetting',
      icon: 'setting',
    },
  },

  {
    path: '/import_plugin',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/import-plugin'),
        meta: {
          icon: 'plugins',
          roles: ['admin', 'plugin', 'deploy'],
        },
      },
    ],
    meta: {
      name: 'tronSettingMenuPlugin',
      icon: 'plugins',
    },
  },

  {
    path: '/deploy_nodes',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/deploy-nodes'),
        meta: {
          roles: ['admin', 'deploy'],
        },
      },
    ],
    meta: {
      name: 'tronSettingMenuDeployment',
      icon: 'deployment',
      roles: ['admin', 'deploy'],
    },
  },
  {
    path: 'https://tronscan.org/',
    component: Layout,
    meta: {
      name: 'tronscanMenu',
      icon: 'link',
      roles: ['admin', 'deploy'],
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
