import React from 'react'
import {
  HStack,
  Text,
  useToast,
  useColorModeValue,
  Link,
  Icon,
} from '@chakra-ui/react'
import { FaCircleInfo } from 'react-icons/fa6'
import type { InputInfo } from './InfoToast'
import InfoToast from './InfoToast'

type InputContainerProps = {
  label: React.ReactNode
  children: React.ReactNode
  info?: InputInfo
}

const InputContainer: React.FC<InputContainerProps> = ({
  label,
  info,
  children,
}) => {
  const color = useColorModeValue('beige.600', 'brandGray.300')
  const hoverColor = useColorModeValue('beige.800', 'brandGray.100')
  const toast = useToast()
  return (
    <HStack justify='space-between' w='100%'>
      <Text fontWeight='bold' color={color}>
        {label}{' '}
        {info && (
          <Link
            as='button'
            _hover={{ color: hoverColor }}
            onClick={() => {
              toast({
                render: () => (
                  <InfoToast info={info} onClose={() => toast.closeAll()} />
                ),
                duration: null,
                position: 'top',
              })
            }}
          >
            <Icon as={FaCircleInfo} />
          </Link>
        )}
      </Text>
      {children}
    </HStack>
  )
}

export default InputContainer
