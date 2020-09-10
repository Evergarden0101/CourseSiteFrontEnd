import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Upload from '../components/Record/Upload'
import Login from '../components/userManage/login'
import InCircle from '../components/community/InCircle'
import Nav from '../components/NavHeader'
import VideoList from '../components/Record/video_list'
import Community from '../components/community/community'

import Index from '../components/Index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/Index',
      name:'Index',
      redirect:'/community',
      component:Index,
      children:[
        {
          path: '/hello',
          name: 'HelloWorld',
          component: HelloWorld
        },
        {
          path: '/upload',
          name: 'Upload',
          component: Upload
        },
        {
          path: '/videolist',
          name: 'video_list',
          component: VideoList
        },
        {
          path: '/inCircle',
          name: 'inCircle',
          component: InCircle
        },
        {
          path: '/community',
          name: 'community',
          component:Community
        }
      ]
    },
    {
      path:'/',
      name:'/login',
      component:Login,
    },
    {
      path:'/login',
      name:'/login',
      component:Login,
    }
  ]
})
