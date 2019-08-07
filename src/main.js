import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/style/index.less'

// @是一个路径的别名, src路径别名.在Vue-cli下创建的项目下才可
// 目录下有默认索引文件index.js就是索引文件
import router from '@/router'

// 先打包在挂载,在Vue的原型上挂载axios,以后所有的实例都可以使用
import axios from '@/api'
// 将全局组件注册到全局
import comPo from '@/components'
Vue.prototype.$http = axios
Vue.use(comPo)
// 控制台信息,按照开发环境来提示
Vue.config.productionTip = false

Vue.use(ElementUI)

// main.js的职责就是:导入项目需要的以来,创建一个根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
