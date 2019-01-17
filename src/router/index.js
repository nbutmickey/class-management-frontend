import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import adminRouter from './modules/admin'
import classteacherRouter from './modules/classteacher'
import counselor from './modules/counselor'
import student from './modules/student'

export const constantRouteMap=[
  {
    path: '/login',
    name: 'login',
    component:()=>import('../pages/login'),
  },
]

// 异步挂载的路由，根据角色动态生成。
export const asyncRouteMap = [
  adminRouter,
  classteacherRouter,
  counselor,
  student
]

export default new Router({
  mode:'history',
  scrollBehavior:()=>({y:0}),
  routes:constantRouteMap
})
