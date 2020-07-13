(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chain-add-edit"],{"61f7":function(e,t,s){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function a(e,t,s){return t&&i(e.prototype,t),s&&i(e,s),e}s.d(t,"a",(function(){return l}));var r=function(){function e(){n(this,e)}return a(e,[{key:"isNumber",value:function(e){return/^\d+(\.\d+)?$/.test(e)}},{key:"isInteger",value:function(e){return/^\d+$/.test(e)}},{key:"isTwoDecimal",value:function(e){return/^([1-9]\d*|0)(\.\d{1,2})$/.test(e)}},{key:"isIP",value:function(e){return/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(e)}}]),e}(),o=new r,c=function(){function e(){n(this,e)}return a(e,[{key:"validIP",value:function(e){return function(t,s,n){var i=!1;o.isIP(s)||(i=!0),i?n(new Error(e)):n()}}},{key:"numEqual",value:function(e,t){var s=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(n,i,a){var r=!1;o.isNumber(i)?i==e?r=!0:s||i==e||(r=!0):r=!0,r?a(new Error(t)):a()}}},{key:"numMin",value:function(e,t){var s=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(i,a,r){var c=!1;o.isNumber(a)?n&&!o.isInteger(a)?c=!0:a<e?c=!0:s||a!=e||(c=!0):c=!0,c?r(new Error(t)):r()}}},{key:"numMax",value:function(e,t){var s=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(i,a,r){var c=!1;o.isNumber(a)?n&&!o.isInteger(a)?c=!0:a>e?c=!0:s||a!=e||(c=!0):c=!0,c?r(new Error(t)):r()}}},{key:"numTwoDecimal",value:function(e){return function(t,s,n){var i=!1;o.isTwoDecimal(s)||(i=!0),i?n(new Error(e)):n()}}}]),e}(),l=new c},"7d89":function(e,t,s){},"88c1":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"chain-add-edit"},[s("div",{staticClass:"page-title"},[e._v(e._s(e.$t(e.isAddPage?"开始创建":"修改区块链")))]),s("div",{staticClass:"base-info im-card padding-20"},[s("div",{staticClass:"card-header"},[e._v(e._s(e.$t("基本信息")))]),s("div",{staticClass:"card-body"},[s("el-form",{ref:"form",attrs:{model:e.form,rules:e.formRules,"label-width":"220px","label-position":"left",size:"medium"}},[s("el-form-item",{attrs:{prop:"chainName"}},[s("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("区块链名称"))+" "),s("im-tooltip",{attrs:{content:e.$t("命名你的区块链")}})],1),s("el-input",{attrs:{tabindex:"1",clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.chainName,callback:function(t){e.$set(e.form,"chainName","string"===typeof t?t.trim():t)},expression:"form.chainName"}})],1),s("el-form-item",{attrs:{prop:"crypto",required:""}},[s("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("签名算法"))+" "),s("im-tooltip",{attrs:{content:e.$t("同一条链上的所有节点必须一致")}})],1),s("el-radio-group",{attrs:{disabled:!e.canChangeCrypto},model:{value:e.form.crypto,callback:function(t){e.$set(e.form,"crypto",t)},expression:"form.crypto"}},[s("el-radio",{attrs:{label:"eckey"}},[e._v("ECKey")]),s("el-radio",{attrs:{label:"sm2"}},[e._v("SM2")])],1)],1),s("el-form-item",{attrs:{prop:"p2pVersion"}},[s("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("p2pVersion(p2p节点版本号) "))+" "),s("im-tooltip",{attrs:{content:e.$t("同一条链上的所有节点必须一致")}})],1),s("el-input",{attrs:{tabindex:"2",clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.p2pVersion,callback:function(t){e.$set(e.form,"p2pVersion","string"===typeof t?t.trim():t)},expression:"form.p2pVersion"}})],1),s("el-form-item",{attrs:{prop:"consensus",required:""}},[s("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v(e._s(e.$t("共识模块")))]),s("el-radio-group",{model:{value:e.form.consensus,callback:function(t){e.$set(e.form,"consensus",t)},expression:"form.consensus"}},[s("el-radio",{attrs:{label:"dpos"}},[e._v("DPOS")])],1)],1)],1)],1)]),s("div",{staticClass:"genesis-info im-card padding-20"},[s("div",{staticClass:"card-header"},[e._v(e._s(e.$t("创世账户"))+"（"+e._s(e.genesisBlockAssets.length)+"）")]),s("div",{staticClass:"card-body"},[s("div",{staticClass:"asset-list"},[e._l(e.genesisBlockAssets,(function(t,n){return s("div",{key:n,staticClass:"asset-item"},[s("el-button",{staticClass:"op-btn",on:{click:function(s){return e.openGenesisAssetDialog(!1,t,n)}}},[s("i",{staticClass:"el-icon-edit"}),e._v(" "+e._s(t.accountName))]),s("i",{staticClass:"op-icon el-icon-delete",on:{click:function(t){return e.handleDeleteAssets(n)}}})],1)})),s("div",{staticClass:"asset-item new-add",on:{click:function(t){return e.openGenesisAssetDialog()}}},[s("el-button",{staticClass:"op-btn"},[e._v(e._s(e.$t("base.add")))]),s("i",{staticClass:"op-icon el-icon-circle-plus-outline"})],1)],2),e.genesisAssetDialogVisible?s("genesis-asset-dialog",{attrs:{visible:e.genesisAssetDialogVisible,asset:e.currentGenesisAsset},on:{"update:visible":function(t){e.genesisAssetDialogVisible=t},submit:e.handleSubmitGenesisAsset}}):e._e()],1)]),s("div",{staticClass:"page-footer"},[s("el-button",{staticClass:"im-button large",attrs:{type:"primary",disabled:!e.canOperate,loading:e.loading},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.complete")))]),s("el-button",{staticClass:"im-button large",on:{click:e.handleCancel}},[e._v(e._s(e.$t("base.cancel")))])],1)])},i=[],a=(s("a4d3"),s("4de4"),s("a434"),s("e439"),s("dbb4"),s("b64b"),s("d3b7"),s("159b"),s("ade3")),r=(s("96cf"),s("1da1")),o=s("8e6c"),c=s("75d9"),l=s("61f7");function u(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,n)}return s}function d(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?u(Object(s),!0).forEach((function(t){Object(a["a"])(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):u(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}var p={name:"chain-add-edit",components:{GenesisAssetDialog:c["default"],ImTooltip:o["a"]},data:function(){return{form:{chainName:"",crypto:"eckey",p2pVersion:"",consensus:"dpos"},canChangeCrypto:!0,genesisBlockAssets:[],genesisAssetDialogVisible:!1,currentGenesisAsset:{},currentGenesisAssetIndex:-1,canOperate:!1,loading:!1}},computed:{formRules:function(){return{chainName:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],p2pVersion:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:l["a"].numMin(0,this.$t("base.valid.gtZeroInt"),!1),trigger:"blur"},{validator:l["a"].numMax(2147483647,this.$t("base.valid.maxNumberValue")+": 2147483647"),trigger:"blur"},{validator:l["a"].numEqual(11111,this.$t("configuration.valid.mainnetPlaceholder")+": 11111"),trigger:"blur"},{validator:l["a"].numEqual(20180622,this.$t("configuration.valid.testnetPlaceholder")+": 20180622"),trigger:"blur"},{validator:l["a"].numEqual(1,this.$t("configuration.valid.specialPlaceholder")+": 1"),trigger:"blur"}]}},isAddPage:function(){return"chain-edit"!==this.$route.params.status}},created:function(){this.init()},methods:{init:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.isAddPage){e.next=10;break}return e.next=3,this.hasBlockChain();case 3:if(!e.sent){e.next=7;break}this.$notify({type:"warning",title:this.$t("base.warning"),message:this.$t("当前已有创建的区块链链，不可继续创建！")}),e.next=8;break;case 7:this.canOperate=!0;case 8:e.next=15;break;case 10:return e.next=12,this.hasBlockChain();case 12:if(!e.sent){e.next=15;break}this.getChainInfo(),this.checkChainPublish();case 15:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),hasBlockChain:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.loading=!0,e.abrupt("return",new Promise((function(e){t.$_api.getStarted.hasBlockChain({},(function(s,n){if(t.loading=!1,s)return e(!1);e(!0===n)}))})));case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),checkChainPublish:function(){var e=this;this.$_api.getStarted.checkChainPublish({},(function(t,s){t?e.chainStatus=-1:e.canOperate=0===s}))},getChainInfo:function(){var e=this;this.$_api.getStarted.getChainInfo({},(function(t){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t||(e.isAddPage||(Object.assign(e.form,{chainName:s.chainName,crypto:s.crypto,p2pVersion:s.p2pVersion,consensus:s.consensus}),e.canChangeCrypto=s.canChangeCrypto),e.genesisBlockAssets=s.genesisBlockAssets||[])}))},handleSubmit:function(){var e=this;this.$refs["form"].validate(function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(s){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:s&&(e.loading=!0,e.$_api.getStarted.addChainInfo(d({},e.form,{genesisBlockAssets:e.genesisBlockAssets}),(function(t){e.loading=!1,t||(e.$notify({type:"success",title:e.$t("base.successful"),message:e.$t("base.success.operate")}),e.$router.push("/get-started/dashboard"))})));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},handleCancel:function(){this.$router.push("/get-started")},openGenesisAssetDialog:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=arguments.length>2?arguments[2]:void 0;this.currentGenesisAsset=t,this.currentGenesisAssetIndex=e?this.genesisBlockAssets.length:s,this.genesisAssetDialogVisible=!0},handleSubmitGenesisAsset:function(e){this.genesisBlockAssets.splice(this.currentGenesisAssetIndex,1,e),this.currentGenesisAsset={},this.currentGenesisAssetIndex=-1},handleDeleteAssets:function(e){this.genesisBlockAssets.splice(e,1)}}},f=p,h=(s("f572"),s("2877")),b=Object(h["a"])(f,n,i,!1,null,"747b80e2",null);t["default"]=b.exports},a434:function(e,t,s){"use strict";var n=s("23e7"),i=s("23cb"),a=s("a691"),r=s("50c4"),o=s("7b0b"),c=s("65f0"),l=s("8418"),u=s("1dde"),d=Math.max,p=Math.min,f=9007199254740991,h="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!u("splice")},{splice:function(e,t){var s,n,u,b,g,m,v=o(this),y=r(v.length),k=i(e,y),C=arguments.length;if(0===C?s=n=0:1===C?(s=0,n=y-k):(s=C-2,n=p(d(a(t),0),y-k)),y+s-n>f)throw TypeError(h);for(u=c(v,n),b=0;b<n;b++)g=k+b,g in v&&l(u,b,v[g]);if(u.length=n,s<n){for(b=k;b<y-n;b++)g=b+n,m=b+s,g in v?v[m]=v[g]:delete v[m];for(b=y;b>y-n+s;b--)delete v[b-1]}else if(s>n)for(b=y-n;b>k;b--)g=b+n-1,m=b+s-1,g in v?v[m]=v[g]:delete v[m];for(b=0;b<s;b++)v[b+k]=arguments[b+2];return v.length=y-n+s,u}})},f572:function(e,t,s){"use strict";var n=s("7d89"),i=s.n(n);i.a}}]);
//# sourceMappingURL=chain-add-edit.3402b142.js.map