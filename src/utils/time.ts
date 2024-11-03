import {
  toCalendarDateTime,
  today,
  now,
  getLocalTimeZone,
  CalendarDateTime,
  parseDateTime
} from '@internationalized/date'

/**
 * Converts a seconds value to hours:minutes:seconds
 * @param seconds seconds value
 * @returns [hours, minutes, seconds]
 */
export const seconds2hms = (seconds: number): [number, number, number] => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return [hours, minutes, secs]
}

/**
 * Pads a value with zero if it's less than 10
 * @param value 
 * @returns 
 */
export const zeroPad = (value: number): string =>
  `${value <= 9 ? '0' : ''}${value}`

/**
 * Generates an hms string 
 * @param seconds seconds value
 * @param removeHour If true, removes the hour value: mm:ss
 * @returns string of the form hh:mm:ss
 */
export const hms = (seconds: number, removeHour?: boolean) => {
  const vals = seconds2hms(seconds)
  if (!removeHour) return vals.map((val) => zeroPad(val)).join(':')
  return vals
    .slice(1)
    .map((val) => zeroPad(val))
    .join(':')
}

/**
 * Provides a 12 hour format string given a 24hour integer value
 * @param hour hour integer in 24 hour format
 * @returns string of the form h AM|PM
 */
export const twelveHour = (hour: number) => {
  const period = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12} ${period}`
}

/**
 * Creates a CalendarDateTime at the exact time it is called
 * @returns 
 */
export const todayNow = () => {
  return toCalendarDateTime(today(getLocalTimeZone()), now(getLocalTimeZone()))
}

/**
 * Converts a CalendarDateTime to the start of the day (12:00 AM)
 * @param date CalendarDateTime
 * @returns 
 */
export const startOfDay = (date: CalendarDateTime): CalendarDateTime => {
  return new CalendarDateTime(date.year, date.month, date.day, 0, 0, 0)
}

/**
 * Converts a CalendarDateTime to the end of the day (11:59 PM)
 * @param date CalendarDateTime
 * @returns 
 */
export const endOfDay = (date: CalendarDateTime): CalendarDateTime => {
  return new CalendarDateTime(date.year, date.month, date.day, 23, 59, 59)
}

/**
 * Converts a CalendarDateTime to LocaleDateString as per built-in JavaScript functionality
 * @param date CalendarDateTime
 * @param locales 
 * @param options 
 * @returns 
 */
export const toLocaleDateString = (
  date: CalendarDateTime,
  locales?: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions,
) => {
  return date.toDate(getLocalTimeZone()).toLocaleDateString(locales, options)
}

/**
 * Checks if a date is within a given range
 * @param date CalendarDateTime
 * @param range [CalendarDateTime, CalendarDateTime]
 * @returns boolean
 */
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

/**
 * Converts an epoch timestamp in milliseconds to CalendarDateTime
 * @param epoch 
 * @returns 
 */
export function epoch2datetime(epoch: number): CalendarDateTime {
  return parseDateTime(new Date(epoch).toISOString().slice(0, -1))
}

/**
 * Converts a CalendarDateTime to epoch timestamp in milliseconds
 * @param date 
 * @returns 
 */
export function datetime2epoch(date: CalendarDateTime): number {
  return date.toDate(getLocalTimeZone()).getTime();
}