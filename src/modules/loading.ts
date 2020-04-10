import { RequestConfig } from '../types'
import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
const loadingHandler = (Vue: any) => {
  function showLoading(config: AxiosRequestConfig) {
    const { loading, curloading, loadingTip } = config as RequestConfig
    if (loading && Vue.prototype.$loading) {
      // 饿了吗的loading层是单例，不需要做loading框的存储
      Vue.prototype.$loading({
        // 声明一个loading对象
        lock: true, // 是否锁屏
        text: '正在加载...', // 加载动画的文字
        spinner: 'el-icon-loading', // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.3)', // 背景颜色
        // target: '.sub-main',                    // 需要遮罩的区域
        body: true,
        customClass: 'mask', // 遮罩层新增类名
      })
    }
  }
  function hideLoading(response: AxiosResponse | AxiosError) {
    const config = (response.config as RequestConfig) || {}
    if (config.curloading) {
      Vue.nextTick(() => {
        config.curloading = false
        Vue.prototype.$loading.close()
      })
    }
  }
  return {
    requestResolve: showLoading,
    responseResolve: (response: AxiosResponse) => {
      hideLoading(response)
      return response
    },
    responseReject: (error: AxiosError) => {
      hideLoading(error)
      return Promise.reject(error)
    },
  }
}
export default loadingHandler

// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { message, Spin } from 'antd';
// // 正在请求数量
// let requestCount = 0;
// const loadingHandler = () => {
//   function showLoading(config: AxiosRequestConfig) {
//     const { loading, curloading, loadingTip } = config as RequestConfig;
//     if (loading && requestCount === 0) {
//       let dom = document.createElement('div')
//       dom.setAttribute('id', 'axios-loading')
//       document.body.appendChild(dom)
//       curloading ? curloading : '加载中...';
//       ReactDOM.render(<Spin tip=`${curloading}` size = "large" />, dom)
//     }
//     requestCount++
//   }

//   function hideLoading(response: AxiosResponse | AxiosError) {
//     const config = (response.config as RequestConfig) || {};
//     if (!config.curloading) return;
//     requestCount--
//     if (requestCount === 0) {
//       document.body.removeChild(document.getElementById('axios-loading'))
//     }
//   }
//   return {
//     requestResolve: showLoading,
//     responseResolve: (response: AxiosResponse) => {
//       hideLoading(response);
//       return response;
//     },
//     responseReject: (error: AxiosError) => {
//       hideLoading(error);
//       return Promise.reject(error);
//     }
//   }
// }
