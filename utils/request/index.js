import Request from './request'
import { getCurrentPageUrl } from '@/utils/utils.js'
const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {}

const http = new Request()
http.setConfig(config => {
  /* 设置全局配置 */
  let templateIds = extConfig.templateId
  if (extConfig.templateId <= 161) {
    templateIds = 69
  } else {
    templateIds = extConfig.templateId //69
  }
 
  config.header = {
    //corpId: extConfig.corpId,
    version: 'v1',
    templateId: templateIds, //线上templateId
    //'x-proxy-env': 'sit_ls'
    // templateId: extConfig.templateId     //本地templateId
  }
  return config
})

http.interceptor.request((config, cancel) => {
  debugger
  /* 请求之前拦截器 */
  // let newstore = uni.getStorageSync('newstore') || {}
  // let storeId = newstore.storeId // 优先取state
  let { token } = uni.getStorageSync('userInfo')
  config.header = {
    ...config.header
    // b: 1
  }
  // if (storeId && !config.data.storeId && !config.data.StoreId) {
  //   config.data.storeId = Number(storeId)
  // }
  if (token) {
    config.header.token = token
  }

  let accessToken = uni.getStorageSync("accessToken");

  if (accessToken) {
    config.header.Authorization = 'Bearer ' + accessToken
  }

  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  return config
})

http.interceptor.response(
  response => {
    /* 请求之后拦截器 */
    let that = this
    // let toLogin = getApp().globalData.toLogin
    if (response.data) {
      if (response.data.statusCode) {
        let txt = ''
        let curUrl = getCurrentPageUrl()
        switch (response.data.statusCode) {
          case 401:
            txt = '登录过期，请重新登录'
            break
        }

        uni.showToast({
          title: txt,
          icon: 'none',
          duration: 1500
        })
        //防止多次跳转登录页面，造成返回问题
        // if (getApp().globalData.isExpired) {
        //   return response
        // }

        if (response.data.statusCode === 401) {
          getApp().globalData.isExpired = true
          setTimeout(function () {
            getApp().globalData.isLogin = false

            var pages = getCurrentPages()
            var page = pages[pages.length - 1]
            if (page && page.route === 'pages/login/login') {
              return response
            }
            uni.navigateTo({
              url: `/pages/login/login?curUrl=${curUrl}`
            })
          }, 1500)
        }
        return response
      }
    }
    return response
  },
  response => {
    // 请求错误做点什么
    return response
  }
)

export { http }
