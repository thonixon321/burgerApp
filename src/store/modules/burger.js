export const namespaced = true

export const state =  {
  burgers: []
}

export const getters = {
  getCreatedBurgers: state => chef => {
    let burgersCreated = state.burgers.filter(burger => burger.chef === chef)
    return burgersCreated
  },

  getOrderedBurgers: state => titles => {
    //filter through the list of burgers and see if any titles
    //of burgers in the array of burgers ordered matches and return
    //all of the ones that match
    let burgersOrdered = state.burgers.filter( burger => titles.includes(burger.title))
    return burgersOrdered
  },

}

export const mutations = {
  SET_BURGERS(state, burgers) {
    state.burgers = burgers
  },

  DELETE_BURGER(state, id) {
    state.burgers = state.burgers.filter( burger => burger.id !== id )
  },

  UPDATE_BURGER(state, burger) {
    state.burgers.forEach((el) => {
      if (el.id === burger.id) {
        el = burger
      }
    })
  },

  CREATE_BURGER(state, burger) {
    state.burgers.push(burger)
  }
}

export const actions = {
  fetchBurgers({ commit }, burgers) {
    commit('SET_BURGERS', burgers)
  },

  deleteBurger({ commit }, id) {
    commit('DELETE_BURGER', id)
  },

  updateBurger({ commit }, burger) {
    commit('UPDATE_BURGER', burger)
  },

  addBurger({ commit }, burger) {
    commit('CREATE_BURGER', burger)
  }
}