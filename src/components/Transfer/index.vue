<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangyb
 * @Date: 2022-10-12 13:48:18
 * @LastEditors: wangyb
 * @LastEditTime: 2022-10-12 14:09:37
-->
<template>
  <div class="transfer-container">
    <el-transfer 
      :titles="titles" 
      v-model="currentData" 
      :data="transferArr"
      @change="handCurrentChange"
      >
    </el-transfer>
  </div>
</template>

<script>
export default {
  name:'Transfer',
  props:{
    titles:{
      type: Array,
      default() {
        return []
      }
    },
    transferArr:{
      type: Array,
      default() {
        return []
      }
    },
    transferData:{
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return{
      currentData:[]
    }
  },
  created(){
    this.currentData = this.transferData
  },
  methods:{
    handCurrentChange(){
      this.$emit('getTransfer', this.currentData)
    }
  }
}
</script>

<style>

</style>