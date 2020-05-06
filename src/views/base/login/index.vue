<template>
  <div class="login-container">
    <section>
      <div class="leftimg">
        <img src="../../../assets/images/loginLeftImg.png">
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-page"
        auto-complete="on"
        label-position="left"
      >

        <h3 class="title">Zhishe 社团管理系统 </h3>
        <p class="tname"> 基于 vue-element-template 的后台系统 </p>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
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
            <span>forget password?</span>
          </router-link>
          <!--          <span style="margin-right:20px;">username: admin</span>-->
          <!--          <span> password: any</span>-->
          <router-link
            to="/register"
            style="float:right"
          >
            <span> register</span>
          </router-link>
        </div>
      </el-form>
    </section>
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
        username: 'test',
        password: '123456'
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

import bg from '@/assets/images/bg.png'

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-size: 100% 100%;
}
.leftimg {
  width: 50%;
  height: 100%;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
.leftimg img {
  width: 75%;
  margin-left: 3rem;
}
.login-container section {
  border-radius: 15px;
  width: 50%;
  height: 52%;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  left: 25%;
  top: 27%;
}
.el-input {
  width: 92%;
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}
.login-page {
  width: 50%;
  float: right;
  padding: 1rem 3rem;
  box-sizing: border-box;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
.title {
  color: #333333;
  font-weight: normal;
  font-size: 1.375rem;
  margin-bottom: 0.4rem;
}
.tname {
  font-size: 0.6rem;
  color: #a9a9a9;
  margin: 0;
  margin-bottom: 1.875rem;
}
.el-button {
  width: 70% !important;
  display: block;
  border-radius: 25px;
  margin-top: 1rem;
  height: 2.5rem;
}
.el-checkbox {
  color: #666666;
}
@media only screen and (min-width: 1920px) {
  .login-page {
    padding: 3rem;
  }
  .title {
    font-size: 1.5625rem;
  }
  .tname {
    margin-bottom: 4.375rem;
  }
  .el-button {
    height: 3.125rem;
    margin-top: 3rem;
  }
}
</style>
