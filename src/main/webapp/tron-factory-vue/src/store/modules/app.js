import menuList from '@/router/menu'

export default {
  namespaced: true,
  state: {
    isSignIn: localStorage.getItem('isSignIn') === 'true',
    userInfo: {
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
    signIn (state) {
      state.isSignIn = true
      localStorage.setItem('isSignIn', state.isSignIn)
    },
    signOut (state) {
      state.isSignIn = false
      localStorage.setItem('isSignIn', state.isSignIn)
    },
    toggleCollapseAside (state) {
      state.isCollapseAside = !state.isCollapseAside
      localStorage.setItem('isCollapseAside', state.isCollapseAside)
    },
  },

  actions: {
  },
}
