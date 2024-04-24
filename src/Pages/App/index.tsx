import React from "react"
import {
  Container,
  HStack,
  Text,
  Icon
} from "@chakra-ui/react"
import { ContextProvider } from "../../context"
import ModeDisplay from "../../components/ModeDisplay"
import { ColorModeSwitcher } from "../../ColorModeSwitcher"
import LogoIcon from "../../assets/LogoIcon"
import Settings from "../../components/Settings"

const App: React.FC = () => {
  return (
    <ContextProvider>
      <Container
        maxW="container.sm"
        centerContent
        minH="100vh"
      >
        <HStack justify="space-between" w="100%" mt="3" >
          <ColorModeSwitcher flex="1" /> 
          <HStack flex="1" margin="0 auto" spacing={1} justify="center">
            <Text fontSize="3xl"   fontFamily="heading" textAlign="center" fontWeight="bold" >
              ⌛️ FlowTimer
            </Text>
          </HStack>
          <HStack flex="1" justify="end">
            <Settings />
          </HStack>
        </HStack>
        <ModeDisplay />
      </Container>
    </ContextProvider>
  )
}


export default App;