import actions from './actions'
import mutations from './mutations'
import getters from './getters'

var state = {
  items: [],
  isLoadRoutes: false,
  permission: []
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
