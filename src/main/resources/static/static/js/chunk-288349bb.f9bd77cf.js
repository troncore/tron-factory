(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-288349bb","chunk-0b37f638"],{"498a":function(e,t,r){"use strict";var o=r("23e7"),i=r("58a8").trim,n=r("e070");o({target:"String",proto:!0,forced:n("trim")},{trim:function(){return i(this)}})},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,r){var o=r("1d80"),i=r("5899"),n="["+i+"]",a=RegExp("^"+n+n+"*"),l=RegExp(n+n+"*$"),s=function(e){return function(t){var r=String(o(t));return 1&e&&(r=r.replace(a,"")),2&e&&(r=r.replace(l,"")),r}};e.exports={start:s(1),end:s(2),trim:s(3)}},"61f7":function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"d",(function(){return i})),r.d(t,"c",(function(){return n})),r.d(t,"e",(function(){return a})),r.d(t,"b",(function(){return l}));r("c975"),r("498a");function o(e){var t=/^(\-|\+)?\d+(0)?$/;return t.test(e)}function i(e){var t=/^[0-9]*[1-9][0-9]*$/;return t.test(e)}function n(e){var t=/^\d+$/;return t.test(e)}function a(e){var t=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;return t.test(e)}function l(e){var t=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;return t.test(e)}},"81d5":function(e,t,r){"use strict";var o=r("7b0b"),i=r("23cb"),n=r("50c4");e.exports=function(e){var t=o(this),r=n(t.length),a=arguments.length,l=i(a>1?arguments[1]:void 0,r),s=a>2?arguments[2]:void 0,c=void 0===s?r:i(s,r);while(c>l)t[l++]=e;return t}},a15b:function(e,t,r){"use strict";var o=r("23e7"),i=r("44ad"),n=r("fc6a"),a=r("b301"),l=[].join,s=i!=Object,c=a("join",",");o({target:"Array",proto:!0,forced:s||c},{join:function(e){return l.call(n(this),void 0===e?",":e)}})},b869:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{attrs:{visible:e.dialogVisible,"custom-class":"im-dialog","close-on-click-modal":!1,"close-on-press-escape":!1,width:"680px",center:""},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("div",{staticClass:"dialog-header",attrs:{slot:"title"},slot:"title"},[r("div",{staticClass:"title"},[e._v(e._s(e.dialogTitle))])]),r("div",{staticClass:"dialog-content"},[r("el-form",{ref:"dialog-form",staticClass:"dialog-form",attrs:{rules:e.formRules,model:e.form,"label-width":"150px","label-position":"right"}},[r("el-form-item",{attrs:{prop:"id"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v("ID "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("deploymentNodeIdTips"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronNodeIDPlaceholder"),disabled:!e.isAdding},model:{value:e.form.id,callback:function(t){e.$set(e.form,"id","string"===typeof t?t.trim():t)},expression:"form.id"}})],1),r("el-form-item",{attrs:{prop:"userName"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("tronNodeName"))+" "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("deploymentNodeUsernameTips"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronNodeNamePlaceholder")},model:{value:e.form.userName,callback:function(t){e.$set(e.form,"userName","string"===typeof t?t.trim():t)},expression:"form.userName"}})],1),r("el-form-item",{attrs:{prop:"ip"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" FullNode IP "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("deploymentNodeIpTips"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronNodeIpPlaceholder")},model:{value:e.form.ip,callback:function(t){e.$set(e.form,"ip","string"===typeof t?t.trim():t)},expression:"form.ip"}})],1),r("el-form-item",{attrs:{prop:"port"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" FullNode Port "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("deploymentNodePortTips"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{maxlength:50,placeholder:e.$t("tronNodePortPlaceholder")},model:{value:e.form.port,callback:function(t){e.$set(e.form,"port","string"===typeof t?t.trim():t)},expression:"form.port"}})],1),r("el-form-item",{attrs:{prop:"isSR"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" "+e._s(e.$t("tronNodeWhetherIsSR"))+" "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("deploymentNodeSrTips"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-switch",{model:{value:e.form.isSR,callback:function(t){e.$set(e.form,"isSR",t)},expression:"form.isSR"}})],1),r("el-collapse-transition",[e.form.isSR?r("div",[r("el-form-item",{attrs:{prop:"needSyncCheck"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" needSyncCheck "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("deploymentNodeSyncCheckTips"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-switch",{model:{value:e.form.needSyncCheck,callback:function(t){e.$set(e.form,"needSyncCheck",t)},expression:"form.needSyncCheck"}})],1),r("el-form-item",{attrs:{prop:"url"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" URL "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("deploymentNodeUrlTips"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{maxlength:100,placeholder:e.$t("tronNodeUrlPlaceholder")},model:{value:e.form.url,callback:function(t){e.$set(e.form,"url","string"===typeof t?t.trim():t)},expression:"form.url"}})],1),r("el-form-item",{attrs:{prop:"voteCount"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" voteCount "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("tronNodeVoteNumberTips"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{maxlength:20,placeholder:e.$t("tronNodeVoteNumberPlaceholder")},model:{value:e.form.voteCount,callback:function(t){e.$set(e.form,"voteCount","string"===typeof t?t.trim():t)},expression:"form.voteCount"}})],1),r("el-form-item",{attrs:{prop:"crypto"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" crypto "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("deploymentNodeCryptoTips"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-radio-group",{model:{value:e.form.crypto,callback:function(t){e.$set(e.form,"crypto",t)},expression:"form.crypto"}},[r("el-radio",{attrs:{label:"eckey"}},[e._v("eckey")]),r("el-radio",{attrs:{label:"sm2"}},[e._v("sm2")])],1)],1),e.isAdding?e._e():r("el-form-item",{staticClass:"publickey"},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" publicKey "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("deploymentNodePublickKeyTips"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),e._v(" "+e._s(e.form.publicKey)+" ")]),r("el-form-item",{attrs:{prop:"privateKey"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v(" privateKey "),r("el-tooltip",{attrs:{effect:"dark",content:e.$t("deploymentNodePrivateKeyTips"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{type:"textarea",maxlength:1e3,placeholder:e.$t("tronNodePrivateKeyPlaceholder")},model:{value:e.form.privateKey,callback:function(t){e.$set(e.form,"privateKey","string"===typeof t?t.trim():t)},expression:"form.privateKey"}})],1)],1):e._e()])],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.save")))]),r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v(e._s(e.$t("base.cancel")))])],1)])},i=[],n=(r("a4d3"),r("cb29"),r("4de4"),r("c740"),r("a15b"),r("e439"),r("dbb4"),r("b64b"),r("d3b7"),r("159b"),r("96cf"),r("1da1")),a=r("ade3"),l=r("61f7");function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){Object(a["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d={name:"operationNode",props:["visible","isAdding","nodeDetail","nodeList"],data:function(){return{form:{id:"",userName:"",ip:"",port:"",isSR:!1,needSyncCheck:!1},dialogTitle:this.$t("tronNodeAdd"),loading:!1}},computed:{dialogVisible:{get:function(){return this.visible},set:function(e){this.$emit("update:visible",e)}},formRules:function(){var e=this,t=function(t,r,o){Object(l["d"])(r)?o():o(new Error(e.$t("tronSettingNumberPlaceholder")))},r=function(t,r,o){Object(l["c"])(r)?o():o(new Error(e.$t("tronSettingNumberZeroPlaceholder")))},o=function(t,r,o){Object(l["b"])(r)?o():o(new Error(e.$t("tronNodeIpValidate")))},i=function(t,r,o){"127.0.0.1"==r?o(new Error(e.$t("tronNodeIpLocalValidate"))):o()},n=function(t,r,o){r>2147483647?o(new Error(e.$t("tronNumberPlaceholder"))):o()},a=function(t,r,o){r>65535?o(new Error(e.$t("tronPortNumberPlaceholder"))):o()},s=function(t,r,o){64!==r.length?o(new Error(e.$t("tronNodeCorrectPrivateKeyPlaceholder"))):o()};return{id:[{required:!0,message:this.$t("tronNodeIDPlaceholder"),trigger:"blur"},{required:!0,validator:t,trigger:"blur"},{required:!0,validator:n,trigger:"blur"}],userName:[{required:!0,message:this.$t("tronNodeNamePlaceholder"),trigger:"blur"}],ip:[{required:!0,message:this.$t("tronNodeIpPlaceholder"),trigger:"blur"},{required:!0,validator:o,trigger:"blur"},{required:!0,validator:i,trigger:"blur"}],port:[{required:!0,message:this.$t("tronNodePortPlaceholder"),trigger:"blur"},{required:!0,validator:t,trigger:"blur"},{required:!0,validator:a,trigger:"blur"}],isSR:[{required:!0,message:this.$t("tronNodeSRPlaceholder"),trigger:"blur"}],needSyncCheck:[{required:!0,message:this.$t("tronNodeSyncCheckPlaceholder"),trigger:"change"}],url:[{required:!0,message:this.$t("tronNodeUrlPlaceholder"),trigger:"blur"}],voteCount:[{required:!0,message:this.$t("tronNodeVoteNumberTips"),trigger:"blur"},{required:!0,validator:r,trigger:"blur"}],crypto:[{required:!0,message:this.$t("base.form.pleaseSelect"),trigger:"blur"}],privateKey:[{required:!0,message:this.$t("tronNodePrivateKeyPlaceholder"),trigger:"blur"},{required:!0,validator:s,trigger:"blur"}]}}},watch:{isAdding:{handler:function(e){this.dialogTitle=e?this.$t("tronNodeAdd"):this.$t("tronNodeEditTitle")},immediate:!0}},created:function(){this.initForm()},methods:{initForm:function(){this.form=c({},this.form,{},this.nodeDetail)},handleSubmit:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.$refs["dialog-form"].validate(function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(r){var o,i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=10;break}return o={},t.saveLoading=!0,e.next=5,t.formatParams(o);case 5:if(e.sent){e.next=7;break}return e.abrupt("return");case 7:i=t.isAdding?"addNoteInfo":"editNoteInfo",n=t.isAdding?"tronNodeAddSuccess":"tronNodeEditSuccess",t.$_api.nodeList[i](o,(function(e){t.saveLoading=!1,e||(t.$emit("success",!0),t.$message.success(t.$t(n)),t.dialogVisible=!1)}));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),formatParams:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(Object.assign(t,c({},this.form,{url:'"'.concat(this.form.url,'"')})),r=this.isAdding&&~this.nodeList.findIndex((function(e){return e.ip===t.ip})),!r){e.next=6;break}return this.$message.warning(this.$t("tronNodesIpNoSame")),this.saveLoading=!1,e.abrupt("return",!1);case 6:return e.next=8,this.checkBalance(t.voteCount);case 8:if(e.sent){e.next=11;break}return this.saveLoading=!1,e.abrupt("return",!1);case 11:return t.privateKey===Array(64).fill("*").join("")&&delete t.privateKey,e.abrupt("return",!0);case 13:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),checkBalance:function(e){var t=this;return new Promise((function(r){t.$_api.configManage.checkBalance({balance:e},(function(e,o){if(e)return r(!1);o.result?r(!0):(t.$message.error(t.$t("tronNodevoteCountNumberMaxPlaceholder")),r(!1))}))}))}}},u=d,f=r("2877"),p=Object(f["a"])(u,o,i,!1,null,"255b450f",null);t["default"]=p.exports},c740:function(e,t,r){"use strict";var o=r("23e7"),i=r("b727").findIndex,n=r("44d2"),a="findIndex",l=!0;a in[]&&Array(1)[a]((function(){l=!1})),o({target:"Array",proto:!0,forced:l},{findIndex:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),n(a)},c975:function(e,t,r){"use strict";var o=r("23e7"),i=r("4d64").indexOf,n=r("b301"),a=[].indexOf,l=!!a&&1/[1].indexOf(1,-0)<0,s=n("indexOf");o({target:"Array",proto:!0,forced:l||s},{indexOf:function(e){return l?a.apply(this,arguments)||0:i(this,e,arguments.length>1?arguments[1]:void 0)}})},cb29:function(e,t,r){var o=r("23e7"),i=r("81d5"),n=r("44d2");o({target:"Array",proto:!0},{fill:i}),n("fill")},e070:function(e,t,r){var o=r("d039"),i=r("5899"),n="​᠎";e.exports=function(e){return o((function(){return!!i[e]()||n[e]()!=n||i[e].name!==e}))}}}]);
//# sourceMappingURL=chunk-288349bb.f9bd77cf.js.map