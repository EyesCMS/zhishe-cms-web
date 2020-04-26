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
        <el-button type="primary" @click="submit">修改</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          major: '',
          email: '',
          slogan: '',
          phone: ''
        }
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: '修改成功',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
