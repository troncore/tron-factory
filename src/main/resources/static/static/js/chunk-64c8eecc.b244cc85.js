(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64c8eecc"],{2532:function(t,e,n){"use strict";var a=n("23e7"),r=n("5a34"),i=n("1d80"),c=n("ab13");a({target:"String",proto:!0,forced:!c("includes")},{includes:function(t){return!!~String(i(this)).indexOf(r(t),arguments.length>1?arguments[1]:void 0)}})},"2cb7":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"get-started"},[t.loading?n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"loading-mask"}):n("div",{staticClass:"page-main"},[t.showStart?n("div",{staticClass:"page-body im-card"},[n("div",{staticClass:"description"},[t._v(" "+t._s(t.$t("getStarted.descriptionChain"))+" ")]),n("el-button",{staticClass:"im-button largest",attrs:{type:"primary"},on:{click:t.handleCreate}},[t._v(t._s(t.$t("getStarted.startCreate")))])],1):n(t.currentComponent,{tag:"component"})],1)])},r=[],i=(n("a4d3"),n("4de4"),n("caad"),n("e439"),n("dbb4"),n("b64b"),n("d3b7"),n("2532"),n("159b"),n("ade3"));function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){Object(i["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var o={"chain-add":function(){return Promise.all([n.e("chunk-9b4a4bc6"),n.e("chain-add-edit")]).then(n.bind(null,"88c1"))},"chain-edit":function(){return Promise.all([n.e("chunk-9b4a4bc6"),n.e("chain-add-edit")]).then(n.bind(null,"88c1"))},dashboard:function(){return Promise.all([n.e("chunk-48f4b5ac"),n.e("dashboard")]).then(n.bind(null,"12c8"))},"node-add":function(){return n.e("node-add-edit").then(n.bind(null,"1832"))},"node-edit":function(){return n.e("node-add-edit").then(n.bind(null,"1832"))},"node-view":function(){return n.e("node-view").then(n.bind(null,"2c45"))}},s={name:"get-started",components:d({},o),data:function(){return{loading:!1,showStart:!0,currentComponent:"",hasValidStatus:!1}},watch:{$route:{handler:"handleRoute",immediate:!0}},created:function(){this.activeMenuIndex()},methods:{activeMenuIndex:function(){this.$eventBus.$emit("menuActiveIndex","/get-started")},handleRoute:function(t){var e=this;this.loading=!0;var n=["chain-add"],a=Object.keys(o);this.$_api.getStarted.hasBlockChain({},(function(r,i){e.loading=!1,r||(!0===i||n.includes(t.params.status)?(e.showStart=!1,a.includes(t.params.status)?e.currentComponent=t.params.status:e.$router.push("/get-started/dashboard")):(e.showStart=!0,e.$router.push("/get-started")))}))},handleCreate:function(){this.$router.push("/get-started/chain-add")}}},u=s,l=(n("f9f1"),n("2877")),h=Object(l["a"])(u,a,r,!1,null,"712d6aa0",null);e["default"]=h.exports},a04c:function(t,e,n){},f9f1:function(t,e,n){"use strict";var a=n("a04c"),r=n.n(a);r.a}}]);
//# sourceMappingURL=chunk-64c8eecc.b244cc85.js.map