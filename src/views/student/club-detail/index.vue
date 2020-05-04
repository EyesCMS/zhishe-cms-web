<template>
  <div style="text-align:center;">
    <el-card>
      <el-col :span="4">
        <el-avatar shape="circle" :size="180" :src="avatarUrl" />
      </el-col>
    </el-card>
    <el-card>
      <el-row>
        <div>
          <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="社团ID">
              <el-input v-model="id" :disabled="true" />
            </el-form-item>
            <el-form-item label="社团名称">
              <el-input v-model="name" :disabled="true" />
            </el-form-item>
            <el-form-item label="社长名称">
              <el-input v-model="chiefName" :disabled="true" />
            </el-form-item>
            <el-form-item label="社团简介">
              <el-input v-model="clubInfo.slogan" :disabled="true" />
            </el-form-item>
            <el-form-item label="社团类别">
              <el-input v-model="clubInfo.type" :disabled="true" />
            </el-form-item>
            <el-form-item label="社团人数">
              <el-input v-model="clubInfo.memberCount" :disabled="true" />
            </el-form-item>
            <el-form-item label="社团Q群">
              <el-input v-model="clubInfo.qqGroup" :disabled="true" />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="backToClub"
              >确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getClubDetail } from '@/api/club'
export default {
  name: 'ClubDetails',
  data() {
    return {
      id: this.$route.query.id,
      name: this.$route.query.name,
      chiefName: this.$route.query.chiefName,
      avatarUrl: this.$route.query.avatarUrl,
      clubInfo: {
        slogan: '',
        memberCount: '',
        qqGroup: '',
        type: ''
      }
    }
  },
  created() {
    this.getClubDetail()
  },
  methods: {
    getClubDetail() {
      getClubDetail(this.id).then(response => {
        if (response.status === 200) {
          this.clubInfo.slogan = response.data.slogan
          this.clubInfo.memberCount = response.data.memberCount
          this.clubInfo.qqGroup = response.data.slogan
          this.clubInfo.type = response.data.type
          return this.$message.success('获取社团信息成功')
        } else {
          return this.$message.error('获取社团信息失败')
        }
      })
    },
    backToClub() {
      this.$router.replace('/student/index')
    }
  }
}
</script>
