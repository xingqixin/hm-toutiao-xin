// 配置一个axios,导出一个配置好的axios
import axios from 'axios'
import store from '@/store'
// import router from '@/router'

// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 代码只会执行一次,如果当时存了token就不会再执行了
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
// 在 每次请求之前,获取token信息,追加在headers中
// 请求拦截器,在每次请求前,你想做某一些事情
axios.interceptors.request.use((config) => {
// 修改config
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, (error) => {
// 错误处理
  return Promise.reject(error)
})

// 响应拦截器,在每一次响应后,做某一些事情
axios.interceptors.response.use((res) => {
// 成功的时候做一些事情
  return res
}, (error) => {
// 失败的时候跳转到登录页面
  // 获取响应状态码,err对象包含响应对象,包含响应状态码,err.response.status
  if (error.response.status === 401) {
    // 方式有2种
    // 方式1
    location.hash = '#/login'
    // 方式2
    // 此时没有Vue实例,$router对象获取不到,为什么可以$router获取$对象,因为我们之前挂载过,所以$router也可以,通过router实例直接使用
    // router.push('/login')
  }
  return Promise.reject(error)
})

// 进行导出
export default axios
