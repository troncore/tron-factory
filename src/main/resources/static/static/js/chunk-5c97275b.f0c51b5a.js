(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5c97275b"],{2176:function(e,t,r){"use strict";var a=r("bd51"),s=r.n(a);s.a},"37af":function(e,t,r){},4694:function(e,t,r){"use strict";var a=r("37af"),s=r.n(a);s.a},"498a":function(e,t,r){"use strict";var a=r("23e7"),s=r("58a8").trim,n=r("e070");a({target:"String",proto:!0,forced:n("trim")},{trim:function(){return s(this)}})},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,r){var a=r("1d80"),s=r("5899"),n="["+s+"]",i=RegExp("^"+n+n+"*"),o=RegExp(n+n+"*$"),l=function(e){return function(t){var r=String(a(t));return 1&e&&(r=r.replace(i,"")),2&e&&(r=r.replace(o,"")),r}};e.exports={start:l(1),end:l(2),trim:l(3)}},"61f7":function(e,t,r){"use strict";r("c975"),r("498a");function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=r("ade3");function n(e){var t=/^[0-9]*[1-9][0-9]*$/;return t.test(e)}function i(e){var t=/^\d+$/;return t.test(e)}function o(e){var t=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;return t.test(e)}function l(e){var t=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;return t.test(e)}r.d(t,"c",(function(){return n})),r.d(t,"b",(function(){return i})),r.d(t,"d",(function(){return o})),r.d(t,"a",(function(){return l}));var c=function e(){a(this,e),Object(s["a"])(this,"regexpNum",/^\d+&/)};new c},"81d5":function(e,t,r){"use strict";var a=r("7b0b"),s=r("23cb"),n=r("50c4");e.exports=function(e){var t=a(this),r=n(t.length),i=arguments.length,o=s(i>1?arguments[1]:void 0,r),l=i>2?arguments[2]:void 0,c=void 0===l?r:s(l,r);while(c>o)t[o++]=e;return t}},"9b42":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"node-info"},[r("el-form",{ref:"im-form",attrs:{rules:e.formRules,model:e.form,size:"medium"}},[r("div",{staticClass:"im-card padding-20"},[r("div",{staticClass:"im-card__title"},[e._v(e._s(e.$t("nodesManage.nodeType")))]),r("el-form-item",{attrs:{prop:"isSR"}},[r("div",{staticClass:"radio-with-suffix"},[r("el-radio",{attrs:{label:!1,disabled:e.isView},model:{value:e.form.isSR,callback:function(t){e.$set(e.form,"isSR",t)},expression:"form.isSR"}},[e._v(e._s(e.$t("nodesManage.fullNode")))]),r("im-tooltip",{attrs:{content:e.$t("nodesManage.helpTips.fullNode")}})],1),r("div",{staticClass:"radio-with-suffix"},[r("el-radio",{attrs:{label:!0,disabled:e.isView},model:{value:e.form.isSR,callback:function(t){e.$set(e.form,"isSR",t)},expression:"form.isSR"}},[e._v(e._s(e.$t("nodesManage.superNode")))]),r("im-tooltip",{attrs:{content:e.$t("nodesManage.helpTips.superNode")}})],1)]),e.form.isSR?r("div",[r("el-form-item",{attrs:{prop:"needSyncCheck","label-width":"140px"}},[r("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.syncCheck"))+" "),r("im-tooltip",{attrs:{content:e.$t("nodesManage.helpTips.needSyncCheck")}})],1),r("el-switch",{attrs:{disabled:e.isView},model:{value:e.form.needSyncCheck,callback:function(t){e.$set(e.form,"needSyncCheck",t)},expression:"form.needSyncCheck"}})],1),r("br"),r("el-form-item",{attrs:{prop:"url","label-width":"140px"}},[r("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v("URL "),r("im-tooltip",{attrs:{content:e.$t("nodesManage.helpTips.url")}})],1),r("el-input",{attrs:{tabindex:"21",disabled:e.isView,clearable:"",placeholder:e.$t("nodesManage.valid.inputURL")},model:{value:e.form.url,callback:function(t){e.$set(e.form,"url","string"===typeof t?t.trim():t)},expression:"form.url"}})],1),r("br"),r("el-form-item",{attrs:{prop:"voteCount","label-width":"140px"}},[r("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v("voteCount "),r("im-tooltip",{attrs:{content:e.$t("nodesManage.helpTips.voteCount")}})],1),r("el-input",{attrs:{tabindex:"22",type:"number",maxlength:20,disabled:e.isView,clearable:"",placeholder:e.$t("nodesManage.valid.inputVoteCount")},model:{value:e.form.voteCount,callback:function(t){e.$set(e.form,"voteCount","string"===typeof t?t.trim():t)},expression:"form.voteCount"}})],1),r("br"),r("el-form-item",{staticClass:"address",attrs:{prop:"publicKey","label-width":"140px"}},[r("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v("address "),r("im-tooltip",{attrs:{content:e.$t("nodesManage.helpTips.publicKey")}})],1),r("el-input",{attrs:{tabindex:"23",disabled:e.isView,clearable:"",placeholder:e.$t("nodesManage.valid.publicKey")},model:{value:e.form.publicKey,callback:function(t){e.$set(e.form,"publicKey","string"===typeof t?t.trim():t)},expression:"form.publicKey"}})],1),r("br"),"detail"!==e.opType?r("el-form-item",{staticClass:"private-key",attrs:{prop:"privateKey","label-width":"140px"}},[r("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v("privateKey "),r("im-tooltip",{attrs:{content:e.$t("nodesManage.helpTips.privateKey")}})],1),r("el-input",{attrs:{tabindex:"24",type:"textarea",autosize:{minRows:2,maxRows:4},disabled:e.isView,placeholder:e.$t("nodesManage.valid.inputPrivateKey")},model:{value:e.form.privateKey,callback:function(t){e.$set(e.form,"privateKey","string"===typeof t?t.trim():t)},expression:"form.privateKey"}})],1):e._e()],1):e._e()],1),r("div",{staticClass:"im-card padding-20"},[r("div",{staticClass:"im-card__title"},[e._v(e._s(e.$t("nodesManage.nodeConfig")))]),r("el-form-item",{attrs:{prop:"ip","label-width":"140px"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.nodeIP")))]),r("el-input",{attrs:{tabindex:"25",disabled:e.isView,clearable:"",placeholder:e.$t("nodesManage.valid.rightIP")},model:{value:e.form.ip,callback:function(t){e.$set(e.form,"ip","string"===typeof t?t.trim():t)},expression:"form.ip"}})],1)],1),r("div",{staticClass:"im-card padding-20"},[r("div",{staticClass:"im-card__title"},[e._v(e._s(e.$t("nodesManage.SSH"))+" "),r("im-tooltip",{attrs:{content:e.$t("nodesManage.helpTips.SSH")}})],1),r("el-form-item",{attrs:{prop:"userName","label-width":"140px"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.sshUserName")))]),r("el-input",{attrs:{tabindex:"26",disabled:e.isView,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.userName,callback:function(t){e.$set(e.form,"userName","string"===typeof t?t.trim():t)},expression:"form.userName"}})],1),r("el-form-item",{staticClass:"ssh-port",attrs:{prop:"port","label-width":"100px"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.sshPort")))]),r("el-input",{attrs:{type:"number",tabindex:"27",disabled:e.isView,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.port,callback:function(t){e.$set(e.form,"port","string"===typeof t?t.trim():t)},expression:"form.port"}})],1),r("br"),r("el-form-item",{attrs:{prop:"sshConnectType","label-width":"140px"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.sshConnectType")))]),r("el-radio",{attrs:{label:2,disabled:e.isView},model:{value:e.form.sshConnectType,callback:function(t){e.$set(e.form,"sshConnectType",t)},expression:"form.sshConnectType"}},[e._v(e._s(e.$t("nodesManage.keyConnect")))]),r("el-radio",{attrs:{label:1,disabled:e.isView},model:{value:e.form.sshConnectType,callback:function(t){e.$set(e.form,"sshConnectType",t)},expression:"form.sshConnectType"}},[e._v(e._s(e.$t("nodesManage.passwordConnect")))])],1),r("br"),1===e.form.sshConnectType?r("el-form-item",{staticClass:"ssh-password",attrs:{prop:"sshPassword","label-width":"140px"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.sshPassword")))]),r("el-input",{attrs:{tabindex:"28",disabled:e.isView,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.sshPassword,callback:function(t){e.$set(e.form,"sshPassword","string"===typeof t?t.trim():t)},expression:"form.sshPassword"}})],1):e._e()],1)]),r("div",{staticClass:"page-footer"},["detail"!==e.opType?r("el-button",{staticClass:"im-button large",attrs:{type:"primary",loading:e.loading},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.complete")))]):e._e(),r("el-button",{staticClass:"im-button large",on:{click:e.handleCancel}},[e._v(e._s(e.$t("detail"!==e.opType?"base.cancel":"base.return")))])],1)],1)},s=[],n=(r("a4d3"),r("cb29"),r("4de4"),r("a15b"),r("fb6a"),r("e439"),r("dbb4"),r("b64b"),r("d3b7"),r("159b"),r("96cf"),r("1da1")),i=r("ade3"),o=r("2f62"),l=r("61f7"),c=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-tooltip",{attrs:{effect:"dark",placement:"top"}},[r("div",{attrs:{slot:"content"},domProps:{innerHTML:e._s(e.content)},slot:"content"}),r("i",{staticClass:"icon-question fa fa-question-circle-o",style:e.myStyle})])},d=[],u={name:"im-tooltip",props:{content:{},marginLeft:String,marginRight:String},computed:{myStyle:function(){var e={};return"undefined"!==typeof this.marginLeft&&(e.marginLeft=this.marginLeft),"undefined"!==typeof this.marginRight&&(e.marginRight=this.marginRight),e}}},p=u,f=(r("2176"),r("2877")),m=Object(f["a"])(p,c,d,!1,null,"5d886198",null),b=m.exports;function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function g(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach((function(t){Object(i["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var v={name:"node-edit",components:{ImTooltip:b},data:function(){return{form:{ip:"",isSR:!0,needSyncCheck:!1,url:"http://",voteCount:"",publicKey:"",privateKey:"",userName:"",port:22,sshConnectType:1,sshPassword:""},tempIP:"",tempPublicKey:"",safePrivateKey:Array(64).fill("*").join(""),nodeInfo:{},loading:!1}},computed:g({},Object(o["c"])("app",["currentGitBranch"]),{disabledLocalIP:function(){return/(master|release)/.test(this.currentGitBranch)},opType:function(){return this.$route.params.type},isView:function(){return"detail"===this.opType},isEdit:function(){return"edit"===this.opType},opNodeId:function(){return this.$route.params.id},formRules:function(){var e=this,t=function(t,r,a){Object(l["c"])(r)?a():a(new Error(e.$t("nodesManage.valid.positiveInteger")))},r=function(t,r,a){Object(l["b"])(r)?a():a(new Error(e.$t("nodesManage.valid.gteZeroInt")))},a=function(t,r,a){Object(l["a"])(r)?a():a(new Error(e.$t("nodesManage.valid.rightIP")))},s=function(t,r,a){e.disabledLocalIP&&"127.0.0.1"===r?a(new Error(e.$t("nodesManage.valid.disabledLocalIP"))):a()},n=function(t,r,a){r>65535?a(new Error(e.$t("nodesManage.valid.maxPortValue"))):a()},i=function(t,r,a){64!==r.length?a(new Error(e.$t("nodesManage.valid.inputPrivateKey"))):a()};return{ip:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:a,trigger:"blur"},{required:!0,validator:s,trigger:"blur"}],port:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:t,trigger:"blur"},{required:!0,validator:n,trigger:"blur"}],userName:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],sshPassword:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],url:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],voteCount:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:r,trigger:"blur"}],publicKey:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],privateKey:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:i,trigger:"blur"}]}}}),watch:{opNodeId:{handler:"getNodeInfo",immediate:!0}},methods:{getNodeInfo:function(){var e=this;"add"!==this.opType&&this.opNodeId&&(this.form.isSR=!1,this.form.sshConnectType=2,this.$_api.nodesManage.getNodeInfo({id:this.opNodeId},(function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t||(e.nodeInfo=r,e.initForm())})))},initForm:function(){var e=this.nodeInfo;this.form={ip:e.ip||"",isSR:void 0===e.isSR||Boolean(e.isSR),needSyncCheck:void 0!==e.needSyncCheck&&e.needSyncCheck,url:JSON.stringify(e.url).slice(3).slice(0,-3)||"http://",voteCount:e.voteCount||"",publicKey:e.publicKey||"",privateKey:e.publicKey?this.safePrivateKey:"",userName:e.userName||"",port:e.port||22,sshConnectType:e.sshConnectType||1,sshPassword:e.sshPassword||""},this.tempPublicKey=e.publicKey},handleSubmit:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.$refs["im-form"].validate(function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(r){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=8;break}return a={},t.loading=!0,e.next=5,t.initParams(a);case 5:if(e.sent){e.next=7;break}return e.abrupt("return");case 7:a.isSR&&(a.publicKey!==t.tempPublicKey||a.privateKey)?t.$confirm(t.$t("nodesManage.saveAddressPriKey"),t.$t("base.tips"),{cancelButtonText:t.$t("base.cancel"),confirmButtonText:t.$t("base.confirm"),center:!0,customClass:"im-message-box",cancelButtonClass:"im-message-cancel-button primary",confirmButtonClass:"im-message-confirm-button primary"}).then((function(){t.addNode(a)})).catch((function(){t.$notify.info({title:t.$t("base.cancel"),message:t.$t("base.cancel")}),t.loading=!1})):t.addNode(a);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),initParams:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r={id:"edit"===this.opType&&this.opNodeId?this.opNodeId:void 0,ip:this.form.ip,isSR:this.form.isSR,userName:this.form.userName,port:this.form.port,sshConnectType:this.form.sshConnectType,sshPassword:1===this.form.sshConnectType?this.form.sshPassword:void 0},a={needSyncCheck:this.form.needSyncCheck,url:'"'.concat(this.form.url,'"'),voteCount:this.form.voteCount,publicKey:this.form.publicKey,privateKey:this.form.privateKey!==this.safePrivateKey?this.form.privateKey:void 0},e.t0=a.voteCount,!e.t0){e.next=7;break}return e.next=6,this.checkBalance(t.voteCount);case 6:e.t0=!e.sent;case 7:if(!e.t0){e.next=10;break}return this.loading=!1,e.abrupt("return",!1);case 10:return Object.assign(t,g({},r,{},r.isSR&&a)),e.abrupt("return",!0);case 12:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),checkBalance:function(e){var t=this;return new Promise((function(r){t.$_api.configuration.checkBalance({balance:e},(function(e,a){if(e)return r(!0);a.result?r(!0):(t.$message.error(t.$t("nodesManage.valid.maxVoteCountValue")),r(!1))}))}))},addNode:function(e){var t=this,r="add"===this.opType?"addNoteInfo":"editNoteInfo",a="add"===this.opType?"nodesManage.addNodeSuccess":"nodesManage.updateNodeSuccess";this.$_api.nodesManage[r](e,(function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t.loading=!1,!e)if(r.status){var s="base.error";1===r.status?s="nodesManage.sshConnectFail":2===r.status&&(s="nodesManage.addressNotPrikey"),t.$notify.error({title:t.$t("base.error"),message:t.$t(s)})}else t.$notify({type:"success",title:t.$t("base.successful"),message:t.$t(a)}),t.$router.push({path:"/nodes-manage"})}))},handleCancel:function(){this.$router.push({path:"/nodes-manage"})}}},y=v,$=(r("4694"),Object(f["a"])(y,a,s,!1,null,"46eb0320",null));t["default"]=$.exports},a15b:function(e,t,r){"use strict";var a=r("23e7"),s=r("44ad"),n=r("fc6a"),i=r("b301"),o=[].join,l=s!=Object,c=i("join",",");a({target:"Array",proto:!0,forced:l||c},{join:function(e){return o.call(n(this),void 0===e?",":e)}})},bd51:function(e,t,r){},cb29:function(e,t,r){var a=r("23e7"),s=r("81d5"),n=r("44d2");a({target:"Array",proto:!0},{fill:s}),n("fill")},e070:function(e,t,r){var a=r("d039"),s=r("5899"),n="​᠎";e.exports=function(e){return a((function(){return!!s[e]()||n[e]()!=n||s[e].name!==e}))}},fb6a:function(e,t,r){"use strict";var a=r("23e7"),s=r("861d"),n=r("e8b5"),i=r("23cb"),o=r("50c4"),l=r("fc6a"),c=r("8418"),d=r("1dde"),u=r("b622"),p=u("species"),f=[].slice,m=Math.max;a({target:"Array",proto:!0,forced:!d("slice")},{slice:function(e,t){var r,a,d,u=l(this),b=o(u.length),h=i(e,b),g=i(void 0===t?b:t,b);if(n(u)&&(r=u.constructor,"function"!=typeof r||r!==Array&&!n(r.prototype)?s(r)&&(r=r[p],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return f.call(u,h,g);for(a=new(void 0===r?Array:r)(m(g-h,0)),d=0;h<g;h++,d++)h in u&&c(a,d,u[h]);return a.length=d,a}})}}]);
//# sourceMappingURL=chunk-5c97275b.f0c51b5a.js.map