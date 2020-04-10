import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import loadingHandler from './loading'
import codeHandler from './code'
import cancelHandler from './cancel'
import debounceHandler from './debounce'
import { HandlerFunction, Handler } from '../types'
const handlers: Handler[] = [debounceHandler, codeHandler, loadingHandler, cancelHandler]
function normalRequestResolve(config: AxiosRequestConfig) {
  return config
}

function normalResponseResolve(response: AxiosResponse) {
  return response
}

function normalReject(error: AxiosError) {
  return Promise.reject(error)
}

const initHandler = (Vue: any) => {
  handlers.forEach((handler: Handler) => {
    const handlerContext: HandlerFunction = handler(Vue)
    const {
      requestResolve = normalRequestResolve,
      requestReject = normalReject,
      responseResolve = normalResponseResolve,
      responseReject = normalReject,
    } = handlerContext
    axios.interceptors.request.use(requestResolve, requestReject)
    axios.interceptors.response.use(responseResolve, responseReject)
  })
}

export default initHandler
