import { ColorModeScript } from '@chakra-ui/react'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import Router from './Router'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import { Analytics } from '@vercel/analytics/react'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <Router />
      <Analytics />
    </ChakraProvider>
  </React.StrictMode>,
)
