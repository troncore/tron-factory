(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-54e139e2"],{1276:function(e,t,n){"use strict";var i=n("d784"),r=n("44e7"),o=n("825a"),a=n("1d80"),s=n("4840"),l=n("8aa5"),c=n("50c4"),u=n("14c3"),d=n("9263"),p=n("d039"),m=[].push,f=Math.min,v=4294967295,g=!p((function(){return!RegExp(v,"y")}));i("split",2,(function(e,t,n){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,n){var i=String(a(this)),o=void 0===n?v:n>>>0;if(0===o)return[];if(void 0===e)return[i];if(!r(e))return t.call(i,e,o);var s,l,c,u=[],p=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),f=0,g=new RegExp(e.source,p+"g");while(s=d.call(g,i)){if(l=g.lastIndex,l>f&&(u.push(i.slice(f,s.index)),s.length>1&&s.index<i.length&&m.apply(u,s.slice(1)),c=s[0].length,f=l,u.length>=o))break;g.lastIndex===s.index&&g.lastIndex++}return f===i.length?!c&&g.test("")||u.push(""):u.push(i.slice(f)),u.length>o?u.slice(0,o):u}:"0".split(void 0,0).length?function(e,n){return void 0===e&&0===n?[]:t.call(this,e,n)}:t,[function(t,n){var r=a(this),o=void 0==t?void 0:t[e];return void 0!==o?o.call(t,r,n):i.call(String(r),t,n)},function(e,r){var a=n(i,e,this,r,i!==t);if(a.done)return a.value;var d=o(e),p=String(this),m=s(d,RegExp),b=d.unicode,h=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(g?"y":"g"),_=new m(g?d:"^(?:"+d.source+")",h),x=void 0===r?v:r>>>0;if(0===x)return[];if(0===p.length)return null===u(_,p)?[p]:[];var $=0,y=0,I=[];while(y<p.length){_.lastIndex=g?y:0;var N,w=u(_,g?p:p.slice(y));if(null===w||(N=f(c(_.lastIndex+(g?0:y)),p.length))===$)y=l(p,y,b);else{if(I.push(p.slice($,y)),I.length===x)return I;for(var C=1;C<=w.length-1;C++)if(I.push(w[C]),I.length===x)return I;y=$=N}}return I.push(p.slice($)),I}]}),!g)},"56e3":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"box-view p2p-config"},[n("div",{staticClass:"box-body"},[n("el-form",{ref:"p2p-config-form",staticClass:"im-form",attrs:{rules:e.formRules,model:e.form,"label-position":"top"}},[n("el-form-item",{attrs:{prop:"node_p2p_version"}},[n("span",{attrs:{slot:"label"},slot:"label"},[e._v("p2pVersion "),n("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.p2pVersion"))+")")])]),n("el-input",{attrs:{type:"number",min:"0",max:"2147483647",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.node_p2p_version,callback:function(t){e.$set(e.form,"node_p2p_version","string"===typeof t?t.trim():t)},expression:"form.node_p2p_version"}})],1),n("el-form-item",{attrs:{prop:"node_listen_port"}},[n("span",{attrs:{slot:"label"},slot:"label"},[e._v("listenPort "),n("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.listenPort"))+")")])]),n("el-input",{attrs:{type:"number",min:"0",max:"65535",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.node_listen_port,callback:function(t){e.$set(e.form,"node_listen_port","string"===typeof t?t.trim():t)},expression:"form.node_listen_port"}})],1),n("el-form-item",{staticClass:"seed-node-list",attrs:{prop:"seed_node_ip_list"}},[n("span",{attrs:{slot:"label"},slot:"label"},[e._v("seedNodeList "),n("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.seedNodeList"))+")")])]),n("el-checkbox-group",{model:{value:e.form.seed_node_ip_list,callback:function(t){e.$set(e.form,"seed_node_ip_list",t)},expression:"form.seed_node_ip_list"}},e._l(e.seedNodeIpList,(function(t,i){return n("el-checkbox",{key:i,staticClass:"checkBox",attrs:{label:t}},[n("el-input",{attrs:{placeholder:e.$t("configuration.valid.listenPort"),disabled:""},model:{value:e.form.node_listen_port,callback:function(t){e.$set(e.form,"node_listen_port",t)},expression:"form.node_listen_port"}},[n("template",{staticStyle:{width:"100px"},slot:"prepend"},[e._v(e._s(t))])],2)],1)})),1)],1),n("div",{staticClass:"more-form"},[n("el-button",{attrs:{type:"text"},on:{click:function(t){e.showMore=!e.showMore}}},[n("i",{staticClass:"el-icon-arrow-right"}),e._v(" "+e._s(e.$t("configuration.moreSetting")))])],1),n("el-collapse-transition",[e.showMore?n("div",[n("el-form-item",{attrs:{prop:"node_maxActiveNodes"}},[n("span",{attrs:{slot:"label"},slot:"label"},[e._v("maxActiveNodes "),n("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.maxActiveNodes"))+")")])]),n("el-input",{attrs:{type:"number",min:"0",max:"200",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.node_maxActiveNodes,callback:function(t){e.$set(e.form,"node_maxActiveNodes","string"===typeof t?t.trim():t)},expression:"form.node_maxActiveNodes"}})],1),n("el-form-item",{attrs:{prop:"node_maxActiveNodesWithSameIp"}},[n("span",{attrs:{slot:"label"},slot:"label"},[e._v("maxActiveNodesWithSameIp "),n("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.maxActiveNodesWithSameIp"))+")")])]),n("el-input",{attrs:{type:"number",min:"0",max:"50",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.node_maxActiveNodesWithSameIp,callback:function(t){e.$set(e.form,"node_maxActiveNodesWithSameIp","string"===typeof t?t.trim():t)},expression:"form.node_maxActiveNodesWithSameIp"}})],1),n("el-form-item",{attrs:{prop:"node_activeConnectFactor"}},[n("span",{attrs:{slot:"label"},slot:"label"},[e._v("activeConnectFactor")]),n("el-input",{attrs:{type:"number",min:"0",max:"1",step:"0.1",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.node_activeConnectFactor,callback:function(t){e.$set(e.form,"node_activeConnectFactor","string"===typeof t?t.trim():t)},expression:"form.node_activeConnectFactor"}})],1),n("el-form-item",{attrs:{prop:"node_connectFactor"}},[n("span",{attrs:{slot:"label"},slot:"label"},[e._v("connectFactor")]),n("el-input",{attrs:{type:"number",min:"0",max:"1",step:"0.1",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.node_connectFactor,callback:function(t){e.$set(e.form,"node_connectFactor","string"===typeof t?t.trim():t)},expression:"form.node_connectFactor"}})],1)],1):e._e()])],1)],1),n("div",{staticClass:"box-footer align-right"},[n("el-button",{staticClass:"im-button large",on:{click:e.handleCancel}},[e._v(e._s(e.$t("base.prevStep")))]),n("el-button",{staticClass:"im-button large",attrs:{loading:e.loading,disabled:e.configLoading,type:"primary"},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.nextStep")))])],1)])},r=[],o=(n("a4d3"),n("4de4"),n("d81d"),n("e439"),n("dbb4"),n("b64b"),n("ac1f"),n("1276"),n("159b"),n("ade3")),a=n("61f7");function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){Object(o["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var c={name:"p2p-config",props:{initConfigInfo:{type:Function,required:!0},configLoading:Boolean},data:function(){return{showMore:!1,moreSetting:!1,form:{seed_node_ip_list:[],node_p2p_version:"",node_listen_port:"",node_maxActiveNodes:"",node_maxActiveNodesWithSameIp:"",node_connectFactor:"",node_activeConnectFactor:""},seedNodeIpList:[],loading:!1}},computed:{formRules:function(){return{node_p2p_version:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:a["a"].numMin(0,this.$t("base.valid.gtZeroInt"),!1),trigger:"blur"},{validator:a["a"].numMax(2147483647,this.$t("base.valid.maxNumberValue")+": 2147483647"),trigger:"blur"},{validator:a["a"].numEqual(11111,this.$t("configuration.valid.mainnetPlaceholder")+": 11111"),trigger:"blur"},{validator:a["a"].numEqual(20180622,this.$t("configuration.valid.testnetPlaceholder")+": 20180622"),trigger:"blur"},{validator:a["a"].numEqual(1,this.$t("configuration.valid.specialPlaceholder")+": 1"),trigger:"blur"}],node_listen_port:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:a["a"].numMin(0,this.$t("base.valid.gtZeroInt"),!1),trigger:"blur"},{validator:a["a"].numMax(65535,this.$t("base.valid.maxPortValue")),trigger:"blur"}],seed_node_ip_list:[{required:!0,message:this.$t("base.pleaseSelect"),trigger:"change"}],node_maxActiveNodes:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:a["a"].numMin(0,this.$t("base.valid.gtZeroInt"),!1),trigger:"blur"},{validator:a["a"].numMax(200,this.$t("base.valid.maxNumberValue")+": 200"),trigger:"blur"}],node_maxActiveNodesWithSameIp:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:a["a"].numMin(0,this.$t("base.valid.gtZeroInt"),!1),trigger:"blur"},{validator:a["a"].numMax(50,this.$t("base.valid.maxNumberValue")+": 50"),trigger:"blur"}],node_activeConnectFactor:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:a["a"].numMin(0,this.$t("base.valid.gtZeroNum"),!1,!1),trigger:"blur"},{validator:a["a"].numMax(1,this.$t("base.valid.maxNumberValue")+": 1",!0,!1),trigger:"blur"}],node_connectFactor:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:a["a"].numMin(0,this.$t("base.valid.gtZeroNum"),!1,!1),trigger:"blur"},{validator:a["a"].numMax(1,this.$t("base.valid.maxNumberValue")+": 1",!0,!1),trigger:"blur"}]}}},created:function(){this.getConfigInfo()},methods:{getConfigInfo:function(){var e=this;this.initConfigInfo().then((function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.seed_node_ip_list||[],i=n.map((function(e){return e.split(":")[0]}));e.seedNodeIpList=t.allNodes||[],e.form=l({},e.form,{},t,{seed_node_ip_list:i})}))},handleSubmit:function(){var e=this;this.$refs["p2p-config-form"].validate((function(t){if(t){var n={p2pVersion:e.form.node_p2p_version,listenPort:e.form.node_listen_port,seed_node_ip_list:e.form.seed_node_ip_list.map((function(t){return t+'":"'+e.form.node_listen_port})),maxActiveNodes:e.form.node_maxActiveNodes,nodeActiveConnectFactor:e.form.node_activeConnectFactor,nodeMaxActiveNodesWithSameIp:e.form.node_maxActiveNodesWithSameIp,connectFactor:e.form.node_connectFactor};e.loading=!0,e.$_api.configuration.p2pConfig(n,(function(t){e.loading=!1,t||(e.$notify({type:"success",title:e.$t("base.successful"),message:e.$t("configuration.p2pSaveSuccess")}),e.$emit("next-step"))}))}}))},handleCancel:function(){this.$emit("prev-step")}}},u=c,d=(n("b6f0"),n("2877")),p=Object(d["a"])(u,i,r,!1,null,"1150e9b3",null);t["default"]=p.exports},"61f7":function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}n.d(t,"a",(function(){return c}));var a=function(){function e(){i(this,e)}return o(e,[{key:"isNumber",value:function(e){return/^\d+(\.\d+)?$/.test(e)}},{key:"isInteger",value:function(e){return/^\d+$/.test(e)}},{key:"isTwoDecimal",value:function(e){return/^([1-9]\d*|0)(\.\d{1,2})$/.test(e)}},{key:"isIP",value:function(e){return/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(e)}}]),e}(),s=new a,l=function(){function e(){i(this,e)}return o(e,[{key:"validIP",value:function(e){return function(t,n,i){var r=!1;s.isIP(n)||(r=!0),r?i(new Error(e)):i()}}},{key:"numEqual",value:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(i,r,o){var a=!1;s.isNumber(r)?r==e?a=!0:n||r==e||(a=!0):a=!0,a?o(new Error(t)):o()}}},{key:"numMin",value:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(r,o,a){var l=!1;s.isNumber(o)?i&&!s.isInteger(o)?l=!0:o<e?l=!0:n||o!=e||(l=!0):l=!0,l?a(new Error(t)):a()}}},{key:"numMax",value:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(r,o,a){var l=!1;s.isNumber(o)?i&&!s.isInteger(o)?l=!0:o>e?l=!0:n||o!=e||(l=!0):l=!0,l?a(new Error(t)):a()}}},{key:"numTwoDecimal",value:function(e){return function(t,n,i){var r=!1;s.isTwoDecimal(n)||(r=!0),r?i(new Error(e)):i()}}}]),e}(),c=new l},b6f0:function(e,t,n){"use strict";var i=n("f0e5"),r=n.n(i);r.a},f0e5:function(e,t,n){}}]);
//# sourceMappingURL=chunk-54e139e2.6eff0281.js.map