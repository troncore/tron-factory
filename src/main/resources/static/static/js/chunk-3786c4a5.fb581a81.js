(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3786c4a5","chunk-2d0af279"],{"0cb2":function(t){t.exports=JSON.parse('[{"label":"AccountPermissionUpdate","value":"AccountPermissionUpdateActuator"},{"label":"AssetIssue","value":"AssetIssueActuator"},{"label":"ClearABIContract","value":"ClearABIContractActuator"},{"label":"CreateAccount","value":"CreateAccountActuator"},{"label":"ExchangeCreate","value":"ExchangeCreateActuator"},{"label":"ExchangeInject","value":"ExchangeInjectActuator"},{"label":"ExchangeTransaction","value":"ExchangeTransactionActuator"},{"label":"ExchangeWithdraw","value":"ExchangeWithdrawActuator"},{"label":"FreezeBalance","value":"FreezeBalanceActuator"},{"label":"ParticipateAssetIssue","value":"ParticipateAssetIssueActuator"},{"label":"ProposalApprove","value":"ProposalApproveActuator"},{"label":"ProposalCreate","value":"ProposalCreateActuator"},{"label":"ProposalDelete","value":"ProposalDeleteActuator"},{"label":"SetAccountId","value":"SetAccountIdActuator"},{"label":"ShieldedTransfer","value":"ShieldedTransferActuator"},{"label":"Transfer","value":"TransferActuator"},{"label":"TransferAsset","value":"TransferAssetActuator"},{"label":"UnfreezeAsset","value":"UnfreezeAssetActuator"},{"label":"UnfreezeBalance","value":"UnfreezeBalanceActuator"},{"label":"UpdateAccount","value":"UpdateAccountActuator"},{"label":"UpdateAsset","value":"UpdateAssetActuator"},{"label":"UpdateBrokerage","value":"UpdateBrokerageActuator"},{"label":"UpdateEnergyLimit","value":"UpdateEnergyLimitContractActuator"},{"label":"UpdateSettingContract","value":"UpdateSettingContractActuator"},{"label":"VoteWitness","value":"VoteWitnessActuator"},{"label":"WithdrawBalance","value":"WithdrawBalanceActuator"},{"label":"WitnessCreate","value":"WitnessCreateActuator"},{"label":"WitnessUpdate","value":"WitnessUpdateActuator"}]')},"8a79":function(t,a,e){"use strict";var n=e("23e7"),o=e("06cf").f,r=e("50c4"),s=e("5a34"),c=e("1d80"),i=e("ab13"),l=e("c430"),u="".endsWith,m=Math.min,d=i("endsWith"),p=!l&&!d&&!!function(){var t=o(String.prototype,"endsWith");return t&&!t.writable}();n({target:"String",proto:!0,forced:!p&&!d},{endsWith:function(t){var a=String(c(this));s(t);var e=arguments.length>1?arguments[1]:void 0,n=r(a.length),o=void 0===e?n:m(r(e),n),i=String(t);return u?u.call(a,i,o):a.slice(o-i.length,o)===i}})},"904e":function(t,a,e){"use strict";var n=e("c993"),o=e.n(n);o.a},c993:function(t,a,e){},ed27:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"box-view transaction-module"},[e("div",{staticClass:"box-header title"},[t._v(t._s(t.$t("importPlugin.transactionModule")))]),e("div",{staticClass:"box-body"},[e("el-form",{ref:"form-box",attrs:{model:t.form,rules:t.formRules,"label-position":"top"}},[e("el-form-item",{staticClass:"transaction-list",attrs:{prop:"transaction"}},[e("el-checkbox-group",{model:{value:t.form.transaction,callback:function(a){t.$set(t.form,"transaction",a)},expression:"form.transaction"}},t._l(t.transactionList,(function(a,n){return e("el-checkbox",{key:n,attrs:{label:a.value}},[t._v(t._s(a.label))])})),1)],1),e("div",{staticClass:"more-form"},[e("el-button",{staticClass:"el-icon-arrow-right el-icon--right",attrs:{type:"text"},on:{click:function(a){t.showMore=!t.showMore}}},[t._v(t._s(t.$t("importPlugin.moreSetting")))])],1),e("el-collapse-transition",[t.showMore?e("div",[e("el-form-item",{staticClass:"custom-transaction",attrs:{props:"customTransaction"}},[e("el-checkbox",{model:{value:t.checkCustomTransaction,callback:function(a){t.checkCustomTransaction=a},expression:"checkCustomTransaction"}},[t._v(t._s(t.$t("importPlugin.customTransactionModule")))]),e("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},maxlength:300,placeholder:t.$t("importPlugin.valid.inputCustomTransaction")},model:{value:t.form.customTransaction,callback:function(a){t.$set(t.form,"customTransaction","string"===typeof a?a.trim():a)},expression:"form.customTransaction"}})],1)],1):t._e()])],1)],1),e("div",{staticClass:"box-footer align-right"},[e("el-button",{staticClass:"im-button large",on:{click:t.handleCancel}},[t._v(t._s(t.$t("base.prevStep")))]),e("el-button",{staticClass:"im-button large",attrs:{loading:t.loading,type:"primary"},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("base.nextStep")))])],1)])},o=[],r=(e("8a79"),{name:"transaction-module",props:{pluginInfo:{type:Object,required:!0}},data:function(){return{form:{transaction:[],customTransaction:""},showMore:!1,checkCustomTransaction:!1,customTransactionIndex:-1,formRules:{transaction:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}]},contentShow:!0,transactionList:e("0cb2")||[],moreSetting:!1,loading:!1}},watch:{pluginInfo:{handler:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.form.customTransaction=t.customTransaction||"",this.form.transaction=t.transaction,this.form.customTransaction&&(this.checkCustomTransaction=!0)},immediate:!0}},methods:{handleCancel:function(){this.$emit("prev-step")},handleSubmit:function(){var t=this;this.$refs["form-box"].validate((function(a){if(a){if(t.checkCustomTransaction){if(!t.form.customTransaction.length)return void t.$message.warning(t.$t("importPlugin.valid.customTransaction"));if(!t.form.customTransaction.endsWith(".jar"))return void t.$message.warning(t.$t("importPlugin.valid.pathEndJAR"))}else if(t.form.customTransaction)return void t.$message.warning(t.$t("importPlugin.valid.checkCustomTransaction"));var e={transaction:t.form.transaction,customTransaction:t.form.customTransaction};t.loading=!0,t.$_api.importPlugin.transactionApi(e,(function(a,e){t.loading=!1,a||(t.$message.success(t.$t("importPlugin.transactionModuleSaveSuccess")),t.$emit("next-step"))}))}}))}}}),s=r,c=(e("904e"),e("2877")),i=Object(c["a"])(s,n,o,!1,null,"4dfe6904",null);a["default"]=i.exports}}]);
//# sourceMappingURL=chunk-3786c4a5.fb581a81.js.map