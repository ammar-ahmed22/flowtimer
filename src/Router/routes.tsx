import type { RouteObject } from 'react-router-dom'
import App from '../Pages/App'
import Landing from '../Pages/Landing'

const routes: RouteObject[] = [
  {
    index: true,
    element: (
      <>
        {/* <App /> */}
        <Landing />
      </>
    ),
  },
  {
    path: '/app',
    element: <App />,
  },
]

export default routes
