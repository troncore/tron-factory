(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dab89418"],{"60c2":function(t,e,i){},"982e":function(t,e,i){"use strict";var s=i("60c2"),a=i.n(s);a.a},a081:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"chain-info"},[i("div",{staticClass:"info-header"},[i("div",{staticClass:"line-item"},[i("div",{staticClass:"info-item"}),i("div",{staticClass:"info-item"},[i("span",{staticClass:"label"},[t._v(t._s(t.$t("explorer.blockDuring"))+"：")]),i("span",{staticClass:"value"},[t._v(t._s("3s"))])])])]),i("div",{staticClass:"block-list"},[i("div",{staticClass:"block-list__header"},[t._v(" "+t._s(t.$t("explorer.lastBlock"))+" "),i("el-button",{staticClass:"refresh",attrs:{disabled:t.loading,type:"text"},on:{click:t.handleRefresh}},[i("i",{staticClass:"el-icon-refresh-right"}),t._v(" "+t._s(t.$t("explorer.refresh")))])],1),i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[t.blockList.length?t._l(t.blockList,(function(e,s){return i("div",{key:e.high,staticClass:"block-box"},[i("div",{staticClass:"box-header"},[i("div",{staticClass:"block-high"},[t._v(t._s(e.high))]),i("div",{staticClass:"block-time"},[t._v(t._s(t.$_moment(e.timestamp).format("YYYY-MM-DD HH:mm:ss")))])]),i("div",{staticClass:"box-body"},[i("div",{staticClass:"line-item"},[i("span",{staticClass:"label"},[t._v(t._s(t.$t("explorer.hashValue"))+"：")]),i("span",{staticClass:"value"},[t._v(t._s(e.hash))])])])])})):i("div",{staticClass:"empty-data"},[t._v(t._s(t.$t("base.emptyData")))])],2)])])},a=[],n=(i("c740"),i("4160"),i("caad"),i("a434"),[]),o={name:"chain-info",props:{configForm:Object},data:function(){return{loading:!1,blockList:[],timeID:null}},watch:{"configForm.refresh":{handler:function(t){t&&this.getBlockChainInfo()}}},created:function(){this.getBlockChainInfo()},destroyed:function(){this.clearAllTimeout()},methods:{getBlockChainInfo:function(){this.configForm.refresh=!1,this.handleRefresh()},handleRefresh:function(){this.clearAllTimeout(),this.blockList.splice(0),this.loading=!0,setTimeout(this.getNowBlockInfo,500)},getNowBlockInfo:function(t){var e=this;this.$_api.explorer.getNowBlockInfo({type:this.configForm.nodeType,url:this.configForm.nodeURL},{timeout:1e4},(function(i){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(e.loading=!1,i||t&&!n.includes(t))e.clearAllTimeout();else{var a=s.result||{};if(a.blockID&&!~e.blockList.findIndex((function(t){return t.hash===a.blockID}))){var o=a.block_header.raw_data,l={high:"#"+o.number,timestamp:o.timestamp,hash:a.blockID,status:0};e.blockList.unshift(l),e.blockList.length>20&&e.blockList.splice(20)}1===s.status&&(e.timeID=setTimeout((function(){e.getNowBlockInfo(e.timeID)}),1500),n.push(e.timeID))}}))},clearAllTimeout:function(){n.forEach(clearTimeout),n.splice(0),clearTimeout(this.timeID),this.timeID=null}}},l=o,c=(i("982e"),i("2877")),r=Object(c["a"])(l,s,a,!1,null,"8a271c00",null);e["default"]=r.exports},a434:function(t,e,i){"use strict";var s=i("23e7"),a=i("23cb"),n=i("a691"),o=i("50c4"),l=i("7b0b"),c=i("65f0"),r=i("8418"),h=i("1dde"),d=i("ae40"),f=h("splice"),u=d("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,v=Math.min,b=9007199254740991,g="Maximum allowed length exceeded";s({target:"Array",proto:!0,forced:!f||!u},{splice:function(t,e){var i,s,h,d,f,u,p=l(this),k=o(p.length),_=a(t,k),C=arguments.length;if(0===C?i=s=0:1===C?(i=0,s=k-_):(i=C-2,s=v(m(n(e),0),k-_)),k+i-s>b)throw TypeError(g);for(h=c(p,s),d=0;d<s;d++)f=_+d,f in p&&r(h,d,p[f]);if(h.length=s,i<s){for(d=_;d<k-s;d++)f=d+s,u=d+i,f in p?p[u]=p[f]:delete p[u];for(d=k;d>k-s+i;d--)delete p[d-1]}else if(i>s)for(d=k-s;d>_;d--)f=d+s-1,u=d+i-1,f in p?p[u]=p[f]:delete p[u];for(d=0;d<i;d++)p[d+_]=arguments[d+2];return p.length=k-s+i,h}})},c740:function(t,e,i){"use strict";var s=i("23e7"),a=i("b727").findIndex,n=i("44d2"),o=i("ae40"),l="findIndex",c=!0,r=o(l);l in[]&&Array(1)[l]((function(){c=!1})),s({target:"Array",proto:!0,forced:c||!r},{findIndex:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),n(l)}}]);
//# sourceMappingURL=chunk-dab89418.a36328c0.js.map