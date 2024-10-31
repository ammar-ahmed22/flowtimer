import React, { useContext } from 'react'
import { Button } from '@nextui-org/react'
import { MoonIcon, SunIcon, ChartBarIcon } from '@heroicons/react/24/solid'
import { useThemeValue } from '../hooks/theme'
import { ThemeContext } from '../context/theme'
import AudioSearch from './AudioSearch'
import Settings from './Settings'
import { Link } from 'react-router-dom'

export type HeaderProps = {
  hideSettings?: boolean
  hideAudio?: boolean
  hideStats?: boolean
}

const Header: React.FC<HeaderProps> = ({
  hideSettings,
  hideAudio,
  hideStats,
}) => {
  const { setTheme } = useContext(ThemeContext)
  const ThemeIcon = useThemeValue(MoonIcon, SunIcon)
  return (
    <div className='flex justify-between items-center py-4'>
      <Link
        to='/'
        className='md:text-2xl text-lg font-extrabold tracking-tight text-transparent dark:from-primary-300 dark:to-primary-600 from-primary-600 to-primary-800 bg-clip-text bg-gradient-to-b inline'
      >
        ⌛️
      </Link>
      <div className='flex gap-0'>
        <Button
          size='sm'
          color='primary'
          variant='bordered'
          isIconOnly
          className='border-none'
          onPress={() => {
            setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
          }}
        >
          <ThemeIcon className='size-5' />
        </Button>
        {!hideStats && (
          <Button
            size='sm'
            color='primary'
            variant='bordered'
            isIconOnly
            className='border-none'
            as={Link}
            to='/stats'
          >
            <ChartBarIcon className='size-5' />
          </Button>
        )}
        {!hideSettings && <Settings />}
        {!hideAudio && <AudioSearch />}
      </div>
    </div>
  )
}

export default Header
