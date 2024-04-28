import React, { useState, useContext } from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import TaskItem from './TaskItem'
import Context from '../../context'
import AddTask from './AddTask'

const Tasks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { tasks } = useContext(Context)

  return (
    <Box w='100%' display='flex' flexDirection='column' alignItems='start'>
      <Accordion
        bg={useColorModeValue('beige.200', 'brandGray.600')}
        borderRadius={'3xl'}
        w='100%'
        maxW='container.sm'
        index={isOpen ? [0] : []}
      >
        <AccordionItem border='none'>
          <AccordionButton
            _hover={{ cursor: 'default' }}
            py={tasks.length === 0 ? 2 : 4}
            px={6}
            w='100%'
            whiteSpace='nowrap'
            overflow='hidden'
            textOverflow='ellipsis'
          >
            {tasks.length > 0 && <TaskItem task={tasks[0]} flex='1' />}
            {tasks.length === 0 && <AddTask pb={0} flex={1} as='div' />}
          </AccordionButton>
          <AccordionPanel flexDirection={'column'} display='flex' px={6} py={0}>
            {tasks.slice(1).map((task) => {
              return <TaskItem key={task.id} task={task} pb='4' />
            })}
            {tasks.length !== 0 && <AddTask pb={4} />}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        variant='ghost'
        colorScheme='brandGray'
        fontWeight='normal'
        color='brandGray.500'
        _hover={{
          color: 'brandGray.700',
        }}
        _active={{}}
        leftIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
      >
        Tasks ({tasks.length})
      </Button>
    </Box>
  )
}

export default Tasks
