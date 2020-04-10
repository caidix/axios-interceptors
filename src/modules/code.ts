/**
 * default handle errorCode page
 */
import { AxiosResponse, AxiosError } from 'axios'
import { RequestConfig } from '../types'
const codeHandler = (Vue: any) => {
  return {
    responseResolve(response: AxiosResponse) {
      const data = response.data || {}
      const config: RequestConfig = response.config || {}
      if (config.tipErr && data.code !== 0) {
        return Vue.prototype.$notify.error({
          title: '错误',
          message: data.message || '服务器响应出错',
        })
      }
      return response
    },
    responseReject(error: AxiosError) {
      // 如果配置设置自己处理异常, 就直接 reject
      const config = error.config as RequestConfig
      if (config && config.handleError) {
        return Promise.reject(error)
      }
      let promise = Promise.resolve()
      if (!error.response) {
        // 极端情况下
        Vue.prototype.$notify.error({
          title: '错误',
          message: error.message || '请求发生错误, 请稍后再试',
        })
      }
      const { status = 0, data = {}, headers = {}, request = {} } = error.response as AxiosResponse
      if (status === 422) {
        Vue.prototype.$notify.error({
          title: '错误',
          message: '参数错误',
        })
      // } else if (status === 401) {
      // } else if (status === 403) {
      // } else if (status === 413) {
      // } else if (status === 501) {
      } else if (status >= 400) {
        Vue.prototype.$notify.error({
          title: '请求错误',
          message: data.message || (status === 404 ? '请求资源未找到' : '请求发生错误, 请稍后再试'),
        })
      } else {
        promise = Promise.resolve()
      }
      return promise.then(() => {
        const response = error.response
        return {
          data: {
            code: response ? response.status : -1,
          },
        }
      })
    },
  }
}

export default codeHandler
