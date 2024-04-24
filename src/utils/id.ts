export const uuid = () => {
  const random = Math.floor(Math.random() * 1000)
  const id = Date.now().toString() + random.toString()
  return id
}
