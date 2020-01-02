import Cookies from 'js-cookie'
import { menuRoutes } from '@/router'


const state = {
  permission_routes: [...menuRoutes],
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
  },
  isCollapseAside: localStorage.getItem('isCollapseAside') === 'true',
  device: '',
}

const getters = {
  isCollapseAside (state) {
    return state.isCollapseAside
  }
}

const mutations = {
  toggleCollapseAside (state) {
    state.isCollapseAside = !state.isCollapseAside
    localStorage.setItem('isCollapseAside', state.isCollapseAside)
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
