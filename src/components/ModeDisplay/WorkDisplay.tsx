import React, { useMemo, useContext } from 'react'
import { Text, VStack } from '@chakra-ui/react'
import { seconds2hms, zeroPad } from '../../utils/time'
import Context from '../../context'
import TimeDisplay from '../TimeDisplay'
import { useTimer } from '../../hooks/timer'
import Controls from './Controls'
import { FaMugHot } from 'react-icons/fa6'
import Tasks from '../Tasks'

const WorkDisplay: React.FC = () => {
  const { toggleMode, minBreakTime, setTimeWorked, timer } = useContext(Context)
  const { elapsed, isStarted, toggleStart, reset } = timer
  const breakTime = useMemo(() => Math.floor(elapsed / 5), [elapsed])
  const [_, mins, secs] = seconds2hms(breakTime)

  return (
    <VStack
      mt='15vh'
      textAlign='center'
      justify='center'
      align='center'
      spacing={10}
    >
      <Tasks />
      <Text>You have been working for</Text>
      <TimeDisplay elapsed={elapsed} />
      <Text mb='16'>
        Your current break time is:{' '}
        <Text
          as='span'
          color='brandPurple.700'
          fontWeight='bold'
          fontFamily='mono'
          fontSize='xl'
        >
          {zeroPad(mins)}:{zeroPad(secs)}
        </Text>
      </Text>
      <Controls
        isStarted={isStarted}
        onToggleStart={toggleStart}
        onReset={reset}
        onSwitchMode={() => {
          if (isStarted) toggleStart()
          setTimeWorked(elapsed)
          reset()
          toggleMode()
        }}
        switchMode='Break'
        switchIcon={<FaMugHot />}
        switchDisabled={breakTime < minBreakTime * 60}
      />
    </VStack>
  )
}

export default WorkDisplay
