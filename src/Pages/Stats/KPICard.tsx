import { Card, Chip } from '@nextui-org/react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

export type KPICardProps = {
  label: React.ReactNode
  value: React.ReactNode
  increase?: number
  decrease?: number
  changeLabel?: React.ReactNode
}

export default function KPICard({
  label,
  value,
  increase,
  decrease,
  changeLabel,
}: KPICardProps) {
  if (increase && decrease) {
    throw new Error('must provide only 1 of `increase` or `decrease`!')
  }

  return (
    <Card className='p-4 grow flex flex-col'>
      <div>
        <p className='text-xs text-default-500'>{label}</p>
        <p className='text-xl font-bold mb-2'>{value}</p>
        <div className='flex gap-1 items-center'>
          {increase !== undefined && !isNaN(increase) && isFinite(increase) && (
            <>
              <Chip
                startContent={<ChevronUpIcon className='size-3' />}
                color='success'
                radius='sm'
                variant='light'
                size='sm'
              >
                {increase}%
              </Chip>
              {changeLabel}
            </>
          )}
          {decrease !== undefined && !isNaN(decrease) && isFinite(decrease) && (
            <>
              <Chip
                startContent={<ChevronDownIcon className='size-3' />}
                color='danger'
                radius='sm'
                variant='light'
                size='sm'
              >
                {decrease}%
              </Chip>
              {changeLabel}
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
