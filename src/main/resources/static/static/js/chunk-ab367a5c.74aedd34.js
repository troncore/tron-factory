(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ab367a5c","chunk-6c6c7194"],{5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,a){var n=a("1d80"),r=a("5899"),i="["+r+"]",o=RegExp("^"+i+i+"*"),s=RegExp(i+i+"*$"),c=function(e){return function(t){var a=String(n(t));return 1&e&&(a=a.replace(o,"")),2&e&&(a=a.replace(s,"")),a}};e.exports={start:c(1),end:c(2),trim:c(3)}},"61f7":function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,t,a){return t&&r(e.prototype,t),a&&r(e,a),e}a.d(t,"a",(function(){return u}));var o=function(){function e(){n(this,e)}return i(e,[{key:"isNumber",value:function(e){return/^\d+(\.\d+)?$/.test(e)}},{key:"isInteger",value:function(e){return/^\d+$/.test(e)}},{key:"isTwoDecimal",value:function(e){return/^([1-9]\d*|0)(\.\d{1,2})$/.test(e)}},{key:"isIP",value:function(e){return/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(e)}}]),e}(),s=new o,c=function(){function e(){n(this,e)}return i(e,[{key:"validIP",value:function(e){return function(t,a,n){var r=!1;s.isIP(a)||(r=!0),r?n(new Error(e)):n()}}},{key:"numEqual",value:function(e,t){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(n,r,i){var o=!1;s.isNumber(r)?r==e?o=!0:a||r==e||(o=!0):o=!0,o?i(new Error(t)):i()}}},{key:"numMin",value:function(e,t){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(r,i,o){var c=!1;s.isNumber(i)?n&&!s.isInteger(i)?c=!0:i<e?c=!0:a||i!=e||(c=!0):c=!0,c?o(new Error(t)):o()}}},{key:"numMax",value:function(e,t){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(r,i,o){var c=!1;s.isNumber(i)?n&&!s.isInteger(i)?c=!0:i>e?c=!0:a||i!=e||(c=!0):c=!0,c?o(new Error(t)):o()}}},{key:"numTwoDecimal",value:function(e){return function(t,a,n){var r=!1;s.isTwoDecimal(a)||(r=!0),r?n(new Error(e)):n()}}}]),e}(),u=new c},"64f0":function(e,t,a){},7156:function(e,t,a){var n=a("861d"),r=a("d2bb");e.exports=function(e,t,a){var i,o;return r&&"function"==typeof(i=t.constructor)&&i!==a&&n(o=i.prototype)&&o!==a.prototype&&r(e,o),e}},"96bc":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"box-view p2p-config"},[a("div",{staticClass:"box-body"},[a("el-form",{ref:"p2p-config-form",staticClass:"im-form",attrs:{rules:e.formRules,model:e.form,"label-position":"top"}},[a("el-form-item",{attrs:{prop:"maxActiveNodes"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v("maxActiveNodes "),a("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("nodeConfig.helpTips.maxActiveNodes"))+")")])]),a("el-input",{attrs:{type:"number",min:"0",max:"200",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.maxActiveNodes,callback:function(t){e.$set(e.form,"maxActiveNodes","string"===typeof t?t.trim():t)},expression:"form.maxActiveNodes"}})],1),a("el-form-item",{attrs:{prop:"maxActiveNodesWithSameIp"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v("maxActiveNodesWithSameIp "),a("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("nodeConfig.helpTips.maxActiveNodesWithSameIp"))+")")])]),a("el-input",{attrs:{type:"number",min:"0",max:"50",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.maxActiveNodesWithSameIp,callback:function(t){e.$set(e.form,"maxActiveNodesWithSameIp","string"===typeof t?t.trim():t)},expression:"form.maxActiveNodesWithSameIp"}})],1),a("el-form-item",{attrs:{prop:"activeConnectFactor"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v("activeConnectFactor")]),a("el-input",{attrs:{type:"number",min:"0",max:"1",step:"0.1",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.activeConnectFactor,callback:function(t){e.$set(e.form,"activeConnectFactor","string"===typeof t?t.trim():t)},expression:"form.activeConnectFactor"}})],1),a("el-form-item",{staticClass:"margin-bottom-0",attrs:{prop:"connectFactor"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v("connectFactor")]),a("el-input",{attrs:{type:"number",min:"0",max:"1",step:"0.1",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.connectFactor,callback:function(t){e.$set(e.form,"connectFactor","string"===typeof t?t.trim():t)},expression:"form.connectFactor"}})],1)],1)],1),a("div",{staticClass:"box-footer"},[a("el-button",{staticClass:"im-button large",attrs:{loading:e.loading,disabled:e.disabled,type:"primary"},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.nextStep")))]),a("el-button",{staticClass:"im-button large",on:{click:e.handleCancel}},[e._v(e._s(e.$t("base.prevStep")))])],1)])},r=[],i=(a("a9e3"),a("61f7")),o={name:"p2p-config",data:function(){return{form:{id:"",maxActiveNodes:"",maxActiveNodesWithSameIp:"",activeConnectFactor:"",connectFactor:""},disabled:!0,loading:!1}},computed:{opNodeId:function(){var e=this.$route.query.id;return/\d+/.test(e)?Number(e):void 0},formRules:function(){return{maxActiveNodes:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:i["a"].numMin(0,this.$t("base.valid.gtZeroInt"),!1),trigger:"blur"},{validator:i["a"].numMax(200,this.$t("base.valid.maxNumberValue")+": 200"),trigger:"blur"}],activeConnectFactor:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:i["a"].numMin(0,this.$t("base.valid.gtZeroNum"),!1,!1),trigger:"blur"},{validator:i["a"].numMax(1,this.$t("base.valid.maxNumberValue")+": 1",!0,!1),trigger:"blur"}],maxActiveNodesWithSameIp:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:i["a"].numMin(0,this.$t("base.valid.gtZeroInt"),!1),trigger:"blur"},{validator:i["a"].numMax(50,this.$t("base.valid.maxNumberValue")+": 50"),trigger:"blur"}],connectFactor:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:i["a"].numMin(0,this.$t("base.valid.gtZeroNum"),!1,!1),trigger:"blur"},{validator:i["a"].numMax(1,this.$t("base.valid.maxNumberValue")+": 1",!0,!1),trigger:"blur"}]}}},created:function(){this.getConfig()},methods:{getConfig:function(){var e=this;this.validNode()&&(this.disabled=!0,this.$_api.getStarted.getP2PConfig({id:this.opNodeId},(function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t||(e.disabled=!1,e.initForm(a))})))},initForm:function(e){this.form={id:this.opNodeId,maxActiveNodes:e.node_maxActiveNodes,maxActiveNodesWithSameIp:e.node_maxActiveNodesWithSameIp,activeConnectFactor:e.node_activeConnectFactor,connectFactor:e.node_connectFactor}},handleSubmit:function(){var e=this;this.$refs["p2p-config-form"].validate((function(t){if(t){var a={id:e.opNodeId,maxActiveNodes:Number(e.form.maxActiveNodes),maxActiveNodesWithSameIp:Number(e.form.maxActiveNodesWithSameIp),activeConnectFactor:Number(e.form.activeConnectFactor),connectFactor:Number(e.form.connectFactor)};e.loading=!0,e.$_api.getStarted.setP2PConfig(a,(function(t){e.loading=!1,t||(e.$notify.success({title:e.$t("base.successful"),message:e.$t("nodeConfig.p2pSaveSuccess")}),e.$emit("next-step"))}))}}))},validNode:function(){return!!/\d+/.test(this.opNodeId)||(this.$notify.warning({title:this.$t("base.warning"),message:this.$t("nodeConfig.opUnValidNode")}),!1)},handleCancel:function(){this.$emit("prev-step")}}},s=o,c=(a("b18e"),a("2877")),u=Object(c["a"])(s,n,r,!1,null,"0b481ec8",null);t["default"]=u.exports},a9e3:function(e,t,a){"use strict";var n=a("83ab"),r=a("da84"),i=a("94ca"),o=a("6eeb"),s=a("5135"),c=a("c6b6"),u=a("7156"),l=a("c04e"),d=a("d039"),m=a("7c73"),f=a("241c").f,p=a("06cf").f,v=a("9bf2").f,b=a("58a8").trim,g="Number",h=r[g],N=h.prototype,x=c(m(N))==g,I=function(e){var t,a,n,r,i,o,s,c,u=l(e,!1);if("string"==typeof u&&u.length>2)if(u=b(u),t=u.charCodeAt(0),43===t||45===t){if(a=u.charCodeAt(2),88===a||120===a)return NaN}else if(48===t){switch(u.charCodeAt(1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+u}for(i=u.slice(2),o=i.length,s=0;s<o;s++)if(c=i.charCodeAt(s),c<48||c>r)return NaN;return parseInt(i,n)}return+u};if(i(g,!h(" 0o1")||!h("0b1")||h("+0x1"))){for(var $,A=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof A&&(x?d((function(){N.valueOf.call(a)})):c(a)!=g)?u(new h(I(t)),a,A):I(t)},C=n?f(h):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),y=0;C.length>y;y++)s(h,$=C[y])&&!s(A,$)&&v(A,$,p(h,$));A.prototype=N,N.constructor=A,o(r,g,A)}},b18e:function(e,t,a){"use strict";var n=a("64f0"),r=a.n(n);r.a}}]);
//# sourceMappingURL=chunk-ab367a5c.74aedd34.js.map