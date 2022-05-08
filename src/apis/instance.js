import axios from 'axios'

const instance = axios.create({
  timeout: 1000 * 60,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false,
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。
  baseURL: 'https://netcloud-music.vercel.app/', // 服务端域名
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

const ajaxMethod = ['get', 'post']
const api = {}
ajaxMethod.forEach(method => {
  api[method] = function (uri, data, config) {
    return new Promise(function (resolve, reject) {
      instance[method](uri, data, config)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
})

export default api
