import React, { useEffect, useState } from 'react'

type ProgressCircleProps = {
  percentage: number
  color?: string
  children?: React.ReactNode
  contentRef?: React.MutableRefObject<Element | null>
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percentage,
  color,
  children,
  contentRef,
}) => {
  const [circleSize, setCircleSize] = useState(0)
  useEffect(() => {
    const updateCircleSize = () => {
      if (contentRef && contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect()
        let size = Math.max(rect.width, rect.height)
        setCircleSize(Math.ceil(size * (6 / 5)) + 10)
      } else {
        setCircleSize(400)
      }
    }
    updateCircleSize()
    window.addEventListener('resize', updateCircleSize)
    return () => {
      window.removeEventListener('resize', updateCircleSize)
    }
  }, [contentRef])

  return (
    <div className='relative flex items-center justify-center w-full h-full'>
      <div className='relative'>
        <svg
          style={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
          }}
          className='absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]'
          viewBox='0 0 36 36'
        >
          <circle
            className='text-gray-300'
            strokeWidth='3'
            stroke='currentColor'
            fill='transparent'
            r='16'
            cx='18'
            cy='18'
          />
          <circle
            className={`text-${color} transition-all duration-350 ease-linear stroke-[${percentage}]`}
            strokeWidth='3'
            strokeDasharray='100'
            strokeDashoffset={100 - percentage}
            strokeLinecap='round'
            stroke='currentColor'
            fill='transparent'
            r='16'
            cx='18'
            cy='18'
            transform='rotate(-90 18 18)'
          />
        </svg>
        <div className='absolute inset-0 flex items-center justify-center'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ProgressCircle
