<template>
  <el-form>
    <el-form-item label="社团名称">
      <el-input v-model.trim="clubinfo.name" />
    </el-form-item>
    <el-form-item label="社长名字">
      <el-input v-model.trim="clubinfo.chiefName" />
    </el-form-item>
    <el-form-item label="成员数">
      <el-input v-model.trim="clubinfo.memberCount" />
    </el-form-item>
    <el-form-item label="QQ 群">
      <el-input v-model.trim="clubinfo.qqGroup" />
    </el-form-item>
    <el-form-item label="社团介绍">
      <el-input v-model.trim="clubinfo.slogan" />
    </el-form-item>
    <div style="text-align:center">
      <el-form-item>
        <el-button type="primary">修改</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  props: {
    clubinfo: {
      type: Object,
      default: () => {
        return {
          name: '',
          chiefName: '',
          qqGroup: '',
          slogan: '',
          memberCount: ''
        }
      }
    }
  }
  // methods: {
  //   submitProfile(nickname, major, email, slogan, phone, avatar) {
  //     const input = {
  //       nickname: nickname,
  //       major: major,
  //       email: email,
  //       slogan: slogan,
  //       phone: phone,
  //       avatar: this.$store.getters.avatar
  //     }
  //     submitProfile(input).then(response => {
  //       if (response.status === 204) {
  //         this.$message.success('修改成功')
  //       }
  //     })
  //   }
  // }
}
</script>
