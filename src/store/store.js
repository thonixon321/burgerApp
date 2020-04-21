import Vue from 'vue'
import Vuex from 'vuex'

//import all public items into the user namespace - so user.user can
//access the value that was exported from this file
import * as user from './modules/user'
import * as burger from './modules/burger'
import * as notification from './modules/notification'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user,
    burger,
    notification
  },

  state: {
    modalActive: false,
    modalContent: {}
  },

  mutations: {
    SET_MODAL_STATUS(state, status) {
      state.modalActive = status
    },

    SET_MODAL_CONTENT(state, content) {
      state.modalContent = content
    }
  },

  actions: {
    updateModalStatus({ commit }, status) {
      commit('SET_MODAL_STATUS', status)
    },

    updateModalContent({ commit }, content) {
      commit('SET_MODAL_CONTENT', content)
    },
  }
})


