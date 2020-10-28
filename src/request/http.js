/*
 * @Author: web_XL
 * @Date: 2020-10-27 15:26:20
 * @LastEditors: web_XL
 * @LastEditTime: 2020-10-27 17:31:32
 * @Description: 
 */
/** axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from "axios"
import { Toast } from "vant"
// import router from "../router/index"

import { getCookie, getSingQuery } from "@/utils/common"



// 环境的切换
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = process.env.VUE_APP_BASE_API
} else if (process.env.NODE_ENV === "debug") {
  axios.defaults.baseURL = ""
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = `${window.location.protocol}//${window.location.host}/`
}

// 请求超时时间
axios.defaults.timeout = 1000 * 40

// post请求头
axios.defaults.headers.post["Content-Type"] =
  "application-json"

// 请求拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  // Do something with request error
  error => Promise.reject(error)
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    }
    return Promise.reject(response)
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      console.log("error.response", error.response)
      switch (error.response.status) {
        case 500:
          Toast({
            message: "服务器异常",
            duration: 1000,
            forbidClick: true
          })
          // setTimeout(() => {
          //   router.push({
          //     path: "/ExceptionStates/服务器异常/请重新扫码"
          //   })
          // }, 1000)
          break

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        // case 403:
        //   Toast({
        //     message: '登录过期，请重新登录',
        //     duration: 1000,
        //     forbidClick: true,
        //   })
        //   // 清除token
        //   localStorage.removeItem('token')
        //   store.commit('loginSuccess', null)
        //   // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        //   setTimeout(() => {
        //     router.replace({
        //       path: '/login',
        //       query: {
        //         redirect: router.currentRoute.fullPath,
        //       },
        //     })
        //   }, 1000)
        //   break

        // 其他错误，直接抛出错误提示
        default:
          Toast({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true
          })
      }
      return Promise.reject(error.response)
    }
  }
)
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function ApiGet (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function Api (url, params = {}, needErr = true) {// needErr 是否需要错误提示

  let formData = getSingQuery(params)
  // formData
  return new Promise((resolve, reject) => {
    axios
      .post(url, formData)
      .then(res => {
        console.log(res)
        if (res.data.status === 0) {
          resolve(res.data)
        } else {
          if (needErr) {
            Toast({
              message: res.data.msg,
              duration: 1000,
              forbidClick: true
            })
          }
          reject(res.data)
        }
        resolve(res.data)
      })
      .catch(err => {
        console.log("err", err)
        reject(err.data)
      })
  })
}


