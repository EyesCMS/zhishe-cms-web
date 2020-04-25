<template>
  <div class="content">
    <h1>register</h1>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="Form"
    >
      <el-form-item
        label="用户名"
        prop="name"
      >
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="ruleForm.password"
          type="password"
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="password2"
      >
        <el-input
          v-model="ruleForm.password2"
          type="password"
        />
        <!-- <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span> -->
      </el-form-item>
      <el-form-item
        label="保密问题"
        prop="question"
      >
        <el-input v-model="ruleForm.question" />
      </el-form-item>
      <el-form-item
        label="保密回答"
        prop="answer"
      >
        <el-input v-model="ruleForm.answer" />
      </el-form-item>
      <el-form-item
        label="个性签名"
        prop="solgan"
      >
        <el-input v-model="ruleForm.slogan" />
      </el-form-item>
      <el-form-item
        label="专业"
        prop="major"
      >
        <el-input v-model="ruleForm.major" />
      </el-form-item>
      <el-form-item
        label="电话"
        prop="phone"
      >
        <el-input v-model="ruleForm.phone" />
      </el-form-item>
      <el-form-item
        label="地址"
        prop="address"
      >
        <el-input v-model="ruleForm.address" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >立即注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import { register } from '../../api/user'
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: 'zhishe',
        password: '123456',
        password2: '123456',
        major: '大数据',
        slogan: '这是一条个性签名',
        phone: '12345678910',
        address: '这是宿舍地址',
        answer: '这是一个保密问题答案',
        question: '这是一个保密问题'
      },
      rules: {
        name: [
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
        slogan: [
          { max: 100, message: '请保持在100字符内', trigger: 'blur' }
        ],
        major: [
          { max: 30, message: '请保持在30字符内', trigger: 'blur' }
        ],
        phone: [
          { min: 11, max: 11, message: '请正确输入', trigger: 'blur' }
        ],
        question: [
          { required: true, message: '请输入保密问题用以找回密码', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '请输入回答', trigger: 'blur' }
        ]
      },
      passwordType: 'password'
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          var data = {
            name: this.ruleForm.name,
            password: this.ruleForm.password,
            major: this.ruleForm.major,
            slogan: this.ruleForm.slogan,
            phone: this.ruleForm.phone,
            address: this.ruleForm.address,
            answer: this.ruleForm.answer,
            question: this.ruleForm.question
          }
          const result = await register(data)
          if (result.status === 201) {
            this.$message.success('注册成功')
            this.$router.push('/login')
          } else if (result.status === 409) {
            this.$message.error('用户名已存在')
          } else this.$message.error('注册失败')
        } else {
          this.$message.error('提交失败')
          // console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 0;
  padding: 0;
  background-color: #2d3a4b;
  width: 100%;
  height: 100%;
}
h1 {
  margin: 0;
  padding: 20px;
  text-align: center;
  color: #eee;
}
.Form {
  width: 60%;
  margin: 0 auto;
  background-color: aliceblue;
  margin: 0 auto;
}
</style>
