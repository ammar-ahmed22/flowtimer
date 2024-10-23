import React from 'react'
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'
import {
  ClockIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/solid'
import ModeDisplay from '../../components/ModeDisplay'
import Tasks from '../../components/Tasks'

const Main: React.FC = () => {
  return (
    <div className='flex w-full h-[80vh] flex-col justify-center align-center'>
      <Tabs variant='underlined' color='primary' className='justify-center'>
        <Tab
          key='timer'
          title={
            <div className='flex items-center space-x-1'>
              <ClockIcon className='size-4' />
              <span>Timer</span>
            </div>
          }
        >
          <Card className='h-[70vh]'>
            <CardBody>
              <ModeDisplay />
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key='tasks'
          title={
            <div className='flex items-center space-x-1'>
              <ClipboardDocumentCheckIcon className='size-4' />
              <span>Tasks</span>
            </div>
          }
        >
          <Card className='h-[70vh]'>
            <CardBody>
              <Tasks />
            </CardBody>
          </Card>
        </Tab>
        {/* <Tab
          key='ambience'
          title={
            <div className='flex items-center space-x-1'>
              <MusicalNoteIcon className='size-4' />
              <span>Ambience</span>
            </div>
          }
        >
          <Card className='h-[70vh]'>
            <CardBody>
             <Ambience />
            </CardBody>
          </Card>
        </Tab> */}
      </Tabs>
    </div>
  )
}

export default Main
