(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53a21926","chunk-0ffe036b"],{5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,n){var r=n("1d80"),a=n("5899"),i="["+a+"]",o=RegExp("^"+i+i+"*"),s=RegExp(i+i+"*$"),c=function(e){return function(t){var n=String(r(t));return 1&e&&(n=n.replace(o,"")),2&e&&(n=n.replace(s,"")),n}};e.exports={start:c(1),end:c(2),trim:c(3)}},"61f7":function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}n.d(t,"a",(function(){return u}));var o=function(){function e(){r(this,e)}return i(e,[{key:"isNumber",value:function(e){return/^\d+(\.\d+)?$/.test(e)}},{key:"isInteger",value:function(e){return/^\d+$/.test(e)}},{key:"isTwoDecimal",value:function(e){return/^([1-9]\d*|0)(\.\d{1,2})$/.test(e)}},{key:"isIP",value:function(e){return/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(e)}}]),e}(),s=new o,c=function(){function e(){r(this,e)}return i(e,[{key:"validIP",value:function(e){return function(t,n,r){var a=!1;s.isIP(n)||(a=!0),a?r(new Error(e)):r()}}},{key:"numEqual",value:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(r,a,i){var o=!1;s.isNumber(a)?a==e?o=!0:n||a==e||(o=!0):o=!0,o?i(new Error(t)):i()}}},{key:"numMin",value:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(a,i,o){var c=!1;s.isNumber(i)?r&&!s.isInteger(i)?c=!0:i<e?c=!0:n||i!=e||(c=!0):c=!0,c?o(new Error(t)):o()}}},{key:"numMax",value:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return function(a,i,o){var c=!1;s.isNumber(i)?r&&!s.isInteger(i)?c=!0:i>e?c=!0:n||i!=e||(c=!0):c=!0,c?o(new Error(t)):o()}}},{key:"numTwoDecimal",value:function(e){return function(t,n,r){var a=!1;s.isTwoDecimal(n)||(a=!0),a?r(new Error(e)):r()}}}]),e}(),u=new c},7156:function(e,t,n){var r=n("861d"),a=n("d2bb");e.exports=function(e,t,n){var i,o;return a&&"function"==typeof(i=t.constructor)&&i!==n&&r(o=i.prototype)&&o!==n.prototype&&a(e,o),e}},"8a79":function(e,t,n){"use strict";var r=n("23e7"),a=n("06cf").f,i=n("50c4"),o=n("5a34"),s=n("1d80"),c=n("ab13"),u=n("c430"),l="".endsWith,f=Math.min,d=c("endsWith"),b=!u&&!d&&!!function(){var e=a(String.prototype,"endsWith");return e&&!e.writable}();r({target:"String",proto:!0,forced:!b&&!d},{endsWith:function(e){var t=String(s(this));o(e);var n=arguments.length>1?arguments[1]:void 0,r=i(t.length),a=void 0===n?r:f(i(n),r),c=String(e);return l?l.call(t,c,a):t.slice(a-c.length,a)===c}})},a907:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"box-view database-config"},[n("div",{staticClass:"box-body"},[n("el-form",{ref:"database-config-form",attrs:{model:e.form,rules:e.formRules,"label-position":"left","label-width":"200px"}},[n("el-form-item",{attrs:{label:e.$t("configuration.selectDatabaseConfig"),prop:"dbEngine"}},[n("el-radio-group",{model:{value:e.form.dbEngine,callback:function(t){e.$set(e.form,"dbEngine",t)},expression:"form.dbEngine"}},[n("el-radio",{attrs:{label:"LEVELDB"}},[e._v("LevelDB")]),n("el-radio",{attrs:{label:"ROCKSDB"}},[e._v("RocksDB")])],1)],1),n("el-form-item",{attrs:{label:e.$t("configuration.isWriteSync"),prop:"isDBSync"}},[n("el-switch",{model:{value:e.form.isDBSync,callback:function(t){e.$set(e.form,"isDBSync",t)},expression:"form.isDBSync"}})],1),n("el-form-item",{attrs:{label:e.$t("交易回执信息存储"),prop:"isOpenTransaction"}},[n("el-switch",{model:{value:e.form.isOpenTransaction,callback:function(t){e.$set(e.form,"isOpenTransaction",t)},expression:"form.isOpenTransaction"}})],1),"ROCKSDB"===e.form.dbEngine?[n("el-form-item",{attrs:{label:e.$t("RocksDB备份设置"),prop:"backupEnable"}},[n("el-switch",{model:{value:e.form.backupEnable,callback:function(t){e.$set(e.form,"backupEnable",t)},expression:"form.backupEnable"}})],1),n("el-form-item",{attrs:{label:e.$t("备份间隔(块)"),prop:"backupFrequency"}},[n("el-input",{staticStyle:{width:"200px"},attrs:{type:"number",min:"0",max:"2147483647",clearable:"",placeholder:e.$t("base.pleaseInput")},model:{value:e.form.backupFrequency,callback:function(t){e.$set(e.form,"backupFrequency","string"===typeof t?t.trim():t)},expression:"form.backupFrequency"}})],1)]:e._e(),n("div",{staticClass:"more-setting"},[n("el-checkbox",{on:{change:e.handleChangeCheckCustom},model:{value:e.checkDBCustom,callback:function(t){e.checkDBCustom=t},expression:"checkDBCustom"}},[n("span",{staticClass:"check-label"},[e._v(e._s(e.$t("configuration.dbCustomModule")))])])],1),n("el-form-item",{ref:"db-custom",staticClass:"db-custom",attrs:{prop:"dbCustom"}},[n("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},maxlength:300,disabled:!e.checkDBCustom,placeholder:e.$t(e.checkDBCustom?"configuration.valid.inputDBCustom":"configuration.valid.checkDBCustom")},model:{value:e.form.dbCustom,callback:function(t){e.$set(e.form,"dbCustom","string"===typeof t?t.trim():t)},expression:"form.dbCustom"}})],1)],2)],1),n("div",{staticClass:"box-footer"},[n("el-button",{staticClass:"im-button large",attrs:{loading:e.loading,disabled:e.disabled,type:"primary"},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("base.nextStep")))]),n("el-button",{staticClass:"im-button large",on:{click:e.handleCancel}},[e._v(e._s(e.$t("base.prevStep")))])],1)])},a=[],i=(n("a9e3"),n("8a79"),n("61f7")),o={name:"database-config",data:function(){return{form:{id:"",dbEngine:"",isDBSync:!1,isOpenTransaction:!0,backupEnable:!1,backupFrequency:"",dbCustom:""},checkDBCustom:!1,disabled:!0,loading:!1}},computed:{opNodeId:function(){var e=this.$route.query.id;return/\d+/.test(e)?Number(e):void 0},formRules:function(){var e=this,t=function(t,n,r){e.checkDBCustom&&!e.form.dbCustom.endsWith(".jar")?r(new Error(e.$t("configuration.valid.pathEndJAR"))):r()};return{backupFrequency:[{required:!0,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:i["a"].numMin(0,this.$t("base.valid.gtZeroInt")),trigger:"blur"},{validator:i["a"].numMax(2147483647,this.$t("base.valid.maxNumberValue")+": 2147483647"),trigger:"blur"}],dbCustom:[{required:this.checkDBCustom,message:this.$t("base.pleaseInput"),trigger:"blur"},{validator:t,trigger:"blur"}]}}},created:function(){this.getConfig()},methods:{getConfig:function(){var e=this;this.validNode()&&(this.disabled=!0,this.$_api.getStarted.getDBConfig({id:this.opNodeId},(function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t||(e.disabled=!1,e.initForm(n))})))},initForm:function(e){this.form={id:this.opNodeId,dbEngine:e.storage_db_engine,isDBSync:e.storage_db_sync,isOpenTransaction:e.storage_transHistory_switch,backupEnable:e.storage_backup_enable,backupFrequency:e.storage_backup_frequency,dbCustom:e.storage_db_custom},this.checkDBCustom=!!this.form.dbCustom},handleSubmit:function(){var e=this;this.$refs["database-config-form"].validate((function(t){if(t){var n={id:e.opNodeId,dbEngine:e.form.dbEngine,isDBSync:e.form.isDBSync,isOpenTransaction:e.form.isOpenTransaction,backupEnable:e.form.backupEnable,backupFrequency:Number(e.form.backupFrequency),dbCustom:e.checkDBCustom?e.form.dbCustom:""};e.loading=!0,e.$_api.getStarted.setDBConfig(n,(function(t){e.loading=!1,t||(e.$notify.success({title:e.$t("base.successful"),message:e.$t("configuration.databaseSaveSuccess")}),e.$emit("next-step"))}))}}))},handleChangeCheckCustom:function(e){e&&setTimeout(this.$refs["db-custom"].clearValidate,0)},validNode:function(){return!!/\d+/.test(this.opNodeId)||(this.$notify.warning({title:this.$t("base.warning"),message:this.$t("当前所编辑的节点为无效节点!")}),!1)},handleCancel:function(){this.$emit("prev-step")}}},s=o,c=(n("f3e6"),n("2877")),u=Object(c["a"])(s,r,a,!1,null,"a1c161c6",null);t["default"]=u.exports},a9e3:function(e,t,n){"use strict";var r=n("83ab"),a=n("da84"),i=n("94ca"),o=n("6eeb"),s=n("5135"),c=n("c6b6"),u=n("7156"),l=n("c04e"),f=n("d039"),d=n("7c73"),b=n("241c").f,m=n("06cf").f,p=n("9bf2").f,g=n("58a8").trim,h="Number",v=a[h],k=v.prototype,y=c(d(k))==h,C=function(e){var t,n,r,a,i,o,s,c,u=l(e,!1);if("string"==typeof u&&u.length>2)if(u=g(u),t=u.charCodeAt(0),43===t||45===t){if(n=u.charCodeAt(2),88===n||120===n)return NaN}else if(48===t){switch(u.charCodeAt(1)){case 66:case 98:r=2,a=49;break;case 79:case 111:r=8,a=55;break;default:return+u}for(i=u.slice(2),o=i.length,s=0;s<o;s++)if(c=i.charCodeAt(s),c<48||c>a)return NaN;return parseInt(i,r)}return+u};if(i(h,!v(" 0o1")||!v("0b1")||v("+0x1"))){for(var E,$=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof $&&(y?f((function(){k.valueOf.call(n)})):c(n)!=h)?u(new v(C(t)),n,$):C(t)},w=r?b(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),I=0;w.length>I;I++)s(v,E=w[I])&&!s($,E)&&p($,E,m(v,E));$.prototype=k,k.constructor=$,o(a,h,$)}},b3e2:function(e,t,n){},f3e6:function(e,t,n){"use strict";var r=n("b3e2"),a=n.n(r);a.a}}]);
//# sourceMappingURL=chunk-53a21926.549a63aa.js.map