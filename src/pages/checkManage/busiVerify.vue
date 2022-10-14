<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangyb
 * @Date: 2022-10-11 11:41:52
 * @LastEditors: wangyb
 * @LastEditTime: 2022-10-14 09:20:20
-->
<template>
  <div class="check-manage">
    <!-- tab -->
    <!-- <div class="tab-list">
      <div
        class="tab-item pointer"
        :class="{ 'show-check': index === selectItemIndex }"
        v-for="(item, index) in tabList"
        :key="index"
        @click="tabItemClick(index)"
      >
        {{ item.v }}
      </div>
    </div> -->
    <div class="manage-title">
      <h1 class="title">对账查询</h1>
    </div>
    <div class="manage-content">
      <!-- 表单 -->
      <div class="manage-form">
        <el-form ref="manageForm" :model="manageForm" size="mini">
          <el-form-item>
            <el-select v-model="manageForm.source" placeholder="数据来源">
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item, index) in sourceArr"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="manageForm.branchCode" placeholder="分公司">
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item, index) in branchArr"
                :key="'brachCode' + index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="manageForm.subBranchCode"
              placeholder="中支公司"
            >
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item, index) in subBranchArr"
                :key="'subBranchCode' + index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div class="amount-item">
              <el-input
                v-model="manageForm.minBusiAmount"
                placeholder="最小金额"
              ></el-input>
              <div class="line"></div>
              <el-input
                v-model="manageForm.maxBusiAmount"
                placeholder="最大金额"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="manageForm.policyNo"
              placeholder="保单号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="manageForm.orderNo"
              placeholder="订单号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="manageForm.tradeStatus" placeholder="支付状态">
              <el-option label="支付成功" value="1"></el-option>
              <el-option label="支付失败" value="2"></el-option>
              <el-option label="支付中" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="manageForm.checkStatus" placeholder="对账状态">
              <el-option label="未对账" value="0"></el-option>
              <el-option label="对账成功" value="1"></el-option>
              <el-option label="对账失败" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="button-form-item">
            <el-button type="primary" @click="searchList">查询</el-button>
            <el-button type="primary">导出</el-button>
            <el-button type="primary" @click="dialogVisible = true">列定义</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- table表格 -->
      <div class="manage-table">
        <el-table
          :data="tableList"
          element-loading-text="Loading..."
          border
          fit
          highlight-current-row
          :cell-style="{ textAlign: 'center' }" 
          :header-cell-style="{ textAlign: 'center' }"
          size="mini"
          empty-text
        >
          <el-table-column v-if="transferData.length > 0" type="selection" width="55"> </el-table-column>
          <template v-for="(item,index) in transferArr">
            <template v-if="transferData.includes(item.key)">
              <el-table-column :key="index" align="center" :label="item.label">
                <template slot-scope="scope">
                  {{ scope.row[item.key] }}
                </template>
              </el-table-column>
            </template>
          </template>
        </el-table>
      </div>
      <!-- 操作按钮 -->
      <div class="manage-view">
        <el-button type="primary" size="mini">对账主体信息核对</el-button>
        <el-button type="primary" size="mini">财务主体信息核对</el-button>
      </div>
      <!-- 分页器 -->
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
    <!-- 穿梭框弹窗 -->
    <el-dialog
      title="列定义"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <div class="transfer-content">
        <transfer 
          :titles="['未选中列表','已选中列表']"
          :transferData="transferData"
          :transferArr.sync="transferArr"
          @getTransfer="getTransferData"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import Transfer from "@/components/Transfer";
import { getProductList } from 'api/checkManage/index'
export default {
  name: "busiVerify",
  data() {
    return {
      selectItemIndex: 0,
      tabList: [
        {
          k: 0,
          v: "业务主体信息核对",
        },
        {
          k: 1,
          v: "对账主体信息核对",
        },
        {
          k: 2,
          v: "财务主体信息核对",
        },
      ],
      sourceArr: [
        {
          name: "上海",
          value: "1",
        },
        {
          name: "北京",
          value: "2",
        },
      ],
      branchArr: [
        {
          name: "上海分公司",
          value: "11",
        },
        {
          name: "北京分公司",
          value: "22",
        },
      ],
      subBranchArr: [
        {
          name: "上海分公司",
          value: "11",
        },
        {
          name: "北京分公司",
          value: "22",
        },
      ],
      manageForm: {
        source: "", //数据来源
        branchCode: "", //分公司
        subBranchCode: "", //中支公司
        minBusiAmount: "", //最小金额
        maxBusiAmount: "", //最大金额
        policyNo: "", //保单号
        orderNo: "", //订单号
        tradeStatus: "", //支付状态
        checkStatus: "", //对账状态
      },
      tableList: [
        {
          id: 1,
          sysCode: "上海-出单系统", //出单系统
          source: "上海-数据来源", //数据来源
          branchCode: "上海-分公司", //分公司
          subBranchCode: "上海-中支公司", //中支公司
          busiType: "上海-业务类型", //业务类型
          busiAmount: "上海-业务金额", //业务金额
          orderNo: "上海-订单号", //订单号
          insuranceNo: "上海-投保单号", //投保单号
          policyNo: "上海-保单号", //保单号
          endorsementNo: "上海-批单号", //批单号
          opType: "上海-操作类型", //操作类型
          compNo: "上海-赔案号", //赔案号
          dealStatus: "上海-交易状态", //交易状态
          checkStatus: "上海-对账状态", //对账状态
          checkDate: "上海-对账时间", //对账时间
          dueDate: "上海-应缴日期", //应缴日期
        },
        {
          id: 1,
          sysCode: "上海", //出单系统
          source: "上海", //数据来源
          branchCode: "上海", //分公司
          subBranchCode: "上海", //中支公司
          busiType: "上海", //业务类型
          busiAmount: "上海", //业务金额
          orderNo: "上海", //订单号
          insuranceNo: "上海", //投保单号
          policyNo: "上海", //保单号
          endorsementNo: "上海", //批单号
          opType: "上海", //操作类型
          compNo: "上海", //赔案号
          dealStatus: "上海", //交易状态
          checkStatus: "上海", //对账状态
          checkDate: "上海", //对账时间
          dueDate: "上海", //应缴日期
        },
        {
          id: 1,
          sysCode: "上海", //出单系统
          source: "上海", //数据来源
          branchCode: "上海", //分公司
          subBranchCode: "上海", //中支公司
          busiType: "上海", //业务类型
          busiAmount: "上海", //业务金额
          orderNo: "上海", //订单号
          insuranceNo: "上海", //投保单号
          policyNo: "上海", //保单号
          endorsementNo: "上海", //批单号
          opType: "上海", //操作类型
          compNo: "上海", //赔案号
          dealStatus: "上海", //交易状态
          checkStatus: "上海", //对账状态
          checkDate: "上海", //对账时间
          dueDate: "上海", //应缴日期
        }
      ],
      total: 12,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
      },
      dialogVisible:false,
      transferData:['sysCode','source','branchCode','subBranchCode','busiType','busiAmount','orderNo'],
      transferArr:[
        {
          key:'sysCode',
          label:'出单系统'
        },
        {
          key:'source',
          label:'数据来源'
        },
        {
          key:'branchCode',
          label:'分公司'
        },
        {
          key:'subBranchCode',
          label:'中支公司'
        },
        {
          key:'busiType',
          label:'业务类型'
        },
        {
          key:'busiAmount',
          label:'业务金额'
        },
        {
          key:'orderNo',
          label:'订单号'
        },
        {
          key:'insuranceNo',
          label:'投保单号'
        },
        {
          key:'policyNo',
          label:'保单号'
        },
        {
          key:'endorsementNo',
          label:'批单号'
        },
        {
          key:'opType',
          label:'操作类型'
        },
        {
          key:'compNo',
          label:'赔案号'
        },
        {
          key:'dealStatus',
          label:'交易状态'
        },
        {
          key:'checkStatus',
          label:'对账状态'
        },
        {
          key:'checkDate',
          label:'对账时间'
        },
        {
          key:'dueDate',
          label:'应缴日期'
        }
      ]
    };
  },
  components: {
    Pagination,
    Transfer
  },
  created(){
    
  },
  methods: {
    tabItemClick(index) {
      this.selectItemIndex = index;
    },
    searchList() {
      console.log(this.manageForm);
    },
    getList() {
      console.log(this.listQuery);
    },
    getTransferData(val) {
      this.transferData = val
    },
    submit(){
      console.log(this.transferData,'transferData')
      
      this.dialogVisible = false
    }
  },
};
</script>
<style lang="less" scoped>
@import "~@/style/checkManage.less";
</style>