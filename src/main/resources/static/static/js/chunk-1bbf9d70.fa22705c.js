(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1bbf9d70"],{1148:function(t,e,i){"use strict";var a=i("a691"),r=i("1d80");t.exports="".repeat||function(t){var e=String(r(this)),i="",s=a(t);if(s<0||s==1/0)throw RangeError("Wrong number of repetitions");for(;s>0;(s>>>=1)&&(e+=e))1&s&&(i+=e);return i}},"30b0":function(t,e,i){"use strict";var a=i("770e"),r=i.n(a);r.a},"34a8":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"block-chain-info"},[i("div",{staticClass:"info-header"},[i("div",{staticClass:"line-item"},[i("div",{staticClass:"info-item"},[i("span",{staticClass:"label"},[t._v(t._s(t.$t("explorer.lastBlockTime"))+"：")]),i("span",{staticClass:"value"},[t._v(t._s((t.lastProductBlockTime||"0.0")+"s ago"))])]),i("div",{staticClass:"info-item"},[i("span",{staticClass:"label"},[t._v(t._s(t.$t("explorer.blockDuring"))+"：")]),i("span",{staticClass:"value"},[t._v(t._s("3s"))])])])]),i("div",{staticClass:"block-list"},[i("div",{staticClass:"block-list__header"},[t._v(" "+t._s(t.$t("explorer.lastBlock"))+" "),i("el-button",{staticClass:"refresh",attrs:{disabled:t.loading,type:"text"},on:{click:t.handleRefresh}},[i("i",{staticClass:"el-icon-refresh-right"}),t._v(" "+t._s(t.$t("explorer.refresh")))])],1),i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[t.lastBlockList.length?t._l(t.lastBlockList,(function(e,a){return i("div",{key:e.high,staticClass:"block-box"},[i("div",{staticClass:"box-header"},[i("div",{staticClass:"block-high"},[t._v(t._s(e.high))]),i("div",{staticClass:"block-time"},[t._v(t._s(t.$_moment(e.timestamp).format("YYYY-MM-DD HH:mm:ss")))])]),i("div",{staticClass:"box-body"},[i("div",{staticClass:"line-item"},[i("span",{staticClass:"label"},[t._v(t._s(t.$t("explorer.hashValue"))+"：")]),i("span",{staticClass:"value"},[t._v(t._s(e.hash))])])])])})):i("div",{staticClass:"empty-data"},[t._v(t._s(t.$t("base.emptyData")))])],2)])])},r=[],s=(i("c740"),i("a434"),i("a9e3"),i("b680"),i("159b"),{name:"block-chain-info",props:{configForm:Object},data:function(){return{loading:!1,lastBlockList:[],lastProductBlockTime:0,timeID:null,httpTimeID:null,httpTimeIDs:[],stopHttp:!1}},watch:{"configForm.refresh":{handler:function(t){t&&this.getBlockChainInfo()}}},created:function(){this.getBlockChainInfo()},destroyed:function(){clearInterval(this.timeID),this.clearAllTimeout(),this.stopHttp=!0},methods:{getBlockChainInfo:function(){this.configForm.refresh=!1,this.handleRefresh()},handleRefresh:function(){clearInterval(this.timeID),this.clearAllTimeout(),this.lastProductBlockTime=0,this.lastBlockList.splice(0),this.stopHttp=!1,this.loading=!0,setTimeout(this.getNowBlockInfo,1e3)},getNowBlockInfo:function(){var t=this;this.$_api.explorer.getNowBlockInfo({type:this.configForm.nodeType,url:this.configForm.nodeURL},(function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t.loading=!1,!e&&!t.stopHttp){var a=i.result||{};if(a.blockID&&!~t.lastBlockList.findIndex((function(t){return t.hash===a.blockID}))){var r=a.block_header.raw_data,s={high:"#"+r.number,timestamp:r.timestamp,hash:a.blockID,status:0};t.lastProductBlockTime=Math.abs((Date.now()-s.timestamp)/1e3).toFixed(1),clearInterval(t.timeID),t.timeID=setInterval((function(){t.lastProductBlockTime=(Number(t.lastProductBlockTime)+.1).toFixed(1)}),100),t.lastBlockList.unshift(s)}t.httpTimeID=setTimeout(t.getNowBlockInfo,1e3),t.httpTimeIDs.push(t.httpTimeID)}}))},clearAllTimeout:function(){this.httpTimeIDs.forEach(clearTimeout),this.httpTimeIDs=[]}}}),n=s,o=(i("30b0"),i("2877")),l=Object(o["a"])(n,a,r,!1,null,"461cafa2",null);e["default"]=l.exports},"408a":function(t,e,i){var a=i("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=a(t))throw TypeError("Incorrect invocation");return+t}},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,i){var a=i("1d80"),r=i("5899"),s="["+r+"]",n=RegExp("^"+s+s+"*"),o=RegExp(s+s+"*$"),l=function(t){return function(e){var i=String(a(e));return 1&t&&(i=i.replace(n,"")),2&t&&(i=i.replace(o,"")),i}};t.exports={start:l(1),end:l(2),trim:l(3)}},7156:function(t,e,i){var a=i("861d"),r=i("d2bb");t.exports=function(t,e,i){var s,n;return r&&"function"==typeof(s=e.constructor)&&s!==i&&a(n=s.prototype)&&n!==i.prototype&&r(t,n),t}},"770e":function(t,e,i){},a434:function(t,e,i){"use strict";var a=i("23e7"),r=i("23cb"),s=i("a691"),n=i("50c4"),o=i("7b0b"),l=i("65f0"),c=i("8418"),f=i("1dde"),u=Math.max,h=Math.min,d=9007199254740991,p="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!f("splice")},{splice:function(t,e){var i,a,f,m,v,b,g=o(this),I=n(g.length),k=r(t,I),_=arguments.length;if(0===_?i=a=0:1===_?(i=0,a=I-k):(i=_-2,a=h(u(s(e),0),I-k)),I+i-a>d)throw TypeError(p);for(f=l(g,a),m=0;m<a;m++)v=k+m,v in g&&c(f,m,g[v]);if(f.length=a,i<a){for(m=k;m<I-a;m++)v=m+a,b=m+i,v in g?g[b]=g[v]:delete g[b];for(m=I;m>I-a+i;m--)delete g[m-1]}else if(i>a)for(m=I-a;m>k;m--)v=m+a-1,b=m+i-1,v in g?g[b]=g[v]:delete g[b];for(m=0;m<i;m++)g[m+k]=arguments[m+2];return g.length=I-a+i,f}})},a9e3:function(t,e,i){"use strict";var a=i("83ab"),r=i("da84"),s=i("94ca"),n=i("6eeb"),o=i("5135"),l=i("c6b6"),c=i("7156"),f=i("c04e"),u=i("d039"),h=i("7c73"),d=i("241c").f,p=i("06cf").f,m=i("9bf2").f,v=i("58a8").trim,b="Number",g=r[b],I=g.prototype,k=l(h(I))==b,_=function(t){var e,i,a,r,s,n,o,l,c=f(t,!1);if("string"==typeof c&&c.length>2)if(c=v(c),e=c.charCodeAt(0),43===e||45===e){if(i=c.charCodeAt(2),88===i||120===i)return NaN}else if(48===e){switch(c.charCodeAt(1)){case 66:case 98:a=2,r=49;break;case 79:case 111:a=8,r=55;break;default:return+c}for(s=c.slice(2),n=s.length,o=0;o<n;o++)if(l=s.charCodeAt(o),l<48||l>r)return NaN;return parseInt(s,a)}return+c};if(s(b,!g(" 0o1")||!g("0b1")||g("+0x1"))){for(var x,C=function(t){var e=arguments.length<1?0:t,i=this;return i instanceof C&&(k?u((function(){I.valueOf.call(i)})):l(i)!=b)?c(new g(_(e)),i,C):_(e)},N=a?d(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),T=0;N.length>T;T++)o(g,x=N[T])&&!o(C,x)&&m(C,x,p(g,x));C.prototype=I,I.constructor=C,n(r,b,C)}},b680:function(t,e,i){"use strict";var a=i("23e7"),r=i("a691"),s=i("408a"),n=i("1148"),o=i("d039"),l=1..toFixed,c=Math.floor,f=function(t,e,i){return 0===e?i:e%2===1?f(t,e-1,i*t):f(t*t,e/2,i)},u=function(t){var e=0,i=t;while(i>=4096)e+=12,i/=4096;while(i>=2)e+=1,i/=2;return e},h=l&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!o((function(){l.call({})}));a({target:"Number",proto:!0,forced:h},{toFixed:function(t){var e,i,a,o,l=s(this),h=r(t),d=[0,0,0,0,0,0],p="",m="0",v=function(t,e){var i=-1,a=e;while(++i<6)a+=t*d[i],d[i]=a%1e7,a=c(a/1e7)},b=function(t){var e=6,i=0;while(--e>=0)i+=d[e],d[e]=c(i/t),i=i%t*1e7},g=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==d[t]){var i=String(d[t]);e=""===e?i:e+n.call("0",7-i.length)+i}return e};if(h<0||h>20)throw RangeError("Incorrect fraction digits");if(l!=l)return"NaN";if(l<=-1e21||l>=1e21)return String(l);if(l<0&&(p="-",l=-l),l>1e-21)if(e=u(l*f(2,69,1))-69,i=e<0?l*f(2,-e,1):l/f(2,e,1),i*=4503599627370496,e=52-e,e>0){v(0,i),a=h;while(a>=7)v(1e7,0),a-=7;v(f(10,a,1),0),a=e-1;while(a>=23)b(1<<23),a-=23;b(1<<a),v(1,1),b(2),m=g()}else v(0,i),v(1<<-e,0),m=g()+n.call("0",h);return h>0?(o=m.length,m=p+(o<=h?"0."+n.call("0",h-o)+m:m.slice(0,o-h)+"."+m.slice(o-h))):m=p+m,m}})}}]);
//# sourceMappingURL=chunk-1bbf9d70.fa22705c.js.map