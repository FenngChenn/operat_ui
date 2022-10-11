/*
 * @Descripttion: 
 * @version: 
 * @Author: wangyb
 * @Date: 2022-10-11 09:42:11
 * @LastEditors: wangyb
 * @LastEditTime: 2022-10-11 14:26:28
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/pages/layout'
//import Home from '../pages/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/checkManage',
    children: [
      {
        path: '/checkManage',
        component: resolve => {
          require(['@/pages/checkManage/index.vue'], resolve)
        },
        name: 'checkMange',
        meta: {
          title: '对账信息查询'
        },
      }
    ]
  }
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
  // }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router