import type { SpriteMap } from 'use-sound/dist/types'

export const ALARM_NAMES = [
  'Bell',
  'Bird',
  'Digital',
  'Kitchen',
  'Wood',
] as const

export type AlarmName = (typeof ALARM_NAMES)[number]

export type AlarmSpriteMap = {
  [K in AlarmName]: [number, number]
}

const spriteMap: AlarmSpriteMap = {
  Bell: [0, 6000],
  Bird: [7500, 4900],
  Digital: [12500, 1500],
  Kitchen: [14500, 3800],
  Wood: [18800, 1200],
}

export default spriteMap
