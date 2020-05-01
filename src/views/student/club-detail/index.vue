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
              <el-input v-model="cid" :disabled="true" />
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
      id: this.$route.query.id,
      name: this.$route.query.name,
      chiefName: this.$route.query.chiefName,
      clubInfo: {}
    }
  },
  created() {
    this.getClubDetail()
  },
  methods: {
    getClubDetail() {
      getClubDetail(this.id).then(response => {
        if (response.status === 200) {
          this.clubInfo = response.data.items
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
