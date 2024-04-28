export type UseJSONLocalStorageResponse<T = any> = [
  () => T | null,
  (value: T) => void,
  () => void,
  () => boolean,
]
// {
//   get: () => T | null,
//   set: (value: T) => void,
//   remove: () => void,
//   has: () => boolean
// }

export function useJSONLocalStorage<T = any>(
  key: string,
): UseJSONLocalStorageResponse<T> {
  const get = () => {
    const result = localStorage.getItem(key)
    if (!result) return null
    return JSON.parse(result) as T
  }

  const set = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const remove = () => {
    localStorage.removeItem(key)
  }

  const has = () => {
    const result = localStorage.getItem(key)
    if (result) return true
    return false
  }

  return [get, set, remove, has]
  // {
  //   get,
  //   set,
  //   remove,
  //   has
  // }
}
