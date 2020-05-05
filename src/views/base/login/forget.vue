<template>
  <div class="content">
    <h1>Reset Password</h1>
    <div class="index">
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
              <el-input v-model="form1.username" />
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
              <el-input v-model="form2.login_aswer" />
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
        username: 'test2'
      },
      form2: {
        login_question: 'test',
        login_aswer: 'test'
      },
      form3: {
        newpassword: 'test'
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
            question(this.form1).then(response => {
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
              oldPassword: this.form2.login_aswer,
              newPassword: this.form3.newpassword
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
    back(i) {
      this.activeName = i.toString()
      this.name = i
    }
  }
}
</script>

<style lang="scss" scoped>
html body {
  margin: 0;
  padding: 0;
}
.content {
  position: absolute;
  background-color: #2d3a4b;
  width: 100%;
  height: 100%;
}
.index {
  width: 65%;
  padding: 20px;
  border-radius: 5px;
  background-color: aliceblue;
  margin: 0 auto;
  margin-top: 30px;
}
h1 {
  margin-top: 150px;
  padding: 8px;
  text-align: center;
  color: #eee;
}
</style>
