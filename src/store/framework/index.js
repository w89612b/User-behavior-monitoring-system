var state = {
  sidebar: false,
  Baseinfo: function () {
    var data = {}
    data.appKey = '0d28da7c13bc75d0c6e0550706934c81'
    data.user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')).userName : 'newuser'
    data.anchorId = 1
    return data
  }
}

const getters = {
  getSidebar: (state) => {
    return state.sidebar
  },
  getBaseinfo: (state) => {
    return state.Baseinfo()
  }
}

const actions = {
  changeSidebar: ({commit}) => {
    commit('changeSidebar')
  }
}

const mutations = {
  changeSidebar: (state) => {
    state.sidebar = !state.sidebar
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
