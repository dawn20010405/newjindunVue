import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import home from '@/page/home'
import pxyemp from '@/components/PxyEmp'
import achievementslc from '@/components/achievementslc'
import dept from '@/components/Dept_Psition.vue'
import recru from '@/components/Recruitment.vue'

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
    },
    {
      path: '/pxyemp',
      name: 'pxyemp',
      component: pxyemp
    },
    {
      path: '/dept',
      name: 'dept',
      component: dept
    },
    {
      path: '/recru',
      name: 'recru',
      component: recru
    }
  ]
})
