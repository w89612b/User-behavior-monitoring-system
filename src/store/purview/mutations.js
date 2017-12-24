export default {
  addMenu: (state, menuItems) => {
    if (menuItems.length === 0) {
      state.items = []
    } else {
      state.items = menuItems
    }
  },
  loadRoutes: (state) => {
    state.isLoadRoutes = !state.isLoadRoutes
  },
  addPermission: (state, permission) => {
    state.permission = permission
  }
}
