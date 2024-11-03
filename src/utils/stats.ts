import type { FocusSession } from '../context'
import { CalendarDateTime, isSameDay } from '@internationalized/date'
import {
  isInRange,
  epoch2datetime,
  datetime2epoch,
  startOfDay,
  endOfDay,
} from './time'
import { randint } from './math'

export type GetFocusByHourOpts = {
  toMinutes?: boolean
  precision?: number
}

export type HourFocusTime = {
  hour: number
  'Focus Time': number
}

/**
 * Gets time spent in focus for every hour of the day
 * @param entries FocusSession data
 * @param day the day to retrieve hourly data for (`CalendarDateTime`)
 * @param opts Options for the output value and precision
 * @returns
 */
export function getFocusByHour(
  entries: FocusSession[],
  day: CalendarDateTime,
  opts?: DurationOpts,
): HourFocusTime[] {
  // Prepare result array with 24 hours initialized to 0 work time
  const result: HourFocusTime[] = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    'Focus Time': 0,
  }))
  entries.sort((a, b) =>
    epoch2datetime(a.startedAt).compare(epoch2datetime(b.startedAt)),
  )
  for (const entry of entries) {
    const { startedAt, timeWorked } = entry
    const startedAtDateTime = epoch2datetime(startedAt)
    // Skip entries that are outside the specified day
    if (!isSameDay(startedAtDateTime, day)) continue

    // Get the starting hour and the remaining time to work
    let currentHour = startedAtDateTime.hour
    let remainingTime = timeWorked

    // Calculate the seconds remaining in the first hour slice
    let secondsInFirstHour = Math.min(
      3600 - Math.floor((startedAt / 1000) % 3600), // Remaining seconds in the current hour
      remainingTime,
    )

    // Loop over hours until all timeWorked is distributed
    while (remainingTime > 0 && currentHour < 24) {
      result[currentHour]['Focus Time'] += secondsInFirstHour

      remainingTime -= secondsInFirstHour // Deduct from remaining time
      currentHour += 1 // Move to the next hour
      secondsInFirstHour = Math.min(remainingTime, 3600) // Reset for the next hour slice
    }
  }

  return result.map((val) => {
    return {
      ...val,
      'Focus Time': parseDuration(val['Focus Time'], opts),
    }
  })
}

/**
 * Gets the date bounds of the sessions data
 * @param entries FocusSession data
 * @returns [min, max] range of dates for the session data
 */
export function getDateBounds(
  entries: FocusSession[],
): [CalendarDateTime, CalendarDateTime | undefined] {
  const dates = entries.map((entry) => {
    return epoch2datetime(entry.startedAt)
  })
  dates.sort((a, b) => a.compare(b))
  return [dates[0], dates.at(-1)]
}

export type DurationOpts = {
  seconds?: boolean
  minutes?: boolean
  hours?: boolean
  precision?: number
}

/**
 * Helper function to return a seconds value in minutes or hours with given precision
 * @param seconds the seconds value
 * @param opts Options for the output value and precision
 * @returns
 */
function parseDuration(seconds: number, opts?: DurationOpts): number {
  if (!opts) return seconds
  if (
    (opts.seconds && (opts.minutes || opts.hours)) ||
    (opts.minutes && (opts.seconds || opts.hours)) ||
    (opts.hours && (opts.seconds || opts.minutes))
  ) {
    throw new Error('can only provide 1 option for DurationOpts!')
  }

  let precision = opts.precision ?? 4
  if (opts.seconds) return parseFloat(seconds.toFixed(precision))
  if (opts.minutes) return parseFloat((seconds / 60).toFixed(precision))
  if (opts.hours) return parseFloat(((seconds / 60) * 60).toFixed(precision))
  return seconds
}

/**
 * Calculates KPIs (key performance indicators) for the FocusSession data
 * @param entries FocusSession data
 * @param range the date range to calculate for
 * @param opts Options for the output value and precision
 * @returns total time worked, average time worked, maximum time worked, minimum time worked
 */
export function getKPIs(
  entries: FocusSession[],
  range: [CalendarDateTime, CalendarDateTime],
  opts?: DurationOpts,
) {
  let tot = 0
  let max = 0
  let min = Number.POSITIVE_INFINITY
  let n = 0
  for (const entry of entries) {
    const startedAt = epoch2datetime(entry.startedAt)
    if (!isInRange(startedAt, range)) continue
    tot += entry.timeWorked
    max = Math.max(max, entry.timeWorked)
    min = Math.min(min, entry.timeWorked)
    n++
  }

  return {
    total: parseDuration(tot, opts),
    average: parseDuration(tot / n, opts),
    max: parseDuration(max, opts),
    min: parseDuration(min, opts),
  }
}

/**
 * Calculates the percent change in KPIs
 * @param entries FocusSession data
 * @param range the date range of interest
 * @param compareRange the date range to compare against
 * @param opts Options for the output value and precision
 * @returns change in total time worked, change in average time worked, change in maximum time worked, change in minimum time worked
 */
export function getKPIChange(
  entries: FocusSession[],
  range: [CalendarDateTime, CalendarDateTime],
  compareRange: [CalendarDateTime, CalendarDateTime],
  opts?: DurationOpts,
) {
  const kpis = getKPIs(entries, range, opts)
  const compareKPIs = getKPIs(entries, compareRange, opts)
  return {
    total: Math.round(
      ((kpis.total - compareKPIs.total) / compareKPIs.total) * 100,
    ),
    average: Math.round(
      ((kpis.average - compareKPIs.average) / compareKPIs.average) * 100,
    ),
    max: Math.round(((kpis.max - compareKPIs.max) / compareKPIs.max) * 100),
    min: Math.round(((kpis.min - compareKPIs.min) / compareKPIs.min) * 100),
  }
}

/**
 * Calculates the bounds of time worked per day for a provided array of dates
 * @param entries FocusSession data
 * @param dates Array of dates (each value should be a different day)
 * @returns [min, max]: minimum time worked per day for the dates, maximum time worked per day for the dates
 */
export function dailyFocusTimeBounds(
  entries: FocusSession[],
  dates: CalendarDateTime[],
) {
  let workTimePerDay = dates.map((date) => {
    return getKPIs(entries, [startOfDay(date), endOfDay(date)], {
      minutes: true,
      precision: 3,
    }).total
  })

  let min = Number.POSITIVE_INFINITY
  let max = 0
  for (let time of workTimePerDay) {
    min = Math.min(min, time)
    max = Math.max(max, time)
  }
  return [min, max]
}

/**
 * Generates fake session data for a given range
 * @param start start of the range
 * @param end end of the range
 * @param maxSessions maximum number of sessions per day
 * @returns
 */
export function fakeSessionData(
  start: CalendarDateTime,
  end: CalendarDateTime,
  maxSessions: number,
): FocusSession[] {
  if (start.compare(end) > 0) {
    throw new RangeError('start date must be less than or equal to end date!')
  }
  const sessions: FocusSession[] = []
  const oneDay = 24 * 60 * 60 * 1000 // Milliseconds in one day

  // Generate sessions for each day in the specified date range
  for (
    let currentDate = datetime2epoch(start);
    currentDate <= datetime2epoch(end);
    currentDate += oneDay
  ) {
    const numSessions = randint(0, maxSessions) // Random number of sessions (0 to maxSessions)
    let lastEndTime = 0 // Track the end time of the last session to prevent overlaps

    for (let i = 0; i < numSessions; i++) {
      // Generate a random start time for the session within the day
      const startTime = randint(0, oneDay - 5 * 60 * 1000) + currentDate // Ensure at least 5 min available for session
      const sessionDuration = randint(5 * 60, 120 * 60) // Random duration between 5 minutes (300 seconds) and 2 hours (7200 seconds)

      // Calculate the end time of the session
      const endTime = startTime + sessionDuration * 1000

      // Check for overlap with previous sessions
      if (startTime >= lastEndTime) {
        sessions.push({ startedAt: startTime, timeWorked: sessionDuration })
        lastEndTime = endTime // Update the end time for the next session check
      }
    }
  }

  return sessions // Return the generated sessions
}
