<template>
  <el-form>
    <el-form-item label="姓名">
      <el-input v-model.trim="user.nickname" />
    </el-form-item>
    <el-form-item label="专业">
      <el-input v-model.trim="user.major" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item label="个性签名">
      <el-input v-model.trim="user.slogan" />
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input v-model.trim="user.phone" />
    </el-form-item>
    <div style="text-align:center">
      <el-form-item>
        <el-button
          type="primary"
          @click="submitProfile"
        >修改</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { submitProfile } from '@/api/user'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          nickname: '',
          major: '',
          email: '',
          slogan: '',
          phone: ''
        }
      }
    }
  },
  methods: {
    submitProfile(nickname, major, email, slogan, phone, avatar) {
      const input = {
        nickname: nickname,
        major: major,
        email: email,
        slogan: slogan,
        phone: phone,
        avatar: this.$store.getters.avatar
      }
      submitProfile(input).then(response => {
        if (response.status === 204) {
          this.$message.success('修改成功')
        }
      })
    }
  }
}
</script>
