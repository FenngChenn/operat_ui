<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangyb
 * @Date: 2022-10-11 13:38:12
 * @LastEditors: wangyb
 * @LastEditTime: 2022-10-11 14:20:17
-->
<template>
  <div class="sidebar">左侧</div>
</template>

<script>
export default {
  name:'Sidebar',
  data(){
    return{

    }
  }
}
</script>

<style lang="less" scoped>
.sidebar{
  width: 210px;
  background-color: #304156;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
</style>