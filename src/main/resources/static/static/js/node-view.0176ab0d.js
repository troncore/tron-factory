(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["node-view"],{"2a24":function(t,e,a){},"2c45":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"node-view"},[a("div",{staticClass:"page-title"},[t._v(t._s(t.$t("getStarted.nodesManage.nodeDetail")))]),a("div",{staticClass:"page-body"},[a("div",{staticClass:"im-card"},[a("div",{staticClass:"card-header"},[t._v(t._s(t.$t("getStarted.nodesManage.serverInfo")))]),a("div",{staticClass:"card-body"},[a("div",{staticClass:"line-item"},[a("span",{staticClass:"label"},[t._v(t._s(t.$t("getStarted.nodesManage.ip"))+":")]),a("span",{staticClass:"value"},[t._v(t._s(t.nodeInfo.ip||"--"))])]),a("div",{staticClass:"line-item"},[a("span",{staticClass:"label"},[t._v(t._s(t.$t("getStarted.nodesManage.listenPort"))+":")]),a("span",{staticClass:"value"},[t._v(t._s(t.nodeInfo.listenPort||"--"))])])]),a("div",{staticClass:"card-header"},[t._v(t._s(t.$t("getStarted.nodesManage.sshInfo")))]),a("div",{staticClass:"card-body"},[a("div",{staticClass:"line-item"},[a("span",{staticClass:"label"},[t._v(t._s(t.$t("getStarted.nodesManage.sshConnectType"))+":")]),a("span",{staticClass:"value"},[t._v(t._s(t.sshConnectTypeStr||"--"))])]),a("br"),a("div",{staticClass:"line-item"},[a("span",{staticClass:"label"},[t._v(t._s(t.$t("getStarted.nodesManage.sshUserName"))+":")]),a("span",{staticClass:"value"},[t._v(t._s(t.nodeInfo.userName||"--"))])]),a("div",{staticClass:"line-item"},[a("span",{staticClass:"label"},[t._v(t._s(t.$t("getStarted.nodesManage.port"))+":")]),a("span",{staticClass:"value"},[t._v(t._s(t.nodeInfo.port||"--"))])])])]),a("div",{staticClass:"im-card"},[a("div",{staticClass:"card-header"},[t._v(t._s(t.$t("getStarted.nodesManage.nodeType")))]),a("div",{staticClass:"card-body"},[a("div",{staticClass:"line-item"},[a("span",{staticClass:"label"},[t._v(t._s(t.$t("getStarted.nodesManage.nodeType"))+":")]),a("span",{staticClass:"value"},[t._v(t._s(t.nodeTypeStr||"--"))])])]),t.nodeInfo.isSR?a("div",{staticClass:"card-header"},[t._v(t._s(t.$t("getStarted.nodesManage.superNode")))]):t._e(),t.nodeInfo.isSR?a("div",{staticClass:"card-body"},[a("div",{staticClass:"line-item"},[a("span",{staticClass:"label"},[t._v(t._s(t.$t("getStarted.nodesManage.url"))+":")]),a("span",{staticClass:"value"},[t.urlStr?a("el-link",{attrs:{type:"primary",href:t.urlStr,target:"_blank"}},[t._v(t._s(t.urlStr))]):[t._v("--")]],2)]),a("div",{staticClass:"line-item"},[a("span",{staticClass:"label"},[t._v(t._s(t.$t("getStarted.nodesManage.voteCount"))+":")]),a("span",{staticClass:"value"},[t._v(t._s(t.nodeInfo.voteCount||"--"))])]),a("br"),a("div",{staticClass:"line-item width-auto"},[a("span",{staticClass:"label"},[t._v(t._s(t.$t("getStarted.nodesManage.publicKey"))+":")]),a("span",{staticClass:"value"},[t._v(t._s(t.nodeInfo.publicKey||"--"))])])]):t._e()])]),a("div",{staticClass:"page-footer"},[0===t.nodeInfo.deployStatus?a("el-button",{staticClass:"im-button large",attrs:{type:"primary",disabled:t.disabled},on:{click:t.handleSubmit}},[a("i",{staticClass:"el-icon-edit"}),t._v(" "+t._s(t.$t("base.modify"))+" ")]):t._e(),a("el-button",{staticClass:"im-button large",on:{click:t.handleCancel}},[t._v(t._s(t.$t("base.return")))]),0===t.nodeInfo.deployStatus?a("el-button",{staticClass:"im-button large delete-btn",attrs:{type:"danger",disabled:t.disabled,loading:t.loading},on:{click:t.handleDelete}},[a("i",{staticClass:"el-icon-delete"}),t._v(" "+t._s(t.$t("base.delete"))+" ")]):t._e()],1)])},n=[],i=(a("a9e3"),a("ac1f"),a("5319"),{name:"node-view",data:function(){return{nodeInfo:{},disabled:!0,loading:!1}},computed:{opNodeId:function(){var t=this.$route.query.id;return/\d+/.test(t)?Number(t):void 0},urlStr:function(){var t="";return this.nodeInfo.hasOwnProperty("url")&&(t=this.nodeInfo.url.replace(/^("|')(.*)("|')$/,"$2")),t},nodeTypeStr:function(){var t="";return this.nodeInfo.hasOwnProperty("isSR")&&(t=this.nodeInfo.isSR?"getStarted.nodesManage.superNode":"getStarted.nodesManage.fullNode"),this.$t(t)},sshConnectTypeStr:function(){var t="";return this.nodeInfo.hasOwnProperty("sshConnectType")&&(t=1===this.nodeInfo.sshConnectType?"getStarted.nodesManage.byPassword":"getStarted.nodesManage.byPublicKey"),this.$t(t)}},created:function(){this.getNodeInfo()},methods:{getNodeInfo:function(){var t=this;this.testValidNode()&&(this.disabled=!0,this.$_api.getStarted.getNodeInfo({id:this.opNodeId},(function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e||(t.disabled=!1,t.init=!0,t.nodeInfo=a)})))},testValidNode:function(){return!!/\d+/.test(this.opNodeId)||(this.$notify.warning({title:this.$t("base.warning"),message:this.$t("getStarted.nodesManage.viewUnValidNode")}),!1)},handleSubmit:function(){this.$router.push("/get-started/node-edit?id="+this.opNodeId)},handleDelete:function(){var t=this;this.loading=!0,this.$_api.getStarted.canDeleteNode({id:this.opNodeId},(function(e,a){if(t.loading=!1,!e)if(a.hasOwnProperty("status"))switch(a.status){case 0:t.deleteNode("getStarted.nodesManage.deleteNodeTips");break;case 1:t.$notify.warning({title:t.$t("base.warning"),message:t.$t("getStarted.nodesManage.deleteNodeRunningTips")});break;case 2:t.deleteNode("getStarted.nodesManage.deleteNodeLastTips");break}else t.$notify.warning({title:t.$t("base.warning"),message:t.$t("getStarted.nodesManage.deleteNodeServerError")})}))},deleteNode:function(t){var e=this;this.$confirm(this.$t(t),this.$t("base.tips"),{confirmButtonText:this.$t("base.confirm"),cancelButtonText:this.$t("base.cancel"),center:!0,customClass:"im-message-box",cancelButtonClass:"im-message-cancel-button",confirmButtonClass:"im-message-confirm-button"}).then((function(){e.loading=!0,e.$_api.getStarted.deleteNoteInfo({id:e.opNodeId},(function(t){e.loading=!1,t||(e.$notify.success({title:e.$t("base.successful"),message:e.$t("base.success.delete")}),e.$router.push("/get-started/dashboard"))}))})).catch((function(){e.$notify.info({title:e.$t("base.cancel"),message:e.$t("base.cancelDelete")})}))},handleCancel:function(){this.$router.push("/get-started/dashboard")}}}),o=i,d=(a("a541"),a("2877")),r=Object(d["a"])(o,s,n,!1,null,"74e960bd",null);e["default"]=r.exports},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,a){var s=a("1d80"),n=a("5899"),i="["+n+"]",o=RegExp("^"+i+i+"*"),d=RegExp(i+i+"*$"),r=function(t){return function(e){var a=String(s(e));return 1&t&&(a=a.replace(o,"")),2&t&&(a=a.replace(d,"")),a}};t.exports={start:r(1),end:r(2),trim:r(3)}},7156:function(t,e,a){var s=a("861d"),n=a("d2bb");t.exports=function(t,e,a){var i,o;return n&&"function"==typeof(i=e.constructor)&&i!==a&&s(o=i.prototype)&&o!==a.prototype&&n(t,o),t}},a541:function(t,e,a){"use strict";var s=a("2a24"),n=a.n(s);n.a},a9e3:function(t,e,a){"use strict";var s=a("83ab"),n=a("da84"),i=a("94ca"),o=a("6eeb"),d=a("5135"),r=a("c6b6"),l=a("7156"),c=a("c04e"),u=a("d039"),f=a("7c73"),g=a("241c").f,p=a("06cf").f,v=a("9bf2").f,h=a("58a8").trim,b="Number",_=n[b],C=_.prototype,$=r(f(C))==b,I=function(t){var e,a,s,n,i,o,d,r,l=c(t,!1);if("string"==typeof l&&l.length>2)if(l=h(l),e=l.charCodeAt(0),43===e||45===e){if(a=l.charCodeAt(2),88===a||120===a)return NaN}else if(48===e){switch(l.charCodeAt(1)){case 66:case 98:s=2,n=49;break;case 79:case 111:s=8,n=55;break;default:return+l}for(i=l.slice(2),o=i.length,d=0;d<o;d++)if(r=i.charCodeAt(d),r<48||r>n)return NaN;return parseInt(i,s)}return+l};if(i(b,!_(" 0o1")||!_("0b1")||_("+0x1"))){for(var S,m=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof m&&($?u((function(){C.valueOf.call(a)})):r(a)!=b)?l(new _(I(e)),a,m):I(e)},N=s?g(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),y=0;N.length>y;y++)d(_,S=N[y])&&!d(m,S)&&v(m,S,p(_,S));m.prototype=C,C.constructor=m,o(n,b,m)}}}]);
//# sourceMappingURL=node-view.0176ab0d.js.map