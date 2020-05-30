<template>
  <div class="content">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="20%"
      class="Form"
    >
      <el-link
        type="primary"
        @click="back()"
      >使用已有账号登陆</el-link>
      <h3 class="form-title">注册账号</h3>
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input
          v-model="ruleForm.username"
          style="width:75%;"
        />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="ruleForm.password"
          type="password"
          placeholder="至少6位密码"
          style="width:75%;"
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="password2"
      >
        <el-input
          v-model="ruleForm.password2"
          type="password"
          style="width:75%;"
        />
      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="email"
      >
        <el-input
          v-model="ruleForm.email"
          style="width:50%;"
          @keyup.enter.native="countDown"
        />
        <el-button
          type="primary"
          @click="countDown"
        >
          {{ content }}
        </el-button>
      </el-form-item>
      <el-form-item
        label="验证码"
        prop="authCode"
      >
        <el-input
          v-model="ruleForm.authCode"
          style="width:75%;"
          @keyup.enter.native="submitForm('ruleForm')"
        />
      </el-form-item>
      <div style="text-align:center">
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >立即注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { register, getAuthCode } from '@/api/user'
export default {
  data() {
    // 密码不一样
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 邮箱正确性检测
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请正确填写邮箱'))
      } else {
        if (value !== '') {
          var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if (!reg.test(value)) {
            callback(new Error('请输入有效的邮箱'))
          }
        }
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: '',
        password2: '',
        authCode: '',
        email: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度为6-12个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度为6-12个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        authCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      passwordType: 'password',
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 60 // 记录具体倒计时时间
    }
  },
  methods: {
    // 提交注册表单
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var data = {
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            email: this.ruleForm.email,
            authCode: this.ruleForm.authCode
          }
          register(data)
            .then(response => {
              this.$message.success('注册成功')
              this.$router.push('/login')
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          this.$message.error('提交失败')
          // console.log('error submit!!')
          return false
        }
      })
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    // 显示密码
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

    // 返回
    async back() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },

    countDown() {
      var value = this.ruleForm.email
      if (value === '') {
        this.$message.error('请正确填写邮箱')
        return
      } else {
        if (value !== '') {
          var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if (!reg.test(value)) {
            this.$message.error('请输入有效的邮箱')
            return
          } else {
            getAuthCode({ email: value }).then(response => {
              if (typeof (response) !== 'undefined') {
                this.$message.success('获取验证码成功！')
                this.content = this.totalTime + 's后重新发送' // 这里解决60秒不见了的问题
                const clock = window.setInterval(() => {
                  this.totalTime--
                  this.content = this.totalTime + 's后重新发送'
                  if (this.totalTime < 0) { // 当倒计时小于0时清除定时器
                    window.clearInterval(clock)
                    this.content = '重新发送验证码'
                    this.totalTime = 60
                  }
                }, 1000)
              } else {
                return
              }
            })
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url(../../../assets/images/bg.png) no-repeat;
  background-size: 100% 100%;
  /*overflow: hidden;*/
}

.form-title {
  text-align: center;
  margin-bottom: 30px;
}

.Form {
  width: 45%;
  padding: 20px;
  margin: 150px auto;
  border-radius: 20px;
  background: white;
  box-shadow: 0 0 20px #dcdfe6;
}
</style>
