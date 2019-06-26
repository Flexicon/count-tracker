// Top level state
export const state = () => ({
  editing: false
})

export const mutations = {
  setEditing(state, editing) {
    state.editing = editing
  }
}

export const actions = {
  startEditing({ commit }) {
    commit('setEditing', true)
  },
  stopEditing({ commit }) {
    commit('setEditing', false)
  }
}
