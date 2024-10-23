export const decodeHTML = (html: string) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export const createRequestURL = (
  baseURL: string,
  params: Record<string, any>,
) => {
  const url = new URL(baseURL)
  for (let key of Object.keys(params)) {
    console.log(key, params[key])
    url.searchParams.set(key, params[key])
  }
  return url.toString()
}
