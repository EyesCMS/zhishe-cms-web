<template>
  <div>
    <div style="display:inline-block;margin:30px;vertical-align: top;">
      <el-image style="width: 350px; height: 350px;" :src="avatarUrl" />
    </div>
    <div style="width:650px;display:inline-block;vertical-align: top;">
      <el-card style="margin: 30px 15px 30px 30px">
        <h2 style="font-family:'微软雅黑';font-size:32px;font-weight:lighter;">
          <!--<el-avatar shape="circle" :size="60" :src="avatarUrl" />-->
          {{ name }}资料
        </h2>
        <p style="color:#9E9E9E;font-family:'微软雅黑';font-size:14px">
          如果你感兴趣的话就
          <el-link type="primary" @click="ApplyToJoin()">加入我们</el-link> 吧！
        </p>
        <div>
          <el-form ref="form" :model="form" label-position="left" label-width="300px">
            <el-form-item label="社团ID">{{ id }}</el-form-item>
            <el-divider />
            <el-form-item label="社长名称">{{ chiefName }}</el-form-item>
            <el-divider />
            <el-form-item label="社团简介">{{ clubInfo.slogan }}</el-form-item>
            <el-divider />
            <el-form-item label="社团类别">{{ clubInfo.type }}</el-form-item>
            <el-divider />
            <el-form-item label="社团人数">{{ clubInfo.memberCount }}</el-form-item>
            <el-divider />
            <el-form-item label="社团Q群">{{ clubInfo.qqGroup }}</el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div style="text-align:center">
      <el-button type="primary" @click="backToClub">确定</el-button>
    </div>
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
    },
    ApplyToJoin() {
      this.$router.push({
        path: '/joinClub',
        query: { id: this.id, name: this.name }
      })
    }
  }
}
</script>
