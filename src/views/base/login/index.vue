<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-page"
      auto-complete="on"
      label-position="left"
    >

      <h3 class="login-title">Zhishe 社团管理系统</h3>

      <el-form-item label="Username" prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          style="width:340px;"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item label="Password" prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          style="width:340px;"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >Login</el-button>

      <div class="tips">
        <router-link
          to="/forget"
          style="float:left"
        >
          <span style="color:#104E8B">忘记密码?</span>
        </router-link>
        <!--          <span style="margin-right:20px;">username: admin</span>-->
        <!--          <span> password: any</span>-->
        <router-link
          to="/register"
          style="float:right"
        >
          <span style="color:#104E8B"> 注册</span>
        </router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: '/'
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch((e) => {
            console.log(e)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
}
.login-page {
  width: 400px;
  margin: 150px auto;
  border: #DCDFE6 solid 1px;
  padding:30px 40px 20px 20px;
  border-radius:20px;
  box-shadow: 0 0 20px #DCDFE6;
}
.login-title{
  text-align: center;
  margin-bottom:30px;
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}
</style>
