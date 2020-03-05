import menuList from '@/router/menu'

export default {
  namespaced: true,
  state: {
    isSignIn: localStorage.getItem('isSignIn') === 'true',
    userInfo: {
      name: '',
      account: '',
      email: '',
    },
    isCollapseAside: localStorage.getItem('isCollapseAside') === 'true',
    menuList: menuList,
  },

  getters: {
    isSignIn (state) {
      return state.isSignIn
    },
    userInfo (state) {
      return state.userInfo
    },
    isCollapseAside (state) {
      return state.isCollapseAside
    },
    menuList (state) {
      return state.menuList
    },
  },

  mutations: {
    signIn (state, payload) {
      return undefined;
    },
    signOut (state) {
      return undefined;
    },
    setUserInfo (state, payload) {
      state.userInfo.account = localStorage.getItem('user_account') || ''
    },
    toggleCollapseAside (state) {
      state.isCollapseAside = !state.isCollapseAside
      localStorage.setItem('isCollapseAside', state.isCollapseAside)
    },
  },

  actions: {
    signIn ({ state, getters, commit, dispatch, rootGetters }, payload) {
      return new Promise(resolve => {
        state.isSignIn = true
        localStorage.setItem('isSignIn', state.isSignIn)

        state.userInfo.account = payload.account
        localStorage.setItem('user_account', state.userInfo.account)

        resolve()
      })
    },
    signOut ({ state }) {
      return new Promise(resolve => {
        state.isSignIn = false
        localStorage.setItem('isSignIn', state.isSignIn)

        resolve()
      })
    },
  },
}
