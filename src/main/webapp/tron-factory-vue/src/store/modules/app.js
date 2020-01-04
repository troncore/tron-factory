import {
  allMenuRoutes,
  authMenuRoutes
} from '@/router'

const authMenu = JSON.parse(localStorage.getItem('authMenu') || '[]')

// init the disabled status for auth menu routes
function initAuthMenuRoutes (authMenuRoutes, authMenu, isInit = true) {
  return authMenuRoutes.map(route => {

    if (route.meta && ~authMenu.findIndex(name => route.meta.name === name)) {
      route.meta.disabled = false
    } else if (!isInit) {
      // after init, if not exist in auth menu that is disabled true
      route.meta.disabled = true
    }

    return route
  })
}

// init auth menu
function initAuthMenu (authMenuRoutes, authMenu) {
  authMenuRoutes.forEach(route => {
    if (route.meta && !route.meta.disabled && !authMenu.includes(route.meta.name)) {
      authMenu.push(route.meta.name)
    }
  })

  localStorage.setItem('authMenu', JSON.stringify(authMenu))

  return authMenu
}

export default {
  namespaced: true,

  state: {
    isCollapseAside: localStorage.getItem('isCollapseAside') === 'true',
    allMenuRoutes: allMenuRoutes,
    authMenuRoutes: initAuthMenuRoutes(authMenuRoutes, authMenu),
    authMenu: initAuthMenu(authMenuRoutes, authMenu),
  },

  getters: {
    isCollapseAside (state) {
      return state.isCollapseAside
    },
    authMenuRoutes (state) {
      return state.authMenuRoutes
    },
    authMenu (state) {
      return state.authMenu
    },
    allMenuRoutes (state) {
      return state.allMenuRoutes
    },
  },

  mutations: {
    // name is the meta name of the route path
    SET_AUTH_MENU (state, { nameList, name }) {
      state.authMenu = nameList || state.authMenu

      if (name && !state.authMenu.includes(name)) {
        state.authMenu.push(name)
      }

      initAuthMenuRoutes(state.authMenuRoutes, state.authMenu, false)
      initAuthMenu(state.authMenuRoutes, state.authMenu)
    },

    toggleCollapseAside (state) {
      state.isCollapseAside = !state.isCollapseAside
      localStorage.setItem('isCollapseAside', state.isCollapseAside)
    },
  },

  actions: {},
}
