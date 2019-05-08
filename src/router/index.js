/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '../pages/Msite/Msite.vue'
import Dynamic from '../pages/Dynamic/Dynamic.vue'
import Circle from '../pages/Circle/Circle.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'

//声明使用插件
Vue.use(VueRouter)


export default new VueRouter({
  //所有路由
  routes:[
    {
      path:'/msite',
      component:Msite
    },
    {
      path:'/dynamic',
      component:Dynamic
    },
    {
      path:'/circle',
      component:Circle
    },
    {
      path:'/profile',
      component:Profile
    },
    {
      path:'/',
      redirect:'/msite'
    },
    {
      path:'/login',
      component:Login
    },
  ]
})
