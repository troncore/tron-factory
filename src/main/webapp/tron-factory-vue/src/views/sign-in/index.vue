<template>
  <div class="sign-in">

    <div class="left-box">
      <div class="detail">
        <div class="title">
          <span>TRON FACTORY</span>
          <span>ONE CLICK DEPLOYMENT</span>
        </div>
        <div class="summary">
          <span>One Click Deployment</span>
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
          <label class="label">{{ $t('sign.account') }}</label>
          <el-input v-model="form.account" clearable :placeholder="$t('sign.helpTips.account')"/>
        </div>
        <div class="form-item">
          <label class="label">{{ $t('sign.password') }}</label>
          <el-input type="password" v-model="form.password" clearable :placeholder="$t('sign.helpTips.password')"/>
        </div>
        <div class="form-item sign-in__box">
          <el-button class="sign-in__btn" type="primary" :loading="loading" @click="handleSignIn">{{ $t('sign.signIn') }}</el-button>
        </div>
        <div class="form-item help-footer">
          <span><!-- placeholder --></span>
          <!--<el-checkbox v-model="isSavePassword" @change="handleSavePassword">{{ $t('sign.rememberPassword') }}</el-checkbox>-->
          <el-button type="text" @click="handleTestAccount">{{ $t('sign.signInTestAccount') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import ImLocale from "@/components/ImLocale/index";
export default {
  name: "sign-in",
  components: { ImLocale },
  data () {
    return {
      siteTitle: 'TRON FACTORY',
      form: {
        account: '',
        password: '',
      },
      formRules: {

      },
      testAccount: [
        {
          account: 'test@tron.com',
          password: 'test1234'
        }
      ],
      isSavePassword: true,
      loading: false,
    }
  },
  computed: {
    currentAccount () {
      return this.testAccount[0]
    }
  },
  methods: {
    ...mapActions('app', [
      "signIn"
    ]),

    handleSignIn () {
      // this.loading = true
      let emailReg = /^\w+@\w+\.\w+$/
      let passwordReg = /^(?=.*[0-9])(?=.*[a-zA-Z])\S{8,20}$/

      let invalidEmail = !this.form.account || this.form.account !== this.currentAccount.account
      let invalidPassword = !this.form.password || this.form.password !== this.currentAccount.password

      if (invalidEmail  || invalidPassword) {
        this.$notify.error({
          title: this.$t('base.error'),
          message: this.$t('sign.helpTips.emailOrPwdError'),
        })
        return
      }

      this.signIn({
        account: this.form.account,
      }).then(() => {
        this.$_api.configuration.initConfig({}, err => {})
        this.$router.push('/')
      })
    },

    handleSavePassword () {

    },
    handleTestAccount () {
      this.form.account = this.currentAccount.account || ''
      this.form.password = this.currentAccount.password || ''
    },
  }
}
</script>

<style lang="scss" scoped>
.sign-in {
  display: flex;
  height: 100vh;
  background-color: white;

  .left-box {
    position: relative;
    flex: 1.5;
    height: 100%;
    background-color: theme-color();

    .detail {
      position: absolute;
      top: 50%;
      left: 10%;
      transform: translate(0, -100%);
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
        margin-bottom: 20px;
        &:nth-last-child(2) {
          margin-bottom: 0;
        }

        .label {
          display: block;
          margin-bottom: 8px;
          font-size: 18px;
          color: #081C56;
          font-weight: bold;
        }
      }

      .sign-in__box {
        margin-top: 30px;
      }

      .sign-in__btn {
        width: 100%;
      }
      .help-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
