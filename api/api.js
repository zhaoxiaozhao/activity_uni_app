import { rootUrl } from '@/api/base.js'
import { http } from '@/utils/request/index.js'

//全局登录
export const uploadURL = `${rootUrl}/app/File/Upload`;
export const downloadURL = `${rootUrl}/app/File/download`
export const register = param => http.post(`${rootUrl}/app/Wx-User/register`, { ...param })
export const login = param => http.post(`${rootUrl}/app/Wx-User/login`, { ...param })
export const getUserPhone = param => http.get(`${rootUrl}/app/Wx-User/user-phone`, { ...param })
export const getActivities = param => http.get(`${rootUrl}/app/activity`, { ...param })
export const createActivity = param => http.post(`${rootUrl}/app/activity`, { ...param })



