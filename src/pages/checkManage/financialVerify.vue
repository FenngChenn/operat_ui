<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangyb
 * @Date: 2022-10-12 16:55:49
 * @LastEditors: wangyb
 * @LastEditTime: 2022-10-13 17:55:45
-->
<template>
  <div class="financial-verify">
    <div class="manage-title">
      <h1 class="title">对账查询</h1>
    </div>
    <div class="manage-content">
      <!-- 表单 -->
      <div class="manage-form">
        <el-form ref="manageForm" :model="manageForm" size="mini">
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
              v-model="manageForm.thirdPayOrderNo"
              placeholder="第三方订单号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="manageForm.mbtsUname"
              placeholder="资金用户名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="manageForm.realName"
              placeholder="客户账号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="manageForm.acctNo"
              placeholder="投保人证件号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="manageForm.payMethod"
              placeholder="支付方式"
            ></el-input>
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
            <el-button type="primary" @click="dialogVisible = true"
              >列定义</el-button
            >
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
        >
          <el-table-column
            v-if="transferData.length > 0"
            type="selection"
            width="55"
          >
          </el-table-column>
          <template v-for="(item, index) in transferArr">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "financialVerify",
  data() {
    return {
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
        branchCode: "", //分公司
        subBranchCode: "", //中支公司
        minBusiAmount: "", //最小金额
        minBusiAmount: "", //最大金额
        policyNo: "", //保单号
        thirdPayOrderNo: "", //第三方订单号
        mbtsUname: "", //资金用户名
        realName: "", //客户账号
        acctNo: "", //投保人证件号
        orderNo: "", //订单号
        payMethod: "", //支付方式
        checkStatus: "", //对账状态
      },
      dialogVisible: false,
      tableList: [
        {
          id: 1,
          sysCode: "上海-出单系统", //出单系统
          source: "上海-数据来源", //数据来源
          waterNo: "上海-流水号", //流水号
          gappNo: "上海-团体投保单号", //团体投保单号
          gpolicyNo: "上海-团体保单号", //团体保单号
          insuranceNo: "上海-投保单号", //投保单号
          policyNo: "上海-保单号", //保单号
          payType: "上海-收付类别", //收付类别
          classCode: "上海-险种代码", //险种代码
          payRecord: "上海-收付标志", //收付标志
          payMethod: "上海-支付方式", //支付方式
          operator: "上海-操作员", //操作员
          deptNo: "上海-业务部门代码", //业务部门代码
          abstr: "上海-摘要", //摘要
          checkAmt: "上海-票面金额", //票面金额
          billAmt: "上海-到账金额", //到账金额
          actualAmt: "上海-实用金额", //实用金额
          checkNo: "上海-支票号", //支票号
          accBankNo: "上海-客户银行账户", //客户银行账户
          cpicAcNo: "上海-公司账号", //公司账号
          customerName: "上海-客户名称", //客户名称
          finDepCode: "上海-财务部门代码", //财务部门代码
          Currency_code: "上海-币种代码", //币种代码
          finMakbillOper: "上海-财务凭证制单确认人", //财务凭证制单确认人
          finMakbillDate: "上海-财务凭证制单确认日", //财务凭证制单确认日
          happenDate: "上海-发生日期", //发生日期
          happenTime: "上海-发生时间", //发生时间
          tranType: "上海-交易类型", //交易类型
          saleMode: "上海-销售渠道", //销售渠道
          theThrdprt: "上海-第三方结算机构", //第三方结算机构
          operType: "上海-业务类型", //业务类型
          paymentActNo: "上海-收付交易号", //收付交易号
          checkStatus: "上海-支票状态", //支票状态
        },
      ],
      transferData: [
        "sysCode",
        "source",
        "waterNo",
        "gappNo",
        "gpolicyNo",
        "insuranceNo",
        "policyNo",
      ],
      transferArr: [
        {
          key: "sysCode",
          label: "出单系统",
        },
        {
          key: "source",
          label: "数据来源",
        },
        {
          key: "waterNo",
          label: "流水号",
        },
        {
          key: "gappNo",
          label: "团体投保单号",
        },
        {
          key: "gpolicyNo",
          label: "团体保单号",
        },
        {
          key: "insuranceNo",
          label: "投保单号",
        },
        {
          key: "policyNo",
          label: "保单号",
        },
        {
          key: "payType",
          label: "收付类别",
        },
        {
          key: "classCode",
          label: "险种代码",
        },
        {
          key: "payRecord",
          label: "收付标志",
        },
        {
          key: "payMethod",
          label: "支付方式",
        },
        {
          key: "operator",
          label: "操作员",
        },
        {
          key: "deptNo",
          label: "业务部门代码",
        },
        {
          key: "abstr",
          label: "摘要",
        },
        {
          key: "checkAmt",
          label: "票面金额",
        },
        {
          key: "billAmt",
          label: "到账金额",
        },

        {
          key: "actualAmt",
          label: "实用金额",
        },
        {
          key: "checkNo",
          label: "支票号",
        },
        {
          key: "accBankNo",
          label: "客户银行账户",
        },
        {
          key: "cpicAcNo",
          label: "公司账号",
        },
        {
          key: "customerName",
          label: "客户名称",
        },
        {
          key: "finDepCode",
          label: "财务部门代码",
        },
        {
          key: "Currency_code",
          label: "币种代码",
        },
        {
          key: "finMakbillOper",
          label: "财务凭证制单确认人",
        },
        {
          key: "finMakbillDate",
          label: "财务凭证制单确认日",
        },
        {
          key: "happenDate",
          label: "发生日期",
        },
        {
          key: "happenTime",
          label: "发生时间",
        },
        {
          key: "tranType",
          label: "交易类型",
        },
        {
          key: "saleMode",
          label: "销售渠道",
        },
        {
          key: "theThrdprt",
          label: "第三方结算机构",
        },
        {
          key: "operType",
          label: "业务类型",
        },
        {
          key: "paymentActNo",
          label: "收付交易号",
        },
        {
          key: "checkStatus",
          label: "支票状态",
        },
      ],
    };
  },
  methods: {
    searchList() {
      console.log(this.manageForm, "来对抗肌肤");
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/style/global.less";
.financial-verify {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  min-width: 960px;
  min-height: 552px;
  position: relative;
  .manage-title {
    .title {
      margin-bottom: 0;
      line-height: 52px;
    }
  }
  .manage-content {
    background: #fff;
    padding: 20px;
    padding-bottom: 14px;
    .manage-form {
      .el-form {
        display: flex;
        flex-wrap: wrap;
        .el-form-item {
          flex: 0 0 200px;
          margin-right: 20px;
          .amount-item {
            display: flex;
            align-items: center;
            .line {
              width: 40px;
              height: 1px;
              margin: 0 5px;
              background: @tabBorder;
            }
            :deep(.el-input) {
              .el-input__inner {
                padding: 0 10px;
              }
            }
          }
          .el-select {
            display: block;
          }
        }
        .button-form-item {
          flex: 0 0 280px;
          text-align: left;
        }
      }
    }
    .manage-view {
      display: flex;
      justify-content: flex-end;
      padding: 32px 10px;
    }
  }
}
</style>