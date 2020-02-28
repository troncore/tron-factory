<template>
  <div class="sign-in">

    <div class="left-box">

    </div>
    <div class="right-box">
      <div class="form">
        <div class="form-item">
          <el-input v-model="form.email" clearable :placeholder="$t('userInfo.email')"/>
        </div>
        <div class="form-item">
          <el-input type="password" v-model="form.password" clearable :placeholder="$t('userInfo.password')"/>
        </div>

        <div class="form-item remove-margin">
          <el-button type="text" @click="handleTestAccount">{{ $t('userInfo.testAccount') }}</el-button>
        </div>
        <div class="form-item">
          <el-button class="sign-in__btn" type="primary" :loading="loading" @click="handleSignIn">{{ $t('userInfo.signIn') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "sign-in",
  data () {
    return {
      form: {
        email: '',
        password: '',
      },
      formRules: {

      },
      testAccount: [
        {
          email: 'test@tron.com',
          password: 'test1234'
        }
      ],
      loading: false,
    }
  },
  computed: {
    currentAccount () {
      return this.testAccount[0]
    }
  },
  methods: {
    ...mapMutations('app', [
      "signIn"
    ]),
    handleTestAccount () {
      this.form.email = this.currentAccount.email || ''
      this.form.password = this.currentAccount.password || ''
    },

    handleSignIn () {
      // this.loading = true
      let emailReg = /^\w+@\w+\.\w+$/
      let passwordReg = /^(?=.*[0-9])(?=.*[a-zA-Z])\S{8,20}$/

      let invalidEmail = !this.form.email && this.form.email !== this.currentAccount.email
      let invalidPassword = !this.form.password && this.form.password !== this.currentAccount.password

      if (invalidEmail  || invalidPassword) {
        this.$notify.error({
          title: '错误',
          message: this.$t('userInfo.helpTips.emailOrPwd'),
        })
        return
      }

      this.signIn()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-in {
  display: flex;
  height: 100vh;
  background-color: white;

  .left-box {
    flex: 1.5;
    height: 100%;

    background-color: theme-color(.8);
  }
  .right-box {
    flex: 1;
    position: relative;
  }

  .form {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    transform: translate(-50%, -50%);

    .form-item {
      &:first-child {
        margin-bottom: 20px;
      }
    }

    .sign-in__btn {
      width: 100%;
    }
  }
}
</style>
