export const state = () => ({
  list: []
})

export const getters = {
  getCounterById: state => id => {
    return state.list.find(counter => counter.id === id)
  }
}

export const mutations = {
  decrementCounter(state, id) {
    const counter = state.list.find(counter => counter.id === id)

    if (counter !== undefined && counter.value !== 0) {
      counter.value -= 1
    }
  },
  resetCounter(state, id) {
    const counter = state.list.find(counter => counter.id === id)

    if (counter !== undefined) {
      counter.value = counter.initialValue
    }
  }
}

export const actions = {
  decrementCounter({ commit }, id) {
    commit('decrementCounter', id)
  },
  resetCounter({ commit }, id) {
    commit('resetCounter', id)
  }
}
