/*
 * @Description: file content
 * @Author: 
 * @Date: 2020-07-20 20:41:35
 * @LastEditors: Mr.WJ
 * @LastEditTime: 2021-02-24 15:05:46
 */ 
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../main.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: '_home',
    redirect:'/home',
    component: Main,
    children:[
      {
        path:'/home',
        name:'home',
        component:()=>import('@/views/Home')
      },
      {
        path:'bodyStatus',
        name:'bodyStatus',
        component:()=>import('@/views/bodyStatus')
      },
      {
        path:'heartStatus',
        name:'heartStatus',
        component:()=>import('@/views/heartStatus')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//重复点击路由报错处理
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function push(location) {
   return originalReplace.call(this, location).catch(err => err)
}

export default router
