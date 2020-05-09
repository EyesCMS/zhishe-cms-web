<template>
  <el-form label-width="200px">
    <el-form-item label="社团名称">
      <el-input
        v-model.trim="clubinfo.name"
        :readonly="true"
      />
    </el-form-item>
    <el-form-item label="社长名字">
      <el-input
        v-model.trim="clubinfo.chiefName"
        :readonly="true"
      />
    </el-form-item>
    <el-form-item label="社团类型">
      <el-input v-model.trim="clubinfo.type" />
    </el-form-item>
    <el-form-item label="成员数">
      <el-input
        v-model.trim="clubinfo.memberCount"
        :readonly="true"
      />
    </el-form-item>
    <el-form-item label="QQ 群">
      <el-input v-model.trim="clubinfo.qqGroup" />
    </el-form-item>
    <el-form-item label="社团介绍">
      <el-input v-model.trim="clubinfo.slogan" />
    </el-form-item>
    <div style="text-align:center">
      <el-button
        type="primary"
        @click="submitProfile"
      >修改</el-button>
    </div>
  </el-form>
</template>

<script>
import { changeClubInfo } from '@/api/club'
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
          memberCount: '',
          type: ''
        }
      }
    }
  },
  methods: {
    submitProfile() {
      const input = {
        slogan: this.clubinfo.slogan,
        qqGroup: this.clubinfo.qqGroup,
        type: this.clubinfo.type
      }
      console.log(input)
      changeClubInfo(window.sessionStorage.getItem('clubId'), input).then(response => {
        console.log('@changeClubInof response')
        console.log(response)
        if (response.status === 204) {
          this.$message.success('修改成功')
        }
      })
    }
  }
}
</script>
