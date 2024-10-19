import React, { useContext, useEffect } from 'react'
import { VStack, Text, useColorModeValue } from '@chakra-ui/react'
import TimeDisplay from '../TimeDisplay'
import ProgressCircle from '../ProgressCircle'
import Controls from './Controls'
import Context from '../../context'
import Tasks from '../Tasks'
import { FaLightbulb } from 'react-icons/fa6'
import { useSound } from '../../hooks/sound'
import { seconds2hms, zeroPad } from '../../utils/time'
import alarmSpriteMap from '../../assets/sounds/alarms'
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
  const brandColor = useColorModeValue('brandPurple.700', 'brandPurple.200')

  useEffect(() => {
    if (breakTime - elapsed === 0 && isStarted) {
      toggleStart()
      if (alarmSound) play(alarmSound)
    }
  }, [elapsed, breakTime, isStarted, toggleStart, alarmSound, play])

  const [h, m, s] = seconds2hms(breakTime - elapsed)

  return (
    <VStack
      textAlign='center'
      my='15vh'
      align='center'
      justify='center'
      spacing={10}
      maxH='100vh'
    >
      <Tasks />

      <ProgressCircle
        size='xs'
        lines={60}
        progress={(breakTime - elapsed) / breakTime}
        mb='16'
        completeColor={brandColor}
      >
        <VStack w='100%' h='100%' justify='center' align='center' spacing={10}>
          <Text>You have</Text>
          <TimeDisplay elapsed={breakTime - elapsed} />
          <Text>Left in your break</Text>
        </VStack>
      </ProgressCircle>

      <Controls
        isStarted={isStarted}
        onToggleStart={toggleStart}
        onReset={() =>
          reset(
            () =>
              (document.title = `Break - ${h > 0 ? zeroPad(h) + ':' : ''}${zeroPad(m)}:${zeroPad(s)}`),
          )
        }
        onSwitchMode={() => {
          if (isStarted) toggleStart()
          setTimeWorked(0)
          reset(() => (document.title = 'Flowtimer'))
          toggleMode()
        }}
        switchMode='Finish'
        switchIcon={<FaLightbulb />}
      />
    </VStack>
  )
}

export default BreakDisplay
