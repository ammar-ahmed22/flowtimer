import React from 'react'
import { ContextProvider } from '../../context'
import Main from './Main'
import Header from '../../components/Header'
import YouTubePlayer from '../../components/YouTubePlayer'

const App: React.FC = () => {
  return (
    <ContextProvider>
      <div className='max-w-3xl md:px-0 px-5 min-h-screen relative mx-auto'>
        <Header
          hideStats // TODO temporarily hide because of bug #9
        />
        <Main />
        <YouTubePlayer />
      </div>
    </ContextProvider>
  )
}

export default App
