(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d213a3d"],{ae14:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("el-dialog",{attrs:{visible:t.dialogVisible,"custom-class":"im-dialog","close-on-click-modal":!1,"close-on-press-escape":!1,width:"680px",center:""},on:{"update:visible":function(i){t.dialogVisible=i}}},[e("div",{staticClass:"dialog-header",attrs:{slot:"title"},slot:"title"},[e("div",{staticClass:"title"},[t._v(t._s(t.$t("启动节点")))])]),e("div",{staticClass:"dialog-content"},[e("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:8}},model:{value:t.form.filePath,callback:function(i){t.$set(t.form,"filePath","string"===typeof i?i.trim():i)},expression:"form.filePath"}}),e("div",{staticClass:"el-upload__tip"},[t._v(t._s(t.$t("nodesManage.helpTips.deployFile")))])],1),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{staticClass:"im-button",on:{click:function(i){t.dialogVisible=!1}}},[t._v(t._s(t.$t("base.cancel")))]),e("el-button",{staticClass:"im-button",attrs:{type:"primary",loading:t.loading},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("base.save")))])],1)])},a=[],l=(e("c975"),{name:"node-deploy",props:{visible:{type:Boolean,required:!0},ids:{type:String,required:!0}},data:function(){return{form:{filePath:""},loading:!1}},computed:{dialogVisible:{get:function(){return this.visible},set:function(t){this.$emit("update:visible",t)}}},methods:{handleSubmit:function(){this.form.filePath?~this.form.filePath.indexOf("java-tron-1.0.0.zip")?this.startDeploy():this.$notify({title:this.$t("base.warning"),message:this.$t("nodesManage.valid.inputRightPath"),type:"warning"}):this.$notify({title:this.$t("base.warning"),message:this.$t("nodesManage.valid.inputFilePath"),type:"warning"})},startDeploy:function(){var t=this;this.loading=!0,this.$_api.getStarted.deployNode({ids:this.ids,filePath:this.form.filePath},(function(i){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t.loading=!1,!i){if(e.hasOwnProperty("status")){var s="";switch(e.status){case 0:s="节点正在启动中，请稍等......";break;case 1:s="初次运行区块链节点时，其中SR节点数量必须>=1且为奇数";break}0===e.status?t.$notify.success({title:t.$t("base.successful"),message:t.$t(s)}):t.$notify.error({title:t.$t("base.warning"),message:t.$t(s)})}t.$emit("checkDeployResult"),t.$emit("update:visible",!1)}}))}}}),o=l,n=e("2877"),r=Object(n["a"])(o,s,a,!1,null,"843aa072",null);i["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d213a3d.18978075.js.map