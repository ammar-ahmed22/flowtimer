import React, { useMemo, useContext, useEffect, useState } from 'react'
import { seconds2hms, zeroPad } from '../../utils/time'
import Context from '../../context'
import TimeDisplay from '../TimeDisplay'
import Controls from './Controls'
import { BellSnoozeIcon } from '@heroicons/react/24/solid'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

const WorkDisplay: React.FC = () => {
  const [startedAt, setStartedAt] = useState<Date | undefined>(undefined)
  const { toggleMode, minBreakTime, setTimeWorked, timer, tasks, addSession } =
    useContext(Context)
  const { elapsed, isStarted, toggleStart, reset } = timer
  const breakTime = useMemo(() => Math.floor(elapsed / 5), [elapsed])
  const hms = seconds2hms(breakTime)

  useEffect(() => {
    if (isStarted && elapsed === 0) {
      setStartedAt(new Date())
    }
  }, [elapsed, isStarted])

  useEffect(() => {
    return () => {
      if (startedAt) {
        addSession(startedAt, elapsed)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='h-full flex flex-col text-center justify-center align-center space-y-5'>
      <div className='w-full flex justify-center'>
        <Autocomplete
          label='Select a task to focus on'
          className='max-w-xs'
          variant='bordered'
          labelPlacement='outside'
        >
          {tasks.map((task) => {
            return (
              <AutocompleteItem key={task.id} value={task.id}>
                {task.desc}
              </AutocompleteItem>
            )
          })}
        </Autocomplete>
      </div>
      <p className='text-foreground'>You have been working for</p>
      <TimeDisplay elapsed={elapsed} />
      <p className='text-foreground'>
        Your current break time is:{' '}
        <span className='text-primary font-mono'>
          {zeroPad(hms[1])}:{zeroPad(hms[2])}
        </span>
      </p>
      <Controls
        isStarted={isStarted}
        onToggleStart={toggleStart}
        onSwitchMode={() => {
          if (isStarted) toggleStart()
          setTimeWorked(elapsed)
          // save the metric
          if (startedAt) {
            addSession(startedAt, elapsed)
          }
          reset(() => (document.title = 'Flowtimer'))
          toggleMode()
        }}
        switchIcon={<BellSnoozeIcon className='size-5' />}
        switchDisabled={breakTime < minBreakTime * 60}
        onReset={() => {
          if (startedAt) {
            addSession(startedAt, elapsed)
          }
          reset(() => (document.title = 'Work - 00:00'))
        }}
      />
    </div>
  )
}

export default WorkDisplay
