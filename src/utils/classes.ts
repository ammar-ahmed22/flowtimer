export const textGradient = (
  from: string,
  to: string,
  dir: string,
  darkFrom?: string,
  darkTo?: string,
) => {
  let classes = `text-transparent bg-gradient-to-${dir} inline bg-clip-text from-${from} to-${to}`
  if (darkFrom) classes += ` dark:from-${darkFrom}`
  if (darkTo) classes += ` dark:to-${darkTo}`

  return classes
}
