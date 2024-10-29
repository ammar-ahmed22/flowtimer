/* eslint-disable no-restricted-globals */
export type MessageData = {
  control: 'start' | 'stop' | 'reset'
  elapsed: number
}
const workerFunction = function () {
  self.onmessage = (event: MessageEvent<MessageData>) => {
    const { data } = event
    let IID
    let elapsed = 0
    if (data.control === 'start') {
      elapsed = data.elapsed
      IID = setInterval(() => {
        elapsed++
        postMessage(elapsed)
      }, 1000)
    } else if (data.control === 'stop') {
      clearInterval(IID)
    } else if (data.control === 'reset') {
      clearInterval(IID)
      elapsed = 0
    }
  }
}

const codeStr = workerFunction.toString()
const mainCode = codeStr.substring(
  codeStr.indexOf('{') + 1,
  codeStr.lastIndexOf('}'),
)

const blob = new Blob([mainCode], { type: 'application/javascript' })

const timerWorker = URL.createObjectURL(blob)
export default timerWorker
