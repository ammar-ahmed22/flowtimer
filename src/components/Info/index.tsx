import React from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { textGradient } from '../../utils/classes'
import {
  ClockIcon,
  ClipboardDocumentCheckIcon,
  BellSnoozeIcon,
  MusicalNoteIcon,
} from '@heroicons/react/24/outline'

const Info: React.FC = () => {
  const grad = textGradient(
    'primary-600',
    'primary-800',
    'b',
    'primary-300',
    'primary-600',
  )

  const features = [
    {
      heading: 'Track work time',
      description:
        'Use the stopwatch to monitor your focused work sessions and stay productive during each Flowmodoro interval.',
      icon: ClockIcon,
    },
    {
      heading: 'Timed break intervals',
      description:
        "Your breaks are automatically calculated based on the time you've worked, helping you relax and recharge efficiently.",
      icon: BellSnoozeIcon,
    },
    {
      heading: 'Organize your tasks',
      description:
        'Manage your tasks with ease, checking off items as you go to stay on track and achieve your goals.',
      icon: ClipboardDocumentCheckIcon,
    },
    {
      heading: 'Play music',
      description:
        'Search for and play music from YouTube directly in the app to maintain your focus and keep the momentum going while you work.',
      icon: MusicalNoteIcon,
    },
  ]
  return (
    <div
      id='info'
      className='max-w-3xl mx-auto md:text-md text-sm text-default-500 min-h-screen'
    >
      <section className='pb-8'>
        <h1 className='md:text-3xl text-xl text-foreground font-extrabold tracking-tight text-center'>
          <span className={grad}>Flowtimer:</span> Pomodoro, Reinvented.
        </h1>
        <p className='text-center'>
          Maximize productivity by working in your{' '}
          <strong className='text-foreground'>flow state</strong>. Flowtimer
          lets you work without time limits, calculating breaks as a ratio of
          time worked, rewarding longer focus sessions. We call it the{' '}
          <strong className='text-foreground'>Flowmodoro technique</strong>.
        </p>
      </section>
      <section className='pb-4 grid md:grid-cols-2 grid-cols-1 gap-4 mb-4 items-center'>
        <div>
          <h2 className='md:text-2xl text-lg text-foreground font-extrabold tracking-tight'>
            <span className={grad}>What.</span>
          </h2>
          <p>
            Flowmodoro{' '}
            <strong className='text-foreground'>
              adapts the Pomodoro technique
            </strong>{' '}
            by allowing you to work as long as you're in the zone.{' '}
            <strong className='text-foreground'>Breaks</strong> are calculated
            as a{' '}
            <strong className='text-foreground'>
              fraction of your work time
            </strong>{' '}
            (1/5 by default). For example,{' '}
            <strong className='text-foreground'>work for 1 hour</strong> and
            take a <strong className='text-foreground'>12-minute break</strong>.
          </p>
        </div>
        <div>
          <h2 className='md:text-2xl text-lg text-foreground font-extrabold tracking-tight'>
            <span className={grad}>Why.</span>
          </h2>
          <p>
            While{' '}
            <strong className='text-foreground'>
              Pomodoro sets strict intervals
            </strong>{' '}
            (usually 25 minutes of work), Flowmodoro removes that limitation, so
            your{' '}
            <strong className='text-foreground'>
              flow state is uninterrupted.
            </strong>{' '}
            Enjoy extended focus sessions and break rewards proportional to your
            effort.
          </p>
        </div>
      </section>

      <section className='pb-4'>
        <h2
          className={
            'md:text-2xl text-lg font-extrabold tracking-tight ' + grad
          }
        >
          Features.
        </h2>
        <div className='grid md:grid-cols-2 grid-cols-1 mt-4 gap-4'>
          {/* <Card className='p-2'>
            <CardHeader
              className="flex gap-2 pb-0"
            >
              <div className="bg-primary-800/50 p-1 rounded-full">
              <ClockIcon className='size-5 text-primary' />
              </div>
              <h2 className="font-extrabold text-foreground tracking-tight">Track work time</h2>
            </CardHeader>
            <CardBody className='text-default-500' >
            Use the stopwatch to monitor your focused work sessions and stay productive during each Flowmodoro interval.
            </CardBody>
          </Card> */}
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.heading} className='p-2'>
                <CardHeader className='flex gap-2 pb-0'>
                  <div className='bg-primary-800/50 p-1 rounded-full'>
                    <Icon className='size-5 text-primary' />
                  </div>
                  <h2 className='font-extrabold text-foreground tracking-tight'>
                    {feature.heading}
                  </h2>
                </CardHeader>
                <CardBody className='text-default-500'>
                  {feature.description}
                </CardBody>
              </Card>
            )
          })}
          {/* <Card className='p-2'>
            <CardHeader
              className="flex gap-4"
            >
              <BellSnoozeIcon className='size-5 text-primary' />
              <h2 className="font-extrabold text-foreground tracking-tight">Timed break intervals</h2>
            </CardHeader>
            <CardBody className='text-default-500' >
            Your breaks are automatically calculated based on the time you've worked, helping you relax and recharge efficiently.
            </CardBody>
          </Card>
          <Card className='p-2'>
            <CardHeader
              className="flex gap-4"
            >
              <ClipboardDocumentCheckIcon className='size-5 text-primary' />
              <h2 className="font-extrabold text-foreground tracking-tight">Organize your tasks</h2>
            </CardHeader>
            <CardBody className='text-default-500' >
            Manage your tasks with ease, checking off items as you go to stay on track and achieve your goals.
            </CardBody>
          </Card>
          <Card className='p-2'>
            <CardHeader
              className="flex gap-4"
            >
              <MusicalNoteIcon className='size-5 text-primary' />
              <h2 className="font-extrabold text-foreground tracking-tight"> Play music</h2>
            </CardHeader>
            <CardBody className='text-default-500' >
            Search for and play music from YouTube directly in the app to maintain your focus and keep the momentum going while you work.
            </CardBody>
          </Card> */}
        </div>
      </section>
    </div>
  )
}

export default Info
