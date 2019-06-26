import uuidv1 from 'uuid/v1'

export const state = () => ({
  list: [],
  counterToEdit: null
})

export const getters = {
  getCounterById: state => id => {
    return state.list.find(compareId(id))
  }
}

export const mutations = {
  decrementCounter(state, counter) {
    if (counter.value !== 0) {
      counter.value -= 1
    }
  },
  resetCounter(state, counter) {
    counter.value = counter.initialValue
  },
  addCounter(state, counter) {
    state.list.push(counter)
  },
  setCounterToEdit(state, counter) {
    state.counterToEdit = counter
  },
  deleteCounter(state, id) {
    state.list = state.list.filter(counter => counter.id !== id)
  }
}

export const actions = {
  decrementCounter({ commit, getters }, id) {
    const counter = getters.getCounterById(id)

    if (counter) {
      commit('decrementCounter', counter)
    }
  },
  resetCounter({ commit, getters }, id) {
    const counter = getters.getCounterById(id)

    if (counter) {
      commit('resetCounter', counter)
    }
  },
  addCounter({ commit }, data) {
    const id = uuidv1()
    const counter = { ...data, id, value: data.initialValue }

    commit('addCounter', counter)
  },
  setCounterToEdit({ commit, getters, dispatch }, id) {
    const counter = getters.getCounterById(id)

    if (counter) {
      commit('setCounterToEdit', counter)
    }
  },
  cancelCounterEdit({ commit }) {
    commit('setCounterToEdit', null)
  },
  deleteCounter({ commit }, id) {
    commit('deleteCounter', id)
  }
}

// Helpers
const compareId = id => item => item.id === id
