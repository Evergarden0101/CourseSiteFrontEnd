import axios from 'axios'
import { baseURL } from '@/assets/js/env.js'
import { Message } from 'element-ui'

axios.defaults.baseURL = baseURL
axios.defaults.timeout = 8000

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  let res = response.data
  if (response.config.url === '/file/getFiles') {
    res.id = response.config.params.pieceId
  }
  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 添加请求拦截器，每次请求设置都请求cookie信息
axios.interceptors.request.use(function (config) {
  // 除了登录和注册请求，其余请求如果没有用户信息（即没登录），就跳转到登录页面
  if (!window.vm.$store.state.userInfo &&
    config.url !== '/user/signin' &&
    config.url !== '/user/signup') {
    Message({
      type: 'warning',
      message: '您未登录，请前往登录界面进行操作'
    })
    window.vm.$router.replace('/')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export default axios
