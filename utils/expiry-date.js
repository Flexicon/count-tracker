import { DateTime } from 'luxon'

export function isCounterExpired(counter) {
  if (!counter.automatic) return false
  if (!counter.lastReset) return true

  return isExpiredForResetPeriod(counter.lastReset, counter.resetPeriod)
}

export function isExpiredForResetPeriod(lastReset, resetPeriod) {
  // TODO:: Write unit tests to cover these methods
  const dateNow = DateTime.fromObject({ hour: 0 })
  const dateCheck = DateTime.fromISO(lastReset)

  switch (resetPeriod) {
    case 'day':
      const days = dateNow.diff(dateCheck).as('days')
      return days >= 1
    default:
      return false
  }
}
