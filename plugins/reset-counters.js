import { isCounterExpired } from '../helpers/expiry-date'

export default ({ store }) => {
  const resetExpiredCounters = () => {
    const idsToExpire = store.getters['counters/getAllCounters']
      .filter(isCounterExpired)
      .map(c => c.id)

    store.dispatch('counters/resetCounters', idsToExpire)
  }

  window.onNuxtReady(() => {
    // Reset all expired counters that have been repopulated from stored data
    resetExpiredCounters()
    // Hook for when the user navigates away or to the app screen
    // whether it's changing their tab or pressing the home button on their phone
    document.addEventListener('visibilitychange', resetExpiredCounters)
  })
}
