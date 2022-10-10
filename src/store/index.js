import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    token: '',
    user: '',
    queryUrl: "/cfm/"
  },
  mutations: {
    set_token:function(state,data){
      state.token = data.token;
      state.user = data.user;
      window.sessionStorage.setItem("token",data.token);
      window.sessionStorage.setItem("user",JSON.stringify(data.user));
    },
    del_token:function(state){
      state.token = '';
      state.user = '';
      window.sessionStorage.clear();
    },
    set_url:function(state,url){
      state.queryUrl = url;
      window.sessionStorage.setItem("queryUrl",url);
    }
  }
})
