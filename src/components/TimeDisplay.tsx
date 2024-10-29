import React from 'react'
import { seconds2hms, zeroPad } from '../utils/time'

export type TimeDisplayProps = {
  elapsed: number
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ elapsed }) => {
  const [hours, minutes, seconds] = seconds2hms(elapsed)

  return (
    <div className='flex space-x-5 w-full justify-center'>
      <div className='flex flex-col'>
        <p className='md:text-6xl text-4xl text-primary font-mono font-bold'>
          {zeroPad(hours)}
        </p>
        <p className='text-xs text-default-500'>hours</p>
      </div>
      <div className='flex flex-col'>
        <p className='md:text-6xl text-4xl text-primary font-mono font-bold'>
          {zeroPad(minutes)}
        </p>
        <p className='text-xs text-default-500'>minutes</p>
      </div>
      <div className='flex flex-col'>
        <p className='md:text-6xl text-4xl text-primary font-mono font-bold'>
          {zeroPad(seconds)}
        </p>
        <p className='text-xs text-default-500'>seconds</p>
      </div>
    </div>
  )
}

export default TimeDisplay
