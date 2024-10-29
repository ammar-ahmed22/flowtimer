import React from 'react'
import Header from '../../components/Header'
import { textGradient } from '../../utils/classes'
import { Button, Image, Divider } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import {
  ChevronDoubleDownIcon,
  ClockIcon,
  BellSnoozeIcon,
  ClipboardDocumentCheckIcon,
  MusicalNoteIcon,
} from '@heroicons/react/24/outline'
import BMCIcon from '../../components/BMCIcon'
import { useThemeValue } from '../../hooks/theme'
import heroDark from '../../assets/images/hero_dark.png'
import heroLight from '../../assets/images/hero_light.png'
import workDark from '../../assets/images/work_dark.png'
import workLight from '../../assets/images/work_light.png'
import breakDark from '../../assets/images/break_dark.png'
import breakLight from '../../assets/images/break_light.png'
import taskDark from '../../assets/images/task_dark.png'
import taskLight from '../../assets/images/task_light.png'
import musicDark from '../../assets/images/music_dark.png'
import musicLight from '../../assets/images/music_light.png'

const Landing: React.FC = () => {
  const grad = textGradient(
    'primary-600',
    'primary-800',
    'b',
    'primary-300',
    'primary-600',
  )
  const heroImage = useThemeValue(heroLight, heroDark)
  const workImage = useThemeValue(workLight, workDark)
  const breakImage = useThemeValue(breakLight, breakDark)
  const taskImage = useThemeValue(taskLight, taskDark)
  const musicImage = useThemeValue(musicLight, musicDark)
  const features = [
    {
      heading: 'Track work time',
      description:
        'Use the stopwatch to monitor your focused work sessions and stay productive during each Flowmodoro interval.',
      icon: ClockIcon,
      image: workImage,
    },
    {
      heading: 'Timed break intervals',
      description:
        "Your breaks are automatically calculated based on the time you've worked, helping you relax and recharge efficiently.",
      icon: BellSnoozeIcon,
      image: breakImage,
    },
    {
      heading: 'Organize your tasks',
      description:
        'Manage your tasks with ease, checking off items as you go to stay on track and achieve your goals.',
      icon: ClipboardDocumentCheckIcon,
      image: taskImage,
    },
    {
      heading: 'Play music',
      description:
        'Search for and play music from YouTube directly in the app to maintain your focus and keep the momentum going while you work.',
      icon: MusicalNoteIcon,
      image: musicImage,
    },
  ]

  return (
    <div className='max-w-3xl px-4 mx-auto md:text-md text-sm text-default-500 min-h-screen'>
      <Header hideSettings hideAudio />
      <section className='pb-8 h-[90vh] flex items-center relative'>
        <div>
          <h1 className='md:text-3xl text-xl text-foreground font-extrabold tracking-tight mb-2'>
            <span className={grad}>Flowtimer:</span> Pomodoro, Reinvented.
          </h1>
          <p className='mb-4'>
            Maximize productivity with Flowtimer. Work without time limits, with
            breaks calculated as a ratio of your focused sessions.
          </p>
          <div className='flex gap-2'>
            <Button color='primary' as={Link} to='/app'>
              Get started
            </Button>
            <Button variant='bordered'>GitHub</Button>
          </div>
        </div>
        <Image src={heroImage} />
        <a
          href='#info'
          className='animate-bounce absolute bottom-0 left-1/2 translate-x-[-50%]'
        >
          <ChevronDoubleDownIcon className='size-8 text-foreground' />
        </a>
      </section>
      <div id='info' className='min-h-screen mt-12'>
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
              take a{' '}
              <strong className='text-foreground'>12-minute break</strong>.
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
              (usually 25 minutes of work), Flowmodoro removes that limitation,
              so your{' '}
              <strong className='text-foreground'>
                flow state is uninterrupted.
              </strong>{' '}
              Enjoy extended focus sessions and break rewards proportional to
              your effort.
            </p>
          </div>
        </section>

        <section className='pb-4'>
          <div className='flex justify-start'>
            <h2
              className={
                'md:text-2xl text-lg font-extrabold tracking-tight text-center ' +
                grad
              }
            >
              Features.
            </h2>
          </div>
          <div className='flex flex-col mt-0 gap-12'>
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.heading}
                  className={`flex min-h-[50vh] gap-4 justify-center flex-col items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className='p-2'>
                    <div className='flex gap-2 pb-2'>
                      <div className='dark:bg-primary-800/50 bg-primary-400/50 p-1 rounded-full'>
                        <Icon className='size-6 text-primary' />
                      </div>
                      <h2 className='font-extrabold text-lg text-foreground tracking-tight whitespace-nowrap'>
                        {feature.heading}
                      </h2>
                    </div>
                    <div className='text-default-500'>
                      <p>{feature.description}</p>
                    </div>
                  </div>

                  <Image
                    src={feature.image}
                    classNames={{ wrapper: 'w-[80%] md:w-[unset]' }}
                  />
                  <Divider className='md:hidden block' />
                </div>
              )
            })}
          </div>
        </section>
        <footer className='relative flex flex-col justify-center items-center py-12 gap-4'>
          <div className='absolute w-screen h-[1px] bg-primary-300/50 top-0 left-1/2 translate-x-[-50%]'></div>
          <p className='text-center'>
            Made with 🧠 by{' '}
            <a
              href='https://ammarahmed.ca'
              className='hover:underline text-primary'
            >
              Ammar
            </a>
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              size="sm"
              color="primary"
              as={Link}
              to="/app"
            >Get started</Button>
            <Button
              startContent={<BMCIcon height={12} />}
              as="a"
              href="https://buymeacoffee.com/ammar.ahmed"
              target="_blank"
              size="sm"
              color="primary"
              variant="bordered"
            >Buy me a coffee</Button>
          </div>
          <p className='text-sm text-default-400 text-center font-thin'>
            © Flowtimer 2024. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Landing
