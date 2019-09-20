/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'


//声明使用插件
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',//去掉#，
  // base: '/yiTownWebApp/',//这个配置也很重要，否则会出现页面空白情况
  //所有路由
  routes: [
    {
      path: '/msite',
      component: ()=>import('../pages/Msite/Msite.vue'),
      children: [
        {
          path: 'msitecontent',
          component: ()=>import('../pages/Msite/MsiteContent/MsiteContent'),
          meta: {
            showFooter: true,
            keepAlive: true,
            title:'首页'
          },
        },
        {
          path: 'attention',
          component: ()=>import('../pages/Msite/Attention/Attention'),
          meta: {
            showFooter: true,
            keepAlive: true,
            title:'关注'
          },
        },
        {
          path: 'confess',
          component: ()=>import('../pages/Msite/Confess/Confess'),
          meta: {
            showFooter: true,
            keepAlive: true,
            title:'表白',
            showClass:true,
          },
        },
        {
          path: '/msite',
          redirect: '/msite/msitecontent'
        }
      ],
    },
    {
      path: '/dynamic',
      component: ()=>import('../pages/Dynamic/Dynamic.vue'),
      meta: {
        showFooter: true,
        keepAlive: true,
      }
    },
    {
      path: '/circle',
      component: ()=>import('../pages/Circle/Circle.vue'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: ()=>import('../pages/Profile/Profile.vue'),
      meta: {
        showFooter: true
      }
    },
    // {
    //   path: '/',
    //   // name: 'msite',
    //   redirect: '/msite/msitecontent'
    // },
    {
      path: '/login',
      component: ()=>import('../pages/Login/Login.vue')
    },
    {
      path: '/publish',
      component: ()=>import('../pages/Publish/Publish.vue')
    },
    {
      path: '/postbar',
      component: ()=>import('../pages/PostBar/PostBar.vue')
    },
    {
      path: '/homepage',
      component: ()=>import('../pages/HomePage/HomePage'),
      meta:{
        keepAlive: true,
      }
    },
    {
      path: '/viewerx',
      component:()=>import('../pages/HomePage/Viewerx/Viewerx'),
      meta:{
        keepAlive: true
      }
    },
    {
      path:'/detail',
      component:()=>import('../pages/Detail/Detail'),
    }
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
