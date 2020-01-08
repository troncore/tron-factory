import $_api from '@/api'

function initMenuList(menuList, activeNames) {
  menuList.forEach(menuItem => {
    if(menuItem.auth) menuItem.disabled = !activeNames.includes(menuItem.name)

    if (Array.isArray(menuItem.children)) initMenuList(menuItem.children, activeNames)
  })
}
function activeMenuItem (menuList, activeName) {
  menuList.forEach(menuItem => {
    if(activeName === menuItem.name) menuItem.disabled = false

    if (Array.isArray(menuItem.children)) activeMenuItem(menuItem.children, activeName)
  })
}

// Change this value, it will change aside menu status because it reset the localstorage value
const menuListIdInStorage = 2 // when the menu.json value changed, need change this value by increment 1

export default {
  namespaced: true,
  state: {
    isCollapseAside: localStorage.getItem('isCollapseAside') === 'true',
    menuList: [],

    // for localStorage
    oldMenuListKey: 'menuList' + (menuListIdInStorage - 1),
    newMenuListKey: 'menuList' + menuListIdInStorage,
  },

  getters: {
    isCollapseAside (state) {
      return state.isCollapseAside
    },
    menuList (state) {
      return state.menuList
    },
  },

  mutations: {
    toggleCollapseAside (state) {
      state.isCollapseAside = !state.isCollapseAside
      localStorage.setItem('isCollapseAside', state.isCollapseAside)
    },

    updateMenuList (state, payload = { activeNames: [], activeName: '' }) {
      if (payload.activeNames) initMenuList(state.menuList, payload.activeNames)
      else if (payload.activeName) activeMenuItem(state.menuList, payload.activeName)

      localStorage.setItem(state.newMenuListKey, JSON.stringify(state.menuList))
    },

    SET_MENU_LIST (state, payload = { menuList: []}) {
      const  menu = payload.menuList || []
      if (localStorage.getItem(state.oldMenuListKey)) {
        localStorage.removeItem(state.oldMenuListKey)
      }
      const  storedMenu = JSON.parse(localStorage.getItem(state.newMenuListKey) || '[]')

      state.menuList = storedMenu.length ? storedMenu : menu
      localStorage.setItem(state.newMenuListKey, JSON.stringify(state.menuList))
    }
  },

  actions: {
    SET_MENU_LIST ({ commit }, payload) {
      return new Promise(resolve => {
        commit('SET_MENU_LIST', {menuList: payload.menuList})
        resolve()
      })
    },
  },
}
