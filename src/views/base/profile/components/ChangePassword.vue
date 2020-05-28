<template>
  <el-form ref="form" :model="form" :rules="formRules">
    <el-form-item label="用户名">
      <el-input v-model.trim="form.username" :disabled="true" />
    </el-form-item>
    <el-form-item label="旧密码">
      <el-input v-model.trim="form.oldPassword" show-password />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model.trim="form.newPassword" show-password />
    </el-form-item>
    <div style="text-align:center">
      <el-form-item>
        <el-button
          type="primary"
          @click="updatePassword"
        >修改</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { updatePassword } from '@/api/user'
export default {
  data() {
    return {
      form: {
        username: this.$store.getters.name,
        oldPassword: '',
        newPassword: ''
      },
      formRules: {
        newPassword: [
          { min: 6, max: 20, message: '请输入6~20位的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    updatePassword() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        updatePassword(this.form).then(response => {
          if (response.status === 204) {
            this.$message.success('修改成功')
          } else {
            this.$message.erroe('修改失败')
          }
        })
      })
    }
  }
}
</script>
