(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-11dc68d1"],{1276:function(e,t,n){"use strict";var o=n("d784"),r=n("44e7"),i=n("825a"),a=n("1d80"),s=n("4840"),l=n("8aa5"),c=n("50c4"),d=n("14c3"),p=n("9263"),u=n("d039"),f=[].push,m=Math.min,g=4294967295,v=!u((function(){return!RegExp(g,"y")}));o("split",2,(function(e,t,n){var o;return o="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,n){var o=String(a(this)),i=void 0===n?g:n>>>0;if(0===i)return[];if(void 0===e)return[o];if(!r(e))return t.call(o,e,i);var s,l,c,d=[],u=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),m=0,v=new RegExp(e.source,u+"g");while(s=p.call(v,o)){if(l=v.lastIndex,l>m&&(d.push(o.slice(m,s.index)),s.length>1&&s.index<o.length&&f.apply(d,s.slice(1)),c=s[0].length,m=l,d.length>=i))break;v.lastIndex===s.index&&v.lastIndex++}return m===o.length?!c&&v.test("")||d.push(""):d.push(o.slice(m)),d.length>i?d.slice(0,i):d}:"0".split(void 0,0).length?function(e,n){return void 0===e&&0===n?[]:t.call(this,e,n)}:t,[function(t,n){var r=a(this),i=void 0==t?void 0:t[e];return void 0!==i?i.call(t,r,n):o.call(String(r),t,n)},function(e,r){var a=n(o,e,this,r,o!==t);if(a.done)return a.value;var p=i(e),u=String(this),f=s(p,RegExp),_=p.unicode,b=(p.ignoreCase?"i":"")+(p.multiline?"m":"")+(p.unicode?"u":"")+(v?"y":"g"),h=new f(v?p:"^(?:"+p.source+")",b),x=void 0===r?g:r>>>0;if(0===x)return[];if(0===u.length)return null===d(h,u)?[u]:[];var $=0,I=0,C=[];while(I<u.length){h.lastIndex=v?I:0;var y,w=d(h,v?u:u.slice(I));if(null===w||(y=m(c(h.lastIndex+(v?0:I)),u.length))===$)I=l(u,I,_);else{if(C.push(u.slice($,I)),C.length===x)return C;for(var N=1;N<=w.length-1;N++)if(C.push(w[N]),C.length===x)return C;I=$=y}}return C.push(u.slice($)),C}]}),!v)},"30de":function(e,t,n){"use strict";var o=n("36b5"),r=n.n(o);r.a},"36b5":function(e,t,n){},"498a":function(e,t,n){"use strict";var o=n("23e7"),r=n("58a8").trim,i=n("e070");o({target:"String",proto:!0,forced:i("trim")},{trim:function(){return r(this)}})},"56e3":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"box-view p2p-config"},[n("div",{staticClass:"box-body"},[n("el-form",{ref:"p2p-config-form",staticClass:"im-form",attrs:{rules:e.formRules,model:e.form,"label-position":"top"}},[n("el-form-item",{attrs:{prop:"node_p2p_version",label:"p2pVersion"}},[n("span",{attrs:{slot:"label"},slot:"label"},[e._v("p2pVersion "),n("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.p2pVersion"))+")")])]),n("el-input",{attrs:{type:"number",maxlength:50,placeholder:e.$t("base.pleaseInput")},model:{value:e.form.node_p2p_version,callback:function(t){e.$set(e.form,"node_p2p_version","string"===typeof t?t.trim():t)},expression:"form.node_p2p_version"}})],1),n("el-form-item",{attrs:{label:"listenPort",prop:"node_listen_port"}},[n("span",{attrs:{slot:"label"},slot:"label"},[e._v("listenPort "),n("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.listenPort"))+")")])]),n("el-input",{attrs:{maxlength:50,placeholder:e.$t("base.pleaseInput")},model:{value:e.form.node_listen_port,callback:function(t){e.$set(e.form,"node_listen_port","string"===typeof t?t.trim():t)},expression:"form.node_listen_port"}})],1),n("el-form-item",{staticClass:"seed-node-list",attrs:{label:"seedNodeList",prop:"seed_node_ip_list"}},[n("span",{attrs:{slot:"label"},slot:"label"},[e._v("seedNodeList "),n("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.seedNodeList"))+")")])]),n("el-checkbox-group",{model:{value:e.form.seed_node_ip_list,callback:function(t){e.$set(e.form,"seed_node_ip_list",t)},expression:"form.seed_node_ip_list"}},e._l(e.seedNodeIpList,(function(t,o){return n("el-checkbox",{key:o,staticClass:"checkBox",attrs:{label:t}},[n("el-input",{attrs:{placeholder:e.$t("configuration.valid.listenPort"),disabled:""},model:{value:e.form.node_listen_port,callback:function(t){e.$set(e.form,"node_listen_port",t)},expression:"form.node_listen_port"}},[n("template",{staticStyle:{width:"100px"},slot:"prepend"},[e._v(e._s(t))])],2)],1)})),1)],1),n("div",{staticClass:"more-form"},[n("el-button",{attrs:{type:"text"},on:{click:function(t){e.showMore=!e.showMore}}},[n("i",{staticClass:"el-icon-arrow-right"}),e._v(" "+e._s(e.$t("configuration.moreSetting")))])],1),n("el-collapse-transition",[e.showMore?n("div",[n("el-form-item",{attrs:{label:"maxActiveNodes",prop:"node_maxActiveNodes"}},[n("span",{attrs:{slot:"label"},slot:"label"},[e._v("maxActiveNodes "),n("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.maxActiveNodes"))+")")])]),n("el-input",{attrs:{maxlength:50,placeholder:e.$t("base.pleaseInput")},model:{value:e.form.node_maxActiveNodes,callback:function(t){e.$set(e.form,"node_maxActiveNodes","string"===typeof t?t.trim():t)},expression:"form.node_maxActiveNodes"}})],1),n("el-form-item",{attrs:{label:"maxActiveNodesWithSameIp",prop:"node_maxActiveNodesWithSameIp"}},[n("span",{attrs:{slot:"label"},slot:"label"},[e._v("maxActiveNodesWithSameIp "),n("i",{staticClass:"help-tips"},[e._v("("+e._s(e.$t("configuration.helpTips.maxActiveNodesWithSameIp"))+")")])]),n("el-input",{attrs:{maxlength:50,placeholder:e.$t("base.pleaseInput")},model:{value:e.form.node_maxActiveNodesWithSameIp,callback:function(t){e.$set(e.form,"node_maxActiveNodesWithSameIp","string"===typeof t?t.trim():t)},expression:"form.node_maxActiveNodesWithSameIp"}})],1),n("el-form-item",{attrs:{label:"activeConnectFactor",prop:"node_activeConnectFactor"}},[n("span",{attrs:{slot:"label"},slot:"label"},[e._v("activeConnectFactor")]),n("el-input-number",{attrs:{"controls-position":"right",min:0,step:.1,maxlength:50,placeholder:e.$t("base.pleaseInput")},model:{value:e.form.node_activeConnectFactor,callback:function(t){e.$set(e.form,"node_activeConnectFactor","string"===typeof t?t.trim():t)},expression:"form.node_activeConnectFactor"}})],1),n("el-form-item",{attrs:{label:"connectFactor",prop:"node_connectFactor"}},[n("span",{attrs:{slot:"label"},slot:"label"},[e._v("connectFactor")]),n("el-input-number",{attrs:{"controls-position":"right",min:0,step:.1,maxlength:50,placeholder:e.$t("base.pleaseInput")},model:{value:e.form.node_connectFactor,callback:function(t){e.$set(e.form,"node_connectFactor","string"===typeof t?t.trim():t)},expression:"form.node_connectFactor"}})],1)],1):e._e()])],1)],1),n("div",{staticClass:"box-footer align-right"},[n("el-button",{staticClass:"im-button large",on:{click:e.handleCancel}},[e._v(e._s(e.$t("base.prevStep")))]),n("el-button",{staticClass:"im-button large",attrs:{loading:e.loading,disabled:e.configLoading,type:"primary"},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.nextStep")))])],1)])},r=[],i=(n("a4d3"),n("4de4"),n("d81d"),n("e439"),n("dbb4"),n("b64b"),n("ac1f"),n("1276"),n("159b"),n("ade3")),a=n("61f7");function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){Object(i["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var c={name:"p2p-config",props:{initConfigInfo:{type:Function,required:!0},configLoading:Boolean},data:function(){return{showMore:!1,moreSetting:!1,form:{seed_node_ip_list:[],node_p2p_version:"",node_listen_port:"",node_maxActiveNodes:"",node_maxActiveNodesWithSameIp:"",node_connectFactor:"",node_activeConnectFactor:""},seedNodeIpList:[],loading:!1}},computed:{formRules:function(){var e=this,t=function(t,n,o){Object(a["b"])(n)?o():o(new Error(e.$t("configuration.valid.gteZeroInt")))},n=function(t,n,o){n>2147483647?o(new Error(e.$t("configuration.valid.maxNumberValue"))):o()},o=function(t,n,o){11111==n?o(new Error(e.$t("configuration.valid.mainnetPlaceholder"))):o()},r=function(t,n,o){20180622==n?o(new Error(e.$t("configuration.valid.testnetPlaceholder"))):o()},i=function(t,n,o){1==n?o(new Error(e.$t("configuration.valid.specialPlaceholder"))):o()},s=function(t,n,o){n>65535?o(new Error(e.$t("configuration.valid.maxPortValue"))):o()},l=function(t,n,o){Object(a["d"])(n)?o():o(new Error(e.$t("configuration.valid.validTwoDecimal")))},c={node_p2p_version:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:t,trigger:"blur"},{validator:o,trigger:"blur"},{validator:r,trigger:"blur"},{validator:i,trigger:"blur"},{validator:n,trigger:"blur"}],node_listen_port:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:t,trigger:"blur"},{validator:s,trigger:"blur"}],seed_node_ip_list:[{required:!0,message:this.$t("base.pleaseSelect"),trigger:"change"}],node_maxActiveNodes:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:t,trigger:"blur"},{validator:n,trigger:"blur"}],node_maxActiveNodesWithSameIp:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:t,trigger:"blur"},{validator:n,trigger:"blur"}],node_activeConnectFactor:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:n,trigger:"blur"},{validator:l,trigger:"blur"}],node_connectFactor:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:n,trigger:"blur"},{validator:l,trigger:"blur"}]};return c}},created:function(){this.getConfigInfo()},methods:{getConfigInfo:function(){var e=this;this.initConfigInfo().then((function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.seed_node_ip_list||[],o=n.map((function(e){return e.split(":")[0]}));e.seedNodeIpList=t.allNodes||[],e.form=l({},e.form,{},t,{seed_node_ip_list:o})}))},handleSubmit:function(){var e=this;this.$refs["p2p-config-form"].validate((function(t){if(t){var n={p2pVersion:e.form.node_p2p_version,listenPort:e.form.node_listen_port,seed_node_ip_list:e.form.seed_node_ip_list.map((function(t){return t+'":"'+e.form.node_listen_port})),maxActiveNodes:e.form.node_maxActiveNodes,nodeActiveConnectFactor:e.form.node_activeConnectFactor,nodeMaxActiveNodesWithSameIp:e.form.node_maxActiveNodesWithSameIp,connectFactor:e.form.node_connectFactor};e.loading=!0,e.$_api.configuration.p2pConfig(n,(function(t){e.loading=!1,t||(e.$notify({type:"success",title:e.$t("base.successful"),message:e.$t("configuration.p2pSaveSuccess")}),e.$emit("next-step"))}))}}))},handleCancel:function(){this.$emit("prev-step")}}},d=c,p=(n("30de"),n("2877")),u=Object(p["a"])(d,o,r,!1,null,"2ae49906",null);t["default"]=u.exports},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,n){var o=n("1d80"),r=n("5899"),i="["+r+"]",a=RegExp("^"+i+i+"*"),s=RegExp(i+i+"*$"),l=function(e){return function(t){var n=String(o(t));return 1&e&&(n=n.replace(a,"")),2&e&&(n=n.replace(s,"")),n}};e.exports={start:l(1),end:l(2),trim:l(3)}},"61f7":function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return r})),n.d(t,"d",(function(){return i})),n.d(t,"a",(function(){return a}));n("c975"),n("498a");function o(e){var t=/^[0-9]*[1-9][0-9]*$/;return t.test(e)}function r(e){var t=/^\d+$/;return t.test(e)}function i(e){var t=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;return t.test(e)}function a(e){var t=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;return t.test(e)}},e070:function(e,t,n){var o=n("d039"),r=n("5899"),i="​᠎";e.exports=function(e){return o((function(){return!!r[e]()||i[e]()!=i||r[e].name!==e}))}}}]);
//# sourceMappingURL=chunk-11dc68d1.0569dc06.js.map