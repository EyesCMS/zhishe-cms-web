<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="4">
          <el-image style="width: 150px; height: 200px" />
        </el-col>
        <div>
          <h3>{{ clubInfo.name }}</h3>
          <h4>社长：{{ clubInfo.chief_name }}</h4>
          <h4>简介：{{ clubInfo.slogan }}</h4>
          <h4>社团人数：{{ clubInfo.member_count }}</h4>
          <h4>社团Q群：{{ clubInfo.qq_group }}</h4>
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
      clubId: 0,
      clubInfo: {}
    }
  },
  created() {
    this.getClubDetail()
    this.clubId = localStorage.getItem('clubid')
  },
  methods: {
    getClubDetail() {
      this.userId = this.$route.query.userid
      console.log(this.userId)
      getClubDetail(this.clubId).then(response => {
        this.clubInfo = response.items
        console.log(response.data)
        console.log(this.clubInfo)
      })
    }
  }
}
</script>

