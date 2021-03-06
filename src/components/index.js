// 封装一个插件,
// 注册所有的components下的组件为全局组件
import myBread from '@/components/my-bread'
import myTest from '@/components/my-test'
import myChannel from '@/components/my-channel'
import myImage from '@/components/my-image'
import COMA from '@/components/com-a'
import COMB from '@/components/com-b'

// vue插件,暴露一个对象,对象中有一个选项,install安装意思install这个方法是必须的
export default {
  install (Vue) {
    // 安装函数 当Vue.use(使用插件) install被使用
    // Vue全局vue对象
    // 通过当前的Vue对象来注册我们的全局对象
    Vue.component(myBread.name, myBread)
    Vue.component(myTest.name, myTest)
    Vue.component(myChannel.name, myChannel)
    Vue.component(myImage.name, myImage)
    //  测试组件
    Vue.component(COMA.name, COMA)
    Vue.component(COMB.name, COMB)
  }
}
