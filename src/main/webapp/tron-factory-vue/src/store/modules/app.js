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
    gitHome: 'http://39.106.174.213/kangjiancheng/tron-factory',
    currentGitBranch: process.env.GIT_BRANCH || 'master',
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
    currentGitBranch (state) {
      return state.currentGitBranch
    }
  },

  mutations: {
    setUserInfo (state, payload) {
      state.userInfo.account = localStorage.getItem('user_account') || ''
    },
    toggleCollapseAside (state) {
      state.isCollapseAside = !state.isCollapseAside
      localStorage.setItem('isCollapseAside', state.isCollapseAside)
    },
    viewDocument (state) {
      let currentLanguage = localStorage.getItem('currentLang')
      let docLang = currentLanguage === 'zh-CN' ? 'README.zh-CN.md' : 'README.md'
      let docURL = `${state.gitHome}/blob/${state.currentGitBranch}/${docLang}`

      window.open(docURL, '_blank')
    }
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
        localStorage.removeItem('user_account')

        resolve()
      })
    },
  },
}
