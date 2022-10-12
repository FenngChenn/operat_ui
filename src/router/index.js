/*
 * @Descripttion: 
 * @version: 
 * @Author: wangyb
 * @Date: 2022-10-11 09:42:11
 * @LastEditors: wangyb
 * @LastEditTime: 2022-10-12 16:54:35
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/pages/layout'
//import Home from '../pages/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/checkManage/busiVerify',
  },
  {
    path: '/checkManage',
    redirect: '/checkManage/busiVerify',
    component: Layout,
    children: [{
      path: 'busiVerify',
      component: resolve => {
        require(['@/pages/checkManage/busiVerify.vue'], resolve)
      },
      name: 'busiVerify',
      meta: {
        title: '业务主体信息核对',
      }
    },{
      path: 'accoVerify',
      component: resolve => {
        require(['@/pages/checkManage/accoVerify.vue'], resolve)
      },
      name: 'accoVerify',
      meta: {
        title: '对账主体信息核对',
      }
    },{
      path: 'financialVerify',
      component: resolve => {
        require(['@/pages/checkManage/financialVerify.vue'], resolve)
      },
      name: 'financialVerify',
      meta: {
        title: '财务主体信息核对',
      }
    } ]
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