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
    categories: []
  }
})


