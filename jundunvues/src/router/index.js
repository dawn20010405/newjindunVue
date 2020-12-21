import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import home from '@/page/home'


import achievementslc from '@/components/achievementslc'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: '/home',
      component: home
    },
    {
      path: '/aclc',
      name: 'achievementslc',
      component: achievementslc
    }
  ]
})
