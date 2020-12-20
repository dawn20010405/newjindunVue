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
