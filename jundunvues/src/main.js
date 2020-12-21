// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/page'
import router from './router'
import http from '../config/http.js'
import myhttp from '../config/myhttp.js'
import Qs from 'qs'
/* 3、全局导入element-ui */
// 加载为全局对象
Vue.prototype.$Qs = Qs
Vue.prototype.$http = http
Vue.prototype.$myhttp = myhttp
Vue.prototype.$axios = axios


//1、导入element-ui和Axios
//cnpm install element-ui --save  -g
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(element)

//2、导入axios
/*cnpm install axios --save -g*/
//'./utlis/utils.js'
import axios from 'axios';
//在Vue对象添加了一个属性，以后访问axios   this.$axios
Vue.prototype.$axios = axios;

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
