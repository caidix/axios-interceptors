// import { RequestConfig } from '../types'
// import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
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