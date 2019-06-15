export const state = () => ({
  list: [
    {
      id: '001',
      name: 'Debit card use',
      manual: true,
      resetPeriod: null,
      initialValue: 5,
      value: 5
    },
    {
      id: '002',
      name: 'Something or other',
      manual: true,
      resetPeriod: null,
      initialValue: 12,
      value: 9
    },
    {
      id: '003',
      name: 'Drink glass of water',
      manual: true,
      resetPeriod: null,
      initialValue: 8,
      value: 0
    }
  ]
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
