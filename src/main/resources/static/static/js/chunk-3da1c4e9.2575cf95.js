(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3da1c4e9"],{"61f7":function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(e,t,i){return t&&a(e.prototype,t),i&&a(e,i),e}i.d(t,"a",(function(){return u}));var o=function(){function e(){n(this,e)}return r(e,[{key:"isNumber",value:function(e){return/^\d+(\.\d+)?$/.test(e)}},{key:"isInteger",value:function(e){return/^\d+$/.test(e)}},{key:"isTwoDecimal",value:function(e){return/^([1-9]\d*|0)(\.\d{1,2})$/.test(e)}},{key:"isIP",value:function(e){return/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(e)}}]),e}(),l=new o,s=function(){function e(){n(this,e)}return r(e,[{key:"validIP",value:function(e){return function(t,i,n){var a=!1;l.isIP(i)||(a=!0),a?n(new Error(e)):n()}}},{key:"numEqual",value:function(e,t){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(n,a,r){var o=!1;l.isNumber(a)?a==e?o=!0:i||a==e||(o=!0):o=!0,o?r(new Error(t)):r()}}},{key:"numMin",value:function(e,t){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(a,r,o){var s=!1;l.isNumber(r)?n&&!l.isInteger(r)?s=!0:r<e?s=!0:i||r!=e||(s=!0):s=!0,s?o(new Error(t)):o()}}},{key:"numMax",value:function(e,t){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(a,r,o){var s=!1;l.isNumber(r)?n&&!l.isInteger(r)?s=!0:r>e?s=!0:i||r!=e||(s=!0):s=!0,s?o(new Error(t)):o()}}},{key:"numTwoDecimal",value:function(e){return function(t,i,n){var a=!1;l.isTwoDecimal(i)||(a=!0),a?n(new Error(e)):n()}}}]),e}(),u=new s},ea4d:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"box-view base-config"},[i("div",{staticClass:"box-body"},[i("el-form",{ref:"base-config-form",staticClass:"im-form",attrs:{model:e.form,rules:e.formRules}},[i("el-form-item",{attrs:{prop:"block_maintenanceTimeInterval"}},[i("span",{attrs:{slot:"label"},slot:"label"},[e._v("maintenanceTimeInterval "),i("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.maintenanceTimeInterval"))+": ms)")])]),i("el-input",{attrs:{type:"number",min:"0",max:"2147483647",clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.block_maintenanceTimeInterval,callback:function(t){e.$set(e.form,"block_maintenanceTimeInterval","string"===typeof t?t.trim():t)},expression:"form.block_maintenanceTimeInterval"}})],1),i("el-form-item",{attrs:{prop:"block_proposalExpireTime"}},[i("span",{attrs:{slot:"label"},slot:"label"},[e._v("proposalExpireTime "),i("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.blockProposalExpireTime"))+": ms)")])]),i("el-input",{attrs:{type:"number",min:"0",max:"2147483647",clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.block_proposalExpireTime,callback:function(t){e.$set(e.form,"block_proposalExpireTime","string"===typeof t?t.trim():t)},expression:"form.block_proposalExpireTime"}})],1),i("el-form-item",{attrs:{prop:"node_blockProducedTimeOut"}},[i("span",{attrs:{slot:"label"},slot:"label"},[e._v("producedTimeOut "),i("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.nodeBlockProducedTimeOut"))+": 0 - 100)")])]),i("el-input",{attrs:{type:"number",min:"0",max:"100",clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.node_blockProducedTimeOut,callback:function(t){e.$set(e.form,"node_blockProducedTimeOut","string"===typeof t?t.trim():t)},expression:"form.node_blockProducedTimeOut"}})],1),i("el-form-item",{attrs:{prop:"node_minParticipationRate"}},[i("span",{attrs:{slot:"label"},slot:"label"},[e._v("participationRate "),i("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.nodeMinParticipationRate"))+": 0 - 100)")])]),i("el-input",{attrs:{type:"number",min:"0",max:"100",clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.node_minParticipationRate,callback:function(t){e.$set(e.form,"node_minParticipationRate","string"===typeof t?t.trim():t)},expression:"form.node_minParticipationRate"}})],1)],1)],1),i("div",{staticClass:"box-footer align-right"},[i("el-button",{staticClass:"im-button large",on:{click:e.handleCancel}},[e._v(e._s(e.$t("base.prevStep")))]),i("el-button",{staticClass:"im-button large",attrs:{loading:e.loading,disabled:e.configLoading,type:"primary"},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.nextStep")))])],1)])},a=[],r=i("61f7"),o={name:"base-config",props:{initConfigInfo:{type:Function,required:!0},configLoading:Boolean},data:function(){return{form:{},showMore:!1,loading:!1}},computed:{formRules:function(){return{block_maintenanceTimeInterval:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:r["a"].numMin(0,this.$t("configuration.valid.gtZeroInt"),!1),trigger:"blur"},{validator:r["a"].numMax(2147483647,this.$t("configuration.valid.maxNumberValue")+": 2147483647"),trigger:"blur"}],block_proposalExpireTime:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:r["a"].numMin(0,this.$t("configuration.valid.gtZeroInt"),!1),trigger:"blur"},{validator:r["a"].numMax(2147483647,this.$t("configuration.valid.maxNumberValue")+": 2147483647"),trigger:"blur"}],node_blockProducedTimeOut:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:r["a"].numMin(0,this.$t("configuration.valid.gteZeroInt")),trigger:"blur"},{validator:r["a"].numMax(100,this.$t("configuration.valid.maxNumberValue")+": 100"),trigger:"blur"}],node_minParticipationRate:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:r["a"].numMin(0,this.$t("configuration.valid.gteZeroInt")),trigger:"blur"},{validator:r["a"].numMax(100,this.$t("configuration.valid.maxNumberValue")+": 100"),trigger:"blur"}]}}},created:function(){this.getConfigInfo()},methods:{getConfigInfo:function(){var e=this;this.initConfigInfo().then((function(t){return e.form=t||{}}))},handleSubmit:function(){var e=this;this.$refs["base-config-form"].validate((function(t){if(t){var i={blockProducedTimeOut:e.form.node_blockProducedTimeOut,maintenanceTimeInterval:e.form.block_maintenanceTimeInterval,proposalExpireTime:e.form.block_proposalExpireTime,minParticipationRate:e.form.node_minParticipationRate};e.loading=!0,e.$_api.configuration.baseSettingConfig(i,(function(t){e.loading=!1,t||(e.$notify({type:"success",title:e.$t("base.successful"),message:e.$t("configuration.baseSaveSuccess")}),e.$emit("next-step"))}))}}))},handleCancel:function(){this.$emit("prev-step")}}},l=o,s=i("2877"),u=Object(s["a"])(l,n,a,!1,null,"5b9b3554",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-3da1c4e9.2575cf95.js.map