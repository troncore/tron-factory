(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-332f0768"],{"077a":function(t,n,o){"use strict";var i=o("34cb"),a=o.n(i);a.a},"34cb":function(t,n,o){},"8a79":function(t,n,o){"use strict";var i=o("23e7"),a=o("06cf").f,e=o("50c4"),s=o("5a34"),r=o("1d80"),c=o("ab13"),u=o("c430"),d="".endsWith,l=Math.min,m=c("endsWith"),h=!u&&!m&&!!function(){var t=a(String.prototype,"endsWith");return t&&!t.writable}();i({target:"String",proto:!0,forced:!h&&!m},{endsWith:function(t){var n=String(r(this));s(t);var o=arguments.length>1?arguments[1]:void 0,i=e(n.length),a=void 0===o?i:l(e(o),i),c=String(t);return d?d.call(n,c,a):n.slice(a-c.length,a)===c}})},b5ed:function(t,n,o){"use strict";o.r(n);var i=function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"box-view import-plugin"},[o("div",{staticClass:"box-card"},[o("el-form",{ref:"form-box",attrs:{rules:t.formRules,model:t.form,"label-position":"top"}},[o("div",{staticClass:"more-setting"},[o("el-checkbox",{on:{change:t.handleChangeCheckCustom},model:{value:t.checkCustomTransaction,callback:function(n){t.checkCustomTransaction=n},expression:"checkCustomTransaction"}},[t._v(t._s(t.$t("nodeConfig.customTransactionModule")))])],1),o("el-form-item",{ref:"custom-transaction",staticClass:"custom-transaction margin-bottom-0",attrs:{prop:"customTransaction"}},[o("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},maxlength:300,disabled:!t.checkCustomTransaction,placeholder:t.$t(t.checkCustomTransaction?"nodeConfig.valid.inputCustomTransaction":"nodeConfig.valid.checkCustomTransaction")},model:{value:t.form.customTransaction,callback:function(n){t.$set(t.form,"customTransaction","string"===typeof n?n.trim():n)},expression:"form.customTransaction"}})],1)],1)],1),o("div",{staticClass:"box-footer"},[o("el-button",{staticClass:"im-button large",attrs:{loading:t.loading,disabled:t.disabled,type:"primary"},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("base.complete")))]),o("el-button",{staticClass:"im-button large",on:{click:t.handleCancel}},[t._v(t._s(t.$t("base.prevStep")))])],1)])},a=[],e=(o("a9e3"),o("8a79"),{name:"import-plugin",data:function(){return{form:{id:"",customTransaction:""},checkCustomTransaction:!1,loading:!1,disabled:!0}},computed:{opNodeId:function(){var t=this.$route.query.id;return/\d+/.test(t)?Number(t):void 0},formRules:function(){var t=this,n=function(n,o,i){t.checkCustomTransaction&&!t.form.customTransaction.endsWith(".jar")?i(new Error(t.$t("nodeConfig.valid.pathEndJAR"))):i()};return{customTransaction:[{required:this.checkCustomTransaction,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:n,trigger:"blur"}]}}},created:function(){this.getConfig()},methods:{getConfig:function(){var t=this;this.validNode()&&(this.disabled=!0,this.$_api.getStarted.getPluginConfig({id:this.opNodeId},(function(n){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};n||(t.disabled=!1,t.initForm(o))})))},initForm:function(t){this.form={id:this.opNodeId,customTransaction:t.customTransaction},this.checkCustomTransaction=!!this.form.customTransaction},handleChangeCheckCustom:function(t){t&&setTimeout(this.$refs["custom-transaction"].clearValidate,0)},handleSubmit:function(){var t=this;this.$refs["form-box"].validate((function(n){if(n){var o={id:t.opNodeId,customTransaction:t.checkCustomTransaction?t.form.customTransaction:"",configStatus:1};t.loading=!0,t.$_api.getStarted.setPluginConfig(o,(function(n,o){t.loading=!1,n||(t.$notify.success({title:t.$t("base.successful"),message:t.$t("base.success.operate")}),t.$router.push("/get-started/dashboard"))}))}}))},validNode:function(){return!!/\d+/.test(this.opNodeId)||(this.$notify.warning({title:this.$t("base.warning"),message:this.$t("nodeConfig.opUnValidNode")}),!1)},handleCancel:function(){this.$emit("prev-step")}}}),s=e,r=(o("077a"),o("2877")),c=Object(r["a"])(s,i,a,!1,null,"0d364e7a",null);n["default"]=c.exports}}]);
//# sourceMappingURL=chunk-332f0768.8192ea3d.js.map