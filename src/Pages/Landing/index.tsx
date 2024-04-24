import React from "react";
import { 
  Container,
  Box,
  Image,
  Text,
  HStack,
  Button,
  useBreakpointValue
} from "@chakra-ui/react"
import { Link as ReactLink } from "react-router-dom";
import Rocket from "../../assets/images/Rocket.png";
import Education from "../../assets/images/Education.png";
import Notification from "../../assets/images/Notification.png";

const Landing: React.FC = () => {
  const h1 = useBreakpointValue({
    base: "3xl",
    md: "4xl"
  });
  const h2 = useBreakpointValue({
    base: "2xl",
    md: "3xl"
  })
  const p = useBreakpointValue({
    base: "lg",
    md: "lg"
  });
  return (
    <Container
      maxW={{ base: "100%", md: "container.lg" }}
    >
      <Box
        minH="100vh"
        pos="relative"
      >
        <Box
          maxW={{ base: "70%", md: "50%" }}
          pos="absolute"
          top="50%"
          transform="translateY(-50%)"
        >
          <Text 
            as="h1" 
            fontFamily="heading" 
            fontWeight="bold"
            fontSize={h1}
            mb="5"
            lineHeight="1.2"
          >Increase your Productivity with Flowtimer</Text>
          <Text
            fontWeight="500"
            fontSize={p}
            mb={5}
          >The infamous Pomodoro technique with a new twist!</Text>
          <HStack>
            <Button
              variant="brandFilled"
              as={ReactLink}
              to="/app"
              fontSize={{ base: "xs", md: "md" }}
            >Get Started</Button>
            <Button
              variant="brandOutline"
              as="a"
              href="#learn-more"
              fontSize={{ base: "xs", md: "md" }}
            >Learn More</Button>
          </HStack>
        </Box>
        <Image 
          src={Rocket}
          pos="absolute"
          top={{ base: "70%", md: "50%" }}
          right={0}
          transform={{ base: "translate(50%, -50%)", md: "translate(0, -50%)"}}
          width={{ base: "auto", md: "40%" }}
        />
      </Box>
      <Box
        as="section"
        id="learn-more"
        minH="50vh"
        pos="relative"
      >
        <Box
          w={{ base: "70%", md: "50%"}}
          pos="absolute"
          right={0}
          top="50%"
          transform="translateY(-50%)"
        >
          <Text
            as="h2"
            fontFamily="heading"
            fontWeight="bold"
            fontSize={h2}
          >"Flow state"</Text>
          <Text
            fontFamily="body"
            fontStyle="italic"
            fontSize={{ base: "xl", md: "2xl" }}
          >(noun)</Text>
          <Text
            fontSize={p}
          >A mental state in which a person performing some activity is fully immersed in a feeling of energized focus, full involvement, and enjoyment in the process of the activity</Text>
        </Box>
        <Image 
          src={Education}
          h={{ base: "70%", md: "100%" }}
          top="50%"
          pos="absolute"
          left={0}
          transform={{ base: "translate(-70%, -50%)", md: "transform(0, -50%)" }}
        />
      </Box>
      <Box
        minH="50vh"
        pos="relative"
      >
        <Box
          w={{ base: "70%", md: "50%"}}
          pos="absolute"
          left={0}
          top="50%"
          transform="translateY(-50%)"
        >
          <Text
            as="h2"
            fontFamily="heading"
            fontWeight="bold"
            fontSize={h2}
          >Pomodoro Reimagined</Text>
          <Text
            fontSize={p}
          >Instead of restricting yourself to a set work time, enter the flow state and be rewarded for working longer!</Text>
        </Box>
        <Image 
          src={Notification}
          h={{ base: "70%", md: "100%" }}
          pos="absolute"
          right={0}
          top="50%"
          transform={{ base: "translate(70%, -50%)", md: "transform(0, -50%)" }}
        />
      </Box>
      <Box>
        <Text 
          as="h2"
          fontFamily="heading"
          fontSize={h2}
          fontWeight="bold" 
        >How it works</Text>
      </Box>
    </Container>
  )
}

export default Landing;