(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33754d58"],{"8d0d":function(t,e,n){"use strict";var a=n("a39a"),i=n.n(a);i.a},9406:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dashboard-container"},[n("el-row",[n("div",{staticClass:"tronContent"},[n("h1",{staticClass:"tronTitle"},[t._v("one-click-deployment")]),t._v(" "),n("p",{staticClass:"action"},[n("el-button",{attrs:{type:"warning"},on:{click:t.startOneClickFun}},[t._v(t._s(t.$t("startTronOneClickDeploy")))])],1)])]),t._v(" "),n("el-row",[n("div",{staticClass:"help-body-title"},[t._v(t._s(t.$t("tronDashboardOneClickChain")))]),t._v(" "),n("p",{staticClass:"desc"},[t._v(t._s(t.$t("tronDashboardOneClickChainDsc")))]),t._v(" "),n("div",{staticClass:"help-body-title"},[t._v(t._s(t.$t("tronDashboardNoviceSee")))]),t._v(" "),n("div",{attrs:{id:"first-element-introduction"}},[n("panel-group")],1),t._v(" "),n("div",{staticClass:"help-body-title"},[t._v(t._s(t.$t("tronDashboardHelp")))]),t._v(" "),n("div",{staticClass:"help"},[n("el-button",{attrs:{type:"text",size:"small"},on:{click:t.jumpHelp}},[t._v(t._s(t.$t("tronDashboardHelpTips")))])],1)])],1)},i=[],s=(n("8e6e"),n("ac6a"),n("456d"),n("bd86")),r=(n("96cf"),n("3b8d")),o=n("2f62"),l=(n("5f87"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",{staticClass:"panel-group",attrs:{gutter:0}},[n("el-col",{staticClass:"card-panel-col",attrs:{xs:16,sm:16,lg:6}},[n("div",{staticClass:"card-panel"},[n("div",{staticClass:"card-panel-description"},[n("div",{staticClass:"card-panel-text"},[n("i",{staticClass:"num"},[t._v("1")]),t._v(t._s(t.$t("tronDashboardClickAddNode"))+"\n          ")]),t._v(" "),n("div",{staticClass:"descCont"},[t._v("\n            "+t._s(t.$t("tronDashboardClickAddNodeTips"))+"\n          ")])])])]),t._v(" "),n("el-col",{staticClass:"card-panel-col",attrs:{xs:16,sm:16,lg:6}},[n("div",{staticClass:"card-panel"},[n("div",{staticClass:"card-panel-description"},[n("div",{staticClass:"card-panel-text"},[n("i",{staticClass:"num"},[t._v("2")]),t._v(" "+t._s(t.$t("tronDashboardClickSetting"))+"\n          ")]),t._v(" "),n("div",{staticClass:"descCont"},[t._v("\n            "+t._s(t.$t("tronDashboardClickSettingTips"))+"\n          ")])])])]),t._v(" "),n("el-col",{staticClass:"card-panel-col",attrs:{xs:16,sm:16,lg:6}},[n("div",{staticClass:"card-panel"},[n("div",{staticClass:"card-panel-description"},[n("div",{staticClass:"card-panel-text"},[n("i",{staticClass:"num"},[t._v("3")]),t._v(t._s(t.$t("tronDashboardClickPlugin"))+"\n          ")]),t._v(" "),n("div",{staticClass:"descCont"},[t._v(t._s(t.$t("tronDashboardClickPluginTips")))])]),t._v(" "),n("div",{staticClass:"card-panel-icon-wrapper icon-money"},[n("svg-icon",{attrs:{"icon-class":"money","class-name":"card-panel-icon"}})],1)])]),t._v(" "),n("el-col",{staticClass:"card-panel-col",attrs:{xs:16,sm:16,lg:6}},[n("div",{staticClass:"card-panel"},[n("div",{staticClass:"card-panel-description"},[n("div",{staticClass:"card-panel-text"},[n("i",{staticClass:"num"},[t._v("4")]),t._v(t._s(t.$t("tronDashboardClickDeploy"))+"\n          ")]),t._v(" "),n("div",{staticClass:"descCont"},[t._v(t._s(t.$t("tronDashboardClickDeployTips")))])])])])],1)],1)}),c=[],u=n("ec1b"),d=n.n(u),p={components:{CountTo:d.a},methods:{handleSetLineChartData:function(t){this.$emit("handleSetLineChartData",t)}}},h=p,m=(n("f7ed"),n("2877")),f=Object(m["a"])(h,l,c,!1,null,"2b730abf",null),v=f.exports,b=n("b775");function _(t){return Object(b["a"])({url:"/oneClick",method:"post"})}function C(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function w(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?C(n,!0).forEach((function(e){Object(s["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):C(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var y={name:"Dashboard",created:function(){},components:{PanelGroup:v},methods:{startOneClickFun:function(){this.newp2pTimestampFun()},newp2pTimestampFun:function(){var t=this;_().then(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("user/changeRoles","node").then((function(t){console.log(t)}));case 2:t.$router.push("/node/list");case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(t){console.log(t)}))},jumpHelp:function(){var t=sessionStorage.getItem("currentLang");"en-US"==t?window.open("http://39.106.174.213/wubin1/one-click-deployment/blob/master/README.md","_blank"):window.open("http://39.106.174.213/wubin1/one-click-deployment/blob/master/README.zh-CN.md","_blank")}},computed:w({},Object(o["b"])(["name","token"]))},V=y,g=(n("8d0d"),Object(m["a"])(V,a,i,!1,null,"299f68b2",null));e["default"]=g.exports},a0df:function(t,e,n){},a39a:function(t,e,n){},ec1b:function(t,e,n){!function(e,n){t.exports=n()}(0,(function(){return function(t){function e(a){if(n[a])return n[a].exports;var i=n[a]={i:a,l:!1,exports:{}};return t[a].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,a){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:a})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=2)}([function(t,e,n){var a=n(4)(n(1),n(5),null,null);t.exports=a.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(3);e.default={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:function(t){return t>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:function(t,e,n,a){return n*(1-Math.pow(2,-10*t/a))*1024/1023+e}}},data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown:function(){return this.startVal>this.endVal}},watch:{startVal:function(){this.autoplay&&this.start()},endVal:function(){this.autoplay&&this.start()}},mounted:function(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=(0,a.requestAnimationFrame)(this.count)},pauseResume:function(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause:function(){(0,a.cancelAnimationFrame)(this.rAF)},resume:function(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,(0,a.requestAnimationFrame)(this.count)},reset:function(){this.startTime=null,(0,a.cancelAnimationFrame)(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(t){this.startTime||(this.startTime=t),this.timestamp=t;var e=t-this.startTime;this.remaining=this.localDuration-e,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(e,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(e,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(e/this.localDuration):this.printVal=this.localStartVal+(this.localStartVal-this.startVal)*(e/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),e<this.localDuration?this.rAF=(0,a.requestAnimationFrame)(this.count):this.$emit("callback")},isNumber:function(t){return!isNaN(parseFloat(t))},formatNumber:function(t){t=t.toFixed(this.decimals),t+="";var e=t.split("."),n=e[0],a=e.length>1?this.decimal+e[1]:"",i=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;i.test(n);)n=n.replace(i,"$1"+this.separator+"$2");return this.prefix+n+a+this.suffix}},destroyed:function(){(0,a.cancelAnimationFrame)(this.rAF)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),i=function(t){return t&&t.__esModule?t:{default:t}}(a);e.default=i.default,"undefined"!=typeof window&&window.Vue&&window.Vue.component("count-to",i.default)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=0,i="webkit moz ms o".split(" "),s=void 0,r=void 0;if("undefined"==typeof window)e.requestAnimationFrame=s=function(){},e.cancelAnimationFrame=r=function(){};else{e.requestAnimationFrame=s=window.requestAnimationFrame,e.cancelAnimationFrame=r=window.cancelAnimationFrame;for(var o=void 0,l=0;l<i.length&&(!s||!r);l++)o=i[l],e.requestAnimationFrame=s=s||window[o+"RequestAnimationFrame"],e.cancelAnimationFrame=r=r||window[o+"CancelAnimationFrame"]||window[o+"CancelRequestAnimationFrame"];s&&r||(e.requestAnimationFrame=s=function(t){var e=(new Date).getTime(),n=Math.max(0,16-(e-a)),i=window.setTimeout((function(){t(e+n)}),n);return a=e+n,i},e.cancelAnimationFrame=r=function(t){window.clearTimeout(t)})}e.requestAnimationFrame=s,e.cancelAnimationFrame=r},function(t,e){t.exports=function(t,e,n,a){var i,s=t=t||{},r=typeof t.default;"object"!==r&&"function"!==r||(i=t,s=t.default);var o="function"==typeof s?s.options:s;if(e&&(o.render=e.render,o.staticRenderFns=e.staticRenderFns),n&&(o._scopeId=n),a){var l=Object.create(o.computed||null);Object.keys(a).forEach((function(t){var e=a[t];l[t]=function(){return e}})),o.computed=l}return{esModule:i,exports:s,options:o}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",[t._v("\n  "+t._s(t.displayValue)+"\n")])},staticRenderFns:[]}}])}))},f7ed:function(t,e,n){"use strict";var a=n("a0df"),i=n.n(a);i.a}}]);