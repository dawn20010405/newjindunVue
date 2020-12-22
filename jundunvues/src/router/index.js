import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import home from '@/page/home'
import pxyemp from '@/components/PxyEmp'
import lixiang from '@/components/lixiang'
import achievementslc from '@/components/achievementslc'

Vue.use(Router)


export default new Router({ /* 去掉地址上的#*/
  routes: [
    {
      path: "/",
      name:'/login',
      component: login
    },
    { /* /表示根路径。使用了组件HelloWorld*/
      path: '/home',
      name:'/home',
      meta:{requireAuth:true},
      component: home,
      
      children: [
        {
          path: '/aclc',
          name: 'achievementslc',
          component: achievementslc,
          meta:{requireAuth:true}
        },
        {
          path: '/pxyemp',
          name: 'pxyemp',
          component: pxyemp,
          meta:{requireAuth:true}
        },
        {
          path: '/aclc',
          name: 'achievementslc',
          component: achievementslc,
          meta:{requireAuth:true}
        },
        {
          path: '/lixiang',
          name: 'lixiang',
          component: lixiang,
          meta:{requireAuth:true}
        },
       
      ]
    }
  ]
})




// export default new Router({
  
//   routes: [
//     {
//       path: '/',
//       name: 'login',
//       component: login
//     },
//     {
//       path: '/home',
//       name: '/home',
//       component: home
//     },
//     {
//       path: '/aclc',
//       name: 'achievementslc',
//       component: achievementslc
//     },
//     {
//       path: '/pxyemp',
//       name: 'pxyemp',
//       component: pxyemp
//     }
//   ]
// })
