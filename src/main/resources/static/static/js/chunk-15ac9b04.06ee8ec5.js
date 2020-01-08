(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15ac9b04"],{"11d0":function(e,t,o){},9645:function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"box-view database-config"},[o("div",{staticClass:"box-header title"},[e._v(e._s(e.$t("configManage.databaseConfig")))]),o("div",{staticClass:"box-body"},[o("el-form",{ref:"database-config-form",attrs:{model:e.form,"label-position":"left","label-width":"200px"}},[o("el-form-item",{attrs:{label:e.$t("configManage.selectDatabaseConfig"),prop:"storage_db_engine"}},[o("el-radio-group",{model:{value:e.form.storage_db_engine,callback:function(t){e.$set(e.form,"storage_db_engine",t)},expression:"form.storage_db_engine"}},[o("el-radio",{attrs:{label:"LEVELDB"}},[e._v("LevelDB")]),o("el-radio",{attrs:{label:"ROCKSDB"}},[e._v("RocksDB")])],1)],1),o("el-form-item",{attrs:{label:e.$t("configManage.isWriteSync"),prop:"storage_db_sync"}},[o("el-switch",{model:{value:e.form.storage_db_sync,callback:function(t){e.$set(e.form,"storage_db_sync",t)},expression:"form.storage_db_sync"}})],1),o("el-form-item",{attrs:{label:e.$t("configManage.isOpenTransaction"),prop:"storage_transHistory_switch"}},[o("el-switch",{attrs:{"active-value":"on","inactive-value":"off"},model:{value:e.form.storage_transHistory_switch,callback:function(t){e.$set(e.form,"storage_transHistory_switch",t)},expression:"form.storage_transHistory_switch"}})],1),o("el-form-item",{attrs:{label:e.$t("configManage.isOpenIndexDirectory"),prop:"storage_index_directory"}},[o("el-switch",{attrs:{"active-value":"index","inactive-value":"is not open index directory"},model:{value:e.form.storage_index_directory,callback:function(t){e.$set(e.form,"storage_index_directory",t)},expression:"form.storage_index_directory"}})],1),o("el-form-item",{attrs:{label:e.$t("configManage.isNeedToUpdateAsset"),prop:"storage_needToUpdateAsset"}},[o("el-switch",{model:{value:e.form.storage_needToUpdateAsset,callback:function(t){e.$set(e.form,"storage_needToUpdateAsset",t)},expression:"form.storage_needToUpdateAsset"}})],1)],1)],1),o("div",{staticClass:"box-footer align-right"},[o("el-button",{staticClass:"im-button large",on:{click:e.handleCancel}},[e._v(e._s(e.$t("base.prevStep")))]),o("el-button",{staticClass:"im-button large",attrs:{loading:e.loading,type:"primary"},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.nextStep")))])],1)])},r=[],n=(o("a4d3"),o("4de4"),o("e439"),o("dbb4"),o("b64b"),o("159b"),o("ade3"));function s(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,a)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?s(Object(o),!0).forEach((function(t){Object(n["a"])(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):s(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var c={name:"database-config",props:{configInfo:{type:Object,required:!0},initConfigInfo:{type:Function,required:!0}},data:function(){return{form:{},showContent:!0,loading:!1}},watch:{configInfo:{handler:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.form=i({},e.dbConfig)},immediate:!0}},methods:{handleSubmit:function(){var e=this;this.$refs["database-config-form"].validate((function(t){if(t){var o={isDBSync:e.form.storage_db_sync,isOpenTransaction:e.form.storage_transHistory_switch,dbEnine:e.form.storage_db_engine,indexDirectory:e.form.storage_index_directory,needToUpdateAsset:e.form.storage_needToUpdateAsset};e.loading=!0,e.$_api.configManage.dbConfig(o,(function(t){e.loading=!1,t||(e.$message.success(e.$t("configManage.databaseSaveSuccess")),e.$emit("next-step"))}))}}))},handleCancel:function(){this.$emit("prev-step")}}},l=c,d=(o("cd91"),o("2877")),f=Object(d["a"])(l,a,r,!1,null,"b6c9440e",null);t["default"]=f.exports},cd91:function(e,t,o){"use strict";var a=o("11d0"),r=o.n(a);r.a}}]);
//# sourceMappingURL=chunk-15ac9b04.06ee8ec5.js.map