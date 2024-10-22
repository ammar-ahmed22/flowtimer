import React from 'react'
import { textGradient } from '../../utils/classes'

const Info: React.FC = () => {
  const grad = textGradient(
    'primary-600',
    'primary-800',
    'b',
    'primary-300',
    'primary-600',
  )
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
      <section className='pb-4 grid md:grid-cols-2 grid-cols-1 gap-4'>
        <div>
          <h2 className='md:text-2xl text-lg text-foreground font-extrabold tracking-tight'>
            <span className={grad}>What.</span>
          </h2>
          <p>
            Flowmodoro{' '}
            <strong className='text-foreground'>
              adapts the Pomodoro technique
            </strong>{' '}
            by allowing you to work as long as you're in the zone. Breaks are
            calculated as a{' '}
            <strong className='text-foreground'>
              fraction of your work time
            </strong>{' '}
            (default ratio: 1/5). For example, work for 1 hour and take a
            12-minute break.
          </p>
        </div>
      </section>
      <section className='pb-4 grid md:grid-cols-2 grid-cols-1 gap-4'>
        <div></div>
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
          How.
        </h2>
      </section>
    </div>
  )
}

export default Info
