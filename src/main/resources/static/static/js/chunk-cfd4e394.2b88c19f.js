(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cfd4e394","chunk-2d0b8a47"],{"300d":function(t){t.exports=JSON.parse('[{"label":"AccountPermissionUpdate","value":"AccountPermissionUpdateActuator"},{"label":"AssetIssue","value":"AssetIssueActuator"},{"label":"ClearABIContract","value":"ClearABIContractActuator"},{"label":"CreateAccount","value":"CreateAccountActuator"},{"label":"ExchangeCreate","value":"ExchangeCreateActuator"},{"label":"ExchangeInject","value":"ExchangeInjectActuator"},{"label":"ExchangeTransaction","value":"ExchangeTransactionActuator"},{"label":"ExchangeWithdraw","value":"ExchangeWithdrawActuator"},{"label":"FreezeBalance","value":"FreezeBalanceActuator"},{"label":"ParticipateAssetIssue","value":"ParticipateAssetIssueActuator"},{"label":"ProposalApprove","value":"ProposalApproveActuator"},{"label":"ProposalCreate","value":"ProposalCreateActuator"},{"label":"ProposalDelete","value":"ProposalDeleteActuator"},{"label":"SetAccountId","value":"SetAccountIdActuator"},{"label":"ShieldedTransfer","value":"ShieldedTransferActuator"},{"label":"Transfer","value":"TransferActuator"},{"label":"TransferAsset","value":"TransferAssetActuator"},{"label":"UnfreezeAsset","value":"UnfreezeAssetActuator"},{"label":"UnfreezeBalance","value":"UnfreezeBalanceActuator"},{"label":"UpdateAccount","value":"UpdateAccountActuator"},{"label":"UpdateAsset","value":"UpdateAssetActuator"},{"label":"UpdateBrokerage","value":"UpdateBrokerageActuator"},{"label":"UpdateEnergyLimit","value":"UpdateEnergyLimitContractActuator"},{"label":"UpdateSettingContract","value":"UpdateSettingContractActuator"},{"label":"VoteWitness","value":"VoteWitnessActuator"},{"label":"WithdrawBalance","value":"WithdrawBalanceActuator"},{"label":"WitnessCreate","value":"WitnessCreateActuator"},{"label":"WitnessUpdate","value":"WitnessUpdateActuator"}]')},"539b":function(t,e,a){},"6a6a":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-view import-plugin"},[a("div",{staticClass:"box-view"},[a("div",{staticClass:"page-body"},[a("div",{staticClass:"box-card"},[a("div",{staticClass:"card-header"},[t._v(t._s(t.$t("importPlugin.consensusModule")))]),t._m(0)]),a("div",{staticClass:"box-card"},[a("div",{staticClass:"card-header"},[t._v(t._s(t.$t("importPlugin.transactionModule")))]),a("el-form",{ref:"form-box",attrs:{model:t.form,rules:t.formRules,"label-position":"top"}},[a("el-form-item",{staticClass:"transaction-list",attrs:{prop:"transaction"}},[a("el-checkbox-group",{model:{value:t.form.transaction,callback:function(e){t.$set(t.form,"transaction",e)},expression:"form.transaction"}},t._l(t.transactionList,(function(e,n){return a("el-checkbox",{key:n,attrs:{label:e.value}},[t._v(t._s(e.label))])})),1)],1),a("el-form-item",{staticClass:"custom-transaction",attrs:{props:"customTransaction"}},[a("el-checkbox",{model:{value:t.checkCustomTransaction,callback:function(e){t.checkCustomTransaction=e},expression:"checkCustomTransaction"}},[t._v(t._s(t.$t("importPlugin.customTransactionModule")))]),a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},maxlength:300,disabled:!t.checkCustomTransaction,placeholder:t.$t(t.checkCustomTransaction?"importPlugin.valid.inputCustomTransaction":"importPlugin.valid.checkCustomTransaction")},model:{value:t.form.customTransaction,callback:function(e){t.$set(t.form,"customTransaction","string"===typeof e?e.trim():e)},expression:"form.customTransaction"}})],1)],1)],1)]),a("div",{staticClass:"page-footer align-right"},[a("el-button",{staticClass:"im-button large",attrs:{loading:t.loading,type:"primary"},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("base.nextStep")))])],1)])])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"consensus-list"},[a("span",{staticClass:"consensus-item"},[t._v("DPoS")])])}],o=(a("a4d3"),a("4de4"),a("e439"),a("dbb4"),a("b64b"),a("d3b7"),a("8a79"),a("159b"),a("ade3")),s=a("2f62");function i(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function c(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?i(Object(a),!0).forEach((function(e){Object(o["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var l={name:"import-plugin",props:{pluginInfo:{type:Object,required:!0}},data:function(){return{form:{transaction:[],customTransaction:""},showMore:!1,checkCustomTransaction:!1,customTransactionIndex:-1,formRules:{transaction:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}]},contentShow:!0,transactionList:a("300d")||[],moreSetting:!1,loading:!1}},watch:{pluginInfo:{handler:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.form.customTransaction=t.customTransaction||"",this.form.transaction=t.transaction,this.form.customTransaction&&(this.checkCustomTransaction=!0)},immediate:!0}},created:function(){this.initPluginInfo()},methods:c({},Object(s["c"])("app",{updateMenuList:"updateMenuList"}),{initPluginInfo:function(){var t=this;return new Promise((function(e){t.$_api.importPlugin.pluginConfigApi({},(function(a){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};a||(t.pluginInfo=n,e(t.pluginInfo))}))}))},handleSubmit:function(){var t=this;this.$refs["form-box"].validate((function(e){if(e){if(t.checkCustomTransaction){if(!t.form.customTransaction.length)return void t.$message.warning(t.$t("importPlugin.valid.customTransaction"));if(!t.form.customTransaction.endsWith(".jar"))return void t.$message.warning(t.$t("importPlugin.valid.pathEndJAR"))}else if(t.form.customTransaction)return void t.$message.warning(t.$t("importPlugin.valid.checkCustomTransaction"));var a={transaction:t.form.transaction,customTransaction:t.form.customTransaction};t.loading=!0,t.$_api.importPlugin.transactionApi(a,(function(e,a){t.loading=!1,e||(t.$message.success(t.$t("base.success.save")),t.updateMenuList({activeName:"deploy-nodes"}),t.$router.push({path:"/deploy-nodes"}))}))}}))}})},u=l,p=(a("ff3c"),a("2877")),d=Object(p["a"])(u,n,r,!1,null,"0e01bdb7",null);e["default"]=d.exports},"8a79":function(t,e,a){"use strict";var n=a("23e7"),r=a("06cf").f,o=a("50c4"),s=a("5a34"),i=a("1d80"),c=a("ab13"),l=a("c430"),u="".endsWith,p=Math.min,d=c("endsWith"),m=!l&&!d&&!!function(){var t=r(String.prototype,"endsWith");return t&&!t.writable}();n({target:"String",proto:!0,forced:!m&&!d},{endsWith:function(t){var e=String(i(this));s(t);var a=arguments.length>1?arguments[1]:void 0,n=o(e.length),r=void 0===a?n:p(o(a),n),c=String(t);return u?u.call(e,c,r):e.slice(r-c.length,r)===c}})},ff3c:function(t,e,a){"use strict";var n=a("539b"),r=a.n(n);r.a}}]);
//# sourceMappingURL=chunk-cfd4e394.2b88c19f.js.map