import {
  toCalendarDateTime,
  today,
  now,
  getLocalTimeZone,
  CalendarDateTime,
} from '@internationalized/date'

export const seconds2hms = (seconds: number): [number, number, number] => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return [hours, minutes, secs]
}

export const zeroPad = (value: number): string =>
  `${value <= 9 ? '0' : ''}${value}`

export const hms = (seconds: number, removeHour?: boolean) => {
  const vals = seconds2hms(seconds)
  if (!removeHour) return vals.map((val) => zeroPad(val)).join(':')
  return vals
    .slice(1)
    .map((val) => zeroPad(val))
    .join(':')
}

export const twelveHour = (hour: number) => {
  const period = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12} ${period}`
}

export const todayNow = () => {
  return toCalendarDateTime(today(getLocalTimeZone()), now(getLocalTimeZone()))
}

export const startOfDay = (date: CalendarDateTime): CalendarDateTime => {
  return new CalendarDateTime(date.year, date.month, date.day, 0, 0, 0)
}

export const endOfDay = (date: CalendarDateTime): CalendarDateTime => {
  return new CalendarDateTime(date.year, date.month, date.day, 23, 59, 59)
}

export const toLocaleDateString = (
  date: CalendarDateTime,
  locales?: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions,
) => {
  return date.toDate(getLocalTimeZone()).toLocaleDateString(locales, options)
}
