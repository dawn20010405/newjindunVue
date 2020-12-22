import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import home from '@/page/home'
import pxyemp from '@/components/PxyEmp'
import achievementslc from '@/components/achievementslc'
import AssetsOverview from '@/components/AssetsOverview'

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
      component: home,
      children:[
        {
          path: '/home/assetsoverview',
          name: 'AssetsOverview',
          component: AssetsOverview
        },
      ]
    },
    {
      path: '/aclc',
      name: 'achievementslc',
      component: achievementslc
    },
    {
      path: '/pxyemp',
      name: 'pxyemp',
      component: pxyemp
    },
    
  ]
})
