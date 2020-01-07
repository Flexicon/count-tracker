import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'count_tracker_vuex',
      storage: localStorage
    }).plugin(store)
  })
}
