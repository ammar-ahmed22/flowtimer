import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useJSONLocalStorage } from '../../hooks/storage'
import type { FocusSession } from '../../context'
import FocusChart from './FocusChart'
import { Select, SelectItem } from '@nextui-org/react'
import KPICard from './KPICard'
import HeatMap from './HeatMap'
import { getKPIs, getKPIChange } from '../../utils/stats'
import {
  todayNow,
  startOfDay,
  endOfDay,
  toLocaleDateString,
} from '../../utils/time'
import { CalendarDateTime } from '@internationalized/date'

const RANGE_FILTERS = ['daily', 'weekly', 'monthly'] as const

type RangeFilter = (typeof RANGE_FILTERS)[number]
type RangeFilterMetadata = {
  current: string
  compare: string
  range: [CalendarDateTime, CalendarDateTime]
  compareRange: [CalendarDateTime, CalendarDateTime]
}

type RangeFilterMap = {
  [K in RangeFilter]: RangeFilterMetadata
}

export default function Stats() {
  const [getSessions] =
    useJSONLocalStorage<FocusSession[]>('flowtimer-sessions')
  const [sessions] = useState(getSessions() ?? [])
  const filters = RANGE_FILTERS.map((item) => {
    return {
      key: item,
      label: item[0].toUpperCase() + item.slice(1),
    }
  })
  const [filter, setFilter] = useState<RangeFilter>('daily')
  const [date, setDate] = useState(todayNow())
  const filterMap: RangeFilterMap = useMemo(() => ({
    daily: {
      current: 'today',
      compare: 'yesterday',
      range: [startOfDay(date), endOfDay(date)],
      compareRange: [
        startOfDay(date.subtract({ days: 1 })),
        endOfDay(date.subtract({ days: 1 })),
      ],
    },
    weekly: {
      current: 'this week',
      compare: 'last week',
      range: [startOfDay(date), endOfDay(date.add({ weeks: 1 }))],
      compareRange: [startOfDay(date.subtract({ weeks: 1 })), startOfDay(date)],
    },
    monthly: {
      current: 'this month',
      compare: 'last month',
      range: [startOfDay(date), endOfDay(date.add({ months: 1 }))],
      compareRange: [
        startOfDay(date.subtract({ months: 1 })),
        startOfDay(date),
      ],
    },
  }), [date])

  const { average, total, max } = useMemo(() => getKPIs(sessions, filterMap[filter].range, {
    minutes: true,
    precision: 1,
  }), [sessions, filter, filterMap])
  const kpiChange = useMemo(() => getKPIChange(
    sessions,
    filterMap[filter].range,
    filterMap[filter].compareRange,
    { minutes: true, precision: 1 },
  ), [sessions, filter, filterMap])

  const kpis = [
    {
      type: 'Total',
      value: total,
      change: kpiChange.total,
    },
    {
      type: 'Average',
      value: average,
      change: kpiChange.average,
    },
    {
      type: 'Longest',
      value: max,
      change: kpiChange.max,
    },
  ]

  const formatOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }

  return (
    <div className='max-w-3xl md:px-0 px-5 min-h-screen relative mx-auto'>
      <Header />
      <div className='grid grid-cols-4 gap-2 mb-2'>
        <div className='flex flex-col gap-2 h-full'>
          <Select
            selectedKeys={[filter]}
            onChange={(e) => {
              setFilter(e.target.value as RangeFilter)
            }}
            variant='bordered'
          >
            {filters.map((filter) => {
              return <SelectItem key={filter.key}>{filter.label}</SelectItem>
            })}
          </Select>
          <div className='flex items-center gap-1 text-default-500 text-xs px-2'>
            <p>
              {filter === 'daily' &&
                toLocaleDateString(date, 'en-US', formatOptions)}
              {filter !== 'daily' && (
                <>
                  {toLocaleDateString(
                    filterMap[filter].range[0],
                    'en-US',
                    formatOptions,
                  )}
                  {' - '}
                  {toLocaleDateString(
                    filterMap[filter].range[1],
                    'en-US',
                    formatOptions,
                  )}
                </>
              )}
            </p>
          </div>
          {kpis.map((kpi) => {
            return (
              <KPICard
                key={`kpi-${kpi.type}`}
                label={`${kpi.type} focus time ${filterMap[filter].current}`}
                value={
                  <>
                    {isNaN(kpi.value) ? 0 : kpi.value}{' '}
                    <span className='text-xs text-default-500 font-normal'>
                      mins
                    </span>
                  </>
                }
                increase={kpi.change >= 0 ? kpi.change : undefined}
                decrease={kpi.change < 0 ? kpi.change : undefined}
                changeLabel={
                  <p className='text-default-500 text-tiny'>
                    from {filterMap[filter].compare}
                  </p>
                }
              />
            )
          })}
        </div>
        <FocusChart
          sessions={sessions}
          className='p-2 col-span-3'
          date={date}
          setDate={setDate}
        />
      </div>
      <HeatMap sessions={sessions} />
      <Footer />
    </div>
  )
}
