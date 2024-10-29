import React, { useContext } from 'react'
import { ScrollShadow } from '@nextui-org/react'
import Context from '../../context'

import Item from './Item'
import Input from './Input'

const Tasks: React.FC = () => {
  const { tasks } = useContext(Context)

  return (
    <div className='h-full w-full flex flex-col justify-between p-4'>
      <ScrollShadow hideScrollBar className='flex flex-col gap-4'>
        {tasks.map((task) => {
          return <Item key={task.id} task={task} />
        })}
      </ScrollShadow>
      <div>
        <Input />
      </div>
    </div>
  )
}

export default Tasks
