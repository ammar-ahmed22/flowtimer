import { createIcon } from '@chakra-ui/react'

const LogoIcon = createIcon({
  displayName: 'LogoIcon',
  viewBox: '0 0 400 400',
  path: [
    <circle
      cx='200'
      cy='200'
      r='190'
      fill='transparent'
      strokeWidth={20}
      stroke='currentColor'
    />,
    <path
      fill='currentColor'
      d='M195 20h10v40h-10zM195 340h10v40h-10zM294.33 353.385l-8.66 5-20-34.641 8.66-5zM134.33 76.257l-8.66 5-20-34.641 8.66-5zM358.385 285.67l-5 8.66-34.641-20 5-8.66zM81.256 125.67l-5 8.66-34.64-20 5-8.66zM353.385 105.67l5 8.66-34.641 20-5-8.66zM76.257 265.67l5 8.66-34.641 20-5-8.66zM285.67 41.615l8.66 5-20 34.641-8.66-5zM125.67 318.744l8.66 5-20 34.641-8.66-5zM380 195v10h-40v-10zM60 195v10H20v-10z'
    />,
    <circle cx='200' cy='200' r='25' fill='currentColor' />,
    <path fill='currentColor' d='M195 81h10v100h-10z' />,
  ],
})

export default LogoIcon
