<template>
  <div class="content">
    <div class="Form">
      <el-link
        type="primary"
        @click="backToLogin()"
      >返回</el-link>
      <h3 class="form-title">重置密码</h3>
      <el-steps
        :active="name"
        finish-status="success"
        simple
      >
        <el-step title=" 填写用户名" />
        <el-step title="填写答案" />
        <el-step title="修改密码" />
      </el-steps>
      <el-tabs
        v-model="activeName"
        disabled="false"
      >
        <el-tab-pane name="1">
          <el-form
            ref="form1"
            :model="form1"
            :rules="form1Rules"
          >
            <el-form-item
              label="用户名"
              prop="username"
            >
              <el-input
                v-model="form1.username"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="handleClick(2)">下一步</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="2">
          <el-form
            ref="form2"
            :model="form2"
            :rules="form2Rules"
          >
            <el-form-item label="保密问题">
              <el-input v-model="form2.login_question" />
            </el-form-item>
            <el-form-item
              label="保密回答"
              prop="login_aswer"
            >
              <el-input
                v-model="form2.login_aswer"
                placeholder="请输入回答"
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="handleClick(3)">下一步</el-button>
              <el-button @click="back(1)">上一步</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="3">
          <el-form
            ref="form3"
            :model="form3"
            :rules="form3Rules"
          >
            <el-form-item
              label="输入新密码"
              prop="newpassword"
            >
              <el-input
                v-model="form3.newpassword"
                placeholder="请输入新密码"
                type="password"
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="handleClick()">提交</el-button>
              <el-button @click="back(2)">上一步</el-button>

            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>

</template>
<script>
import { question } from '@/api/user'
import { answer } from '@/api/user'
import { newpassword } from '@/api/user'
export default {
  data() {
    return {
      form1: {
        username: ''
      },
      form2: {
        login_question: '',
        login_aswer: ''
      },
      form3: {
        newpassword: ''
      },
      activeName: '1',
      name: 0,
      form1Rules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }]
      },
      form2Rules: {
        login_aswer: [{ required: true, trigger: 'blur', message: '请输入回答' }]
      },
      form3Rules: {
        newpassword: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      }
    }
  },
  methods: {
    async handleClick(i) {
      if (i === 2) {
        this.$refs.form1.validate(valid => {
          if (valid) {
            console.log(this.form1)
            const data = { username: this.form1.username }
            question(data).then(response => {
              console.log('@forget getQuestion response:')
              console.log(response)
              this.form2.login_question = response.data.loginProblem
              this.activeName = i.toString()
              this.name = i - 1
            }).catch((e) => {
              console.log(e)
              this.$message.error('获取问题失败！')
            })
          } else {
            this.$message.error('提交失败')
          }
        })
      } else if (i === 3) {
        this.$refs.form2.validate(valid => {
          if (valid) {
            const data = {
              username: this.form1.username,
              answer: this.form2.login_aswer
            }
            answer(data).then(response => {
              console.log('@forget answer response:')
              console.log(response)
              this.activeName = i.toString()
              this.name = i - 1
            }).catch((e) => {
              console.log(e)
              this.$message.error('回答错误！')
            })
          } else {
            this.$message.error('提交失败')
          }
        })
      } else {
        this.$refs.form2.validate(valid => {
          if (valid) {
            const data = {
              username: this.form1.username,
              answer: this.form2.login_aswer,
              password: this.form3.newpassword
            }
            newpassword(data).then(response => {
              console.log('@forget newpassword response:')
              console.log(response)
              this.$message.success('修改成功！')
              this.$router.push('/login')
            }).catch((e) => {
              console.log(e)
              this.$message.error('修改失败')
            })
          } else {
            this.$message.error('提交失败')
          }
        })
      }
    },
    async backToLogin() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    back(i) {
      this.activeName = i.toString()
      this.name = i - 1
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 150px auto;
  padding: 0;
  /*overflow: hidden;*/
}
.form-title {
  text-align: center;
  margin-bottom: 30px;
}
.Form {
  width: 45%;
  padding: 20px;
  margin: 20px auto;
  border-radius: 20px;
  box-shadow: 0 0 20px #dcdfe6;
}
</style>
