(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["node-view"],{"09cb":function(t,e,s){"use strict";var a=s("e5d4"),n=s.n(a);n.a},"2c45":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"node-view"},[s("div",{staticClass:"page-title"},[t._v(t._s(t.$t("节点详情")))]),s("div",{staticClass:"page-body"},[s("div",{staticClass:"im-card"},[s("div",{staticClass:"card-header"},[t._v(t._s(t.$t("服务器信息")))]),s("div",{staticClass:"card-body"},[s("div",{staticClass:"line-item"},[s("span",{staticClass:"label"},[t._v(t._s(t.$t("服务器IP"))+":")]),s("span",{staticClass:"value"},[t._v(t._s(t.nodeInfo.ip||"--"))])]),s("div",{staticClass:"line-item"},[s("span",{staticClass:"label"},[t._v(t._s(t.$t("监听端口"))+":")]),s("span",{staticClass:"value"},[t._v(t._s(t.nodeInfo.listenPort||"--"))])])]),s("div",{staticClass:"card-header"},[t._v(t._s(t.$t("SSH信息")))]),s("div",{staticClass:"card-body"},[s("div",{staticClass:"line-item"},[s("span",{staticClass:"label"},[t._v(t._s(t.$t("端口"))+":")]),s("span",{staticClass:"value"},[t._v(t._s(t.nodeInfo.port||"--"))])]),s("div",{staticClass:"line-item"},[s("span",{staticClass:"label"},[t._v(t._s(t.$t("安全验证方式"))+":")]),s("span",{staticClass:"value"},[t._v(t._s(t.sshConnectTypeStr||"--"))])]),s("br"),s("div",{staticClass:"line-item"},[s("span",{staticClass:"label"},[t._v(t._s(t.$t("用户名"))+":")]),s("span",{staticClass:"value"},[t._v(t._s(t.nodeInfo.userName||"--"))])])])]),s("div",{staticClass:"im-card"},[s("div",{staticClass:"card-header"},[t._v(t._s(t.$t("节点类型")))]),s("div",{staticClass:"card-body"},[s("div",{staticClass:"line-item"},[s("span",{staticClass:"label"},[t._v(t._s(t.$t("节点类型"))+":")]),s("span",{staticClass:"value"},[t._v(t._s(t.nodeTypeStr||"--"))])])]),t.nodeInfo.isSR?s("div",{staticClass:"card-header"},[t._v(t._s(t.$t("超级代表信息")))]):t._e(),t.nodeInfo.isSR?s("div",{staticClass:"card-body"},[s("div",{staticClass:"line-item"},[s("span",{staticClass:"label"},[t._v(t._s(t.$t("URL"))+":")]),s("span",{staticClass:"value"},[t.urlStr?s("el-link",{attrs:{type:"primary",href:t.urlStr,target:"_blank"}},[t._v(t._s(t.urlStr))]):[t._v("--")]],2)]),s("div",{staticClass:"line-item"},[s("span",{staticClass:"label"},[t._v(t._s(t.$t("投票数量"))+":")]),s("span",{staticClass:"value"},[t._v(t._s(t.nodeInfo.voteCount||"--"))])]),s("br"),s("div",{staticClass:"line-item width-auto"},[s("span",{staticClass:"label"},[t._v(t._s(t.$t("Address"))+":")]),s("span",{staticClass:"value"},[t._v(t._s(t.nodeInfo.publicKey||"--"))])])]):t._e()])]),s("div",{staticClass:"page-footer"},[0===t.nodeInfo.deployStatus?s("el-button",{staticClass:"im-button large",attrs:{type:"primary",disabled:t.disabled},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("base.modify")))]):t._e(),0===t.nodeInfo.deployStatus?s("el-button",{staticClass:"im-button large",attrs:{type:"danger",disabled:t.disabled,loading:t.loading},on:{click:t.handleDelete}},[t._v(t._s(t.$t("base.delete")))]):t._e(),s("el-button",{staticClass:"im-button large",on:{click:t.handleCancel}},[t._v(t._s(t.$t("base.return")))])],1)])},n=[],i=(s("a9e3"),s("ac1f"),s("5319"),{name:"node-view",data:function(){return{nodeInfo:{},disabled:!0,loading:!1}},computed:{opNodeId:function(){var t=this.$route.query.id;return/\d+/.test(t)?Number(t):void 0},urlStr:function(){var t="";return this.nodeInfo.hasOwnProperty("url")&&(t=this.nodeInfo.url.replace(/^("|')(.*)("|')$/,"$2")),t},nodeTypeStr:function(){var t="";return this.nodeInfo.hasOwnProperty("isSR")&&(t=this.nodeInfo.isSR?"超级代表":"普通节点"),this.$t(t)},sshConnectTypeStr:function(){var t="";return this.nodeInfo.hasOwnProperty("sshConnectType")&&(t=1===this.nodeInfo.sshConnectType?"口令登陆":"密钥登陆"),this.$t(t)}},created:function(){this.getNodeInfo()},methods:{getNodeInfo:function(){var t=this;this.testValidNode()&&(this.disabled=!0,this.$_api.getStarted.getNodeInfo({id:this.opNodeId},(function(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e||(t.disabled=!1,t.init=!0,t.nodeInfo=s)})))},testValidNode:function(){return!!/\d+/.test(this.opNodeId)||(this.$notify.warning({title:this.$t("base.warning"),message:this.$t("当前所查看的节点为无效节点!")}),!1)},handleSubmit:function(){this.$router.push("/get-started/node-edit?id="+this.opNodeId)},handleDelete:function(){var t=this;this.loading=!0,this.$_api.getStarted.canDeleteNode({id:this.opNodeId},(function(e,s){if(t.loading=!1,!e)if(s.hasOwnProperty("status"))switch(s.status){case 0:t.deleteNode("nodesManage.deleteNodeTips");break;case 1:t.$notify.warning({title:t.$t("base.warning"),message:t.$t("当前节点正在运行，不可删除！")});break;case 2:t.deleteNode("当前节点为最后一个节点，如果删除此节点则同时将删除此节点所在的区块链，是否继续？");break}else t.$notify.warning({title:t.$t("base.warning"),message:t.$t("服务器出问题，不可进行此操作！")})}))},deleteNode:function(t){var e=this;this.$confirm(this.$t(t),this.$t("nodesManage.deleteNodeTipsTitle"),{confirmButtonText:this.$t("base.confirm"),cancelButtonText:this.$t("base.cancel"),center:!0,customClass:"im-message-box",cancelButtonClass:"im-message-cancel-button",confirmButtonClass:"im-message-confirm-button"}).then((function(){e.loading=!0,e.$_api.getStarted.deleteNoteInfo({id:e.opNodeId},(function(t){e.loading=!1,t||(e.$notify.success({title:e.$t("base.successful"),message:e.$t("base.success.delete")}),e.$router.push("/get-started/dashboard"))}))})).catch((function(){e.$notify.info({title:e.$t("base.cancel"),message:e.$t("base.cancelDelete")})}))},handleCancel:function(){this.$router.push("/get-started/dashboard")}}}),o=i,r=(s("09cb"),s("2877")),l=Object(r["a"])(o,a,n,!1,null,"ec1c837e",null);e["default"]=l.exports},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,s){var a=s("1d80"),n=s("5899"),i="["+n+"]",o=RegExp("^"+i+i+"*"),r=RegExp(i+i+"*$"),l=function(t){return function(e){var s=String(a(e));return 1&t&&(s=s.replace(o,"")),2&t&&(s=s.replace(r,"")),s}};t.exports={start:l(1),end:l(2),trim:l(3)}},7156:function(t,e,s){var a=s("861d"),n=s("d2bb");t.exports=function(t,e,s){var i,o;return n&&"function"==typeof(i=e.constructor)&&i!==s&&a(o=i.prototype)&&o!==s.prototype&&n(t,o),t}},a9e3:function(t,e,s){"use strict";var a=s("83ab"),n=s("da84"),i=s("94ca"),o=s("6eeb"),r=s("5135"),l=s("c6b6"),d=s("7156"),c=s("c04e"),u=s("d039"),f=s("7c73"),v=s("241c").f,p=s("06cf").f,h=s("9bf2").f,_=s("58a8").trim,b="Number",C=n[b],g=C.prototype,$=l(f(g))==b,I=function(t){var e,s,a,n,i,o,r,l,d=c(t,!1);if("string"==typeof d&&d.length>2)if(d=_(d),e=d.charCodeAt(0),43===e||45===e){if(s=d.charCodeAt(2),88===s||120===s)return NaN}else if(48===e){switch(d.charCodeAt(1)){case 66:case 98:a=2,n=49;break;case 79:case 111:a=8,n=55;break;default:return+d}for(i=d.slice(2),o=i.length,r=0;r<o;r++)if(l=i.charCodeAt(r),l<48||l>n)return NaN;return parseInt(i,a)}return+d};if(i(b,!C(" 0o1")||!C("0b1")||C("+0x1"))){for(var m,N=function(t){var e=arguments.length<1?0:t,s=this;return s instanceof N&&($?u((function(){g.valueOf.call(s)})):l(s)!=b)?d(new C(I(e)),s,N):I(e)},y=a?v(C):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),S=0;y.length>S;S++)r(C,m=y[S])&&!r(N,m)&&h(N,m,p(C,m));N.prototype=g,g.constructor=N,o(n,b,N)}},e5d4:function(t,e,s){}}]);
//# sourceMappingURL=node-view.abcbdd20.js.map