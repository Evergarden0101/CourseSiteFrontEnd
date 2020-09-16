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
import ManageStu from '../components/userManage/manageStudents'
import ManageTea from '../components/userManage/manageTeacher'

Vue.use(VueRouter)
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
        },
        {
          path: '/postpage',
          name: 'postpage',
          component: postPage
        },
        {
          path: '/upload',
          name: 'Upload',
          component: Upload
        },
        {
          path:'/manageStu',
          name:'ManageStu',
          component:ManageStu
        },
        {
          path:'/manageTea',
          name:'ManageTea',
          component:ManageTea
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
  ]
})
