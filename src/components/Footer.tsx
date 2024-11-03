import { Button } from '@nextui-org/react'
import BMCIcon from './BMCIcon'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
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
      <div className='flex gap-2 justify-center'>
        <Button size='sm' color='primary' as={Link} to='/app'>
          Get started
        </Button>
        <Button
          startContent={<BMCIcon height={12} />}
          as='a'
          href='https://buymeacoffee.com/ammar.ahmed'
          target='_blank'
          size='sm'
          color='primary'
          variant='bordered'
        >
          Buy me a coffee
        </Button>
      </div>
      <p className='text-sm text-default-400 text-center font-thin'>
        © Flowtimer 2024. All Rights Reserved.
      </p>
    </footer>
  )
}
