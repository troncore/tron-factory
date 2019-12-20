import siteConfig from '@/config/site.config.js'

const { showSettings, fixedHeader } = siteConfig

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}