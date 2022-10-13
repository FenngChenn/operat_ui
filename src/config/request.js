/*
 * @Descripttion: 
 * @version: 
 * @Author: wangyb
 * @Date: 2022-10-12 18:15:53
 * @LastEditors: wangyb
 * @LastEditTime: 2022-10-12 18:25:53
 */
import axios from 'axios'
import { baseUrl} from './config'
console.log(baseUrl,'baseUrl')
const service = axios.create({
  baseURL:baseUrl,
  timeout: 10000, // request timeout
})

// request interceptor 请求拦截
service.interceptors.request.use(
  (config) => {
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor  响应拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service