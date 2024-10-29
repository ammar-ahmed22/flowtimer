import React, { useMemo, useContext } from 'react'
import { seconds2hms, zeroPad } from '../../utils/time'
import Context from '../../context'
import TimeDisplay from '../TimeDisplay'
import Controls from './Controls'
import { BellSnoozeIcon } from '@heroicons/react/24/solid'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

const WorkDisplay: React.FC = () => {
  const { toggleMode, minBreakTime, setTimeWorked, timer, tasks } =
    useContext(Context)
  const { elapsed, isStarted, toggleStart, reset } = timer
  const breakTime = useMemo(() => Math.floor(elapsed / 5), [elapsed])
  const hms = seconds2hms(breakTime)

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
          reset(() => (document.title = 'Flowtimer'))
          toggleMode()
        }}
        switchIcon={<BellSnoozeIcon className='size-5' />}
        switchDisabled={breakTime < minBreakTime * 60}
        onReset={() => reset(() => (document.title = 'Work - 00:00'))}
      />
    </div>
  )
}

export default WorkDisplay
