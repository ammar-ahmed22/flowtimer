import { useState, useEffect, useContext } from 'react'
import Context from '../context'
import { useSound } from './sound'
const tick = require('../assets/sounds/tick.mp3')

export type UseTimerResponse = {
  elapsed: number
  isStarted: boolean
  toggleStart: () => void
  reset: () => void
}

export type UseTimerParams = {
  tickSound?: boolean
}

export const useTimer = (params?: UseTimerParams): UseTimerResponse => {
  const { volume } = useContext(Context)
  const [elapsed, setElapsed] = useState(0)
  const [started, setStarted] = useState(false)
  const [play, stop] = useSound(tick, { volume, sprite: { tick: [0, 1000] } })

  useEffect(() => {
    let IID: NodeJS.Timeout | undefined
    if (started) {
      IID = setInterval(() => {
        setElapsed((prev) => prev + 1)
        if (params?.tickSound) play('tick')
      }, 1000)
    } else {
      stop()
      clearInterval(IID)
    }

    return () => clearInterval(IID)
  }, [started, play, params?.tickSound, stop])

  return {
    elapsed,
    isStarted: started,
    toggleStart: () => {
      setStarted((prev) => !prev)
    },
    reset: () => {
      setStarted(false)
      setElapsed(0)
    },
  }
}
