import VuexPersistence from 'vuex-persist'
import localforage from 'localforage'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'count_tracker_vuex',
      storage: localforage,
      restoreState: (key, storage) => {
        return new Promise(resolve => {
          storage.getItem(key).then(data => {
            resolve(data)
            store._vm.$root.$emit('storageReady')
          })
        })
      }
    }).plugin(store)
  })
}
