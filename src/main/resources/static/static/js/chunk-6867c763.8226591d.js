(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6867c763"],{"43e5":function(e,t,a){},"5f06":function(e,t,a){"use strict";var o=a("43e5"),n=a.n(o);n.a},9645:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"box-view database-config"},[a("div",{staticClass:"box-header title"},[e._v(e._s(e.$t("configManage.databaseConfig")))]),a("div",{staticClass:"box-body"},[a("el-form",{ref:"database-config-form",attrs:{model:e.form,"label-position":"left","label-width":"200px"}},[a("el-form-item",{attrs:{label:e.$t("configManage.selectDatabaseConfig"),prop:"storage_db_engine"}},[a("el-radio-group",{model:{value:e.form.storage_db_engine,callback:function(t){e.$set(e.form,"storage_db_engine",t)},expression:"form.storage_db_engine"}},[a("el-radio",{attrs:{label:"LEVELDB"}},[e._v("LevelDB")]),a("el-radio",{attrs:{label:"ROCKSDB"}},[e._v("RocksDB")])],1)],1),a("el-form-item",{attrs:{label:e.$t("configManage.isWriteSync"),prop:"storage_db_sync"}},[a("el-switch",{model:{value:e.form.storage_db_sync,callback:function(t){e.$set(e.form,"storage_db_sync",t)},expression:"form.storage_db_sync"}})],1),a("el-form-item",{attrs:{label:e.$t("configManage.isOpenTransaction"),prop:"storage_transHistory_switch"}},[a("el-switch",{attrs:{"active-value":"on","inactive-value":"off"},model:{value:e.form.storage_transHistory_switch,callback:function(t){e.$set(e.form,"storage_transHistory_switch",t)},expression:"form.storage_transHistory_switch"}})],1),a("el-form-item",{attrs:{label:e.$t("configManage.isNeedToUpdateAsset"),prop:"storage_needToUpdateAsset"}},[a("el-switch",{model:{value:e.form.storage_needToUpdateAsset,callback:function(t){e.$set(e.form,"storage_needToUpdateAsset",t)},expression:"form.storage_needToUpdateAsset"}})],1)],1)],1),a("div",{staticClass:"box-footer align-right"},[a("el-button",{staticClass:"im-button large",on:{click:e.handleCancel}},[e._v(e._s(e.$t("base.prevStep")))]),a("el-button",{staticClass:"im-button large",attrs:{loading:e.loading,type:"primary"},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.nextStep")))])],1)])},n=[],s=(a("a4d3"),a("4de4"),a("e439"),a("dbb4"),a("b64b"),a("159b"),a("ade3"));function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){Object(s["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var c={name:"database-config",props:{configInfo:{type:Object,required:!0},initConfigInfo:{type:Function,required:!0}},data:function(){return{form:{},showContent:!0,loading:!1}},watch:{configInfo:{handler:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.form=i({},e.dbConfig)},immediate:!0}},methods:{handleSubmit:function(){var e=this;this.$refs["database-config-form"].validate((function(t){if(t){var a={isDBSync:e.form.storage_db_sync,isOpenTransaction:e.form.storage_transHistory_switch,dbEnine:e.form.storage_db_engine,needToUpdateAsset:e.form.storage_needToUpdateAsset};e.loading=!0,e.$_api.configManage.dbConfig(a,(function(t){e.loading=!1,t||(e.$message.success(e.$t("configManage.databaseSaveSuccess")),e.$emit("next-step"))}))}}))},handleCancel:function(){this.$emit("prev-step")}}},l=c,f=(a("5f06"),a("2877")),d=Object(f["a"])(l,o,n,!1,null,"2044f4d8",null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-6867c763.8226591d.js.map