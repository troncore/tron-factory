(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2eadb71f","chunk-721c5dc2","chunk-2d0ba365"],{"1ea6":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"box-view genesis-config"},[s("div",{staticClass:"box-body"},[s("div",{staticClass:"asset-list"},[s("div",{staticClass:"asset-title"},[e._v("账户信息")]),e._l(e.genesisBlockAssets,(function(t,i){return s("div",{key:i,staticClass:"asset-item"},[s("el-button",{staticClass:"op-btn",on:{click:function(s){return e.handleAddAsset(!1,t,i)}}},[s("i",{staticClass:"el-icon-edit"}),e._v(" "+e._s(t.accountName))]),s("i",{staticClass:"op-icon el-icon-delete",on:{click:function(t){return e.handleDeleteAssets(i)}}})],1)})),s("div",{staticClass:"asset-item new-add",on:{click:e.handleAddAsset}},[s("el-button",{staticClass:"op-btn"},[e._v("新增")]),s("i",{staticClass:"op-icon el-icon-circle-plus-outline"})],1)],2),s("div",{staticClass:"asset-list"},[s("div",{staticClass:"asset-title"},[e._v("Witness 节点信息")]),e._l(e.genesisBlockWitnesses,(function(t,i){return s("div",{key:i,staticClass:"asset-item"},[s("el-button",{staticClass:"op-btn",on:{click:function(s){return e.handleViewWitness(t,i)}}},[e._v(e._s(t.address))])],1)}))],2)]),s("div",{staticClass:"box-footer align-right"},[s("el-button",{staticClass:"im-button large",attrs:{loading:e.loading,type:"primary"},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.nextStep")))])],1),e.assetDialogVisible?s("add-asset-dialog",{attrs:{visible:e.assetDialogVisible,"is-adding":e.isAddingAsset,"genesis-block-assets":e.genesisBlockAssets,"asset-info":e.currentAssetInfo,"asset-index":e.currentAssetIndex},on:{"update:visible":function(t){e.assetDialogVisible=t},success:e.getConfigInfo}}):e._e(),e.witnessDialogVisible?s("view-witness-dialog",{attrs:{visible:e.witnessDialogVisible,"witness-info":e.currentWitnessInfo},on:{"update:visible":function(t){e.witnessDialogVisible=t}}}):e._e()],1)},n=[],a=(s("a4d3"),s("4de4"),s("a434"),s("e439"),s("dbb4"),s("b64b"),s("d3b7"),s("159b"),s("ade3")),o=s("5bf9"),l=s("35f3");function r(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,i)}return s}function c(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?r(Object(s),!0).forEach((function(t){Object(a["a"])(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):r(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}var u={name:"genesis-config",components:{ViewWitnessDialog:l["default"],AddAssetDialog:o["default"]},props:{initConfigInfo:{default:function(){return function(){return Promise.resolve({})}}}},data:function(){return{configInfo:{},isAddingAsset:!0,assetDialogVisible:!1,currentAssetInfo:{},currentAssetIndex:-1,witnessDialogVisible:!1,currentWitnessInfo:{address:"",url:"",voteCount:"",privateKey:""},loading:!1}},computed:{genesisAssetConfig:function(){return this.configInfo.genesisAssetConfig||{}},genesisWitnessConfig:function(){return this.configInfo.genesisWitnessConfig||{}},genesisBlockAssets:function(){return this.genesisAssetConfig.genesis_block_assets||[]},genesisBlockWitnesses:function(){return this.genesisWitnessConfig.genesis_block_witnesses||[]}},created:function(){this.getConfigInfo()},methods:{getConfigInfo:function(){var e=this;this.initConfigInfo("genesis").then((function(t){return e.configInfo=t}))},handleAddAsset:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=arguments.length>2?arguments[2]:void 0;this.currentAssetInfo=c({accountName:"",accountType:"",address:"",balance:""},e?{}:t),this.currentAssetIndex=e?this.genesisBlockAssets.length:s,this.isAddingAsset=e,this.assetDialogVisible=!0},handleDeleteAssets:function(e){var t=this;this.genesisBlockAssets.splice(e,1),this.$_api.configuring.genesisAssetConfig({assets:this.genesisBlockAssets},(function(e,s){e||t.$notify({type:"success",title:t.$t("base.successful"),message:t.$t("configManage.assetDeleteSuccess")})}))},handleViewWitness:function(e){this.currentWitnessInfo=e,this.witnessDialogVisible=!0},handleSubmit:function(){this.$emit("next-step")}}},f=u,d=(s("d96d"),s("2877")),b=Object(d["a"])(f,i,n,!1,null,"1b2bb31e",null);t["default"]=b.exports},"35f3":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-dialog",{attrs:{visible:e.dialogVisible,"custom-class":"im-dialog","close-on-click-modal":!1,"close-on-press-escape":!1,width:"680px",center:""},on:{"update:visible":function(t){e.dialogVisible=t}}},[s("div",{staticClass:"dialog-header",attrs:{slot:"title"},slot:"title"},[s("div",{staticClass:"title"},[e._v(e._s(e.$t("configManage.witnessDialogTitle")))])]),s("div",{staticClass:"dialog-content"},[s("el-form",{attrs:{model:e.witnessInfo,"label-width":"120px","label-position":"right"}},[s("el-form-item",{attrs:{label:"Address :",prop:"address"}},[e._v(" "+e._s(e.witnessInfo.address)+" ")]),s("el-form-item",{attrs:{label:"URL :",prop:"url"}},[e._v(" "+e._s(e.witnessInfo.url)+" ")]),s("el-form-item",{attrs:{label:"VoteCount :",prop:"voteCount"}},[e._v(" "+e._s(e.witnessInfo.voteCount)+" ")])],1)],1)])},n=[],a={name:"DialogViewGenesisWitness",props:{visible:{},witnessInfo:{}},computed:{dialogVisible:{get:function(){return this.visible},set:function(e){this.$emit("update:visible",e)}}}},o=a,l=s("2877"),r=Object(l["a"])(o,i,n,!1,null,"25a2d611",null);t["default"]=r.exports},"391a":function(e,t,s){"use strict";var i=s("9b28"),n=s.n(i);n.a},"5bf9":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-dialog",{attrs:{visible:e.dialogVisible,"custom-class":"im-dialog","close-on-click-modal":!1,"close-on-press-escape":!1,width:"680px",center:""},on:{"update:visible":function(t){e.dialogVisible=t}}},[s("div",{staticClass:"dialog-header",attrs:{slot:"title"},slot:"title"},[s("div",{staticClass:"title"},[e._v(e._s(e.$t("configManage.assetDialogTitle")))])]),s("div",{staticClass:"dialog-content"},[s("el-form",{ref:"dialog-form",attrs:{rules:e.assetRules,model:e.form,"label-width":"150px","label-position":"right"}},[s("el-form-item",{attrs:{prop:"accountName"}},[s("span",{attrs:{slot:"label"},slot:"label"},[e._v(" accountName "),s("el-tooltip",{attrs:{effect:"dark",content:e.$t("configManage.helpTips.accountName"),placement:"top"}},[s("i",{staticClass:"fa fa-question-circle-o"})])],1),s("el-input",{attrs:{tabindex:"26",clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.accountName,callback:function(t){e.$set(e.form,"accountName","string"===typeof t?t.trim():t)},expression:"form.accountName"}})],1),s("el-form-item",{attrs:{prop:"accountType"}},[s("span",{attrs:{slot:"label"},slot:"label"},[e._v(" accountType "),s("el-tooltip",{attrs:{effect:"dark",content:e.$t("configManage.helpTips.accountType"),placement:"top"}},[s("i",{staticClass:"fa fa-question-circle-o"})])],1),s("el-select",{attrs:{filterable:"",clearable:"",placeholder:e.$t("base.pleaseSelect")},model:{value:e.form.accountType,callback:function(t){e.$set(e.form,"accountType",t)},expression:"form.accountType"}},e._l(e.accountTypeOptions,(function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),s("el-form-item",{attrs:{prop:"address"}},[s("span",{attrs:{slot:"label"},slot:"label"},[e._v(" address "),s("el-tooltip",{attrs:{effect:"dark",content:e.$t("configManage.helpTips.address"),placement:"top"}},[s("i",{staticClass:"fa fa-question-circle-o"})])],1),s("el-input",{attrs:{tabindex:"27",clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.address,callback:function(t){e.$set(e.form,"address","string"===typeof t?t.trim():t)},expression:"form.address"}})],1),s("el-form-item",{attrs:{label:"balance",prop:"balance"}},[s("span",{attrs:{slot:"label"},slot:"label"},[e._v(" balance "),s("el-tooltip",{attrs:{effect:"dark",content:e.$t("configManage.helpTips.balance"),placement:"top"}},[s("i",{staticClass:"fa fa-question-circle-o"})])],1),s("el-input",{attrs:{tabindex:"28",type:"number",clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.balance,callback:function(t){e.$set(e.form,"balance","string"===typeof t?t.trim():t)},expression:"form.balance"}})],1)],1)],1),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.save")))]),s("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v(e._s(e.$t("base.cancel")))])],1)])},n=[],a=(s("a4d3"),s("4de4"),s("a434"),s("e439"),s("dbb4"),s("b64b"),s("d3b7"),s("159b"),s("2909")),o=(s("96cf"),s("1da1")),l=s("ade3");s("d01b");function r(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,i)}return s}function c(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?r(Object(s),!0).forEach((function(t){Object(l["a"])(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):r(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}var u={name:"DialogAddGenesisAsset",props:["visible","isAdding","genesisBlockAssets","assetInfo","assetIndex"],data:function(){return{form:{accountName:"",accountType:"",address:"",balance:""},accountTypeOptions:[{value:"AssetIssue",label:"AssetIssue"}],loading:!1}},computed:{dialogVisible:{get:function(){return this.visible},set:function(e){this.$emit("update:visible",e)}},assetRules:function(){return{accountName:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],accountType:[{required:!0,message:this.$t("base.pleaseSelect"),trigger:"blur"}],address:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}],balance:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"}]}}},created:function(){this.form=c({},this.form,{},this.assetInfo)},methods:{handleSubmit:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.$refs["dialog-form"].validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(s){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!s){e.next=10;break}return t.loading=!0,e.next=4,t.checkBalance(t.form.balance);case 4:if(e.sent){e.next=7;break}return t.loading=!1,e.abrupt("return",!1);case 7:i=Object(a["a"])(t.genesisBlockAssets),i.splice(t.assetIndex,1,t.form),t.$_api.configuring.genesisAssetConfig({assets:i},(function(e,s){t.loading=!1,e||(t.$message.success(t.$t("configManage.assetSaveSuccess")),t.$emit("success"),t.dialogVisible=!1)}));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),checkBalance:function(e){var t=this;return new Promise((function(s){t.$_api.configuring.checkBalance({balance:e},(function(e,i){if(e)return s(!1);i.result?s(!0):(t.$message.error(t.$t("configManage.valid.maxVoteCountValue")),s(!1))}))}))}}},f=u,d=(s("391a"),s("2877")),b=Object(d["a"])(f,i,n,!1,null,"60303764",null);t["default"]=b.exports},"66c4":function(e,t,s){},"9b28":function(e,t,s){},d96d:function(e,t,s){"use strict";var i=s("66c4"),n=s.n(i);n.a}}]);
//# sourceMappingURL=chunk-2eadb71f.e7dc919f.js.map