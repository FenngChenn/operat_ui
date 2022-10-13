import Vue from 'vue'
import Router from 'vue-router'
//主页面
import Main from '@/pages/Main'
//首页
import Home from '@/pages/Home'
//样式结构页面
import WhiteContent from '@/components/publicModule/WhiteContent'
import EmptyContent from '@/components/publicModule/EmptyContent'
import TabContent from '@/components/publicModule/TabContent'
import ImportTabContent from '@/components/publicModule/ImportTabContent'
import DynamicTab from '@/components/publicModule/DynamicTab'
import WhiteContent2 from '@/components/publicModule/WhiteContent2'

import PayCheckBatch from '@/pages/reconciliation/PayCheckBatch'

Vue.use(Router)

const router = new Router({
  routes: [
    // {path: '/', redirect: {name:'Home'}},
    {path: '/', component: Main, meta: {requireAuth: true},
      children:[
        //首页
        {path: '/home', name: 'Home', component: Home, meta: {requireAuth: true}},
        //基础样式一（中心内容）
        {path: '/whiteContent', name: 'WhiteContent', component: WhiteContent,
          children: [
          ]
        },
        //基础样式二（中心内容-无按钮）
        {path: '/empty-content', name: 'EmptyContent', component: EmptyContent,
          children: [
            {path: '/batch-payment/pay-check-batch', name: 'PayCheckBatch', component: PayCheckBatch, meta: {requireAuth: true}},
          ]
        },
        //基础样式三（tab页）
        {
          path:'/tab-content',name:'TabContent',component:TabContent,
          children:[
          ]
        },
        //基础样式四（导入的tab页）
        {
          path:'/import-tab-content',name:'ImportTabContent',component:ImportTabContent,
          children:[
          ]
        },
        //基础样式五（可切换tab文字的tab页）
        {
          path:'/dynamic-tab',name:'DynamicTab',component:DynamicTab,
          children:[
          ]
        },
        //基础样式六（中心内容---收付费报表）
        {path: '/whiteContent', name: 'WhiteContent2', component: WhiteContent2,
          children: [

          ]
        },
      ]
    }
  ]
});

// import store from "../store/index"

//全局路由守卫 根据token判断是否进入路由
// router.beforeEach((to,from,next) => {
//   if(to.meta.requireAuth){
//     if(store.state.token){
//       next();
//     }else{
//       next({path:"/"})
//     }
//   }else{
//     next();
//   }
// })

//刷新页面时重新保存token和user信息
// if(sessionStorage.getItem("token")){
//   var data = {};
//   data.token = sessionStorage.getItem("token");
//   data.user = JSON.parse(sessionStorage.getItem("user"));
//   store.commit("set_token", data);
// }

export default router;

