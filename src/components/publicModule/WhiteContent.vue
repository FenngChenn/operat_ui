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
                <el-button type="primary" plain size="mini" @click="showDialog('dialogVisible')">全部公司</el-button>
                <!-- <el-button type="primary" plain size="mini">全部银行</el-button> -->
<!--                <el-button type="primary" plain size="mini" @click="showDialog('accDialogVisible')">账户性质</el-button>-->
                <el-button type="primary" plain size="mini" @click="showDialog('accPropDialogVisible')">账户属性</el-button>
                <el-button type="primary" plain size="mini" @click="showDialog('inactiveDialogVisible')">账户模式
                </el-button>
<!--                <el-input v-model="accNo" placeholder="请输入账户号" size="mini"
                          clearable style="width:150px;margin-bottom:4px"
                          @blur="queryByNo" :class="{'display-none':showAccBank()}">
                </el-input>-->

                <el-select v-model="accNo" placeholder="请输入账户号"
                           :class="{'display-none':showAccBank()}"
                           clearable filterable size="mini"
                           :loading="bankLongding"
                           @visible-change="clearSearch"
                           @change="queryByAccNo">
                    <el-option v-for="acc in accNoList"
                               :key="acc.id"
                               :label="acc.acc_no"
                               :value="acc.acc_no">
                    </el-option>
                </el-select>
            </div>
            <div class="button-list-right">
                <el-select v-model="bankTypeName" placeholder="请选择银行大类"
                           :class="{'display-none':showAccBank()}"
                           clearable filterable size="mini"
                           :filter-method="filterBankType"
                           :loading="bankLongding"
                           @visible-change="clearSearch"
                           @change="queryByBank">
                    <el-option v-for="bankType in bankTypeList"
                               :key="bankType.name"
                               :label="bankType.display_name"
                               :value="bankType.code">
                    </el-option>
                </el-select>
                <!-- <el-button type="warning" size="mini">打印</el-button> -->
                <el-button type="warning" size="mini" @click="exportFun">导出</el-button>
            </div>
            <router-view @transmitTitle="currentTitle= $event"
                         @getTableData="getRouterData"
                         @exportOptype="exportOptype=$event"
                         :tableData="childData"></router-view>
        </el-main>
        <!--请选择公司弹出框-->
        <el-dialog :visible.sync="dialogVisible"
                   class="comDialog"
                   width="810px" title="请选择公司"
                   :close-on-click-modal="false"
                   top="100px" @close="closeCom">
            <h1 slot="title" class="dialog-title">请选择公司</h1>
            <el-tree
                    :data="treeList"
                    node-key="org_id"
                    show-checkbox
                    ref="tree"
                    default-expand-all
                    :check-strictly="false"
                    :expand-on-click-node="false"
                    :check-on-click-node="true">
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
                   width="600px" title="请选择账户性质"
                   :close-on-click-modal="false"
                   top="100px">
            <h1 slot="title" class="dialog-title">请选择账户性质</h1>
            <el-checkbox-group v-model="checkAccAttrList">
                <el-checkbox v-for="acc in accAttrList" :key="acc.id" :label="acc.id">{{acc.name}}</el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" size="mini" plain @click="accDialogVisible=false">取 消</el-button>
                <el-button type="warning" size="mini" @click="queryByAcc">确 定</el-button>
            </span>
        </el-dialog>
        <!--账户属性弹出框-->
        <el-dialog :visible.sync="accPropDialogVisible"
                   width="600px" title="请选择账户属性"
                   :close-on-click-modal="false"
                   top="100px">
            <h1 slot="title" class="dialog-title">请选择账户属性</h1>
            <el-checkbox-group v-model="checkAccPropList">
                <el-checkbox v-for="acc in accPropList" :key="acc.id" :label="acc.id">{{acc.name}}</el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" size="mini" plain @click="accPropDialogVisible=false">取 消</el-button>
                <el-button type="warning" size="mini" @click="queryByProp">确 定</el-button>
            </span>
        </el-dialog>
        <!--账户模式弹出框-->
        <el-dialog :visible.sync="inactiveDialogVisible"
                   width="600px" title="请选择账户模式"
                   :close-on-click-modal="false"
                   top="100px">
            <h1 slot="title" class="dialog-title">请选择账户模式</h1>
            <el-checkbox-group v-model="checkModeList">
                <el-checkbox v-for="mode in modeList" :key="mode.id" :label="mode.id">{{mode.name}}</el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" size="mini" plain @click="inactiveDialogVisible=false">取 消</el-button>
                <el-button type="warning" size="mini" @click="queryByMode">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>

    export default {
        name: "WhiteContent",
        created: function () {
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

            let constants = JSON.parse(window.sessionStorage.getItem("constants"));
            let mode = constants.InactiveMode;
            let modeArr = [];
            for (let i in mode) {
                modeArr.push({
                    id: i,
                    name: mode[i]
                })
            }
            this.modeList = modeArr;

            let catgList = JSON.parse(window.sessionStorage.getItem("catgList"));
            let accAttrObj = {};
            let accPropObj = {};
            for(var i = 0; i < catgList.length; i++){
                if(catgList[i].code == "acc_attr"){
                    accAttrObj = catgList[i].items;
                    continue;
                } else if (catgList[i].code == "acc_prop") {
                    accPropObj = catgList[i].items;
                    continue;
                }
            }
            let accAttrArr = [];
            for (let i in accAttrObj) {
                accAttrArr.push({
                    id: i,
                    name: accAttrObj[i]
                })
            }
            this.accAttrList = accAttrArr;

            let accPropArr = [];
            for (let i in accPropObj) {
                accPropArr.push({
                    id: i,
                    name: accPropObj[i]
                })
            }
            this.accPropList = accPropArr;

            //银行大类
            var bankTypeList = JSON.parse(window.sessionStorage.getItem("bankTypeList"));
            if (bankTypeList) {
                this.bankAllList = bankTypeList;
            }
            var bankAllTypeList = JSON.parse(window.sessionStorage.getItem("bankAllTypeList"));
            if(bankAllTypeList){
                this.bankAllTypeList = bankAllTypeList;
            }
            this.$axios({
                url:  this.queryUrl + "normalProcess",
                method: "post",
                data: {
                    optype: "dbt_payacclist",
                    params: {
                        "query_key": "",
                        "exclude_ids": "",
                        "page_size": 10000,
                        "page_num": 1
                    }
                }
            }).then((result) => {
                if (result.data.error_msg) {

                } else {
                    this.bankLongding = false;
                    this.accNoList = result.data.data;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        data: function () {
            return {
                queryUrl: this.$store.state.queryUrl,
                currentTitle: "",
                childData: {},
                loading: false,
                dialogVisible: false,
                treeList: [],
                curRouterParam: {},
                accDialogVisible: false,
                accPropDialogVisible: false,
                inactiveDialogVisible: false,
                modeList: [],
                checkModeList: [],
                accAttrList: [],
                accPropList: [],
                checkAccAttrList: [],
                checkAccPropList:[],
                bankTypeName: "", //银行大类
                bankAllTypeList: [], //银行大类全部(不重复)
                bankAllList: [],
                accNoList:[],
                bankTypeList: [],
                outTime: "", //银行大类搜索控制
                bankLongding: true,
                accNo: "" ,//账户号
                exportOptype: "",//导入url
            }
        },
        methods: {
            getRouterData: function (routerData, type) {
                if (!type) {
                    this.curRouterParam = routerData;
                    if (this.$refs.tree)
                        this.$refs.tree.setCheckedKeys([]);
                    this.checkAccAttrList = [];
                    this.checkAccPropList = [];
                    this.checkModeList = [];
                    this.accNo = "";
                    this.bankTypeName = "";
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
            },
            //显示公司弹出框
            showDialog: function (type) {
                if(type === 'dialogVisible') {
                    // this.$refs.tree.setCheckedKeys([])
                } else if(type === 'accPropDialogVisible') {
                    this.checkAccPropList = []
                } else if(type === 'inactiveDialogVisible') {
                    this.checkModeList = []
                }
                this[type] = true;
            },
            closeCom() {
                this.$refs.tree.setCheckedKeys([])
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
            //账户号和银行大类的显示
            showAccBank: function(){
                var routerParams = this.curRouterParam;
                if(routerParams.optype == "yet_curcollectlist"){ //当日余额汇总
                    return true;
                }
                if(routerParams.optype == "yet_hiscollectlist"){ //历史余额汇总
                    return true;
                }
                if(routerParams.optype == "jyt_curcollectlist"){ //当日交易汇总
                    return true;
                }
                if(routerParams.optype == "jyt_hiscollectlist"){ //历史交易汇总
                    return true;
                }
                return false;
            },
            //查询
            queryByOrg: function () {
                this.curRouterParam.params.org_ids = this.$refs.tree.getCheckedKeys();
                this.curRouterParam.params.page_num = 1;
                this.getRouterData(this.curRouterParam, 'dialogVisible');
            },
            queryByMode: function () {
                this.curRouterParam.params.interactive_modes = this.checkModeList;
                this.curRouterParam.params.page_num = 1;
                this.getRouterData(this.curRouterParam, 'inactiveDialogVisible');
            },
            queryByAcc: function () {
                this.curRouterParam.params.acc_attrs = this.checkAccAttrList;
                this.curRouterParam.params.page_num = 1;
                this.getRouterData(this.curRouterParam, 'accDialogVisible');
            },
            queryByProp: function () {
                this.curRouterParam.params.acc_props = this.checkAccPropList
                this.curRouterParam.params.page_num = 1;
                this.getRouterData(this.curRouterParam, 'accPropDialogVisible');
            },
            queryByNo: function(){
                this.curRouterParam.params.acc_no = this.accNo;
                this.curRouterParam.params.page_num = 1;
                this.getRouterData(this.curRouterParam, 'accDialogVisible');
            },
            queryByBank: function (value) {
                this.curRouterParam.params.bank_type  = value.trim();
                this.curRouterParam.params.page_num = 1;
                this.getRouterData(this.curRouterParam, 'accDialogVisible');
            },
            queryByAccNo: function (value) {
                this.curRouterParam.params.acc_no  = value.trim();
                this.curRouterParam.params.page_num = 1;
                this.getRouterData(this.curRouterParam, 'accDialogVisible');
            },
            //银行大类搜索筛选
            filterBankType: function (value) {
                this.bankLongding = true;
                clearTimeout(this.outTime);
                this.outTime = setTimeout(() => {
                    if (value && value.trim()) {
                        this.bankTypeList = this.bankAllList.filter(item => {
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
                        this.bankTypeList = this.bankTypeList.filter((item,index,arr) => {
                            for(var i = index+1; i < arr.length; i++){
                                if(item.display_name == arr[i].display_name){
                                    return false;
                                }
                            }
                            return true;
                        });
                    } else {
                        this.bankTypeList = this.bankAllTypeList.slice(0,200);
                    }
                    this.bankLongding = false;
                }, 1200);
            },
            //银行大类展开时重置数据
            clearSearch: function (val) {
                if (this.bankTypeList != this.bankAllTypeList && val) {
                    this.bankTypeList = this.bankAllTypeList.slice(0,200);
                }
            },
            //导出
            exportFun:function () {
                var user = JSON.parse(window.sessionStorage.getItem("user"));
                var params = this.curRouterParam.params;
                params.org_id = user.curUodp.org_id;
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
