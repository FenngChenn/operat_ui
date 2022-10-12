<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangyb
 * @Date: 2022-10-11 13:38:28
 * @LastEditors: wangyb
 * @LastEditTime: 2022-10-12 16:53:35
-->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
 @import "~@/style/transition.less";
.app-main {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding: 20px;
}
</style>