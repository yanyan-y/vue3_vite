// 引入 router
import { createRouter, createWebHistory } from 'vue-router'

// 下面使用了es6的对象增强写法，命名必须是routes
const routes = [
  {
      path: '/',
      redirect: 'home'
  }, 
  {
      path: '/login',
      // 配置了extensions，login.vue可以写成login
      component: () => import('@/views/login/login') 
  },
  {
      path: '/home',
      component: () => import('@/views/home/home')
  }
]

// 配置router对象
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router