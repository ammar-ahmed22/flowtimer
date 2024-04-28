import React from 'react'
import { HStack, Button, IconButton, ButtonProps, useColorModeValue } from '@chakra-ui/react'
import { FaPause, FaPlay, FaRepeat } from 'react-icons/fa6'

export type ControlsProps = {
  isStarted?: boolean
  onToggleStart?: () => void
  onReset?: () => void
  onSwitchMode?: () => void
  switchMode?: React.ReactNode
  switchIcon?: ButtonProps['leftIcon']
  switchDisabled?: boolean
}

const Controls: React.FC<ControlsProps> = ({
  isStarted = false,
  onToggleStart = () => {},
  onReset = () => {},
  onSwitchMode = () => {},
  switchMode = 'Switch',
  switchIcon,
  switchDisabled = false,
}) => {
  const buttonColor = useColorModeValue("brandPurple.700", "brandPurple.200");
  const buttonHoverColor = useColorModeValue("brandPurple.900", "brandPurple.50");
  return (
    <HStack justify='center'>
      <Button
        variant='brandFilled'
        leftIcon={switchIcon}
        onClick={onSwitchMode}
        isDisabled={switchDisabled}
      >
        {switchMode}
      </Button>
      <Button
        leftIcon={isStarted ? <FaPause /> : <FaPlay />}
        variant='brandOutline'
        onClick={onToggleStart}
        width='15ch'
      >
        {isStarted && 'Pause'}
        {!isStarted && 'Start'}
      </Button>
      <IconButton
        icon={<FaRepeat />}
        aria-label='Reset timer'
        variant='ghost'
        color={buttonColor}
        _hover={{
          bg: 'transparent',
          color: buttonHoverColor,
        }}
        onClick={onReset}
      />
    </HStack>
  )
}

export default Controls
