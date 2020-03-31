(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b6f0c3d0","chunk-5b266f54"],{"03e0":function(t,n,e){"use strict";var i=e("ef49"),o=e.n(i);o.a},"18b3":function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"box-view database-config"},[e("div",{staticClass:"box-body"},[e("el-form",{ref:"database-config-form",attrs:{model:t.form,"label-position":"left","label-width":"200px"}},[e("el-form-item",{attrs:{label:t.$t("configuration.selectDatabaseConfig"),prop:"storage_db_engine"}},[e("el-radio-group",{model:{value:t.form.storage_db_engine,callback:function(n){t.$set(t.form,"storage_db_engine",n)},expression:"form.storage_db_engine"}},[e("el-radio",{attrs:{label:"LEVELDB"}},[t._v("LevelDB")]),e("el-radio",{attrs:{label:"ROCKSDB"}},[t._v("RocksDB")])],1)],1),e("el-form-item",{attrs:{label:t.$t("configuration.isWriteSync"),prop:"storage_db_sync"}},[e("el-switch",{model:{value:t.form.storage_db_sync,callback:function(n){t.$set(t.form,"storage_db_sync",n)},expression:"form.storage_db_sync"}})],1),e("el-form-item",{attrs:{label:t.$t("configuration.isOpenTransaction"),prop:"storage_transHistory_switch"}},[e("el-switch",{attrs:{"active-value":"on","inactive-value":"off"},model:{value:t.form.storage_transHistory_switch,callback:function(n){t.$set(t.form,"storage_transHistory_switch",n)},expression:"form.storage_transHistory_switch"}})],1),e("el-form-item",{attrs:{label:t.$t("configuration.isNeedToUpdateAsset"),prop:"storage_needToUpdateAsset"}},[e("el-switch",{model:{value:t.form.storage_needToUpdateAsset,callback:function(n){t.$set(t.form,"storage_needToUpdateAsset",n)},expression:"form.storage_needToUpdateAsset"}})],1)],1)],1),e("div",{staticClass:"box-footer align-right"},[e("el-button",{staticClass:"im-button large",on:{click:t.handleCancel}},[t._v(t._s(t.$t("base.prevStep")))]),e("el-button",{staticClass:"im-button large",attrs:{loading:t.loading,disabled:t.configLoading,type:"primary"},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("base.nextStep")))])],1)])},o=[],s={name:"database-config",props:{initConfigInfo:{type:Function,required:!0},configLoading:Boolean},data:function(){return{form:{},showContent:!0,loading:!1}},created:function(){this.getConfigInfo()},methods:{getConfigInfo:function(){var t=this;this.initConfigInfo().then((function(n){return t.form=n||{}}))},handleSubmit:function(){var t=this;this.$refs["database-config-form"].validate((function(n){if(n){var e={isDBSync:t.form.storage_db_sync,isOpenTransaction:t.form.storage_transHistory_switch,dbEnine:t.form.storage_db_engine,needToUpdateAsset:t.form.storage_needToUpdateAsset};t.loading=!0,t.$_api.configuration.dbConfig(e,(function(n){t.loading=!1,n||(t.$notify({type:"success",title:t.$t("base.successful"),message:t.$t("configuration.databaseSaveSuccess")}),t.$emit("next-step"))}))}}))},handleCancel:function(){this.$emit("prev-step")}}},a=s,c=(e("690c"),e("2877")),r=Object(c["a"])(a,i,o,!1,null,"0128fab0",null);n["default"]=r.exports},"690c":function(t,n,e){"use strict";var i=e("f16d"),o=e.n(i);o.a},c7c7:function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"custom-config"},[e("ul",{staticClass:"im-steps config-steps"},t._l(t.stepsList,(function(n,i){return e("li",{staticClass:"im-step",class:{"is-active":t.activeIndex===i+1}},[e("div",{staticClass:"im-step__body",on:{click:function(e){return t.handleStep(n,i+1)}}},[e("span",{staticClass:"im-step__body-index"},[t._v(t._s(i+1))]),e("span",{staticClass:"im-step__body-title"},[t._v(t._s(n.title))])])])})),0),e("div",{staticClass:"config-title"},[t._v(t._s(t.activeIndex+". "+t.activeStep.title))]),e(t.activeStep.component,{tag:"component",attrs:{"config-loading":t.configLoading,"init-config-info":t.initConfigInfo},on:{"update:configLoading":function(n){t.configLoading=n},"update:config-loading":function(n){t.configLoading=n},"prev-step":t.handlePrevStep,"next-step":t.handleNextStep}})],1)},o=[],s=(e("c740"),e("d3b7"),e("18b3")),a={name:"custom-config",components:{GenesisConfig:function(){return Promise.all([e.e("chunk-394f0c80"),e.e("chunk-1c5403ee")]).then(e.bind(null,"1717"))},BaseConfig:function(){return e.e("chunk-0f88cf4a").then(e.bind(null,"ea4d"))},NetworkConfig:function(){return e.e("chunk-2abae3ea").then(e.bind(null,"bada"))},DatabaseConfig:s["default"],P2PConfig:function(){return e.e("chunk-11dc68d1").then(e.bind(null,"56e3"))},ModulesConfig:function(){return e.e("chunk-67a78094").then(e.bind(null,"4596"))}},data:function(){return{stepsList:[{title:this.$t("configuration.genesisInfo"),path:"genesis",component:"GenesisConfig"},{title:this.$t("configuration.baseConfig"),path:"base",component:"BaseConfig"},{title:this.$t("configuration.netWorkConfig"),path:"network",component:"NetworkConfig"},{title:this.$t("configuration.databaseConfig"),path:"database",component:"DatabaseConfig"},{title:this.$t("configuration.p2pConfig"),path:"p2p",component:"P2PConfig"},{title:this.$t("configuration.moduleFunction"),path:"modules",component:"ModulesConfig"}],configLoading:!1}},computed:{stepPath:function(){return this.$route.params.step},activeIndex:{get:function(){var t=this;return this.stepsList.findIndex((function(n){return n.path===t.stepPath}))+1},set:function(t){this.$router.push({path:"/configuration/custom/"+this.stepsList[t-1].path})}},activeStep:function(){return this.stepsList[this.activeIndex-1]}},created:function(){this.activeMenuIndex()},methods:{activeMenuIndex:function(){this.$eventBus.$emit("menuActiveIndex","/configuration/quick")},handleStep:function(t,n){this.activeIndex=n},handlePrevStep:function(){this.activeIndex-=1},handleNextStep:function(){this.activeIndex+=1},initConfigInfo:function(t){var n=this;return t=t||this.stepPath,new Promise((function(e){n.configLoading=!0,n.$_api.configuration.getConfigInfo({},(function(i){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(n.configLoading=!1,i)return e({});if("genesis"===t)e({genesisAssetConfig:o.genesisAssetConfig,genesisWitnessConfig:o.genesisWitnessConfig});else{var s={base:"baseSettingConfig",network:"networkConfig",database:"dbConfig",p2p:"p2pConfig"};e(o[s[t]])}}))}))}}},c=a,r=(e("03e0"),e("2877")),f=Object(r["a"])(c,i,o,!1,null,"11d80da8",null);n["default"]=f.exports},ef49:function(t,n,e){},f16d:function(t,n,e){}}]);
//# sourceMappingURL=chunk-b6f0c3d0.dd85530d.js.map