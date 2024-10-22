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
            stroke-width='3'
            stroke='currentColor'
            fill='transparent'
            r='16'
            cx='18'
            cy='18'
          />
          <circle
            className={`text-${color} transition-all duration-350 ease-linear stroke-[${percentage}]`}
            stroke-width='3'
            stroke-dasharray='100'
            stroke-dashoffset={100 - percentage}
            stroke-linecap='round'
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
    // <Box
    //   ref={containerRef}
    //   height={size}
    //   width={size}
    //   pos='relative'
    //   m={'10px'}
    //   {...other}
    // >
    //   {diameter !== 0 &&
    //     lineArray.map((_, idx) => {
    //       const radius = diameter / 2
    //       const centerX = radius
    //       const centerY = radius
    //       const angle = (360 / lines) * idx - 90
    //       const x = centerX + radius * Math.cos((angle * Math.PI) / 180)
    //       const y = centerY + radius * Math.sin((angle * Math.PI) / 180)
    //       const progressIdx = Math.floor((lines - 1) * progress)
    //       const bg = idx <= progressIdx ? completeColor : incompleteColor
    //       return (
    //         <Box
    //           pos='absolute'
    //           zIndex={1}
    //           top={y + 'px'}
    //           left={x + 'px'}
    //           height='20px'
    //           width='4px'
    //           bg={bg}
    //           opacity='0.75'
    //           transform={`translate(-50%, -50%) rotate(${angle + 90}deg)`}
    //         />
    //       )
    //     })}
    //   <Box
    //     pos='absolute'
    //     top='50%'
    //     left='50%'
    //     transform={'translate(-50%, -50%)'}
    //     zIndex={2}
    //   >
    //     {children}
    //   </Box>
    // </Box>
  )
}

export default ProgressCircle
