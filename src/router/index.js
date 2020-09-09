import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Upload from '../components/Record/Upload'
import Login from '../components/userManage/login'
import Nav from '../components/NavHeader'
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
          path: '/upload',
          name: 'Upload',
          component: Upload
        },
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
