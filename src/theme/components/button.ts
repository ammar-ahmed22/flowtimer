import { ComponentStyleConfig } from '@chakra-ui/react'

const Button: ComponentStyleConfig = {
  variants: {
    brandFilled: {
      borderRadius: 'full',
      px: '8',
      py: '3',
      fontSize: 'sm',
      bg: 'brandPurple.700',
      color: 'white',
      _hover: {
        bg: 'brandPurple.900',
      },
    },
    brandOutline: {
      borderRadius: 'full',
      bg: 'transparent',
      borderStyle: 'solid',
      borderWidth: '1px',
      px: '8',
      py: '3',
      fontSize: 'sm',
      borderColor: 'brandPurple.700',
      color: 'brandPurple.700',
      _hover: {
        bg: 'brandPurple.300',
        color: 'brandPurple.900',
      },
    },
  },
}

export default Button
