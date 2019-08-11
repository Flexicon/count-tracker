import { DateTime } from 'luxon'

import { isCounterExpired, isDatePastResetPeriod } from './expiry-date'

describe('isCounterExpired', () => {
  test('return false for non automatic counter', () => {
    const counter = {
      automatic: false
    }

    expect(isCounterExpired(counter)).toBeFalsy()
  })

  test('return true for counter with no previous reset', () => {
    const counter = {
      automatic: true,
      lastReset: null
    }

    expect(isCounterExpired(counter)).toBeTruthy()
  })

  test('return true for expired day period counter', () => {
    const counter = {
      automatic: true,
      lastReset: dateNowMidnight()
        .minus({ day: 1 })
        .toISO(),
      resetPeriod: 'day'
    }

    expect(isCounterExpired(counter)).toBeTruthy()
  })

  test('return false for non-expired day period counter', () => {
    const counter = {
      automatic: true,
      lastReset: dateNowMidnight().toISO(),
      resetPeriod: 'day'
    }

    expect(isCounterExpired(counter)).toBeFalsy()
  })
})

describe('isDatePastResetPeriod', () => {
  test('check all periods for current date', () => {
    const currentDateStr = dateNowMidnight().toISO()

    expect(isDatePastResetPeriod(currentDateStr, 'day')).toBeFalsy()
    expect(isDatePastResetPeriod(currentDateStr, 'week')).toBeFalsy()
    expect(isDatePastResetPeriod(currentDateStr, 'month')).toBeFalsy()
  })

  test('check all periods for future date', () => {
    const futureDateStr = dateNowMidnight()
      .plus({ day: 1 })
      .toISO()

    expect(isDatePastResetPeriod(futureDateStr, 'day')).toBeFalsy()
    expect(isDatePastResetPeriod(futureDateStr, 'week')).toBeFalsy()
    expect(isDatePastResetPeriod(futureDateStr, 'month')).toBeFalsy()
  })

  // DAY PERIOD
  describe('check day period:', () => {
    test('yesterday', () => {
      const yesterday = dateNowMidnight().minus({ day: 1 })
      expect(isDatePastResetPeriod(yesterday.toISO(), 'day')).toBeTruthy()
    })

    test('week ago', () => {
      const weekAgo = dateNowMidnight().minus({ day: 7 })
      expect(isDatePastResetPeriod(weekAgo.toISO(), 'day')).toBeTruthy()
    })

    test('over a month ago', () => {
      const monthAgo = dateNowMidnight().minus({ day: 32 })
      expect(isDatePastResetPeriod(monthAgo.toISO(), 'day')).toBeTruthy()
    })
  })

  // WEEK PERIOD
  describe('check week period:', () => {
    test('week ago', () => {
      const weekAgo = dateNowMidnight().minus({ day: 7 })
      expect(isDatePastResetPeriod(weekAgo.toISO(), 'week')).toBeTruthy()
    })

    test('previous week', () => {
      const currentDate = dateNowMidnight()
      const prevWeek = currentDate.minus({ day: currentDate.weekday })
      expect(isDatePastResetPeriod(prevWeek.toISO(), 'week')).toBeTruthy()
    })

    test('current week', () => {
      const currentDate = dateNowMidnight()
      const weekday = currentDate.weekday
      const currentWeek =
        weekday > 1
          ? currentDate.minus({ day: 1 })
          : currentDate.plus({ day: 1 })

      expect(isDatePastResetPeriod(currentWeek.toISO(), 'week')).toBeFalsy()
    })
  })

  // MONTH PERIOD
  describe('check month period:', () => {
    test('over a month ago', () => {
      const monthAgo = dateNowMidnight().minus({ day: 32 })
      expect(isDatePastResetPeriod(monthAgo.toISO(), 'month')).toBeTruthy()
    })

    test('previous month', () => {
      const currentDate = dateNowMidnight()
      const prevMonth = currentDate.minus({ day: currentDate.day })
      expect(isDatePastResetPeriod(prevMonth.toISO(), 'month')).toBeTruthy()
    })

    test('current month', () => {
      const currentDate = dateNowMidnight()
      const dayOfMonth = currentDate.day
      const currentMonth =
        dayOfMonth > 1
          ? currentDate.minus({ day: 1 })
          : currentDate.plus({ day: 1 })

      expect(isDatePastResetPeriod(currentMonth.toISO(), 'month')).toBeFalsy()
    })
  })
})

/**
 * Returns a DateTime object (Luxon) of the current date at midnight
 */
function dateNowMidnight() {
  return DateTime.fromObject({ hour: 0 })
}
