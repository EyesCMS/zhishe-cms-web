<template>
  <div>
    <el-steps
      :active="name"
      finish-status="success"
      simple
      style="margin-top: 20px"
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
        <el-form>
          <el-form-item label="用户名">
            <el-input v-model="form1.username" />
          </el-form-item>
          <el-form-item>
            <el-button @click="handleClick(2)">下一步</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="2">
        <el-form :model="form2">
          <el-form-item label="保密问题">
            <el-input v-model="form2.login_question" />
          </el-form-item>
          <el-form-item label="保密回答">
            <el-input v-model="form2.login_aswer" />
          </el-form-item>
          <el-form-item>
            <el-button @click="handleClick(3)">下一步</el-button>
            <el-button @click="back(1)">上一步</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="3">
        <el-form>
          <el-form-item label="输入新密码">
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

</template>
<script>
import { question } from '@/api/user'
import { answer } from '@/api/user'
import { newpassword } from '@/api/user'
export default {
  data() {
    return {
      form1: {
        username: 'test'
      },
      form2: {
        login_question: 'test',
        login_aswer: 'test'
      },
      form3: {
        newpassword: 'test'
      },
      activeName: '1',
      name: 1
    }
  },
  methods: {
    async handleClick(i) {
      if (i === 2) {
        const result = await question()
        console.log(result)
        if (result.Status === 200) {
          this.form2.login_question = result.login_problem
          this.activeName = i.toString()
          this.name = i
        } else this.$message.error('获取问题失败！')
      } else if (i === 3) {
        const data = {
          username: this.form1.username,
          answer: this.form2.login_aswer
        }
        const result = await answer(data)
        console.log(result)
        if (result.status === 204) {
          this.activeName = i.toString()
          this.name = i
        } else this.$message.error('回答错误！')
      } else {
        const data = {
          username: this.form1.username,
          password: this.form3.newpassword
        }
        const result = await newpassword(data)
        console.log(result)
        if (result.status === 200) {
          this.$message.success('修改成功！')
          this.$router.push('/login')
        } else this.$message.error('修改失败！')
      }
    },
    back(i) {
      this.activeName = i.toString()
      this.name = i
    }
  }
}
</script>
