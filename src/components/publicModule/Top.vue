<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
    #titleTop {
        height: 52px;
        width: 100%;
        // background: url("../../assets/header_bg.jpg") no-repeat;
        background: url("../../assets/header_gmyl_3.jpg") no-repeat;
        background-color: #649cc3;
        position: relative;

        .company-name, .user-message {
            position: absolute;
            height: 100%;
            line-height: 52px;
            color: #fff;
        }

        .company-name {
            right: 220px;
            width: 260px;
            text-align: center;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            cursor: default;
        }

        .company-name:before {
            content: " ";
            position: absolute;
            //background-image: url("../../assets/icon_nav.png");
            background-position: -80px 0;
            width: 25px;
            height: 25px;
            top: 13px;
            left: 0;
        }

        .company-name:after {
            content: " ";
            position: absolute;
            width: 84%;
            margin: 0;
            height: 5px;
            top: 29px;
            left: 25px;
            border-width: 0 1px 1px;
            border-style: solid;
        }
    }

    .user-message {
        right: 30px;
        width: 180px;
        cursor: pointer;
    }

    .user-message:before {
        content: " ";
        //background-image: url("../../assets/icon_nav.png");
        background-position: -80px -25px;
        width: 22px;
        height: 25px;
        position: absolute;
        left: 20px;
        top: 16px;
    }

    .user-operation {
        position: absolute;
        background-color: #fff;
        right: 30px;
        top: 40px !important;
        width: 180px;
        border: 2px solid #3FB0D8;
        text-align: center;
        border-top: none;
    }

    .user-operation li {
        padding: 4px 0;
        cursor: pointer;
        color: #178fc8;
    }

    .user-operation li:hover {
        background-color: #6bc8e8;
        color: #fff;
    }

    .indexButton {
        position: absolute;
        top: 0;
        left: 0;
        width: 160px;
        height: 52px;
        background-color: rgba(0, 0, 0, 0);
    }
</style>
<template>
    <div id="titleTop">
        <router-link :to="{name:'Home'}" class="indexButton"></router-link>
        <p class="company-name" v-text="companyName" v-show="showCompany"></p>
        <el-dropdown class="user-message" @command="handleCommand">
            <p v-text="userName"></p>
            <el-dropdown-menu class="user-operation"
                              v-show="userNeed"
                              slot="dropdown">
                <el-dropdown-item v-for="operation in userOperation"
                                  v-text="operation.content"
                                  :key="operation.id"
                                  :command="operation.id"
                                  @click=""></el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <!--???????????? ?????????-->
        <el-dialog :visible.sync="dialogVisible"
                   width="800px" top="100px" title="????????????"
                   :append-to-body="true"
                   :close-on-click-modal="false">
            <el-form :model="dialogData" size="small"
                     :label-width="formLabelWidth"
                     :rules="rules" ref="dialogForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="??????">
                            <el-input v-model="dialogData.name" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="????????????">
                            <el-input v-model="dialogData.login_name" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="??????" prop="email">
                            <el-input v-model="dialogData.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="?????????" prop="phone">
                            <el-input v-model="dialogData.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <div class="split-form">
                            <h4>??????????????????</h4>
                        </div>
                    </el-col>
                    <el-col :span="24" style="margin-bottom:24px">
                        <el-table :data="dialogData.udops"
                                  border size="mini"
                                  style="width:96%;float:right"
                                  highlight-current-row
                                  @current-change="udopsCurrentChange">
                            <el-table-column label="????????????" width="70">
                                <template slot-scope="scope">
                                    <el-radio v-model="scope.row.$current" label="1">{{emptyData}}</el-radio>
                                </template>
                            </el-table-column>
                            <el-table-column prop="org_name" label="????????????"
                                             :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="dept_name" label="????????????"
                                             :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="pos_name" label="????????????"
                                             :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="is_default" label="??????" width="60"
                                             :formatter="transitDefault"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" size="mini" @click="subCurrent">??? ???</el-button>
            </span>
        </el-dialog>
        <!--???????????? ?????????-->
        <el-dialog :visible.sync="passdialogVisible"
                   width="600px" top="100px" title="????????????"
                   :append-to-body="true"
                   :close-on-click-modal="false">
            <el-form :model="passDialogData" size="small"
                     label-width="100px"
                     :rules="passRules" ref="passDialogForm">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="?????????" prop="old_password">
                            <el-input v-model="passDialogData.old_password" placeholder="??????????????????"
                                      clearable type="password"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="?????????" prop="password">
                            <el-input v-model="passDialogData.password" placeholder="??????????????????"
                                      clearable type="password"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="????????????" prop="confirm_password">
                            <el-input v-model="passDialogData.confirm_password" placeholder="?????????????????????"
                                      clearable type="password"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" size="mini" @click="setPassword">??? ???</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    // import axios from "axios";
    //????????????????????????
    // import security from "../../utils/security";

    export default {
        name: 'Top',
        created: function () {
            // this.setUserText();
        },
        data: function () {
            return {
                queryUrl: this.$store.state.queryUrl,
                companyName: "",
                userName: "?????????",
                showCompany: true,
                userOperation: [
                    {content: "????????????", id: "1"},
                    {content:"??????????????????",id:"2"},
                    {content: "??????", id: "3"}
                ],
                userNeed: false,
                dialogVisible: false, //??????????????????
                dialogData: {
                    name: "",
                    email: "",
                    login_name: "",
                    phone: "",
                    udops: []
                },
                udopsList: [],
                formLabelWidth: "120px",
                passdialogVisible: false, //??????????????????
                passDialogData: {
                    old_password: "",
                    password: "",
                    confirm_password: ""
                },
                emptyData: "", //????????????????????????
                //??????????????????
                rules: {
                    email: {
                        type: "email",
                        message: "??????????????????????????????",
                        trigger: "blur"
                    },
                    phone: {
                        validator: function (rule, value, callback, source, options) {
                            if (!value) {
                                callback();
                            }
                            var reg = /^[1][0-9]{10}$/;
                            if (reg.test(value)) {
                                callback();
                            } else {
                                var errors = [];
                                callback(new Error("???????????????????????????"));
                            }
                        },
                        trigger: "blur"
                    }
                },
                passRules: {
                    old_password: {
                        required: true,
                        message: "??????????????????",
                        trigger: "blur",
                    },
                    password: {
                        required: true,
                        message: "??????????????????",
                        trigger: "blur",
                    },
                    confirm_password: {
                        required: true,
                        message: "?????????????????????",
                        trigger: "blur",
                    }
                }
            }
        },
        methods: {
            //????????????
            handleCommand: function (command) {
                //????????????
                if (command == "1") {
                    if(this.$refs.dialogForm){
                        this.$refs.dialogForm.clearValidate();
                    }
                    this.dialogVisible = true;
                    this.setUserInfo();
                }
                //??????????????????
                if (command == "2") {
                    var passDialogData = this.passDialogData;
                    for(var k in passDialogData){
                        passDialogData[k] = "";
                    }
                    if(this.$refs.passDialogForm){
                        this.$refs.passDialogForm.clearValidate();
                    }
                    this.passdialogVisible = true;
                }
                //????????????
                if (command == "3") {

                }
                //??????
                if (command == "3") {
                    this.$store.commit("del_token");
                    this.$router.push({name: "Login"});
                }
            },
            //????????????????????????
            setUserText: function(){
                var user = this.$store.state.user;
                this.userName = user.name;
                if (user.is_admin) {
                    this.showCompany = false;
                } else {
                    var uodps = user.uodp;
                    var curId = user.cur_uodp_Id;
                    for (var i = 0; i < uodps.length; i++) {
                        if (uodps[i].uodp_id == curId) {
                            this.companyName = uodps[i].org_name;
                            break;
                        }
                    }
                }
            },
            //????????????????????????
            setUserInfo: function () {
                //????????????
                var dialogData = this.dialogData;
                for(var k in dialogData){
                    if(k == "udops"){
                        dialogData[k] = [];
                    }else{
                        dialogData[k] = "";
                    }
                }

                //???????????????
                this.$axios({
                    url: this.queryUrl + "commProcess",
                    method: "post",
                    data: {
                        optype: "user_userinfo",
                        params: {}
                    }
                }).then((result) => {
                    if (result.data.error_msg) {
                        this.$message({
                            type: "error",
                            message: result.data.error_msg,
                            duration: 2000
                        });
                    } else {
                        var data = result.data.data;
                        data.udops.forEach((item) => {
                            if (item.id == data.cur_uodp_id) {
                                item.$current = "1";
                            } else {
                                item.$current = "0";
                            }
                        })
                        var dialogData = this.dialogData;
                        for (var k in data) {
                            dialogData[k] = data[k];
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            //??????????????????-????????????
            transitDefault: function (row, column, cellValue, index) {
                if (cellValue == 1) {
                    return "???"
                } else {
                    return "";
                }
            },
            //????????????????????????
            udopsCurrentChange: function (val) {
                if (val) {
                    this.dialogData.udops.forEach((item) => {
                        item.$current = "0";
                    })
                    val.$current = "1";
                }
            },
            //????????????????????????
            subCurrent: function () {
                this.$refs.dialogForm.validate((valid, object) => {
                    if (valid) {
                        var dialogData = this.dialogData;
                        var udops = dialogData.udops;
                        var setCurrent = false;
                        for (var i = 0; i < udops.length; i++) {
                            var item = udops[i];
                            if (item.$current == "1" && item.id != dialogData.cur_uodp_id) {
                                setCurrent = true;
                                this.$axios({
                                    url: this.queryUrl + "commProcess",
                                    method: "post",
                                    data: {
                                        optype: "user_switchuodp",
                                        params: {
                                            uodp_id: item.id
                                        }
                                    }
                                }).then((result) => {
                                    if (result.data.error_msg) {
                                        this.$message({
                                            type: "error",
                                            message: result.data.error_msg,
                                            duration: 2000
                                        });
                                    } else {
                                        this.saveBaseInfo();
                                    }
                                }).catch(function (error) {
                                    console.log(error);
                                });
                                break;
                            }
                        }
                        if(!setCurrent){
                            this.saveBaseInfo();
                        }
                    } else {
                        return false;
                    }
                })
            },
            //??????????????????
            saveBaseInfo: function(){
                this.$axios({
                    url: this.queryUrl + "commProcess",
                    method: "post",
                    data: {
                        optype: "user_chg",
                        params: this.dialogData
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
                        this.dialogVisible = false;
                        //?????????????????????????????????
                        var userData = {
                            token: this.$store.state.token,
                            user: data.menu_info,
                        }
                        this.$store.commit("set_token",userData);
                        this.$router.push("/");
                        window.setTimeout(() => {
                            this.$router.push({
                                name:"Home",
                                params:{
                                    refreshUser: true
                                }
                            });
                        },0);
                        this.setUserText();
                        this.$message({
                            type: 'success',
                            message: "????????????",
                            duration: 2000
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            //????????????
            setPassword: function(){
                this.$refs.passDialogForm.validate((valid, object) => {
                    if (valid) {
                        var passDialogData = this.passDialogData;

                        //????????????
                        var key = RSAUtils.getKeyPair(this.$store.state.exponent, '', this.$store.state.modulus);
                        passDialogData.old_password = RSAUtils.encryptedString(key, passDialogData.old_password);
                        passDialogData.password = RSAUtils.encryptedString(key, passDialogData.password);
                        passDialogData.confirm_password = RSAUtils.encryptedString(key, passDialogData.confirm_password);

                        this.$axios({
                            url: this.queryUrl + "commProcess",
                            method: "post",
                            data: {
                                optype: "user_chgpwd",
                                params: passDialogData
                            }
                        }).then((result) => {
                            if (result.data.error_msg) {
                                this.$message({
                                    type: "error",
                                    message: result.data.error_msg,
                                    duration: 2000
                                })
                            } else {
                                this.$store.commit("del_token");
                                this.$router.push({name: "Login"});
                            }
                        }).catch(function (error) {
                            console.log(error);
                        })
                    } else {
                        return false;
                    }
                })
            }
        }
    }
</script>

