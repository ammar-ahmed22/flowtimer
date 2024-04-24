import React, { useEffect, useState } from 'react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  useColorModeValue,
  Switch,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'
import type { InputInfo } from './InfoToast'
import InputContainer from './InputContainer'

type InputType = 'number' | 'text' | 'toggle' | 'select' | 'slider'

export type GenericInputProps = {
  label: React.ReactNode
  info?: InputInfo
}

export type InputProps<T extends InputType> = T extends 'number'
  ? GenericInputProps & {
      numberControl: {
        value: number
        onChange: (val: number) => void
        min?: number
        max?: number
        step?: number
        defaultValue?: number
      }
    }
  : T extends 'text'
    ? GenericInputProps & {
        textControl: { value: string; onChange: (val: string) => void }
      }
    : T extends 'toggle'
      ? GenericInputProps & {
          toggleControl: { value: boolean; onChange: (val: boolean) => void }
        }
      : T extends 'select'
        ? GenericInputProps & {
            selectControl: {
              options: string[]
              value: string
              onChange: (val: string) => void
              onBlur?: () => void
            }
          }
        : T extends 'slider'
          ? GenericInputProps & {
              sliderControl: {
                value: number
                onChange: (val: number) => void
                min?: number
                max?: number
                step?: number
                markValue?: number
              }
            }
          : never

const Input: React.FC<InputProps<InputType>> = ({ label, info, ...props }) => {
  const brandColor = useColorModeValue('brandPurple.600', 'brandPurple.200')
  const [value, setValue] = useState('')

  useEffect(() => {
    if ('numberControl' in props) {
      if (props.numberControl.defaultValue) {
        setValue(props.numberControl.defaultValue.toString())
      } else {
        setValue('0')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if ('numberControl' in props) {
    const { numberControl } = props
    const { min, max, step, onChange } = numberControl
    return (
      <InputContainer label={label} info={info}>
        <NumberInput
          size='sm'
          maxW={20}
          variant='brandFilled'
          value={value}
          onChange={(strVal, numVal) => {
            setValue(strVal)
            if (!isNaN(numVal)) onChange(numVal)
          }}
          min={min}
          max={max}
          step={step}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </InputContainer>
    )
  }

  if ('toggleControl' in props) {
    const { toggleControl } = props
    const { value, onChange } = toggleControl
    return (
      <InputContainer label={label} info={info}>
        <Switch
          colorScheme='brandPurple'
          isChecked={value}
          onChange={(e) => {
            onChange(e.target.checked)
          }}
        />
      </InputContainer>
    )
  }

  if ('selectControl' in props) {
    const { selectControl } = props
    const { options, value, onChange, onBlur } = selectControl
    return (
      <InputContainer label={label} info={info}>
        <Select
          w={'50%'}
          variant='brandFilled'
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          onBlur={onBlur}
        >
          {options.map((opt) => {
            return <option value={opt}>{opt}</option>
          })}
        </Select>
      </InputContainer>
    )
  }

  if ('sliderControl' in props) {
    const { sliderControl } = props
    const { value, onChange, min, max, step, markValue } = sliderControl
    return (
      <InputContainer label={label} info={info}>
        <Slider
          colorScheme='brandPurple'
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          w='50%'
        >
          <SliderMark
            value={0}
            top='50%'
            transform='translate(-100%, -50%)'
            fontSize='sm'
            fontWeight='bold'
            pr={3}
            color={brandColor}
          >
            {markValue !== undefined ? markValue : value}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </InputContainer>
    )
  }

  return <></>
}

export default Input
