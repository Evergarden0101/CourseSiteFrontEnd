import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import '../static/gloabl.css';


Vue.use(VueAxios, axios)
// // import axios from 'axios'
// // import VueAxios from 'vue-axios'
// //
// // Vue.use(VueAxios, axios)
// Vue.prototype.axios = axios

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
