(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2b4ef1b8","chunk-8c225746","chunk-2d20e7a4"],{"2a75":function(t,e,i){"use strict";var a=i("2aa7"),n=i.n(a);n.a},"2aa7":function(t,e,i){},"69cd":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{visible:t.dialogVisible,"custom-class":"im-dialog","close-on-click-modal":!1,"close-on-press-escape":!1,width:"680px",top:"200px",center:""},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{staticClass:"dialog-header",attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"title"},[t._v(t._s(t.$t("nodesManage.logDialogTitle")))])]),i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.initLoading,expression:"initLoading"}],staticClass:"dialog-content",staticStyle:{"min-height":"200px"}},[i("el-timeline",t._l(t.logInfo,(function(e,a){return i("el-timeline-item",{key:a,attrs:{type:"primary"}},[i("div",{staticClass:"log-content",domProps:{innerHTML:t._s(e)}})])})),1),i("el-button",{directives:[{name:"show",rawName:"v-show",value:t.processingShow,expression:"processingShow"}],staticStyle:{"margin-left":"30px"},attrs:{type:"text",loading:t.processingLoading}},[t._v(t._s(t.processingText))])],1)])},n=[],o=(i("c975"),i("d81d"),i("ac1f"),i("5319"),{name:"LogDialog",props:{visible:{},currentRow:{}},data:function(){return{logInfo:[],initLoading:!0,processingShow:!1,processingLoading:!1,processingText:this.$t("nodesManage.emptyLog"),timeID:null}},computed:{dialogVisible:{get:function(){return this.visible},set:function(t){this.$emit("update:visible",t)}}},created:function(){this.init()},destroyed:function(){clearInterval(this.timeID)},methods:{init:function(){this.getLogInfo(),this.timeID=setInterval(this.getLogInfo,5e3)},getLogInfo:function(){var t=this;this.$_api.nodesManage.getNodeLog({id:this.currentRow.id},(function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t.initLoading=!1,t.processingShow=!0,t.processingLoading=!0,t.processingText=t.$t("nodesManage.loadingLog"),e)return t.processingLoading=!1,t.processingText=t.$t("nodesManage.emptyLog"),void clearInterval(t.timeID);Array.isArray(i.logInfo)?t.logInfo=i.logInfo.map((function(e){return e.indexOf("deploy finish")>-1&&(t.processingLoading=!1,t.processingText=t.$t("nodesManage.deployComplete"),clearInterval(t.timeID)),e.replace(/^(\[.*\])(.*)/,'<i class="remark-time">$1</i>$2')})):(t.processingLoading=!1,t.processingText=t.$t("nodesManage.emptyLog"),clearInterval(t.timeID))}))}}}),s=o,l=(i("2a75"),i("2877")),c=Object(l["a"])(s,a,n,!1,null,"4edada31",null);e["default"]=c.exports},"6d1e":function(t,e,i){},b011:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{visible:t.dialogVisible,"custom-class":"im-dialog","close-on-click-modal":!1,"close-on-press-escape":!1,width:"680px",center:""},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{staticClass:"dialog-header",attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"title"},[t._v(t._s(t.$t("nodesManage.deploy")))])]),i("div",{staticClass:"dialog-content"},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:8}},model:{value:t.form.filePath,callback:function(e){t.$set(t.form,"filePath","string"===typeof e?e.trim():e)},expression:"form.filePath"}}),i("div",{staticClass:"el-upload__tip"},[t._v(t._s(t.$t("nodesManage.helpTips.deployFile")))])],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{staticClass:"im-button",on:{click:function(e){t.dialogVisible=!1}}},[t._v(t._s(t.$t("base.cancel")))]),i("el-button",{staticClass:"im-button",attrs:{type:"primary",loading:t.loading},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("base.save")))])],1)])},n=[],o=(i("c975"),{name:"deploy-dialog",props:{visible:{type:Boolean,required:!0},deployLoading:{type:Boolean,required:!0}},data:function(){return{form:{filePath:""},loading:!1}},computed:{dialogVisible:{get:function(){return this.visible},set:function(t){this.$emit("update:visible",t)}}},methods:{handleSubmit:function(){this.form.filePath?~this.form.filePath.indexOf("java-tron-1.0.0.zip")?this.startDeploy():this.$notify({title:this.$t("base.warning"),message:this.$t("nodesManage.valid.inputRightPath"),type:"warning"}):this.$notify({title:this.$t("base.warning"),message:this.$t("nodesManage.valid.inputFilePath"),type:"warning"})},startDeploy:function(){var t=this;this.loading=!0,this.$_api.nodesManage.deployNode(this.form,(function(e,i){t.loading=!1,e||(t.$notify({title:t.$t("base.successful"),message:t.$t("nodesManage.deployingTips"),type:"success"}),t.$emit("checkDeployStatus"),t.$emit("update:visible",!1))}))}}}),s=o,l=i("2877"),c=Object(l["a"])(s,a,n,!1,null,"3348dbc8",null);e["default"]=c.exports},d445:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"node-list"},[i("div",{staticClass:"form-item"},[i("span",{staticClass:"label"},[t._v(" "+t._s(t.$t("nodesManage.encryption"))),i("el-tooltip",{attrs:{effect:"dark",content:t.$t("nodesManage.helpTips.crypto"),placement:"top"}},[i("i",{staticClass:"fa fa-question-circle-o",staticStyle:{margin:"0 5px"}})]),t._v(": ")],1),i("el-radio-group",{attrs:{disabled:t.tableLoading||!!t.tableData.length},on:{change:t.handleChangeCrypto},model:{value:t.form.crypto,callback:function(e){t.$set(t.form,"crypto",e)},expression:"form.crypto"}},[i("el-radio",{attrs:{label:"eckey"}},[t._v("ECKey")]),i("el-radio",{attrs:{label:"sm2"}},[t._v("SM2")])],1)],1),i("div",{staticClass:"help-tools"},[i("el-button",{staticClass:"el-icon-plus",attrs:{type:"primary"},on:{click:t.handleAddNode}},[t._v(" "+t._s(t.$t("nodesManage.addNode")))]),i("el-button",{staticClass:"el-icon-caret-right",attrs:{type:"success",loading:t.deployLoading},on:{click:t.handleDeploy}},[t._v(" "+t._s(t.$t("nodesManage.deploy")))])],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],staticClass:"custom-table im-card",attrs:{data:t.tableData,"empty-text":t.$t("base.emptyData"),"header-align":"center"}},[i("el-table-column",{attrs:{prop:"ip",label:t.$t("nodesManage.nodeIP"),align:"center"}}),i("el-table-column",{attrs:{label:t.$t("nodesManage.isSR"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.isSR?i("span",{staticClass:"color-success"},[t._v("YES")]):i("span",{staticClass:"color-info"},[t._v("NO")])]}}])}),i("el-table-column",{attrs:{label:t.$t("nodesManage.deployStatus"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.isDeployed?i("el-tag",{attrs:{size:"mini",type:"success"}},[t._v(t._s(t.$t("nodesManage.deployed")))]):i("el-tag",{attrs:{size:"mini",type:"info"}},[t._v(t._s(t.$t("nodesManage.unDeploy")))])]}}])}),i("el-table-column",{attrs:{prop:"javaTronVersion",label:t.$t("nodesManage.javaTronVersion"),align:"center"}}),i("el-table-column",{attrs:{prop:"status",label:t.$t("base.operate")},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"text"},on:{click:function(i){return t.handleLogs(e.row)}}},[t._v(t._s(t.$t("base.logs")))]),e.row.isDeployed?i("el-button",{attrs:{type:"text"},on:{click:function(i){return t.handleDetail(e.row)}}},[t._v(t._s(t.$t("base.detail")))]):t._e(),e.row.isDeployed?t._e():i("el-button",{attrs:{type:"text"},on:{click:function(i){return t.handleUpdate(e.row)}}},[t._v(t._s(t.$t("base.edit")))]),e.row.isDeployed?t._e():i("el-button",{attrs:{type:"text"},on:{click:function(i){return t.handleDelete(e.row)}}},[t._v(t._s(t.$t("base.delete")))])]}}])})],1),t.deployDialogVisible?i("deploy-dialog",{attrs:{visible:t.deployDialogVisible,deployLoading:t.deployLoading},on:{"update:visible":function(e){t.deployDialogVisible=e},"update:deployLoading":function(e){t.deployLoading=e},"update:deploy-loading":function(e){t.deployLoading=e},checkDeployStatus:t.checkDeployStatus}}):t._e(),t.logDialogVisible?i("log-dialog",{attrs:{visible:t.logDialogVisible,"current-row":t.currentRow},on:{"update:visible":function(e){t.logDialogVisible=e}}}):t._e()],1)},n=[],o=i("69cd"),s=i("b011"),l={name:"node-list",components:{LogDialog:o["default"],DeployDialog:s["default"]},data:function(){return{form:{crypto:""},tableData:[],tableLoading:!1,deployLoading:!1,deployDialogVisible:!1,logDialogVisible:!1,currentRow:{},timeID:null}},created:function(){this.getCrypto(),this.getNodeList()},destroyed:function(){clearTimeout(this.timeID)},methods:{getCrypto:function(){var t=this;this.$_api.nodesManage.getCrypto({},(function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e||(t.form.crypto=i.crypto||t.form.crypto)}))},handleChangeCrypto:function(){var t=this;this.$_api.nodesManage.updateCrypto(this.form,(function(e,i){e||t.$notify({type:"success",title:t.$t("base.successful"),message:t.$t("base.success.update")})}))},getNodeList:function(){var t=this;this.tableLoading=!0,this.$_api.nodesManage.getNodeList({},(function(e,i){t.tableLoading=!1,e||(t.tableData=i)}))},handleAddNode:function(){this.$router.push({path:"/nodes-manage/add"})},handleUpdate:function(t){this.$router.push({path:"/nodes-manage/edit/"+t.id})},handleDetail:function(t){this.$router.push({path:"/nodes-manage/detail/"+t.id})},handleDelete:function(t){var e=this;this.$confirm(this.$t("nodesManage.deleteNodeTips"),this.$t("nodesManage.deleteNodeTipsTitle"),{confirmButtonText:this.$t("base.confirm"),cancelButtonText:this.$t("base.cancel"),center:!0,customClass:"im-message-box",cancelButtonClass:"im-message-cancel-button",confirmButtonClass:"im-message-confirm-button"}).then((function(){e.$_api.nodesManage.deleteNoteInfo({id:t.id},(function(t){t||(e.$notify({type:"success",title:e.$t("base.successful"),message:e.$t("base.success.delete")}),e.getNodeList())}))})).catch((function(){e.$notify.info({title:e.$t("base.cancel"),message:e.$t("base.cancelDelete")})}))},handleDeploy:function(){var t="";this.tableData.length?this.tableData.every((function(t){return t.isDeployed}))?t=this.$t("nodesManage.allNodeDeployed"):this.tableData.some((function(t){return t.isSR&&!t.needSyncCheck}))||(t=this.$t("nodesManage.needSRnoSyncCheck")):t=this.$t("nodesManage.pleaseAddNode"),t?this.$notify({title:this.$t("base.warning"),message:t,type:"warning"}):this.checkConfigStatus()},checkConfigStatus:function(){var t=this;this.deployLoading=!0,this.$_api.configuration.checkConfig({},(function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.deployLoading=!1,e||(0===i.status?t.$confirm(t.$t("nodesManage.sureConfigDeploy"),t.$t("base.tips"),{cancelButtonText:t.$t("nodesManage.updateConfig"),confirmButtonText:t.$t("nodesManage.sureDeploy"),center:!0,customClass:"im-message-box",cancelButtonClass:"im-message-cancel-button primary",confirmButtonClass:"im-message-confirm-button primary"}).then((function(){setTimeout((function(){return t.deployDialogVisible=!0}),200)})).catch((function(){t.$router.push({path:"/configuration/quick"})})):1===i.status&&t.$confirm(t.$t("nodesManage.todoConfig"),t.$t("base.tips"),{cancelButtonText:t.$t("nodesManage.inputLater"),confirmButtonText:t.$t("nodesManage.inputNow"),center:!0,customClass:"im-message-box",cancelButtonClass:"im-message-cancel-button primary",confirmButtonClass:"im-message-confirm-button primary"}).then((function(){t.$router.push({path:"/configuration/quick"})})).catch((function(){})))}))},checkDeployStatus:function(){var t=this,e=!1;this.deployLoading=!0,this.timeID=setInterval((function(){e||(e=!0,t.$_api.nodesManage.checkNode({},(function(i,a){if(e=!1,i)return t.deployLoading=!1,void clearInterval(t.timeID);!0===a&&(t.deployLoading=!1,t.getNodeList(),clearInterval(t.timeID))})))}),3e3)},handleLogs:function(t){this.logDialogVisible=!0,this.currentRow=t}}},c=l,r=(i("f0d9d"),i("2877")),d=Object(r["a"])(c,a,n,!1,null,"449e0646",null);e["default"]=d.exports},f0d9d:function(t,e,i){"use strict";var a=i("6d1e"),n=i.n(a);n.a}}]);
//# sourceMappingURL=chunk-2b4ef1b8.56d04fd2.js.map