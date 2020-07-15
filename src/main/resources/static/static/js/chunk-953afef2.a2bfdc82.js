(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-953afef2"],{"61f7":function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function r(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}n.d(t,"a",(function(){return u}));var o=function(){function e(){i(this,e)}return r(e,[{key:"isNumber",value:function(e){return/^\d+(\.\d+)?$/.test(e)}},{key:"isInteger",value:function(e){return/^\d+$/.test(e)}},{key:"isTwoDecimal",value:function(e){return/^([1-9]\d*|0)(\.\d{1,2})$/.test(e)}},{key:"isIP",value:function(e){return/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(e)}}]),e}(),s=new o,c=function(){function e(){i(this,e)}return r(e,[{key:"validIP",value:function(e){return function(t,n,i){var a=!1;s.isIP(n)||(a=!0),a?i(new Error(e)):i()}}},{key:"numEqual",value:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(i,a,r){var o=!1;s.isNumber(a)?a==e?o=!0:n||a==e||(o=!0):o=!0,o?r(new Error(t)):r()}}},{key:"numMin",value:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(a,r,o){var c=!1;s.isNumber(r)?i&&!s.isInteger(r)?c=!0:r<e?c=!0:n||r!=e||(c=!0):c=!0,c?o(new Error(t)):o()}}},{key:"numMax",value:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(a,r,o){var c=!1;s.isNumber(r)?i&&!s.isInteger(r)?c=!0:r>e?c=!0:n||r!=e||(c=!0):c=!0,c?o(new Error(t)):o()}}},{key:"numTwoDecimal",value:function(e){return function(t,n,i){var a=!1;s.isTwoDecimal(n)||(a=!0),a?i(new Error(e)):i()}}}]),e}(),u=new c},"8a79":function(e,t,n){"use strict";var i=n("23e7"),a=n("06cf").f,r=n("50c4"),o=n("5a34"),s=n("1d80"),c=n("ab13"),u=n("c430"),l="".endsWith,d=Math.min,f=c("endsWith"),m=!u&&!f&&!!function(){var e=a(String.prototype,"endsWith");return e&&!e.writable}();i({target:"String",proto:!0,forced:!m&&!f},{endsWith:function(e){var t=String(s(this));o(e);var n=arguments.length>1?arguments[1]:void 0,i=r(t.length),a=void 0===n?i:d(r(n),i),c=String(e);return l?l.call(t,c,a):t.slice(a-c.length,a)===c}})},a907:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"box-view database-config"},[n("div",{staticClass:"box-body"},[n("el-form",{ref:"database-config-form",attrs:{model:e.form,rules:e.formRules,"label-position":"left","label-width":"200px"}},[n("el-form-item",{attrs:{label:e.$t("configuration.selectDatabaseConfig"),prop:"dbEnine"}},[n("el-radio-group",{model:{value:e.form.dbEnine,callback:function(t){e.$set(e.form,"dbEnine",t)},expression:"form.dbEnine"}},[n("el-radio",{attrs:{label:"LEVELDB"}},[e._v("LevelDB")]),n("el-radio",{attrs:{label:"ROCKSDB"}},[e._v("RocksDB")])],1)],1),n("el-form-item",{attrs:{label:e.$t("configuration.isWriteSync"),prop:"isDBSync"}},[n("el-switch",{model:{value:e.form.isDBSync,callback:function(t){e.$set(e.form,"isDBSync",t)},expression:"form.isDBSync"}})],1),n("el-form-item",{attrs:{label:e.$t("交易回执信息存储"),prop:"isOpenTransaction"}},[n("el-switch",{model:{value:e.form.isOpenTransaction,callback:function(t){e.$set(e.form,"isOpenTransaction",t)},expression:"form.isOpenTransaction"}})],1),"ROCKSDB"===e.form.dbEnine?[n("el-form-item",{attrs:{label:e.$t("RocksDB备份设置"),prop:"backupEnable"}},[n("el-switch",{model:{value:e.form.backupEnable,callback:function(t){e.$set(e.form,"backupEnable",t)},expression:"form.backupEnable"}})],1),n("el-form-item",{attrs:{label:e.$t("备份间隔(块)"),prop:"backupFrequency"}},[n("el-input",{staticStyle:{width:"200px"},attrs:{type:"number",min:"0",max:"2147483647",clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.backupFrequency,callback:function(t){e.$set(e.form,"backupFrequency","string"===typeof t?t.trim():t)},expression:"form.backupFrequency"}})],1)]:e._e(),n("div",{staticClass:"more-setting"},[n("el-checkbox",{on:{change:e.handleChangeCheckCustom},model:{value:e.checkDBCustom,callback:function(t){e.checkDBCustom=t},expression:"checkDBCustom"}},[n("span",{staticClass:"check-label"},[e._v(e._s(e.$t("configuration.dbCustomModule")))])])],1),n("el-form-item",{ref:"db-custom",staticClass:"db-custom",attrs:{prop:"dbCustom"}},[n("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},maxlength:300,disabled:!e.checkDBCustom,placeholder:e.$t(e.checkDBCustom?"configuration.valid.inputDBCustom":"configuration.valid.checkDBCustom")},model:{value:e.form.dbCustom,callback:function(t){e.$set(e.form,"dbCustom","string"===typeof t?t.trim():t)},expression:"form.dbCustom"}})],1)],2)],1),n("div",{staticClass:"box-footer"},[n("el-button",{staticClass:"im-button large",attrs:{loading:e.loading,disabled:e.disabled,type:"primary"},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.nextStep")))]),n("el-button",{staticClass:"im-button large",on:{click:e.handleCancel}},[e._v(e._s(e.$t("base.prevStep")))])],1)])},a=[],r=(n("a9e3"),n("8a79"),n("61f7")),o={name:"database-config",data:function(){return{form:{id:"",dbEnine:"",isDBSync:!1,isOpenTransaction:!0,backupEnable:!1,backupFrequency:"",dbCustom:""},checkDBCustom:!1,disabled:!0,loading:!1}},computed:{opNodeId:function(){var e=this.$route.query.id;return/\d+/.test(e)?Number(e):void 0},formRules:function(){var e=this,t=function(t,n,i){e.checkDBCustom&&!e.form.dbCustom.endsWith(".jar")?i(new Error(e.$t("configuration.valid.pathEndJAR"))):i()};return{backupFrequency:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:r["a"].numMin(0,this.$t("base.valid.gtZeroInt")),trigger:"blur"},{validator:r["a"].numMax(2147483647,this.$t("base.valid.maxNumberValue")+": 2147483647"),trigger:"blur"}],dbCustom:[{required:this.checkDBCustom,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:t,trigger:"blur"}]}}},created:function(){this.getConfig()},methods:{getConfig:function(){var e=this;this.validNode()&&(this.disabled=!0,this.$_api.getStarted.getDBConfig({id:this.opNodeId},(function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t||(e.disabled=!1,e.initForm(n))})))},initForm:function(e){this.form={id:this.opNodeId,dbEnine:e.storage_db_engine,isDBSync:e.storage_db_sync,isOpenTransaction:e.storage_transHistory_switch,backupEnable:e.storage_backup_enable,backupFrequency:e.storage_backup_frequency,dbCustom:e.storage_db_custom},this.checkDBCustom=!!this.form.dbCustom},handleSubmit:function(){var e=this;this.$refs["database-config-form"].validate((function(t){if(t){var n={id:e.opNodeId,dbEnine:e.form.dbEnine,isDBSync:e.form.isDBSync,isOpenTransaction:e.form.isOpenTransaction,backupEnable:e.form.backupEnable,backupFrequency:Number(e.form.backupFrequency),dbCustom:e.checkDBCustom?e.form.dbCustom:""};e.loading=!0,e.$_api.getStarted.setDBConfig(n,(function(t){e.loading=!1,t||(e.$notify.success({title:e.$t("base.successful"),message:e.$t("configuration.databaseSaveSuccess")}),e.$emit("next-step"))}))}}))},handleChangeCheckCustom:function(e){e&&setTimeout(this.$refs["db-custom"].clearValidate,0)},validNode:function(){return!!/\d+/.test(this.opNodeId)||(this.$notify.warning({title:this.$t("base.warning"),message:this.$t("当前所编辑的节点为无效节点!")}),!1)},handleCancel:function(){this.$emit("prev-step")}}},s=o,c=(n("ee7c"),n("2877")),u=Object(c["a"])(s,i,a,!1,null,"5be6f730",null);t["default"]=u.exports},ee7c:function(e,t,n){"use strict";var i=n("f086"),a=n.n(i);a.a},f086:function(e,t,n){}}]);
//# sourceMappingURL=chunk-953afef2.a2bfdc82.js.map