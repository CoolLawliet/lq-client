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
import Publish from '../pages/Publish/Publish.vue'

//声明使用插件
Vue.use(VueRouter)


const router = new VueRouter({
  //所有路由
  routes:[
    {
      path:'/msite',
      component:Msite,
      meta: {
        showFooter: true
      }
    },
    {
      path:'/dynamic',
      component:Dynamic,
      meta: {
        showFooter: true
      }
    },
    {
      path:'/circle',
      component:Circle,
      meta: {
        showFooter: true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path:'/',
      redirect:'/msite'
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/publish',
      component:Publish
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.token ? true : false;
  if (to.path == "/login") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})
export default router
