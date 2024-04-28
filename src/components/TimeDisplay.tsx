import React from 'react'
import {
  Text,
  HStack,
  TextProps,
  VStack,
  StackProps,
  useColorModeValue,
} from '@chakra-ui/react'
import { seconds2hms, zeroPad } from '../utils/time'

export type TimeDisplayProps = StackProps & {
  elapsed: number
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ elapsed, ...rest }) => {
  const [hours, minutes, seconds] = seconds2hms(elapsed)
  const color = useColorModeValue('brandPurple.700', 'brandPurple.200')
  const numberStyles: TextProps = {
    fontSize: '7xl',
    fontWeight: 'bold',
    color,
    lineHeight: '0.7',
    fontFamily: 'mono',
  }

  const textStyles: TextProps = {
    fontSize: 'xs',
    fontWeight: 'bold',
    lineHeight: '0.7',
  }

  return (
    <HStack align='start' spacing={5} {...rest}>
      <VStack>
        <Text {...numberStyles}>{zeroPad(hours)}</Text>
        <Text {...textStyles}>hours</Text>
      </VStack>
      {/* <Text fontSize="7xl" lineHeight="0.7" >:</Text> */}
      <VStack>
        <Text {...numberStyles}>{zeroPad(minutes)}</Text>
        <Text {...textStyles}>minutes</Text>
      </VStack>
      {/* <Text fontSize="7xl" lineHeight="0.7" >:</Text> */}
      <VStack>
        <Text {...numberStyles}>{zeroPad(seconds)}</Text>
        <Text {...textStyles}>seconds</Text>
      </VStack>
    </HStack>
  )
}

export default TimeDisplay
