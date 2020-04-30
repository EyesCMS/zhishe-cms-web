<template>
  <div>
    <el-card>
      <el-col :span="4">
        <el-avatar shape="square" :size="180" :src="clubInfo.avatarUrl" />
      </el-col>
    </el-card>
    <el-card>
      <el-row>
        <div>
          <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="社团ID">
              <el-input v-model="clubInfo.id" :disabled="true" />
            </el-form-item>
            <el-form-item label="社团名称">
              <el-input v-model="clubInfo.name" :disabled="true" />
            </el-form-item>
            <el-form-item label="社长名称">
              <el-input v-model="clubInfo.chiefName" :disabled="true" />
            </el-form-item>
            <el-form-item label="社团简介">
              <el-input v-model="clubInfo.slogan" :disabled="true" />
            </el-form-item>
            <el-form-item label="社团人数">
              <el-input v-model="clubInfo.memberCount" :disabled="true" />
            </el-form-item>
            <el-form-item label="社团Q群">
              <el-input v-model="clubInfo.qqGroup" :disabled="true" />
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
      clubInfo: {}
    }
  },
  created() {
    this.getClubDetail()
    this.clubId = this.$route.query.cid
  },
  methods: {
    getClubDetail() {
      getClubDetail(this.clubId).then(response => {
        if (response.status === 200) {
          this.clubInfo = response.items
          console.log(response.data)
          return this.$message.success('获取社团信息成功')
        } else {
          return this.$message.error('获取社团信息失败')
        }
      })
    }
  }
}
</script>
