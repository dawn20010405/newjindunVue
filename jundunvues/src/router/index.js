import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import page from '@/components/page'
import pxyemp from '@/components/PxyEmp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/page',
      name: 'page',
      component: page
    },
    {
      path: '/pxyemp',
      name: 'pxyemp',
      component: pxyemp
    }

  ]
})
