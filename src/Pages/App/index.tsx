import React from 'react'
import { ContextProvider } from '../../context'
// import { useLocation } from 'react-router-dom'
// import { ThemeContext } from '../../context/theme'
import Main from './Main'
import Header from '../../components/Header'

const App: React.FC = () => {
  // const location = useLocation()
  // const [isPopup, setIsPopup] = useState(false)
  // const { theme, setTheme } = useContext(ThemeContext)

  // useEffect(() => {
  //   if (window.opener) {
  //     setIsPopup(true)
  //   } else {
  //     setIsPopup(false)
  //   }
  // }, [])

  // const requestFullScreen = (elem: Element) => {
  //   let reqMethod = elem.requestFullscreen
  //   if (reqMethod) {
  //     reqMethod.call(elem)
  //   }
  // }

  return (
    <ContextProvider>
      <div className='max-w-3xl md:px-0 px-5 min-h-screen relative mx-auto'>
        <Header />
        <Main />
      </div>
    </ContextProvider>
  )
}

export default App
