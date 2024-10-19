import React from 'react'
import { useToken, useColorModeValue } from '@chakra-ui/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from '../context/theme'
import '../index.css'

const Router: React.FC = () => {
  const router = createBrowserRouter(routes)
  return (
    <>
      <Helmet>
        <meta name='theme-color' content='#ffffff'></meta>
      </Helmet>
      <ThemeProvider
        defaultClasses='bg-background text-foreground min-h-screen'
        defaultTheme='dark'
      >
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default Router
