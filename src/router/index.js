import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Artical from '@/views/artical'
import Notfound from '@/views/404'
import Image from '@/views/image'

// 拿取用户信息
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({

  routes: [{

    path: '/login',
    name: 'login',
    component: Login
  }, {

    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'welcome',
        component: Welcome
      },
      {
        path: '/artical',
        name: 'artical',
        component: Artical
      },
      {
        path: '/image',
        name: 'image',
        component: Image
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: Notfound
  }
  ]
})
// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 判断是不是是登录路由
  if (to.path === '/login') return next()
  // 不是登录就要判断是否已将登录
  if (!store.getUser().token) return next('/login')
  // 既不是登录也已经登录完毕,就是放行
  next()
})

// 将上面的书写精简一下
// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login' && !store.getUser().token) return next('/login')
//   next()
// })
// 意思是,当你的要进入的页面不是登录页面,同时,在之前没有登陆过,即是拿取不到token信息,则就跳转去登录页面,否则的话就放行
export default router
