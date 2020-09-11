import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Upload from '../components/Record/Upload'
import Login from '../components/userManage/login'
import InCircle from '../components/community/InCircle'
import Nav from '../components/NavHeader'
import VideoList from '../components/Record/video_list'
import post from '../components/post'
import Community from '../components/community/community'
import Player from '../components/Record/Player'
import VideoList2 from '../components/Record/videolist2'

import Index from '../components/Index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/Index',
      name:'Index',
      redirect:'/hello',
      component:Index,
      children:[
        {
          path: '/hello',
          name: 'HelloWorld',
          component: HelloWorld
        },
        {
          path:'/player',
          name:'player',
          component:Player
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
          path: '/videolist2',
          name: 'videolist2',
          component: VideoList2
        },{
          path:'/community',
          name: 'community',
          component: Community
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
