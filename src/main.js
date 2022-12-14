// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./style/global.less";
/*引入elementUI库*/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
import './config/config'
/*ie兼容问题*/
// require("babel-polyfill");

/*引入axios*/
// import axios from 'axios';
// axios.defaults.withCredentials = true;
// //vuex状态管理文件
// import store from './store/index';
//设置axios请求头附带token
// axios.defaults.headers.common['Authorization'] = store.state.token;
// axios.interceptors.request.use(config => {
//       //判断是否存在token 如果存在将每个页面header都添加token
//       if (store.state.token) {
//         config.headers.common['Authorization'] = store.state.token;
//       }
//       if(config.data!=null&&config.data.params!=null&&config.data.params.apply_on!=null){
//         config.data.params.apply_on=config.data.params.apply_on.format("yyyy-MM-dd hh:mm:ss");
//       }
//       return config;
//     },
//     err => {
//       //请求错误的做法
//       return Promise.reject(err);
//     }
// );
// Date.prototype.format = function(fmt)
// String.prototype.format = function(fmt)
// {   //author: fc
//   var date = new Date();   //获取当前日期时间
//   var o = {
//     "M+" : date.getMonth()+1,                 //月份
//     "d+" : date.getDate(),                    //日
//     "h+" : date.getHours(),                   //小时
//     "m+" : date.getMinutes(),                 //分
//     "s+" : date.getSeconds(),                 //秒
//     "q+" : Math.floor((date.getMonth()+3)/3), //季度
//     "S"  : date.getMilliseconds()             //毫秒
//   };
//   if(/(y+)/.test(fmt))
//     fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
//   for(var k in o)
//     if(new RegExp("("+ k +")").test(fmt))
//       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
//   return fmt;
// }  ;
//response拦截器
// axios.interceptors.response.use(
//     response => {
//       return response;
//     },
//     error => {
//       if (error.response) {
//         switch (error.response.status) {
//           case 401:
//             // store.commit('del_store');
//             ElementUI.Message({
//               type: 'warning',
//               message: "部分数据无请求权限",
//               duration: 2000
//             });
//             router.replace({
//               path: "/login",
//               query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
//             });
//             break;
//           case 500:
//             ElementUI.Message({
//               type: 'error',
//               message: "数据请求错误,请检查服务器",
//               duration: 2000
//             });
//             break;
//         }
//       }
//       return Promise.reject(error.response.data);
//     }
// )
// Vue.prototype.$axios = axios;

/*引入公共方法文件*/
import common from "./utils/common.js";
Vue.prototype.$common = common;

// 引入分页插件
// import JwPagination from 'jw-vue-pagination';
// Vue.component('jw-pagination', JwPagination);

Vue.config.productionTip = false;
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
