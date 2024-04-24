import * as React from "react"
import {
  useColorMode,
  Switch,
  Stack,
  Icon,
  StackProps
} from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa6"

type ColorModeSwitcherProps = StackProps

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode, colorMode } = useColorMode()

  return (
    <Stack direction="row" align="center" {...props} >
      <Icon as={FaSun} color={colorMode === "dark" ? "brandGray.700" : "brandPurple.600"} />
      <Switch 
        colorScheme="brandPurple"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      <Icon as={FaMoon} color={colorMode === "dark" ? "brandPurple.200" : "brandGray.200"} />
    </Stack>
  )
}
