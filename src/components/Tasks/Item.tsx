import React, { useState, useContext } from 'react'
import type { Task } from '../../context'
import { Checkbox, Divider, Button } from '@nextui-org/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Context from '../../context'

export type ItemProps = {
  task: Task
}

const Item: React.FC<ItemProps> = ({ task }) => {
  const [hovering, setHovering] = useState(false)
  const { deleteTask, updateTask } = useContext(Context)

  const handleDelete = () => {
    deleteTask(task.id)
  }

  const handleComplete = (value: boolean) => {
    updateTask(task.id, (prev) => {
      return {
        ...prev,
        complete: value,
      }
    })
  }

  return (
    <>
      <div
        className='flex justify-between'
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <Checkbox
          onValueChange={handleComplete}
          className='w-full max-w-none'
          lineThrough
          color='default'
          isSelected={task.complete}
        >
          {task.desc}
        </Checkbox>
        <div className='flex gap-1'>
          <Button
            onPress={handleDelete}
            isDisabled={!hovering}
            style={{ opacity: hovering ? 1 : 0 }}
            isIconOnly
            color='default'
            variant='bordered'
            className='border-none data-[hover=true]:!bg-transparent'
            size='sm'
          >
            <XMarkIcon className='size-5' />
          </Button>
        </div>
      </div>
      <Divider />
    </>
  )
}

export default Item
