import React from 'react'
import {
  VStack,
  Text,
  Icon,
  As,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'

type SectionProps = {
  children: React.ReactNode
  heading: React.ReactNode
  icon?: As
}

const Section: React.FC<SectionProps> = ({ children, heading, icon }) => {
  const textColor = useColorModeValue('beige.600', 'brandGray.300')
  const borderColor = useColorModeValue('beige.300', 'brandGray.600')
  return (
    <VStack
      align='start'
      borderColor={borderColor}
      borderBottomStyle='solid'
      borderBottomWidth='1px'
      py={3}
      spacing={5}
    >
      <HStack
        textTransform='uppercase'
        color={textColor}
        fontWeight='semibold'
        fontSize='lg'
      >
        {icon && <Icon as={icon} />}
        <Text>{heading}</Text>
      </HStack>
      {children}
    </VStack>
  )
}

export default Section
