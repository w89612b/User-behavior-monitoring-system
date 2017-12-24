import * as types from './types'

export default {
  increment: ({ commit }) => { // 处理你要干什么，异步请求， 判断，流程控制
    commit(types.INCREMENT)
  }
}
