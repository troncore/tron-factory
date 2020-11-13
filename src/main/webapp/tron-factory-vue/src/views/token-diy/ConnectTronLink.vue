<template>
  <div class="connect-tronlink card-view">
    <div class="im-card card-main">
      <div class="card-header">
        <span class="card-title">连接TronLink钱包</span>
      </div>
      <div class="card-body">
        <div v-if="!isInstallTronLink" class="help-tips">
          <p>我们检测到你还没有安装 <el-link href="https://www.tronlink.org/" type="primary" target="_blank">TronLink(波宝钱包)</el-link> 插件！</p>
          <p>请安装TronLink并刷新页面后再继续后面的操作</p><br />
          <el-button plain type="primary" round class="im-button largest" @click="handleExtend">Chrome 扩展</el-button>
        </div>
        <div v-else-if="!isConnectedTronLink" class="help-tips">
          <p class="warning">TronLink插件已安装，但未登录！</p>
          <p>请登录TronLink并刷新页面后再继续后面的操作</p>
        </div>
        <div v-else class="help-tips">
          <div class="result">
            <div><b>代币所有者</b>：{{ tokenAccount }}</div>
            <div class="help-info">* 代币所有者将持有本次发行的全部代币</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer space-between">
      <el-button class="im-button largest" @click="handleCancel">{{ $t('base.prevStep') }}</el-button>
      <el-button class="im-button largest" :disabled="!isConnectedTronLink" type="primary" @click="handleSubmit">{{ $t('base.nextStep') }}</el-button>
    </div>
  </div>
</template>

<script>
import ImTooltip from "@/components/ImTooltip";
export default {
  name: "connect-tronlink",
  components: { ImTooltip },
  data () {
    return {
      disable: false,
      isInstallTronLink: false,
      isConnectedTronLink: false,
      tokenAccount: '', // 代币所有者账号
      timeID: null,
      chain: '',
    }
  },
  created () {
    this.init()
    window.addEventListener('message', this.checkTronLinkNodeNet)
  },
  destroyed () {
    clearInterval(this.timeID)
    window.removeEventListener('message', this.checkTronLinkNodeNet)
  },
  methods: {
    init () {
      this.getTronWeb()
      this.timeID = setInterval(this.getTronWeb, 300)
    },
    // 检测节点网络切换
    checkTronLinkNodeNet (e) {
      if (e.data.message?.action == "setNode") {
        let fullnode = e.data.message.data.node.fullNode
        if (fullnode.includes('api.trongrid')) this.chain = '波场主网络 / 主链'
        else if (fullnode.includes('nile')) this.chain = '尼罗河测试网 / 主链.'
      }
    },
    getTronWeb(){
      // 浏览器成功安装tronlink扩展后，会自动添加全局变量 tronWeb
      if(window.tronWeb){
        this.isInstallTronLink = true
        if (window.tronWeb.defaultAddress.base58) {
          this.isConnectedTronLink = true
          this.tokenAccount = window.tronWeb.defaultAddress.base58
        } else {
          this.isConnectedTronLink = false
          this.tokenAccount = ''
        }
      } else{
        this.isInstallTronLink = false
        this.isConnectedTronLink = false
        this.tokenAccount = ''
      }
    },

    handleExtend () {
      window.open('https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec', '_blank')
    },

    handleCancel () {
      this.$emit('step', -1)
    },
    handleSubmit () {
      let tokenDIY = JSON.parse(localStorage.getItem('tokenDIY')) || {}

      tokenDIY.tokenAccount = this.tokenAccount

      localStorage.setItem('tokenDIY', JSON.stringify(tokenDIY))

      this.$emit('step', 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.connect-tronlink {
  .card-body {
    .help-tips {
      padding: 30px 0;
      font-size: 18px;
      text-align: center;
      p {
        margin-bottom: 10px;
      }
      .el-link {
        font-size: 18px;
        font-weight: normal;
        vertical-align: baseline;
      }
      .success {
        color: $--color-success;
      }
      .warning {
        color: #d0021b;
      }

      .result {
        //text-align: left;
        .help-info {
          margin-top: 20px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
