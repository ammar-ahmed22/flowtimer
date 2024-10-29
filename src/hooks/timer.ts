import { useState, useEffect, useContext } from 'react'
import Context from '../context'
import { useSound } from './sound'
import timerWorker from '../workers/timer'
const tick = require('../assets/sounds/tick.mp3')

export type UseTimerResponse = {
  elapsed: number
  isStarted: boolean
  toggleStart: () => void
  reset: (cb?: () => void) => void
}

export type UseTimerParams = {
  tickSound?: boolean
  tickCallback?: (elapsed: number) => void
}

export const useWorkerTimer = (params?: UseTimerParams): UseTimerResponse => {
  const { volume } = useContext(Context)
  const [elapsed, setElapsed] = useState(0)
  const [started, setStarted] = useState(false)
  const [reset, setReset] = useState(false)

  const [play, stop] = useSound(tick, { volume, sprite: { tick: [0, 1000] } })

  useEffect(() => {
    let worker: Worker
    if (window.Worker) {
      worker = new Worker(timerWorker)
      worker.onmessage = (event: MessageEvent<number>) => {
        if (params?.tickSound) {
          play('tick')
        }
        if (params?.tickCallback) params.tickCallback(event.data)
        setElapsed(event.data)
      }
      if (started) {
        worker.postMessage({ control: 'start', elapsed })
      } else {
        stop()
        worker.postMessage({ control: 'stop', elapsed })
      }

      if (reset) {
        worker.postMessage({ control: 'reset', elapsed })
        setReset(false)
      }
    }

    return () => {
      worker.terminate()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, reset])

  return {
    elapsed,
    isStarted: started,
    toggleStart: () => setStarted((prev) => !prev),
    reset: (callback?: () => void) => {
      setStarted(false)
      setReset(true)
      setElapsed(0)
      if (callback) callback()
    },
  }
}
