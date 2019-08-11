import { isCounterExpired } from '../helpers/expiry-date'

export default ({ store }) => {
  const resetExpiredCounters = () => {
    const idsToExpire = store.getters['counters/getAllCounters']
      .filter(isCounterExpired)
      .map(c => c.id)

    store.dispatch('counters/resetCounters', idsToExpire)
  }

  window.onNuxtReady(() => {
    // Hook for when the user navigates away or to the app screen
    // whether it's changing their tab or pressing the home button on their phone
    document.addEventListener('visibilitychange', resetExpiredCounters)
    // Hook for when the vuex store is repopulated with stored data
    store._vm.$root.$on('storageReady', () =>
      setTimeout(resetExpiredCounters, 5)
    )
  })
}
