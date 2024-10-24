import React, { useContext } from 'react'
import { Button } from '@nextui-org/react'
import {
  InformationCircleIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/solid'
import { useThemeValue } from '../hooks/theme'
import { ThemeContext } from '../context/theme'
import AudioSearch from './AudioSearch'
import Settings from './Settings'

const Header: React.FC = () => {
  const { setTheme } = useContext(ThemeContext)
  const ThemeIcon = useThemeValue(MoonIcon, SunIcon)
  return (
    <div className='flex justify-between items-center py-4'>
      <h1 className='md:text-2xl text-lg font-extrabold tracking-tight text-transparent dark:from-primary-300 dark:to-primary-600 from-primary-600 to-primary-800 bg-clip-text bg-gradient-to-b inline'>
        ⌛️
      </h1>
      <div className='flex gap-0'>
        <Button
          size='sm'
          color='primary'
          variant='bordered'
          isIconOnly
          className='border-none'
        >
          <InformationCircleIcon className='size-5' />
        </Button>
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
        <Settings />
        <AudioSearch />
      </div>
    </div>
  )
}

export default Header
