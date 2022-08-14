import { rootUrl } from '@/api/base.js'
import { http } from '@/utils/request/index.js'

//全局登录
export const uploadURL = `${rootUrl}/app/File/Upload`;
export const downloadURL = `${rootUrl}/app/File/download`
export const register = param => http.post(`${rootUrl}/app/Wx-User/Register`, { ...param })
export const login = param => http.post(`${rootUrl}/app/Wx-User/Login`, { ...param })



