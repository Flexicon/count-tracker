import uuidv1 from 'uuid/v1'

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
  },
  addCounter(state, counter) {
    state.list.push(counter)
  }
}

export const actions = {
  decrementCounter({ commit }, id) {
    commit('decrementCounter', id)
  },
  resetCounter({ commit }, id) {
    commit('resetCounter', id)
  },
  addCounter({ commit }, data) {
    const id = uuidv1()
    const counter = { ...data, id, value: data.initialValue }

    commit('addCounter', counter)
  }
}
