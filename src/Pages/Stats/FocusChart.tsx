import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Bar,
  Tooltip,
  TooltipProps,
} from 'recharts'
import type { FocusSession } from '../../context'
import colors from 'tailwindcss/colors'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Calendar,
} from '@nextui-org/react'
import { twelveHour, todayNow, startOfDay, endOfDay } from '../../utils/time'
import { getFocusByHour, getDateBounds } from '../../utils/stats'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'
import { CalendarDateTime, getLocalTimeZone } from '@internationalized/date'

export function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    return (
      <Card className='px-4 py-2'>
        <p className='text-xs font-bold'>
          {twelveHour(label)} to {twelveHour(label + 1)}
        </p>
        <p className='text-xs'>{payload[0].value} minutes</p>
      </Card>
    )
  }
  return <div></div>
}

export type FocusChartProps = {
  sessions: FocusSession[]
  date: CalendarDateTime
  setDate: React.Dispatch<React.SetStateAction<CalendarDateTime>>
  className?: string
}

export default function FocusChart({
  sessions,
  className,
  date,
  setDate,
}: FocusChartProps) {
  const formatOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
  let [minDate, maxDate] = getDateBounds(sessions)
  maxDate =
    maxDate && maxDate.compare(todayNow()) < 0 ? todayNow() : maxDate ?? date

  return (
    <Card className={className}>
      <CardHeader>
        <div className='flex justify-center gap-2 w-full items-center'>
          <Button
            isIconOnly
            variant='light'
            color='default'
            isDisabled={
              date.subtract({ days: 1 }).compare(startOfDay(minDate)) < 0
            }
            onPress={() => {
              setDate((prev) => prev.subtract({ days: 1 }))
            }}
          >
            <ChevronLeftIcon className='size-5' />
          </Button>
          <Popover placement='bottom'>
            <PopoverTrigger>
              <Button variant='light' size='lg' className='font-bold'>
                {date
                  .toDate(getLocalTimeZone())
                  .toLocaleDateString('en-US', formatOptions)}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                value={date}
                onChange={setDate}
                minValue={minDate}
                maxValue={maxDate}
              />
            </PopoverContent>
          </Popover>
          <Button
            isIconOnly
            variant='light'
            color='default'
            isDisabled={date.add({ days: 1 }).compare(endOfDay(maxDate)) > 0}
            onPress={() => {
              setDate((prev) => prev.add({ days: 1 }))
            }}
          >
            <ChevronRightIcon className='size-5' />
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer height={300} className='text-primary/90'>
          <BarChart
            data={getFocusByHour(sessions, date, {
              minutes: true,
              precision: 1,
            })}
            margin={{ top: 20, right: 30, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke={colors.gray[700]} />
            <XAxis
              dataKey='hour'
              interval={2}
              tickFormatter={(value: number, index) => {
                return twelveHour(value)
              }}
              tick={{ fontSize: '12px' }}
            >
              <Label
                value='Hour'
                offset={-10}
                position='insideBottom'
                style={{ fontSize: '12px' }}
              />
            </XAxis>
            <YAxis domain={[0, 60]} tick={{ fontSize: '12px' }}>
              <Label
                value='Minutes'
                angle={-90}
                position='insideLeft'
                style={{ textAnchor: 'middle', fontSize: '12px' }}
              />
            </YAxis>
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: 'hsl(var(--flowtimer-primary) / 0.5',
                strokeWidth: 2,
                fill: 'rgba(0, 0, 0, 0)',
              }}
            />

            <Bar dataKey='Focus Time' fill='currentColor' />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  )
}
