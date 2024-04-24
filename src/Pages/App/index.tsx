import React from 'react'
import { Container, HStack, Text, IconButton, Link } from '@chakra-ui/react'
import { ContextProvider } from '../../context'
import ModeDisplay from '../../components/ModeDisplay'
import { ColorModeSwitcher } from '../../ColorModeSwitcher'
import Settings from '../../components/Settings'
import { FaCircleInfo } from 'react-icons/fa6'
import { useLocation } from 'react-router-dom'

const App: React.FC = () => {
  const location = useLocation()

  return (
    <ContextProvider>
      <Container maxW='container.sm' centerContent minH='100vh'>
        <HStack justify='space-between' w='100%' mt='3'>
          <ColorModeSwitcher flex='1' />
          <HStack flex='1' margin='0 auto' spacing={1} justify='center'>
            <Text
              fontSize='3xl'
              fontFamily='heading'
              textAlign='center'
              fontWeight='bold'
            >
              ⌛️ FlowTimer
            </Text>
          </HStack>
          <HStack flex='1' justify='end'>
            {location.pathname !== '/app' && (
              <IconButton
                icon={<FaCircleInfo />}
                aria-label='Info'
                colorScheme='brandPurple'
                size='sm'
                fontSize='md'
                variant='ghost'
                as='a'
                href='/#info'
              />
            )}
            <Settings />
          </HStack>
        </HStack>
        <ModeDisplay />
      </Container>
    </ContextProvider>
  )
}

export default App
