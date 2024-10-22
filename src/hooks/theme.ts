import { useContext } from 'react'
import { ThemeContext } from '../context/theme'

export function useThemeValue<T>(light: T, dark: T): T {
  const { theme } = useContext(ThemeContext)
  return theme === 'light' ? light : dark
}
