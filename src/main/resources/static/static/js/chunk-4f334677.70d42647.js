(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f334677"],{"498a":function(e,t,r){"use strict";var i=r("23e7"),a=r("58a8").trim,n=r("e070");i({target:"String",proto:!0,forced:n("trim")},{trim:function(){return a(this)}})},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,r){var i=r("1d80"),a=r("5899"),n="["+a+"]",o=RegExp("^"+n+n+"*"),l=RegExp(n+n+"*$"),s=function(e){return function(t){var r=String(i(t));return 1&e&&(r=r.replace(o,"")),2&e&&(r=r.replace(l,"")),r}};e.exports={start:s(1),end:s(2),trim:s(3)}},"61f7":function(e,t,r){"use strict";r.d(t,"c",(function(){return i})),r.d(t,"b",(function(){return a})),r.d(t,"d",(function(){return n})),r.d(t,"a",(function(){return o}));r("c975"),r("498a");function i(e){var t=/^[0-9]*[1-9][0-9]*$/;return t.test(e)}function a(e){var t=/^\d+$/;return t.test(e)}function n(e){var t=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;return t.test(e)}function o(e){var t=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;return t.test(e)}},"9fe7":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"box-view base-config"},[r("div",{staticClass:"box-body"},[r("el-form",{ref:"base-config-form",attrs:{rules:e.baseRules,model:e.form}},[r("el-form-item",{attrs:{prop:"chainId"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v("chainId "),r("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.chainId"))+")")])]),r("el-input",{attrs:{type:"number",min:"0",max:"2147483647",maxlength:50,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.chainId,callback:function(t){e.$set(e.form,"chainId","string"===typeof t?t.trim():t)},expression:"form.chainId"}})],1),r("el-form-item",{attrs:{prop:"chainName"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v("chainName")]),r("el-input",{attrs:{maxlength:50,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.chainName,callback:function(t){e.$set(e.form,"chainName","string"===typeof t?t.trim():t)},expression:"form.chainName"}})],1),r("el-form-item",{attrs:{prop:"block_maintenanceTimeInterval"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v("maintenanceTimeInterval "),r("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.maintenanceTimeInterval"))+": ms)")])]),r("el-input",{attrs:{type:"number",min:"0",maxlength:50,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.block_maintenanceTimeInterval,callback:function(t){e.$set(e.form,"block_maintenanceTimeInterval","string"===typeof t?t.trim():t)},expression:"form.block_maintenanceTimeInterval"}})],1),r("div",{staticClass:"more-form"},[r("el-button",{attrs:{type:"text"},on:{click:function(t){e.showMore=!e.showMore}}},[r("i",{staticClass:"el-icon-arrow-right"}),e._v(" "+e._s(e.$t("configuration.moreSetting")))])],1),r("el-collapse-transition",[e.showMore?r("div",[r("el-form-item",{attrs:{prop:"block_proposalExpireTime"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v("proposalExpireTime "),r("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.blockProposalExpireTime"))+": ms)")])]),r("el-input",{attrs:{type:"number",min:"0",maxlength:50,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.block_proposalExpireTime,callback:function(t){e.$set(e.form,"block_proposalExpireTime","string"===typeof t?t.trim():t)},expression:"form.block_proposalExpireTime"}})],1),r("el-form-item",{attrs:{prop:"node_blockProducedTimeOut"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v("producedTimeOut "),r("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.nodeBlockProducedTimeOut"))+": 0 - 100%)")])]),r("el-input",{attrs:{type:"number",min:"0",max:"100",maxlength:50,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.node_blockProducedTimeOut,callback:function(t){e.$set(e.form,"node_blockProducedTimeOut","string"===typeof t?t.trim():t)},expression:"form.node_blockProducedTimeOut"}})],1),r("el-form-item",{attrs:{prop:"node_minParticipationRate"}},[r("span",{attrs:{slot:"label"},slot:"label"},[e._v("participationRate "),r("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.nodeMinParticipationRate"))+")")])]),r("el-input",{attrs:{maxlength:50,clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.node_minParticipationRate,callback:function(t){e.$set(e.form,"node_minParticipationRate","string"===typeof t?t.trim():t)},expression:"form.node_minParticipationRate"}})],1)],1):e._e()])],1)],1),r("div",{staticClass:"box-footer align-right"},[r("el-button",{staticClass:"im-button large",on:{click:e.handleCancel}},[e._v(e._s(e.$t("base.prevStep")))]),r("el-button",{staticClass:"im-button large",attrs:{loading:e.loading,type:"primary"},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.nextStep")))])],1)])},a=[],n=r("61f7"),o={name:"base-config",props:{initConfigInfo:{type:Function,required:!0}},data:function(){return{form:{},showMore:!1,loading:!1}},computed:{baseRules:function(){var e=this,t=function(t,r,i){Object(n["c"])(r)?i():i(new Error(e.$t("configuration.valid.gtZeroInt")))},r=function(t,r,i){Object(n["b"])(r)?i():i(new Error(e.$t("configuration.valid.gteZeroInt")))},i=function(t,r,i){r>2147483647?i(new Error(e.$t("configuration.valid.maxNumberValue"))):i()},a=function(t,r,i){r>100?i(new Error(e.$t("configuration.valid.maxNumberValue"))):i()};return{chainId:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:t,trigger:"blur"},{validator:i,trigger:"blur"}],chainName:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],block_proposalExpireTime:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:t,trigger:"blur"},{validator:i,trigger:"blur"}],block_maintenanceTimeInterval:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:t,trigger:"blur"},{validator:i,trigger:"blur"}],node_blockProducedTimeOut:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:t,trigger:"blur"},{validator:a,trigger:"blur"}],node_minParticipationRate:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:r,trigger:"blur"},{validator:i,trigger:"blur"}]}}},created:function(){this.getConfigInfo()},methods:{getConfigInfo:function(){var e=this;this.initConfigInfo().then((function(t){return e.form=t||{}}))},handleSubmit:function(){var e=this;this.$refs["base-config-form"].validate((function(t){if(t){var r={chainId:e.form.chainId,chainName:e.form.chainName,blockProducedTimeOut:e.form.node_blockProducedTimeOut,maintenanceTimeInterval:e.form.block_maintenanceTimeInterval,proposalExpireTime:e.form.block_proposalExpireTime,minParticipationRate:e.form.node_minParticipationRate};e.loading=!0,e.$_api.configuration.baseSettingConfig(r,(function(t){e.loading=!1,t||(e.$notify({type:"success",title:e.$t("base.successful"),message:e.$t("configuration.baseSaveSuccess")}),e.$emit("next-step"))}))}}))},handleCancel:function(){this.$emit("prev-step")}}},l=o,s=r("2877"),c=Object(s["a"])(l,i,a,!1,null,"300c58ec",null);t["default"]=c.exports},e070:function(e,t,r){var i=r("d039"),a=r("5899"),n="​᠎";e.exports=function(e){return i((function(){return!!a[e]()||n[e]()!=n||a[e].name!==e}))}}}]);
//# sourceMappingURL=chunk-4f334677.70d42647.js.map