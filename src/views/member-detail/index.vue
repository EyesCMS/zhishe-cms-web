<template>
  <div>
    <!-- 卡片视图区域1 -->
    <el-card>
      <el-row>
        <el-col :span="3">
          <el-image
            style="width: 100px; height: 100px"
          />
        </el-col>
        <h3>{{ memberInfo.nickname }}</h3>
        <h4>{{ memberInfo.slogan }}</h4>
        <h4>职位：{{ memberInfo.position }}</h4>
      </el-row>
    </el-card>

    <!-- 卡片视图区域2 -->
    <el-card>
      <el-row>
        <el-col :span="24" style="background-color:black"><h3 style="color:silver;margin-left:20px">基本信息</h3></el-col>
      </el-row>
      <h4><i class="el-icon-menu" />所在专业：{{ memberInfo.major }}</h4>
      <h4><i class="el-icon-phone" />联系方式：{{ memberInfo.phone }}</h4>
      <h4><i class="el-icon-s-promotion" />电子邮箱：{{ memberInfo.email }}</h4>
      <h4><i class="el-icon-school" />宿舍地址：{{ memberInfo.address }}</h4>
    </el-card>

    <!-- 卡片视图区域3 -->
    <el-card>
      <el-row>
        <el-col :span="24" style="background-color:black"><h3 style="color:silver;margin-left:20px">活跃度</h3></el-col>
      </el-row>
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
      clubId: 1,
      userId: 1,
      memberInfo: {}
    }
  },
  created() {
    this.getMemberDetails()
    // this.clubId = localStorage.getItem('clubid')
  },
  methods: {
    getMemberDetails() {
      // this.userId = this.$route.query.userid
      console.log('UserId' + this.userId)
      // console.log(this.userId)
      getMemberDetail(this.clubId, this.userId).then(response => {
        this.memberInfo = response.items
        console.log(this.memberInfo)
        console.log(this.memberInfo)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
</style>
