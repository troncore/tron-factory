(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15329b4d"],{"61f7":function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function r(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}i.d(t,"a",(function(){return u}));var o=function(){function e(){a(this,e)}return r(e,[{key:"isNumber",value:function(e){return/^\d+(\.\d+)?$/.test(e)}},{key:"isInteger",value:function(e){return/^\d+$/.test(e)}},{key:"isTwoDecimal",value:function(e){return/^([1-9]\d*|0)(\.\d{1,2})$/.test(e)}},{key:"isIP",value:function(e){return/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(e)}}]),e}(),s=new o,l=function(){function e(){a(this,e)}return r(e,[{key:"validIP",value:function(e){return function(t,i,a){var n=!1;s.isIP(i)||(n=!0),n?a(new Error(e)):a()}}},{key:"numEqual",value:function(e,t){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(a,n,r){var o=!1;s.isNumber(n)?n==e?o=!0:i||n==e||(o=!0):o=!0,o?r(new Error(t)):r()}}},{key:"numMin",value:function(e,t){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(n,r,o){var l=!1;s.isNumber(r)?a&&!s.isInteger(r)?l=!0:r<e?l=!0:i||r!=e||(l=!0):l=!0,l?o(new Error(t)):o()}}},{key:"numMax",value:function(e,t){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(n,r,o){var l=!1;s.isNumber(r)?a&&!s.isInteger(r)?l=!0:r>e?l=!0:i||r!=e||(l=!0):l=!0,l?o(new Error(t)):o()}}},{key:"numTwoDecimal",value:function(e){return function(t,i,a){var n=!1;s.isTwoDecimal(i)||(n=!0),n?a(new Error(e)):a()}}}]),e}(),u=new l},e140:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"box-view base-config"},[i("div",{staticClass:"box-body"},[i("el-form",{ref:"form",staticClass:"im-form",attrs:{model:e.form,rules:e.formRules}},[i("el-form-item",{attrs:{prop:"maintenanceTimeInterval"}},[i("span",{attrs:{slot:"label"},slot:"label"},[e._v("maintenanceTimeInterval "),i("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("nodeConfig.helpTips.maintenanceTimeInterval"))+": ms)")])]),i("el-input",{attrs:{type:"number",min:"0",max:"2147483647",clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.maintenanceTimeInterval,callback:function(t){e.$set(e.form,"maintenanceTimeInterval","string"===typeof t?t.trim():t)},expression:"form.maintenanceTimeInterval"}})],1),i("div",{staticClass:"more-form"},[i("el-button",{attrs:{type:"text"},on:{click:function(t){e.showMore=!e.showMore}}},[i("i",{staticClass:"el-icon-arrow-right"}),e._v(e._s(e.$t("nodeConfig.moreSetting")))])],1),i("el-collapse-transition",[e.showMore?i("div",[i("el-form-item",{attrs:{prop:"proposalExpireTime"}},[i("span",{attrs:{slot:"label"},slot:"label"},[e._v("proposalExpireTime "),i("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("nodeConfig.helpTips.blockProposalExpireTime"))+": ms)")])]),i("el-input",{attrs:{type:"number",min:"0",max:"2147483647",clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.proposalExpireTime,callback:function(t){e.$set(e.form,"proposalExpireTime","string"===typeof t?t.trim():t)},expression:"form.proposalExpireTime"}})],1),i("el-form-item",{attrs:{prop:"blockProducedTimeOut"}},[i("span",{attrs:{slot:"label"},slot:"label"},[e._v("producedTimeOut "),i("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("nodeConfig.helpTips.nodeBlockProducedTimeOut"))+": 0 - 100)")])]),i("el-input",{attrs:{type:"number",min:"0",max:"100",clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.blockProducedTimeOut,callback:function(t){e.$set(e.form,"blockProducedTimeOut","string"===typeof t?t.trim():t)},expression:"form.blockProducedTimeOut"}})],1),i("el-form-item",{staticClass:"margin-bottom-0",attrs:{prop:"minParticipationRate"}},[i("span",{attrs:{slot:"label"},slot:"label"},[e._v("minParticipationRate "),i("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("nodeConfig.helpTips.nodeMinParticipationRate"))+": 0 - 100)")])]),i("el-input",{attrs:{type:"number",min:"0",max:"100",clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.minParticipationRate,callback:function(t){e.$set(e.form,"minParticipationRate","string"===typeof t?t.trim():t)},expression:"form.minParticipationRate"}})],1)],1):e._e()])],1)],1),i("div",{staticClass:"box-footer"},[i("el-button",{staticClass:"im-button large",attrs:{loading:e.loading,disabled:e.disabled,type:"primary"},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.nextStep")))]),i("el-button",{staticClass:"im-button large",on:{click:e.handleCancel}},[e._v(e._s(e.$t("base.prevStep")))])],1)])},n=[],r=(i("a9e3"),i("61f7")),o={name:"base-config",data:function(){return{form:{id:"",maintenanceTimeInterval:"",proposalExpireTime:"",blockProducedTimeOut:"",minParticipationRate:""},showMore:!1,disabled:!1,loading:!1}},computed:{opNodeId:function(){var e=this.$route.query.id;return/\d+/.test(e)?Number(e):void 0},formRules:function(){return{maintenanceTimeInterval:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:r["a"].numMin(0,this.$t("base.valid.gtZeroInt"),!1),trigger:"blur"},{validator:r["a"].numMax(2147483647,this.$t("base.valid.maxNumberValue")+": 2147483647"),trigger:"blur"}],proposalExpireTime:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:r["a"].numMin(0,this.$t("base.valid.gteZeroInt"),!1),trigger:"blur"},{validator:r["a"].numMax(2147483647,this.$t("base.valid.maxNumberValue")+": 2147483647"),trigger:"blur"}],blockProducedTimeOut:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:r["a"].numMin(0,this.$t("base.valid.gtZeroInt"),!1),trigger:"blur"},{validator:r["a"].numMax(100,this.$t("base.valid.maxNumberValue")+": 100"),trigger:"blur"}],minParticipationRate:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:r["a"].numMin(0,this.$t("base.valid.gteZeroInt")),trigger:"blur"},{validator:r["a"].numMax(100,this.$t("base.valid.maxNumberValue")+": 100"),trigger:"blur"}]}}},created:function(){this.getConfig()},methods:{getConfig:function(){var e=this;this.validNode()&&(this.disabled=!0,this.$_api.getStarted.getBaseConfig({id:this.opNodeId},(function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t||(e.disabled=!1,e.initForm(i))})))},initForm:function(e){this.form={id:this.opNodeId,maintenanceTimeInterval:e.block_maintenanceTimeInterval,proposalExpireTime:e.block_proposalExpireTime,blockProducedTimeOut:e.node_blockProducedTimeOut,minParticipationRate:e.node_minParticipationRate}},handleSubmit:function(){var e=this;this.$refs["form"].validate((function(t){if(t){var i={id:e.opNodeId,blockProducedTimeOut:Number(e.form.blockProducedTimeOut),maintenanceTimeInterval:Number(e.form.maintenanceTimeInterval),proposalExpireTime:Number(e.form.proposalExpireTime),minParticipationRate:Number(e.form.minParticipationRate)};e.loading=!0,e.$_api.getStarted.setBaseConfig(i,(function(t){e.loading=!1,t||(e.$notify.success({title:e.$t("base.successful"),message:e.$t("nodeConfig.baseSaveSuccess")}),e.$emit("next-step"))}))}}))},validNode:function(){return!!/\d+/.test(this.opNodeId)||(this.$notify.warning({title:this.$t("base.warning"),message:this.$t("nodeConfig.opUnValidNode")}),!1)},handleCancel:function(){this.$emit("prev-step")}}},s=o,l=i("2877"),u=Object(l["a"])(s,a,n,!1,null,"f9ef9be4",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-15329b4d.58e92961.js.map