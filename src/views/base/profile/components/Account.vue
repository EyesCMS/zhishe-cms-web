<template>
  <el-form>
    <el-form-item label="昵称">
      <el-input v-model.trim="form.nickname" />
    </el-form-item>
    <el-form-item label="专业">
      <el-input v-model.trim="form.major" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="form.email" />
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model.trim="form.address" />
    </el-form-item>
    <el-form-item label="个性签名">
      <el-input v-model.trim="form.slogan" />
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input v-model.trim="form.phone" />
    </el-form-item>
    <div style="text-align: center;">
      <el-form-item>
        <el-button type="primary" @click="submitProfile">修改</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { submitProfile } from '@/api/user'
import { getInfo } from '@/api/user'
export default {
  data() {
    return {
      form: {
        nickname: '',
        email: '',
        address: '',
        major: '',
        phone: '',
        slogan: ''
      }
    }
  },
  created() {
    this.getInfoData()
  },
  methods: {
    submitProfile() {
      submitProfile(this.form).then(response => {
        if (response.status === 204) {
          this.$message.success('修改成功')
          this.getInfoData()
        }
      })
    },
    getInfoData() {
      getInfo().then(response => {
        this.form.nickname = response.data.nickname
        this.form.email = response.data.email
        this.form.address = response.data.address
        this.form.major = response.data.major
        this.form.phone = response.data.phone
        this.form.slogan = response.data.slogan
      })
    }
  }
}
</script>
