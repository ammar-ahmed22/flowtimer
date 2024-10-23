import React from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react'
import { MusicalNoteIcon } from '@heroicons/react/24/solid'
import Body from './Body'

const AudioSearch: React.FC = () => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        size='sm'
        color='primary'
        variant='bordered'
        isIconOnly
        className='border-none'
        onPress={onOpen}
      >
        <MusicalNoteIcon className='size-5' />
      </Button>
      <Modal
        size='3xl'
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior='inside'
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <Body onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default AudioSearch
