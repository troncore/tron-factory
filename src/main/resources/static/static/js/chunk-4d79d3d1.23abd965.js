(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d79d3d1","chunk-78e16f76"],{"0716":function(t,e,n){},"11f8":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"token-diy"},[1===t.step?n("token-params",{on:{step:t.handleStep}}):t._e(),2===t.step?n("connect-tronlink",{on:{step:t.handleStep}}):t._e(),3===t.step?n("verify-params",{on:{step:t.handleStep}}):t._e()],1)},i=[],s=(n("a9e3"),n("88b5")),o=n("67ed"),r=n("b97e"),l={name:"token-diy",components:{ConnectTronlink:r["default"],VerifyParams:o["default"],TokenParams:s["default"]},data:function(){return{step:0}},created:function(){this.init()},methods:{init:function(){this.step=Number(localStorage.getItem("tokenDIYStep")||1)},handleStep:function(t){this.step+=t,localStorage.setItem("tokenDIYStep",this.step)}}},c=l,d=(n("806e"),n("2877")),u=Object(d["a"])(c,a,i,!1,null,"4e0263de",null);e["default"]=u.exports},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,n){var a=n("1d80"),i=n("5899"),s="["+i+"]",o=RegExp("^"+s+s+"*"),r=RegExp(s+s+"*$"),l=function(t){return function(e){var n=String(a(e));return 1&t&&(n=n.replace(o,"")),2&t&&(n=n.replace(r,"")),n}};t.exports={start:l(1),end:l(2),trim:l(3)}},7072:function(t,e,n){"use strict";var a=n("0716"),i=n.n(a);i.a},7156:function(t,e,n){var a=n("861d"),i=n("d2bb");t.exports=function(t,e,n){var s,o;return i&&"function"==typeof(s=e.constructor)&&s!==n&&a(o=s.prototype)&&o!==n.prototype&&i(t,o),t}},"806e":function(t,e,n){"use strict";var a=n("99d3"),i=n.n(a);i.a},"835c":function(t,e,n){},"88b5":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"token-params card-view"},[n("div",{staticClass:"im-card card-main"},[t._m(0),n("div",{staticClass:"card-body"},[n("el-form",{ref:"im-form",staticClass:"im-form",attrs:{rules:t.formRules,model:t.form,"label-position":"top"}},[n("el-form-item",{attrs:{prop:"tokenName"}},[n("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(t.$t("代币名称")))]),n("div",{staticClass:"item-inner"},[n("el-input",{attrs:{size:"large",maxlength:"25",clearable:""},model:{value:t.form.tokenName,callback:function(e){t.$set(t.form,"tokenName","string"===typeof e?e.trim():e)},expression:"form.tokenName"}}),n("span",{staticClass:"help-info"},[t._v(t._s(t.$t("代币的名称，3 ~ 25个英文字符")))])],1)]),n("el-form-item",{attrs:{prop:"tokenSymbol"}},[n("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(t.$t("代币符号")))]),n("div",{staticClass:"item-inner"},[n("el-input",{attrs:{size:"large",maxlength:"4",clearable:""},model:{value:t.form.tokenSymbol,callback:function(e){t.$set(t.form,"tokenSymbol","string"===typeof e?e.trim():e)},expression:"form.tokenSymbol"}}),n("span",{staticClass:"help-info"},[t._v(t._s(t.$t("3 ~ 4英文字符，例如ETH, BTC, BAT 等，不可包含空格")))])],1)]),n("el-form-item",{attrs:{prop:"decimals"}},[n("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(t.$t("代币精度")))]),n("div",{staticClass:"item-inner"},[n("el-input",{attrs:{size:"large",maxlength:"2",clearable:""},model:{value:t.form.decimals,callback:function(e){t.$set(t.form,"decimals","string"===typeof e?e.trim():e)},expression:"form.decimals"}}),n("span",{staticClass:"help-info"},[t._v(t._s(t.$t("代币的小数位数，0 ~ 18位，大多数代币选择18位小数")))])],1)]),n("el-form-item",{staticClass:"margin-bottom-0",attrs:{prop:"totalSupply"}},[n("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(t.$t("总发行量")))]),n("div",{staticClass:"item-inner"},[n("el-input",{attrs:{size:"large",clearable:""},model:{value:t.form.totalSupply,callback:function(e){t.$set(t.form,"totalSupply","string"===typeof e?e.trim():e)},expression:"form.totalSupply"}}),n("span",{staticClass:"help-info"},[t._v(t._s(t.$t("要发行的代币总量，最小1，最大1000000000000000")))])],1)])],1)],1)]),n("div",{staticClass:"card-footer center"},[n("el-button",{staticClass:"im-button largest",attrs:{loading:t.loading,disabled:t.disable,type:"primary"},on:{click:t.handleSubmit}},[n("i",{staticClass:"el-icon-coin"}),t._v(" "+t._s(t.$t("tokenDIY.releaseToken"))+" ")])],1)])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"card-header"},[n("span",{staticClass:"card-title"},[t._v("代币发行参数")])])}],s={name:"token-params",data:function(){return{form:{tokenName:"",tokenSymbol:"",decimals:"18",totalSupply:"",tokenType:"trc20",tokenAccount:""},loading:!1,disable:!1}},computed:{formRules:function(){var t=function(t,e,n){/^[a-zA-Z]{3,25}$/.test(e)?n():n(new Error(" "))},e=function(t,e,n){/^[a-zA-Z]{3,4}$/.test(e)?n():n(new Error(" "))},n=function(t,e,n){/^\d+$/.test(e)&&e>=0&&e<=18?n():n(new Error(" "))},a=function(t,e,n){/^\d+$/.test(e)&&e>=1&&e<=1e15?n():n(new Error(" "))};return{tokenName:[{required:!0,message:" ",trigger:"change"},{validator:t,trigger:"change"}],tokenSymbol:[{required:!0,message:" ",trigger:"change"},{validator:e,trigger:"change"}],decimals:[{required:!0,message:" ",trigger:"change"},{validator:n,trigger:"change"}],totalSupply:[{required:!0,message:" ",trigger:"change"},{validator:a,trigger:"change"}]}}},created:function(){this.init()},methods:{init:function(){var t,e,n,a,i,s=JSON.parse(localStorage.getItem("tokenDIY"))||{};this.form={tokenName:null!==(t=s.tokenName)&&void 0!==t?t:this.form.tokenName,tokenSymbol:null!==(e=s.tokenSymbol)&&void 0!==e?e:this.form.tokenSymbol,decimals:null!==(n=s.decimals)&&void 0!==n?n:this.form.decimals,totalSupply:null!==(a=s.totalSupply)&&void 0!==a?a:this.form.totalSupply,tokenType:null!==(i=s.tokenType)&&void 0!==i?i:this.form.tokenType}},handleCancel:function(){},handleSubmit:function(){var t=this;this.$refs["im-form"].validate((function(e){e&&(localStorage.setItem("tokenDIY",JSON.stringify(t.form)),t.$emit("step",1))}))}}},o=s,r=(n("93ca"),n("2877")),l=Object(r["a"])(o,a,i,!1,null,"4690ccb6",null);e["default"]=l.exports},"8e6c":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-tooltip",{attrs:{effect:t.effect,placement:t.placement}},[n("div",{attrs:{slot:"content"},domProps:{innerHTML:t._s(t.content)},slot:"content"}),n("i",{staticClass:"icon-question fa fa-question-circle-o",style:t.myStyle})])},i=[],s={name:"im-tooltip",props:{effect:{type:String,default:"dark"},placement:{type:String,default:"top"},content:{},marginLeft:String,marginRight:String},computed:{myStyle:function(){var t={};return"undefined"!==typeof this.marginLeft&&(t.marginLeft=this.marginLeft),"undefined"!==typeof this.marginRight&&(t.marginRight=this.marginRight),t}}},o=s,r=(n("bd22"),n("2877")),l=Object(r["a"])(o,a,i,!1,null,"15cacff2",null);e["a"]=l.exports},"93ca":function(t,e,n){"use strict";var a=n("e82f"),i=n.n(a);i.a},"99d3":function(t,e,n){},a9e3:function(t,e,n){"use strict";var a=n("83ab"),i=n("da84"),s=n("94ca"),o=n("6eeb"),r=n("5135"),l=n("c6b6"),c=n("7156"),d=n("c04e"),u=n("d039"),f=n("7c73"),m=n("241c").f,p=n("06cf").f,h=n("9bf2").f,v=n("58a8").trim,g="Number",k=i[g],b=k.prototype,_=l(f(b))==g,y=function(t){var e,n,a,i,s,o,r,l,c=d(t,!1);if("string"==typeof c&&c.length>2)if(c=v(c),e=c.charCodeAt(0),43===e||45===e){if(n=c.charCodeAt(2),88===n||120===n)return NaN}else if(48===e){switch(c.charCodeAt(1)){case 66:case 98:a=2,i=49;break;case 79:case 111:a=8,i=55;break;default:return+c}for(s=c.slice(2),o=s.length,r=0;r<o;r++)if(l=s.charCodeAt(r),l<48||l>i)return NaN;return parseInt(s,a)}return+c};if(s(g,!k(" 0o1")||!k("0b1")||k("+0x1"))){for(var C,S=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof S&&(_?u((function(){b.valueOf.call(n)})):l(n)!=g)?c(new k(y(e)),n,S):y(e)},I=a?m(k):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;I.length>N;N++)r(k,C=I[N])&&!r(S,C)&&h(S,C,p(k,C));S.prototype=b,b.constructor=S,o(i,g,S)}},b97e:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"connect-tronlink card-view"},[n("div",{staticClass:"im-card card-main"},[t._m(0),n("div",{staticClass:"card-body"},[t.isInstallTronLink?t.isConnectedTronLink?n("div",{staticClass:"help-tips"},[n("div",{staticClass:"result"},[n("div",[n("b",[t._v("代币所有者")]),t._v("："+t._s(t.tokenAccount))]),n("div",{staticClass:"help-info"},[t._v("* 代币所有者将持有本次发行的全部代币")])])]):n("div",{staticClass:"help-tips"},[n("p",{staticClass:"warning"},[t._v("TronLink插件已安装，但未登录！")]),n("p",[t._v("请登录TronLink并刷新页面后再继续后面的操作")])]):n("div",{staticClass:"help-tips"},[n("p",[t._v("我们检测到你还没有安装 "),n("el-link",{attrs:{href:"https://www.tronlink.org/",type:"primary",target:"_blank"}},[t._v("TronLink(波宝钱包)")]),t._v(" 插件！")],1),n("p",[t._v("请安装TronLink并刷新页面后再继续后面的操作")]),n("br"),n("el-button",{staticClass:"im-button largest",attrs:{plain:"",type:"primary",round:""},on:{click:t.handleExtend}},[t._v("Chrome 扩展")])],1)])]),n("div",{staticClass:"card-footer space-between"},[n("el-button",{staticClass:"im-button largest",on:{click:t.handleCancel}},[t._v(t._s(t.$t("base.prevStep")))]),n("el-button",{staticClass:"im-button largest",attrs:{disabled:!t.isConnectedTronLink,type:"primary"},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("base.nextStep")))])],1)])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"card-header"},[n("span",{staticClass:"card-title"},[t._v("连接TronLink钱包")])])}],s=(n("caad"),n("2532"),n("8e6c")),o={name:"connect-tronlink",components:{ImTooltip:s["a"]},data:function(){return{disable:!1,isInstallTronLink:!1,isConnectedTronLink:!1,tokenAccount:"",timeID:null,chain:""}},created:function(){this.init(),window.addEventListener("message",this.checkTronLinkNodeNet)},destroyed:function(){clearInterval(this.timeID),window.removeEventListener("message",this.checkTronLinkNodeNet)},methods:{init:function(){this.getTronWeb(),this.timeID=setInterval(this.getTronWeb,300)},checkTronLinkNodeNet:function(t){var e;if("setNode"==(null===(e=t.data.message)||void 0===e?void 0:e.action)){var n=t.data.message.data.node.fullNode;n.includes("api.trongrid")?this.chain="波场主网络 / 主链":n.includes("nile")&&(this.chain="尼罗河测试网 / 主链.")}},getTronWeb:function(){window.tronWeb?(this.isInstallTronLink=!0,window.tronWeb.defaultAddress.base58?(this.isConnectedTronLink=!0,this.tokenAccount=window.tronWeb.defaultAddress.base58):(this.isConnectedTronLink=!1,this.tokenAccount="")):(this.isInstallTronLink=!1,this.isConnectedTronLink=!1,this.tokenAccount="")},handleExtend:function(){window.open("https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec","_blank")},handleCancel:function(){this.$emit("step",-1)},handleSubmit:function(){var t=JSON.parse(localStorage.getItem("tokenDIY"))||{};t.tokenAccount=this.tokenAccount,localStorage.setItem("tokenDIY",JSON.stringify(t)),this.$emit("step",1)}}},r=o,l=(n("7072"),n("2877")),c=Object(l["a"])(r,a,i,!1,null,"5bb3101f",null);e["default"]=c.exports},bd22:function(t,e,n){"use strict";var a=n("835c"),i=n.n(a);i.a},e82f:function(t,e,n){}}]);
//# sourceMappingURL=chunk-4d79d3d1.23abd965.js.map