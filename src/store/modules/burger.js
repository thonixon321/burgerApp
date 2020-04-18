export const namespaced = true

export const state =  {
  burgers: []
}

export const getters = {
  getCreatedBurgers: state => chef => {
    let burgersCreated = []
    burgersCreated.push(state.burgers.find(burger => burger.chef === chef))
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
  }
}

export const actions = {
  fetchBurgers({ commit }, burgers) {
    commit('SET_BURGERS', burgers)
  }
}