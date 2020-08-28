(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["node-add-edit"],{1832:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"node-add-edit"},[a("div",{staticClass:"page-title"},[t._v(t._s(t.$t(this.isAddPage?"getStarted.nodesManage.addNode":"getStarted.nodesManage.editNode")))]),a("el-form",{ref:"form",attrs:{rules:t.formRules,model:t.form,size:"medium","label-width":"160px","label-position":"left"}},[a("div",{staticClass:"chain-info im-card"},[a("div",{staticClass:"card-header"},[t._v(t._s(t.$t("getStarted.nodesManage.serverInfo")))]),a("div",{staticClass:"card-body"},[a("el-form-item",{attrs:{prop:"ip"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(t.$t("getStarted.nodesManage.ip")))]),a("el-input",{staticClass:"width-350",attrs:{tabindex:"1",placeholder:t.$t("getStarted.nodesManage.ipPlaceholder"),clearable:""},model:{value:t.form.ip,callback:function(e){t.$set(t.form,"ip","string"===typeof e?e.trim():e)},expression:"form.ip"}})],1),a("el-form-item",{attrs:{prop:"listenPort"}},[a("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("getStarted.nodesManage.listenPort"))+" "),a("im-tooltip",{attrs:{content:t.$t("getStarted.nodesManage.listenPortTips")}})],1),a("el-input",{staticClass:"width-350",attrs:{type:"number",min:"1",max:"65535",tabindex:"2",clearable:""},model:{value:t.form.listenPort,callback:function(e){t.$set(t.form,"listenPort","string"===typeof e?e.trim():e)},expression:"form.listenPort"}})],1)],1),a("div",{staticClass:"card-header"},[t._v(t._s(t.$t("getStarted.nodesManage.sshInfo")))]),a("div",{staticClass:"card-body"},[a("el-form-item",{attrs:{prop:"sshConnectType"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(t.$t("getStarted.nodesManage.sshConnectType")))]),a("el-radio",{attrs:{label:2},model:{value:t.form.sshConnectType,callback:function(e){t.$set(t.form,"sshConnectType",e)},expression:"form.sshConnectType"}},[t._v(t._s(t.$t("getStarted.nodesManage.byPublicKey")))]),a("el-radio",{attrs:{label:1},model:{value:t.form.sshConnectType,callback:function(e){t.$set(t.form,"sshConnectType",e)},expression:"form.sshConnectType"}},[t._v(t._s(t.$t("getStarted.nodesManage.byPassword")))])],1),a("div",{staticClass:"line-item",class:{"margin-bottom-0":2===t.form.sshConnectType}},[a("el-form-item",{staticClass:"inline-block",attrs:{prop:"userName"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(t.$t("getStarted.nodesManage.sshUserName")))]),a("el-input",{staticClass:"width-350",attrs:{tabindex:"3",clearable:""},model:{value:t.form.userName,callback:function(e){t.$set(t.form,"userName","string"===typeof e?e.trim():e)},expression:"form.userName"}})],1),a("el-form-item",{staticClass:"inline-block",attrs:{prop:"port","label-width":"100px"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(t.$t("getStarted.nodesManage.port")))]),a("el-input",{staticClass:"port-item",attrs:{type:"number",min:"1",max:"65535",tabindex:"4",clearable:""},model:{value:t.form.port,callback:function(e){t.$set(t.form,"port","string"===typeof e?e.trim():e)},expression:"form.port"}})],1)],1),1===t.form.sshConnectType?a("el-form-item",{staticClass:"margin-bottom-0",attrs:{prop:"sshPassword"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(t.$t("getStarted.nodesManage.sshPassword")))]),a("el-input",{staticClass:"width-350",attrs:{tabindex:"5",clearable:""},model:{value:t.form.sshPassword,callback:function(e){t.$set(t.form,"sshPassword","string"===typeof e?e.trim():e)},expression:"form.sshPassword"}})],1):t._e()],1)]),a("div",{staticClass:"chain-info im-card"},[a("div",{staticClass:"card-header"},[t._v(t._s(t.$t("getStarted.nodesManage.nodeType")))]),a("div",{staticClass:"card-body"},[a("el-form-item",{class:{"margin-bottom-0":!t.form.isSR},attrs:{prop:"isSR","label-width":"0"}},[a("el-radio",{attrs:{label:!0},model:{value:t.form.isSR,callback:function(e){t.$set(t.form,"isSR",e)},expression:"form.isSR"}},[t._v(t._s(t.$t("getStarted.nodesManage.superNode"))+" "),a("im-tooltip",{attrs:{content:t.$t("getStarted.nodesManage.superNodeTips")}})],1),a("el-radio",{attrs:{label:!1},model:{value:t.form.isSR,callback:function(e){t.$set(t.form,"isSR",e)},expression:"form.isSR"}},[t._v(t._s(t.$t("getStarted.nodesManage.fullNode"))+" "),a("im-tooltip",{attrs:{content:t.$t("getStarted.nodesManage.fullNodeTips")}})],1)],1)],1),t.form.isSR?a("div",{staticClass:"card-header"},[t._v(t._s(t.$t("getStarted.nodesManage.superNodeInfo")))]):t._e(),t.form.isSR?a("div",{staticClass:"card-body"},[a("el-form-item",{attrs:{prop:"url"}},[a("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("getStarted.nodesManage.url"))+" "),a("im-tooltip",{attrs:{content:t.$t("getStarted.nodesManage.urlTips")}})],1),a("el-input",{staticClass:"width-350",attrs:{tabindex:"6",clearable:"",placeholder:"http://"},model:{value:t.form.url,callback:function(e){t.$set(t.form,"url","string"===typeof e?e.trim():e)},expression:"form.url"}})],1),a("el-form-item",{attrs:{prop:"voteCount"}},[a("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("getStarted.nodesManage.voteCount"))+" "),a("im-tooltip",{attrs:{content:t.$t("getStarted.nodesManage.voteCountTips")}})],1),a("el-input",{staticClass:"width-350",attrs:{tabindex:"7",clearable:""},model:{value:t.form.voteCount,callback:function(e){t.$set(t.form,"voteCount","string"===typeof e?e.trim():e)},expression:"form.voteCount"}})],1),a("el-form-item",{attrs:{prop:"publicKey"}},[a("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("getStarted.nodesManage.publicKey"))+" "),a("im-tooltip",{attrs:{content:t.$t("getStarted.nodesManage.publicKeyTips")}})],1),a("div",{staticClass:"address-item"},[a("el-input",{staticClass:"width-350",attrs:{tabindex:"8",clearable:"",placeholder:t.$t("getStarted.nodesManage.publicKeyPlaceholder")},model:{value:t.form.publicKey,callback:function(e){t.$set(t.form,"publicKey","string"===typeof e?e.trim():e)},expression:"form.publicKey"}}),a("el-button",{on:{click:t.handleOneKey}},[t._v(t._s(t.$t("getStarted.nodesManage.oneKey")))])],1)]),a("el-form-item",{staticClass:"margin-bottom-0",attrs:{prop:"privateKey"}},[a("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("getStarted.nodesManage.privateKey"))+" "),a("im-tooltip",{attrs:{content:t.$t("getStarted.nodesManage.privateKeyTips")}})],1),a("el-input",{staticClass:"private-key",attrs:{tabindex:"9",type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:t.$t("getStarted.nodesManage.privateKeyPlaceholder")},model:{value:t.form.privateKey,callback:function(e){t.$set(t.form,"privateKey","string"===typeof e?e.trim():e)},expression:"form.privateKey"}})],1)],1):t._e()])]),a("div",{staticClass:"page-footer align-right"},[a("el-button",{staticClass:"im-button large",on:{click:t.handleCancel}},[t._v(t._s(t.$t("base.cancel")))]),a("el-button",{staticClass:"im-button large",attrs:{type:"primary",disabled:t.disabled,loading:t.loading},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("base.save")))])],1)],1)},s=[],n=(a("99af"),a("cb29"),a("a15b"),a("fb6a"),a("a9e3"),a("8ba4"),a("5530")),i=a("8e6c"),o=a("cf45"),l=a("61f7"),d={name:"node-add-edit",components:{ImTooltip:i["a"]},data:function(){return{form:{ip:"",listenPort:"18888",port:22,sshConnectType:2,userName:"",sshPassword:"",isSR:!0,url:"",voteCount:"1000001",publicKey:"",privateKey:""},nodeInfo:{},tempPublicKey:"",safePrivateKey:Array(64).fill("*").join(""),disabled:!1,loading:!1}},computed:{isAddPage:function(){return"node-add"===this.$route.params.status},opNodeId:function(){var t=this.$route.query.id;return/\d+/.test(t)?Number(t):void 0},formRules:function(){var t=this,e=BigInt(Math.pow(2,63))-BigInt(1),a=function(a,r,s){var n="";/^(-)?\d+$/.test(r)?r<0?n=t.$t("base.valid.gteZeroInt"):BigInt(r)>e&&(n=t.$t("base.valid.maxNumberValue")+": "+e):n=t.$t("base.valid.integer"),n?s(new Error(n)):s()},r=function(e,a,r){64!==a.length?r(new Error(t.$t("getStarted.nodesManage.privateKeyCheck"))):r()},s=function(e,a,r){var s=/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(a),n=/^(([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])$/.test(a);s||n?r():r(new Error(t.$t("getStarted.nodesManage.ipCheckRight")))},n=[{validator:l["a"].numMin(0,this.$t("base.valid.gtZeroInt"),!1),trigger:"change"},{validator:l["a"].numMax(65535,this.$t("base.valid.maxPortValue")),trigger:"change"}];return{ip:[{required:!0,message:" ",trigger:"change"},{validator:s,trigger:"change"}],listenPort:[{required:!0,message:" ",trigger:"change"}].concat(n),userName:[{required:!0,message:" ",trigger:"change"}],port:[{required:!0,message:" ",trigger:"change"}].concat(n),sshPassword:[{required:!0,message:" ",trigger:"change"}],voteCount:[{required:!0,message:" ",trigger:"change"},{validator:a,trigger:"change"}],publicKey:[{required:!0,message:" ",trigger:"change"}],privateKey:[{required:!0,message:" ",trigger:"change"},{required:!0,validator:r,trigger:"change"}]}}},created:function(){this.getNodeInfo()},methods:{getNodeInfo:function(){var t=this;if(this.isAddPage||!this.validNode)return!1;this.form.isSR=!1,this.form.sshConnectType=2,this.disabled=!0,this.$_api.getStarted.getNodeInfo({id:this.opNodeId},(function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e||(t.disabled=!1,t.nodeInfo=a,t.initForm())}))},initForm:function(){var t=this.nodeInfo;this.form={ip:t.ip||"",listenPort:t.listenPort||"",sshConnectType:Number(t.sshConnectType)||1,userName:t.userName||"",port:t.port||22,sshPassword:t.sshPassword||"",isSR:!t.hasOwnProperty("isSR")||Boolean(t.isSR),url:JSON.stringify(t.url).slice(3).slice(0,-3)||"http://",voteCount:t.voteCount||"",publicKey:t.publicKey||"",privateKey:t.publicKey?this.safePrivateKey:""},this.tempPublicKey=t.publicKey},handleSubmit:function(){var t=this;this.$refs["form"].validate((function(e){if(e){var a={};if(!t.initParams(a))return;a.isSR&&(a.publicKey!==t.tempPublicKey||a.privateKey)?t.$confirm(t.$t("getStarted.nodesManage.saveAddressPriKey"),t.$t("base.tips"),{cancelButtonText:t.$t("base.cancel"),confirmButtonText:t.$t("base.confirm"),center:!0,customClass:"im-message-box",cancelButtonClass:"im-message-cancel-button primary",confirmButtonClass:"im-message-confirm-button primary"}).then((function(){return t.addNode(a)})).catch((function(t){return console.log("err: ",t)})):t.addNode(a)}}))},initParams:function(t){if(!this.isAddPage&&!this.validNode)return!1;var e={ip:this.form.ip,listenPort:Number(this.form.listenPort),userName:this.form.userName,port:Number(this.form.port),sshConnectType:this.form.sshConnectType,sshPassword:1===this.form.sshConnectType?this.form.sshPassword:void 0,isSR:this.form.isSR},a={url:'"'.concat(this.form.url,'"'),voteCount:Object(o["b"])(this.form.voteCount),publicKey:this.form.publicKey,privateKey:this.form.privateKey!==this.safePrivateKey?this.form.privateKey:void 0};return Object.assign(t,Object(n["a"])(Object(n["a"])({id:!this.isAddPage&&Number.isInteger(this.opNodeId)?this.opNodeId:void 0},e),e.isSR&&a)),!0},validNode:function(){return!!/\d+/.test(this.opNodeId)||(this.$notify.warning({title:this.$t("base.warning"),message:this.$t("getStarted.nodesManage.opUnValidNode")}),!1)},addNode:function(t){var e=this;this.loading=!0;var a=this.isAddPage?"addNoteInfo":"editNoteInfo";this.$_api.getStarted[a](t,(function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(e.loading=!1,!t)if(a.hasOwnProperty("status")){var r="";switch(a.status){case 1:r="getStarted.nodesManage.sshConnectFail";break;case 2:r="getStarted.nodesManage.addressNotPrivateKey";break;default:r="base.error"}e.$notify.error({title:e.$t("base.error"),message:e.$t(r)})}else{var s=e.isAddPage?"getStarted.nodesManage.addNodeSuccess":"getStarted.nodesManage.updateNodeSuccess";e.$notify.success({title:e.$t("base.successful"),message:e.$t(s)}),e.$router.push("/get-started")}}))},handleCancel:function(){history.back()},handleOneKey:function(){var t=this;this.$_api.getStarted.getOneKey({},(function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e||(t.form.publicKey=a.publicKey,t.form.privateKey=a.privateKey)}))}}},c=d,u=(a("f531"),a("2877")),f=Object(u["a"])(c,r,s,!1,null,"20b63bf4",null);e["default"]=f.exports},"4e26":function(t,e,a){"use strict";var r=a("568a"),s=a.n(r);s.a},"568a":function(t,e,a){},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,a){var r=a("1d80"),s=a("5899"),n="["+s+"]",i=RegExp("^"+n+n+"*"),o=RegExp(n+n+"*$"),l=function(t){return function(e){var a=String(r(e));return 1&t&&(a=a.replace(i,"")),2&t&&(a=a.replace(o,"")),a}};t.exports={start:l(1),end:l(2),trim:l(3)}},"5e89":function(t,e,a){var r=a("861d"),s=Math.floor;t.exports=function(t){return!r(t)&&isFinite(t)&&s(t)===t}},"61f7":function(t,e,a){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var a=0;a<e.length;a++){var r=e[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,e,a){return e&&s(t.prototype,e),a&&s(t,a),t}a.d(e,"a",(function(){return d}));var i=function(){function t(){r(this,t)}return n(t,[{key:"isNumber",value:function(t){return/^\d+(\.\d+)?$/.test(t)}},{key:"isInteger",value:function(t){return/^\d+$/.test(t)}},{key:"isTwoDecimal",value:function(t){return/^([1-9]\d*|0)(\.\d{1,2})$/.test(t)}},{key:"isIP",value:function(t){return/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(t)}}]),t}(),o=new i,l=function(){function t(){r(this,t)}return n(t,[{key:"numEqual",value:function(t,e){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(r,s,n){var i=!1;o.isNumber(s)?s==t?i=!0:a||s==t||(i=!0):i=!0,i?n(new Error(e)):n()}}},{key:"numMin",value:function(t,e){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(s,n,i){var l=!1;o.isNumber(n)?r&&!o.isInteger(n)||n<t?l=!0:a||n!=t||(l=!0):l=!0,l?i(new Error(e)):i()}}},{key:"numMax",value:function(t,e){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(s,n,i){var l=!1;o.isNumber(n)?r&&!o.isInteger(n)||n>t?l=!0:a||n!=t||(l=!0):l=!0,l?i(new Error(e)):i()}}},{key:"numTwoDecimal",value:function(t){return function(e,a,r){var s=!1;o.isTwoDecimal(a)||(s=!0),s?r(new Error(t)):r()}}}]),t}(),d=new l},"6fa6":function(t,e,a){},7156:function(t,e,a){var r=a("861d"),s=a("d2bb");t.exports=function(t,e,a){var n,i;return s&&"function"==typeof(n=e.constructor)&&n!==a&&r(i=n.prototype)&&i!==a.prototype&&s(t,i),t}},"81d5":function(t,e,a){"use strict";var r=a("7b0b"),s=a("23cb"),n=a("50c4");t.exports=function(t){var e=r(this),a=n(e.length),i=arguments.length,o=s(i>1?arguments[1]:void 0,a),l=i>2?arguments[2]:void 0,d=void 0===l?a:s(l,a);while(d>o)e[o++]=t;return e}},"8ba4":function(t,e,a){var r=a("23e7"),s=a("5e89");r({target:"Number",stat:!0},{isInteger:s})},"8e6c":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-tooltip",{attrs:{effect:t.effect,placement:t.placement}},[a("div",{attrs:{slot:"content"},domProps:{innerHTML:t._s(t.content)},slot:"content"}),a("i",{staticClass:"icon-question fa fa-question-circle-o",style:t.myStyle})])},s=[],n={name:"im-tooltip",props:{effect:{type:String,default:"dark"},placement:{type:String,default:"top"},content:{},marginLeft:String,marginRight:String},computed:{myStyle:function(){var t={};return"undefined"!==typeof this.marginLeft&&(t.marginLeft=this.marginLeft),"undefined"!==typeof this.marginRight&&(t.marginRight=this.marginRight),t}}},i=n,o=(a("4e26"),a("2877")),l=Object(o["a"])(i,r,s,!1,null,"cc688580",null);e["a"]=l.exports},"99af":function(t,e,a){"use strict";var r=a("23e7"),s=a("d039"),n=a("e8b5"),i=a("861d"),o=a("7b0b"),l=a("50c4"),d=a("8418"),c=a("65f0"),u=a("1dde"),f=a("b622"),p=a("2d00"),m=f("isConcatSpreadable"),g=9007199254740991,b="Maximum allowed index exceeded",h=p>=51||!s((function(){var t=[];return t[m]=!1,t.concat()[0]!==t})),v=u("concat"),y=function(t){if(!i(t))return!1;var e=t[m];return void 0!==e?!!e:n(t)},$=!h||!v;r({target:"Array",proto:!0,forced:$},{concat:function(t){var e,a,r,s,n,i=o(this),u=c(i,0),f=0;for(e=-1,r=arguments.length;e<r;e++)if(n=-1===e?i:arguments[e],y(n)){if(s=l(n.length),f+s>g)throw TypeError(b);for(a=0;a<s;a++,f++)a in n&&d(u,f,n[a])}else{if(f>=g)throw TypeError(b);d(u,f++,n)}return u.length=f,u}})},a15b:function(t,e,a){"use strict";var r=a("23e7"),s=a("44ad"),n=a("fc6a"),i=a("a640"),o=[].join,l=s!=Object,d=i("join",",");r({target:"Array",proto:!0,forced:l||!d},{join:function(t){return o.call(n(this),void 0===t?",":t)}})},a9e3:function(t,e,a){"use strict";var r=a("83ab"),s=a("da84"),n=a("94ca"),i=a("6eeb"),o=a("5135"),l=a("c6b6"),d=a("7156"),c=a("c04e"),u=a("d039"),f=a("7c73"),p=a("241c").f,m=a("06cf").f,g=a("9bf2").f,b=a("58a8").trim,h="Number",v=s[h],y=v.prototype,$=l(f(y))==h,C=function(t){var e,a,r,s,n,i,o,l,d=c(t,!1);if("string"==typeof d&&d.length>2)if(d=b(d),e=d.charCodeAt(0),43===e||45===e){if(a=d.charCodeAt(2),88===a||120===a)return NaN}else if(48===e){switch(d.charCodeAt(1)){case 66:case 98:r=2,s=49;break;case 79:case 111:r=8,s=55;break;default:return+d}for(n=d.slice(2),i=n.length,o=0;o<i;o++)if(l=n.charCodeAt(o),l<48||l>s)return NaN;return parseInt(n,r)}return+d};if(n(h,!v(" 0o1")||!v("0b1")||v("+0x1"))){for(var S,N=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof N&&($?u((function(){y.valueOf.call(a)})):l(a)!=h)?d(new v(C(e)),a,N):C(e)},_=r?p(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),w=0;_.length>w;w++)o(v,S=_[w])&&!o(N,S)&&g(N,S,m(v,S));N.prototype=y,y.constructor=N,i(s,h,N)}},cb29:function(t,e,a){var r=a("23e7"),s=a("81d5"),n=a("44d2");r({target:"Array",proto:!0},{fill:s}),n("fill")},f531:function(t,e,a){"use strict";var r=a("6fa6"),s=a.n(r);s.a}}]);
//# sourceMappingURL=node-add-edit.3a59484d.js.map