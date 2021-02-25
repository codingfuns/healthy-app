/*
 * @Description: file content
 * @Author: 
 * @Date: 2020-07-20 20:41:35
 * @LastEditors: Mr.WJ
 * @LastEditTime: 2021-02-25 13:45:51
 */ 
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/iconfont/iconfont.js';
import '@/assets/iconfont/iconfont.css'
import DB from '@/db';

Vue.prototype.$db = new DB();
Vue.prototype.$db.initDB();
Vue.use(ElementUI);

Vue.config.productionTip = false
//123
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
