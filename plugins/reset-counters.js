import { isCounterExpired } from '../utils/expiry-date'

export default ({ store }) => {
  /* eslint-disable no-console */
  const resetExpiredCounters = () => {
    const idsToExpire = store.getters['counters/getAllCounters']
      .filter(isCounterExpired)
      .map(c => c.id)
    console.log(idsToExpire)
    // const dateNow = DateTime.fromObject({ hour: 0 })
    // const dateCheck = DateTime.fromObject({ hour: 0, day: 30 })
    // console.log(`Now: ${dateNow.toISO()}`)
    // console.log(`Last reset: ${dateCheck.toISO()}`)
    // console.log(`Difference: ${dateNow.diff(dateCheck).as('days')}`)
  }

  window.onNuxtReady(() => {
    document.addEventListener('visibilitychange', resetExpiredCounters)
    store._vm.$root.$on('storageReady', () =>
      setTimeout(resetExpiredCounters, 5)
    )
  })
}
