import React from "react";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { FaGear } from "react-icons/fa6";

type ButtonProps = Omit<IconButtonProps, "icon" | "aria-label">

const Button: React.FC<ButtonProps> = ({
  ...others
}) => {
  return (
    <IconButton 
      icon={<FaGear />}
      aria-label="Settings"
      colorScheme="brandPurple"
      size="sm"
      fontSize="md"
      variant="ghost"
      {...others}
    />
  )
}

export default Button;