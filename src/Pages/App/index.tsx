import React, { useState, useEffect } from 'react'
import { Container, HStack, Text, IconButton } from '@chakra-ui/react'
import { ContextProvider } from '../../context'
import ModeDisplay from '../../components/ModeDisplay'
import { ColorModeSwitcher } from '../../ColorModeSwitcher'
import Settings from '../../components/Settings'
import {
  FaCircleInfo,
  FaArrowUpRightFromSquare,
  FaExpand,
} from 'react-icons/fa6'
import { useLocation } from 'react-router-dom'

const App: React.FC = () => {
  const location = useLocation()
  const [isPopup, setIsPopup] = useState(false)

  useEffect(() => {
    if (window.opener) {
      setIsPopup(true)
    } else {
      setIsPopup(false)
    }
  }, [])

  const requestFullScreen = (elem: Element) => {
    let reqMethod = elem.requestFullscreen
    if (reqMethod) {
      reqMethod.call(elem)
    }
  }

  return (
    <ContextProvider>
      <Container maxW='container.sm' centerContent minH='100vh' pos='relative'>
        {!isPopup && (
          <IconButton
            icon={<FaArrowUpRightFromSquare />}
            aria-label='New Window'
            colorScheme='brandPurple'
            size='sm'
            fontSize='md'
            variant='ghost'
            pos='absolute'
            bottom={4}
            right={0}
            onClick={() => {
              window.open('/app', '_blank', 'popup=yes,width=700,height=900')
            }}
          />
        )}
        <IconButton
          icon={<FaExpand />}
          aria-label='Fullscreen'
          colorScheme='brandPurple'
          size='sm'
          fontSize='md'
          variant='ghost'
          pos='absolute'
          bottom={4}
          left={0}
          onClick={() => {
            const root = document.getElementById('root')
            if (root) requestFullScreen(document.body)
          }}
        />
        <HStack justify='space-between' w='100%' mt='3'>
          <ColorModeSwitcher flex='1' />
          <HStack flex='1' margin='0 auto' spacing={1} justify='center'>
            <Text
              fontSize={{ base: 'lg', md: '3xl' }}
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
