(function(e){function n(n){for(var o,a,s=n[0],r=n[1],u=n[2],d=0,l=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&l.push(i[a][0]),i[a]=0;for(o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);p&&p(n);while(l.length)l.shift()();return c.push.apply(c,u||[]),t()}function t(){for(var e,n=0;n<c.length;n++){for(var t=c[n],o=!0,a=1;a<t.length;a++){var s=t[a];0!==i[s]&&(o=!1)}o&&(c.splice(n--,1),e=r(r.s=t[0]))}return e}var o={},a={app:0},i={app:0},c=[];function s(e){return r.p+"static/js/"+({}[e]||e)+"."+{"chunk-0f88cf4a":"645bbc1b","chunk-1368f67c":"84f732e6","chunk-0fbf4d17":"272b46c9","chunk-29d3d1c7":"2e5fa03e","chunk-13736bf2":"464d24a4","chunk-1f59041c":"9e213319","chunk-20bf45e2":"cfb00fb7","chunk-2d0b8df5":"d57562b6","chunk-2d0c8c23":"fdc3eb23","chunk-2d0e53c5":"a3a0895d","chunk-2d20e7a4":"d25d82c1","chunk-2d213371":"42d0f70e","chunk-2d21d466":"30cdd9d7","chunk-2d22cfc5":"7ee0ebb0","chunk-2fbe7c25":"12ec3424","chunk-4069406a":"ad0e6f67","chunk-4586d74e":"fd469c03","chunk-49ee2486":"04e9ef2c","chunk-4c7867f2":"1119dc03","chunk-4e1752bc":"c7eff17b","chunk-4fe2121d":"9d873f7c","chunk-687f4c9e":"c4caedd0","chunk-76db6dd4":"c108c186","chunk-b09eb714":"53c67bb9","chunk-c2da51f0":"3db4dba3","chunk-4053bd85":"83a09ffc"}[e]+".js"}function r(n){if(o[n])return o[n].exports;var t=o[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.e=function(e){var n=[],t={"chunk-1368f67c":1,"chunk-0fbf4d17":1,"chunk-29d3d1c7":1,"chunk-13736bf2":1,"chunk-1f59041c":1,"chunk-2fbe7c25":1,"chunk-4069406a":1,"chunk-4586d74e":1,"chunk-49ee2486":1,"chunk-4c7867f2":1,"chunk-4e1752bc":1,"chunk-4fe2121d":1,"chunk-687f4c9e":1,"chunk-76db6dd4":1,"chunk-b09eb714":1,"chunk-c2da51f0":1,"chunk-4053bd85":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise((function(n,t){for(var o="static/css/"+({}[e]||e)+"."+{"chunk-0f88cf4a":"31d6cfe0","chunk-1368f67c":"c283aaba","chunk-0fbf4d17":"14f41038","chunk-29d3d1c7":"417bd669","chunk-13736bf2":"49add107","chunk-1f59041c":"c88904ed","chunk-20bf45e2":"31d6cfe0","chunk-2d0b8df5":"31d6cfe0","chunk-2d0c8c23":"31d6cfe0","chunk-2d0e53c5":"31d6cfe0","chunk-2d20e7a4":"31d6cfe0","chunk-2d213371":"31d6cfe0","chunk-2d21d466":"31d6cfe0","chunk-2d22cfc5":"31d6cfe0","chunk-2fbe7c25":"7c494026","chunk-4069406a":"4f34454a","chunk-4586d74e":"e2ed2cdf","chunk-49ee2486":"d7ffdab3","chunk-4c7867f2":"37dc8248","chunk-4e1752bc":"67e76f7a","chunk-4fe2121d":"c333ea61","chunk-687f4c9e":"2d54d352","chunk-76db6dd4":"995ff9aa","chunk-b09eb714":"370cc28e","chunk-c2da51f0":"f278f7ba","chunk-4053bd85":"49add107"}[e]+".css",i=r.p+o,c=document.getElementsByTagName("link"),s=0;s<c.length;s++){var u=c[s],d=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(d===o||d===i))return n()}var l=document.getElementsByTagName("style");for(s=0;s<l.length;s++){u=l[s],d=u.getAttribute("data-href");if(d===o||d===i)return n()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=n,p.onerror=function(n){var o=n&&n.target&&n.target.src||i,c=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=o,delete a[e],p.parentNode.removeChild(p),t(c)},p.href=i;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){a[e]=0})));var o=i[e];if(0!==o)if(o)n.push(o[2]);else{var c=new Promise((function(n,t){o=i[e]=[n,t]}));n.push(o[2]=c);var u,d=document.createElement("script");d.charset="utf-8",d.timeout=120,r.nc&&d.setAttribute("nonce",r.nc),d.src=s(e);var l=new Error;u=function(n){d.onerror=d.onload=null,clearTimeout(p);var t=i[e];if(0!==t){if(t){var o=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;l.message="Loading chunk "+e+" failed.\n("+o+": "+a+")",l.name="ChunkLoadError",l.type=o,l.request=a,t[1](l)}i[e]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:d})}),12e4);d.onerror=d.onload=u,document.head.appendChild(d)}return Promise.all(n)},r.m=e,r.c=o,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)r.d(t,o,function(n){return e[n]}.bind(null,o));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="/",r.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],d=u.push.bind(u);u.push=n,u=u.slice();for(var l=0;l<u.length;l++)n(u[l]);var p=d;c.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"05c8":function(e,n,t){},"1a71":function(e){e.exports=JSON.parse('[{"path":"/nodes-manage","name":"nodes-manage","title":"menu.nodesManage","icon":"el-icon-s-operation","disabled":false},{"path":"/configuration/quick","name":"configuration","title":"menu.configuration","icon":"el-icon-set-up","disabled":false},{"path":"/ecology-app","name":"ecology-app","title":"menu.ecologyApp","icon":"el-icon-guide","disabled":true,"children":[{"path":"/wallet-cli","name":"wallet-cli","title":"menu.walletCLI","icon":"el-icon-upload","disabled":true},{"path":"/tron-link","name":"tron-link","title":"menu.tronLink","icon":"el-icon-share","disabled":true}]}]')},"43e6":function(e,n,t){"use strict";var o=t("05c8"),a=t.n(o);a.a},4977:function(e,n,t){"use strict";var o=t("cdcc"),a=t.n(o);a.a},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var o=t("2b0e"),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},i=[],c={name:"App"},s=c,r=t("2877"),u=Object(r["a"])(s,a,i,!1,null,null,null),d=u.exports,l=(t("99af"),t("c740"),t("d81d"),t("b0c0"),t("d3b7"),t("96cf"),t("1da1")),p=t("2909"),f=t("8c4f"),m=t("2f62"),h=t("1a71"),g={namespaced:!0,state:{isSignIn:"true"===localStorage.getItem("isSignIn"),userInfo:{name:"",account:"",email:""},isCollapseAside:"true"===localStorage.getItem("isCollapseAside"),menuList:h,gitHome:"http://39.106.174.213/kangjiancheng/tron-factory",currentGitBranch:"dev_v1.2"},getters:{isSignIn:function(e){return e.isSignIn},userInfo:function(e){return e.userInfo},isCollapseAside:function(e){return e.isCollapseAside},menuList:function(e){return e.menuList}},mutations:{setUserInfo:function(e,n){e.userInfo.account=localStorage.getItem("user_account")||""},toggleCollapseAside:function(e){e.isCollapseAside=!e.isCollapseAside,localStorage.setItem("isCollapseAside",e.isCollapseAside)},viewDocument:function(e){var n=localStorage.getItem("currentLang"),t="zh-CN"===n?"README.zh-CN.md":"README.md",o="".concat(e.gitHome,"/blob/").concat(e.currentGitBranch,"/").concat(t);window.open(o,"_blank")}},actions:{signIn:function(e,n){var t=e.state;e.getters,e.commit,e.dispatch,e.rootGetters;return new Promise((function(e){t.isSignIn=!0,localStorage.setItem("isSignIn",t.isSignIn),t.userInfo.account=n.account,localStorage.setItem("user_account",t.userInfo.account),e()}))},signOut:function(e){var n=e.state;return new Promise((function(e){n.isSignIn=!1,localStorage.setItem("isSignIn",n.isSignIn),localStorage.removeItem("user_account"),e()}))}}};o["default"].use(m["a"]);var b=new m["a"].Store({modules:{app:g},state:{},getters:{},mutations:{},actions:{}}),v=b,k=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"app-wrapper"},[t("div",{staticClass:"app-header"},[t("header-nav")],1),t("div",{staticClass:"app-body"},[e.$route.meta.hideAside?e._e():t("div",{staticClass:"app-sidebar"},[t("aside-nav")],1),t("div",{staticClass:"app-main"},[t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("router-view")],1)],1)])])},C=[],S=function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",{staticClass:"header-view header-nav"},[o("hamburger"),o("div",{staticClass:"header-logo"},[o("router-link",{attrs:{to:"/"}},[o("img",{staticClass:"logo-img",attrs:{src:t("9d64"),title:e.siteTitle,alt:e.siteTitle}})])],1),o("div",{staticClass:"header-right nav-list"},[o("div",{staticClass:"nav-item view-document",on:{click:function(n){return e.viewDocument()}}},[e._v(e._s(e.$t("base.document")))]),o("im-locale",{staticClass:"nav-item"})],1)],1)},y=[],P=(t("a4d3"),t("4de4"),t("e439"),t("dbb4"),t("b64b"),t("159b"),t("ade3")),w=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"hamburger"},[t("span",{directives:[{name:"show",rawName:"v-show",value:!e.$route.meta.hideAside,expression:"!$route.meta.hideAside"}],class:["toggle-aside",{"is-collapse":e.isCollapseAside}],on:{click:e.toggleCollapseAside}})])},N=[];function I(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function x(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?I(Object(t),!0).forEach((function(n){Object(P["a"])(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):I(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var O={name:"hamburger",computed:x({},Object(m["c"])("app",["isCollapseAside"])),methods:x({},Object(m["d"])("app",["toggleCollapseAside"]))},D=O,T=(t("a591"),Object(r["a"])(D,w,N,!1,null,"7eab6f9a",null)),A=T.exports,j=t("baa8");function L(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function F(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?L(Object(t),!0).forEach((function(n){Object(P["a"])(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):L(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var M={name:"header-nav",components:{ImLocale:j["a"],Hamburger:A},data:function(){return{siteTitle:"TRON FACTORY"}},methods:F({},Object(m["d"])("app",["viewDocument"]))},_=M,E=(t("763c"),Object(r["a"])(_,S,y,!1,null,"03142272",null)),R=E.exports,U=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"aside-nav"},[t("el-menu",{ref:"el-menu",attrs:{"default-active":e.activeIndex,collapse:e.isCollapseAside,mode:"vertical"},on:{select:e.handleSelectMenu}},e._l(e.menuList,(function(e){return t("side-menu-item",{key:e.name,attrs:{"menu-item":e}})})),1)],1)},V=[],H=(t("2ca0"),function(){var e=this,n=e.$createElement,t=e._self._c||n;return e.menuItem.children&&e.menuItem.children.length?t("el-submenu",{key:e.menuItem.name,staticClass:"im-submenu",attrs:{index:e.menuItem.name,disabled:e.menuItem.disabled}},[t("template",{slot:"title"},[t("i",{staticClass:"menu-icon",class:e.menuItem.icon}),t("span",[e._v(" "+e._s(e.$t(e.menuItem.title)))])]),e._l(e.menuItem.children,(function(e,n){return t("side-menu-item",{key:n,attrs:{"menu-item":e}})}))],2):t("el-menu-item",{attrs:{index:e.menuItem.path,disabled:e.menuItem.disabled}},[t("i",{staticClass:"menu-icon",class:e.menuItem.icon}),t("span",{attrs:{slot:"title"},slot:"title"},[e._v(" "+e._s(e.$t(e.menuItem.title)))])])}),B=[],$={name:"side-menu-item",props:{menuItem:{type:Object,required:!0}},data:function(){return{}}},q=$,W=(t("43e6"),Object(r["a"])(q,H,B,!1,null,"247aec51",null)),G=W.exports;function K(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function z(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?K(Object(t),!0).forEach((function(n){Object(P["a"])(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):K(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var J={name:"aside-nav",components:{SideMenuItem:G},data:function(){return{menu:h,activeIndex:this.$route.path}},computed:z({},Object(m["c"])("app",["isCollapseAside","menuList"])),created:function(){var e=this;this.$eventBus.$on("menuActiveIndex",(function(n){return e.activeIndex=n}))},destroy:function(){this.$off("menuActiveIndex")},methods:{handleSelectMenu:function(e){e.startsWith("http")?(this.$refs["el-menu"].updateActiveIndex(this.activeIndex),window.open(e,"_blank")):this.$router.push({path:e})}}},Z=J,X=(t("9f0c"),Object(r["a"])(Z,U,V,!1,null,"7d8cc3db",null)),Y=X.exports,Q={name:"Layout",components:{HeaderNav:R,AsideNav:Y}},ee=Q,ne=(t("5c59"),Object(r["a"])(ee,k,C,!1,null,"b6faaf48",null)),te=ne.exports,oe=t("705a"),ae=f["a"].prototype.push;f["a"].prototype.push=function(e){return ae.call(this,e).catch((function(e){return e}))},o["default"].use(f["a"]);var ie=[{path:"/",name:"home",component:function(){return t.e("chunk-1f59041c").then(t.bind(null,"7abe"))}}],ce=oe.map((function(e){return Object.assign({path:e.path,name:e.name,component:function(){return t("9dac")("./".concat(e.name))},meta:e.meta||{}})})),se=[].concat(ie,[{path:"/",component:te,children:Object(p["a"])(ce)},{path:"*",redirect:{name:"404"}}]),re=new f["a"]({routes:se});re.beforeEach(function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(n,t,o){var a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:try{a=~ce.findIndex((function(e){return e.name===n.name})),i="true"===localStorage.getItem("oneClick"),a&&!i?o("/"):o()}catch(t){o("/")}case 1:case"end":return e.stop()}}),e)})));return function(n,t,o){return e.apply(this,arguments)}}());var ue=re,de=t("4897"),le=t.n(de),pe=t("a925"),fe={search:"Search",submit:"Submit",reset:"Reset",clear:"Clear",delete:"Delete",tips:"Tips",document:"Document",helpDocument:"Help Document",viewDocument:"View Document",open:"Open",confirm:"Confirm",save:"Save",close:"Close",edit:"Edit",update:"Update",modify:"Modify",complete:"Complete",detail:"Detail",view:"View",logs:"Log",viewDetail:"View Detail",viewLog:"View Log",goBack:"Go Back",return:"Return",prevStep:"Previous step",nextStep:"Next Step",continue:"Continue",operate:"Operate",emptyData:"No Data",successful:"Successful",failure:"Failure",warning:"Warning",error:"Error",cancel:"Cancel",success:{save:"Save Success",edit:"Edit Success",update:"Update Success",modify:"Modify Success",operate:"Operate Success",delete:"Delete Success"},fail:{save:"Save Failed",edit:"Edit Failed",update:"Update Failed",modify:"Modify Failed",operate:"Operate Failed",delete:"Delete Failed"},cancelUpdate:"Cancel Update",cancelDelete:"Cancel Delete",pleaseInput:"Please enter",pleaseSelect:"Please select"},me={nodesManage:"Nodes Manage",configuration:"Configuration",ecologyApp:"Ecology App",walletCLI:"Wallet CLI",tronLink:"TronLink"},he={account:"Account",email:"Email",password:"Password",rememberPassword:"Remember me",signInTestAccount:"Test Account",signIn:"Sign In",helpTips:{account:"Email address",email:"Email requires",password:"Password",emailError:"Invalid email format",emailOrPwdError:"Invalid login information"}},ge={nodesManage:"Nodes Management",addNode:"Add Node",modifyNode:"Edit Node",nodeDetail:"Node Detail",oneClickDeployment:"Start",deploy:"Deploy",encryption:"Signature Algorithm",sshUserName:"SSH Username",isSR:"SR",nodeIP:"Node IP",nodePort:"Node Port",deployStatus:"Status",unDeploy:"Pending",deployed:"Success",javaTronVersion:"Version",pleaseAddNode:"Please add at least one node",allNodeDeployed:"All nodes are deployed ",pleaseDoneConfig:"Configuration is required",needSRnoSyncCheck:"At lesast one SR node information synchronization is OFF",todoConfig:"Configuration is required,please fill in the configuration first",inputLater:"Later",inputNow:"Fill it now",sureConfigDeploy:"Do you comfirm to deploy with the current configuration?",updateConfig:"Modify",sureDeploy:"Comfirm",deployingTips:"Deploying. Please check log or deploy status later",viewLog:"Check Log",logDialogTitle:"Log",emptyLog:"No log",loadingLog:"Checking",deployComplete:"Succcessfully deployed",deployFail:"Failed deployed",nodeType:"Node Type",nodeConfig:"Node Configuration",SSH:"SSH",fullNode:"Full Node",superNode:"Super Node",sshConnectType:"Authentication Methods",keyConnect:"Public Key",passwordConnect:"Password",sshPassword:"Password",sshPort:"Port",SRNode:"SR node(witness node)",syncCheck:"needSyncCheck",saveAddressPriKey:"Please keep your address and private key in a safe place. Once the node is created, it will not be recovered.",sshConnectFail:"SSH is unable to connect,please check the SSH configuration",addressNotPrikey:"Private key and address does not match",addNodeSuccess:"Successfully added",addNodeFail:"Failed added",updateNodeSuccess:"Successful updated",updateNodeFail:"Failed updated",deleteNodeTipsTitle:"Notice",deleteNodeTips:"Are you sure you want to delete this node?",deleteNodeSuccess:"Successful deleted",helpTips:{crypto:"Signature Algorithm can not be changed after nodes added",deployFile:"Deploy requires local release file path like /Users/xxx/xxx/java-tron-1.0.0.zip",fullNode:"FullNode has the complete block chain data, can update data in real time. <br/>It can broadcast the transactions and provide api service",superNode:"Super Representative(abbr: SR) is the block producer in the block chain.They verify<br/>the transactions and write the transactions into the blocks in turn",SSH:"The deployment file needs to be uploaded on the server through SSH",url:"Office website of SR",voteCount:"Determine the initial ordering of SR",sshUserName:"Username",sshPassword:"Password",sshPort:"Port",ip:"FullNode IP",port:"FullNode Port",isSR:"SR is witnessnode, ON for a witness node, OFF for a bare FullNode",needSyncCheck:"The information of each node on the chain is regularly synchronized if SyncCheck is ON. <br/>One chain must have one SR with SyncCheck OFF",publicKey:"Address in Base58Check format",privateKey:"Private Key(256-bits, hex encoded)"},valid:{maxNodeLength:"Maximum of 20 Nodes",inputID:"Please input ID",positiveInteger:"Positive number required",rightIP:"Please input vaid IP address",disabledLocalIP:"Local IP is not supported",hasSameIP:"IP already exists in list",maxPortValue:"Port number illegal",inputURL:"Please input URL for this witness",inputVoteCount:"Please input vote count",gteZeroInt:"Please input a number greater than or equal to 0",maxNumberValue:"maximum exceeded",maxVoteCountValue:"Vote Count exceeds maximum",publicKey:"Please input address in Base58Check format",inputPrivateKey:"Please input 256-bits private key (hex encoded)",inputFilePath:"Enter path of java-tron release file",inputRightPath:"Enter path of java-tron release file like java-tron-1.0.0.zip"}},be={configuration:"Configuration",quickConfig:"Fast Config",customConfig:"Custom Config",importConfig:"Import Config",genesisInfo:"Genesis",baseConfig:"Basic Config",netWorkConfig:"HTTP/RPC",databaseConfig:"Database",p2pConfig:"P2P",crossChainConfig:"Cross-Chain",moduleFunction:"Module",moreSetting:"Advanced Config",accountInfo:"Asset List",addNew:"Add",witnessNodeInfo:"Witness list",assetDialogTitle:"Asset configuration",assetAddSuccess:"Successfully added",assetAddFail:"Failed added",assetUpdateSuccess:"Successfully added",assetUpdateFail:"Failed added",assetDeleteSuccess:"Successfully deleted",assetDeleteFail:"Failed added",witnessDialogTitle:"Witness Configuration",selectDatabaseConfig:"Database Engine",isWriteSync:"Write synchronously",isOpenTransaction:"Transaction",isOpenIndexDirectory:"Index switch opened",isNeedToUpdateAsset:"Update asset",dbCustomModule:"Custom chainbase Module",consensusModule:"Consensus Module",tempNotSupport:"Not Supported",transactionModule:"Transaction Module",customTransactionModule:"Custom Transaction Module",consensusModuleSaveSuccess:"Saving Consensus Module Successful",transactionModuleSaveSuccess:"Saving Transaction Module Successful",assetSaveSuccess:"Genesis Configuration Save Successful",baseSaveSuccess:"Basic Save Successful",networkSaveSuccess:"Network Configuration Save Successful",databaseSaveSuccess:"Database Configuration Save Successful",p2pSaveSuccess:"P2P Configuration Save Successful",helpTips:{accountName:"Account Name",accountType:"Account Type",address:"Address in Base58Check format",balance:"Initial balance, in SUN",chainId:"Chain ID",maintenanceTimeInterval:"Maintenance Time Interval",blockProposalExpireTime:"Proposal Expire Time",nodeBlockProducedTimeOut:"Block Produced Time Out Percent",nodeMinParticipationRate:"Min Participation Rate",maxHttpConnectNumber:"Maximum HTTP Connection Number",httpFullNodePort:"FullNode HTTP Port",httpSolidityPort:"SolidityNode HTTP Port",rpcPort:"FullNode RPC Port",rpcSolidityPort:"FullNode Solidity RPC Port",p2pVersion:"P2P Version",listenPort:"Listen Port",seedNodeList:"Initial Seed Nodes List",maxActiveNodes:"Maximum Active Nodes Number",maxActiveNodesWithSameIp:"Maximum Node Count of one IP"},valid:{inputRightAddress:"Please input correct address",maxVoteCountValue:"Vote Count exceeds maximum",gteZeroInt:"Please input a number greater than or equal to 0",gtZeroInt:"Please input a number greater than 0",maxNumberValue:"maximum exceeded",maxPortValue:"Port number illegal",listenPort:"Please input listen port",mainnetPlaceholder:"mainnet p2pversion is illegal",testnetPlaceholder:"testnet p2pversion is illegal",specialPlaceholder:"specific p2pversion is illegal",validTwoDecimal:"invalid precision",checkDBCustom:"Please enable custom chainbase module first",inputDBCustom:"Please input custom chainbase module path (ended with .jar)",checkCustomTransaction:"Please enable custom transaction module first",inputCustomTransaction:"Please input custom transaction module path (ended with .jar)",pathEndJAR:"Please input a path ended with .jar"}},ve={base:fe,menu:me,sign:he,nodesManage:ge,configuration:be},ke={search:"搜索",submit:"提交",reset:"重置",clear:"清空",delete:"删除",tips:"提示",document:"文档",helpDocument:"帮助文档",viewDocument:"查看文档",open:"打开",confirm:"确定",save:"保存",close:"关闭",edit:"编辑",update:"更新",modify:"修改",complete:"完成",detail:"详情",view:"查看",logs:"日志",viewDetail:"查看详情",viewLog:"查看日志",goBack:"退后",return:"返回",prevStep:"上一步",nextStep:"下一步",continue:"继续",operate:"操作",emptyData:"暂无数据",successful:"成功",failure:"失败",warning:"警告",error:"错误",cancel:"取消",success:{save:"保存成功",edit:"编辑成功",update:"更新成功",modify:"修改成功",operate:"操作成功",delete:"删除成功"},fail:{save:"保存失败",edit:"编辑失败",update:"更新失败",modify:"修改失败",operate:"操作失败",delete:"删除失败"},cancelUpdate:"取消修改",cancelDelete:"取消删除",pleaseInput:"请输入",pleaseSelect:"请选择"},Ce={nodesManage:"节点管理",configuration:"配置",ecologyApp:"生态应用",walletCLI:"Wallet CLI",tronLink:"TronLink"},Se={account:"账号",email:"邮箱",password:"密码",rememberPassword:"记住密码",signInTestAccount:"登录测试账号",signIn:"登录",helpTips:{account:"请输入邮箱",email:"请输入邮箱",password:"请输入密码",emailError:"邮箱格式错误",emailOrPwdError:"邮箱或密码错误"}},ye={nodesManage:"节点管理",addNode:"添加节点",modifyNode:"修改节点",nodeDetail:"节点详情",oneClickDeployment:"一键部署",deploy:"部署",encryption:"签名算法",sshUserName:"SSH 用户名",isSR:"SR节点",nodeIP:"节点 IP",nodePort:"节点端口",deployStatus:"部署状态",unDeploy:"未部署",deployed:"已部署",javaTronVersion:"版本号",pleaseAddNode:"请添加至少一个节点",allNodeDeployed:"节点都已部署",pleaseDoneConfig:"请先填写配置",needSRnoSyncCheck:"至少配置一个SR节点同步检测为false",todoConfig:"配置未填写，请先填写配置",inputLater:"稍后再说",inputNow:"立即填写",sureConfigDeploy:"确认使用当前配置进行部署",updateConfig:"修改配置",sureDeploy:"确认部署",deployingTips:"正在部署中, 请稍候日志或部署状态",viewLog:"查看日志",logDialogTitle:"部署日志",emptyLog:"当前部署暂无日志",loadingLog:"正在查询节点记录，请稍等",deployComplete:"部署完成",deployFail:"部署失败",nodeType:"节点类型",nodeConfig:"节点配置",SSH:"SSH",fullNode:"Full Node",superNode:"Super Node",sshConnectType:"安全验证方式",keyConnect:"密钥",passwordConnect:"密码",sshPassword:"密码",sshPort:"端口",SRNode:"SR节点(超级代表节点)",syncCheck:"needSyncCheck",saveAddressPriKey:"请保管好你的地址和私钥，节点创建完成后丢失将无法找回",sshConnectFail:"SSH无法连接，请重新配置",addressNotPrikey:"你的地址与私钥不相匹配",addNodeSuccess:"添加节点成功",addNodeFail:"添加节点失败",updateNodeSuccess:"修改节点成功",updateNodeFail:"修改节点失败",deleteNodeTipsTitle:"提示",deleteNodeTips:"此操作将删除该节点信息, 是否继续?",deleteNodeSuccess:"删除节点成功",helpTips:{crypto:"添加节点之后，签名算法不可修改",deployFile:"部署前首先需要填写本地文件路径, 例如：/Users/xxx/xxx/java-tron-1.0.0.zip",fullNode:"FullNode 是拥有完整区块链数据的节点，能够实时更新数据，负责交易的广播和验证，<br/>提供操作区块链的api和查询数据的api。",superNode:"又称为超级代表（简称SR），主要用于生成区块，负责对网络上广播出来的交易数据进行验证，<br/>并将交易打包进区块中，打包区块的方式是通过SR之间轮流的方式进行打包。",SSH:"节点部署需要通过SSH的方式将部署文件放到服务器上",url:"超级代表的官方网址",voteCount:"超级代表的投票数量，确定超级代表的排序",sshUserName:"用户名",sshPassword:"密码",sshPort:"端口",ip:"FullNode IP",port:"FullNode 端口号",isSR:"配置节点是否为超级代表节点（即witness节点)，开启时为超级代表节点，关闭时为FullNode",needSyncCheck:"同步检测开启后会定期同步链上各节点信息，新链需要有一个 SR 为 false，其他为 true",publicKey:"Base58Check 地址",privateKey:"请输入私钥(256位, 16进制编码)"},valid:{maxNodeLength:"最多添加 20 个节点",inputID:"请输入 ID",positiveInteger:"请输入大于 0 的整数",rightIP:"请输入有效的 IP 地址",disabledLocalIP:"暂不支持本地 IP",hasSameIP:"IP 不能和已有 IP 相同",maxPortValue:"端口号不能超过 65535",inputURL:"请输入 Witness 的 URL",inputVoteCount:"请输入对应投票数量",gteZeroInt:"请输入大于或等于0的整数",maxNumberValue:"数字超过最大限额",maxVoteCountValue:"Vote Count 填写额超过最大值",publicKey:"请输入格式为 Base58Check 的地址",inputPrivateKey:"请输入256位 private key (hex编码)",inputFilePath:"请输入 java-tron 软件包路径",inputRightPath:"软件包路径以 java-tron-1.0.0.zip 结尾"}},Pe={configuration:"配置",quickConfig:"快速配置",customConfig:"自定义配置",importConfig:"导入配置文件",genesisInfo:"创世块信息",baseConfig:"基础配置",netWorkConfig:"HTTP/RPC 配置",databaseConfig:"数据库基础配置",p2pConfig:"P2P 配置",crossChainConfig:"跨链配置",moduleFunction:"模块定制化",moreSetting:"高级配置",accountInfo:"账户信息",addNew:"添加",witnessNodeInfo:"Witness 节点信息",assetDialogTitle:"Asset 配置",assetAddSuccess:"添加 asset 成功",assetAddFail:"添加 asset 失败",assetUpdateSuccess:"修改 asset 成功",assetUpdateFail:"修改 asset 失败",assetDeleteSuccess:"删除 asset 成功",assetDeleteFail:"删除 asset 失败",witnessDialogTitle:"Witness 配置",selectDatabaseConfig:"数据库引擎",isWriteSync:"同步写入",isOpenTransaction:"是否打开 transaction",isOpenIndexDirectory:"是否打开 index 开关",isNeedToUpdateAsset:"是否需要更新 assets",dbCustomModule:"自定义chainbase模块",consensusModule:"共识模块",tempNotSupport:"暂不支持",transactionModule:"Transaction模块",customTransactionModule:"自定义Transaction模块",consensusModuleSaveSuccess:"保存共识模块成功",transactionModuleSaveSuccess:"保存Transaction模块成功",assetSaveSuccess:"保存创世块信息配置成功",baseSaveSuccess:"保存基础配置成功",networkSaveSuccess:"保存网络链接配置成功",databaseSaveSuccess:"保存数据库配置成功",p2pSaveSuccess:"保存 P2P 配置成功",helpTips:{accountName:"账户名",accountType:"账户类型",address:"Base58Check 地址",balance:"账户初始余额, 单位 SUN",chainId:"当前区块链 ID",maintenanceTimeInterval:"维护期的时间间隔",blockProposalExpireTime:"提案失效时间",nodeBlockProducedTimeOut:"节点区块产生超时比例",nodeMinParticipationRate:"节点最小参与度",maxHttpConnectNumber:"最大 HTTP 连接数",httpFullNodePort:"FullNode HTTP 端口",httpSolidityPort:"FullNode HTTP Solidity 端口",rpcPort:"FullNode RPC 端口",rpcSolidityPort:"FullNode RPC Solidity 端口",p2pVersion:"P2P节点版本号",listenPort:"监听端口",seedNodeList:"初始种子节点列表",maxActiveNodes:"最大活跃节点数",maxActiveNodesWithSameIp:"同一 IP 最大活跃节点数"},valid:{inputRightAddress:"请输入正确地址",maxVoteCountValue:"Vote Count 填写额超过最大值",gteZeroInt:"请输入大于或等于0的整数",gtZeroInt:"请输入大于0的整数",maxNumberValue:"数值超过最大范围",maxPortValue:"端口号不能超过 65535",listenPort:"请输入listen端口号",mainnetPlaceholder:"主网 p2pversion 不可使用",testnetPlaceholder:"测试网 p2pversion 不可使用",specialPlaceholder:"特定网络 p2pversion 不可使用",validTwoDecimal:"精度不对",checkDBCustom:"请勾选自定义chainbase模块",inputDBCustom:"请填写自定义chainbase模块路径（以.jar结束）",checkCustomTransaction:"请勾选自定义Transaction模块",inputCustomTransaction:"请填写自定义Transaction模块路径（以.jar结束）",pathEndJAR:"请填写以.jar为结尾的路径"}},we={},Ne={},Ie={base:ke,menu:Ce,sign:Se,nodesManage:ye,configuration:Pe,walletCLI:we,tronLink:Ne},xe={"en-US":ve,"zh-CN":Ie};o["default"].use(pe["a"]);var Oe=navigator.language||navigator.userLanguage;localStorage.getItem("currentLang")&&(Oe=localStorage.getItem("currentLang")),localStorage.setItem("currentLang",Oe);var De=new pe["a"]({locale:Oe||"en-US",messages:xe,silentTranslationWarn:!0});le.a.i18n((function(e,n){return De.t(e,n)}));var Te=De,Ae=t("5c96"),je=t.n(Ae),Le=(t("6861"),t("caad"),t("c975"),t("07ac"),t("ac1f"),t("5319"),t("bc3a")),Fe=t.n(Le),Me=!1;function _e(e,n){if(e.data&&(e.data.code<300||304===e.data.code))n(null,e.data.data);else{var t=e.data.msg;Ee(t,n)}}function Ee(e,n){var t="Error",o=""+(e||"Exception Error");if(e&&e.response&&e.response.data){var a=e.response.data;t=a.error,o=a.path+": "+a.message}Ae["Notification"].error({title:t,message:o}),n(e)}var Re={local:"/__local__",mock:"/__mock__",service:"/__server__"},Ue="local",Ve=Fe.a.create({headers:{"X-Requested-With":"XMLHttpRequest"},withCredentials:!0}),He={request:function(e){return Ve.request(e)},$http:function(e,n,t,o){var a={url:n,method:e},i=Object.values(Re).some((function(e){return~a.url.indexOf(e)}));Me?i||(a.baseURL=Re[Ue]):i&&Object.values(Re).forEach((function(e){~a.url.indexOf(e)&&(a.url=a.url.replace(e,""))})),["post","put","patch"].includes(e)?a.data=t:a.params=t,this.request(a).then((function(e){return _e(e,o)}),(function(e){return Ee(e,o)}))},get:function(e,n,t){this.$http("get",e,n,t)},post:function(e,n,t){this.$http("post",e,n,t)},put:function(e,n,t){this.$http("put",e,n,t)},delete:function(e,n,t){this.$http("delete",e,n,t)}};function Be(e){var n={},t=function(t){n[t]={};var o=function(o){var a=function(a){n[t][a]=function(n,i){He[He[o]?o:"get"](e[t][o][a],n,i)}};for(var i in e[t][o])a(i)};for(var a in e[t])o(a)};for(var o in e)t(o);return n}var $e={get:{getInfo:"/user/info"},post:{login:"/user/login",logout:"/user/logout"}},qe={get:{getNodeList:"/api/allNodeInfo",getNodeLog:"/api/getLogInfo",getNodeInfo:"/api/nodeInfo",checkNode:"/api/checkNode",deployNode:"/api/deployNode",getCrypto:"/api/getCrypto"},post:{addNoteInfo:"/api/nodeInfo",updateCrypto:"/api/crypto"},put:{editNoteInfo:"/api/nodeInfo"},delete:{deleteNoteInfo:"/api/nodeInfo"}},We={get:{checkBalance:"/api/checkBalance",getConfigInfo:"/api/config",checkConfig:"/api/checkConfig",getPluginConfig:"/api/pluginConfig",originConfig:"/api/originConfig"},post:{oneClick:"/api/oneClick",genesisAssetConfig:"/api/genesisAssetConfig",baseSettingConfig:"/api/baseSettingConfig",p2pConfig:"/api/p2pconfig",dbConfig:"/api/dbconfig",networkConfig:"/api/networkconfig",setTransactionModule:"/api/transaction",initConfig:"/api/initConfig",crossChainConfig:"/api/crossChainConfig",dbEngineApi:"/api/dbEngine",consensusApi:"/api/consensus"},put:{},delete:{}},Ge={user:$e,nodesManage:qe,configuration:We},Ke=Be(Ge);o["default"].use(je.a),o["default"].prototype.$_api=Ke,o["default"].prototype.$eventBus=new o["default"],o["default"].config.productionTip=!1,new o["default"]({router:ue,store:v,i18n:Te,render:function(e){return e(d)}}).$mount("#app")},"5c59":function(e,n,t){"use strict";var o=t("6d6d"),a=t.n(o);a.a},6861:function(e,n,t){},"6d6d":function(e,n,t){},"705a":function(e){e.exports=JSON.parse('[{"path":"/nodes-manage/:type(add|edit|detail)?/:id(\\\\d+)?","name":"nodes-manage","meta":{"auth":true}},{"path":"/configuration/:type(quick|custom|import)/:step(genesis|base|network|database|p2p|modules)?","name":"configuration","meta":{"auth":true}},{"path":"/ecology-app","name":"ecology-app","meta":{"auth":true}},{"path":"/wallet-cli","name":"wallet-cli","meta":{"auth":true}},{"path":"/tron-link","name":"tron-link","meta":{"auth":true}},{"path":"/404","name":"404"}]')},"763c":function(e,n,t){"use strict";var o=t("da98"),a=t.n(o);a.a},"97e4":function(e,n,t){},"9d64":function(e,n,t){e.exports=t.p+"static/img/logo.ee37f9db.png"},"9dac":function(e,n,t){var o={"./404":["8cdb",9,"chunk-4e1752bc"],"./404.vue":["8cdb",9,"chunk-4e1752bc"],"./configuration":["73da",9,"chunk-2fbe7c25"],"./configuration/":["73da",9,"chunk-2fbe7c25"],"./configuration/custom":["c7c7",9,"chunk-4c7867f2"],"./configuration/custom/":["c7c7",9,"chunk-4c7867f2"],"./configuration/custom/components/BaseConfig":["ea4d",9,"chunk-0f88cf4a"],"./configuration/custom/components/BaseConfig.vue":["ea4d",9,"chunk-0f88cf4a"],"./configuration/custom/components/CrossChainConfig":["ff18",9,"chunk-20bf45e2"],"./configuration/custom/components/CrossChainConfig.vue":["ff18",9,"chunk-20bf45e2"],"./configuration/custom/components/DatabaseConfig":["18b3",9,"chunk-b09eb714"],"./configuration/custom/components/DatabaseConfig.vue":["18b3",9,"chunk-b09eb714"],"./configuration/custom/components/GenesisConfig":["1717",9,"chunk-1368f67c","chunk-29d3d1c7"],"./configuration/custom/components/GenesisConfig/":["1717",9,"chunk-1368f67c","chunk-29d3d1c7"],"./configuration/custom/components/GenesisConfig/DialogAddGenesisAsset":["f76b",9,"chunk-1368f67c"],"./configuration/custom/components/GenesisConfig/DialogAddGenesisAsset.vue":["f76b",9,"chunk-1368f67c"],"./configuration/custom/components/GenesisConfig/DialogViewGenesisWitness":["ac70",9,"chunk-2d213371"],"./configuration/custom/components/GenesisConfig/DialogViewGenesisWitness.vue":["ac70",9,"chunk-2d213371"],"./configuration/custom/components/GenesisConfig/index":["1717",9,"chunk-1368f67c","chunk-29d3d1c7"],"./configuration/custom/components/GenesisConfig/index.vue":["1717",9,"chunk-1368f67c","chunk-29d3d1c7"],"./configuration/custom/components/ModulesConfig":["4596",9,"chunk-13736bf2"],"./configuration/custom/components/ModulesConfig/":["4596",9,"chunk-13736bf2"],"./configuration/custom/components/ModulesConfig/index":["4596",9,"chunk-13736bf2"],"./configuration/custom/components/ModulesConfig/index.vue":["4596",9,"chunk-13736bf2"],"./configuration/custom/components/ModulesConfig/transactionModuleList":["942f",3,"chunk-2d0e53c5"],"./configuration/custom/components/ModulesConfig/transactionModuleList.json":["942f",3,"chunk-2d0e53c5"],"./configuration/custom/components/NetworkConfig":["bada",9,"chunk-687f4c9e"],"./configuration/custom/components/NetworkConfig.vue":["bada",9,"chunk-687f4c9e"],"./configuration/custom/components/P2PConfig":["56e3",9,"chunk-c2da51f0"],"./configuration/custom/components/P2PConfig.vue":["56e3",9,"chunk-c2da51f0"],"./configuration/custom/index":["c7c7",9,"chunk-4c7867f2"],"./configuration/custom/index.vue":["c7c7",9,"chunk-4c7867f2"],"./configuration/import":["3112",9,"chunk-2d0b8df5"],"./configuration/import/":["3112",9,"chunk-2d0b8df5"],"./configuration/import/index":["3112",9,"chunk-2d0b8df5"],"./configuration/import/index.vue":["3112",9,"chunk-2d0b8df5"],"./configuration/index":["73da",9,"chunk-2fbe7c25"],"./configuration/index.vue":["73da",9,"chunk-2fbe7c25"],"./configuration/quick":["e27c",9,"chunk-1368f67c","chunk-0fbf4d17"],"./configuration/quick/":["e27c",9,"chunk-1368f67c","chunk-0fbf4d17"],"./configuration/quick/index":["e27c",9,"chunk-1368f67c","chunk-0fbf4d17"],"./configuration/quick/index.vue":["e27c",9,"chunk-1368f67c","chunk-0fbf4d17"],"./ecology-app":["d136",9,"chunk-2d21d466"],"./ecology-app/":["d136",9,"chunk-2d21d466"],"./ecology-app/index":["d136",9,"chunk-2d21d466"],"./ecology-app/index.vue":["d136",9,"chunk-2d21d466"],"./home":["7abe",9,"chunk-1f59041c"],"./home/":["7abe",9,"chunk-1f59041c"],"./home/index":["7abe",9,"chunk-1f59041c"],"./home/index.vue":["7abe",9,"chunk-1f59041c"],"./nodes-manage":["128b",9,"chunk-49ee2486"],"./nodes-manage/":["128b",9,"chunk-49ee2486"],"./nodes-manage/index":["128b",9,"chunk-49ee2486"],"./nodes-manage/index.vue":["128b",9,"chunk-49ee2486"],"./nodes-manage/node-info":["9b42",9,"chunk-4069406a"],"./nodes-manage/node-info/":["9b42",9,"chunk-4069406a"],"./nodes-manage/node-info/index":["9b42",9,"chunk-4069406a"],"./nodes-manage/node-info/index.vue":["9b42",9,"chunk-4069406a"],"./nodes-manage/node-list":["d445",9,"chunk-76db6dd4"],"./nodes-manage/node-list/":["d445",9,"chunk-76db6dd4"],"./nodes-manage/node-list/components/DeployDialog":["b011",9,"chunk-2d20e7a4"],"./nodes-manage/node-list/components/DeployDialog.vue":["b011",9,"chunk-2d20e7a4"],"./nodes-manage/node-list/components/LogDialog":["69cd",9,"chunk-4fe2121d"],"./nodes-manage/node-list/components/LogDialog.vue":["69cd",9,"chunk-4fe2121d"],"./nodes-manage/node-list/index":["d445",9,"chunk-76db6dd4"],"./nodes-manage/node-list/index.vue":["d445",9,"chunk-76db6dd4"],"./sign-in":["1d4e",9,"chunk-4586d74e"],"./sign-in/":["1d4e",9,"chunk-4586d74e"],"./sign-in/index":["1d4e",9,"chunk-4586d74e"],"./sign-in/index.vue":["1d4e",9,"chunk-4586d74e"],"./tron-link":["f621",9,"chunk-2d22cfc5"],"./tron-link/":["f621",9,"chunk-2d22cfc5"],"./tron-link/index":["f621",9,"chunk-2d22cfc5"],"./tron-link/index.vue":["f621",9,"chunk-2d22cfc5"],"./wallet-cli":["55f3",9,"chunk-2d0c8c23"],"./wallet-cli/":["55f3",9,"chunk-2d0c8c23"],"./wallet-cli/index":["55f3",9,"chunk-2d0c8c23"],"./wallet-cli/index.vue":["55f3",9,"chunk-2d0c8c23"]};function a(e){if(!t.o(o,e))return Promise.resolve().then((function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=o[e],a=n[0];return Promise.all(n.slice(2).map(t.e)).then((function(){return t.t(a,n[1])}))}a.keys=function(){return Object.keys(o)},a.id="9dac",e.exports=a},"9f0c":function(e,n,t){"use strict";var o=t("97e4"),a=t.n(o);a.a},a591:function(e,n,t){"use strict";var o=t("c939"),a=t.n(o);a.a},baa8:function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("el-dropdown",{staticClass:"im-locale hover-effect",attrs:{trigger:"click"},on:{command:e.handleCommand}},[t("div",{staticClass:"avatar-wrapper"},[e._v(e._s(e.currentLang||"Language")),t("i",{staticClass:"el-icon-caret-bottom"})]),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(e.languages,(function(n,o){return t("el-dropdown-item",{key:o,attrs:{command:o}},[e._v(" "+e._s(n)+" ")])})),1)],1)},a=[],i={name:"im-locale",data:function(){return{currentLang:"",languages:{"en-US":"English","zh-CN":"简体中文"}}},created:function(){this.getLang()},methods:{getLang:function(){var e=localStorage.getItem("currentLang");this.currentLang=this.languages[e||"en-US"]},handleCommand:function(e){localStorage.setItem("currentLang",e),window.location.reload()}}},c=i,s=(t("4977"),t("2877")),r=Object(s["a"])(c,o,a,!1,null,"5fec2ca6",null);n["a"]=r.exports},c939:function(e,n,t){},cdcc:function(e,n,t){},da98:function(e,n,t){}});
//# sourceMappingURL=app.5e9e5ed1.js.map