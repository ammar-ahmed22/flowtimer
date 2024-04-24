import React, { useContext, useState, useRef, useEffect } from 'react'
import {
  Checkbox,
  Editable,
  EditablePreview,
  EditableInput,
  Flex,
  FlexProps,
  IconButton,
  useToken,
  useColorModeValue,
} from '@chakra-ui/react'
import Context from '../../context'
import type { Task } from '../../context'
import { FaXmark } from 'react-icons/fa6'

export type TaskItemProps = FlexProps & {
  task: Task
  editing?: boolean
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  editing = false,
  ...others
}) => {
  const { toggleTaskCompletion, updateTask, deleteTask } = useContext(Context)
  const handleChange = () => {
    toggleTaskCompletion(task.id)
  }
  const [hovering, setHovering] = useState(false)
  const [space6, space2] = useToken('space', ['6', '2'])
  const [contSm] = useToken('sizes', ['container.sm'])
  const checkBoxSize = '1rem'

  const textColor = useColorModeValue('brandGray.600', 'brandGray.300')
  const placeholderColor = useColorModeValue('brandGray.400', 'brandGray.400')

  return (
    <Flex
      pos='relative'
      align='center'
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      {...others}
    >
      <Checkbox
        isChecked={task.complete}
        colorScheme='brandPurple'
        color='brandGray.600'
        borderColor='brandGray.400'
        onChange={() => handleChange()}
        mr='2'
      />
      <Editable
        value={task.desc}
        color={task.desc === '' ? placeholderColor : textColor}
        fontStyle={task.desc === '' ? 'italic' : 'unset'}
        textAlign='left'
        flex='1'
        onChange={(value) => {
          updateTask(task.id, (prev) => {
            return {
              ...prev,
              desc: value,
            }
          })
        }}
        textDecor={task.complete ? 'line-through' : 'unset'}
        placeholder='What are you working on?'
      >
        <EditablePreview
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
          maxW={`calc(${contSm} - ${checkBoxSize} - ${space2} - (${space6} * 2))`}
          display='block'
        />
        <EditableInput
          borderRadius='none'
          _focusVisible={{
            boxShadow: 'none',
            borderBottom: 'solid 1px',
            borderColor: 'brandGray.400',
          }}
          maxW={`calc(${contSm} - ${checkBoxSize} - ${space2} - (${space6} * 2))`}
          _placeholder={{
            color: placeholderColor,
            fontStyle: 'italic',
          }}
        />
      </Editable>
      <IconButton
        aria-label='Delete task'
        size='xs'
        icon={<FaXmark />}
        variant='ghost'
        color='brandGray.600'
        _hover={{
          color: 'brandGray.800',
        }}
        _active={{}}
        display={hovering ? 'block' : 'none'}
        onClick={() => deleteTask(task.id)}
      />
    </Flex>
  )
}

export default TaskItem
