import React, { useContext, useEffect, useRef } from 'react'
import TimeDisplay from '../TimeDisplay'
import ProgressCircle from '../ProgressCircle'
import Controls from './Controls'
import Context from '../../context'
import { useSound } from '../../hooks/sound'
import { seconds2hms, zeroPad } from '../../utils/time'
import alarmSpriteMap from '../../assets/sounds/alarms'
import { BoltIcon } from '@heroicons/react/24/solid'
const alarmSprite = require('../../assets/sounds/alarms-sprite.mp3')

const BreakDisplay: React.FC = () => {
  const {
    timeWorked,
    breakRatio,
    toggleMode,
    setTimeWorked,
    timer,
    volume,
    alarmSound,
  } = useContext(Context)
  const { elapsed, isStarted, toggleStart, reset } = timer
  const [play] = useSound(alarmSprite, {
    sprite: alarmSpriteMap,
    volume,
  })

  const breakTime = Math.floor(timeWorked * breakRatio)
  const innerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (breakTime - elapsed === 0 && isStarted) {
      toggleStart()
      if (alarmSound) play(alarmSound)
    }
  }, [elapsed, breakTime, isStarted, toggleStart, alarmSound, play])

  const [h, m, s] = seconds2hms(breakTime - elapsed)

  return (
    <div className='h-full flex flex-col text-center justify-center align-center space-y-5'>
      <ProgressCircle
        percentage={((breakTime - elapsed) / breakTime) * 100}
        color='primary'
        contentRef={innerRef}
      >
        <div
          ref={innerRef}
          className='flex flex-col text-center justify-center align-center p-4'
        >
          <p className='text-foreground'>You have</p>
          <TimeDisplay elapsed={breakTime - elapsed} />
          <p className='text-foreground'>Left in your break.</p>
        </div>
      </ProgressCircle>
      <Controls
        isStarted={isStarted}
        onToggleStart={toggleStart}
        onReset={() => {
          reset(
            () =>
              (document.title = `Break - ${h > 0 ? zeroPad(h) + ':' : ''}${zeroPad(m)}:${zeroPad(s)}`),
          )
        }}
        onSwitchMode={() => {
          if (isStarted) toggleStart()
          setTimeWorked(0)
          reset(() => (document.title = 'Flowtimer'))
          toggleMode()
        }}
        switchIcon={<BoltIcon className='size-5' />}
        className='pb-5'
      />
    </div>
    // <VStack
    //   textAlign='center'
    //   my='15vh'
    //   align='center'
    //   justify='center'
    //   spacing={10}
    //   maxH='100vh'
    // >
    //   <Tasks />

    //   <ProgressCircle
    //     size='xs'
    //     lines={60}
    //     progress={(breakTime - elapsed) / breakTime}
    //     mb='16'
    //     completeColor={brandColor}
    //   >
    //     <VStack w='100%' h='100%' justify='center' align='center' spacing={10}>
    //       <Text>You have</Text>
    //       <TimeDisplay elapsed={breakTime - elapsed} />
    //       <Text>Left in your break</Text>
    //     </VStack>
    //   </ProgressCircle>

    //   <Controls
    //     isStarted={isStarted}
    //     onToggleStart={toggleStart}
    //     onReset={() =>
    //       reset(
    //         () =>
    //           (document.title = `Break - ${h > 0 ? zeroPad(h) + ':' : ''}${zeroPad(m)}:${zeroPad(s)}`),
    //       )
    //     }
    //     onSwitchMode={() => {
    //       if (isStarted) toggleStart()
    //       setTimeWorked(0)
    //       reset(() => (document.title = 'Flowtimer'))
    //       toggleMode()
    //     }}
    //     switchMode='Finish'
    //     switchIcon={<FaLightbulb />}
    //   />
    // </VStack>
  )
}

export default BreakDisplay
