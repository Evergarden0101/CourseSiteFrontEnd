import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import '../static/gloabl.css';
import Video from 'video.js'
import store from './store'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import moment from 'moment'; //导入模块
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn');
Vue.prototype.$moment = moment;//赋值使用
Vue.use(VideoPlayer)
require('../src/assets/scss/custom-theme.css')
Vue.prototype.$video = Video
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
