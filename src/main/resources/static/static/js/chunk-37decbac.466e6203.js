(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-37decbac"],{1148:function(t,e,a){"use strict";var i=a("a691"),r=a("1d80");t.exports="".repeat||function(t){var e=String(r(this)),a="",n=i(t);if(n<0||n==1/0)throw RangeError("Wrong number of repetitions");for(;n>0;(n>>>=1)&&(e+=e))1&n&&(a+=e);return a}},"34a8":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"block-chain-info"},[a("div",{staticClass:"info-header"},[a("div",{staticClass:"line-item"},[a("div",{staticClass:"info-item"},[a("span",{staticClass:"label"},[t._v(t._s(t.$t("explorer.lastBlockTime"))+"：")]),a("span",{staticClass:"value"},[t._v(t._s((t.lastProductBlockTime||"0.0")+"s ago"))])]),a("div",{staticClass:"info-item"},[a("span",{staticClass:"label"},[t._v(t._s(t.$t("explorer.blockDuring"))+"：")]),a("span",{staticClass:"value"},[t._v(t._s("3s"))])])])]),a("div",{staticClass:"block-list"},[a("div",{staticClass:"block-list__header"},[t._v(" "+t._s(t.$t("explorer.lastBlock"))+" "),a("el-button",{staticClass:"refresh",attrs:{type:"text"},on:{click:t.handleRefresh}},[t._v(t._s(t.$t("explorer.refresh")))])],1),t.lastBlockList.length?t._l(t.lastBlockList,(function(e,i){return a("div",{key:e.high,staticClass:"block-box"},[a("div",{staticClass:"box-header"},[a("div",{staticClass:"block-high"},[t._v(t._s(e.high))]),a("div",{staticClass:"block-time"},[t._v(t._s(t.$_moment(e.timestamp).format("YYYY-MM-DD HH:mm:ss")))])]),a("div",{staticClass:"box-body"},[a("div",{staticClass:"line-item"},[a("span",{staticClass:"label"},[t._v(t._s(t.$t("explorer.hashValue"))+"：")]),a("span",{staticClass:"value"},[t._v(t._s(e.hash))])]),a("div",{staticClass:"line-item"},[a("span",{staticClass:"label"},[t._v(t._s(t.$t("explorer.status"))+"：")]),a("span",{staticClass:"value"},[t._v(t._s(t.$t(e.status?"explorer.confirmed":"explorer.unconfirmed")))])])])])})):a("div",{staticClass:"empty-data"},[t._v(t._s(t.$t("base.emptyData")))])],2)])},r=[],n=(a("a434"),a("a9e3"),a("b680"),{name:"block-chain-info",props:{configForm:Object},data:function(){return{lastBlockChainInfo:{},loading:!1,lastBlockList:[],lastProductBlockTime:0,timeID:null,httpTimeID:null,reload:!0}},computed:{blockHeaderRawData:function(){return this.lastBlockChainInfo.block_header&&this.lastBlockChainInfo.block_header.raw_data||{}}},watch:{"configForm.refresh":{handler:function(t){t&&this.getBlockChainInfo()}}},created:function(){this.getBlockChainInfo()},destroyed:function(){clearInterval(this.timeID),clearTimeout(this.httpTimeID)},methods:{getBlockChainInfo:function(){var t=this;(this.configForm.refresh||this.reload)&&(this.reload=!1,this.loading=!0),this.configForm.refresh=!1,this.lastBlockChainInfo={},this.$_api.explorer.getNowBlockInfo({url:this.configForm.nodeURL},(function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t.loading=!1,!e){var i=0;try{if(t.lastBlockChainInfo="string"===typeof a.result&&JSON.parse(a.result||"{}")||{},t.lastBlockChainInfo.blockID){var r=t.lastBlockChainInfo.block_header.raw_data;i=r.timestamp;var n={high:"#"+r.number,timestamp:r.timestamp,hash:t.lastBlockChainInfo.blockID,status:0};clearInterval(t.timeID),t.lastProductBlockTime=Math.floor((Date.now()-n.timestamp)/1e3).toFixed(1),t.timeID=setInterval((function(){t.lastProductBlockTime=(Number(t.lastProductBlockTime)+.1).toFixed(1)}),100),t.lastBlockList.unshift(n)}}catch(o){console.dir(o)}var s=i+3e3-Date.now();t.httpTimeID=setTimeout(t.getBlockChainInfo,s)}}))},handleRefresh:function(){clearInterval(this.timeID),clearTimeout(this.httpTimeID),this.lastBlockList.splice(0),this.getBlockChainInfo()}}}),s=n,o=(a("50a3"),a("2877")),l=Object(o["a"])(s,i,r,!1,null,"395bb1ad",null);e["default"]=l.exports},"3bce":function(t,e,a){},"408a":function(t,e,a){var i=a("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=i(t))throw TypeError("Incorrect invocation");return+t}},"50a3":function(t,e,a){"use strict";var i=a("3bce"),r=a.n(i);r.a},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,a){var i=a("1d80"),r=a("5899"),n="["+r+"]",s=RegExp("^"+n+n+"*"),o=RegExp(n+n+"*$"),l=function(t){return function(e){var a=String(i(e));return 1&t&&(a=a.replace(s,"")),2&t&&(a=a.replace(o,"")),a}};t.exports={start:l(1),end:l(2),trim:l(3)}},7156:function(t,e,a){var i=a("861d"),r=a("d2bb");t.exports=function(t,e,a){var n,s;return r&&"function"==typeof(n=e.constructor)&&n!==a&&i(s=n.prototype)&&s!==a.prototype&&r(t,s),t}},a434:function(t,e,a){"use strict";var i=a("23e7"),r=a("23cb"),n=a("a691"),s=a("50c4"),o=a("7b0b"),l=a("65f0"),c=a("8418"),f=a("1dde"),u=Math.max,h=Math.min,d=9007199254740991,p="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!f("splice")},{splice:function(t,e){var a,i,f,v,m,b,g=o(this),I=s(g.length),k=r(t,I),_=arguments.length;if(0===_?a=i=0:1===_?(a=0,i=I-k):(a=_-2,i=h(u(n(e),0),I-k)),I+a-i>d)throw TypeError(p);for(f=l(g,i),v=0;v<i;v++)m=k+v,m in g&&c(f,v,g[m]);if(f.length=i,a<i){for(v=k;v<I-i;v++)m=v+i,b=v+a,m in g?g[b]=g[m]:delete g[b];for(v=I;v>I-i+a;v--)delete g[v-1]}else if(a>i)for(v=I-i;v>k;v--)m=v+i-1,b=v+a-1,m in g?g[b]=g[m]:delete g[b];for(v=0;v<a;v++)g[v+k]=arguments[v+2];return g.length=I-i+a,f}})},a9e3:function(t,e,a){"use strict";var i=a("83ab"),r=a("da84"),n=a("94ca"),s=a("6eeb"),o=a("5135"),l=a("c6b6"),c=a("7156"),f=a("c04e"),u=a("d039"),h=a("7c73"),d=a("241c").f,p=a("06cf").f,v=a("9bf2").f,m=a("58a8").trim,b="Number",g=r[b],I=g.prototype,k=l(h(I))==b,_=function(t){var e,a,i,r,n,s,o,l,c=f(t,!1);if("string"==typeof c&&c.length>2)if(c=m(c),e=c.charCodeAt(0),43===e||45===e){if(a=c.charCodeAt(2),88===a||120===a)return NaN}else if(48===e){switch(c.charCodeAt(1)){case 66:case 98:i=2,r=49;break;case 79:case 111:i=8,r=55;break;default:return+c}for(n=c.slice(2),s=n.length,o=0;o<s;o++)if(l=n.charCodeAt(o),l<48||l>r)return NaN;return parseInt(n,i)}return+c};if(n(b,!g(" 0o1")||!g("0b1")||g("+0x1"))){for(var C,x=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof x&&(k?u((function(){I.valueOf.call(a)})):l(a)!=b)?c(new g(_(e)),a,x):_(e)},w=i?d(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;w.length>N;N++)o(g,C=w[N])&&!o(x,C)&&v(x,C,p(g,C));x.prototype=I,I.constructor=x,s(r,b,x)}},b680:function(t,e,a){"use strict";var i=a("23e7"),r=a("a691"),n=a("408a"),s=a("1148"),o=a("d039"),l=1..toFixed,c=Math.floor,f=function(t,e,a){return 0===e?a:e%2===1?f(t,e-1,a*t):f(t*t,e/2,a)},u=function(t){var e=0,a=t;while(a>=4096)e+=12,a/=4096;while(a>=2)e+=1,a/=2;return e},h=l&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!o((function(){l.call({})}));i({target:"Number",proto:!0,forced:h},{toFixed:function(t){var e,a,i,o,l=n(this),h=r(t),d=[0,0,0,0,0,0],p="",v="0",m=function(t,e){var a=-1,i=e;while(++a<6)i+=t*d[a],d[a]=i%1e7,i=c(i/1e7)},b=function(t){var e=6,a=0;while(--e>=0)a+=d[e],d[e]=c(a/t),a=a%t*1e7},g=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==d[t]){var a=String(d[t]);e=""===e?a:e+s.call("0",7-a.length)+a}return e};if(h<0||h>20)throw RangeError("Incorrect fraction digits");if(l!=l)return"NaN";if(l<=-1e21||l>=1e21)return String(l);if(l<0&&(p="-",l=-l),l>1e-21)if(e=u(l*f(2,69,1))-69,a=e<0?l*f(2,-e,1):l/f(2,e,1),a*=4503599627370496,e=52-e,e>0){m(0,a),i=h;while(i>=7)m(1e7,0),i-=7;m(f(10,i,1),0),i=e-1;while(i>=23)b(1<<23),i-=23;b(1<<i),m(1,1),b(2),v=g()}else m(0,a),m(1<<-e,0),v=g()+s.call("0",h);return h>0?(o=v.length,v=p+(o<=h?"0."+s.call("0",h-o)+v:v.slice(0,o-h)+"."+v.slice(o-h))):v=p+v,v}})}}]);
//# sourceMappingURL=chunk-37decbac.466e6203.js.map