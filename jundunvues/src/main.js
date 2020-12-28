
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import echarts from 'echarts'
import http from '../config/http.js'
import myhttp from '../config/myhttp.js'
import html2canvas from 'html2canvas'

import Qs from 'qs'
/* 3、全局导入element-ui */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


// 加载为全局对象

Vue.prototype.$Qs = Qs
Vue.prototype.$http = http
Vue.prototype.$myhttp = myhttp
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

//qqc change by 2020/12/22  15:11:30
import moment from 'moment'
Vue.use(require('vue-moment'));
Vue.prototype.moment = moment;
Vue.filter('dateYMDHMSFormat2', function (dateStr, pattern = 'YYYY年MM月DD日 HH时mm分ss秒') {
  if (!dateStr) return '';
  return moment(dateStr).format(pattern);
})
// 全局导入过滤器
import filter from './plugins/filter.js'
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))
// 可以理解为控制的地方

Vue.config.productionTip = false

/* eslint-disable no-new */
// 根组件
var vm = new Vue({
  el: '#app',
  router,
  components: {
    App
  },

  template: '<App/>'
})

router.beforeEach((to, from, next) => {

  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    // let user = sessionStorage.getItem('user');
    // 		var jsonObj = JSON.parse(user);
    if (sessionStorage.getItem('user')) { //判断本地是否存在access_token
      next();
    } else {
      if (to.path === '/') {
        next();
      } else {
        next({
          path: '/'
        })
      }
    }
  }
  else {

    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if (to.fullPath == "/") {
    if (sessionStorage.getItem('user')) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});
