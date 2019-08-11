import { DateTime } from 'luxon'

export function isCounterExpired(counter) {
  if (!counter.automatic) return false
  if (!counter.lastReset) return true

  return isDatePastResetPeriod(counter.lastReset, counter.resetPeriod)
}

export function isDatePastResetPeriod(lastResetDate, resetPeriod) {
  const dateNow = DateTime.fromObject({ hour: 0 })
  const dateCheck = DateTime.fromISO(lastResetDate)
  const dayDiff = dateNow.diff(dateCheck).as('days')

  // Immediately return false for future dates (negative diff)
  if (dayDiff < 0) return false

  switch (resetPeriod) {
    case 'day':
      return dayDiff >= 1
    case 'week':
      return dayDiff >= dateNow.weekday
    case 'month':
      return dayDiff >= dateNow.day
    default:
      return false
  }
}
