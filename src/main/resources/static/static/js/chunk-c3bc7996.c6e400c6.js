(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c3bc7996"],{"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));r("d3b7");function n(t,e,r,n,a,o,i){try{var c=t[o](i),s=c.value}catch(l){return void r(l)}c.done?e(s):Promise.resolve(s).then(n,a)}function a(t){return function(){var e=this,r=arguments;return new Promise((function(a,o){var i=t.apply(e,r);function c(t){n(i,a,o,c,s,"next",t)}function s(t){n(i,a,o,c,s,"throw",t)}c(void 0)}))}}},"4e26":function(t,e,r){"use strict";var n=r("568a"),a=r.n(n);a.a},"568a":function(t,e,r){},6850:function(t,e,r){},"6a35":function(t,e,r){"use strict";var n=r("6850"),a=r.n(n);a.a},"75d9":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{attrs:{visible:t.dialogVisible,"custom-class":"im-dialog",width:"680px",center:""},on:{"update:visible":function(e){t.dialogVisible=e}}},[r("div",{staticClass:"dialog-header",attrs:{slot:"title"},slot:"title"},[r("div",{staticClass:"title"},[t._v(t._s(t.$t("getStarted.chainManage."+(t.isAdd?"assetDialogAddTitle":"assetDialogEditTitle"))))])]),r("div",{staticClass:"dialog-content"},[r("el-form",{ref:"dialog-form",attrs:{rules:t.formRules,model:t.form,"label-width":"150px","label-position":"left"}},[r("el-form-item",{attrs:{prop:"accountName"}},[r("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("getStarted.chainManage.accountNameLabel"))+" "),r("im-tooltip",{attrs:{content:t.$t("getStarted.chainManage.accountNameTips")}})],1),r("el-input",{attrs:{tabindex:"26",disabled:"Blackhole"===t.asset.accountName,clearable:""},model:{value:t.form.accountName,callback:function(e){t.$set(t.form,"accountName","string"===typeof e?e.trim():e)},expression:"form.accountName"}})],1),r("el-form-item",{attrs:{prop:"accountType"}},[r("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("getStarted.chainManage.accountTypeLabel"))+" "),r("im-tooltip",{attrs:{content:t.$t("getStarted.chainManage.accountTypeTips")}})],1),r("el-select",{attrs:{clearable:"",placeholder:" "},model:{value:t.form.accountType,callback:function(e){t.$set(t.form,"accountType",e)},expression:"form.accountType"}},t._l(t.accountTypeOptions,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),r("el-form-item",{attrs:{prop:"address"}},[r("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("getStarted.chainManage.addressLabel"))+" "),r("im-tooltip",{attrs:{content:t.$t("getStarted.chainManage.addressTips")}})],1),r("el-input",{attrs:{tabindex:"27",clearable:""},model:{value:t.form.address,callback:function(e){t.$set(t.form,"address","string"===typeof e?e.trim():e)},expression:"form.address"}})],1),r("el-form-item",{attrs:{label:"balance",prop:"balance"}},[r("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("getStarted.chainManage.balanceLabel"))+" "),r("im-tooltip",{attrs:{content:t.$t("getStarted.chainManage.balanceTips")}})],1),r("el-input",{attrs:{tabindex:"28",clearable:""},model:{value:t.form.balance,callback:function(e){t.$set(t.form,"balance","string"===typeof e?e.trim():e)},expression:"form.balance"}})],1)],1)],1),r("div",{staticClass:"dialog-footer align-right",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v(t._s(t.$t("base.cancel")))]),r("el-button",{attrs:{type:"primary",loading:t.loading},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("base.save")))])],1)])},a=[],o=(r("c740"),r("d3b7"),r("96cf"),r("1da1")),i=r("cf45"),c=r("8e6c"),s={name:"genesis-asset-dialog",components:{ImTooltip:c["a"]},props:["visible","asset","isAdd","assetList"],data:function(){return{form:{accountName:"",accountType:"",address:"",balance:""},accountTypeOptions:[{value:"AssetIssue",label:"AssetIssue"}],loading:!1}},computed:{dialogVisible:{get:function(){return this.visible},set:function(t){this.$emit("update:visible",t)}},formRules:function(){var t=this,e=BigInt(Math.pow(2,63))-BigInt(1),r=-BigInt(Math.pow(2,63)),n=function(n,a,o){var i="";/^(-)?\d+$/.test(a)?BigInt(a)<r?i=t.$t("base.valid.minNumberValue")+": "+r:BigInt(a)>e&&(i=t.$t("base.valid.maxNumberValue")+": "+e):i=t.$t("base.valid.integer"),i?o(new Error(i)):o()},a=function(e,r,n){var a=t.$t("getStarted.chainManage.accountNameCheckRepeat");-1!==t.assetList.findIndex((function(e){return e.accountName===t.form.accountName}))?n(new Error(a)):n()};return{accountName:[{required:!0,message:" ",trigger:"change"},{validator:a,trigger:"change"}],accountType:[{required:!0,message:" ",trigger:"change"}],address:[{required:!0,message:" ",trigger:"change"}],balance:[{required:!0,message:" ",trigger:"change"},{validator:n,trigger:"change"}]}}},created:function(){this.form={accountName:this.asset.accountName,accountType:this.asset.accountType,address:this.asset.address,balance:this.asset.balance}},methods:{handleSubmit:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.$refs["dialog-form"].validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=11;break}return t.loading=!0,n=t.checkAddress(t.form.address),e.next=5,n;case 5:if(e.sent){e.next=8;break}return t.loading=!1,e.abrupt("return",!1);case 8:t.form.balance=Object(i["b"])(t.form.balance),t.$emit("submit",t.form),t.dialogVisible=!1;case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e)})))()},checkAddress:function(t){var e=this;return new Promise((function(r){e.$_api.getStarted.checkAddress({address:t},(function(t,n){if(t)return r(!1);n.result?r(!0):(e.$notify({type:"warning",title:e.$t("base.warning"),message:e.$t("getStarted.chainManage.addressCheckValid")}),r(!1))}))}))}}},l=s,u=(r("6a35"),r("2877")),f=Object(u["a"])(l,n,a,!1,null,"8b5a6266",null);e["default"]=f.exports},"8e6c":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-tooltip",{attrs:{effect:t.effect,placement:t.placement}},[r("div",{attrs:{slot:"content"},domProps:{innerHTML:t._s(t.content)},slot:"content"}),r("i",{staticClass:"icon-question fa fa-question-circle-o",style:t.myStyle})])},a=[],o={name:"im-tooltip",props:{effect:{type:String,default:"dark"},placement:{type:String,default:"top"},content:{},marginLeft:String,marginRight:String},computed:{myStyle:function(){var t={};return"undefined"!==typeof this.marginLeft&&(t.marginLeft=this.marginLeft),"undefined"!==typeof this.marginRight&&(t.marginRight=this.marginRight),t}}},i=o,c=(r("4e26"),r("2877")),s=Object(c["a"])(i,n,a,!1,null,"cc688580",null);e["a"]=s.exports},"96cf":function(t,e){!function(e){"use strict";var r,n=Object.prototype,a=n.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",c=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag",l="object"===typeof t,u=e.regeneratorRuntime;if(u)l&&(t.exports=u);else{u=e.regeneratorRuntime=l?t.exports:{},u.wrap=w;var f="suspendedStart",h="suspendedYield",d="executing",p="completed",g={},m={};m[i]=function(){return this};var v=Object.getPrototypeOf,y=v&&v(v(I([])));y&&y!==n&&a.call(y,i)&&(m=y);var b=k.prototype=L.prototype=Object.create(m);_.prototype=b.constructor=k,k.constructor=_,k[s]=_.displayName="GeneratorFunction",u.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===_||"GeneratorFunction"===(e.displayName||e.name))},u.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,k):(t.__proto__=k,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(b),t},u.awrap=function(t){return{__await:t}},$(E.prototype),E.prototype[c]=function(){return this},u.AsyncIterator=E,u.async=function(t,e,r,n){var a=new E(w(t,e,r,n));return u.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},$(b),b[s]="Generator",b[i]=function(){return this},b.toString=function(){return"[object Generator]"},u.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},u.values=I,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&a.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,a){return c.type="throw",c.arg=t,e.next=n,a&&(e.method="next",e.arg=r),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var s=a.call(i,"catchLoc"),l=a.call(i,"finallyLoc");if(s&&l){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;O(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:I(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),g}}}function w(t,e,r,n){var a=e&&e.prototype instanceof L?e:L,o=Object.create(a.prototype),i=new j(n||[]);return o._invoke=S(t,r,i),o}function x(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}function L(){}function _(){}function k(){}function $(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function E(t){function e(r,n,o,i){var c=x(t[r],t,n);if("throw"!==c.type){var s=c.arg,l=s.value;return l&&"object"===typeof l&&a.call(l,"__await")?Promise.resolve(l.__await).then((function(t){e("next",t,o,i)}),(function(t){e("throw",t,o,i)})):Promise.resolve(l).then((function(t){s.value=t,o(s)}),i)}i(c.arg)}var r;function n(t,n){function a(){return new Promise((function(r,a){e(t,n,r,a)}))}return r=r?r.then(a,a):a()}this._invoke=n}function S(t,e,r){var n=f;return function(a,o){if(n===d)throw new Error("Generator is already running");if(n===p){if("throw"===a)throw o;return M()}r.method=a,r.arg=o;while(1){var i=r.delegate;if(i){var c=T(i,r);if(c){if(c===g)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var s=x(t,e,r);if("normal"===s.type){if(n=r.done?p:h,s.arg===g)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=p,r.method="throw",r.arg=s.arg)}}}function T(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,T(t,e),"throw"===e.method))return g;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var a=x(n,t.iterator,e.arg);if("throw"===a.type)return e.method="throw",e.arg=a.arg,e.delegate=null,g;var o=a.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,g):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,g)}function N(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(N,this),this.reset(!0)}function I(t){if(t){var e=t[i];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){while(++n<t.length)if(a.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return o.next=o}}return{next:M}}function M(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())},c740:function(t,e,r){"use strict";var n=r("23e7"),a=r("b727").findIndex,o=r("44d2"),i=r("ae40"),c="findIndex",s=!0,l=i(c);c in[]&&Array(1)[c]((function(){s=!1})),n({target:"Array",proto:!0,forced:s||!l},{findIndex:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),o(c)}}]);
//# sourceMappingURL=chunk-c3bc7996.c6e400c6.js.map