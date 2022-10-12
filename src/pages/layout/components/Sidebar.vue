<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangyb
 * @Date: 2022-10-11 13:38:12
 * @LastEditors: wangyb
 * @LastEditTime: 2022-10-12 17:32:24
-->
<template>
  <div class="sidebar">
    <el-menu
      :default-active="leftActive"
      class="el-menu-vertical-demo"
      @select="handleSelect"
    >
      <el-submenu
        :index="item.index"
        v-for="(item, index) in menuData"
        :key="index"
      >
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ item.title }}</span>
        </template>
        <el-menu-item
          :index="ite.index"
          v-for="(ite, inde) in item.children"
          :key="'s' + inde"
          @click="routerLink(ite)"
        >
          <span slot="title">{{ ite.title }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      leftActive: "sidebar1-1",
      menuData: [
        {
          index: "sidebar1",
          title: "对账管理",
          children: [
            {
              index: "sidebar1-1",
              title: "业务主体信息核对",
              path: "/checkManage/busiVerify",
            },
            {
              index: "sidebar1-2",
              title: "对账主体信息核对",
              path: "/checkManage/accoVerify",
            },
            {
              index: "sidebar1-3",
              title: "财务主体信息核对",
              path: "/checkManage/financialVerify",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.leftActive = String(key);
    },
    routerLink(ite){
      this.$router.push({path:ite.path})
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/sidebar.less";
.sidebar {
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