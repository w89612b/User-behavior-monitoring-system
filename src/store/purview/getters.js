import getroute from './getroute'
export default {
  menuitems: (state) => {
    return state.items
  },
  getRoute: (state) => {
    // 重构路由
    let menus = state.items
    return getroute(menus)
  },
  isLoadRoutes: (state) => {
    return state.isLoadRoutes
  },
  GetPermission: (state, getters) => {
    return state.permission.join('')
  }
}
