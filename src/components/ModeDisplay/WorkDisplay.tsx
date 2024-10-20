import React, { useMemo, useContext } from 'react'
import { Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { seconds2hms, zeroPad } from '../../utils/time'
import Context from '../../context'
import TimeDisplay from '../TimeDisplay'
import Controls from './Controls'
import { FaMugHot } from 'react-icons/fa6'
import Tasks from '../Tasks'


const WorkDisplay: React.FC = () => {
  const { toggleMode, minBreakTime, setTimeWorked, timer } = useContext(Context)
  const { elapsed, isStarted, toggleStart, reset } = timer
  const breakTime = useMemo(() => Math.floor(elapsed / 5), [elapsed])
  const hms = seconds2hms(breakTime)
  const brandColor = useColorModeValue('brandPurple.700', 'brandPurple.200')


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
          color={brandColor}
          fontWeight='bold'
          fontFamily='mono'
          fontSize='xl'
        >
          {zeroPad(hms[1])}:{zeroPad(hms[2])}
        </Text>
      </Text>
      <Controls
        isStarted={isStarted}
        onToggleStart={toggleStart}
        onReset={() => reset(() => document.title = "Work - 00:00")}
        onSwitchMode={() => {
          if (isStarted) toggleStart()
          setTimeWorked(elapsed)
          reset(() => document.title = "Flowtimer");
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
