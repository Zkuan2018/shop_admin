import Vue from 'vue'
import Router from 'vue-router'
// 引入Login.vue组件
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
// 使用router
Vue.use(Router)

export default new Router({
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
      name: 'home'
    }
  ]
})
