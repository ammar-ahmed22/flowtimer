import React from 'react'
import { useToken, useColorModeValue } from '@chakra-ui/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes'
import { Helmet } from 'react-helmet'
import '../index.css'

const Router: React.FC = () => {
  const router = createBrowserRouter(routes)
  const [beige100, brandGray900] = useToken("colors", ["beige.100", "brandGray.900"]);
  const themeColor = useColorModeValue(beige100, brandGray900);
  return (
    <>
      <Helmet>
        <meta name="theme-color" content={themeColor} ></meta>
      </Helmet>
      <RouterProvider router={router} />
    </>
  )
}

export default Router
