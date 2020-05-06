<template>
  <div>
    <!--    <el-button-->
    <!--      type="primary"-->
    <!--      @click="chief"-->
    <!--    >切换到chief</el-button>-->
    <!--    <el-button-->
    <!--      type="primary"-->
    <!--      @click="member"-->
    <!--    >切换到clubMember</el-button>-->
    <!--    <el-button-->
    <!--      type="primary"-->
    <!--      @click="student"-->
    <!--    >切换到student</el-button>-->
    <!--    <el-button-->
    <!--      type="primary"-->
    <!--      @click="admin"-->
    <!--    >切换到admin</el-button>-->
    <!-- 社团风采走马灯 -->
    <div class="carousel">
      <el-carousel
        :interval="3000"
        arrow="always"
      >
        <el-carousel-item
          v-for="item in carouselImgList"
          :key="item"
        >
          <img
            :src="item"
            alt="item"
          >
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 推荐社团 -->

    <div class="recommend">
      <el-row>
        <el-col>
          <el-divider />
          <h3 style="text-align:center;">推荐社团</h3>
          <el-divider />
          <div
            v-for="(item, i) in recommendedList"
            :key="i"
            class="card"
          >
            <div class="image">
              <img :src="item.avatarUrl">
            </div>
            <div class="content">
              <div class="title">
                {{ item.name }}
              </div>
              <div class="sub-title">
                社长：{{ item.chiefName }}
              </div>
              <div class="bottom">
                <button @click="getClubDetail(item.id)">查看详情</button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="社团详情"
      :visible.sync="bulletinDetailDialogVisible"
      width="70%"
      center
      modal
    >
      <h2 style="text-align:center;margin-bottom:50px">{{ clubDetail.name }}</h2>
      <h4>社长：{{ clubDetail.chiefName }}</h4>
      <h4>成员数：{{ clubDetail.memberCount }}</h4>
      <h4>qq群：{{ clubDetail.qqGroup }}</h4>
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
import clubImg1 from '@/assets/images/club1.jpg'
import clubImg2 from '@/assets/images/club2.jpeg'
import clubImg3 from '@/assets/images/club3.jpeg'
export default {
  data() {
    return {
      queryInfo: {
        page: 1,
        limit: 5,
        sort: 'update_at',
        order: 'desc'
      },
      carouselImgList: [
        clubImg1,
        clubImg2,
        clubImg3
      ],
      // 公告列表
      recommendedList: [],
      clubDetail: {},
      bulletinDetailDialogVisible: false
    }
  },
  created() {
    const clubid = 112
    localStorage.setItem('clubid', clubid)
    this.getRecommendedList()
    console.log(this.$store.getters)
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
    member: function () {
      this.$store.dispatch('user/changeRoles', 'member')
    },
    getRecommendedList() {
      recommended(this.queryInfo).then(response => {
        console.log('@home-page RecommendedList response:')
        console.log(response)
        this.recommendedList = response.data.items
        // console.log(this.memberInfo)
      })
    },
    // 获取社团详情
    getClubDetail(id) {
      console.log('@home-page getClubDetail id:' + id)
      getClubDetail(id).then(response => {
        console.log(response)
        // this.$message.success('获取成员列表成功')
        this.clubDetail = response.data
        this.bulletinDetailDialogVisible = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  margin: 20px auto;
  padding: 20px;
  width: 40%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 400px;
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
html,
body {
  height: 100%;
}
body {
  /* display: grid; */
  place-items: center;
  background: #f2f2f2;
}
.cards {
  display: inline;
  margin: 0 auto;
}
.card {
  margin: 0px;
  padding: 5px;
  float: left;
  position: relative;
  height: 340px;
  width: 33%;
  background: white;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
  transition: 0.4s linear;
}
.card:hover {
  box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
}
.card .image {
  background: black;
  height: 85%;
  overflow: hidden;
}
.image img {
  height: 100%;
  width: 100%;
  transform: 0.3s;
}
.card:hover .image img {
  opacity: 0.6;
  transform: scale(1.1);
}
.card .content {
  position: absolute;
  bottom: 0px;
  background-color: white;
  width: 100%;
  text-align: center;
  padding: 20px 30px;
}
.content .title {
  font-size: 24px;
  font-weight: 600;
  color: #333333;
}
.content .sub-title {
  font-size: 18px;
  font-weight: 500;
  color: #909399;
  margin-bottom: 10px;
}
.bottom span {
  color: #666666;
  word-break: break-all;
  font-size: 16px;
  text-align: justify;
  line-height: 1.8em;
}
.bottom button {
  float: left;
  padding: 7px 15px;
  font-size: 17px;
  background: #409eff;
  color: white;
  font-weight: 500;
  border: none;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.3s ease;
}
.bottom button:hover {
  transform: scale(0.9);
  background: #409eff;
}
.recommend {
  width: 90%;
  margin: 0 auto;
}
</style>
