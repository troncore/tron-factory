(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chain-add-edit"],{"61f7":function(e,t,n){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function i(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}n.d(t,"a",(function(){return l}));var r=function(){function e(){s(this,e)}return i(e,[{key:"isNumber",value:function(e){return/^\d+(\.\d+)?$/.test(e)}},{key:"isInteger",value:function(e){return/^\d+$/.test(e)}},{key:"isTwoDecimal",value:function(e){return/^([1-9]\d*|0)(\.\d{1,2})$/.test(e)}},{key:"isIP",value:function(e){return/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(e)}}]),e}(),c=new r,o=function(){function e(){s(this,e)}return i(e,[{key:"numEqual",value:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(s,a,i){var r=!1;c.isNumber(a)?a==e?r=!0:n||a==e||(r=!0):r=!0,r?i(new Error(t)):i()}}},{key:"numMin",value:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(a,i,r){var o=!1;c.isNumber(i)?s&&!c.isInteger(i)||i<e?o=!0:n||i!=e||(o=!0):o=!0,o?r(new Error(t)):r()}}},{key:"numMax",value:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(a,i,r){var o=!1;c.isNumber(i)?s&&!c.isInteger(i)||i>e?o=!0:n||i!=e||(o=!0):o=!0,o?r(new Error(t)):r()}}},{key:"numTwoDecimal",value:function(e){return function(t,n,s){var a=!1;c.isTwoDecimal(n)||(a=!0),a?s(new Error(e)):s()}}}]),e}(),l=new o},"88c1":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"chain-add-edit"},[n("div",{staticClass:"page-title"},[e._v(e._s(e.$t(e.isAddPage?e.$t("getStarted.chainManage.startCreate"):"getStarted.chainManage.updateChain")))]),n("div",{staticClass:"base-info im-card padding-20"},[n("div",{staticClass:"card-header"},[e._v(e._s(e.$t("getStarted.chainManage.baseInfo")))]),n("div",{staticClass:"card-body"},[n("el-form",{ref:"form",attrs:{model:e.form,rules:e.formRules,"label-width":"160px","label-position":"left",size:"medium"}},[n("el-form-item",{attrs:{prop:"chainName"}},[n("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v(" "+e._s(e.$t("getStarted.chainManage.chainNameLabel"))+" "),n("im-tooltip",{attrs:{content:e.$t("getStarted.chainManage.chainNameTips")}})],1),n("el-input",{attrs:{tabindex:"1",clearable:"",maxlength:"30"},model:{value:e.form.chainName,callback:function(t){e.$set(e.form,"chainName","string"===typeof t?t.trim():t)},expression:"form.chainName"}})],1),n("el-form-item",{attrs:{prop:"crypto",required:""}},[n("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v(" "+e._s(e.$t("getStarted.chainManage.encryptionLabel"))+" "),n("im-tooltip",{attrs:{content:e.$t("getStarted.chainManage.encryptionTips")}})],1),n("el-radio-group",{attrs:{disabled:!e.canChangeCrypto},model:{value:e.form.crypto,callback:function(t){e.$set(e.form,"crypto",t)},expression:"form.crypto"}},[n("el-radio",{attrs:{label:"eckey"}},[e._v("ECKey (Secp256k1)")]),n("el-radio",{attrs:{label:"sm2"}},[e._v("SM2")])],1)],1),n("el-form-item",{attrs:{prop:"p2pVersion"}},[n("span",{staticClass:"space-between",attrs:{slot:"label"},slot:"label"},[e._v(" "+e._s(e.$t("getStarted.chainManage.p2pVersionLabel"))+" "),n("im-tooltip",{attrs:{content:e.$t("getStarted.chainManage.p2pVersionTips")}})],1),n("el-input",{attrs:{tabindex:"2",clearable:""},model:{value:e.form.p2pVersion,callback:function(t){e.$set(e.form,"p2pVersion","string"===typeof t?t.trim():t)},expression:"form.p2pVersion"}})],1)],1)],1)]),n("div",{staticClass:"genesis-info im-card padding-20"},[n("div",{staticClass:"card-header"},[e._v(e._s(e.$t("getStarted.chainManage.genesisAccount"))+"（"+e._s(e.genesisBlockAssets.length)+"）")]),n("div",{staticClass:"card-body"},[n("div",{staticClass:"asset-list"},[e._l(e.genesisBlockAssets,(function(t,s){return n("div",{key:s,staticClass:"asset-item"},[n("el-button",{staticClass:"op-btn",on:{click:function(n){return e.openGenesisAssetDialog(!1,t,s)}}},[n("i",{staticClass:"el-icon-edit"}),e._v(" "+e._s(t.accountName))]),"Blackhole"!==t.accountName?n("i",{staticClass:"op-icon el-icon-delete",on:{click:function(t){return e.handleDeleteAssets(s)}}}):e._e()],1)})),n("div",{staticClass:"asset-item new-add",on:{click:function(t){return e.openGenesisAssetDialog()}}},[n("el-button",{staticClass:"op-btn"},[e._v(e._s(e.$t("base.add")))]),n("i",{staticClass:"op-icon el-icon-circle-plus-outline"})],1)],2),e.genesisAssetDialogVisible?n("genesis-asset-dialog",{attrs:{visible:e.genesisAssetDialogVisible,"is-add":e.isAddGenesisAsset,asset:e.currentGenesisAsset,"asset-list":e.genesisBlockAssets},on:{"update:visible":function(t){e.genesisAssetDialogVisible=t},submit:e.handleSubmitGenesisAsset}}):e._e()],1)]),n("div",{staticClass:"page-footer align-right"},[n("el-button",{staticClass:"im-button large",on:{click:e.handleCancel}},[e._v(e._s(e.$t("base.cancel")))]),n("el-button",{staticClass:"im-button large",attrs:{type:"primary",disabled:!e.canOperate,loading:e.loading},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.save")))])],1)])},a=[],i=(n("c740"),n("a434"),n("d3b7"),n("5530")),r=(n("96cf"),n("1da1")),c=n("8e6c"),o=n("75d9"),l=n("61f7"),u={name:"chain-add-edit",components:{GenesisAssetDialog:o["default"],ImTooltip:c["a"]},data:function(){return{form:{chainName:"",crypto:"",p2pVersion:"",consensus:""},canChangeCrypto:!0,genesisBlockAssets:[],genesisAssetDialogVisible:!1,isAddGenesisAsset:!0,currentGenesisAsset:{},currentGenesisAssetIndex:-1,canOperate:!1,loading:!1}},computed:{formRules:function(){var e=this,t=function(t,n,s){/^[a-zA-z0-9]{1,30}$/.test(n)?s():s(e.$t("getStarted.chainManage.chainNameCheckLength"))};return{chainName:[{required:!0,message:" ",trigger:"change"},{validator:t,trigger:"change"}],p2pVersion:[{required:!0,message:" ",trigger:"change"},{validator:l["a"].numMin(0,this.$t("base.valid.gtZeroInt"),!1),trigger:"change"},{validator:l["a"].numMax(2147483647,this.$t("base.valid.maxNumberValue")+": 2147483647"),trigger:"change"},{validator:l["a"].numEqual(11111,this.$t("getStarted.chainManage.p2pVersionCheckMainNet")),trigger:"change"},{validator:l["a"].numEqual(20180622,this.$t("getStarted.chainManage.p2pVersionCheckTestNet")),trigger:"change"},{validator:l["a"].numEqual(1,this.$t("getStarted.chainManage.p2pVersionCheckSpecialNet")),trigger:"change"}]}},isAddPage:function(){return"chain-edit"!==this.$route.params.status}},created:function(){this.init()},methods:{init:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.isAddPage){t.next=10;break}return t.next=3,e.hasBlockChain();case 3:if(!t.sent){t.next=7;break}e.$notify({type:"warning",title:e.$t("base.warning"),message:e.$t("getStarted.chainManage.existChain")}),t.next=8;break;case 7:e.canOperate=!0;case 8:t.next=14;break;case 10:return t.next=12,e.hasBlockChain();case 12:if(!t.sent){t.next=14;break}e.checkChainPublish();case 14:e.getChainInfo();case 15:case"end":return t.stop()}}),t)})))()},hasBlockChain:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t){e.$_api.getStarted.hasBlockChain({},(function(e,n){if(e)return t(!1);t(!0===n)}))})));case 1:case"end":return t.stop()}}),t)})))()},checkChainPublish:function(){var e=this;this.$_api.getStarted.checkChainPublish({},(function(t,n){t?e.chainStatus=-1:e.canOperate=0===n}))},getChainInfo:function(){var e=this;this.$_api.getStarted.getChainInfo({},(function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t||(e.form.chainName=n.chainName,e.canChangeCrypto=n.canChangeCrypto,e.form.crypto=n.crypto,e.form.p2pVersion=n.p2pVersion,e.form.consensus=n.consensus,e.genesisBlockAssets=n.genesisBlockAssets||[])}))},handleSubmit:function(){var e=this;this.$refs["form"].validate(function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!n){t.next=9;break}if(-1!==e.genesisBlockAssets.findIndex((function(e){return"Blackhole"===e.accountName}))){t.next=4;break}return e.$notify({type:"warning",title:e.$t("base.warning"),message:e.$t("getStarted.chainManage.needBlackhole")}),t.abrupt("return");case 4:if(!(e.genesisBlockAssets.length<=1)){t.next=7;break}return e.$notify({type:"warning",title:e.$t("base.warning"),message:e.$t("getStarted.chainManage.needMoreAsset")}),t.abrupt("return");case 7:e.loading=!0,e.$_api.getStarted.addChainInfo(Object(i["a"])(Object(i["a"])({},e.form),{},{genesisBlockAssets:e.genesisBlockAssets}),(function(t){e.loading=!1,t||(e.$notify({type:"success",title:e.$t("base.successful"),message:e.$t("base.success.operate")}),e.$router.push("/get-started/dashboard"))}));case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},handleCancel:function(){this.$router.push("/get-started")},openGenesisAssetDialog:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;this.isAddGenesisAsset=e,this.currentGenesisAsset=t,this.currentGenesisAssetIndex=this.isAddGenesisAsset?this.genesisBlockAssets.length:n,this.genesisAssetDialogVisible=!0},handleSubmitGenesisAsset:function(e){this.genesisBlockAssets.splice(this.currentGenesisAssetIndex,1,e),this.currentGenesisAsset={},this.currentGenesisAssetIndex=-1},handleDeleteAssets:function(e){this.genesisBlockAssets.splice(e,1)}}},d=u,g=(n("bc9e"),n("2877")),h=Object(g["a"])(d,s,a,!1,null,"0113696e",null);t["default"]=h.exports},"9b2b":function(e,t,n){},a434:function(e,t,n){"use strict";var s=n("23e7"),a=n("23cb"),i=n("a691"),r=n("50c4"),c=n("7b0b"),o=n("65f0"),l=n("8418"),u=n("1dde"),d=n("ae40"),g=u("splice"),h=d("splice",{ACCESSORS:!0,0:0,1:2}),f=Math.max,p=Math.min,m=9007199254740991,b="Maximum allowed length exceeded";s({target:"Array",proto:!0,forced:!g||!h},{splice:function(e,t){var n,s,u,d,g,h,v=c(this),k=r(v.length),C=a(e,k),A=arguments.length;if(0===A?n=s=0:1===A?(n=0,s=k-C):(n=A-2,s=p(f(i(t),0),k-C)),k+n-s>m)throw TypeError(b);for(u=o(v,s),d=0;d<s;d++)g=C+d,g in v&&l(u,d,v[g]);if(u.length=s,n<s){for(d=C;d<k-s;d++)g=d+s,h=d+n,g in v?v[h]=v[g]:delete v[h];for(d=k;d>k-s+n;d--)delete v[d-1]}else if(n>s)for(d=k-s;d>C;d--)g=d+s-1,h=d+n-1,g in v?v[h]=v[g]:delete v[h];for(d=0;d<n;d++)v[d+C]=arguments[d+2];return v.length=k-s+n,u}})},bc9e:function(e,t,n){"use strict";var s=n("9b2b"),a=n.n(s);a.a},c740:function(e,t,n){"use strict";var s=n("23e7"),a=n("b727").findIndex,i=n("44d2"),r=n("ae40"),c="findIndex",o=!0,l=r(c);c in[]&&Array(1)[c]((function(){o=!1})),s({target:"Array",proto:!0,forced:o||!l},{findIndex:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),i(c)}}]);
//# sourceMappingURL=chain-add-edit.58c889b9.js.map