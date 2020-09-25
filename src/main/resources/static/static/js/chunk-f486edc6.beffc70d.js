(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f486edc6","chunk-7121e8b7","chunk-4600448d"],{"3e60":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"node-list im-card"},[i("div",{staticClass:"card-header"},[i("div",{staticClass:"card-title"},[t._v(t._s(t.$t("getStarted.dashboard.nodeInfo")))]),i("div",{staticClass:"op-list"},[i("div",{staticClass:"left"}),i("div",{staticClass:"right"},[i("el-button",{staticClass:"im-button mini",attrs:{disabled:!t.deployNodesIds||t.reRunIndexs.length||t.deployLoading},on:{click:function(e){return t.handleDeploy()}}},[i("i",{class:t.deployLoading?"el-icon-loading":"el-icon-caret-right"}),t._v(" "+t._s(t.$t(t.deployLoading?"getStarted.dashboard.runningNode":"getStarted.dashboard.runNode"))+" ")]),i("el-button",{staticClass:"im-button mini",attrs:{type:"primary"},on:{click:function(e){return t.handleAddNode()}}},[i("i",{staticClass:"el-icon-plus"}),t._v(" "+t._s(t.$t("getStarted.dashboard.addNode")))])],1)])]),i("div",{staticClass:"card-body"},[i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],staticClass:"custom-table",attrs:{data:t.tableData,"empty-text":t.$t("base.emptyData"),border:"","header-align":"center"},on:{"selection-change":t.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",align:"center",width:"60",selectable:t.handleSelectable}}),i("el-table-column",{attrs:{prop:"ip",label:t.$t("getStarted.dashboard.ip"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-link",{attrs:{type:"primary"},on:{click:function(i){return t.handleDetail(e.row)}}},[t._v(t._s(e.row.ip))])]}}])}),i("el-table-column",{attrs:{prop:"listenPort",label:t.$t("getStarted.dashboard.listenPort"),align:"center"}}),i("el-table-column",{attrs:{prop:"isSR",label:t.$t("getStarted.dashboard.nodeType"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.isSR?i("span",{staticClass:"color-success"},[t._v(t._s(t.$t("getStarted.dashboard.superNode")))]):i("span",{staticClass:"color-info"},[t._v(t._s(t.$t("getStarted.dashboard.fullNode")))])]}}])}),i("el-table-column",{attrs:{prop:"deployStatus",label:t.$t("getStarted.dashboard.deployStatus"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.deployStatus?i("el-tag",{attrs:{size:"mini",type:"success"}},[t._v(t._s(t.$t("getStarted.dashboard.deploySuccess")))]):i("el-tag",{attrs:{size:"mini",type:"info"}},[t._v(t._s(t.$t("getStarted.dashboard.deployStop")))])]}}])}),i("el-table-column",{attrs:{prop:"createTime",label:t.$t("getStarted.dashboard.createNodeTime"),align:"center",width:"200"}}),i("el-table-column",{attrs:{prop:"operate",label:t.$t("base.operate"),align:"center",width:"280"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.showStop?i("el-button",{attrs:{disabled:1!==e.row.deployStatus,type:"text",loading:t.stopIndexs.includes(e.$index)},on:{click:function(i){return t.handleStop(e.row,e.$index)}}},[t._v(" "+t._s(t.$t(t.stopIndexs.includes(e.$index)?"":"getStarted.dashboard.stopRunNode"))+" ")]):i("el-button",{attrs:{type:"text",disabled:t.deployLoading,loading:t.reRunIndexs.includes(e.$index)},on:{click:function(i){return t.handleRerun(e.row,e.$index)}}},[t._v(" "+t._s(t.$t(t.reRunIndexs.includes(e.$index)?"":"getStarted.dashboard.continueRunNode"))+" ")]),i("el-divider",{attrs:{direction:"vertical"}}),i("el-button",{attrs:{type:"text"},on:{click:function(i){return t.handleDetail(e.row)}}},[t._v(t._s(t.$t("base.detail")))]),i("el-divider",{attrs:{direction:"vertical"}}),i("el-button",{attrs:{disabled:1===e.row.deployStatus,type:"text"},on:{click:function(i){return t.handleConfig(e.row)}}},[t._v(t._s(t.$t("getStarted.dashboard.nodeConfig")))]),i("el-divider",{attrs:{direction:"vertical"}}),i("el-button",{attrs:{disabled:1===e.row.deployStatus,type:"text",loading:t.resetIndexs.includes(e.$index)},on:{click:function(i){return t.handleReset(e.row,e.$index)}}},[t._v(" "+t._s(t.$t(t.resetIndexs.includes(e.$index)?"":"getStarted.dashboard.resetNode"))+" ")]),i("el-divider",{attrs:{direction:"vertical"}}),i("el-button",{attrs:{type:"text"},on:{click:function(i){return t.handleLog(e.row)}}},[i("span",{class:{"color-danger":e.row.isError}},[t._v(t._s(t.$t("base.logs")))])])]}}])})],1)],1),i("div",{staticClass:"table-footer"},[i("el-button",{staticClass:"im-button mini",on:{click:t.handleImportTable}},[i("i",{staticClass:"el-icon-upload2"}),t._v(" "+t._s(t.$t("getStarted.dashboard.importList")))]),i("el-button",{staticClass:"im-button mini",attrs:{disabled:!t.tableData.length},on:{click:t.handleExportTable}},[i("i",{staticClass:"el-icon-download"}),t._v(" "+t._s(t.$t("getStarted.dashboard.exportList")))])],1)]),i("node-deploy",{attrs:{visible:t.deployDialogVisible,ids:t.deployNodesIds,"deploy-loading":t.deployLoading},on:{"update:visible":function(e){t.deployDialogVisible=e},"update:deployLoading":function(e){t.deployLoading=e},"update:deploy-loading":function(e){t.deployLoading=e},getNodeList:function(){return t.getNodeList(!0)}}}),t.logDialogVisible?i("node-log",{attrs:{visible:t.logDialogVisible,"current-row":t.currentRow},on:{"update:visible":function(e){t.logDialogVisible=e}}}):t._e(),i("import-table",{attrs:{visible:t.importDialogVisible},on:{"update:visible":function(e){t.importDialogVisible=e},refresh:t.getNodeList}})],1)},s=[],n=(i("4de4"),i("c975"),i("a15b"),i("d81d"),i("a434"),i("a9e3"),i("bad6")),o=i("ae14"),r=i("cf45"),l=i("0a14"),d={name:"node-list",components:{ImportTable:l["default"],NodeDeploy:o["default"],NodeLog:n["default"]},props:{nodeList:Function,chainStatus:Number},data:function(){return{tableData:[],tableLoading:!1,currentRow:{},deployNodes:[],deployNodesIds:"",stopIndexs:[],reRunIndexs:[],resetIndexs:[],logDialogVisible:!1,deployDialogVisible:!1,deployLoading:!1,importDialogVisible:!1,timeID:null}},created:function(){this.getNodeList()},destroyed:function(){clearInterval(this.timeID)},methods:{getNodeList:function(t){var e=this;this.tableLoading=!0,this.$_api.getStarted.getNodeList({},(function(i,a){e.tableLoading=!1,i||(e.tableData=Array.isArray(a)?a:[],e.tableData.sort((function(t,e){return new Date(t.createTime).getTime()-new Date(e.createTime).getTime()})),t&&e.$emit("checkChainPublish"),e.$emit("nodeList",e.tableData))}))},handleAddNode:function(){this.$router.push("/get-started/node-add")},handleSelectable:function(t,e){return 1!==t.deployStatus},handleSelectionChange:function(t){this.deployNodes=t,this.deployNodesIds=t.map((function(t){return t.id})).join(",")},handleDeploy:function(){var t="";this.tableData.length?this.deployNodesIds.length?0===this.chainStatus&&this.deployNodes.filter((function(t){return t.isSR})).length%2!==1&&(t=this.$t("getStarted.dashboard.initRunSRCheck")):t=this.$t("getStarted.dashboard.pleaseSelectNodes"):t=this.$t("getStarted.dashboard.pleaseAddNode"),t?this.$notify.warning({title:this.$t("base.warning"),message:t}):this.deployDialogVisible=!0},handleConfig:function(t){this.$router.push("/node-config/quick?id="+t.id)},handleDetail:function(t){this.$router.push("/get-started/node-view?id="+t.id)},handleStop:function(t,e){var i=this;this.$confirm(this.$t("getStarted.dashboard.stopRunNodeTips"),this.$t("base.tips"),{confirmButtonText:this.$t("base.confirm"),cancelButtonText:this.$t("base.cancel"),center:!0,customClass:"im-message-box"}).then((function(){return i.stopNode(t,e)})).catch((function(t){return console.log("err: ",t)}))},stopNode:function(t,e){var i=this;this.stopIndexs.push(e),this.$_api.getStarted.stopNode({id:t.id},(function(t){var a=i.stopIndexs.indexOf(e);i.stopIndexs.splice(a,1),t||i.getNodeList(!0)}))},handleLog:function(t){this.logDialogVisible=!0,this.currentRow=t},handleReset:function(t,e){var i=this;this.$confirm(this.$t("getStarted.dashboard.resetNodeTips"),this.$t("base.tips"),{confirmButtonText:this.$t("base.confirm"),cancelButtonText:this.$t("base.cancel"),center:!0,customClass:"im-message-box"}).then((function(){i.resetIndexs.push(e),i.$_api.getStarted.resetNode({id:t.id},(function(t){var a=i.resetIndexs.indexOf(e);i.resetIndexs.splice(a,1),t||i.getNodeList()}))})).catch((function(t){return console.log("err: ",t)}))},handleRerun:function(t,e){var i=this;this.reRunIndexs.push(e),this.$_api.getStarted.deployNode({ids:t.id+"",filePath:"null",runAgain:!0},(function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=i.reRunIndexs.indexOf(e);if(i.reRunIndexs.splice(s,1),!t){if(a.hasOwnProperty("status")){var n="";switch(a.status){case 0:n="getStarted.dashboard.runSuccessTips";break;case 1:n="getStarted.dashboard.runFailTips";break;case 2:n="getStarted.dashboard.runFailSomeTips";break;case 3:n="getStarted.dashboard.runExistTips";break}0===a.status?i.$notify.success({title:i.$t("base.successful"),message:i.$t(n)}):i.$notify.error({title:i.$t("base.warning"),message:i.$t(n)})}i.getNodeList()}}))},handleImportTable:function(){this.importDialogVisible=!0},handleImportData:function(){},handleExportTable:function(){var t=this.tableData.map((function(t){return{ip:t.ip,sshPassword:t.sshPassword,javaTronVersion:t.javaTronVersion,userName:t.userName,url:t.url,port:t.port,createTime:t.createTime,isSR:t.isSR,id:t.id,voteCount:t.voteCount,listenPort:t.listenPort,needSyncCheck:t.needSyncCheck}})),e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"});Object(r["c"])(e,this.$t("getStarted.dashboard.exportFileName")+" - "+this.$_moment(Date.now()).format("YYYY-MM-DD HH_mm_ss"))}}},c=d,u=(i("a858"),i("2877")),g=Object(u["a"])(c,a,s,!1,null,"4b8366fe",null);e["default"]=g.exports},"4ff5":function(t,e,i){},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,i){var a=i("1d80"),s=i("5899"),n="["+s+"]",o=RegExp("^"+n+n+"*"),r=RegExp(n+n+"*$"),l=function(t){return function(e){var i=String(a(e));return 1&t&&(i=i.replace(o,"")),2&t&&(i=i.replace(r,"")),i}};t.exports={start:l(1),end:l(2),trim:l(3)}},"6f4a":function(t,e,i){},7156:function(t,e,i){var a=i("861d"),s=i("d2bb");t.exports=function(t,e,i){var n,o;return s&&"function"==typeof(n=e.constructor)&&n!==i&&a(o=n.prototype)&&o!==i.prototype&&s(t,o),t}},"8a79":function(t,e,i){"use strict";var a=i("23e7"),s=i("06cf").f,n=i("50c4"),o=i("5a34"),r=i("1d80"),l=i("ab13"),d=i("c430"),c="".endsWith,u=Math.min,g=l("endsWith"),p=!d&&!g&&!!function(){var t=s(String.prototype,"endsWith");return t&&!t.writable}();a({target:"String",proto:!0,forced:!p&&!g},{endsWith:function(t){var e=String(r(this));o(t);var i=arguments.length>1?arguments[1]:void 0,a=n(e.length),s=void 0===i?a:u(n(i),a),l=String(t);return c?c.call(e,l,s):e.slice(s-l.length,s)===l}})},a15b:function(t,e,i){"use strict";var a=i("23e7"),s=i("44ad"),n=i("fc6a"),o=i("a640"),r=[].join,l=s!=Object,d=o("join",",");a({target:"Array",proto:!0,forced:l||!d},{join:function(t){return r.call(n(this),void 0===t?",":t)}})},a434:function(t,e,i){"use strict";var a=i("23e7"),s=i("23cb"),n=i("a691"),o=i("50c4"),r=i("7b0b"),l=i("65f0"),d=i("8418"),c=i("1dde"),u=i("ae40"),g=c("splice"),p=u("splice",{ACCESSORS:!0,0:0,1:2}),h=Math.max,f=Math.min,b=9007199254740991,m="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!g||!p},{splice:function(t,e){var i,a,c,u,g,p,v=r(this),y=o(v.length),S=s(t,y),$=arguments.length;if(0===$?i=a=0:1===$?(i=0,a=y-S):(i=$-2,a=f(h(n(e),0),y-S)),y+i-a>b)throw TypeError(m);for(c=l(v,a),u=0;u<a;u++)g=S+u,g in v&&d(c,u,v[g]);if(c.length=a,i<a){for(u=S;u<y-a;u++)g=u+a,p=u+i,g in v?v[p]=v[g]:delete v[p];for(u=y;u>y-a+i;u--)delete v[u-1]}else if(i>a)for(u=y-a;u>S;u--)g=u+a-1,p=u+i-1,g in v?v[p]=v[g]:delete v[p];for(u=0;u<i;u++)v[u+S]=arguments[u+2];return v.length=y-a+i,c}})},a858:function(t,e,i){"use strict";var a=i("6f4a"),s=i.n(a);s.a},a9e3:function(t,e,i){"use strict";var a=i("83ab"),s=i("da84"),n=i("94ca"),o=i("6eeb"),r=i("5135"),l=i("c6b6"),d=i("7156"),c=i("c04e"),u=i("d039"),g=i("7c73"),p=i("241c").f,h=i("06cf").f,f=i("9bf2").f,b=i("58a8").trim,m="Number",v=s[m],y=v.prototype,S=l(g(y))==m,$=function(t){var e,i,a,s,n,o,r,l,d=c(t,!1);if("string"==typeof d&&d.length>2)if(d=b(d),e=d.charCodeAt(0),43===e||45===e){if(i=d.charCodeAt(2),88===i||120===i)return NaN}else if(48===e){switch(d.charCodeAt(1)){case 66:case 98:a=2,s=49;break;case 79:case 111:a=8,s=55;break;default:return+d}for(n=d.slice(2),o=n.length,r=0;r<o;r++)if(l=n.charCodeAt(r),l<48||l>s)return NaN;return parseInt(n,a)}return+d};if(n(m,!v(" 0o1")||!v("0b1")||v("+0x1"))){for(var _,x=function(t){var e=arguments.length<1?0:t,i=this;return i instanceof x&&(S?u((function(){y.valueOf.call(i)})):l(i)!=m)?d(new v($(e)),i,x):$(e)},N=a?p(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),w=0;N.length>w;w++)r(v,_=N[w])&&!r(x,_)&&f(x,_,h(v,_));x.prototype=y,y.constructor=x,o(s,m,x)}},ae14:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{visible:t.dialogVisible,"custom-class":"im-dialog","close-on-click-modal":!1,"close-on-press-escape":!1,width:"680px",center:""},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{staticClass:"dialog-header",attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"title"},[t._v(t._s(t.$t("getStarted.dashboard.runNodeDialogTitle")))])]),i("div",{staticClass:"dialog-content"},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:8}},model:{value:t.form.filePath,callback:function(e){t.$set(t.form,"filePath","string"===typeof e?e.trim():e)},expression:"form.filePath"}}),i("div",{staticClass:"el-upload__tip"},[t._v(t._s(t.$t("getStarted.dashboard.checkFilePath")))])],1),i("div",{staticClass:"dialog-footer align-right",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{staticClass:"im-button mini",on:{click:function(e){t.dialogVisible=!1}}},[t._v(t._s(t.$t("base.cancel")))]),i("el-button",{staticClass:"im-button mini",attrs:{type:"primary",loading:t.loading},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("base.save")))])],1)])},s=[],n=(i("8a79"),{name:"node-deploy",props:{deployLoading:{type:Boolean,required:!0},visible:{type:Boolean,required:!0},ids:{type:String,required:!0}},data:function(){return{form:{filePath:""},loading:!1}},computed:{dialogVisible:{get:function(){return this.visible},set:function(t){this.$emit("update:visible",t)}}},methods:{handleSubmit:function(){this.form.filePath?this.form.filePath.endsWith("java-tron-1.0.0.zip")?(this.startDeploy(),this.$emit("update:visible",!1),this.$emit("update:deployLoading",!0)):this.$notify({title:this.$t("base.warning"),message:this.$t("getStarted.dashboard.endRightPath"),type:"warning"}):this.$notify({title:this.$t("base.warning"),message:this.$t("getStarted.dashboard.inputFilePath"),type:"warning"})},startDeploy:function(){var t=this;this.loading=!0,this.$_api.getStarted.deployNode({ids:this.ids,filePath:this.form.filePath,runAgain:!1},(function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t.$emit("update:deployLoading",!1),t.loading=!1,!e){if(i.hasOwnProperty("status")){var a="";switch(i.status){case 0:a="getStarted.dashboard.runSuccessTips";break;case 1:a="getStarted.dashboard.runFailTips";break;case 2:a="getStarted.dashboard.runFailSomeTips";break;case 3:a="getStarted.dashboard.runExistTips";break}0===i.status?t.$notify.success({title:t.$t("base.successful"),message:t.$t(a)}):t.$notify.error({title:t.$t("base.warning"),message:t.$t(a)})}t.$emit("getNodeList")}}))}}}),o=n,r=i("2877"),l=Object(r["a"])(o,a,s,!1,null,"a2859550",null);e["default"]=l.exports},bad6:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{visible:t.dialogVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{staticClass:"dialog-header",attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"title"},[i("b",[t._v(t._s(t.$t("getStarted.dashboard.logDialogTitle"))+" ")]),t.loading?i("i",{staticClass:"el-icon-loading"}):t.logList.length||0!==t.logStatus&&2!==t.logStatus?t._e():i("span",{staticClass:"empty-log"},[t._v(" ( "+t._s(t.$t("getStarted.dashboard.emptyLog"))+" )")])])]),i("div",{staticClass:"dialog-content"},[i("div",{staticClass:"log-list"},t._l(t.logList,(function(e,a){return i("div",{key:a,staticClass:"log-item",class:e.scope},[i("span",{staticClass:"log-index"},[t._v(t._s(a+1))]),i("span",{staticClass:"log-text",class:{warning:!e.success}},[i("span",{staticClass:"text",domProps:{innerHTML:t._s(e.content)}})]),e.duration?i("span",{staticClass:"log-time"},[i("span",{staticClass:"text"},[t._v(t._s(e.duration))])]):t._e()])})),0)])])},s=[],n=(i("4de4"),i("d81d"),{name:"node-log",props:{visible:{},currentRow:{}},data:function(){return{logList:[],logStatus:"",isEmptyLogs:!1,loading:!0,flag:!0,timeID:null}},computed:{dialogVisible:{get:function(){return this.visible},set:function(t){this.$emit("update:visible",t)}}},created:function(){this.pollLogInfo()},destroyed:function(){this.flag=!1,clearInterval(this.timeID)},methods:{pollLogInfo:function(){this.timeID=setTimeout(this.getLogInfo,300)},getLogInfo:function(){var t=this;this.flag&&(this.loading=!0,this.$_api.getStarted.getNodeLog({id:this.currentRow.id},(function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.loading=!1,t.flag=!1,e||(t.logStatus=i.status,1===i.status&&(t.flag=!0,t.loading=!0,t.pollLogInfo()),0===i.status&&(t.isEmptyLogs=!0),t.logList=(i.logInfo||[]).map((function(t,e){try{return"string"===typeof t&&JSON.parse(t)}catch(i){return console.log("log: ",e,t),console.log(),console.log("error: ",i),!1}})).filter(Boolean))})))}}}),o=n,r=(i("e72b"),i("2877")),l=Object(r["a"])(o,a,s,!1,null,"1ae7dd78",null);e["default"]=l.exports},e72b:function(t,e,i){"use strict";var a=i("4ff5"),s=i.n(a);s.a}}]);
//# sourceMappingURL=chunk-f486edc6.beffc70d.js.map