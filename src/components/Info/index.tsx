import React from 'react'
import {
  Container,
  Text,
  Box,
  VStack,
  OrderedList,
  UnorderedList,
  ListItem,
  HStack,
  Link,
  Button,
} from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { FaMugHot } from 'react-icons/fa6'

const Info: React.FC = () => {
  return (
    <Container maxW='100vw' p={0} id='info'>
      <Container maxW='container.sm' p={4}>
        <VStack spacing={10}>
          <Box as='section'>
            <Text fontFamily='heading' fontWeight='bold' fontSize='3xl'>
              "Flow state"
            </Text>
            <Text fontStyle='italic' fontSize='xl'>
              (noun)
            </Text>
            <Box width='2rem' height='4px' bg='brandPurple.600' my='2' />
            <Text fontSize='lg'>
              A mental state in which a person performing some activity is fully
              immersed in a feeling of energized focus, full involvement, and
              enjoyment in the process of the activity
            </Text>
          </Box>
          <Box as='section'>
            <Text fontFamily='heading' fontWeight='bold' fontSize='3xl'>
              What is Flowtimer?
            </Text>
            <Box width='2rem' height='4px' bg='brandPurple.600' my='2' />
            <Text fontSize='lg'>
              Flowtimer is <strong>pomodoro reimagined</strong>. Instead of
              restricting yourself to working for set amounts of time, allow
              yourself to enter the <strong>"flow state"</strong> by working for
              as long as you want. Breaks are calculated as a ratio of time
              worked, rewarding yourself for working longer. I have aptly coined
              this technique, the <strong>"Flowmodoro technique"</strong>.
            </Text>
          </Box>
          <Box as='section'>
            <Text fontFamily='heading' fontWeight='bold' fontSize='3xl'>
              What is the Flowmodoro technique?
            </Text>
            <Box width='2rem' height='4px' bg='brandPurple.600' my='2' />
            <Text fontSize='lg' mb='3'>
              The Flowmodoro technique is a twist on the Pomodoro technique in
              which users time themselves working for however long they want and
              the break time is calculated as a ratio of time worked. This
              allows for users to keep working in their "flow state" for however
              long they want. This also allows for users to be rewarded for
              working longer as longer work time results in a longer break. The
              break ratio is initially set as 1/5.
            </Text>
            <Text fontSize='lg'>
              For example, if the break ratio is set to 1/5 and a user times
              themselves working for 1 hour. Their break time would be
              calculated as 12 minutes.
            </Text>
          </Box>
          <Box as='section'>
            <Text fontFamily='heading' fontWeight='bold' fontSize='3xl'>
              What is the Pomodoro technique?
            </Text>
            <Box width='2rem' height='4px' bg='brandPurple.600' my='2' />
            <Text fontSize='lg' mb='3'>
              The Pomodoro technique is created by Francesco Cirillo in which
              users break down their work into intervals, typically 25 minutes
              long. Followed by a short break of 5 minutes.
            </Text>
            <Text fontSize='lg'>
              While this is a great technique that has been useful for many
              people, some people find it too restricting due to the set amount
              of work time. Sometimes people can become immersed into a task,
              achieving the "flow state", only to be cut off by their work time
              ending.
            </Text>
          </Box>
          <Box w='100%' as='section'>
            <Text fontFamily='heading' fontWeight='bold' fontSize='3xl'>
              How to use Flowtimer?
            </Text>
            <Box width='2rem' height='4px' bg='brandPurple.600' my='2' />
            <OrderedList marginInlineStart='8' spacing={2} fontSize='lg'>
              <ListItem>
                <strong>Add tasks</strong> to work on.
              </ListItem>
              <ListItem>
                <strong>Time yourself</strong> working until you feel like
                taking a break.
              </ListItem>
              <ListItem>
                Take your <strong>calculated break.</strong>
              </ListItem>
              <ListItem>
                <strong>Repeat</strong> until you've finished all your tasks
              </ListItem>
            </OrderedList>
          </Box>
          <Box w='100%' as='section' mb={12}>
            <Text fontFamily='heading' fontWeight='bold' fontSize='3xl'>
              Features
            </Text>
            <Box width='2rem' height='4px' bg='brandPurple.600' my='2' />
            <UnorderedList
              marginInlineStart='8'
              spacing={2}
              fontSize='lg'
              mb={5}
            >
              <ListItem>To-do list to track tasks.</ListItem>
              <ListItem>Mobile and desktop support</ListItem>
              <ListItem>Dark/light mode</ListItem>
              <ListItem>Customizable timer settings</ListItem>
              <ListItem>Audio notifications at the end of break timer</ListItem>
            </UnorderedList>
            <Text fontSize='3xl' fontFamily='heading' fontWeight='bold'>
              Features Coming Soon
            </Text>
            <Box width='2rem' height='4px' bg='brandPurple.600' my='2' />
            <UnorderedList
              marginInlineStart='8'
              spacing={2}
              fontSize='lg'
              mb={5}
            >
              <ListItem>Session stats.</ListItem>
              <ListItem>Save tasks/stats in the browser.</ListItem>
              <ListItem>Login to save tasks/stats across devices</ListItem>
            </UnorderedList>
            <Text fontSize='lg'>
              Have a feature you want us to add or report something not working?{' '}
              <Link color='brandPurple.600'>Open a GitHub issue</Link> or{' '}
              <Link color='brandPurple.600'>contact me</Link>.
            </Text>
          </Box>
        </VStack>
      </Container>
      <Box w='100%' h='1px' bg='beige.200' />
      <Container maxW='container.sm' p={5}>
        <HStack
          textTransform='uppercase'
          w='100%'
          justify='center'
          fontWeight='bold'
        >
          <Link>Home</Link>
          <Link>Contact</Link>
          <Link as={ReactLink} to='/app'>
            Simple App
          </Link>
        </HStack>
        <HStack w='100%' justify='center' py={3}>
          <Text>
            Made with ❤️ by <Link fontWeight='bold' href="https://ammarahmed.ca" >Ammar Ahmed</Link>
          </Text>
        </HStack>
        <HStack w="100%" justify="center" pb={3}>
          <Button
            as={Link}
            variant="outline"
            colorScheme="black"
            size="sm"
            leftIcon={<FaMugHot />}
            href="https://buymeacoffee.com/ammar.ahmed"
            isExternal
          >Buy me a coffee</Button>
        </HStack>
        <HStack w='100%' justify='center'>
          <Text fontSize='sm' fontWeight='light'>
            &copy; Flowtimer 2024. All Rights Reserved
          </Text>
        </HStack>
      </Container>
    </Container>
  )
}

export default Info
