import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import home from '@/page/home'
import pxyemp from '@/components/PxyEmp'
import lixiang from '@/components/lixiang'
import weijie from '@/components/weijie'
import yijie from '@/components/yijie'
import achievementslc from '@/components/achievementslc'
import sphome from '@/components/ZzyshenpiHome'
import dept from '@/components/Dept_Psition.vue'
import recru from '@/components/Recruitment.vue'
import proce from '@/components/RecruProce.vue'

import AssetsOverview from '@/components/AssetsOverview'

import BRAssetsOverview from '@/components/BRAssetsOverview'
import PurchaseOverview from '@/components/PurchaseOverview'
import assessment_team_lc from '@/components/assessment_team_lc'
import atlc from '@/components/atlc'

Vue.use(Router)


export default new Router({ /* 去掉地址上的#*/
  routes: [
    {
      path: "/",
      name: '/login',
      component: login
    },
    { /* /表示根路径。使用了组件HelloWorld*/
      path: '/home',
      name: '/home',
      meta: { requireAuth: true },
      component: home,

      children: [
        {
          path: '/aclc',
          name: 'achievementslc',
          component: achievementslc,
          meta: { requireAuth: true }
        },
        {
          path: '/dept',
          name: 'dept',
          component: dept,
          meta: { requireAuth: true }
        },
        {
          path: '/recru',
          name: 'recru',
          component: recru,
          meta: { requireAuth: true }
        },
        {
          path: '/proce',
          name: 'proce',
          component: proce,
          meta: { requireAuth: true }
        },
        {
          path: '/pxyemp',
          name: 'pxyemp',
          component: pxyemp,
          meta: { requireAuth: true }
        },
        

        {
          path: '/weijie',
          name: 'weijie',
          component: weijie,
          meta: { requireAuth: true }
        },
        {
          path: '/yijie',
          name: 'yijie',
          component: yijie,
          meta: { requireAuth: true }
        },
        {
          path: '/lixiang',
          name: 'lixiang',
          component: lixiang,
          meta: { requireAuth: true }
        },
        {
          path: '/BRAssetsOverview',
          name: 'BRAssetsOverview',
          component: BRAssetsOverview,
          meta: { requireAuth: true }
        },
        {
          path: '/PurchaseOverview',
          name: 'PurchaseOverview',
          component: PurchaseOverview,
          meta: { requireAuth: true }
        },

        // {
        //   path: '/sphome',
        //   name: 'ZzyshenpiHome',
        //   component: ZzyshenpiHome
        // }, {
        //   path: '/dsp',
        //   name: 'Zzydshenpi',
        //   component: Zzydshenpi
        // },
        
        {
          path: '/sphome',
          name: 'sphome',
          component: sphome,
          meta: { requireAuth: true }
        },
        {
          path: '/pxyemp',
          name: 'pxyemp',
          component: pxyemp,
          meta: { requireAuth: true }
        },
        {
          path: '/home/assetsoverview',
          name: 'AssetsOverview',
          component: AssetsOverview,
          meta: { requireAuth: true }
        },
        {
          path: '/atlc',
          name: 'assessment_team_lc',
          component: assessment_team_lc
        },
        {
          path: '/atlc2',
          name: 'atlc',
          component: atlc
        }
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
