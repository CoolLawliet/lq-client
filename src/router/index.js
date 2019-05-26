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
import PostBar from '../pages/PostBar/PostBar.vue'
import Attention from '../pages/Msite/Attention/Attention'
import MsiteContent from '../pages/Msite/MsiteContent/MsiteContent'
import HomePage from '../pages/HomePage/HomePage'

//声明使用插件
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',//去掉#，
  // base: '/yiTownWebApp/',//这个配置也很重要，否则会出现页面空白情况
  //所有路由
  routes: [
    {
      path: '/msite',
      name: 'msite',
      component: Msite,
      children: [
        {
          path: '/msite/msitecontent',
          name: 'msitecontent',
          component: MsiteContent,
          meta: {
            showFooter: true,
            keepAlive: true
          },
        },
        {
          path: '/msite/attention',
          name: 'attention',
          component: Attention,
          meta: {
            showFooter: true,
            keepAlive: true
          },
        },
        {
          path: '',
          redirect: '/msite/msitecontent'
        }
      ],
    },
    {
      path: '/dynamic',
      name: 'dynamic',
      component: Dynamic,
      meta: {
        showFooter: true,
        keepAlive: true
      }
    },
    {
      path: '/circle',
      name: 'circle',
      component: Circle,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/',
      name: 'msite',
      redirect: '/msite'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish
    },
    {
      path: '/postbar',
      name: 'postbar',
      component: PostBar
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: HomePage
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   const isLogin = localStorage.token ? true : false;
//   if (to.path == "/login") {
//     next();
//   } else {
//     alert(to.path)
//     alert(next)
//     isLogin ? next() : next("/login");
//   }
// })

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')

    if (token === 'null' || token === '') {
      next('/login')
    } else {

      next()
    }
  }
})
export default router
