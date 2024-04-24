import React, { createContext, useState } from 'react'
import { useTimer } from '../hooks/timer'
import type { UseTimerResponse } from '../hooks/timer'
import type { AlarmName } from '../assets/sounds/alarms'

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export type Mode = 'work' | 'break'

export type Task = {
  id: string
  desc: string
  complete: boolean
}

export type ContextType = {
  mode: Mode
  toggleMode: () => void
  setMode: SetState<Mode>
  timeWorked: number
  setTimeWorked: SetState<number>
  breakRatio: number
  setBreakRatio: SetState<number>
  minBreakTime: number
  setMinBreakTime: SetState<number>
  tasks: Task[]
  toggleTaskCompletion: (id: string) => void
  updateTask: (id: string, updateFn: (prev: Task) => Task) => void
  addTask: (task: Task) => void
  deleteTask: (id: string) => void
  tickSound: boolean
  setTickSound: SetState<boolean>
  timer: UseTimerResponse
  alarmSound?: AlarmName
  setAlarmSound: SetState<AlarmName | undefined>
  volume: number
  setVolume: SetState<number>
}

const Context = createContext<ContextType>({
  mode: 'work',
  toggleMode: () => {},
  setMode: () => {},
  timeWorked: 0,
  setTimeWorked: () => {},
  breakRatio: 1 / 5,
  setBreakRatio: () => {},
  minBreakTime: 5,
  setMinBreakTime: () => {},
  tasks: [],
  toggleTaskCompletion: (id: string) => {},
  updateTask: (id: string, updateFn: (prev: Task) => Task) => {},
  addTask: (task: Task) => {},
  deleteTask: (id: string) => {},
  tickSound: false,
  setTickSound: () => {},
  timer: {
    elapsed: 0,
    isStarted: false,
    toggleStart: () => {},
    reset: () => {},
  },
  alarmSound: undefined,
  setAlarmSound: () => {},
  volume: 0.5,
  setVolume: () => {},
})

type ContextProviderProps = {
  children: React.ReactNode
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<Mode>('work')
  const [timeWorked, setTimeWorked] = useState(0)
  const [breakRatio, setBreakRatio] = useState(1 / 5)
  const [minBreakTime, setMinBreakTime] = useState(1)
  const [tasks, setTasks] = useState<Task[]>([])
  const [tickSound, setTickSound] = useState(false)
  const [alarmSound, setAlarmSound] = useState<AlarmName | undefined>(undefined)
  const [volume, setVolume] = useState(0.5)

  const timer = useTimer({ tickSound })

  React.useEffect(() => {
    console.log({ breakRatio, minBreakTime })
  }, [breakRatio, minBreakTime])

  const context: ContextType = {
    mode,
    setMode,
    toggleMode: () => setMode((prev) => (prev === 'work' ? 'break' : 'work')),
    timeWorked,
    setTimeWorked,
    breakRatio,
    setBreakRatio,
    minBreakTime,
    setMinBreakTime,
    tasks,
    toggleTaskCompletion: (id: string) => {
      setTasks((prev) => {
        const copy = [...prev]
        for (let i = 0; i < prev.length; i++) {
          if (copy[i].id === id) {
            copy[i].complete = !prev[i].complete
            break
          }
        }
        return copy
      })
    },
    updateTask: (id: string, updateFn: (prev: Task) => Task) => {
      setTasks((prev) => {
        const copy = [...prev]
        for (let i = 0; i < prev.length; i++) {
          if (copy[i].id === id) {
            copy[i] = updateFn(prev[i])
            break
          }
        }
        return copy
      })
    },
    addTask: (task: Task) => {
      setTasks((prev) => {
        const copy = [...prev, task]
        return copy
      })
    },
    deleteTask: (id: string) => {
      setTasks((prev) => {
        const copy: Task[] = []
        for (let task of prev) {
          if (task.id === id) continue
          copy.push(task)
        }
        return copy
      })
    },
    tickSound,
    setTickSound,
    timer,
    alarmSound,
    setAlarmSound,
    volume,
    setVolume,
  }

  return <Context.Provider value={context}>{children}</Context.Provider>
}

export default Context
