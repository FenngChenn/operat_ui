<style lang="less" type="text/less">

    #whiteContent {
        width: 90%;
        height: 100%;
        margin: 0 auto;
        min-width: 960px;
        position: relative;

        .el-header {
            background-color: #fff;
            height: auto !important;
        }
        .el-main {
            width: 100%;
            background-color: #fff;
            box-sizing: border-box;
            padding: 0;

            > .el-container{
                height: 100%;

                > .el-header {
                    overflow: visible;
                }
            }
        }
        .el-footer {
            background-color: #fff;
            padding: 0;
            height: auto !important;

            .el-pagination {
                margin-top: 14px;
            }
        }

        > .el-header {
            line-height: 52px;
            background-color: #E7E7E7;

            h1 {
                margin-bottom: 0;
            }
        }

        > .el-main {
            min-height: 500px;
            padding: 20px;
            padding-bottom: 14px;
            overflow: hidden;
        }

        .content {
            padding: 20px;
        }
        /*按钮样式*/
        .content .display-none{
            display: none;
        }

        /*表格部分*/
        .table-setion {
            position: absolute;
            width: 100%;
            height: 44%;
            transition: top 1s, height 1s;
            background-color: #fff;
        }
        .table-up {
            top: 0;
            height: 442px;
        }

        .table-down {
            top: 48%;
            height: 38%;
        }

        .table-setion img {
            cursor: pointer;
            vertical-align: top;
        }

        /*设置弹出框公共样式*/
        .el-checkbox {
            display: block;
            margin-left: 50px;
            line-height: 35px;

        }
    }
</style>

<template>
    <el-container id="whiteContent" v-loading="loading"
                  element-loading-background="rgba(230, 230, 230, 0.1)">
        <el-header>
            <h1 v-text="currentTitle"></h1>
        </el-header>
        <el-main class="content">
            <div class="button-list-left">
                <el-form>
                    <el-row>
                        <el-col>
                            <span><br/></span>
                            <span><br/></span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-button type="primary" plain size="mini" @click="showDialog('dialogVisible')">全部公司</el-button>
                            <el-button type="primary" plain size="mini" @click="showDialog('accDialogVisible')">支付方式</el-button>
                            <el-button type="primary" plain size="mini" @click="showDialog('inactiveDialogVisible')">收付属性</el-button>
                            <el-button type="primary" plain size="mini" :class="{'display-none':showStatisticCaliber3()}"  @click="showDialog('FHDialogVisible')">通&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp道</el-button>
                            <el-button type="primary" plain size="mini" :class="{'display-none':showSaleName()}" @click="showDialog('showSaleNameVisible')">销售渠道</el-button>
                            <el-button type="primary" plain size="mini" :class="{'display-none':showStatisticCaliber()}" @click="showDialog('statisticCaliberVisible')">统计口径</el-button>
                            <el-button type="primary" plain size="mini" :class="{'display-none':showStatisticCaliber2()}" @click="showDialog('statisticCaliberVisible2')">统计口径</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- <el-button type="primary" plain size="mini">全部银行</el-button> -->
                <!-- <el-input v-model="accNo" placeholder="请输入账户号" size="mini"
                           clearable style="width:150px;margin-bottom:4px"
                           @blur="queryByNo" :class="{'display-none':showAccBank()}">
                 </el-input>-->
            </div>
            <div class="button-list-right" >

                <el-button type="warning" size="mini" @click="exportFun">导出</el-button>
            </div>
            <router-view @transmitTitle="currentTitle= $event"
                         @getTableData="getRouterData"
                         @exportOptype="exportOptype=$event"
                         @updatePaymentList="updatePaymentList"
                         @created="created"
                         @initPayMode="initPayMode"
                         :tableData="childData"
                         @clearSearchData="clearSearchData"
            ></router-view>
        </el-main>
        <!--请选择公司弹出框-->
        <el-dialog :visible.sync="dialogVisible"
                   class="comDialog"
                   width="810px" title="请选择公司"
                   :close-on-click-modal="false"
                   top="100px">
            <h1 slot="title" class="dialog-title">请选择公司</h1>
            <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-tree
                    :data="treeList"
                    node-key="org_id"
                    show-checkbox
                    ref="tree"
                    default-expand-all>
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.data.name }}</span>
                </span>
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" size="mini" plain @click="dialogVisible=false">取 消</el-button>
                <el-button type="warning" size="mini" @click="queryByOrg">确 定</el-button>
            </span>
        </el-dialog>
        <!--账户性质弹出框-->
        <el-dialog :visible.sync="accDialogVisible"
                   width="600px" title="请选择支付方式"
                   :close-on-click-modal="false"
                   top="100px" >
            <h1 slot="title" class="dialog-title">请选择支付方式</h1>
            <el-select v-model="checkModeOfPaymentList" clearable>
                <el-option v-for="acc in modeOfPaymentList"
                           :key="acc.name"
                           :label="acc.name"
                           :value="acc.name">{{acc.name}}</el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" size="mini" plain @click="accDialogVisible=false">取 消</el-button>
                <el-button type="warning" size="mini" @click="queryByAcc">确 定</el-button>
            </span>
        </el-dialog>
        <!--收付属性弹出框-->
        <el-dialog :visible.sync="inactiveDialogVisible"
                   width="600px" title="请选择收付属性"
                   :close-on-click-modal="false"
                   top="100px">
            <h1 slot="title" class="dialog-title">请选择收付属性</h1>
            <!--<el-checkbox-group v-model="checkModeList">
                <el-checkbox v-for="mode in modeList"
                             :key="mode.id"
                             :label="mode.id" >{{mode.name}}</el-checkbox>
            </el-checkbox-group>-->
            <el-select v-model="checkModeList" clearable>
                <el-option v-for="mode in modeList"
                           :key="mode.name"
                           :label="mode.name"
                           :value="mode.name">{{mode.name}}</el-option>
            </el-select>
            <!-- <select v-model="selected">
                 <option selected>A</option>
                 <option>B</option>
                 <option>C</option>
             </select>-->
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" size="mini" plain @click="inactiveDialogVisible=false">取 消</el-button>
                <el-button type="warning" size="mini" @click="queryByMode">确 定</el-button>
            </span>
        </el-dialog>

        <!--通道-->
        <el-dialog :visible.sync="FHDialogVisible"
                   width="600px" title="请选择通道"
                   :close-on-click-modal="false"
                   top="100px">
            <h1 slot="title" class="dialog-title">请选择通道</h1>
            <!--<el-checkbox-group v-model="checkModeList">
                <el-checkbox v-for="mode in modeList"
                             :key="mode.id"
                             :label="mode.id" >{{mode.name}}</el-checkbox>
            </el-checkbox-group>-->
            <el-select v-model="FHLIst" clearable>
                <el-option v-for="curChannel in curChannelAllList"
                           :key="curChannel.channel_desc"
                           :label="curChannel.channel_desc"
                           :value="curChannel.channel_code">{{curChannel.channel_desc}}</el-option>
            </el-select>
            <!--

                        <el-option v-for="curChannel in curChannelList"
                                   :key="curChannel.channel_desc"
                                   :label="curChannel.channel_desc"
                                   :value="curChannel.channel_code">
                        </el-option>-->
            <!-- <select v-model="selected">
                 <option selected>A</option>
                 <option>B</option>
                 <option>C</option>
             </select>-->
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" size="mini" plain @click="FHDialogVisible=false">取 消</el-button>
                <el-button type="warning" size="mini" @click="queryByChannel222">确 定</el-button>
            </span>
        </el-dialog>



        <!--销售渠道-->
        <el-dialog :visible.sync="showSaleNameVisible"
                   width="600px" title="请选择销售渠道"
                   :close-on-click-modal="false"
                   top="100px">
            <h1 slot="title" class="dialog-title">请选择销售渠道</h1>
            <el-select v-model="checkShowSaleNameList" clearable>
                <el-option v-for="mode in showSaleNameList"
                           :key="mode.name"
                           :label="mode.name"
                           :value="mode.id">{{mode.name}}</el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" size="mini" plain @click="showSaleNameVisible=false">取 消</el-button>
                <el-button type="warning" size="mini" @click="querySaleName">确 定</el-button>
            </span>
        </el-dialog>
        <!--统计口径弹出框-->
        <el-dialog :visible.sync="statisticCaliberVisible"
                   width="600px" title="请选择统计口径"
                   :close-on-click-modal="false"
                   top="100px">
            <h1 slot="title" class="dialog-title">请选择统计口径</h1>
            <el-select v-model="checkStatisticCaliberList" clearable>
                <el-option v-for="mode in statisticCaliberList"
                           :key="mode.name"
                           :label="mode.name"
                           :value="mode.name">{{mode.name}}</el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" size="mini" plain @click="statisticCaliberVisible=false">取 消</el-button>
                <el-button type="warning" size="mini" @click="queryByStatisticCaliber">确 定</el-button>
            </span>
        </el-dialog>
        <!--统计口径弹出框 按照月份、按照天数）-->
        <el-dialog :visible.sync="statisticCaliberVisible2"
                   width="600px" title="请选择统计口径"
                   :close-on-click-modal="false"
                   top="100px">
            <h1 slot="title" class="dialog-title">请选择统计口径</h1>
            <el-checkbox-group v-model="checkStatisticCaliberList2">
                <el-checkbox v-for="mode in statisticCaliberList2" :key="mode.id" :label="mode.id" >{{mode.name}}</el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" size="mini" plain @click="statisticCaliberVisible2=false">取 消</el-button>
                <el-button type="warning" size="mini" @click="queryByStatisticCaliber2">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>

    //import ElRow from "element-ui/packages/row/src/row";

    export default {
        //components: {ElRow},
        name: "WhiteContent",
        created: function () {

            // this.$axios({
            //     url: this.queryUrl + "commProcess",
            //     method: "post",
            //     data: {
            //         optype: "org_curlist"
            //     }
            // }).then((result) => {
            //     if (result.data.error_msg) {
            //         this.$message({
            //             type: "error",
            //             message: result.data.error_msg,
            //             duration: 2000
            //         })
            //     } else {
            //         var data = result.data.data;
            //         this.treeList.push(this.setTreeData(data));
            //     }
            // }).catch(function (error) {
            //     console.log(error);
            // })

            //获取通道信息
            this.$axios({
                url: this.queryUrl +"normalProcess",
                method: "post",
                data: {
                    optype: "paymentSummary_curChannelList"
                }
            }).then((result) => {
                if (result.data.error_msg) {
                    this.$message({
                        type: "error",
                        message: result.data.error_msg,
                        duration: 2000
                    })
                } else {
                    let data = result.data.data;

                    let list = [];
                    for (let i in data) {
                        list.push({
                            channel_code: data[i].channel_code,
                            channel_desc: data[i].channel_desc
                        })
                    }
                    this.curChannelList=list;
                    this.curChannelAllList=list;
                }
            }).catch(function (error) {
                console.log(error);
            })

            let constants = JSON.parse(window.sessionStorage.getItem("constants"));
            let mode = constants.PayOrRecv; //收或付
            let modeArr = [];
            for (let i in mode) {
                modeArr.push({
                    id: i,
                    name: mode[i]
                })
            }
            this.modeList = modeArr;

            /* let catgList = JSON.parse(window.sessionStorage.getItem("catgList"));
             let accAttrObj = {};
             for(var i = 0; i < catgList.length; i++){
                 if(catgList[i].code == "acc_attr"){
                     accAttrObj = catgList[i].items;
                     continue;
                 }
             }*/
            let accAttrObj = constants.CurrentSftPayMode; //收付费管理_支付方式,目前只有柜面收收付和批量收付
            let accAttrArr = [];
            for (let i in accAttrObj) {
                accAttrArr.push({
                    id: i,
                    name: accAttrObj[i]
                })
            }
            this.modeOfPaymentList = accAttrArr;

            let statisticCaliberObjArr = [];
            statisticCaliberObjArr.push({ id: 1,name: "总数"},{ id: 2,name: "成功"},{ id: 3,name: "失败"})
            this.statisticCaliberList = statisticCaliberObjArr;

            let statisticCaliberObjArr2 = [];
            statisticCaliberObjArr2.push({ id: 1,name: "按照天数"},{ id: 2,name: "按照月份"})
            this.statisticCaliberList2 = statisticCaliberObjArr2;

            let showSaleNameObjArr = [];//销售渠道
            /*  01	顾问行销（代理人）
                02 	电话行销
                03	银行代理
                05	Digital*/
            showSaleNameObjArr.push({ id: '01',name: "顾问行销"},{ id: '02',name: "电话行销"},{ id: '03',name: "银行代理"},{ id: '05',name: "网销渠道"})
            this.showSaleNameList = showSaleNameObjArr


        },
        data: function () {
            return {
                checkAll:false,
                queryUrl: this.$store.state.queryUrl,
                currentTitle: "",
                childData: {},
                loading: false,
                dialogVisible: false,
                treeList: [],
                curRouterParam: {},
                accDialogVisible: false,
                inactiveDialogVisible: false,
                FHDialogVisible: false,
                statisticCaliberVisible: false,
                statisticCaliberVisible2: false,
                showSaleNameVisible: false,
                modeList: [],
                checkModeList: "收",
                FHLIst:"",
                showSaleNameList: [],
                checkStatisticCaliberList: "", //统计口径
                checkStatisticCaliberList2: "", //统计口径
                checkShowSaleNameList: "", //销售渠道
                curChannel:"", //通道
                curChannelList: [],
                curChannelAllList :[],
                checkModeOfPaymentList:"",
                modeOfPaymentList :[],
                outTime: "",
                bankLongding: false,
                exportOptype: "",//导入url
            }
        },
        methods: {
            updatePaymentList(val) {
                this.modeOfPaymentList = val;
            },
            initPayMode: function () {
                this.checkModeOfPaymentList="批量收付";
            },
            created: function () {
                this.queryUrl=this.$store.state.queryUrl;
                this.currentTitle="";
                this.childData={};
                this.loading=false;
                this.dialogVisible=false;
                this.treeList=[];
                this.curRouterParam={};
                this.accDialogVisible=false;
                this.inactiveDialogVisible=false;
                this.FHDialogVisible=false;
                this.statisticCaliberVisible=false;
                this.statisticCaliberVisible2=false;
                this.showSaleNameVisible=false;
                this.modeList=[];
                this.checkModeList="收";
                this.FHLIst="";
                this.showSaleNameList=[];
                this.checkStatisticCaliberList=""; //统计口径
                this.checkStatisticCaliberList2=""; //统计口径
                this.checkShowSaleNameList=""; //销售渠道
                this.curChannel=""; //通道
                this.curChannelList=[];
                this.curChannelAllList =[];
                this.checkModeOfPaymentList="";
                this.modeOfPaymentList =[];
                this.outTime="";
                this.bankLongding=false;
                this.exportOptype="";//导入url
                this.$axios({
                    url: this.queryUrl + "commProcess",
                    method: "post",
                    data: {
                        optype: "org_curlist"
                    }
                }).then((result) => {
                    if (result.data.error_msg) {
                        this.$message({
                            type: "error",
                            message: result.data.error_msg,
                            duration: 2000
                        })
                    } else {
                        var data = result.data.data;
                        this.treeList.push(this.setTreeData(data));
                    }
                }).catch(function (error) {
                    console.log(error);
                })

                //获取通道信息
                this.$axios({
                    url: this.queryUrl +"normalProcess",
                    method: "post",
                    data: {
                        optype: "paymentSummary_curChannelList"
                    }
                }).then((result) => {
                    if (result.data.error_msg) {
                        this.$message({
                            type: "error",
                            message: result.data.error_msg,
                            duration: 2000
                        })
                    } else {
                        let data = result.data.data;

                        let list = [];
                        for (let i in data) {
                            list.push({
                                channel_code: data[i].channel_code,
                                channel_desc: data[i].channel_desc
                            })
                        }
                        this.curChannelList=list;
                        this.curChannelAllList=list;
                    }
                }).catch(function (error) {
                    console.log(error);
                })

                let constants = JSON.parse(window.sessionStorage.getItem("constants"));
                let mode = constants.PayOrRecv; //收或付
                let modeArr = [];
                for (let i in mode) {
                    modeArr.push({
                        id: i,
                        name: mode[i]
                    })
                }
                this.modeList = modeArr;

                /* let catgList = JSON.parse(window.sessionStorage.getItem("catgList"));
                 let accAttrObj = {};
                 for(var i = 0; i < catgList.length; i++){
                     if(catgList[i].code == "acc_attr"){
                         accAttrObj = catgList[i].items;
                         continue;
                     }
                 }*/
                let accAttrObj = constants.CurrentSftPayMode; //收付费管理_支付方式,目前只有柜面收收付和批量收付
                let accAttrArr = [];
                for (let i in accAttrObj) {
                    accAttrArr.push({
                        id: i,
                        name: accAttrObj[i]
                    })
                }
                this.modeOfPaymentList = accAttrArr;

                let statisticCaliberObjArr = [];
                statisticCaliberObjArr.push({ id: 1,name: "总数"},{ id: 2,name: "成功"},{ id: 3,name: "失败"})
                this.statisticCaliberList = statisticCaliberObjArr;

                let statisticCaliberObjArr2 = [];
                statisticCaliberObjArr2.push({ id: 1,name: "按照天数"},{ id: 2,name: "按照月份"})
                this.statisticCaliberList2 = statisticCaliberObjArr2;

                let showSaleNameObjArr = [];//销售渠道
                /*  01	顾问行销（代理人）
                    02 	电话行销
                    03	银行代理
                    05	Digital*/
                /*showSaleNameObjArr.push({ id: '01',name: "顾问行销（代理人）"},{ id: '02',name: "电话行销"},{ id: '03',name: "银行代理"},{ id: '04',name: "Digital"})*/
                showSaleNameObjArr.push({ id: '01',name: "顾问行销"},{ id: '02',name: "电话行销"},{ id: '03',name: "银行代理"},{ id: '05',name: "网销渠道"})
                this.showSaleNameList = showSaleNameObjArr


            },
            getRouterData: function (routerData, type) {
                if (!type) {
                    this.curRouterParam = routerData;
                    if (this.$refs.tree)
                        this.$refs.tree.setCheckedKeys([]);

                    this.checkStatisticCaliberList = "";
                    //this.checkModeList = "";
                    this.curChannel = "";

                    this.loading = true;
                    this.$axios({
                        url: this.queryUrl + "normalProcess",
                        method: "post",
                        data: routerData
                    }).then((result) => {
                        if (result.data.error_msg) {
                        this.$message({
                            type: "error",
                            message: result.data.error_msg,
                            duration: 2000
                        })
                    } else {
                        var currentData = result.data;
                        this.childData = currentData;
                        this.loading = false;
                        //机构查询后关闭弹框
                        if (type) {
                            this[type] = false;
                        }
                    }}).catch(function (error) {
                        console.log(error);
                    })
                }else{
                    if (this.curRouterParam.params.interactive_modes=="") {
                        if (this[type]) {
                            this.$alert("请选择收付属性。");
                            this[type] = false;
                            return;
                        }else {
                            return;
                        }
                    }
                    if (this.curRouterParam.optype==="settlementAgeAnalysis_detaillist"){
                        if (this.curRouterParam.params.pay_modes=="") {
                            if (this[type]) {
                                this.$alert("请选择支付方式。");
                                this[type] = false;
                                return;
                            }else {
                                return;
                            }
                        }
                    }

                    /*                alert(this.curRouterParam.optype);
                                    alert(this[type]);*/
                    if (this.curRouterParam.optype=="paymentSuccessRate_detaillist") {
                        if (this.curRouterParam.params.pay_modes=="") {
                            if (this[type]) {
                                alert("请选择支付方式。");
                                this[type] = false;
                                return;
                            }else {
                                return;
                            }
                        }
                    }


                    this.loading = true;
                    this.$axios({
                        url: this.queryUrl + "normalProcess",
                        method: "post",
                        data: routerData
                    }).then((result) => {
                        if (result.data.error_msg) {
                        this.$message({
                            type: "error",
                            message: result.data.error_msg,
                            duration: 2000
                        })
                    } else {
                        var currentData = result.data;
                        this.childData = currentData;
                        this.loading = false;
                        //机构查询后关闭弹框
                        if (type) {
                            this[type] = false;
                        }
                    }
                }).catch(function (error) {
                        console.log(error);
                    })
                }
            },
            //显示公司弹出框
            showDialog: function (type) {
                this[type] = true;
            },
            handleCheckAllChange: function(val) {
                if (this.checkAll) {
                    this.$refs.tree.setCheckedNodes(this.treeList);
                } else {
                    this.$refs.tree.setCheckedKeys([]);
                }
            },

            //显示公司弹出框
            clearSearchData: function () {
                this.checkModeOfPaymentList = "";
                this.FHLIst = "";
                //this.checkModeList = "";
                this.checkShowSaleNameList = "";
                this.checkStatisticCaliberList = "";
            },
            //设置树数据的转换
            setTreeData: function (data) {
                /*
                *将后台返回的数据转换为树结构数据
                *
                *  1、创建树结构的数据 并保存根节点
                *  2、递归将数据添加进根节点
                *     2.1 遍历获取当前层级的下一层数据 并根据parentId添加到其父节点下面
                *     2.2 保存当前层级数据 作为下一次遍历时的父节点
                *  3、终止条件：当前data中无数据
                *
                * */
                //设置根节点
                var treeData = {};
                var oneItem = data[0];
                for (var k in oneItem) {
                    treeData[k] = oneItem[k];
                }
                treeData.children = [];

                //遍历设置子节点
                function setTree(data, tier, currentDatas) {
                    var allDatas = []; //未使用全部数据
                    //第二级数据的设置
                    if (!currentDatas) {
                        var newCurrentDatas = []; //当前层级数据
                        for (var i = 0; i < data.length; i++) {
                            if (i > 0) {
                                var item = data[i];
                                if (item.level_num == 2) {
                                    item.children = [];
                                    treeData.children.push(item);
                                    newCurrentDatas.push(item);
                                } else {
                                    allDatas.push(item);
                                }
                            }
                        }
                        if (allDatas.length > 0) {
                            setTree(allDatas, ++tier, newCurrentDatas);
                        }
                    }
                    //第三级及以后层级数据设置
                    if (currentDatas) {
                        var newCurrentDatas = [];
                        for (var i = 0; i < data.length; i++) {
                            var item = data[i];
                            if (item.level_num == tier) {
                                var thisParentId = item.parent_id;
                                currentDatas.forEach(function (value) {
                                    if (value.org_id == thisParentId) {
                                        item.children = [];
                                        value.children.push(item);
                                        newCurrentDatas.push(item);
                                    }
                                })
                            } else {
                                allDatas.push(item);
                            }
                        }
                        if (allDatas.length > 0) {
                            setTree(allDatas, ++tier, newCurrentDatas);
                        }
                    }
                };
                setTree(data, 2);
                return treeData;
            },
            //页面上方查询组件的显示
            showCurChannel: function(){
                var routerParams = this.curRouterParam;
                if(routerParams.optype == "settlementAgeAnalysis_detaillist"){ //资金结算账龄分析报表
                    return true;
                }
                return false;
            },//显示销售渠道
            showSaleName: function(){
                var routerParams = this.curRouterParam;
                if(routerParams.optype == "insuranceBusinessChannel_detaillist"){ //保险业务收支分渠道统计
                    return false;
                }
                return true;
            },//显示 统计口径 成功 失败
            showStatisticCaliber: function(){
                var routerParams = this.curRouterParam;
                if(routerParams.optype == "paymentSuccessRate_detaillist"){ //保险业务收支分渠道统计
                    return true;
                }
                if(routerParams.optype == "settlementAgeAnalysis_detaillist"){ //资金结算账龄分析报表
                    return true;
                }
                return false;
            },//显示 统计口径（不强制选择，选择内容为：按照月份、按照天数）
            showStatisticCaliber2: function(){
                var routerParams = this.curRouterParam;
                if(routerParams.optype == "paymentSuccessRate_detaillist"){ //保险业务收支分渠道统计
                    return false;
                }
                return true;
            },
            showStatisticCaliber3: function(){
                var routerParams = this.curRouterParam;
                if(routerParams.optype == "insuranceBusinessChannel_detaillist"){
                    return false;
                }else if(routerParams.optype == "paymentSuccessRate_detaillist"){
                    return false;
                }else if(routerParams.optype == "paymentSummary_detaillist"){
                    return false;
                }

                return true;
            },
            //显示 导出
            showExport: function(){
                var routerParams = this.curRouterParam;
                if(routerParams.optype == "paymentSuccessRate_detaillist"){ //成功率
                    return true;
                }
                return false;
            },
            //查询
            queryByOrg: function () {
                this.curRouterParam.params.interactive_modes = this.checkModeList;
                this.curRouterParam.params.org_ids = this.$refs.tree.getCheckedKeys();
                this.curRouterParam.params.page_num = 1;
                this.getRouterData(this.curRouterParam, 'dialogVisible');
            },
            //收费属性
            queryByMode: function () {
                this.curRouterParam.params.interactive_modes = this.checkModeList;
                this.curRouterParam.params.page_num = 1;
                this.getRouterData(this.curRouterParam, 'inactiveDialogVisible');
            },

            //通道
            queryByChannel222: function () {
                this.curRouterParam.params.interactive_modes = this.checkModeList;
                this.curRouterParam.params.channel_code = this.FHLIst;
                this.curRouterParam.params.page_num = 1;
                this.getRouterData(this.curRouterParam, 'FHDialogVisible');
            },

            //销售渠道
            querySaleName: function () {
                this.curRouterParam.params.interactive_modes = this.checkModeList;
                this.curRouterParam.params.sale_names = this.checkShowSaleNameList;
                this.curRouterParam.params.page_num = 1;
                this.getRouterData(this.curRouterParam, 'showSaleNameVisible');
            },
            //统计口径的查询
            queryByStatisticCaliber: function () {
                this.curRouterParam.params.interactive_modes = this.checkModeList;
                this.curRouterParam.params.interactive_statisticCaliber = this.checkStatisticCaliberList;
                this.curRouterParam.params.page_num = 1;
                this.getRouterData(this.curRouterParam, 'statisticCaliberVisible');
            },
            //统计口径的查询 按照月份、按照天数）
            queryByStatisticCaliber2: function () {
                this.curRouterParam.params.interactive_modes = this.checkModeList;
                this.curRouterParam.params.interactive_statisticCaliber = this.checkStatisticCaliberList2;

                this.curRouterParam.params.page_num = 1;
                this.getRouterData(this.curRouterParam, 'statisticCaliberVisible2');
            },
            //支付属性
            queryByAcc: function () {
                this.curRouterParam.params.interactive_modes = this.checkModeList;
                this.curRouterParam.params.pay_modes = this.checkModeOfPaymentList;
                this.curRouterParam.params.page_num = 1;
                this.getRouterData(this.curRouterParam, 'accDialogVisible');
            },
            //通道属性
            queryByChannel: function (value) {
                this.curRouterParam.params.interactive_modes = this.checkModeList;
                this.curRouterParam.params.channel_code = value.trim();
                this.curRouterParam.params.page_num = 1;
                this.getRouterData(this.curRouterParam, 'accDialogVisible');
            },
            //通道大类搜索筛选
            filterCurChannel: function (value) {
                this.bankLongding = true;
                clearTimeout(this.outTime);
                this.outTime = setTimeout(() => {
                    if (value && value.trim()) {
                        this.curChannelList = this.curChannelAllList.filter(item => {
                            var chineseReg = /^[\u0391-\uFFE5]+$/; //判断是否为中文
                            var englishReg = /^[a-zA-Z]+$/; //判断是否为字母
                            var quanpinReg = /(a[io]?|ou?|e[inr]?|ang?|ng|[bmp](a[io]?|[aei]ng?|ei|ie?|ia[no]|o|u)|pou|me|m[io]u|[fw](a|[ae]ng?|ei|o|u)|fou|wai|[dt](a[io]?|an|e|[aeio]ng|ie?|ia[no]|ou|u[ino]?|uan)|dei|diu|[nl][gh]ei|[jqx](i(ao?|ang?|e|ng?|ong|u)?|u[en]?|uan)|([csz]h?|r)([ae]ng?|ao|e|i|ou|u[ino]?|uan)|[csz](ai?|ong)|[csz]h(ai?|uai|uang)|zei|[sz]hua|([cz]h|r)ong|y(ao?|[ai]ng?|e|i|ong|ou|u[en]?|uan))/; //判断是否为全拼

                            if (chineseReg.test(value)) {
                                return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
                            } else if (englishReg.test(value)) {
                                if (quanpinReg.test(value)) {
                                    return item.pinyin.toLowerCase().indexOf(value.toLowerCase()) > -1;
                                } else {
                                    return item.jianpin.toLowerCase().indexOf(value.toLowerCase()) > -1;
                                }
                            }
                        });
                        this.curChannelList = this.curChannelList.filter((item,index,arr) => {
                            for(var i = index+1; i < arr.length; i++){
                                if(item.display_name == arr[i].display_name){
                                    return false;
                                }
                            }
                            return true;
                        });
                    } else {
                        this.curChannelList = this.curChannelAllList.slice(0,200);
                    }
                    this.bankLongding = false;
                }, 1200);
            },
            //银行大类展开时重置数据
            clearSearch: function (val) {
                if (this.curChannelList != this.curChannelAllList && val) {
                    this.curChannelList = this.curChannelAllList.slice(0,200);
                }
            },

            //导出
            exportFun:function () {
                var user = JSON.parse(window.sessionStorage.getItem("user"));
                var params = this.curRouterParam.params;
                params.org_id = user.curUodp.org_id;
                if (this.curRouterParam.params.interactive_modes=="") {
                    this.$alert("请选择收付属性。");
                    this[type] = false;
                    return;
                }
                if (this.curRouterParam.optype==="settlementAgeAnalysis_detaillist"){
                    if (this.curRouterParam.params.pay_modes=="") {
                        this.$alert("请选择支付方式。");
                        this[type] = false;
                        return;
                    }
                }

                /*                alert(this.curRouterParam.optype);
                                alert(this[type]);*/
                if (this.curRouterParam.optype=="paymentSuccessRate_detaillist") {
                    if (this.curRouterParam.params.pay_modes=="") {
                        this.$alert("请选择支付方式。");
                        this[type] = false;
                        return;
                    }
                }


                this.$axios({
                    url: this.queryUrl + "normalProcess",
                    method: "post",
                    data: {
                        optype:this.exportOptype,
                        params:params
                    },
                    responseType: 'blob'
                }).then((result) => {
                    if (result.data.error_msg) {
                        this.$message({
                            type: "error",
                            message: result.data.error_msg,
                            duration: 2000
                        })
                    } else {
                        var fileName = decodeURI(result.headers["content-disposition"]).split("=")[1];
                        //ie兼容
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(new Blob([result.data]), fileName);
                        } else {
                            let url = window.URL.createObjectURL(new Blob([result.data]));
                            let link = document.createElement('a');
                            link.style.display = 'none';
                            link.href = url;
                            link.setAttribute('download', fileName);
                            document.body.appendChild(link);
                            link.click();
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            }
        },
        computed: {}
    }
</script>
