import { useState, useEffect, useContext, useRef } from 'react'
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

  const startTimeRef = useRef<number | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const updateElapsed = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const delta = Math.floor((timestamp - startTimeRef.current) / 1000);
    if (delta > 0) {
      setElapsed((prev) => prev + delta);
      startTimeRef.current = timestamp;

      if (params?.tickSound) {
        play("tick");
      }
    }

    animFrameIdRef.current = requestAnimationFrame(updateElapsed);
  }

  useEffect(() => {
    if (started) {
      startTimeRef.current = performance.now();
      animFrameIdRef.current = requestAnimationFrame(updateElapsed);
    } else {
      stop();
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    }

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      startTimeRef.current = null;
    },
  }
}
