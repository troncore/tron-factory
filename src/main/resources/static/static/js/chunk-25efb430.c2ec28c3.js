(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-25efb430","chunk-95af8b86"],{"18b3":function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"box-view database-config"},[e("div",{staticClass:"box-body"},[e("el-form",{ref:"database-config-form",attrs:{model:t.form,rules:t.formRules,"label-position":"left","label-width":"200px"}},[e("el-form-item",{attrs:{label:t.$t("configuration.selectDatabaseConfig"),prop:"storage_db_engine"}},[e("el-radio-group",{model:{value:t.form.dbEnine,callback:function(n){t.$set(t.form,"dbEnine",n)},expression:"form.dbEnine"}},[e("el-radio",{attrs:{label:"LEVELDB"}},[t._v("LevelDB")]),e("el-radio",{attrs:{label:"ROCKSDB"}},[t._v("RocksDB")])],1)],1),e("el-form-item",{attrs:{label:t.$t("configuration.isWriteSync"),prop:"storage_db_sync"}},[e("el-switch",{model:{value:t.form.isDBSync,callback:function(n){t.$set(t.form,"isDBSync",n)},expression:"form.isDBSync"}})],1),e("el-form-item",{attrs:{label:t.$t("configuration.isOpenTransaction"),prop:"storage_transHistory_switch"}},[e("el-switch",{attrs:{"active-value":"on","inactive-value":"off"},model:{value:t.form.isOpenTransaction,callback:function(n){t.$set(t.form,"isOpenTransaction",n)},expression:"form.isOpenTransaction"}})],1),e("div",{staticClass:"more-setting"},[e("el-checkbox",{on:{change:t.handleChangeCheckCustom},model:{value:t.checkDBCustom,callback:function(n){t.checkDBCustom=n},expression:"checkDBCustom"}},[e("span",{staticClass:"check-label"},[t._v(t._s(t.$t("configuration.dbCustomModule")))])])],1),e("el-form-item",{ref:"db-custom",staticClass:"db-custom",attrs:{prop:"dbCustom"}},[e("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},maxlength:300,disabled:!t.checkDBCustom,placeholder:t.$t(t.checkDBCustom?"configuration.valid.inputDBCustom":"configuration.valid.checkDBCustom")},model:{value:t.form.dbCustom,callback:function(n){t.$set(t.form,"dbCustom","string"===typeof n?n.trim():n)},expression:"form.dbCustom"}})],1)],1)],1),e("div",{staticClass:"box-footer align-right"},[e("el-button",{staticClass:"im-button large",on:{click:t.handleCancel}},[t._v(t._s(t.$t("base.prevStep")))]),e("el-button",{staticClass:"im-button large",attrs:{loading:t.loading,disabled:t.configLoading,type:"primary"},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("base.nextStep")))])],1)])},o=[],s=(e("a4d3"),e("4de4"),e("e439"),e("dbb4"),e("b64b"),e("8a79"),e("159b"),e("ade3"));function a(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,i)}return e}function c(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?a(Object(e),!0).forEach((function(n){Object(s["a"])(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):a(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}var r={name:"database-config",props:{initConfigInfo:{type:Function,required:!0},configLoading:Boolean},data:function(){return{form:{dbEnine:"",isDBSync:!1,isOpenTransaction:"",dbCustom:""},checkDBCustom:!1,showContent:!0,loading:!1}},computed:{formRules:function(){var t=this,n=function(n,e,i){t.checkDBCustom&&!t.form.dbCustom.endsWith(".jar")?i(new Error(t.$t("configuration.valid.pathEndJAR"))):i()};return{dbCustom:[{required:this.checkDBCustom,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:n,trigger:"blur"}]}}},created:function(){this.getConfigInfo()},methods:{getConfigInfo:function(){var t=this;this.initConfigInfo().then((function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t.form.dbEnine=n.storage_db_engine,t.form.isDBSync=n.storage_db_sync,t.form.isOpenTransaction=n.storage_transHistory_switch,t.form.dbCustom=n.storage_db_custom||"",t.checkDBCustom=!!t.form.dbCustom}))},handleChangeCheckCustom:function(t){t&&setTimeout(this.$refs["db-custom"].clearValidate,0)},handleSubmit:function(){var t=this;this.$refs["database-config-form"].validate((function(n){n&&(t.loading=!0,t.$_api.configuration.dbConfig(c({},t.form,{dbCustom:t.checkDBCustom?t.form.dbCustom:""}),(function(n){t.loading=!1,n||(t.$notify({type:"success",title:t.$t("base.successful"),message:t.$t("configuration.databaseSaveSuccess")}),t.$emit("next-step"))})))}))},handleCancel:function(){this.$emit("prev-step")}}},u=r,f=(e("6c8f"),e("2877")),l=Object(f["a"])(u,i,o,!1,null,"cc85ed48",null);n["default"]=l.exports},"6c8f":function(t,n,e){"use strict";var i=e("b678"),o=e.n(i);o.a},"8a79":function(t,n,e){"use strict";var i=e("23e7"),o=e("06cf").f,s=e("50c4"),a=e("5a34"),c=e("1d80"),r=e("ab13"),u=e("c430"),f="".endsWith,l=Math.min,d=r("endsWith"),g=!u&&!d&&!!function(){var t=o(String.prototype,"endsWith");return t&&!t.writable}();i({target:"String",proto:!0,forced:!g&&!d},{endsWith:function(t){var n=String(c(this));a(t);var e=arguments.length>1?arguments[1]:void 0,i=s(n.length),o=void 0===e?i:l(s(e),i),r=String(t);return f?f.call(n,r,o):n.slice(o-r.length,o)===r}})},"9fa8":function(t,n,e){"use strict";var i=e("ec27"),o=e.n(i);o.a},b678:function(t,n,e){},c7c7:function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"custom-config"},[e("ul",{staticClass:"im-steps config-steps"},t._l(t.stepsList,(function(n,i){return e("li",{staticClass:"im-step",class:{"is-active":t.activeIndex===i+1}},[e("div",{staticClass:"im-step__body",on:{click:function(e){return t.handleStep(n,i+1)}}},[e("span",{staticClass:"im-step__body-index"},[t._v(t._s(i+1))]),e("span",{staticClass:"im-step__body-title"},[t._v(t._s(n.title))])])])})),0),e("div",{staticClass:"config-title"},[t._v(t._s(t.activeIndex+". "+t.activeStep.title))]),e(t.activeStep.component,{tag:"component",attrs:{"config-loading":t.configLoading,"init-config-info":t.initConfigInfo},on:{"update:configLoading":function(n){t.configLoading=n},"update:config-loading":function(n){t.configLoading=n},"prev-step":t.handlePrevStep,"next-step":t.handleNextStep}})],1)},o=[],s=(e("c740"),e("d3b7"),e("18b3")),a={name:"custom-config",components:{GenesisConfig:function(){return Promise.all([e.e("chunk-1368f67c"),e.e("chunk-29d3d1c7")]).then(e.bind(null,"1717"))},BaseConfig:function(){return e.e("chunk-3da1c4e9").then(e.bind(null,"ea4d"))},NetworkConfig:function(){return e.e("chunk-c1dabb9c").then(e.bind(null,"bada"))},DatabaseConfig:s["default"],P2PConfig:function(){return e.e("chunk-2d2b8dd8").then(e.bind(null,"56e3"))},ModulesConfig:function(){return e.e("chunk-572bfae6").then(e.bind(null,"4596"))}},data:function(){return{stepsList:[{title:this.$t("configuration.genesisInfo"),path:"genesis",component:"GenesisConfig"},{title:this.$t("configuration.baseConfig"),path:"base",component:"BaseConfig"},{title:this.$t("configuration.netWorkConfig"),path:"network",component:"NetworkConfig"},{title:this.$t("configuration.databaseConfig"),path:"database",component:"DatabaseConfig"},{title:this.$t("configuration.p2pConfig"),path:"p2p",component:"P2PConfig"},{title:this.$t("configuration.moduleFunction"),path:"modules",component:"ModulesConfig"}],configLoading:!1}},computed:{stepPath:function(){return this.$route.params.step},activeIndex:{get:function(){var t=this;return this.stepsList.findIndex((function(n){return n.path===t.stepPath}))+1},set:function(t){this.$router.push({path:"/configuration/custom/"+this.stepsList[t-1].path})}},activeStep:function(){return this.stepsList[this.activeIndex-1]}},created:function(){this.activeMenuIndex()},methods:{activeMenuIndex:function(){this.$eventBus.$emit("menuActiveIndex","/configuration/quick")},handleStep:function(t,n){this.activeIndex=n},handlePrevStep:function(){this.activeIndex-=1},handleNextStep:function(){this.activeIndex+=1},initConfigInfo:function(t){var n=this;return t=t||this.stepPath,new Promise((function(e){n.configLoading=!0,n.$_api.configuration.getConfigInfo({},(function(i){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(i)return e({});if(n.configLoading=!1,"genesis"===t)e({genesisAssetConfig:o.genesisAssetConfig,genesisWitnessConfig:o.genesisWitnessConfig});else{var s={base:"baseSettingConfig",network:"networkConfig",database:"dbConfig",p2p:"p2pConfig"};e(o[s[t]])}}))}))}}},c=a,r=(e("9fa8"),e("2877")),u=Object(r["a"])(c,i,o,!1,null,"1e086538",null);n["default"]=u.exports},ec27:function(t,n,e){}}]);
//# sourceMappingURL=chunk-25efb430.c2ec28c3.js.map