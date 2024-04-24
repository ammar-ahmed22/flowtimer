import React from "react";
import { 
  Box,
  Text,
  useColorModeValue,
  IconButton
} from "@chakra-ui/react"
import { FaXmark } from "react-icons/fa6";

export type InputInfo = {
  title: string,
  description: string[],
}

export type InfoToastProps = {
  info: InputInfo,
  onClose: () => void
}

const InfoToast: React.FC<InfoToastProps> = ({
  info,
  onClose
}) => {

  const bg = useColorModeValue("beige.200", "brandGray.700");
  const color = useColorModeValue("beige.600", "brandGray.300");

  return (
    <Box p={5} color={color} bg={bg} pos="relative" borderRadius={"md"} >
      <Text fontWeight="bold" mb="5" >{info.title}</Text>
      {
        info.description.map(d => {
          return (
            <Text
              mb="3"
            >{d}</Text>
          )
        })
      }
      <IconButton 
        variant="ghost"
        icon={<FaXmark />}
        aria-label="Close info panel"
        pos="absolute"
        top={3}
        right={3}
        onClick={onClose}
      />
    </Box>
  )
}

export default InfoToast;
