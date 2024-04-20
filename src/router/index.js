import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: '框架',
    component: () => import('../views/Manage.vue'),
    // 重定向到home
    redirect: "/home",
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'community',
        name: '社团管理',
        component: () => import('../views/Community.vue')
      },
      {
        path: 'student',
        name: '学生管理',
        component: () => import('../views/Student.vue')
      },
      {
        path: 'activity',
        name: '活动管理',
        component: () => import('../views/Activity.vue')
      },
      {
        path: 'person',
        name: '管理员信息',
        component: () => import('../views/Person.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/front',
    name: 'Front',
    component: () => import('../views/Front.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由守卫
router.beforeEach((to, from, next) => {
  // 设置当前路由名称,为了在header组件中去使用
  localStorage.setItem("currentPathName", to.name)
  store.commit("setPath")  //触发store的数据更新
  next()  //放行路由
})

export default router
