(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4772e8a4"],{"498a":function(e,t,r){"use strict";var a=r("23e7"),s=r("58a8").trim,o=r("e070");a({target:"String",proto:!0,forced:o("trim")},{trim:function(){return s(this)}})},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,r){var a=r("1d80"),s=r("5899"),o="["+s+"]",i=RegExp("^"+o+o+"*"),n=RegExp(o+o+"*$"),l=function(e){return function(t){var r=String(a(t));return 1&e&&(r=r.replace(i,"")),2&e&&(r=r.replace(n,"")),r}};e.exports={start:l(1),end:l(2),trim:l(3)}},5917:function(e,t,r){},"61f7":function(e,t,r){"use strict";r.d(t,"c",(function(){return a})),r.d(t,"b",(function(){return s})),r.d(t,"d",(function(){return o})),r.d(t,"a",(function(){return i}));r("c975"),r("498a");function a(e){var t=/^[0-9]*[1-9][0-9]*$/;return t.test(e)}function s(e){var t=/^\d+$/;return t.test(e)}function o(e){var t=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;return t.test(e)}function i(e){var t=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;return t.test(e)}},"73e5":function(e,t,r){"use strict";var a=r("5917"),s=r.n(a);s.a},"81d5":function(e,t,r){"use strict";var a=r("7b0b"),s=r("23cb"),o=r("50c4");e.exports=function(e){var t=a(this),r=o(t.length),i=arguments.length,n=s(i>1?arguments[1]:void 0,r),l=i>2?arguments[2]:void 0,c=void 0===l?r:s(l,r);while(c>n)t[n++]=e;return t}},"9b42":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"node-info"},[r("el-form",{ref:"im-form",staticClass:"im-form",attrs:{rules:e.formRules,model:e.form,"label-width":"100%","label-position":"top",size:"medium"}},[r("div",{staticClass:"im-card padding-20"},[r("div",{staticClass:"service-type"},[r("div",{staticClass:"title"},[e._v(e._s(e.$t("nodesManage.serviceType")))]),r("el-radio-group",{attrs:{size:"medium",disabled:e.isView},model:{value:e.form.serviceType,callback:function(t){e.$set(e.form,"serviceType",t)},expression:"form.serviceType"}},[r("el-radio-button",{attrs:{label:"local"}},[e._v(e._s(e.$t("nodesManage.localDeploy")))]),r("el-radio-button",{attrs:{label:"remote"}},[e._v(e._s(e.$t("nodesManage.remoteDeploy")))])],1)],1),r("el-form-item",{attrs:{prop:"ip"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" FullNode IP "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("nodesManage.helpTips.ip"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{tabindex:"21",maxlength:50,disabled:e.isView,clearable:"",placeholder:e.$t("nodesManage.valid.rightIP")},model:{value:e.form.ip,callback:function(t){e.$set(e.form,"ip","string"===typeof t?t.trim():t)},expression:"form.ip"}})],1),r("el-form-item",{attrs:{prop:"port"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" FullNode Port "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("nodesManage.helpTips.port"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{type:"number",tabindex:"22",maxlength:50,disabled:e.isView,clearable:"",placeholder:e.$t("nodesManage.valid.maxPortValue")},model:{value:e.form.port,callback:function(t){e.$set(e.form,"port","string"===typeof t?t.trim():t)},expression:"form.port"}})],1),r("br"),"remote"===e.form.serviceType?[r("el-form-item",{attrs:{prop:"userName"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.sshUserName"))+" "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("nodesManage.helpTips.sshUserName"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{tabindex:"23",maxlength:50,disabled:e.isView,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.userName,callback:function(t){e.$set(e.form,"userName","string"===typeof t?t.trim():t)},expression:"form.userName"}})],1),r("el-form-item",{attrs:{prop:"sshPassword"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.sshPassword"))+" "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("nodesManage.helpTips.sshPassword"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{tabindex:"24",maxlength:100,disabled:e.isView,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.sshPassword,callback:function(t){e.$set(e.form,"sshPassword","string"===typeof t?t.trim():t)},expression:"form.sshPassword"}})],1),r("el-form-item",{attrs:{prop:"sshPort"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.sshPort"))+" "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("nodesManage.helpTips.sshPort"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{type:"number",tabindex:"25",maxlength:200,disabled:e.isView,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.sshPort,callback:function(t){e.$set(e.form,"sshPort","string"===typeof t?t.trim():t)},expression:"form.sshPort"}})],1)]:e._e()],2),r("div",{staticClass:"im-card padding-20"},[r("div",{staticClass:"sr-header"},[r("div",{staticClass:"header-item"},[r("span",{staticClass:"title"},[e._v(e._s(e.$t("nodesManage.SRNode")))]),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("nodesManage.helpTips.isSR"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})]),r("el-switch",{attrs:{disabled:e.isView},model:{value:e.form.isSR,callback:function(t){e.$set(e.form,"isSR",t)},expression:"form.isSR"}})],1),e.form.isSR?r("div",{staticClass:"header-item"},[r("span",{staticClass:"gray"},[e._v(e._s(e.$t("nodesManage.syncCheck")))]),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("nodesManage.helpTips.needSyncCheck"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})]),r("el-switch",{attrs:{disabled:e.isView},model:{value:e.form.needSyncCheck,callback:function(t){e.$set(e.form,"needSyncCheck",t)},expression:"form.needSyncCheck"}})],1):e._e()]),e.form.isSR?[r("el-form-item",{attrs:{prop:"url"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" URL "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("nodesManage.helpTips.url"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{tabindex:"26",maxlength:100,disabled:e.isView,clearable:"",placeholder:e.$t("nodesManage.valid.inputURL")},model:{value:e.form.url,callback:function(t){e.$set(e.form,"url","string"===typeof t?t.trim():t)},expression:"form.url"}})],1),r("el-form-item",{attrs:{prop:"voteCount"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" voteCount "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("nodesManage.helpTips.voteCount"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{type:"number",tabindex:"27",maxlength:20,disabled:e.isView,clearable:"",placeholder:e.$t("nodesManage.valid.inputVoteCount")},model:{value:e.form.voteCount,callback:function(t){e.$set(e.form,"voteCount","string"===typeof t?t.trim():t)},expression:"form.voteCount"}})],1),r("br"),e.publicKey?[r("el-form-item",[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" publicKey "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("nodesManage.helpTips.publicKey"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),e._v(" "+e._s(e.publicKey)+" ")]),r("br")]:e._e(),"detail"!==e.opType?r("el-form-item",{staticClass:"private-key",attrs:{prop:"privateKey"}},[r("span",{staticClass:"private-key__help",attrs:{slot:"label"},slot:"label"},[e._v(" privateKey "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("nodesManage.helpTips.privateKey"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})]),r("a",{staticClass:"key-tool",attrs:{href:"https://tronscan.org/#/tools/tron-convert-tool",target:"_blank"}},[e._v("Key 生成工具")])],1),r("el-input",{attrs:{tabindex:"28",type:"textarea",autosize:{minRows:2,maxRows:4},maxlength:1e3,disabled:e.isView,placeholder:e.$t("nodesManage.valid.inputPrivateKey")},model:{value:e.form.privateKey,callback:function(t){e.$set(e.form,"privateKey","string"===typeof t?t.trim():t)},expression:"form.privateKey"}})],1):e._e()]:e._e()],2)]),r("div",{staticClass:"page-footer align-right"},[r("el-button",{staticClass:"im-button large",on:{click:e.handleCancel}},[e._v(e._s(e.$t("detail"!==e.opType?"base.cancel":"base.return")))]),"detail"!==e.opType?r("el-button",{staticClass:"im-button large",attrs:{type:"primary",loading:e.loading},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.complete")))]):e._e()],1)],1)},s=[],o=(r("a4d3"),r("cb29"),r("4de4"),r("a15b"),r("fb6a"),r("e439"),r("dbb4"),r("b64b"),r("d3b7"),r("159b"),r("ade3")),i=(r("96cf"),r("1da1")),n=r("61f7");function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){Object(o["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var p={name:"node-edit",data:function(){return{form:{serviceType:"remote",ip:"",port:"",userName:"",sshPassword:"",sshPort:22,isSR:!0,needSyncCheck:!1,url:"http://",voteCount:"",privateKey:""},safePrivateKey:Array(64).fill("*").join(""),publicKey:"",nodeInfo:{},loading:!1}},computed:{opType:function(){return this.$route.params.type},isView:function(){return"detail"===this.opType},opNodeId:function(){return this.$route.params.id},formRules:function(){var e=this,t=function(t,r,a){Object(n["c"])(r)?a():a(new Error(e.$t("nodesManage.valid.positiveInteger")))},r=function(t,r,a){Object(n["b"])(r)?a():a(new Error(e.$t("nodesManage.valid.gteZeroInt")))},a=function(t,r,a){Object(n["a"])(r)?a():a(new Error(e.$t("nodesManage.valid.rightIP")))},s=function(t,r,a){"127.0.0.1"===r?a(new Error(e.$t("nodesManage.valid.disabledLocalIP"))):a()},o=function(t,r,a){r>65535?a(new Error(e.$t("nodesManage.valid.maxPortValue"))):a()},i=function(t,r,a){64!==r.length?a(new Error(e.$t("nodesManage.valid.inputPrivateKey"))):a()};return{ip:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:a,trigger:"blur"},{required:!0,validator:s,trigger:"blur"}],port:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:t,trigger:"blur"},{required:!0,validator:o,trigger:"blur"}],userName:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],sshPassword:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],sshPort:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],url:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],voteCount:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:r,trigger:"blur"}],privateKey:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:i,trigger:"blur"}]}}},watch:{opNodeId:{handler:"getNodeInfo",immediate:!0}},methods:{getNodeInfo:function(){var e=this;"add"!==this.opType&&this.opNodeId&&this.$_api.nodesManage.getNodeInfo({id:this.opNodeId},(function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t||(e.nodeInfo=r,e.initForm())}))},initForm:function(){var e=this.nodeInfo;this.form={serviceType:e.serviceType||"remote",ip:e.ip||"",port:e.port||"",userName:e.userName||"",sshPassword:e.sshPassword||"",sshPort:e.sshPort||22,isSR:void 0===e.isSR||Boolean(e.isSR),needSyncCheck:void 0!==e.needSyncCheck&&e.needSyncCheck,url:JSON.stringify(e.url).slice(3).slice(0,-3)||"http://",voteCount:e.voteCount||"",privateKey:e.publicKey?this.safePrivateKey:""},this.publicKey=e.publicKey},handleSubmit:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.$refs["im-form"].validate(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(r){var a,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=10;break}return a={},t.loading=!0,e.next=5,t.initParams(a);case 5:if(e.sent){e.next=7;break}return e.abrupt("return");case 7:s="add"===t.opType?"addNoteInfo":"editNoteInfo",o="add"===t.opType?"nodesManage.addNodeSuccess":"nodesManage.updateNodeSuccess",t.$_api.nodesManage[s](a,(function(e){t.loading=!1,e||(t.$notify({type:"success",title:t.$t("base.successful"),message:t.$t(o)}),t.$router.push({path:"/nodes-manage"}))}));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),initParams:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var r,a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r={id:"edit"===this.opType&&this.opNodeId?this.opNodeId:void 0,serviceType:this.form.serviceType,ip:this.form.ip,port:this.form.port,isSR:this.form.isSR},a={userName:this.form.userName,sshPassword:this.form.sshPassword,sshPort:this.form.sshPort},s={needSyncCheck:this.form.needSyncCheck,url:'"'.concat(this.form.url,'"'),voteCount:this.form.voteCount,privateKey:this.form.privateKey},s.privateKey===this.safePrivateKey&&delete s.privateKey,e.t0=s.voteCount,!e.t0){e.next=9;break}return e.next=8,this.checkBalance(t.voteCount);case 8:e.t0=!e.sent;case 9:if(!e.t0){e.next=12;break}return this.loading=!1,e.abrupt("return",!1);case 12:return Object.assign(t,c({},r,{},"remote"===r.serviceType&&a,{},r.isSR&&s)),e.abrupt("return",!0);case 14:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),checkBalance:function(e){var t=this;return new Promise((function(r){t.$_api.configuration.checkBalance({balance:e},(function(e,a){if(e)return r(!0);a.result?r(!0):(t.$message.error(t.$t("nodesManage.valid.maxVoteCountValue")),r(!1))}))}))},handleCancel:function(){this.$router.push({path:"/nodes-manage"})}}},u=p,d=(r("73e5"),r("2877")),f=Object(d["a"])(u,a,s,!1,null,"c7e40b52",null);t["default"]=f.exports},a15b:function(e,t,r){"use strict";var a=r("23e7"),s=r("44ad"),o=r("fc6a"),i=r("b301"),n=[].join,l=s!=Object,c=i("join",",");a({target:"Array",proto:!0,forced:l||c},{join:function(e){return n.call(o(this),void 0===e?",":e)}})},cb29:function(e,t,r){var a=r("23e7"),s=r("81d5"),o=r("44d2");a({target:"Array",proto:!0},{fill:s}),o("fill")},e070:function(e,t,r){var a=r("d039"),s=r("5899"),o="​᠎";e.exports=function(e){return a((function(){return!!s[e]()||o[e]()!=o||s[e].name!==e}))}},fb6a:function(e,t,r){"use strict";var a=r("23e7"),s=r("861d"),o=r("e8b5"),i=r("23cb"),n=r("50c4"),l=r("fc6a"),c=r("8418"),p=r("1dde"),u=r("b622"),d=u("species"),f=[].slice,m=Math.max;a({target:"Array",proto:!0,forced:!p("slice")},{slice:function(e,t){var r,a,p,u=l(this),b=n(u.length),h=i(e,b),v=i(void 0===t?b:t,b);if(o(u)&&(r=u.constructor,"function"!=typeof r||r!==Array&&!o(r.prototype)?s(r)&&(r=r[d],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return f.call(u,h,v);for(a=new(void 0===r?Array:r)(m(v-h,0)),p=0;h<v;h++,p++)h in u&&c(a,p,u[h]);return a.length=p,a}})}}]);
//# sourceMappingURL=chunk-4772e8a4.0d54798b.js.map