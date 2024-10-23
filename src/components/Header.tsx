import React, { useContext } from 'react'
import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
} from '@nextui-org/react'
import {
  InformationCircleIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  MusicalNoteIcon,
} from '@heroicons/react/24/solid'
import { useThemeValue } from '../hooks/theme'
import { ThemeContext } from '../context/theme'
import AudioSearch from './AudioSearch'

const Header: React.FC = () => {
  const { setTheme } = useContext(ThemeContext)
  const ThemeIcon = useThemeValue(MoonIcon, SunIcon)
  const audioDisclosure = useDisclosure()
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
        <Button
          size='sm'
          color='primary'
          variant='bordered'
          isIconOnly
          className='border-none'
        >
          <Cog6ToothIcon className='size-5' />
        </Button>
        <Button
          size='sm'
          color='primary'
          variant='bordered'
          isIconOnly
          className='border-none'
          onPress={audioDisclosure.onOpen}
        >
          <MusicalNoteIcon className='size-5' />
        </Button>
        <Modal
          size='3xl'
          isOpen={audioDisclosure.isOpen}
          onClose={audioDisclosure.onClose}
          scrollBehavior='inside'
          hideCloseButton
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <AudioSearch onClose={onClose} />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}

export default Header
