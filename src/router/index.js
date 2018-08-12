import Vue from 'vue'
import Router from 'vue-router'
// 引入Login.vue组件
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Users from '@/components/Users.vue'
// 使用router
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login,
      name: 'Login'
    },
    {
      path: '/home',
      component: Home,
      name: 'home',
      children: [
        {
          path: '/users',
          component: Users,
          name: 'users'
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('myToken')
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})
export default router
