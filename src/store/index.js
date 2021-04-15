import Vue from 'vue'
import Vuex from '../qvuex/index'

Vue.use(Vuex)

export default new Vuex.Store({
  // 响应式数据状态
  state: {
    count: 0
  },
  // commit
  mutations: {
    increment (state) {
      state.count++
    }
  },
  // dispatch
  actions: {
    increment ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  },
  modules: {
  },
  getters: {
    doubleCounter (state) {
      return state.count * 2
    }
  }
})
