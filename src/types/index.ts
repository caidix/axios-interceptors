import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
export interface RequestConfig extends AxiosRequestConfig {
  // 是否调用元素定义上的loading？
  loading?: boolean
  loadingTip?: string
  curloading?: boolean
  debounce?: boolean
  tipErr?: boolean
  handleError?: boolean
}

export interface DebounceQueue {
  url: string
  method: string
  params: object
  data: object
}

export interface HandlerFunction {
  requestResolve?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  requestReject?: (error: any) => any
  responseResolve?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
  responseReject?: (error: any) => any
}

export type Handler = (Vue?: any) => HandlerFunction
