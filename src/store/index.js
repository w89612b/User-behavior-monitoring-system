import VUE from 'vue'
import VUEX from 'vuex'
import modules from './modules'
VUE.use(VUEX)
export default new VUEX.Store({
  modules: modules
})
