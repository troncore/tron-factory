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
    component: () => import('../views/404'),
    meta: {
      name: '404',
      hidden: true,
    },
  },
]
export const menuRoutes = [
  {
    path: '/get-start',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "get-start" */ '../views/get-start')
      },
    ],
    meta: {
      name: 'getStart.name',
      icon: 'el-icon-guide',
    },
  },

 /* {
    path: '/node_list',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import(/!* webpackChunkName: "node-list" *!/ '@/views/node-list'),
      },
    ],
    meta: {
      name: 'tronSettingMenuNodeList',
      icon: 'el-icon-s-operation',
    },
  },

  {
    path: '/config_manage',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import(/!* webpackChunkName: "config-manage" *!/ '@/views/config-manage'),
      },
    ],
    meta: {
      title: 'tronSettingMenuSetting',
      name: 'tronSettingMenuSetting',
      icon: 'el-icon-setting',
    },
  },

  {
    path: '/import_plugin',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import(/!* webpackChunkName: "import-plugin" *!/ '@/views/import-plugin'),
      },
    ],
    meta: {
      name: 'tronSettingMenuPlugin',
      icon: 'el-icon-upload',
    },
  },

  {
    path: '/deploy_nodes',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import(/!* webpackChunkName: "deploy-nodes" *!/ '@/views/deploy-nodes'),
      },
    ],
    meta: {
      name: 'tronSettingMenuDeployment',
      icon: 'el-icon-share',
    },
  },

  {
    path: 'https://tronscan.org/',
    component: Layout,
    meta: {
      name: 'tronscanMenu',
      icon: 'el-icon-link',
    },
  },*/
]

const routes = [...baseRoutes, ...menuRoutes, ...NotFoundRoutes]

const router = new VueRouter({
  scrollBehavior: () => ({
    y: 0,
  }),
  routes,
})

export default router
