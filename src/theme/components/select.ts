import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys)

const brandFilled = definePartsStyle({
  field: {
    bg: 'beige.300',
    color: 'beige.800',
    _dark: {
      bg: 'brandGray.500',
      color: 'brandGray.200',
    },
  },
  // stepper: {
  //   color: "beige.700",
  //   _dark: {
  //     color: "brandGray.300"
  //   }
  // }
})

const selectInput = defineMultiStyleConfig({
  variants: { brandFilled },
})

export default selectInput
