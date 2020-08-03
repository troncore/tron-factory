(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6030c1cf","chunk-2b8f63a8","chunk-4600448d"],{"0788":function(t,e,i){},"3e60":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"node-list im-card"},[i("div",{staticClass:"card-header"},[i("div",{staticClass:"card-title"},[t._v(t._s(t.$t("getStarted.dashboard.nodeInfo")))]),i("div",{staticClass:"op-list"},[i("el-button",{staticClass:"im-button mini el-icon-plus",attrs:{type:"primary"},on:{click:function(e){return t.handleAddNode()}}},[t._v(" "+t._s(t.$t("getStarted.dashboard.addNode")))]),i("el-button",{staticClass:"im-button mini el-icon-caret-right",attrs:{size:"small",disabled:!t.deployNodesIds,loading:t.deployLoading},on:{click:function(e){return t.handleDeploy()}}},[t._v(" "+t._s(t.$t(t.deployLoading?"getStarted.dashboard.runningNode":"getStarted.dashboard.runNode")))])],1)]),i("div",{staticClass:"card-body"},[i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],staticClass:"custom-table",attrs:{data:t.tableData,"empty-text":t.$t("base.emptyData"),border:"","header-align":"center"},on:{"selection-change":t.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",align:"center",width:"60",selectable:t.handleSelectable}}),i("el-table-column",{attrs:{prop:"ip",label:t.$t("getStarted.dashboard.ip"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-link",{attrs:{type:"primary"},on:{click:function(i){return t.handleDetail(e.row)}}},[t._v(t._s(e.row.ip))])]}}])}),i("el-table-column",{attrs:{prop:"listenPort",label:t.$t("getStarted.dashboard.listenPort"),align:"center"}}),i("el-table-column",{attrs:{prop:"isSR",label:t.$t("getStarted.dashboard.nodeType"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.isSR?i("span",{staticClass:"color-success"},[t._v(t._s(t.$t("getStarted.dashboard.superNode")))]):i("span",{staticClass:"color-info"},[t._v(t._s(t.$t("getStarted.dashboard.fullNode")))])]}}])}),i("el-table-column",{attrs:{prop:"deployStatus",label:t.$t("getStarted.dashboard.deployStatus"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.deployStatus?i("el-tag",{attrs:{size:"mini",type:"success"}},[t._v(t._s(t.$t("getStarted.dashboard.deploySuccess")))]):i("el-tag",{attrs:{size:"mini",type:"info"}},[t._v(t._s(t.$t("getStarted.dashboard.deployStop")))])]}}])}),i("el-table-column",{attrs:{prop:"createTime",width:"240",label:t.$t("getStarted.dashboard.createNodeTime"),align:"center"}}),i("el-table-column",{attrs:{prop:"operate",width:"240",label:t.$t("base.operate")},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"text"},on:{click:function(i){return t.handleDetail(e.row)}}},[t._v(t._s(t.$t("base.view")))]),1!==e.row.deployStatus?i("el-button",{attrs:{type:"text"},on:{click:function(i){return t.handleConfig(e.row)}}},[t._v(t._s(t.$t("getStarted.dashboard.nodeConfig")))]):i("el-button",{attrs:{type:"text",loading:t.stopIndexs.includes(e.$index)},on:{click:function(i){return t.handleStop(e.row,e.$index)}}},[t._v(" "+t._s(t.$t(t.stopIndexs.includes(e.$index)?"":"getStarted.dashboard.stopRunNode"))+" ")]),e.row.ifShowLog?i("el-button",{attrs:{type:"text"},on:{click:function(i){return t.handleLog(e.row)}}},[i("span",{class:{"color-danger":e.row.isError}},[t._v(t._s(t.$t("base.logs")))])]):t._e()]}}])})],1)],1)]),i("node-deploy",{attrs:{visible:t.deployDialogVisible,ids:t.deployNodesIds,"deploy-loading":t.deployLoading},on:{"update:visible":function(e){t.deployDialogVisible=e},"update:deployLoading":function(e){t.deployLoading=e},"update:deploy-loading":function(e){t.deployLoading=e},getNodeList:function(){return t.getNodeList(!0)}}}),t.logDialogVisible?i("node-log",{attrs:{visible:t.logDialogVisible,"current-row":t.currentRow},on:{"update:visible":function(e){t.logDialogVisible=e}}}):t._e()],1)},o=[],n=(i("4de4"),i("c975"),i("a15b"),i("d81d"),i("a434"),i("a9e3"),i("bad6")),s=i("ae14"),r={name:"node-list",components:{NodeDeploy:s["default"],NodeLog:n["default"]},props:{nodeList:Function,chainStatus:Number},data:function(){return{tableData:[],tableLoading:!1,currentRow:{},deployNodes:[],deployNodesIds:"",stopIndexs:[],logDialogVisible:!1,deployDialogVisible:!1,deployLoading:!1,timeID:null}},created:function(){this.getNodeList()},destroyed:function(){clearInterval(this.timeID)},methods:{getNodeList:function(t){var e=this;this.tableLoading=!0,this.$_api.getStarted.getNodeList({},(function(i,a){e.tableLoading=!1,i||(e.tableData=Array.isArray(a)?a:[],e.tableData.sort((function(t,e){return new Date(e.createTime).getTime()-new Date(t.createTime).getTime()})),t&&e.$emit("checkChainPublish"),e.$emit("nodeList",e.tableData))}))},handleAddNode:function(){this.$router.push("/get-started/node-add")},handleSelectable:function(t,e){return 1!==t.deployStatus},handleSelectionChange:function(t){this.deployNodes=t,this.deployNodesIds=t.map((function(t){return t.id})).join(",")},handleDeploy:function(){var t="";this.tableData.length?this.deployNodesIds.length?0===this.chainStatus&&this.deployNodes.filter((function(t){return t.isSR})).length%2!==1&&(t=this.$t("getStarted.dashboard.initRunSRCheck")):t=this.$t("getStarted.dashboard.pleaseSelectNodes"):t=this.$t("getStarted.dashboard.pleaseAddNode"),t?this.$notify.warning({title:this.$t("base.warning"),message:t}):this.deployDialogVisible=!0},handleConfig:function(t){this.$router.push("/node-config/quick?id="+t.id)},handleDetail:function(t){this.$router.push("/get-started/node-view?id="+t.id)},handleStop:function(t,e){var i=this;this.$confirm(this.$t("getStarted.dashboard.stopRunNodeTips"),this.$t("base.tips"),{confirmButtonText:this.$t("base.confirm"),cancelButtonText:this.$t("base.cancel"),center:!0,customClass:"im-message-box",cancelButtonClass:"im-message-cancel-button",confirmButtonClass:"im-message-confirm-button"}).then((function(){return i.stopNode(t,e)})).catch((function(t){return console.log("err: ",t)}))},stopNode:function(t,e){var i=this;this.stopIndexs.push(e),this.$_api.getStarted.stopNode({id:t.id},(function(t){var a=i.stopIndexs.indexOf(e);i.stopIndexs.splice(a,1),t||i.getNodeList(!0)}))},handleLog:function(t){this.logDialogVisible=!0,this.currentRow=t}}},l=r,d=(i("88f7"),i("2877")),c=Object(d["a"])(l,a,o,!1,null,"555f675e",null);e["default"]=c.exports},"4ac3":function(t,e,i){},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,i){var a=i("1d80"),o=i("5899"),n="["+o+"]",s=RegExp("^"+n+n+"*"),r=RegExp(n+n+"*$"),l=function(t){return function(e){var i=String(a(e));return 1&t&&(i=i.replace(s,"")),2&t&&(i=i.replace(r,"")),i}};t.exports={start:l(1),end:l(2),trim:l(3)}},7156:function(t,e,i){var a=i("861d"),o=i("d2bb");t.exports=function(t,e,i){var n,s;return o&&"function"==typeof(n=e.constructor)&&n!==i&&a(s=n.prototype)&&s!==i.prototype&&o(t,s),t}},"88f7":function(t,e,i){"use strict";var a=i("0788"),o=i.n(a);o.a},"8a79":function(t,e,i){"use strict";var a=i("23e7"),o=i("06cf").f,n=i("50c4"),s=i("5a34"),r=i("1d80"),l=i("ab13"),d=i("c430"),c="".endsWith,u=Math.min,g=l("endsWith"),p=!d&&!g&&!!function(){var t=o(String.prototype,"endsWith");return t&&!t.writable}();a({target:"String",proto:!0,forced:!p&&!g},{endsWith:function(t){var e=String(r(this));s(t);var i=arguments.length>1?arguments[1]:void 0,a=n(e.length),o=void 0===i?a:u(n(i),a),l=String(t);return c?c.call(e,l,o):e.slice(o-l.length,o)===l}})},a15b:function(t,e,i){"use strict";var a=i("23e7"),o=i("44ad"),n=i("fc6a"),s=i("a640"),r=[].join,l=o!=Object,d=s("join",",");a({target:"Array",proto:!0,forced:l||!d},{join:function(t){return r.call(n(this),void 0===t?",":t)}})},a434:function(t,e,i){"use strict";var a=i("23e7"),o=i("23cb"),n=i("a691"),s=i("50c4"),r=i("7b0b"),l=i("65f0"),d=i("8418"),c=i("1dde"),u=i("ae40"),g=c("splice"),p=u("splice",{ACCESSORS:!0,0:0,1:2}),h=Math.max,f=Math.min,b=9007199254740991,m="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!g||!p},{splice:function(t,e){var i,a,c,u,g,p,v=r(this),y=s(v.length),S=o(t,y),$=arguments.length;if(0===$?i=a=0:1===$?(i=0,a=y-S):(i=$-2,a=f(h(n(e),0),y-S)),y+i-a>b)throw TypeError(m);for(c=l(v,a),u=0;u<a;u++)g=S+u,g in v&&d(c,u,v[g]);if(c.length=a,i<a){for(u=S;u<y-a;u++)g=u+a,p=u+i,g in v?v[p]=v[g]:delete v[p];for(u=y;u>y-a+i;u--)delete v[u-1]}else if(i>a)for(u=y-a;u>S;u--)g=u+a-1,p=u+i-1,g in v?v[p]=v[g]:delete v[p];for(u=0;u<i;u++)v[u+S]=arguments[u+2];return v.length=y-a+i,c}})},a9e3:function(t,e,i){"use strict";var a=i("83ab"),o=i("da84"),n=i("94ca"),s=i("6eeb"),r=i("5135"),l=i("c6b6"),d=i("7156"),c=i("c04e"),u=i("d039"),g=i("7c73"),p=i("241c").f,h=i("06cf").f,f=i("9bf2").f,b=i("58a8").trim,m="Number",v=o[m],y=v.prototype,S=l(g(y))==m,$=function(t){var e,i,a,o,n,s,r,l,d=c(t,!1);if("string"==typeof d&&d.length>2)if(d=b(d),e=d.charCodeAt(0),43===e||45===e){if(i=d.charCodeAt(2),88===i||120===i)return NaN}else if(48===e){switch(d.charCodeAt(1)){case 66:case 98:a=2,o=49;break;case 79:case 111:a=8,o=55;break;default:return+d}for(n=d.slice(2),s=n.length,r=0;r<s;r++)if(l=n.charCodeAt(r),l<48||l>o)return NaN;return parseInt(n,a)}return+d};if(n(m,!v(" 0o1")||!v("0b1")||v("+0x1"))){for(var _,w=function(t){var e=arguments.length<1?0:t,i=this;return i instanceof w&&(S?u((function(){y.valueOf.call(i)})):l(i)!=m)?d(new v($(e)),i,w):$(e)},N=a?p(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),I=0;N.length>I;I++)r(v,_=N[I])&&!r(w,_)&&f(w,_,h(v,_));w.prototype=y,y.constructor=w,s(o,m,w)}},ae14:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{visible:t.dialogVisible,"custom-class":"im-dialog","close-on-click-modal":!1,"close-on-press-escape":!1,width:"680px",center:""},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{staticClass:"dialog-header",attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"title"},[t._v(t._s(t.$t("getStarted.dashboard.runNodeDialogTitle")))])]),i("div",{staticClass:"dialog-content"},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:8}},model:{value:t.form.filePath,callback:function(e){t.$set(t.form,"filePath","string"===typeof e?e.trim():e)},expression:"form.filePath"}}),i("div",{staticClass:"el-upload__tip"},[t._v(t._s(t.$t("getStarted.dashboard.checkFilePath")))])],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{staticClass:"im-button",on:{click:function(e){t.dialogVisible=!1}}},[t._v(t._s(t.$t("base.cancel")))]),i("el-button",{staticClass:"im-button",attrs:{type:"primary",loading:t.loading},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("base.save")))])],1)])},o=[],n=(i("8a79"),{name:"node-deploy",props:{deployLoading:{type:Boolean,required:!0},visible:{type:Boolean,required:!0},ids:{type:String,required:!0}},data:function(){return{form:{filePath:""},loading:!1}},computed:{dialogVisible:{get:function(){return this.visible},set:function(t){this.$emit("update:visible",t)}}},methods:{handleSubmit:function(){this.form.filePath?this.form.filePath.endsWith("java-tron-1.0.0.zip")?(this.startDeploy(),this.$emit("update:visible",!1),this.$emit("update:deployLoading",!0)):this.$notify({title:this.$t("base.warning"),message:this.$t("getStarted.dashboard.endRightPath"),type:"warning"}):this.$notify({title:this.$t("base.warning"),message:this.$t("getStarted.dashboard.inputFilePath"),type:"warning"})},startDeploy:function(){var t=this;this.loading=!0,this.$_api.getStarted.deployNode({ids:this.ids,filePath:this.form.filePath},(function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t.$emit("update:deployLoading",!1),t.loading=!1,!e){if(i.hasOwnProperty("status")){var a="";switch(i.status){case 0:a="getStarted.dashboard.runSuccessTips";break;case 1:a="getStarted.dashboard.runFailTips";break;case 2:a="getStarted.dashboard.runFailSomeTips";break;case 3:a="getStarted.dashboard.runExistTips";break}0===i.status?t.$notify.success({title:t.$t("base.successful"),message:t.$t(a)}):t.$notify.error({title:t.$t("base.warning"),message:t.$t(a)})}t.$emit("getNodeList")}}))}}}),s=n,r=i("2877"),l=Object(r["a"])(s,a,o,!1,null,"276c0d9c",null);e["default"]=l.exports},ae49:function(t,e,i){"use strict";var a=i("4ac3"),o=i.n(a);o.a},bad6:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{visible:t.dialogVisible,"custom-class":"im-dialog","close-on-click-modal":!1,"close-on-press-escape":!1,width:"680px",top:"200px",center:""},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{staticClass:"dialog-header",attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"title"},[t._v(t._s(t.$t("getStarted.dashboard.logDialogTitle")))])]),i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.initLoading,expression:"initLoading"}],staticClass:"dialog-content",staticStyle:{"min-height":"200px"}},[i("el-timeline",t._l(t.logInfo,(function(e,a){return i("el-timeline-item",{key:a,attrs:{type:"primary"}},[i("div",{staticClass:"log-content",domProps:{innerHTML:t._s(e)}})])})),1),i("el-button",{directives:[{name:"show",rawName:"v-show",value:t.processingShow,expression:"processingShow"}],staticStyle:{"margin-left":"30px"},attrs:{type:"text",loading:t.processingLoading}},[t._v(t._s(t.processingText))])],1)])},o=[],n=(i("d81d"),i("ac1f"),i("5319"),{name:"node-log",props:{visible:{},currentRow:{}},data:function(){return{logInfo:[],initLoading:!0,processingShow:!1,processingLoading:!1,processingText:this.$t("getStarted.dashboard.emptyLog"),timeID:null}},computed:{dialogVisible:{get:function(){return this.visible},set:function(t){this.$emit("update:visible",t)}}},created:function(){this.init()},destroyed:function(){clearInterval(this.timeID)},methods:{init:function(){this.getLogInfo(),this.timeID=setInterval(this.getLogInfo,5e3)},getLogInfo:function(){var t=this;this.$_api.getStarted.getNodeLog({id:this.currentRow.id},(function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t.initLoading=!1,t.processingShow=!0,t.processingLoading=!0,t.processingText=t.$t("getStarted.dashboard.loadingLog"),e)return t.processingLoading=!1,t.processingText=t.$t("getStarted.dashboard.emptyLog"),void clearInterval(t.timeID);-1!==i.status&&1!==i.status||(t.processingShow=!1,t.processingLoading=!1,clearInterval(t.timeID)),Array.isArray(i.logInfo)?t.logInfo=i.logInfo.map((function(t){return t.replace(/^(\[.*\])(.*)/,'<i class="remark-time">$1</i>$2')})):(t.processingLoading=!1,t.processingText=t.$t("getStarted.dashboard.emptyLog"),clearInterval(t.timeID))}))}}}),s=n,r=(i("ae49"),i("2877")),l=Object(r["a"])(s,a,o,!1,null,"5bd0db4e",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-6030c1cf.79f41d6d.js.map