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
          <p>TronLink插件已安装，但未登录！</p>
          <p>请登录TronLink并刷新页面后再继续后面的操作</p>
        </div>
        <div v-else class="help-tips">
          <p class="account">代币所有者账号 <im-tooltip content="代币所有者账号将持有本次发行的全部代币" />：{{ tokenAccount }}</p>
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
    }
  },
  created () {
    this.init()
  },
  destroyed () {
    clearInterval(this.timeID)
  },
  methods: {
    init () {
      this.getTronWeb()
      this.timeID = setInterval(this.getTronWeb, 300)
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
    text-align: center;
    min-height: 100px;

    .help-tips {
      p {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: bold;

        &.account {
          margin: 40px 0;
          font-weight: normal;
        }
      }
      .el-link {
        font-size: 18px;
        font-weight: normal;
        vertical-align: baseline;
      }
      .success-connect {
      }

      .success {
        color: $--color-success;
      }
    }
  }
}
</style>
