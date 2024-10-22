import React from 'react'
import { Button } from '@nextui-org/react'
import {
  PlayIcon,
  PauseIcon,
  ArrowPathRoundedSquareIcon,
} from '@heroicons/react/24/solid'

export type ControlsProps = {
  isStarted?: boolean
  onToggleStart?: () => void
  onReset?: () => void
  onSwitchMode?: () => void
  switchIcon?: React.ReactNode
  switchDisabled?: boolean
  className?: string
}

const Controls: React.FC<ControlsProps> = ({
  isStarted = false,
  onToggleStart = () => {},
  onReset = () => {},
  onSwitchMode = () => {},
  switchIcon,
  switchDisabled = false,
  className,
}) => {
  return (
    <div className={`flex justify-center space-x-2 ${className}`}>
      <Button
        color='primary'
        isDisabled={switchDisabled}
        startContent={switchIcon}
        isIconOnly
        variant='ghost'
        onPress={() => onSwitchMode()}
      >
        {/* {switchMode} */}
      </Button>
      <Button
        variant='ghost'
        isIconOnly
        startContent={
          isStarted ? (
            <PauseIcon className='size-5' />
          ) : (
            <PlayIcon className='size-5' />
          )
        }
        onPress={() => onToggleStart()}
      ></Button>
      <Button
        variant='ghost'
        isIconOnly
        startContent={<ArrowPathRoundedSquareIcon className='size-5' />}
        onPress={() => onReset()}
      />
    </div>
    // <HStack justify='center'>
    //   <Button
    //     variant='brandFilled'
    //     leftIcon={switchIcon}
    //     onClick={onSwitchMode}
    //     isDisabled={switchDisabled}
    //   >
    //     {switchMode}
    //   </Button>
    //   <Button
    //     leftIcon={isStarted ? <FaPause /> : <FaPlay />}
    //     variant='brandOutline'
    //     onClick={onToggleStart}
    //     width='15ch'
    //   >
    //     {isStarted && 'Pause'}
    //     {!isStarted && 'Start'}
    //   </Button>
    //   <IconButton
    //     icon={<FaRepeat />}
    //     aria-label='Reset timer'
    //     variant='ghost'
    //     color={buttonColor}
    //     _hover={{
    //       bg: 'transparent',
    //       color: buttonHoverColor,
    //     }}
    //     onClick={onReset}
    //   />
    // </HStack>
  )
}

export default Controls
