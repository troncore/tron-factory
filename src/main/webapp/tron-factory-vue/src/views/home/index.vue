<template>
  <div class="home">
    <div class="left-box">
      <div class="detail">
        <div class="title">
          <span>TRON FACTORY</span>
          <span>ONE CLICK DEPLOYMENT</span>
        </div>
      </div>
    </div>

    <div class="right-box">
      <div class="header">
        <im-locale></im-locale>
      </div>
      <div class="form">
        <img class="logo-img" src="@/assets/images/logo.png" :title="siteTitle" :alt="siteTitle"/>
        <div class="form-item">
          <el-button type="primary" @click="handleOneDeployment">{{ $t('nodesManage.oneClickDeployment') }}</el-button>
          <el-button @click="viewDocument()">{{ $t('base.viewDocument') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ImLocale from "@/components/ImLocale";
export default {
  name: "home",
  components: { ImLocale },
  data () {
    return {
      siteTitle: 'TRON FACTORY',
    }
  },
  methods: {
    ...mapMutations('app', [
      "viewDocument"
    ]),

    handleOneDeployment () {
      localStorage.setItem('oneClick', 'true')
      this.$_api.configuration.oneClick({}, err => {})
      this.$router.push('/nodes-manage')
    },
  }
}
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    height: 100vh;
    background-color: white;

    .left-box {
      position: relative;
      flex: 1;
      height: 100%;
      background-color: theme-color();

      .detail {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .title {
          margin-bottom: 20px;
          font-size: 42px;
          font-weight: bold;
          color: white;
          span {
            display: block;
            white-space: nowrap;
          }
        }
        .summary {
          margin-bottom: 20px;
          font-size: 16px;
          font-weight: bold;
          color: rgba(255, 255, 255, .6);
          span {
            display: block;
          }
        }
      }
    }

    .right-box {
      flex: 1;
      position: relative;

      .header {
        display: flex;
        align-items: center;
        padding: 0 20px;
        width: 100%;
        height: 60px;
        .im-locale {
          margin-left: auto;
        }
      }

      .form {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 400px;
        transform: translate(-50%, -50%);

        .logo-img {
          position: absolute;
          display: inline-block;
          top: -100px;
          left: 50%;
          width: 200px;
          transform: translate(-50%, 0);
        }

        .form-item {
          display: flex;
          justify-content: space-between;
          .el-button {
            flex: 1;
            &:first-child {
              margin-right: 20px;
            }
          }
        }
      }
    }

  }
</style>
