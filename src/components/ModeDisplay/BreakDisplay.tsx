import React, { useContext, useEffect } from 'react'
import { VStack, Text, Flex } from '@chakra-ui/react'
import TimeDisplay from '../TimeDisplay'
import ProgressCircle from '../ProgressCircle'
import Controls from './Controls'
import { useTimer } from '../../hooks/timer'
import Context from '../../context'
import Tasks from '../Tasks'
import { FaLightbulb } from 'react-icons/fa6'

const BreakDisplay: React.FC = () => {
  const { timeWorked, breakRatio, toggleMode, setTimeWorked, timer } =
    useContext(Context)
  const { elapsed, isStarted, toggleStart, reset } = timer

  const breakTime = Math.floor(timeWorked * breakRatio)

  useEffect(() => {
    if (breakTime - elapsed === 0 && isStarted) {
      toggleStart()
    }
  }, [elapsed, breakTime, isStarted, toggleStart])

  return (
    <VStack
      textAlign='center'
      mt='15vh'
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
        onReset={reset}
        onSwitchMode={() => {
          if (isStarted) toggleStart()
          setTimeWorked(0)
          reset()
          toggleMode()
        }}
        switchMode='Finish'
        switchIcon={<FaLightbulb />}
      />
    </VStack>
  )
}

export default BreakDisplay
