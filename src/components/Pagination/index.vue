<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      :prev-text="prevText"
      :next-text="nextText"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'sizes, prev, pager, next'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    },
    prevText: {
      type: String,
      default: '上一页'
    },
    nextText: {
      type: String,
      default: '下一页'
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  data(){
    return{
      state:true
    }
  },
  methods: {
    handleSizeChange(val) {
      // 先手动计算要跳转的最大页数
      const pageMax = Math.ceil(this.total / val) 
      // 判断当前页是否大于最大页数, 如果是就返回最大页数
      if (this.page > pageMax) { 
        // 再设置一个状态值, 当state为false时, handleCurrentChange事件将直接return, 这样就不会出现调用两次接口的情况
        this.state = false 
        this.$emit('pagination', { page: pageMax, limit: val })
      } else {
        this.$emit('pagination', { page: this.currentPage, limit: val })
      }
    },
    handleCurrentChange(val) {
      if (!this.state) {
        this.state = true
        return
      }
      this.$emit('pagination', { page: val, limit: this.pageSize })
    }
  }
}
</script>

<style scoped lang="less">
.pagination-container {
  background: #fff;
  padding: 32px 16px;
  :deep(.el-pagination){
    .btn-prev,.btn-next{
      padding: 0 10px;
    }
  }
}
.pagination-container.hidden {
  display: none;
}
</style>
