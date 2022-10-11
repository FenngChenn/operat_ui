<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangyb
 * @Date: 2022-10-11 13:33:51
 * @LastEditors: wangyb
 * @LastEditTime: 2022-10-11 14:25:42
-->
<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Sidebar,AppMain } from './components'
export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain
  },
}
</script>

<style lang="less" scoped>
.sidebar-container{
  
}
.main-container{
  min-height: 100%;
  transition: margin-left .28s;
  margin-left: 210px;
  position: relative;
}

</style>