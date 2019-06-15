import VuexPersistence from 'vuex-persist'
import localforage from 'localforage'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'count_tracker_vuex',
      storage: localforage
    }).plugin(store)
  })
}
