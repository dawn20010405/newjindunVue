// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import http from '../config/http.js'
import myhttp from '../config/myhttp.js'
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

//qqc change by 2020/12/22  15:11:30
import moment from 'moment'
Vue.use(require('vue-moment'));
Vue.prototype.moment = moment;
Vue.filter('dateYMDHMSFormat2', function(dateStr, pattern = 'YYYY年MM月DD日 HH时mm分ss秒') {
  if(!dateStr) return '';
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
