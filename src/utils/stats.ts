import type { FocusSession } from '../context'
import {
  CalendarDateTime,
  isSameDay,
  parseDateTime,
  getLocalTimeZone,
} from '@internationalized/date'

export type GetFocusByHourOpts = {
  toMinutes?: boolean
  precision?: number
}

export type HourFocusTime = {
  hour: number
  'Focus Time': number
}

export function dateFromEpoch(epoch: number): CalendarDateTime {
  return parseDateTime(new Date(epoch).toISOString().slice(0, -1))
}

export function getFocusByHour(
  entries: FocusSession[],
  day: CalendarDateTime,
  opts?: GetFocusByHourOpts,
): HourFocusTime[] {
  // Prepare result array with 24 hours initialized to 0 work time
  const result: HourFocusTime[] = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    'Focus Time': 0,
  }))
  entries.sort((a, b) =>
    dateFromEpoch(a.startedAt).compare(dateFromEpoch(b.startedAt)),
  )
  for (const entry of entries) {
    const { startedAt, timeWorked } = entry
    const startedAtDateTime = dateFromEpoch(startedAt)
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
    if (opts?.toMinutes) {
      return {
        ...val,
        'Focus Time': parseFloat(
          (val['Focus Time'] / 60).toFixed(opts.precision ?? 0),
        ),
      }
    }
    return val
  })
}

export function hasTomorrow(
  current: CalendarDateTime,
  entries: FocusSession[],
) {
  const tomorrow = current.add({ days: 1 })
  for (let entry of entries) {
    const entryDate = dateFromEpoch(entry.startedAt)

    if (
      entryDate.year === tomorrow.year &&
      entryDate.month === tomorrow.month &&
      entryDate.day === tomorrow.day
    ) {
      return true
    }
  }
  return false
}

export function hasYesterday(
  current: CalendarDateTime,
  entries: FocusSession[],
) {
  const yesterday = current.subtract({ days: 1 })
  for (let entry of entries) {
    const entryDate = dateFromEpoch(entry.startedAt)
    if (
      entryDate.year === yesterday.year &&
      entryDate.month === yesterday.month &&
      entryDate.day === yesterday.day
    ) {
      return true
    }
  }
  return false
}

export function getDateBounds(
  entries: FocusSession[],
): [CalendarDateTime, CalendarDateTime | undefined] {
  const dates = entries.map((entry) => {
    return dateFromEpoch(entry.startedAt)
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

export function isInRange(
  date: CalendarDateTime,
  range: [CalendarDateTime, CalendarDateTime],
) {
  const [start, end] = range
  if (start.compare(end) > 0) {
    throw new RangeError('start date must be less than or equal to end date!')
  }

  return date.compare(start) >= 0 && date.compare(end) <= 0
}

export function getKPIs(
  entries: FocusSession[],
  range: [CalendarDateTime, CalendarDateTime],
  opts?: DurationOpts,
) {
  let tot = 0
  let max = 0
  let n = 0
  for (const entry of entries) {
    const startedAt = dateFromEpoch(entry.startedAt)
    if (!isInRange(startedAt, range)) continue
    tot += entry.timeWorked
    max = Math.max(max, entry.timeWorked)
    n++
  }

  return {
    total: parseDuration(tot, opts),
    average: parseDuration(tot / n, opts),
    max: parseDuration(max, opts),
  }
}

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
  }
}

export function fakeSessionData(
  date: CalendarDateTime,
  workSessions: number,
): FocusSession[] {
  function randint(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  let res: FocusSession[] = []
  let start = 9
  for (let i = 0; i < workSessions; i++) {
    let startHour = randint(start, 18)
    let startDate = new CalendarDateTime(
      date.year,
      date.month,
      date.day,
      startHour,
    )
    for (let j = 0; j < 3; j++) {
      let timeWorked = randint(15, 55) * 60
      const session: FocusSession = {
        startedAt: startDate.toDate(getLocalTimeZone()).getTime(),
        timeWorked,
      }
      startDate = startDate.add({ seconds: timeWorked + timeWorked / 5 })
      res.push(session)
    }
    start = startDate.hour + 1
  }

  return res
}
