import React, { useState, useContext } from 'react'
import { Input, Button } from '@nextui-org/react'
import Context from '../../context'
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'
import { uuid } from '../../utils/id'

const TaskInput: React.FC = () => {
  const [task, setTask] = useState('')
  const { addTask } = useContext(Context)
  const handleSubmitTask = () => {
    if (task === '') return
    addTask({
      id: uuid(),
      desc: task,
      complete: false,
    })
    setTask('')
  }

  return (
    <Input
      type='text'
      label='What are your working on?'
      variant='bordered'
      value={task}
      onValueChange={setTask}
      endContent={
        task === '' ? undefined : (
          <Button
            onPress={() => handleSubmitTask()}
            isIconOnly
            color='default'
            variant='ghost'
            className='border-none data-[hover=true]:!bg-transparent'
          >
            <ArrowUpCircleIcon className='size-6' />
          </Button>
        )
      }
      onKeyDown={(e) => {
        if (e.key === 'Enter' && task !== '') {
          handleSubmitTask()
        }
      }}
    />
  )
}

export default TaskInput
