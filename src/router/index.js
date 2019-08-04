import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Artical from '@/views/artical'
import Notfound from '@/views/404'

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

export default router
