import React, { useContext, useState } from 'react'
import {
  Modal as ChakraModal,
  ModalProps as ChakraModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useColorModeValue,
  Button,
} from '@chakra-ui/react'
import Section from './Section'
import Input from './Input'
import { FaRegClock, FaVolumeLow } from 'react-icons/fa6'
import Context from '../../context'
import { ALARM_NAMES, AlarmName } from '../../assets/sounds/alarms'
import alarmSpriteMap from '../../assets/sounds/alarms'
import useSound from 'use-sound'
const alarmSprite = require('../../assets/sounds/alarms-sprite.mp3')

type ModalProps = Omit<ChakraModalProps, 'children'> & {}

const Modal: React.FC<ModalProps> = ({ ...props }) => {
  const {
    breakRatio,
    setBreakRatio,
    minBreakTime,
    setMinBreakTime,
    tickSound,
    setTickSound,
    alarmSound,
    setAlarmSound,
    volume,
    setVolume,
  } = useContext(Context)

  const [playAlarm, { stop }] = useSound(alarmSprite, {
    sprite: alarmSpriteMap,
    interrupt: true,
    volume,
  })

  return (
    <ChakraModal {...props} variant='brand'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Section heading='Timer' icon={FaRegClock}>
            <Input
              label='Break Ratio'
              numberControl={{
                defaultValue: breakRatio,
                value: breakRatio,
                onChange: (val: number) => {
                  setBreakRatio(val)
                },
                min: 0.01,
                max: 1,
                step: 0.01,
              }}
              info={{
                title: 'Break Ratio',
                description: [
                  'The break ratio is how your break time is calculated. The amount of time you work is multiplied by the value set for the break ratio to get your calculated break time. By default, it is set to 0.2 (1/5).',
                  'For example, if the break ratio is set to 0.2 (1/5), working for 25 minutes would result in a 5 minute break. Working for 60 minutes would result in a 12 minute break.',
                ],
              }}
            />
            <Input
              label='Min. Break Time (minutes)'
              numberControl={{
                defaultValue: minBreakTime,
                value: minBreakTime,
                onChange: (val: number) => {
                  setMinBreakTime(val)
                },
                min: 0,
                step: 1,
              }}
              info={{
                title: 'Minimum Break Time',
                description: [
                  'The minimum break time can be set to force yourself to work for a set amount of time before taking a break.',
                  'You will only be allowed to take a break once your calculated break time hits this set value. By default it is set to 1 minute.',
                ],
              }}
            />
          </Section>
          <Section heading='Sound' icon={FaVolumeLow}>
            <Input
              label='Tick Sound'
              toggleControl={{
                value: tickSound,
                onChange: (val: boolean) => {
                  setTickSound(val)
                },
              }}
            />
            <Input
              label='Alarm'
              selectControl={{
                options: [...ALARM_NAMES, 'None'],
                value: alarmSound ?? 'None',
                onChange: (val: string) => {
                  if (val === 'None') {
                    setAlarmSound(undefined)
                  } else {
                    setAlarmSound(val as AlarmName)
                    stop()
                    playAlarm({ id: val })
                  }
                },
                onBlur: () => {
                  stop()
                },
              }}
            />
            <Input
              label='Volume'
              sliderControl={{
                value: volume,
                onChange: (val: number) => {
                  setVolume(val)
                },
                min: 0,
                max: 1,
                step: 0.01,
                markValue: Math.floor(volume * 100),
              }}
            />
          </Section>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
