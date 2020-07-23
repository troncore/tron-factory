(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d5c5e7da"],{"5a5f":function(t,e,o){"use strict";o.r(e);var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"box-view  network-config"},[o("div",{staticClass:"box-body"},[o("el-form",{ref:"network-config-form",staticClass:"im-form",attrs:{rules:t.formRules,model:t.form}},[o("div",{staticClass:"switch-item"},[o("span",{staticClass:"label"},[t._v("fullNodeEnable ")]),o("el-switch",{model:{value:t.form.fullNodeEnable,callback:function(e){t.$set(t.form,"fullNodeEnable",e)},expression:"form.fullNodeEnable"}})],1),o("el-form-item",{attrs:{prop:"httpFullNodePort"}},[o("span",{attrs:{slot:"label"},slot:"label"},[t._v("httpFullNodePort "),o("i",{staticClass:"help-tips"},[t._v("("+t._s(t.$t("nodeConfig.helpTips.httpFullNodePort"))+")")])]),o("el-input",{attrs:{type:"number",min:"1",max:"65535",disabled:!t.form.fullNodeEnable,clearable:"",placeholder:t.$t("base.pleaseInput")},model:{value:t.form.httpFullNodePort,callback:function(e){t.$set(t.form,"httpFullNodePort","string"===typeof e?e.trim():e)},expression:"form.httpFullNodePort"}})],1),o("el-form-item",{attrs:{prop:"maxHttpConnectNumber"}},[o("span",{attrs:{slot:"label"},slot:"label"},[t._v("maxHttpConnectNumber "),o("i",{staticClass:"help-tips"},[t._v("("+t._s(t.$t("nodeConfig.helpTips.maxHttpConnectNumber")+": 0 - 200")+")")])]),o("el-input",{attrs:{type:"number",min:"0",max:"200",disabled:!t.form.fullNodeEnable,clearable:"",placeholder:t.$t("base.pleaseInput")},model:{value:t.form.maxHttpConnectNumber,callback:function(e){t.$set(t.form,"maxHttpConnectNumber","string"===typeof e?e.trim():e)},expression:"form.maxHttpConnectNumber"}})],1),o("div",{staticClass:"switch-item"},[o("span",{staticClass:"label"},[t._v("solidityEnable")]),o("el-switch",{model:{value:t.form.solidityEnable,callback:function(e){t.$set(t.form,"solidityEnable",e)},expression:"form.solidityEnable"}})],1),o("el-form-item",{attrs:{prop:"httpSolidityPort"}},[o("span",{attrs:{slot:"label"},slot:"label"},[t._v("httpSolidityPort "),o("i",{staticClass:"help-tips"},[t._v("("+t._s(t.$t("nodeConfig.helpTips.httpSolidityPort"))+")")])]),o("el-input",{attrs:{type:"number",min:"1",max:"65535",disabled:!t.form.solidityEnable,clearable:"",placeholder:t.$t("base.pleaseInput")},model:{value:t.form.httpSolidityPort,callback:function(e){t.$set(t.form,"httpSolidityPort","string"===typeof e?e.trim():e)},expression:"form.httpSolidityPort"}})],1),o("el-form-item",{attrs:{prop:"rpcPort"}},[o("span",{attrs:{slot:"label"},slot:"label"},[t._v("rpcPort "),o("i",{staticClass:"help-tips"},[t._v("("+t._s(t.$t("nodeConfig.helpTips.rpcPort"))+")")])]),o("el-input",{attrs:{type:"number",min:"1",max:"65535",clearable:"",placeholder:t.$t("base.pleaseInput")},model:{value:t.form.rpcPort,callback:function(e){t.$set(t.form,"rpcPort","string"===typeof e?e.trim():e)},expression:"form.rpcPort"}})],1),o("el-form-item",{staticClass:"margin-bottom-0",attrs:{prop:"rpcSolidityPort"}},[o("span",{attrs:{slot:"label"},slot:"label"},[t._v("rpcSolidityPort "),o("i",{staticClass:"help-tips"},[t._v("("+t._s(t.$t("nodeConfig.helpTips.rpcSolidityPort"))+")")])]),o("el-input",{attrs:{type:"number",min:"1",max:"65535",clearable:"",placeholder:t.$t("base.pleaseInput")},model:{value:t.form.rpcSolidityPort,callback:function(e){t.$set(t.form,"rpcSolidityPort","string"===typeof e?e.trim():e)},expression:"form.rpcSolidityPort"}})],1)],1)],1),o("div",{staticClass:"box-footer"},[o("el-button",{staticClass:"im-button large",attrs:{loading:t.loading,disabled:t.disabled,type:"primary"},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("base.nextStep")))]),o("el-button",{staticClass:"im-button large",on:{click:t.handleCancel}},[t._v(t._s(t.$t("base.prevStep")))])],1)])},i=[],l=(o("99af"),o("a9e3"),o("2909")),n=o("61f7"),a={name:"network-config",data:function(){return{form:{id:"",fullNodeEnable:!0,httpFullNodePort:"",maxHttpConnectNumber:"",solidityEnable:!0,httpSolidityPort:"",rpcPort:"",rpcSolidityPort:""},disabled:!0,loading:!1}},computed:{opNodeId:function(){var t=this.$route.query.id;return/\d+/.test(t)?Number(t):void 0},formRules:function(){var t=[{validator:n["a"].numMin(0,this.$t("base.valid.gtZeroInt"),!1),trigger:"blur"},{validator:n["a"].numMax(65535,this.$t("base.valid.maxPortValue")),trigger:"blur"}],e=[{validator:n["a"].numMin(0,this.$t("base.valid.gteZeroInt")),trigger:"blur"},{validator:n["a"].numMax(200,this.$t("base.valid.maxNumberValue")+": 200"),trigger:"blur"}];return{httpFullNodePort:[{required:this.form.fullNodeEnable,message:this.$t("base.pleaseInput"),trigger:"blur"}].concat(Object(l["a"])(this.form.fullNodeEnable?t:[])),maxHttpConnectNumber:[{required:this.form.fullNodeEnable,message:this.$t("base.pleaseInput"),trigger:"blur"}].concat(Object(l["a"])(this.form.fullNodeEnable?e:[])),httpSolidityPort:[{required:this.form.solidityEnable,message:this.$t("base.pleaseInput"),trigger:"blur"}].concat(Object(l["a"])(this.form.solidityEnable?t:[])),rpcPort:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}].concat(t),rpcSolidityPort:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}].concat(t)}}},created:function(){this.getConfig()},methods:{getConfig:function(){var t=this;this.validNode()&&(this.disabled=!0,this.$_api.getStarted.getNetworkConfig({id:this.opNodeId},(function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e||(t.disabled=!1,t.initForm(o))})))},initForm:function(t){this.form={id:this.opNodeId,fullNodeEnable:t.node_http_fullNodeEnable,httpFullNodePort:t.node_http_fullNodePort,maxHttpConnectNumber:t.node_maxHttpConnectNumber,solidityEnable:t.node_http_solidityEnable,httpSolidityPort:t.node_http_solidityPort,rpcPort:t.node_rpc_port,rpcSolidityPort:t.node_rpc_solidityPort}},handleSubmit:function(){var t=this;this.$refs["network-config-form"].validate((function(e){if(e){var o={id:t.opNodeId,fullNodeEnable:t.form.fullNodeEnable,httpFullNodePort:t.form.fullNodeEnable?Number(t.form.httpFullNodePort):void 0,maxHttpConnectNumber:t.form.fullNodeEnable?Number(t.form.maxHttpConnectNumber):void 0,solidityEnable:t.form.solidityEnable,httpSolidityPort:t.form.solidityEnable?Number(t.form.httpSolidityPort):void 0,rpcPort:Number(t.form.rpcPort),rpcSolidityPort:Number(t.form.rpcSolidityPort)};t.loading=!0,t.$_api.getStarted.setNetworkConfig(o,(function(e){t.loading=!1,e||(t.$notify.success({title:t.$t("base.successful"),message:t.$t("nodeConfig.networkSaveSuccess")}),t.$emit("next-step"))}))}}))},validNode:function(){return!!/\d+/.test(this.opNodeId)||(this.$notify.warning({title:this.$t("base.warning"),message:this.$t("nodeConfig.opUnValidNode")}),!1)},handleCancel:function(){this.$emit("prev-step")}}},s=a,d=(o("e599"),o("2877")),u=Object(d["a"])(s,r,i,!1,null,null,null);e["default"]=u.exports},"5d45":function(t,e,o){},"61f7":function(t,e,o){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var o=0;o<e.length;o++){var r=e[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t,e,o){return e&&i(t.prototype,e),o&&i(t,o),t}o.d(e,"a",(function(){return d}));var n=function(){function t(){r(this,t)}return l(t,[{key:"isNumber",value:function(t){return/^\d+(\.\d+)?$/.test(t)}},{key:"isInteger",value:function(t){return/^\d+$/.test(t)}},{key:"isTwoDecimal",value:function(t){return/^([1-9]\d*|0)(\.\d{1,2})$/.test(t)}},{key:"isIP",value:function(t){return/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(t)}}]),t}(),a=new n,s=function(){function t(){r(this,t)}return l(t,[{key:"validIP",value:function(t){return function(e,o,r){var i=!1;a.isIP(o)||(i=!0),i?r(new Error(t)):r()}}},{key:"numEqual",value:function(t,e){var o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(r,i,l){var n=!1;a.isNumber(i)?i==t?n=!0:o||i==t||(n=!0):n=!0,n?l(new Error(e)):l()}}},{key:"numMin",value:function(t,e){var o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(i,l,n){var s=!1;a.isNumber(l)?r&&!a.isInteger(l)?s=!0:l<t?s=!0:o||l!=t||(s=!0):s=!0,s?n(new Error(e)):n()}}},{key:"numMax",value:function(t,e){var o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(i,l,n){var s=!1;a.isNumber(l)?r&&!a.isInteger(l)?s=!0:l>t?s=!0:o||l!=t||(s=!0):s=!0,s?n(new Error(e)):n()}}},{key:"numTwoDecimal",value:function(t){return function(e,o,r){var i=!1;a.isTwoDecimal(o)||(i=!0),i?r(new Error(t)):r()}}}]),t}(),d=new s},"99af":function(t,e,o){"use strict";var r=o("23e7"),i=o("d039"),l=o("e8b5"),n=o("861d"),a=o("7b0b"),s=o("50c4"),d=o("8418"),u=o("65f0"),c=o("1dde"),p=o("b622"),f=o("60ae"),m=p("isConcatSpreadable"),b=9007199254740991,h="Maximum allowed index exceeded",v=f>=51||!i((function(){var t=[];return t[m]=!1,t.concat()[0]!==t})),g=c("concat"),y=function(t){if(!n(t))return!1;var e=t[m];return void 0!==e?!!e:l(t)},N=!v||!g;r({target:"Array",proto:!0,forced:N},{concat:function(t){var e,o,r,i,l,n=a(this),c=u(n,0),p=0;for(e=-1,r=arguments.length;e<r;e++)if(l=-1===e?n:arguments[e],y(l)){if(i=s(l.length),p+i>b)throw TypeError(h);for(o=0;o<i;o++,p++)o in l&&d(c,p,l[o])}else{if(p>=b)throw TypeError(h);d(c,p++,l)}return c.length=p,c}})},e599:function(t,e,o){"use strict";var r=o("5d45"),i=o.n(r);i.a}}]);
//# sourceMappingURL=chunk-d5c5e7da.c7707de8.js.map