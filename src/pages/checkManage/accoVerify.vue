<template>
    <div class="check-manage">
        <div class="manage-title">
            <h1 class="title">对账主体信息核对</h1>
        </div>
        <div class="manage-content">
            <!-- 表单 -->
            <div class="manage-form">
                <el-form ref="accoManageForm" :model="accoManageForm" size="mini">
                    <el-form-item>
                        <el-date-picker
                            v-model="accoManageForm.businessDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            size="mini" clearable
                            placeholder="业务日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="accoManageForm.dataSource" placeholder="数据来源">
                            <el-option
                                :label="item.name"
                                :value="item.value"
                                v-for="(item, index) in sourceListEnum"
                                :key="index"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="accoManageForm.sysSource" placeholder="系统来源">
                            <el-option
                                :label="item.name"
                                :value="item.value"
                                v-for="(item, index) in sourceListEnum"
                                :key="index"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select
                            v-model="accoManageForm.thirdOrderNo"
                            placeholder="第三方订单号"
                        >
                            <el-option
                                :label="item.name"
                                :value="item.value"
                                v-for="(item, index) in thirdOrderNoArr"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input
                            v-model="accoManageForm.orderNo"
                            placeholder="订单号"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input
                            v-model="accoManageForm.policyNo"
                            placeholder="保单号"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="accoManageForm.payMode" placeholder="支付方式">
                            <el-option label="支付成功" value="1"></el-option>
                            <el-option label="支付失败" value="2"></el-option>
                            <el-option label="支付中" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="accoManageForm.checkStatus" placeholder="对账状态">
                            <el-option label="未对账" value="0"></el-option>
                            <el-option label="对账成功" value="1"></el-option>
                            <el-option label="对账失败" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="button-form-item">
                        <el-button type="primary" @click="searchData">查询</el-button>
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
                >
                    <el-table-column v-if="transferData.length > 0" type="selection" width="55"> </el-table-column>
                    <template v-for="(item, code) in tableColumns">
                        <template v-if="transferData.includes(item.code)">
                            <el-table-column :label="item.label" :key="code" :width="item.width ? item.width : '80px'">
                                <template slot-scope="scope">
                                    {{ scope.row[item.code] }}
                                </template>
                            </el-table-column>
                        </template>
                    </template>
                </el-table>
            </div>
            <!-- 操作按钮 -->
            <div class="manage-view">
                <el-button type="primary" size="mini">业务主体信息核对</el-button>
                <el-button type="primary" size="mini">财务主体信息核对</el-button>
            </div>
            <!-- 分页器 -->
<!--            <pagination-->
<!--                v-show="total > 0"-->
<!--                :total="total"-->
<!--                :page.sync="listQuery.page"-->
<!--                :limit.sync="listQuery.limit"-->
<!--                @pagination="getList"-->
<!--            />-->
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
import {sourceListEnum} from "@/config/operat_enum";
import Transfer from "@/components/Transfer";

export default {
    name: "PayCheckBatch",
    components: {
        Transfer
    },
    created: function () {

    },
    data: function () {
        return {
            sourceListEnum,
            accoManageForm: {
                businessDate: "",  //业务日期
                dataSource: "", //数据来源
                sysSource: "",  //系统来源
                thirdOrderNo: "", //第三方订单号
                orderNo: "", //订单号
                policyNo: "", //保单号
                payMode: "", //支付方式
                checkStatus: "", //对账状态
            },
            thirdOrderNoArr: [],
            tableList: [],
            tableColumns: [
                {code: 'dataSource', label: '数据来源'},
                {code: 'sysCode', label: '出单系统'},
                {code: 'coreSysCode', label: '核心系统'},
                {code: 'checkDate', label: '对账日期'},
                {code: 'tradeDate', label: '交易日期'},
                {code: 'branchCode', label: '分公司代码', width: '100px'},
                {code: 'subBranchCode', label: '中支公司代码', width: '120px'},
                {code: 'thirdOrderNo', label: '第三方支付订单号', width: '180px'},
                {code: 'fundUsername', label: '资金用户名', width: '100px'},
                {code: 'thirdSettleOrg', label: '第三方结算机构', width: '120px'},
                {code: 'insuranceBranchNo', label: '保单归属分公司代码', width: '180px'},
                {code: 'insuranceSubBranchNo', label: '保单归属中支公司代码', width: '190px'},
                {code: 'orderNo', label: '订单号'},
                {code: 'applicationFormNo', label: '投保单号'},
                {code: 'policyNo', label: '保单号'},
                {code: 'endorsementNo', label: '批单号'},
                {code: 'payMode', label: '支付方式'},
                {code: 'cpCategory', label: '收付类别'},
                {code: 'orderAmount', label: '订单金额'},
                {code: 'customerName', label: '客户姓名'},
                {code: 'customerNumber', label: '客户证件号码', width: '120px'},
                {code: 'salesChannel', label: '销售渠道'},
                {code: 'policyEffectiveDate', label: '保单生效日', width: '100px'},
                {code: 'remark', label: '备注'},
                {code: 'checkState', label: '对账状态'},
                {code: 'checkTime', label: '对账时间'},
                {code: 'payableDate', label: '应缴日期'},
            ],
            transferData: ['dataSource','sysCode','coreSysCode','checkDate','tradeDate','branchCode','subBranchCode','thirdOrderNo','fundUsername',
                'thirdSettleOrg','insuranceBranchNo','insuranceSubBranchNo','orderNo'],
            // transferArr:['dataSource','sysCode','coreSysCode','checkDate','tradeDate','branchCode','subBranchCode','thirdOrderNo','fundUsername',
            //     'thirdSettleOrg','insuranceBranchNo','insuranceSubBranchNo','orderNo','applicationFormNo','policyNo','endorsementNo','payMode',
            //     'cpCategory','orderAmount','customerName','customerNumber','salesChannel','policyEffectiveDate','remark','checkState','checkDate',
            //     'payableDate'],
            transferArr: [
                {key: 'dataSource', label: '数据来源'},
                {key: 'sysCode', label: '出单系统'},
                {key: 'coreSysCode', label: '核心系统'},
                {key: 'checkDate', label: '对账日期'},
                {key: 'tradeDate', label: '交易日期'},
                {key: 'branchCode', label: '分公司代码'},
                {key: 'subBranchCode', label: '中支公司代码'},
                {key: 'thirdOrderNo', label: '第三方支付订单号'},
                {key: 'fundUsername', label: '资金用户名'},
                {key: 'thirdSettleOrg', label: '第三方结算机构'},
                {key: 'insuranceBranchNo', label: '保单归属分公司代码'},
                {key: 'insuranceSubBranchNo', label: '保单归属中支公司代码'},
                {key: 'orderNo', label: '订单号'},
                {key: 'applicationFormNo', label: '投保单号'},
                {key: 'policyNo', label: '保单号'},
                {key: 'endorsementNo', label: '批单号'},
                {key: 'payMode', label: '支付方式'},
                {key: 'cpCategory', label: '收付类别'},
                {key: 'orderAmount', label: '订单金额'},
                {key: 'customerName', label: '客户姓名'},
                {key: 'customerNumber', label: '客户证件号码'},
                {key: 'salesChannel', label: '销售渠道'},
                {key: 'policyEffectiveDate', label: '保单生效日'},
                {key: 'remark', label: '备注'},
                {key: 'checkState', label: '对账状态'},
                {key: 'checkTime', label: '对账时间'},
                {key: 'payableDate', label: '应缴日期'},
            ],
            dialogVisible: false,
        }
    },
    methods: {
        searchData() {},
        getTransferData(val) {
            this.transferData = val
        },
        submit() {},
    },
    computed: {
    },
    watch: {
    }
}
</script>
<style lang="less" scoped>
@import "~@/style/checkManage.less";
</style>