import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Upload from '../components/Record/Upload'
import Login from '../components/userManage/login'
import InCircle from '../components/community/InCircle'
import VideoList from '../components/Record/video_list'
import Community from '../components/community/community'
import Player from '../components/Record/Player'
import VideoList2 from '../components/Record/videolist2'

import Index from '../components/Index'
Vue.use(VueRouter)
import postList from '../components/Post/postList'
import postPage from '../components/Post/postPage'

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
  
Vue.use(VueRouter)

export default new VueRouter({
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
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/post',
      name: 'postList',
      component: postList
    },
    {
      path: '/postpage',
      name: 'postpage',
      component: postPage
    }
  ]
})
