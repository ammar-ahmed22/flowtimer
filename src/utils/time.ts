export const seconds2hms = (seconds: number): [number, number, number] => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return [hours, minutes, secs]
}

export const zeroPad = (value: number): string =>
  `${value <= 9 ? '0' : ''}${value}`
