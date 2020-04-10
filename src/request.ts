/**
 * 处理入口
 */
import { RequestConfig } from './types'
import initHandler from './modules'
import axios from 'axios'

export default {
  install(Vue: any) {
    initHandler(Vue)
    // 绑定axios
    Vue.ajax = Vue.prototype.$ajax = axios

    // 添加rest-api方法
    Vue.rest = Vue.prototype.$rest = {
      request(config: RequestConfig) {
        return axios.request(config)
      },
      get(path: string, config: RequestConfig) {
        return axios.get(path, config)
      },
      post(path: string, data: object, config: RequestConfig) {
        return axios.post(path, data, config)
      },
      put(path: string, data: object, config: RequestConfig) {
        return axios.put(path, data, config)
      },
      delete(path: string, config: RequestConfig) {
        return axios.delete(path, config)
      },
    }
  },
}
