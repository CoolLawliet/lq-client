import axios from 'axios'
import router from './router'

// 请求拦截  设置统一header
axios.interceptors.request.use(config => {
    if (localStorage.token)
        config.headers.Authorization = 'JWT '+localStorage.token
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
    return response
}, error => {
    // 错误提醒
    const { status } = error.response

    if (status == 401) {

        alert('token值过期或无效，请重新登录')
        // 清除token
      localStorage.removeItem('token')
      localStorage.removeItem('userID')
        // 页面跳转
        router.push('/login')
    } else
        //TODO 线上环境要删除
        // alert(error.response.data)

    return Promise.reject(error)
})

export default axios
