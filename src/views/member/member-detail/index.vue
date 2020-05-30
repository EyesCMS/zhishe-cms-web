<template>
  <div>
    <!-- 卡片视图区域1 -->
    <el-card>
      <div style="float: left;">
        <el-image
          style="width: 100px; height: 100px;"
          :src="memberInfo.avatarUrl"
        />
      </div>
      <div style="float: left; margin-left: 10px;">
        <h3>{{ memberInfo.nickname }}</h3>
        <h4>{{ memberInfo.username }}</h4>
        <h4>{{ memberInfo.slogan }}</h4>
        <h4>职位：{{ memberInfo.role }}</h4>
      </div>
    </el-card>

    <!-- 卡片视图区域2 -->
    <el-card>
      <h3 style="color: #27408B;">基本信息</h3>
      <h4><i class="el-icon-menu" />所在专业：{{ memberInfo.major }}</h4>
      <h4><i class="el-icon-phone" />联系方式：{{ memberInfo.phone }}</h4>
      <h4><i class="el-icon-s-promotion" />电子邮箱：{{ memberInfo.email }}</h4>
      <h4><i class="el-icon-school" />宿舍地址：{{ memberInfo.address }}</h4>
    </el-card>

    <!-- 卡片视图区域3 -->
    <el-card>
      <h3 style="color: #27408B;">活跃度</h3>
      <h4><i class="el-icon-menu" />头衔：{{ memberInfo.honor }}</h4>
      <h4><i class="el-icon-phone" />积分：{{ memberInfo.credit }}</h4>
    </el-card>
  </div>
</template>

<script>
import { getMemberDetail } from '@/api/club'
export default {
  name: 'MemberDetail',
  data() {
    return {
      clubId: sessionStorage.getItem('clubId'),
      userId: this.$route.query.userId,
      memberInfo: {}
    }
  },
  created() {
    this.getMemberDetailsData()
  },
  methods: {
    getMemberDetailsData() {
      getMemberDetail(this.clubId, this.userId).then(response => {
        this.memberInfo = response.data
        // console.log(this.memberInfo)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  margin: 20px 200px;
}
</style>
