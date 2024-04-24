import React from "react";
import { 
  HStack,
  Button,
  IconButton,
  ButtonProps
} from "@chakra-ui/react";
import { FaPause, FaPlay, FaRepeat } from "react-icons/fa6";

export type ControlsProps = {
  isStarted?: boolean,
  onToggleStart?: () => void,
  onReset?: () => void,
  onSwitchMode?: () => void,
  switchMode?: React.ReactNode,
  switchIcon?: ButtonProps["leftIcon"],
  switchDisabled?: boolean
}

const Controls: React.FC<ControlsProps> = ({
  isStarted = false,
  onToggleStart = () => {},
  onReset = () => {},
  onSwitchMode = () => {},
  switchMode = "Switch",
  switchIcon,
  switchDisabled = false
}) => {

  return (
    <HStack justify="center" >
      <Button 
        variant="brandFilled"
        leftIcon={switchIcon}
        onClick={onSwitchMode}
        isDisabled={switchDisabled}
      >{switchMode}</Button>
      <Button
        leftIcon={isStarted ? <FaPause /> : <FaPlay />}
        variant="brandOutline"
        onClick={onToggleStart}
        width="15ch"
      >
        {isStarted && "Pause"}
        {!isStarted && "Start"}
      </Button>
      <IconButton 
        icon={<FaRepeat />}
        aria-label="Reset timer"
        variant="ghost"
        color="brandPurple.700"
        _hover={{
          bg: "transparent",
          color: "brandPurple.900"
        }}
        onClick={onReset}
      />
    </HStack>
  )
}

export default Controls;