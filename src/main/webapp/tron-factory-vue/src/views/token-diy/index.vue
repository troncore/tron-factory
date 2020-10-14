<template>
  <div class="token-diy">

    <!-- 填写参数 -->
    <token-params v-if="step === 1" @step="handleStep"/>

    <!-- 连接钱包 -->
    <connect-tronlink v-if="step === 2" @step="handleStep"/>

    <!-- 确认参数 -->
    <verify-params  v-if="step === 3" @step="handleStep"/>

  </div>
</template>

<script>
import TokenParams from "./TokenParams"
import VerifyParams from "./VerifyParams";
import ConnectTronlink from "./ConnectTronLink";

export default {
  name: "token-diy",
  components: { ConnectTronlink, VerifyParams, TokenParams },
  data () {
    return {
      step: 0,
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.step = Number(localStorage.getItem('tokenDIYStep') || 1)
    },
    handleStep (step) {
      this.step += step

      localStorage.setItem('tokenDIYStep', this.step)
    }
  }
}
</script>

<style scoped lang="scss">
.token-diy {
  margin-top: 100px;

  ::v-deep .card-view {
    width: 800px;
    margin-left: 50%;
    transform: translateX(-50%);
    .card-main {
      margin-bottom: 20px;
      overflow: hidden;
      .card-header {
        padding-left: 16px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background-color: theme-color();
        .card-title {
          font-size: 24px;
          font-weight: bold;
          color: white;
        }
      }

      .card-body {
        padding: 20px 50px;
      }
    }


    .card-footer {
      display: flex;
      padding: 0 50px;
      &.center {
        justify-content: center;
      }
      &.space-between {
        justify-content: space-between;
      }
    }
  }
}
</style>
