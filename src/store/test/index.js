import { INCREMENT } from './types'

import getters from './getters'
import actions from './actions'

var state = {
  count: 10
}

const mutations = {
  [INCREMENT]: (state) => {
    state.count++
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
