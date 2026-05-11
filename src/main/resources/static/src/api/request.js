import axios from 'axios'

const request = axios.create({
  baseURL: '',
  timeout: 120000
})

request.interceptors.request.use(config => {
  return config
})

request.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.message || error.message || '请求失败'
    console.error('[API Error]', message)
    return Promise.reject(error)
  }
)

export default request
