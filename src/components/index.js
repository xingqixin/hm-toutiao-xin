// 封装一个插件,
// 注册所有的components下的组件为全局组件
import myBread from '@/components/my-bread'

// vue插件,暴露一个对象,对象中有一个选项,install安装意思
export default {
  install (Vue) {
    // 安装函数 当Vue.use(使用插件) install被使用
    // Vue全局vue对象
    // 通过当前的Vue对象来注册我们的全局对象
    Vue.component(myBread.name, myBread)
  }
}
