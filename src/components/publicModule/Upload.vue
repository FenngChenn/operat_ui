<style lang="less" type="text/less">
    #upload {
        .upload-icon {
            width: 40px;
            height: 40px;
            border: 1px solid rgb(204, 204, 204);
            font-size: 38px;
            color: #00B3EC;
        }
        .upload-demo {
            display: inline-block;

            .el-upload {
                width: 40px;
                height: 40px;
                line-height: 40px;
                border: none;
            }
            .el-upload-list{
                display: none;
            }
        }

        .file-list{
            float: left;

            li{
                float: left;
                position: relative;
                cursor: pointer;
                margin-right: 10px;
                margin-bottom: 10px;

                span{
                    width: 38px;
                    height: 42px;
                    display: inline-block;
                    background: url("../../assets/icon_common.png") no-repeat;
                    background-position: -85px -103px;
                    vertical-align: middle;
                }
                .txt{
                    background-position: -85px -103px;
                }
                .doc,.docx{
                    background-position: 0px -103px;
                }
                .xls,.xlsx{
                    background-position: -44px -103px;
                }
                .png,.jpg{
                    background-position: -132px -103px;
                }

                i{
                    position: absolute;
                    width: 21px;
                    height: 21px;
                    background: url("../../assets/icon_common.png") no-repeat;
                    background-position: -248px 0;
                    top: -5px;
                    left: 26px;
                    display: none;
                }
            }

            li:hover{
                i{
                    display: inline-block;
                }
            }
        }
    }
</style>
<template>
    <div id="upload">
        <ul class="file-list">
            <li v-for="file in fileList">
                <row @click="downloadUpFile(file.object_id)" :class="file.file_extension_suffix" title="????????????">
                    <span :class="file.file_extension_suffix" title="????????????"></span>{{ file.original_file_name }}</row>
                <i title="????????????" @click="delUpFile(file.id)" v-show="isPending"></i>

            </li>
            <el-upload
                    class="upload-demo"
                    :action="queryUrl + 'comm/attachment/upload'"
                    :headers="{Authorization:currToken}"
                    multiple
                    accept=".jpeg, .gif, .png, .pdf, .doc, .docx, .xls, .xlsx"
                    :on-success="uploadSuccess"
                    :before-upload="beforeUpload"
                    v-show="isPending">
                <i class="el-icon-plus upload-icon"></i>
            </el-upload>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Upload",
        created:function(){
            this.currToken = this.$store.state.token;
            if(this.fileMessage.bill_id){
                this.getFileList();
            }
        },
        props:["emptyFileList","fileMessage","isPending","triggerFile"],
        data:function(){
            return {
                queryUrl: this.$store.state.queryUrl,
                currToken: "",
                fileList: []
            }
        },
        methods:{
            //????????????
            beforeUpload:function(file){
                var suffix = file.name.substring(file.name.lastIndexOf(".") + 1);
                var set = new Set(['jpeg', 'gif', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx']);
                if(!set.has(suffix)) {
                  this.$message.error('??????????????????[' + suffix + ']');
                  return false;
                }

                const isLt10M = file.size / 1024 / 1024 < 10;
                if (!isLt10M) {
                    this.$message.error('?????????????????????????????? 10MB!');
                }
                return isLt10M;
            },
            //????????????
            uploadSuccess: function(response, file, fileList){
                this.fileList.push(response.files[0]);
                this.$emit("currentFielList",this.fileList);
            },
            //??????
            delUpFile: function(fileId){
                var fileList = this.fileList;
                for(var i = 0; i < fileList.length; i++){
                    if(fileList[i].id == fileId){
                        fileList.splice(i,1);
                        break;
                    }
                }
                this.$emit("currentFielList",this.fileList);
            },
            //??????
            downloadUpFile:function(objectId){
                this.$axios({
                    url:this.queryUrl + "comm/attachment/download",
                    method: "post",
                    data: {
                        optype:"download",
                        params:{
                            object_id: objectId
                        }
                    },
                    responseType: 'blob'
                }).then((result) => {
                    if(result.error_msg){
                        this.$message({
                            type: "error",
                            message: result.data.error_msg,
                            duration: 2000
                        })
                    }else{
                        var fileName = decodeURI(result.headers["content-disposition"]).split("=")[1];
                        //ie??????
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
                }).catch(function(error){
                    console.log(error);
                })
            },
            //???????????????????????????
            getFileList: function(){
                var params = this.fileMessage;
                this.$axios({
                    url:this.queryUrl + "commProcess",
                    method: "post",
                    data:{
                        optype: "attachment_list",
                        params: params
                    }
                }).then((result) => {
                    if (result.data.error_msg) {
                        this.$message({
                            type: "error",
                            message: result.data.error_msg,
                            duration: 2000
                        })
                    }else{
                        var data = result.data;
                        this.fileList = data.files;
                        this.$emit("currentFielList",this.fileList);
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            }
        },
        watch:{
            emptyFileList:function(val,oldVal){
                this.fileList = val;
                this.$emit("currentFielList",this.fileList);
            },
            triggerFile: function(val,oldVal){
                this.getFileList();
            }
        }
    }
</script>
