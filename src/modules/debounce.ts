import axios, { AxiosRequestConfig } from 'axios'
import { DebounceQueue, RequestConfig } from '../types/index'
class Queue {
  delay: number
  queue: DebounceQueue[]
  constructor(delay = 500) {
    this.delay = delay
    this.queue = []
  }
  push(url: string, method: string, params: object, data: object) {
    this.queue.push({
      url,
      method,
      params,
      data,
    })
  }
  pop(url: string, method: string) {
    const query = this.queue.find((item: DebounceQueue) => {
      return url === item.url && method === item.method
    })
    if (query) this.queue.splice(this.queue.indexOf(query), 1)
  }
  exists(url: string, method: string) {
    return this.queue.some((item: DebounceQueue) => {
      return url === item.url && method === item.method
    })
  }
}

const queue = new Queue()
const { CancelToken } = axios
const source = CancelToken.source()
const debounceHandler = () => {
  return {
    async requestResolve(config: AxiosRequestConfig) {
      const { debounce = true } = config as RequestConfig
      if (debounce) {
        const { url, method, params, data } = config as RequestConfig
        if (!queue.exists(url!, method!)) {
          queue.push(url!, method!, params, data)
        } else {
          config.cancelToken = source.token
          source.cancel('cancel request because of debounce!')
        }
      }
      return config
    },
  }
}

export default debounceHandler
