import type { RouteObject } from 'react-router-dom'
import App from '../Pages/App'
import Landing from '../Pages/Landing'
import Stats from '../Pages/Stats'

const routes: RouteObject[] = [
  {
    index: true,
    element: (
      <>
        <Landing />
      </>
    ),
  },
  {
    path: '/app',
    element: <App />,
  },
  {
    path: '/stats',
    element: <Stats />,
  },
]

export default routes
