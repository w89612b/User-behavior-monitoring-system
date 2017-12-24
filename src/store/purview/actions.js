export default {
  addMenu: ({ commit }, menuItems) => {
    if (menuItems.length > 0) {
      commit('addMenu', menuItems)
    }
  },
  loadRoutes: ({ commit }) => {
    commit('loadRoutes')
  },
  addPermission: ({ commit }, permission) => {
    commit('addPermission', permission)
  }
}
