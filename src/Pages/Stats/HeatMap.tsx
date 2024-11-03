import { useMemo } from 'react'
import { Card, Tooltip } from '@nextui-org/react'
import { todayNow, toLocaleDateString, startOfDay, endOfDay } from '../../utils/time'
import { CalendarDateTime, getLocalTimeZone } from '@internationalized/date'
import { getKPIs, dailyFocusTimeBounds } from '../../utils/stats'
import { normalize } from '../../utils/math'
import { FocusSession } from '../../context'

export type HeatMapProps = {
  sessions: FocusSession[]
}

export default function HeatMap({ sessions } : HeatMapProps) {
  const dates = Array.from({ length: 364 }, (_, index) => {
    const today = startOfDay(todayNow())
    return today.subtract({ days: index })
  }).reverse()

  const columns: CalendarDateTime[][] = []
  for (let i = 0; i < dates.length; i += 7) {
    const chunk = dates.slice(i, i + 7)
    columns.push(chunk)
  }
  const formatOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }

  const displayDaysOfWeek = () => {
    const today = todayNow()
    const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
    const days: string[] = []
    for (let i = 0; i < 3; i++) {
      const curr = today.subtract({ days: 2 * i + 1 })
      days.push(formatter.format(curr.toDate(getLocalTimeZone())))
    }

    return days.reverse()
  }

  const [min, max] = useMemo(() => dailyFocusTimeBounds(sessions, dates), [sessions, dates]);

  return (
    <Card className='p-4 gap-2 mb-12'>
      <p className='font-bold'>Focus time throughout the year</p>

      <div className='flex flex-col gap-1'>
        <div className='flex'>
          <div  className='w-[calc(21.67px+0.25rem)]' />
          <div className='grid grid-cols-[repeat(12,minmax(0,1fr))] flex-grow'>
          {[
              'Nov',
              'Dec',
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
            ].map((month, idx) => {
              return (
                <p
                  key={`monthoftheyear-${idx}`}
                  className='text-tiny text-default-500'
                >
                  {month}
                </p>
              )
            })}
          </div>
        </div>
        <div className='flex gap-1'>
          <div className='grid grid-rows-7 text-tiny text-default-500 gap-1'>
          {displayDaysOfWeek().map((day) => {
            return (
              <div
                key={`dayofweek-${day}`}
                className='row-span-2 flex items-end'
              >
                <p   >{day}</p>
              </div>
            )
          })}
        </div>
          <div className='relative grid grid-cols-[repeat(52,minmax(0,1fr))] gap-1 flex-grow'>
            {columns.map((col, colIdx) => {
              return (
                <div
                  key={`heatmap-col-${colIdx}`}
                  className='flex flex-col gap-1'
                >
                  {col.map((item, rowIdx) => {
                    const { total: workTime } = getKPIs(sessions, [startOfDay(item), endOfDay(item)], { minutes: true, precision: 3 });
                    const mappedWorkTime = normalize(workTime, min, max);
                    return (
                      <Tooltip
                        key={`heatmap-square-${rowIdx}-${colIdx}`}
                        content={`${workTime.toFixed(0)} mins focused on ${toLocaleDateString(
                          item,
                          'en-US',
                          formatOptions,
                        )}`}
                      >
                        <div className='lg:size-2.5 md:size-2 size-1.5 rounded-sm' style={{ background: mappedWorkTime === 0 ? `hsl(var(--flowtimer-primary) / 0.1)` : `hsl(var(--flowtimer-primary) / ${mappedWorkTime})`}} />
                      </Tooltip>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Card>
  )
}
