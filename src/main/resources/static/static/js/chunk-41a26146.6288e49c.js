(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41a26146"],{"498a":function(e,t,r){"use strict";var a=r("23e7"),s=r("58a8").trim,n=r("e070");a({target:"String",proto:!0,forced:n("trim")},{trim:function(){return s(this)}})},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,r){var a=r("1d80"),s=r("5899"),n="["+s+"]",i=RegExp("^"+n+n+"*"),o=RegExp(n+n+"*$"),l=function(e){return function(t){var r=String(a(t));return 1&e&&(r=r.replace(i,"")),2&e&&(r=r.replace(o,"")),r}};e.exports={start:l(1),end:l(2),trim:l(3)}},"61f7":function(e,t,r){"use strict";r.d(t,"c",(function(){return a})),r.d(t,"b",(function(){return s})),r.d(t,"d",(function(){return n})),r.d(t,"a",(function(){return i}));r("c975"),r("498a");function a(e){var t=/^[0-9]*[1-9][0-9]*$/;return t.test(e)}function s(e){var t=/^\d+$/;return t.test(e)}function n(e){var t=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;return t.test(e)}function i(e){var t=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;return t.test(e)}},"81d5":function(e,t,r){"use strict";var a=r("7b0b"),s=r("23cb"),n=r("50c4");e.exports=function(e){var t=a(this),r=n(t.length),i=arguments.length,o=s(i>1?arguments[1]:void 0,r),l=i>2?arguments[2]:void 0,c=void 0===l?r:s(l,r);while(c>o)t[o++]=e;return t}},"9b42":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"node-info"},[r("el-form",{ref:"im-form",staticClass:"im-form",attrs:{rules:e.formRules,model:e.form,"label-width":"100%","label-position":"top",size:"medium"}},[r("div",{staticClass:"im-card padding-20"},[r("div",{staticClass:"service-type"},[r("div",{staticClass:"title"},[e._v(e._s(e.$t("nodesManage.serviceType")))]),r("el-radio-group",{attrs:{size:"medium",disabled:e.isView||e.isEdit},model:{value:e.form.serviceType,callback:function(t){e.$set(e.form,"serviceType",t)},expression:"form.serviceType"}},[r("el-radio-button",{attrs:{label:"remote"}},[e._v(e._s(e.$t("nodesManage.remoteDeploy")))]),r("el-radio-button",{attrs:{label:"local"}},[e._v(e._s(e.$t("nodesManage.localDeploy")))])],1)],1),r("el-form-item",{attrs:{prop:"ip"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.nodeIP")))]),r("el-input",{attrs:{tabindex:"21",maxlength:50,disabled:e.isView||"local"===e.form.serviceType,clearable:"",placeholder:e.$t("nodesManage.valid.rightIP")},model:{value:e.form.ip,callback:function(t){e.$set(e.form,"ip","string"===typeof t?t.trim():t)},expression:"form.ip"}})],1),r("br"),"remote"===e.form.serviceType?[r("el-form-item",{attrs:{prop:"sshConnectType"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.sshConnectType")))]),r("el-radio",{attrs:{label:1,disabled:e.isView},model:{value:e.form.sshConnectType,callback:function(t){e.$set(e.form,"sshConnectType",t)},expression:"form.sshConnectType"}},[e._v(e._s(e.$t("nodesManage.passwordConnect")))]),r("el-radio",{attrs:{label:2,disabled:e.isView},model:{value:e.form.sshConnectType,callback:function(t){e.$set(e.form,"sshConnectType",t)},expression:"form.sshConnectType"}},[e._v(e._s(e.$t("nodesManage.keyConnect")))])],1),r("br"),r("el-form-item",{attrs:{prop:"userName"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.sshUserName")))]),r("el-input",{attrs:{tabindex:"23",maxlength:50,disabled:e.isView,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.userName,callback:function(t){e.$set(e.form,"userName","string"===typeof t?t.trim():t)},expression:"form.userName"}})],1),r("br"),1===e.form.sshConnectType?[r("el-form-item",{attrs:{prop:"sshPassword"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.sshPassword")))]),r("el-input",{attrs:{tabindex:"24",maxlength:100,disabled:e.isView,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.sshPassword,callback:function(t){e.$set(e.form,"sshPassword","string"===typeof t?t.trim():t)},expression:"form.sshPassword"}})],1),r("br")]:e._e(),r("el-form-item",{attrs:{prop:"port"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.sshPort")))]),r("el-input",{attrs:{type:"number",tabindex:"25",maxlength:50,disabled:e.isView,clearable:"",placeholder:e.$t("nodesManage.valid.maxPortValue")},model:{value:e.form.port,callback:function(t){e.$set(e.form,"port","string"===typeof t?t.trim():t)},expression:"form.port"}})],1)]:e._e()],2),r("div",{staticClass:"im-card padding-20"},[r("div",{staticClass:"sr-header"},[r("div",{staticClass:"header-item"},[r("span",{staticClass:"title"},[e._v(e._s(e.$t("nodesManage.SRNode")))]),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("nodesManage.helpTips.isSR"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})]),r("el-switch",{attrs:{disabled:e.isView},model:{value:e.form.isSR,callback:function(t){e.$set(e.form,"isSR",t)},expression:"form.isSR"}})],1)]),e.form.isSR?[r("el-form-item",{staticClass:"flex-horizontal"},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" "+e._s(e.$t("nodesManage.syncCheck"))+" "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("nodesManage.helpTips.needSyncCheck"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-switch",{attrs:{disabled:e.isView},model:{value:e.form.needSyncCheck,callback:function(t){e.$set(e.form,"needSyncCheck",t)},expression:"form.needSyncCheck"}})],1),r("el-form-item",{attrs:{prop:"url"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" URL "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("nodesManage.helpTips.url"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{tabindex:"26",maxlength:100,disabled:e.isView,clearable:"",placeholder:e.$t("nodesManage.valid.inputURL")},model:{value:e.form.url,callback:function(t){e.$set(e.form,"url","string"===typeof t?t.trim():t)},expression:"form.url"}})],1),r("br"),r("el-form-item",{attrs:{prop:"voteCount"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v("voteCount")]),r("el-input",{attrs:{type:"number",tabindex:"27",maxlength:20,disabled:e.isView,clearable:"",placeholder:e.$t("nodesManage.valid.inputVoteCount")},model:{value:e.form.voteCount,callback:function(t){e.$set(e.form,"voteCount","string"===typeof t?t.trim():t)},expression:"form.voteCount"}})],1),r("br"),r("el-form-item",{staticClass:"address",attrs:{prop:"publicKey"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" address "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("nodesManage.helpTips.publicKey"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{tabindex:"27",disabled:e.isView,clearable:"",placeholder:e.$t("nodesManage.valid.publicKey")},model:{value:e.form.publicKey,callback:function(t){e.$set(e.form,"publicKey","string"===typeof t?t.trim():t)},expression:"form.publicKey"}})],1),r("br"),"detail"!==e.opType?r("el-form-item",{staticClass:"private-key",attrs:{prop:"privateKey"}},[r("span",{staticClass:"private-key__help",attrs:{slot:"label"},slot:"label"},[e._v(" privateKey "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("nodesManage.helpTips.privateKey"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{tabindex:"28",type:"textarea",autosize:{minRows:2,maxRows:4},maxlength:1e3,disabled:e.isView,placeholder:e.$t("nodesManage.valid.inputPrivateKey")},model:{value:e.form.privateKey,callback:function(t){e.$set(e.form,"privateKey","string"===typeof t?t.trim():t)},expression:"form.privateKey"}})],1):e._e()]:e._e()],2)]),r("div",{staticClass:"page-footer align-right"},[r("el-button",{staticClass:"im-button large",on:{click:e.handleCancel}},[e._v(e._s(e.$t("detail"!==e.opType?"base.cancel":"base.return")))]),"detail"!==e.opType?r("el-button",{staticClass:"im-button large",attrs:{type:"primary",loading:e.loading},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.complete")))]):e._e()],1)],1)},s=[],n=(r("a4d3"),r("cb29"),r("4de4"),r("a15b"),r("fb6a"),r("e439"),r("dbb4"),r("b64b"),r("d3b7"),r("159b"),r("ade3")),i=(r("96cf"),r("1da1")),o=r("61f7");function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){Object(n["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d={name:"node-edit",data:function(){return{form:{serviceType:"remote",ip:"",port:22,userName:"",sshConnectType:1,sshPassword:"",isSR:!0,needSyncCheck:!1,url:"http://",voteCount:"",publicKey:"",privateKey:""},tempIP:"",tempPublicKey:"",safePrivateKey:Array(64).fill("*").join(""),nodeInfo:{},loading:!1}},computed:{opType:function(){return this.$route.params.type},isView:function(){return"detail"===this.opType},isEdit:function(){return"edit"===this.opType},opNodeId:function(){return this.$route.params.id},formRules:function(){var e=this,t=function(t,r,a){Object(o["c"])(r)?a():a(new Error(e.$t("nodesManage.valid.positiveInteger")))},r=function(t,r,a){Object(o["b"])(r)?a():a(new Error(e.$t("nodesManage.valid.gteZeroInt")))},a=function(t,r,a){Object(o["a"])(r)?a():a(new Error(e.$t("nodesManage.valid.rightIP")))},s=function(t,r,a){r>65535?a(new Error(e.$t("nodesManage.valid.maxPortValue"))):a()},n=function(t,r,a){64!==r.length?a(new Error(e.$t("nodesManage.valid.inputPrivateKey"))):a()};return{ip:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:a,trigger:"blur"}],port:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:t,trigger:"blur"},{required:!0,validator:s,trigger:"blur"}],userName:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],sshPassword:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],url:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],voteCount:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:r,trigger:"blur"}],publicKey:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],privateKey:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:n,trigger:"blur"}]}}},watch:{opNodeId:{handler:"getNodeInfo",immediate:!0},"form.serviceType":{handler:function(e){"local"===e?(this.tempIP=this.form.ip,this.form.ip="127.0.0.1"):this.form.ip=this.tempIP},immediate:!0}},methods:{getNodeInfo:function(){var e=this;"add"!==this.opType&&this.opNodeId&&this.$_api.nodesManage.getNodeInfo({id:this.opNodeId},(function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t||(e.nodeInfo=r,e.initForm())}))},initForm:function(){var e=this.nodeInfo;this.form={serviceType:e.serviceType||"remote",ip:e.ip||"",port:e.port||22,userName:e.userName||"",sshConnectType:e.sshConnectType||1,sshPassword:e.sshPassword||"",isSR:void 0===e.isSR||Boolean(e.isSR),needSyncCheck:void 0!==e.needSyncCheck&&e.needSyncCheck,url:JSON.stringify(e.url).slice(3).slice(0,-3)||"http://",voteCount:e.voteCount||"",publicKey:e.publicKey||"",privateKey:this.safePrivateKey},this.tempPublicKey=e.publicKey},handleSubmit:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.$refs["im-form"].validate(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(r){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=8;break}return a={},t.loading=!0,e.next=5,t.initParams(a);case 5:if(e.sent){e.next=7;break}return e.abrupt("return");case 7:a.isSR&&a.publicKey!==t.tempPublicKey||a.privateKey?t.$confirm(t.$t("nodesManage.saveAddressPriKey"),t.$t("base.tips"),{cancelButtonText:t.$t("base.cancel"),confirmButtonText:t.$t("base.confirm"),center:!0,customClass:"im-message-box",cancelButtonClass:"im-message-cancel-button primary",confirmButtonClass:"im-message-confirm-button primary"}).then((function(){t.addNode(a)})).catch((function(){t.$notify.info({title:t.$t("base.cancel"),message:t.$t("base.cancel")}),t.loading=!1})):t.addNode(a);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),addNode:function(e){var t=this,r="add"===this.opType?"addNoteInfo":"editNoteInfo",a="add"===this.opType?"nodesManage.addNodeSuccess":"nodesManage.updateNodeSuccess";this.$_api.nodesManage[r](e,(function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t.loading=!1,!e)if(r.status){var s="base.error";1===r.status?s="nodesManage.helpTips.sshConnectFail":2===r.status&&(s="nodesManage.helpTips.addressNotPrikey"),t.$notify.error({title:t.$t("base.error"),message:t.$t(s)})}else t.$notify({type:"success",title:t.$t("base.successful"),message:t.$t(a)}),t.$router.push({path:"/nodes-manage"})}))},initParams:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var r,a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r={id:"edit"===this.opType&&this.opNodeId?this.opNodeId:void 0,serviceType:this.form.serviceType,ip:this.form.ip,isSR:this.form.isSR},a={sshConnectType:this.form.sshConnectType,userName:this.form.userName,sshPassword:this.form.sshPassword,port:this.form.port},s={needSyncCheck:this.form.needSyncCheck,url:'"'.concat(this.form.url,'"'),voteCount:this.form.voteCount,publicKey:this.form.publicKey,privateKey:this.form.privateKey},s.privateKey===this.safePrivateKey&&delete s.privateKey,e.t0=s.voteCount,!e.t0){e.next=9;break}return e.next=8,this.checkBalance(t.voteCount);case 8:e.t0=!e.sent;case 9:if(!e.t0){e.next=12;break}return this.loading=!1,e.abrupt("return",!1);case 12:return Object.assign(t,c({},r,{},"remote"===r.serviceType&&a,{},r.isSR&&s)),e.abrupt("return",!0);case 14:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),checkBalance:function(e){var t=this;return new Promise((function(r){t.$_api.configuration.checkBalance({balance:e},(function(e,a){if(e)return r(!0);a.result?r(!0):(t.$message.error(t.$t("nodesManage.valid.maxVoteCountValue")),r(!1))}))}))},handleCancel:function(){this.$router.push({path:"/nodes-manage"})}}},u=d,p=(r("f7cd"),r("2877")),f=Object(p["a"])(u,a,s,!1,null,"1c0e83ba",null);t["default"]=f.exports},a15b:function(e,t,r){"use strict";var a=r("23e7"),s=r("44ad"),n=r("fc6a"),i=r("b301"),o=[].join,l=s!=Object,c=i("join",",");a({target:"Array",proto:!0,forced:l||c},{join:function(e){return o.call(n(this),void 0===e?",":e)}})},cb29:function(e,t,r){var a=r("23e7"),s=r("81d5"),n=r("44d2");a({target:"Array",proto:!0},{fill:s}),n("fill")},e070:function(e,t,r){var a=r("d039"),s=r("5899"),n="​᠎";e.exports=function(e){return a((function(){return!!s[e]()||n[e]()!=n||s[e].name!==e}))}},e0fd:function(e,t,r){},f7cd:function(e,t,r){"use strict";var a=r("e0fd"),s=r.n(a);s.a},fb6a:function(e,t,r){"use strict";var a=r("23e7"),s=r("861d"),n=r("e8b5"),i=r("23cb"),o=r("50c4"),l=r("fc6a"),c=r("8418"),d=r("1dde"),u=r("b622"),p=u("species"),f=[].slice,m=Math.max;a({target:"Array",proto:!0,forced:!d("slice")},{slice:function(e,t){var r,a,d,u=l(this),b=o(u.length),h=i(e,b),v=i(void 0===t?b:t,b);if(n(u)&&(r=u.constructor,"function"!=typeof r||r!==Array&&!n(r.prototype)?s(r)&&(r=r[p],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return f.call(u,h,v);for(a=new(void 0===r?Array:r)(m(v-h,0)),d=0;h<v;h++,d++)h in u&&c(a,d,u[h]);return a.length=d,a}})}}]);
//# sourceMappingURL=chunk-41a26146.6288e49c.js.map