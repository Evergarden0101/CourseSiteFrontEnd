import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Upload from '../components/Recording_and_broadcasting/Upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    }
  ]
})
