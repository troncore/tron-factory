(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9547c7c2","chunk-2d0e53c5"],{4596:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box-view import-plugin"},[a("div",{staticClass:"box-card"},[a("div",{staticClass:"card-header"},[t._v(t._s(t.$t("configuration.consensusModule")))]),a("div",{staticClass:"consensus-list"},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.consensus,callback:function(e){t.consensus=e},expression:"consensus"}},[a("el-option",{attrs:{label:"DPoS",value:"dpos"}})],1)],1)]),a("div",{staticClass:"box-card"},[a("div",{staticClass:"card-header"},[t._v(t._s(t.$t("configuration.transactionModule")))]),a("el-form",{ref:"form-box",attrs:{rules:t.formRules,model:t.form,"label-position":"top"}},[a("el-form-item",{staticClass:"transaction-list",attrs:{prop:"transaction"}},[a("el-checkbox-group",{model:{value:t.form.transaction,callback:function(e){t.$set(t.form,"transaction",e)},expression:"form.transaction"}},t._l(t.transactionList,(function(e,n){return a("el-checkbox",{key:n,attrs:{label:e.value}},[t._v(t._s(e.label))])})),1)],1),a("div",{staticClass:"more-setting"},[a("el-checkbox",{on:{change:t.handleChangeCheckCustom},model:{value:t.checkCustomTransaction,callback:function(e){t.checkCustomTransaction=e},expression:"checkCustomTransaction"}},[t._v(t._s(t.$t("configuration.customTransactionModule")))])],1),a("el-form-item",{ref:"custom-transaction",staticClass:"custom-transaction",attrs:{prop:"customTransaction"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},maxlength:300,disabled:!t.checkCustomTransaction,placeholder:t.$t(t.checkCustomTransaction?"configuration.valid.inputCustomTransaction":"configuration.valid.checkCustomTransaction")},model:{value:t.form.customTransaction,callback:function(e){t.$set(t.form,"customTransaction","string"===typeof e?e.trim():e)},expression:"form.customTransaction"}})],1)],1)],1),a("div",{staticClass:"box-footer align-right"},[a("el-button",{staticClass:"im-button large",on:{click:t.handleCancel}},[t._v(t._s(t.$t("base.prevStep")))]),a("el-button",{staticClass:"im-button large",attrs:{loading:t.loading,disabled:t.configLoading,type:"primary"},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("base.complete")))])],1)])},o=[],s=(a("a4d3"),a("4de4"),a("e439"),a("dbb4"),a("b64b"),a("d3b7"),a("8a79"),a("159b"),a("ade3")),r=a("2f62");function c(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?c(Object(a),!0).forEach((function(e){Object(s["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var l={name:"import-plugin",data:function(){return{form:{transaction:[],customTransaction:""},consensus:[],checkCustomTransaction:!1,transactionList:a("942f")||[],loading:!1,configLoading:!1}},computed:{formRules:function(){var t=this,e=function(e,a,n){t.checkCustomTransaction&&!t.form.customTransaction.endsWith(".jar")?n(new Error(t.$t("configuration.valid.pathEndJAR"))):n()};return{customTransaction:[{required:this.checkCustomTransaction,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:e,trigger:"blur"}]}}},created:function(){this.initPluginInfo()},methods:i({},Object(r["d"])("app",{updateMenuList:"updateMenuList"}),{initPluginInfo:function(){var t=this;return new Promise((function(e){t.configLoading=!0,t.$_api.configuration.getPluginConfig({},(function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.configLoading=!1,e||(t.consensus=a.consensus,t.form.customTransaction=a.customTransaction||"",t.checkCustomTransaction=!!t.form.customTransaction,t.form.transaction=a.transaction||[])}))}))},handleChangeCheckCustom:function(t){t&&setTimeout(this.$refs["custom-transaction"].clearValidate,0)},handleSubmit:function(){var t=this;this.$refs["form-box"].validate((function(e){if(e){var a={transaction:t.form.transaction,customTransaction:t.checkCustomTransaction?t.form.customTransaction:"",configStatus:0};t.loading=!0,t.$_api.configuration.setTransactionModule(a,(function(e,a){t.loading=!1,e||(t.$notify({type:"success",title:t.$t("base.successful"),message:t.$t("base.success.operate")}),t.$router.push({path:"/nodes-manage"}))}))}}))},handleCancel:function(){this.$emit("prev-step")}})},u=l,d=(a("86e0"),a("2877")),f=Object(d["a"])(u,n,o,!1,null,"accd81b4",null);e["default"]=f.exports},"86e0":function(t,e,a){"use strict";var n=a("feb4"),o=a.n(n);o.a},"8a79":function(t,e,a){"use strict";var n=a("23e7"),o=a("06cf").f,s=a("50c4"),r=a("5a34"),c=a("1d80"),i=a("ab13"),l=a("c430"),u="".endsWith,d=Math.min,f=i("endsWith"),p=!l&&!f&&!!function(){var t=o(String.prototype,"endsWith");return t&&!t.writable}();n({target:"String",proto:!0,forced:!p&&!f},{endsWith:function(t){var e=String(c(this));r(t);var a=arguments.length>1?arguments[1]:void 0,n=s(e.length),o=void 0===a?n:d(s(a),n),i=String(t);return u?u.call(e,i,o):e.slice(o-i.length,o)===i}})},"942f":function(t){t.exports=JSON.parse('[{"label":"AccountPermissionUpdate","value":"AccountPermissionUpdateActuator"},{"label":"AssetIssue","value":"AssetIssueActuator"},{"label":"ClearABIContract","value":"ClearABIContractActuator"},{"label":"CreateAccount","value":"CreateAccountActuator"},{"label":"ExchangeCreate","value":"ExchangeCreateActuator"},{"label":"ExchangeInject","value":"ExchangeInjectActuator"},{"label":"ExchangeTransaction","value":"ExchangeTransactionActuator"},{"label":"ExchangeWithdraw","value":"ExchangeWithdrawActuator"},{"label":"FreezeBalance","value":"FreezeBalanceActuator"},{"label":"ParticipateAssetIssue","value":"ParticipateAssetIssueActuator"},{"label":"ProposalApprove","value":"ProposalApproveActuator"},{"label":"ProposalCreate","value":"ProposalCreateActuator"},{"label":"ProposalDelete","value":"ProposalDeleteActuator"},{"label":"SetAccountId","value":"SetAccountIdActuator"},{"label":"ShieldedTransfer","value":"ShieldedTransferActuator"},{"label":"Transfer","value":"TransferActuator"},{"label":"TransferAsset","value":"TransferAssetActuator"},{"label":"UnfreezeAsset","value":"UnfreezeAssetActuator"},{"label":"UnfreezeBalance","value":"UnfreezeBalanceActuator"},{"label":"UpdateAccount","value":"UpdateAccountActuator"},{"label":"UpdateAsset","value":"UpdateAssetActuator"},{"label":"UpdateBrokerage","value":"UpdateBrokerageActuator"},{"label":"UpdateEnergyLimit","value":"UpdateEnergyLimitContractActuator"},{"label":"UpdateSettingContract","value":"UpdateSettingContractActuator"},{"label":"VoteWitness","value":"VoteWitnessActuator"},{"label":"WithdrawBalance","value":"WithdrawBalanceActuator"},{"label":"WitnessCreate","value":"WitnessCreateActuator"},{"label":"WitnessUpdate","value":"WitnessUpdateActuator"}]')},feb4:function(t,e,a){}}]);
//# sourceMappingURL=chunk-9547c7c2.b96074d5.js.map