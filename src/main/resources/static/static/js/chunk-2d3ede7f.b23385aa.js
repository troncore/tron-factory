(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d3ede7f"],{"055f":function(e,t,a){"use strict";var n=a("8320"),r=a.n(n);r.a},2176:function(e,t,a){"use strict";var n=a("bd51"),r=a.n(n);r.a},"61f7":function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e,t,a){return t&&r(e.prototype,t),a&&r(e,a),e}a.d(t,"a",(function(){return c}));var i=function(){function e(){n(this,e)}return s(e,[{key:"isNumber",value:function(e){return/^\d+(\.\d+)?$/.test(e)}},{key:"isInteger",value:function(e){return/^\d+$/.test(e)}},{key:"isTwoDecimal",value:function(e){return/^([1-9]\d*|0)(\.\d{1,2})$/.test(e)}},{key:"isIP",value:function(e){return/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(e)}}]),e}(),o=new i,l=function(){function e(){n(this,e)}return s(e,[{key:"validIP",value:function(e){return function(t,a,n){var r=!1;o.isIP(a)||(r=!0),r?n(new Error(e)):n()}}},{key:"numEqual",value:function(e,t){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(n,r,s){var i=!1;o.isNumber(r)?r==e?i=!0:a||r==e||(i=!0):i=!0,i?s(new Error(t)):s()}}},{key:"numMin",value:function(e,t){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(r,s,i){var l=!1;o.isNumber(s)?n&&!o.isInteger(s)?l=!0:s<e?l=!0:a||s!=e||(l=!0):l=!0,l?i(new Error(t)):i()}}},{key:"numMax",value:function(e,t){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(r,s,i){var l=!1;o.isNumber(s)?n&&!o.isInteger(s)?l=!0:s>e?l=!0:a||s!=e||(l=!0):l=!0,l?i(new Error(t)):i()}}},{key:"numTwoDecimal",value:function(e){return function(t,a,n){var r=!1;o.isTwoDecimal(a)||(r=!0),r?n(new Error(e)):n()}}}]),e}(),c=new l},"81d5":function(e,t,a){"use strict";var n=a("7b0b"),r=a("23cb"),s=a("50c4");e.exports=function(e){var t=n(this),a=s(t.length),i=arguments.length,o=r(i>1?arguments[1]:void 0,a),l=i>2?arguments[2]:void 0,c=void 0===l?a:r(l,a);while(c>o)t[o++]=e;return t}},8320:function(e,t,a){},"9b42":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"node-info"},[a("el-form",{ref:"im-form",attrs:{rules:e.formRules,model:e.form,size:"medium"}},[a("div",{staticClass:"im-card padding-20"},[a("div",{staticClass:"im-card__title"},[e._v(e._s(e.$t("nodesManage.nodeType")))]),a("el-form-item",{attrs:{prop:"isSR"}},[a("div",{staticClass:"radio-with-suffix"},[a("el-radio",{attrs:{label:!0,disabled:e.isView},model:{value:e.form.isSR,callback:function(t){e.$set(e.form,"isSR",t)},expression:"form.isSR"}},[e._v(e._s(e.$t("nodesManage.superNode")))]),a("im-tooltip",{attrs:{content:e.$t("nodesManage.helpTips.superNode")}})],1),a("div",{staticClass:"radio-with-suffix"},[a("el-radio",{attrs:{label:!1,disabled:e.isView},model:{value:e.form.isSR,callback:function(t){e.$set(e.form,"isSR",t)},expression:"form.isSR"}},[e._v(e._s(e.$t("nodesManage.fullNode")))]),a("im-tooltip",{attrs:{content:e.$t("nodesManage.helpTips.fullNode")}})],1)]),e.form.isSR?a("div",[a("el-form-item",{attrs:{prop:"needSyncCheck","label-width":"140px"}},[a("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.syncCheck"))+" "),a("im-tooltip",{attrs:{content:e.$t("nodesManage.helpTips.needSyncCheck")}})],1),a("el-switch",{attrs:{disabled:e.isView},model:{value:e.form.needSyncCheck,callback:function(t){e.$set(e.form,"needSyncCheck",t)},expression:"form.needSyncCheck"}})],1),a("br"),a("el-form-item",{attrs:{prop:"url","label-width":"140px"}},[a("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v("URL "),a("im-tooltip",{attrs:{content:e.$t("nodesManage.helpTips.url")}})],1),a("el-input",{attrs:{tabindex:"21",disabled:e.isView,clearable:"",placeholder:e.$t("nodesManage.valid.inputURL")},model:{value:e.form.url,callback:function(t){e.$set(e.form,"url","string"===typeof t?t.trim():t)},expression:"form.url"}})],1),a("br"),a("el-form-item",{attrs:{prop:"voteCount","label-width":"140px"}},[a("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v("voteCount "),a("im-tooltip",{attrs:{content:e.$t("nodesManage.helpTips.voteCount")}})],1),a("el-input",{attrs:{tabindex:"22",type:"number",min:"0",disabled:e.isView,clearable:"",placeholder:e.$t("nodesManage.valid.inputVoteCount")},model:{value:e.form.voteCount,callback:function(t){e.$set(e.form,"voteCount","string"===typeof t?t.trim():t)},expression:"form.voteCount"}})],1),a("br"),a("el-form-item",{staticClass:"address",attrs:{prop:"publicKey","label-width":"140px"}},[a("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v("address "),a("im-tooltip",{attrs:{content:e.$t("nodesManage.helpTips.publicKey")}})],1),a("el-input",{attrs:{tabindex:"23",disabled:e.isView,clearable:"",placeholder:e.$t("nodesManage.valid.publicKey")},model:{value:e.form.publicKey,callback:function(t){e.$set(e.form,"publicKey","string"===typeof t?t.trim():t)},expression:"form.publicKey"}})],1),a("br"),"detail"!==e.opType?a("el-form-item",{staticClass:"private-key",attrs:{prop:"privateKey","label-width":"140px"}},[a("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v("privateKey "),a("im-tooltip",{attrs:{content:e.$t("nodesManage.helpTips.privateKey")}})],1),a("el-input",{attrs:{tabindex:"24",type:"textarea",autosize:{minRows:2,maxRows:4},disabled:e.isView,placeholder:e.$t("nodesManage.valid.inputPrivateKey")},model:{value:e.form.privateKey,callback:function(t){e.$set(e.form,"privateKey","string"===typeof t?t.trim():t)},expression:"form.privateKey"}})],1):e._e()],1):e._e()],1),a("div",{staticClass:"im-card padding-20"},[a("div",{staticClass:"im-card__title"},[e._v(e._s(e.$t("nodesManage.nodeConfig")))]),a("el-form-item",{attrs:{prop:"ip","label-width":"140px"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.nodeIP")))]),a("el-input",{attrs:{tabindex:"25",disabled:e.isView,clearable:"",placeholder:e.$t("nodesManage.valid.rightIP")},model:{value:e.form.ip,callback:function(t){e.$set(e.form,"ip","string"===typeof t?t.trim():t)},expression:"form.ip"}})],1)],1),a("div",{staticClass:"im-card padding-20"},[a("div",{staticClass:"im-card__title"},[e._v(e._s(e.$t("nodesManage.SSH"))+" "),a("im-tooltip",{attrs:{content:e.$t("nodesManage.helpTips.SSH")}})],1),a("el-form-item",{attrs:{prop:"userName","label-width":"140px"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.sshUserName")))]),a("el-input",{attrs:{tabindex:"26",disabled:e.isView,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.userName,callback:function(t){e.$set(e.form,"userName","string"===typeof t?t.trim():t)},expression:"form.userName"}})],1),a("el-form-item",{staticClass:"ssh-port",attrs:{prop:"port","label-width":"100px"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.sshPort")))]),a("el-input",{attrs:{type:"number",min:"0",max:"65535",tabindex:"27",disabled:e.isView,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.port,callback:function(t){e.$set(e.form,"port","string"===typeof t?t.trim():t)},expression:"form.port"}})],1),a("br"),a("el-form-item",{attrs:{prop:"sshConnectType","label-width":"140px"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.sshConnectType")))]),a("el-radio",{attrs:{label:1,disabled:e.isView},model:{value:e.form.sshConnectType,callback:function(t){e.$set(e.form,"sshConnectType",t)},expression:"form.sshConnectType"}},[e._v(e._s(e.$t("nodesManage.passwordConnect")))]),a("el-radio",{attrs:{label:2,disabled:e.isView},model:{value:e.form.sshConnectType,callback:function(t){e.$set(e.form,"sshConnectType",t)},expression:"form.sshConnectType"}},[e._v(e._s(e.$t("nodesManage.keyConnect")))])],1),a("br"),1===e.form.sshConnectType?a("el-form-item",{staticClass:"ssh-password",attrs:{prop:"sshPassword","label-width":"140px"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("nodesManage.sshPassword")))]),a("el-input",{attrs:{tabindex:"28",disabled:e.isView,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.sshPassword,callback:function(t){e.$set(e.form,"sshPassword","string"===typeof t?t.trim():t)},expression:"form.sshPassword"}})],1):e._e()],1)]),a("div",{staticClass:"page-footer"},["detail"!==e.opType?a("el-button",{staticClass:"im-button large",attrs:{type:"primary",disabled:e.formLoading,loading:e.loading},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.complete")))]):e._e(),a("el-button",{staticClass:"im-button large",on:{click:e.handleCancel}},[e._v(e._s(e.$t("detail"!==e.opType?"base.cancel":"base.return")))])],1)],1)},r=[],s=(a("a4d3"),a("99af"),a("cb29"),a("4de4"),a("a15b"),a("fb6a"),a("e439"),a("dbb4"),a("b64b"),a("d3b7"),a("159b"),a("96cf"),a("1da1")),i=a("ade3"),o=a("2f62"),l=a("61f7"),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-tooltip",{attrs:{effect:"dark",placement:"top"}},[a("div",{attrs:{slot:"content"},domProps:{innerHTML:e._s(e.content)},slot:"content"}),a("i",{staticClass:"icon-question fa fa-question-circle-o",style:e.myStyle})])},d=[],u={name:"im-tooltip",props:{content:{},marginLeft:String,marginRight:String},computed:{myStyle:function(){var e={};return"undefined"!==typeof this.marginLeft&&(e.marginLeft=this.marginLeft),"undefined"!==typeof this.marginRight&&(e.marginRight=this.marginRight),e}}},p=u,f=(a("2176"),a("2877")),m=Object(f["a"])(p,c,d,!1,null,"5d886198",null),b=m.exports;function h(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function v(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?h(Object(a),!0).forEach((function(t){Object(i["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):h(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var g={name:"node-edit",components:{ImTooltip:b},data:function(){return{form:{ip:"",isSR:!0,needSyncCheck:!0,url:"http://",voteCount:"",publicKey:"",privateKey:"",userName:"",port:22,sshConnectType:1,sshPassword:""},tempIP:"",tempPublicKey:"",safePrivateKey:Array(64).fill("*").join(""),nodeInfo:{},loading:!1,formLoading:!0}},computed:v({},Object(o["c"])("app",["currentGitBranch"]),{disabledLocalIP:function(){return/(master|release)/.test(this.currentGitBranch)},opType:function(){return this.$route.params.type},isView:function(){return"detail"===this.opType},isEdit:function(){return"edit"===this.opType},opNodeId:function(){return this.$route.params.id},formRules:function(){var e=this,t=function(t,a,n){e.disabledLocalIP&&"127.0.0.1"===a?n(new Error(e.$t("nodesManage.valid.disabledLocalIP"))):n()},a=function(t,a,n){64!==a.length?n(new Error(e.$t("nodesManage.valid.inputPrivateKey"))):n()},n=[{validator:l["a"].numMin(0,this.$t("nodesManage.valid.gteZeroInt")),trigger:"blur"},{validator:l["a"].numMax(65535,this.$t("nodesManage.valid.maxPortValue")),trigger:"blur"}];return{ip:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:l["a"].validIP(this.$t("nodesManage.valid.rightIP")),trigger:"blur"},{required:!0,validator:t,trigger:"blur"}],port:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}].concat(n),userName:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],sshPassword:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],url:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],voteCount:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:l["a"].numMin(0,this.$t("nodesManage.valid.gteZeroInt")),trigger:"blur"}],publicKey:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],privateKey:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:a,trigger:"blur"}]}}}),watch:{opNodeId:{handler:"getNodeInfo",immediate:!0}},methods:{getNodeInfo:function(){var e=this;"add"!==this.opType&&this.opNodeId&&(this.form.isSR=!1,this.form.sshConnectType=2,this.formLoading=!0,this.$_api.nodesManage.getNodeInfo({id:this.opNodeId},(function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t||(e.formLoading=!1,e.nodeInfo=a,e.initForm())})))},initForm:function(){var e=this.nodeInfo;this.form={ip:e.ip||"",isSR:void 0===e.isSR||Boolean(e.isSR),needSyncCheck:void 0!==e.needSyncCheck&&e.needSyncCheck,url:JSON.stringify(e.url).slice(3).slice(0,-3)||"http://",voteCount:e.voteCount||"",publicKey:e.publicKey||"",privateKey:e.publicKey?this.safePrivateKey:"",userName:e.userName||"",port:e.port||22,sshConnectType:e.sshConnectType||1,sshPassword:e.sshPassword||""},this.tempPublicKey=e.publicKey},handleSubmit:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.$refs["im-form"].validate(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(a){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=8;break}return n={},t.loading=!0,e.next=5,t.initParams(n);case 5:if(e.sent){e.next=7;break}return e.abrupt("return");case 7:n.isSR&&(n.publicKey!==t.tempPublicKey||n.privateKey)?t.$confirm(t.$t("nodesManage.saveAddressPriKey"),t.$t("base.tips"),{cancelButtonText:t.$t("base.cancel"),confirmButtonText:t.$t("base.confirm"),center:!0,customClass:"im-message-box",cancelButtonClass:"im-message-cancel-button primary",confirmButtonClass:"im-message-confirm-button primary"}).then((function(){t.addNode(n)})).catch((function(){t.$notify.info({title:t.$t("base.cancel"),message:t.$t("base.cancel")}),t.loading=!1})):t.addNode(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),initParams:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a={id:"edit"===this.opType&&this.opNodeId?this.opNodeId:void 0,ip:this.form.ip,isSR:this.form.isSR,userName:this.form.userName,port:this.form.port,sshConnectType:this.form.sshConnectType,sshPassword:1===this.form.sshConnectType?this.form.sshPassword:void 0},n={needSyncCheck:this.form.needSyncCheck,url:'"'.concat(this.form.url,'"'),voteCount:this.form.voteCount,publicKey:this.form.publicKey,privateKey:this.form.privateKey!==this.safePrivateKey?this.form.privateKey:void 0},e.t0=n.voteCount,!e.t0){e.next=7;break}return e.next=6,this.checkBalance(t.voteCount);case 6:e.t0=!e.sent;case 7:if(!e.t0){e.next=10;break}return this.loading=!1,e.abrupt("return",!1);case 10:return Object.assign(t,v({},a,{},a.isSR&&n)),e.abrupt("return",!0);case 12:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),checkBalance:function(e){var t=this;return new Promise((function(a){t.$_api.configuration.checkBalance({balance:e},(function(e,n){if(e)return a(!0);n.result?a(!0):(t.$message.error(t.$t("nodesManage.valid.maxVoteCountValue")),a(!1))}))}))},addNode:function(e){var t=this,a="add"===this.opType?"addNoteInfo":"editNoteInfo",n="add"===this.opType?"nodesManage.addNodeSuccess":"nodesManage.updateNodeSuccess";this.$_api.nodesManage[a](e,(function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t.loading=!1,!e)if(a.status){var r="base.error";1===a.status?r="nodesManage.sshConnectFail":2===a.status&&(r="nodesManage.addressNotPrikey"),t.$notify.error({title:t.$t("base.error"),message:t.$t(r)})}else t.$notify({type:"success",title:t.$t("base.successful"),message:t.$t(n)}),t.$router.push({path:"/nodes-manage"})}))},handleCancel:function(){this.$router.push({path:"/nodes-manage"})}}},y=g,$=(a("055f"),Object(f["a"])(y,n,r,!1,null,"5bb69528",null));t["default"]=$.exports},a15b:function(e,t,a){"use strict";var n=a("23e7"),r=a("44ad"),s=a("fc6a"),i=a("b301"),o=[].join,l=r!=Object,c=i("join",",");n({target:"Array",proto:!0,forced:l||c},{join:function(e){return o.call(s(this),void 0===e?",":e)}})},bd51:function(e,t,a){},cb29:function(e,t,a){var n=a("23e7"),r=a("81d5"),s=a("44d2");n({target:"Array",proto:!0},{fill:r}),s("fill")},fb6a:function(e,t,a){"use strict";var n=a("23e7"),r=a("861d"),s=a("e8b5"),i=a("23cb"),o=a("50c4"),l=a("fc6a"),c=a("8418"),d=a("1dde"),u=a("b622"),p=u("species"),f=[].slice,m=Math.max;n({target:"Array",proto:!0,forced:!d("slice")},{slice:function(e,t){var a,n,d,u=l(this),b=o(u.length),h=i(e,b),v=i(void 0===t?b:t,b);if(s(u)&&(a=u.constructor,"function"!=typeof a||a!==Array&&!s(a.prototype)?r(a)&&(a=a[p],null===a&&(a=void 0)):a=void 0,a===Array||void 0===a))return f.call(u,h,v);for(n=new(void 0===a?Array:a)(m(v-h,0)),d=0;h<v;h++,d++)h in u&&c(n,d,u[h]);return n.length=d,n}})}}]);
//# sourceMappingURL=chunk-2d3ede7f.b23385aa.js.map