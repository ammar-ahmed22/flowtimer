import { mode } from '@chakra-ui/theme-tools'
import type { StyleFunctionProps } from '@chakra-ui/react'

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode('beige.100', 'brandGray.900')(props),
      color: mode('black', 'white')(props),
    },
    html: {
      scrollBehavior: 'smooth !important',
    },
    // _fullscreen: {
    //   bg: "rgba(255, 255, 255, 0)"
    // },
    // _backdrop: {
    //   bg: "rgba(255, 255, 255, 0)"
    // }
  }),
}

export default styles
