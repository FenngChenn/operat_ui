<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangyb
 * @Date: 2022-10-11 09:42:11
 * @LastEditors: wangyb
 * @LastEditTime: 2022-10-11 14:09:28
-->
<!--<template>-->
<!--  <div id="app">-->
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->
<!--    <router-view/>-->
<!--  </div>-->
<!--</template>-->

<!--<style lang="less">-->
<!--#app {-->
<!--  font-family: Avenir, Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--}-->

<!--#nav {-->
<!--  padding: 30px;-->

<!--  a {-->
<!--    font-weight: bold;-->
<!--    color: #2c3e50;-->

<!--    &.router-link-exact-active {-->
<!--      color: #42b983;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->

<style>
@import "~@/style/index.less";
</style>
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
//    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//全局注入store
import store from './store/index.js'

export default {
  name: 'App',
  data: function () {
    return {}
  },
  methods: {},
  store:store
}
</script>

