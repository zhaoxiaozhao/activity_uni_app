import { rootUrl } from '@/api/base.js'
import { http } from '@/utils/request/index.js'

//全局登录
export const registerMember = param => http.post(`${rootUrl}/Member/RegisterMember`, { ...param }) //注册会员
export const getLoginUserInfo = param => http.post(`${rootUrl}/Member/GetLoginUserInfo`, { ...param }) //获取用户登录信息
export const registerWxUser = param => http.post(`${rootUrl}/Member/RegisterWxUser`, { ...param }) //新注册会员
export const WxLogin = param => http.post(`${rootUrl}/app/Wx-User/Login`, { ...param }) //新登录
export const upload = param => http.post(`${rootUrl}/app/File/Upload`, { ...param })


