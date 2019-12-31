import $_api from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router'

import { authMenuRoutes } from "@/router";
const authMenu = JSON.parse(sessionStorage.getItem('authMenu') || '[]')

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

  sessionStorage.setItem('authMenu', JSON.stringify(authMenu))

  return authMenu
}

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
  authMenuRoutes: initAuthMenuRoutes(authMenuRoutes, authMenu),
  authMenu: initAuthMenu(authMenuRoutes, authMenu),
}

const getters = {
  authMenuRoutes (state) {
    return state.authMenuRoutes
  },
  authMenu (state) {
    return state.authMenu
  }
}

const mutations = {
  // name is the meta name of the route path
  SET_AUTH_MENU (state, { nameList, name }) {
    state.authMenu = nameList || state.authMenu

    if (name && !state.authMenu.includes(name)) {
      state.authMenu.push(name)
    }

    initAuthMenuRoutes(state.authMenuRoutes, state.authMenu, false)
    initAuthMenu(state.authMenuRoutes, state.authMenu)
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      $_api.user
        .login({
          username: username.trim(),
          password: password,
        })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      const data = {
        name: 'tron',
        avatar: '',
        roles: [],
      }

      if (state.roles[0] != 'node') {
        // console.log(state.roles, 'state.role')
        if (state.roles[0] == undefined) {
          // data.roles = ['node']
          // } else {
          data.roles = [getToken()]
        } else if (state.roles.length === 0) {
          data.roles = ['node']
        }
      }

      if (!data) {
        reject('Verification failed, please Login again.')
      }

      const { roles, name, avatar } = data

      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        reject('getInfo: roles must be a non-null array!')
      }

      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      $_api.user
        .logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      commit('SET_TOKEN', role)
      setToken(role)

      const roles = [role]
      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {
        root: true,
      })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
