<template>
  <div>
    <el-button
      type="primary"
      @click="chief"
    >切换到chief</el-button>
    <el-button
      type="primary"
      @click="menber"
    >切换到clunMenber</el-button>
    <el-button
      type="primary"
      @click="student"
    >切换到student</el-button>
    <el-button
      type="primary"
      @click="admin"
    >切换到admin</el-button>
    <!-- 社团风采走马灯 -->
    <el-carousel
      :interval="5000"
      arrow="always"
    >
      <el-carousel-item
        v-for="item in 4"
        :key="item"
      >
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐社团 -->
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-divider />
          <h3 style="text-align:center;">推荐社团</h3>
          <el-divider />
          <div
            v-for="(item, i) in recommendedList"
            :key="i"
            class="bulletin"
          >
            <el-tag>{{ i + 1 }}</el-tag>
            <el-image
              style="width: 50px; height: 50px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              fit="fill"
            />
            <p style="display:inline;">{{ item.name }}</p>
            <el-link
              type="primary"
              @click="getClubDetail(i+1)"
            >详情</el-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="公告"
      :visible.sync="bulletinDetailDialogVisible"
      width="70%"
      center
      modal
    >
      <h2 style="text-align:center;margin-bottom:50px">{{ clubDetail.name }}</h2>
      <h4>社长：{{ clubDetail.chief_name }}</h4>
      <h4>成员数：{{ clubDetail.member_count }}</h4>
      <h4>qq群：{{ clubDetail.qq_group }}</h4>
      <h4>简介：{{ clubDetail.slogan }}</h4>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="bulletinDetailDialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { recommended, getClubDetail } from '@/api/club'
export default {
  data() {
    return {
      queryInfo: {
        page: 1,
        limit: 5,
        sort: 'update_at',
        order: 'desc'
      },
      // 公告列表
      recommendedList: [],
      clubDetail: {},
      bulletinDetailDialogVisible: false
    }
  },
  created() {
    const clubid = 112
    localStorage.setItem('clubid', clubid)
    this.getrRecommendedList()
  },
  methods: {
    chief: function () {
      this.$store.dispatch('user/changeRoles', 'chief')
    },
    admin: function () {
      this.$store.dispatch('user/changeRoles', 'admin')
    },
    student: function () {
      this.$store.dispatch('user/changeRoles', 'student')
    },
    menber: function () {
      this.$store.dispatch('user/changeRoles', 'menber')
    },
    getrRecommendedList() {
      recommended(this.queryInfo).then(response => {
        console.log(response)
        this.recommendedList = response.data.pageList
        // console.log(this.memberInfo)
      })
    },
    // 获取社团详情
    getClubDetail(id) {
      getClubDetail(id).then(response => {
        console.log(response)
        if (response.status === 200) {
          // this.$message.success('获取成员列表成功')
          this.clubDetail = response.data.items
          console.log(this.clubDetail)
          this.bulletinDetailDialogVisible = true
        } else {
          return this.$message.error('获取社团详情失败')
        }
        // console.log(this.memberInfo)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-link {
  float: right;
}

.bulletin {
  margin-bottom: 5px;
  align-content: center;
}
.content {
  margin: 0 auto;
  width: 70%;
}
</style>
