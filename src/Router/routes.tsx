import type { RouteObject } from 'react-router-dom'
import App from '../Pages/App'
import Info from '../components/Info'

const routes: RouteObject[] = [
  {
    index: true,
    element: (
      <>
        <App />
        <Info />
      </>
    ),
  },
  {
    path: '/app',
    element: <App />,
  },
]

export default routes
