import React, { useContext, useState } from 'react'
import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Slider,
  Input,
  Switch,
  Select,
  SelectItem,
} from '@nextui-org/react'
import {
  Cog6ToothIcon,
  ClockIcon,
  SpeakerWaveIcon,
} from '@heroicons/react/24/solid'
import Field from './Field'
import { ALARM_NAMES, AlarmName } from '../../assets/sounds/alarms'
import Context from '../../context'

export type SettingsValues = {
  breakRatio: number
  minBreakTime: number
  tickSound: boolean
  alarmSound?: AlarmName
  volume: number
}

const Settings: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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

  const [values, setValues] = useState<SettingsValues>({
    breakRatio,
    minBreakTime,
    tickSound,
    alarmSound,
    volume,
  })
  const [timeUnit, setTimeUnit] = useState(minBreakTime < 1 ? 's' : 'm')

  const br2sv = (br: number) => 8 - Math.round(1 / br)
  const sv2br = (sv: number) => 1 / (8 - sv)

  const minBreakDisplayValue = () => {
    if (timeUnit === 's') {
      return (values.minBreakTime * 60).toFixed(2)
    }
    return values.minBreakTime.toFixed(2)
  }

  const isChanged = () => {
    const defaults: SettingsValues = {
      breakRatio,
      minBreakTime,
      tickSound,
      alarmSound,
      volume,
    }
    return JSON.stringify(defaults) === JSON.stringify(values)
  }

  const handleReset = () => {
    setValues({ breakRatio, minBreakTime, tickSound, alarmSound, volume })
  }

  const handleSave = () => {
    setBreakRatio(values.breakRatio)
    setMinBreakTime(values.minBreakTime)
    setTickSound(values.tickSound)
    setAlarmSound(values.alarmSound)
    setVolume(values.volume)
  }

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
        <Cog6ToothIcon className='size-5' />
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior='inside'
        size='md'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='text-xl'>Settings</ModalHeader>
              <ModalBody>
                <div className='flex flex-col'>
                  <div className='flex text-foreground font-extrabold text-large items-center gap-2'>
                    <ClockIcon className='size-4' />
                    <span>Timer</span>
                  </div>
                  <Field label='Break ratio' className='mb-4'>
                    <Slider
                      aria-label='Break ratio slider'
                      minValue={0}
                      maxValue={6}
                      step={1}
                      value={br2sv(values.breakRatio)}
                      onChange={(value) =>
                        setValues((prev) => ({
                          ...prev,
                          breakRatio: sv2br(value as number),
                        }))
                      }
                      size='sm'
                      className='w-1/3'
                      color='foreground'
                      classNames={{
                        track: 'bg-default-500/30',
                        thumb:
                          'w-2 h-2 after:w-2 after:h-2 after:bg-foreground',
                      }}
                      marks={[
                        {
                          value: 0,
                          label: '1/8',
                        },
                        {
                          value: 3,
                          label: '1/5',
                        },
                        {
                          value: 6,
                          label: '1/2',
                        },
                      ]}
                    />
                  </Field>
                  <Field label='Minimum break time'>
                    <Input
                      type='number'
                      size='sm'
                      value={minBreakDisplayValue()}
                      onValueChange={(value: string) => {
                        let val = parseFloat(value)
                        if (timeUnit === 's') {
                          val /= 60
                        }
                        setValues((prev) => ({ ...prev, minBreakTime: val }))
                      }}
                      endContent={
                        <div className='flex items-center'>
                          <label htmlFor='timeUnit' className='sr-only'>
                            Unit of Time
                          </label>
                          <select
                            className='outline-none border-0 bg-transparent text-default-400 text-small'
                            id='timeUnit'
                            name='timeUnit'
                            value={timeUnit}
                            onChange={(e) => {
                              setTimeUnit(e.target.value)
                            }}
                          >
                            <option value='m'>mins</option>
                            <option value='s'>secs</option>
                          </select>
                        </div>
                      }
                      className='w-1/3'
                    />
                  </Field>
                  <div className='flex text-foreground font-extrabold text-large items-center gap-2'>
                    <SpeakerWaveIcon className='size-4' />
                    <span>Sound</span>
                  </div>
                  <Field label='Timer tick' className='mb-4'>
                    <Switch
                      isSelected={values.tickSound}
                      onValueChange={(isSelected) =>
                        setValues((prev) => ({
                          ...prev,
                          tickSound: isSelected,
                        }))
                      }
                      color='primary'
                      size='sm'
                    />
                  </Field>
                  <Field label='Alarm' className='items-center mb-4'>
                    <Select
                      size='sm'
                      label='Select an alarm sound'
                      className='w-1/2'
                      selectedKeys={new Set([values.alarmSound ?? 'None'])}
                      onSelectionChange={(keys) => {
                        setValues((prev) => ({
                          ...prev,
                          alarmSound:
                            keys.currentKey === 'None'
                              ? undefined
                              : (keys.currentKey as AlarmName),
                        }))
                      }}
                    >
                      {['None', ...ALARM_NAMES].map((name) => {
                        return <SelectItem key={name}>{name}</SelectItem>
                      })}
                    </Select>
                  </Field>
                  <Field label='Volume'>
                    <Slider
                      showTooltip
                      aria-label='Volume slider'
                      className='w-1/3'
                      color='foreground'
                      minValue={0}
                      maxValue={1}
                      step={0.01}
                      formatOptions={{ style: 'percent' }}
                      value={values.volume}
                      onChange={(value) =>
                        setValues((prev) => ({
                          ...prev,
                          volume: value as number,
                        }))
                      }
                      classNames={{
                        track: 'bg-default-500/30',
                        thumb:
                          'w-2 h-2 after:w-2 after:h-2 after:bg-foreground',
                      }}
                      size='sm'
                      marks={[
                        {
                          value: 0,
                          label: '0',
                        },
                        {
                          value: 0.5,
                          label: '50',
                        },
                        {
                          value: 1,
                          label: '100',
                        },
                      ]}
                    />
                  </Field>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='light' onPress={handleReset}>
                  Reset
                </Button>
                <Button
                  color='primary'
                  variant='faded'
                  isDisabled={isChanged()}
                  onPress={handleSave}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default Settings
