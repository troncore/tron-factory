(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7c12ad12"],{"498a":function(t,e,r){"use strict";var i=r("23e7"),n=r("58a8").trim,o=r("e070");i({target:"String",proto:!0,forced:o("trim")},{trim:function(){return n(this)}})},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,r){var i=r("1d80"),n=r("5899"),o="["+n+"]",a=RegExp("^"+o+o+"*"),s=RegExp(o+o+"*$"),l=function(t){return function(e){var r=String(i(e));return 1&t&&(r=r.replace(a,"")),2&t&&(r=r.replace(s,"")),r}};t.exports={start:l(1),end:l(2),trim:l(3)}},"61f7":function(t,e,r){"use strict";r.d(e,"c",(function(){return i})),r.d(e,"b",(function(){return n})),r.d(e,"d",(function(){return o})),r.d(e,"a",(function(){return a}));r("c975"),r("498a");function i(t){var e=/^[0-9]*[1-9][0-9]*$/;return e.test(t)}function n(t){var e=/^\d+$/;return e.test(t)}function o(t){var e=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;return e.test(t)}function a(t){var e=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;return e.test(t)}},"81d5":function(t,e,r){"use strict";var i=r("7b0b"),n=r("23cb"),o=r("50c4");t.exports=function(t){var e=i(this),r=o(e.length),a=arguments.length,s=n(a>1?arguments[1]:void 0,r),l=a>2?arguments[2]:void 0,c=void 0===l?r:n(l,r);while(c>s)e[s++]=t;return e}},a15b:function(t,e,r){"use strict";var i=r("23e7"),n=r("44ad"),o=r("fc6a"),a=r("b301"),s=[].join,l=n!=Object,c=a("join",",");i({target:"Array",proto:!0,forced:l||c},{join:function(t){return s.call(o(this),void 0===t?",":t)}})},b869:function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{attrs:{visible:t.dialogVisible,"custom-class":"im-dialog","close-on-click-modal":!1,"close-on-press-escape":!1,width:"680px",center:""},on:{"update:visible":function(e){t.dialogVisible=e}}},[r("div",{staticClass:"dialog-header",attrs:{slot:"title"},slot:"title"},[r("div",{staticClass:"title"},[t._v(t._s(t.dialogTitle))])]),r("div",{staticClass:"dialog-content"},[r("el-form",{ref:"dialog-form",staticClass:"dialog-form",attrs:{rules:t.formRules,model:t.form,"label-width":"150px","label-position":"right"}},[r("el-form-item",{attrs:{prop:"id"}},[r("span",{attrs:{slot:"label"},slot:"label"},[t._v("ID "),r("el-tooltip",{attrs:{effect:"dark",content:t.$t("nodeList.helpTips.id"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{type:"number",maxlength:50,placeholder:t.$t("nodeList.valid.positiveInteger"),disabled:!t.isAdding},model:{value:t.form.id,callback:function(e){t.$set(t.form,"id","string"===typeof e?e.trim():e)},expression:"form.id"}})],1),r("el-form-item",{attrs:{prop:"userName"}},[r("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(t.$t("nodeList.sshUserName"))+" "),r("el-tooltip",{attrs:{effect:"dark",content:t.$t("nodeList.helpTips.sshUserName"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{maxlength:50,placeholder:t.$t("base.pleaseInput")},model:{value:t.form.userName,callback:function(e){t.$set(t.form,"userName","string"===typeof e?e.trim():e)},expression:"form.userName"}})],1),r("el-form-item",{attrs:{prop:"ip"}},[r("span",{attrs:{slot:"label"},slot:"label"},[t._v(" FullNode IP "),r("el-tooltip",{attrs:{effect:"dark",content:t.$t("nodeList.helpTips.ip"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{maxlength:50,placeholder:t.$t("nodeList.valid.rightIP")},model:{value:t.form.ip,callback:function(e){t.$set(t.form,"ip","string"===typeof e?e.trim():e)},expression:"form.ip"}})],1),r("el-form-item",{attrs:{prop:"port"}},[r("span",{attrs:{slot:"label"},slot:"label"},[t._v(" FullNode Port "),r("el-tooltip",{attrs:{effect:"dark",content:t.$t("nodeList.helpTips.port"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{maxlength:50,placeholder:t.$t("nodeList.valid.maxPortValue")},model:{value:t.form.port,callback:function(e){t.$set(t.form,"port","string"===typeof e?e.trim():e)},expression:"form.port"}})],1),r("el-form-item",{attrs:{prop:"isSR"}},[r("span",{attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("nodeList.isSR"))+" "),r("el-tooltip",{attrs:{effect:"dark",content:t.$t("nodeList.helpTips.isSR"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-switch",{model:{value:t.form.isSR,callback:function(e){t.$set(t.form,"isSR",e)},expression:"form.isSR"}})],1),r("el-collapse-transition",[t.form.isSR?r("div",[r("el-form-item",{attrs:{prop:"needSyncCheck"}},[r("span",{attrs:{slot:"label"},slot:"label"},[t._v(" needSyncCheck "),r("el-tooltip",{attrs:{effect:"dark",content:t.$t("nodeList.helpTips.needSyncCheck"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-switch",{model:{value:t.form.needSyncCheck,callback:function(e){t.$set(t.form,"needSyncCheck",e)},expression:"form.needSyncCheck"}})],1),r("el-form-item",{attrs:{prop:"url"}},[r("span",{attrs:{slot:"label"},slot:"label"},[t._v(" URL "),r("el-tooltip",{attrs:{effect:"dark",content:t.$t("nodeList.helpTips.url"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{maxlength:100,placeholder:t.$t("nodeList.valid.inputURL")},model:{value:t.form.url,callback:function(e){t.$set(t.form,"url","string"===typeof e?e.trim():e)},expression:"form.url"}})],1),r("el-form-item",{attrs:{prop:"voteCount"}},[r("span",{attrs:{slot:"label"},slot:"label"},[t._v(" voteCount "),r("el-tooltip",{attrs:{effect:"dark",content:t.$t("nodeList.helpTips.voteCount"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{type:"number",maxlength:20,placeholder:t.$t("nodeList.valid.inputVoteCount")},model:{value:t.form.voteCount,callback:function(e){t.$set(t.form,"voteCount","string"===typeof e?e.trim():e)},expression:"form.voteCount"}})],1),t.isAdding?t._e():r("el-form-item",[r("span",{attrs:{slot:"label"},slot:"label"},[t._v(" publicKey "),r("el-tooltip",{attrs:{effect:"dark",content:t.$t("nodeList.helpTips.publicKey"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),t._v(" "+t._s(t.form.publicKey)+" ")]),r("el-form-item",{attrs:{prop:"privateKey"}},[r("span",{attrs:{slot:"label"},slot:"label"},[t._v(" privateKey "),r("el-tooltip",{attrs:{effect:"dark",content:t.$t("nodeList.helpTips.privateKey"),placement:"top"}},[r("i",{staticClass:"fa fa-question-circle-o"})])],1),r("el-input",{attrs:{type:"textarea",maxlength:1e3,placeholder:t.$t("nodeList.valid.inputPrivateKey")},model:{value:t.form.privateKey,callback:function(e){t.$set(t.form,"privateKey","string"===typeof e?e.trim():e)},expression:"form.privateKey"}})],1)],1):t._e()])],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary",loading:t.loading},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("base.save")))]),r("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v(t._s(t.$t("base.cancel")))])],1)])},n=[],o=(r("a4d3"),r("cb29"),r("4de4"),r("c740"),r("a15b"),r("e439"),r("dbb4"),r("b64b"),r("d3b7"),r("159b"),r("96cf"),r("1da1")),a=r("ade3"),s=r("61f7");function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function c(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){Object(a["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var u={name:"operationNode",props:["visible","isAdding","nodeDetail","nodeList"],data:function(){return{form:{id:"",userName:"",ip:"",port:"",isSR:!1,needSyncCheck:!1},dialogTitle:this.$t("nodeList.addNode"),loading:!1}},computed:{dialogVisible:{get:function(){return this.visible},set:function(t){this.$emit("update:visible",t)}},formRules:function(){var t=this,e=function(e,r,i){Object(s["c"])(r)?i():i(new Error(t.$t("nodeList.valid.positiveInteger")))},r=function(e,r,i){Object(s["b"])(r)?i():i(new Error(t.$t("nodeList.valid.gteZeroInt")))},i=function(e,r,i){Object(s["a"])(r)?i():i(new Error(t.$t("nodeList.valid.rightIP")))},n=function(e,r,i){"127.0.0.1"==r?i(new Error(t.$t("nodeList.valid.disabledLocalIP"))):i()},o=function(e,r,i){r>2147483647?i(new Error(t.$t("nodeList.valid.maxNumberValue"))):i()},a=function(e,r,i){r>65535?i(new Error(t.$t("nodeList.valid.maxPortValue"))):i()},l=function(e,r,i){64!==r.length?i(new Error(t.$t("nodeList.valid.inputPrivateKey"))):i()};return{id:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:e,trigger:"blur"},{required:!0,validator:o,trigger:"blur"}],userName:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],ip:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:i,trigger:"blur"},{required:!0,validator:n,trigger:"blur"}],port:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:e,trigger:"blur"},{required:!0,validator:a,trigger:"blur"}],url:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],voteCount:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:r,trigger:"blur"}],privateKey:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{required:!0,validator:l,trigger:"blur"}]}}},watch:{isAdding:{handler:function(t){this.dialogTitle=t?this.$t("nodeList.addNode"):this.$t("nodeList.updateNode")},immediate:!0}},created:function(){this.initForm()},methods:{initForm:function(){this.form=c({},this.form,{},this.nodeDetail)},handleSubmit:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.$refs["dialog-form"].validate(function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(r){var i,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!r){t.next=10;break}return i={},e.saveLoading=!0,t.next=5,e.formatParams(i);case 5:if(t.sent){t.next=7;break}return t.abrupt("return");case 7:n=e.isAdding?"addNoteInfo":"editNoteInfo",o=e.isAdding?"nodeList.addNodeSuccess":"nodeList.updateNodeSuccess",e.$_api.nodeList[n](i,(function(t){e.saveLoading=!1,t||(e.$emit("success",!0),e.$message.success(e.$t(o)),e.dialogVisible=!1)}));case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),formatParams:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(Object.assign(e,c({},this.form,{url:'"'.concat(this.form.url,'"')})),r=this.isAdding&&~this.nodeList.findIndex((function(t){return t.ip===e.ip})),!r){t.next=6;break}return this.$message.warning(this.$t("nodeList.valid.hasSameIP")),this.saveLoading=!1,t.abrupt("return",!1);case 6:return t.next=8,this.checkBalance(e.voteCount);case 8:if(t.sent){t.next=11;break}return this.saveLoading=!1,t.abrupt("return",!1);case 11:return e.privateKey===Array(64).fill("*").join("")&&delete e.privateKey,t.abrupt("return",!0);case 13:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),checkBalance:function(t){var e=this;return new Promise((function(r){e.$_api.configManage.checkBalance({balance:t},(function(t,i){if(t)return r(!1);i.result?r(!0):(e.$message.error(e.$t("nodeList.valid.maxVoteCountValue")),r(!1))}))}))}}},d=u,p=r("2877"),f=Object(p["a"])(d,i,n,!1,null,"01c5f8be",null);e["default"]=f.exports},c740:function(t,e,r){"use strict";var i=r("23e7"),n=r("b727").findIndex,o=r("44d2"),a="findIndex",s=!0;a in[]&&Array(1)[a]((function(){s=!1})),i({target:"Array",proto:!0,forced:s},{findIndex:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),o(a)},c975:function(t,e,r){"use strict";var i=r("23e7"),n=r("4d64").indexOf,o=r("b301"),a=[].indexOf,s=!!a&&1/[1].indexOf(1,-0)<0,l=o("indexOf");i({target:"Array",proto:!0,forced:s||l},{indexOf:function(t){return s?a.apply(this,arguments)||0:n(this,t,arguments.length>1?arguments[1]:void 0)}})},cb29:function(t,e,r){var i=r("23e7"),n=r("81d5"),o=r("44d2");i({target:"Array",proto:!0},{fill:n}),o("fill")},e070:function(t,e,r){var i=r("d039"),n=r("5899"),o="​᠎";t.exports=function(t){return i((function(){return!!n[t]()||o[t]()!=o||n[t].name!==t}))}}}]);
//# sourceMappingURL=chunk-7c12ad12.08577156.js.map