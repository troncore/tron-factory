(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78e16f76"],{"88b5":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"token-params card-view"},[a("div",{staticClass:"im-card card-main"},[t._m(0),a("div",{staticClass:"card-body"},[a("el-form",{ref:"im-form",staticClass:"im-form",attrs:{rules:t.formRules,model:t.form,"label-position":"top"}},[a("el-form-item",{attrs:{prop:"tokenName"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(t.$t("代币名称")))]),a("div",{staticClass:"item-inner"},[a("el-input",{attrs:{size:"large",maxlength:"25",clearable:""},model:{value:t.form.tokenName,callback:function(e){t.$set(t.form,"tokenName","string"===typeof e?e.trim():e)},expression:"form.tokenName"}}),a("span",{staticClass:"help-info"},[t._v(t._s(t.$t("代币的名称，3 ~ 25个英文字符")))])],1)]),a("el-form-item",{attrs:{prop:"tokenSymbol"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(t.$t("代币符号")))]),a("div",{staticClass:"item-inner"},[a("el-input",{attrs:{size:"large",maxlength:"4",clearable:""},model:{value:t.form.tokenSymbol,callback:function(e){t.$set(t.form,"tokenSymbol","string"===typeof e?e.trim():e)},expression:"form.tokenSymbol"}}),a("span",{staticClass:"help-info"},[t._v(t._s(t.$t("3 ~ 4英文字符，例如ETH, BTC, BAT 等，不可包含空格")))])],1)]),a("el-form-item",{attrs:{prop:"decimals"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(t.$t("代币精度")))]),a("div",{staticClass:"item-inner"},[a("el-input",{attrs:{size:"large",maxlength:"2",clearable:""},model:{value:t.form.decimals,callback:function(e){t.$set(t.form,"decimals","string"===typeof e?e.trim():e)},expression:"form.decimals"}}),a("span",{staticClass:"help-info"},[t._v(t._s(t.$t("代币的小数位数，0 ~ 18位，大多数代币选择18位小数")))])],1)]),a("el-form-item",{staticClass:"margin-bottom-0",attrs:{prop:"totalSupply"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(t.$t("总发行量")))]),a("div",{staticClass:"item-inner"},[a("el-input",{attrs:{size:"large",clearable:""},model:{value:t.form.totalSupply,callback:function(e){t.$set(t.form,"totalSupply","string"===typeof e?e.trim():e)},expression:"form.totalSupply"}}),a("span",{staticClass:"help-info"},[t._v(t._s(t.$t("要发行的代币总量，最小1，最大1000000000000000")))])],1)])],1)],1)]),a("div",{staticClass:"card-footer center"},[a("el-button",{staticClass:"im-button largest",attrs:{loading:t.loading,disabled:t.disable,type:"primary"},on:{click:t.handleSubmit}},[a("i",{staticClass:"el-icon-coin"}),t._v(" "+t._s(t.$t("tokenDIY.releaseToken"))+" ")])],1)])},l=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-header"},[a("span",{staticClass:"card-title"},[t._v("代币发行参数")])])}],o={name:"token-params",data:function(){return{form:{tokenName:"",tokenSymbol:"",decimals:"18",totalSupply:"",tokenType:"trc20",tokenAccount:""},loading:!1,disable:!1}},computed:{formRules:function(){var t=function(t,e,a){/^[a-zA-Z]{3,25}$/.test(e)?a():a(new Error(" "))},e=function(t,e,a){/^[a-zA-Z]{3,4}$/.test(e)?a():a(new Error(" "))},a=function(t,e,a){/^\d+$/.test(e)&&e>=0&&e<=18?a():a(new Error(" "))},s=function(t,e,a){/^\d+$/.test(e)&&e>=1&&e<=1e15?a():a(new Error(" "))};return{tokenName:[{required:!0,message:" ",trigger:"change"},{validator:t,trigger:"change"}],tokenSymbol:[{required:!0,message:" ",trigger:"change"},{validator:e,trigger:"change"}],decimals:[{required:!0,message:" ",trigger:"change"},{validator:a,trigger:"change"}],totalSupply:[{required:!0,message:" ",trigger:"change"},{validator:s,trigger:"change"}]}}},created:function(){this.init()},methods:{init:function(){var t,e,a,s,l,o=JSON.parse(localStorage.getItem("tokenDIY"))||{};this.form={tokenName:null!==(t=o.tokenName)&&void 0!==t?t:this.form.tokenName,tokenSymbol:null!==(e=o.tokenSymbol)&&void 0!==e?e:this.form.tokenSymbol,decimals:null!==(a=o.decimals)&&void 0!==a?a:this.form.decimals,totalSupply:null!==(s=o.totalSupply)&&void 0!==s?s:this.form.totalSupply,tokenType:null!==(l=o.tokenType)&&void 0!==l?l:this.form.tokenType}},handleCancel:function(){},handleSubmit:function(){var t=this;this.$refs["im-form"].validate((function(e){e&&(localStorage.setItem("tokenDIY",JSON.stringify(t.form)),t.$emit("step",1))}))}}},i=o,r=(a("93ca"),a("2877")),n=Object(r["a"])(i,s,l,!1,null,"4690ccb6",null);e["default"]=n.exports},"93ca":function(t,e,a){"use strict";var s=a("e82f"),l=a.n(s);l.a},e82f:function(t,e,a){}}]);
//# sourceMappingURL=chunk-78e16f76.ce97585b.js.map