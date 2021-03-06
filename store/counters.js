import uuidv1 from 'uuid/v1'
import { DateTime } from 'luxon'

export const state = () => ({
  list: [],
  counterToEdit: null
})

/**
 * Getters
 */
export const getters = {
  getAllCounters: state => state.list,
  getCounterById: state => id => {
    return state.list.find(item => item.id === id)
  }
}

/**
 * Mutations
 */
export const mutations = {
  decrementCounter(state, counter) {
    if (counter.value !== 0) {
      counter.value -= 1
    }
  },

  resetCounter(state, counter) {
    counter.value = counter.initialValue
    counter.lastReset = DateTime.fromObject({ hour: 0 }).toISO()
  },

  addCounter(state, counter) {
    state.list.push(counter)
  },

  editCounter(state, { id, data }) {
    const counter = state.list.find(counter => counter.id === id)

    if (counter) {
      const { initialValue } = data
      const { value } = counter

      Object.assign(counter, {
        ...data,
        value: initialValue < value ? initialValue : value
      })
    }
  },

  setCounterToEdit(state, counter) {
    state.counterToEdit = counter
  },

  deleteCounter(state, id) {
    state.list = state.list.filter(counter => counter.id !== id)
  }
}

/**
 * Actions
 */
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

  resetCounters({ commit, getters }, ids) {
    ids.forEach(id => {
      const counter = getters.getCounterById(id)

      if (counter) {
        commit('resetCounter', counter)
      }
    })
  },

  addCounter({ commit }, data) {
    const id = uuidv1()
    const counter = {
      ...data,
      id,
      value: data.initialValue,
      lastReset: DateTime.fromObject({ hour: 0 }).toISO()
    }

    commit('addCounter', counter)
  },

  editCounter({ commit, getters }, counter) {
    const { id, ...data } = counter

    commit('editCounter', { id, data })
    commit('setCounterToEdit', null)
  },

  setCounterToEdit({ commit, getters }, id) {
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
