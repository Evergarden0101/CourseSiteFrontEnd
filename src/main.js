import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import '../static/gloabl.css';
import store from './store'

import './style/bootstrap.css'
import './style/hux-blog.css'

Vue.use(ElementUI);
Vue.use(VueAxios, axios);
axios.defaults.baseURL='/api'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
