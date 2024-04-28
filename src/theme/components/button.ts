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
        _disabled: {
          bg: 'brandPurple.900'
        }
      },
      _dark: {
        bg: "brandPurple.200",
        color: "black",
        _hover: {
          bg: "brandPurple.100",
          _disabled: {
            bg: "brandPurple.100"
          }
        }
      }
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
      _dark: {
        borderColor: "brandPurple.200",
        color: "brandPurple.200",
        _hover: {
          bg: "brandPurple.900",
          color: "brandPurple.50"
        }
      }
    },
  },
}

export default Button
