// 存储信息的时候
// 1 约定信息的key是什么 hm-toutiao-xin
// 2 约定信息的值是什么 用户信息对象 字符串格式json
const KEY = 'hm-toutiao-xin'

export default {
  setUser (user) {
    // 存储用户信息sessionStorage
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    // 获取用户信息从sessionStorage,,如果拿不到就默认为空对象
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
