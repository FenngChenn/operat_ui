<style lang="less" type="text/less" scoped>
    #lookDiagramContainer {
        width: 100%;
        height: 320px;
        position: relative;
        overflow: auto;
    }
    .static-item{
        position: absolute;
        .static-name{
            width: 63px;
            height: 24px;
            text-align: center;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .static-portrait {
        width: 63px;
        height: 63px;
        display: inline-block;
        background-image: url(../../assets/icon_common.png);
        background-repeat: no-repeat;
    }  
    .root-img {
        background-position: -10px -223px;
    }
    .end-img {
        background-position: -10px -223px;
    }
    .users-img {
        background-position: -218px -223px;
    }
    .position-img {
        background-position: -80px -292px;
    }
    .displaynone{
        visibility: hidden!important;
    }
</style>
<style lang="less" type="text/less">
    .displaynone{
        visibility: hidden!important;
    }
</style>
<template >
    <div id="lookDiagramContainer">
        <template  v-for="item in node_data">
            <div class="static-item" :id="'item_' + item.item_id" :key="item.item_id">
                <span class="static-name" :title="item.text">{{item.text}}</span>
                <span class="static-portrait"
                    :class="{'position-img':item.type=='pos','root-img':item.type=='start','users-img':item.type=='user','end-img':item.type=='end'}"></span>
            </div>  
        </template>
    </div>
</template>

<script>
    export default {
        name: "WorkFlow",
        created:function(){
            this.assembleFlowData(this.flowList);
        },
        mounted:function(){
            this.drawLine();
        },
        props:["flowList","isEmptyFlow"],
        data:function(){
            return {
                node_data:[],
                line_data:[],
                lineStyle:{
                    Anchor: ["Right", "Left"],
                    PaintStyle: {
                        strokeWidth: 1,
                        outlineWidth: 10,
                        outlineStroke: "transparent",
                        "stroke-dasharray": [3, 1],
                        stroke: '#7bb9f2'
                    },
                    HoverPaintStyle: {
                        strokeWidth: 1,
                        stroke: '#7bb9f2'
                    },
                    Endpoint: ["Dot", {cssClass: "displaynone" }],
                    Connector: ["Straight"],
                    Container: "lookDiagramContainer",
                    ConnectionOverlays: [
                        ["PlainArrow", {
                            location: 1,
                            width: 10,
                            length: 10
                        }]
                    ]
                },
                // classStyle:{
                //     "position-img":true,
                //     "users-img":true,
                //     "root-img":true
                // }
            }
        },
        methods:{
            //?????????????????????
            assembleFlowData:function(val){
                if(!val || !val.nodes ){
                    return ;
                }
                let nodes = val.nodes;//??????????????????????????????????????????
                nodes.unshift({ 
                    text:"????????????",
                    axis_x:0,
                    axis_y:50,
                    item_id:"-1",
                    type:'start'
                });
                nodes.push({
                    text:"????????????",
                    axis_x:690,
                    axis_y:50,
                    item_id:"-2",
                    type:'end'
                });
                let nLen = nodes.length;
                //???????????????
                for(let i=0; i<nLen; i++){
                    if (i == 0 || i == nLen-1){
                        continue;
                    }else{
                        //???????????????????????????
                        let data = JSON.parse(nodes[i].data);
                        nodes[i].type = data.push_org ? 'pos' : 'user';
                        //????????????????????????
                        let select = nodes[i].addUsers;
                        let sLen = select.length;
                        let text = "";
                        for(let j=0; j<sLen; j++){
                            text = text + select[j].name;
                            text = (j == sLen-1) ? text : text + "|";
                        }
                        nodes[i].text = text;
                    }
                }
                this.node_data = nodes;
                this.line_data = val.lines;
            },
            //????????????dom?????????
            drawLine:function(){
                //?????????dom???????????????
                this.jsplumb = jsPlumb.getInstance(this.lineStyle);
                let nlen = this.node_data.length;
                let llen = this.line_data.length;
                for (let i = 0;i<nlen;i++){
                    // var newLength = 0 ;   
                    var curId = "item_"+this.node_data[i].item_id;
                    var firstChild = document.getElementById(curId);
                    firstChild.style.top = this.node_data[i].axis_y+ "px";
                    firstChild.style.left = this.node_data[i].axis_x + "px";
                }
                for( let j=0 ; j<llen ;j++){
                    let sourceId = "item_" + this.line_data[j].d_source_id;
                    var targetId = "item_" + this.line_data[j].d_target_id;
                    this.jsplumb.connect({
                        source: sourceId,
                        target: targetId
                    })
                    // that.jsplumb.draggable(targetId);
                }
            }
        },
        watch:{
            isEmptyFlow:function(val,oldVal){
                if(val){
                    //???????????????????????????
                    //??????????????????container???????????????????????????????????????dom???,????????????????????????
                    this.line_data = [];
                    this.node_data = [];
                    this.jsplumb.empty("lookDiagramContainer");
                }
            },
            flowList:function(val,oldVal){
                if(val.base_id){
                    this.assembleFlowData(val);
                    setTimeout(() =>{
                        this.drawLine();
                    },0)
                }
                
            }
        }
    }
</script>
