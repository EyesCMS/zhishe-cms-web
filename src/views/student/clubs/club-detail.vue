<template>
  <div>
    <p
      style="color:blue;margin:3px"
      @click="back"
    >返回</p>
    <el-card>
      <!-- 社团风采走马灯 -->
      <div class="carousel">
        <el-carousel
          :interval="4000"
          arrow="always"
          type="card"
        >
          <el-carousel-item
            v-for="item in carouselImgList"
            :key="item"
          >
            <img
              style="width:100%"
              :src="item"
              alt="item"
            >
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-row :gutter="25">
        <el-col :span="6">
          <el-card style="margin-top:20px">
            <!-- 社团等级显示 -->
            <el-row>
              <el-col :span="6">
                <el-avatar
                  :size="50"
                  :src="clubDetail.avatarUrl"
                />
                <el-tag>LV{{ clubInfo.grade }}</el-tag>
              </el-col>
              <el-col :span="14">
                <div>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    placement="top-start"
                  >
                    <div slot="content">多行信息<br>第二行信息</div>
                    <el-link type="primary">积分规则</el-link>
                  </el-tooltip>
                  <p />
                  <div class="progress-item">
                    <span>积分：{{ clubInfo.score }}</span>
                    <el-progress :percentage="clubInfo.percentage" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <!-- 社团详情简介 -->
            <el-card style="margin-top:20px">
              <h4>社团名称：{{ clubDetail.name }}</h4>
              <h4>社长：{{ clubDetail.chiefName }}</h4>
              <h4>成员数：{{ clubDetail.memberCount }}</h4>
              <h4>QQ群：{{ clubDetail.qqGroup }}</h4>
              <h4>简介：{{ clubDetail.slogan }}</h4>
            </el-card>
            <p style="color:#9E9E9E;font-family:'微软雅黑';font-size:14px">
              如果你感兴趣的话就
              <el-link
                type="primary"
                @click="ApplyToJoin()"
              >加入我们</el-link> 吧！
            </p>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card style="margin: 15px 15px">
            <h4>共搜索到 {{ total }} 条帖子</h4>
            <p
              v-show="total === 0"
              style="text-align: center"
            >暂无帖子</p>
            <el-card
              v-for="(item, index) in invitationList"
              :key="index"
              style="margin:20px 100px"
            >
              <el-row>
                <el-avatar
                  style="float:left"
                  :src="item.avatarUrl"
                />
                <p style="float: left">{{ item.posterName }}</p>
              </el-row>
              <div>
                <h2 style="text-align:center;font-size: 25px">{{ item.title }}</h2>
                <p style="font-size:15px;text-align:center">
                  <i class="el-icon-date" />
                  {{ item.createAt }}
                </p>
                <el-divider />
              </div>
              <el-row>
                <div style="margin-left:20px">
                  <el-image
                    :src="item.imgUrl"
                    lazy
                    style="height:200px;width:300px;float:left;"
                  />
                  <div style="margin-right:20px">
                    <p style="float:none; text-indent: 2em; font-size: 20px;text-align:justify">{{ item.content | interceptAbstract }}</p>
                  </div>
                </div>
              </el-row>
              <div style="text-align:center;margin-top:20px">
                <el-button
                  type="primary"
                  @click="pushToActivityDetail(item.id)"
                >查看详情</el-button>
              </div>
            </el-card>

            <!-- 分页区域 -->
            <el-pagination
              :current-page="queryInfo.page"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="queryInfo.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              style="margin: 25px 15px;text-align:center"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { listClubImgs } from '@/api/club'
import { getInvitationList } from '@/api/forum'
import { getClubDetail } from '@/api/club'
import { getClubScore } from '@/api/club'
import clubImg1 from '@/assets/images/club1.jpg'
import clubImg2 from '@/assets/images/club2.jpeg'
import clubImg3 from '@/assets/images/club3.jpeg'
export default {
  name: 'MemClubStyle',
  filters: {
    interceptAbstract(content) {
      if (content.length > 400) {
        return content.substr(0, 400) + '......'
      }
      return content
    }
  },
  data() {
    return {
      // 暂时死数据
      clubInfo: {
        percentage: 40,
        score: 8,
        grade: 1
      },
      clubId: 5000,
      queryInfo: {
        type: 1,
        page: 1,
        limit: 10,
        sort: 'updateAt',
        order: 'desc'
      },
      // 走马灯图片
      carouselImgList: [
        clubImg1,
        clubImg2,
        clubImg3
      ],
      // 帖子列表
      invitationList: [],
      total: 0,
      // 社团详情
      clubDetail: {},
      id: this.$store.getters.id
    }
  },
  created() {
    if (this.$route.query.id !== undefined) {
      this.clubId = this.$route.query.id
      sessionStorage.setItem('clubId', this.clubId)
    } else {
      this.clubId = sessionStorage.getItem('clubId')
    }
    this.$forceUpdate()
    this.getClubImgs()
    this.getInvitationsList()
    this.getClubDetail()
    this.getClubScore()
  },
  methods: {
    getClubImgs() {
      listClubImgs(this.clubId).then(response => {
        this.carouselImgList = response.data
      })
    },
    getInvitationsList() {
      getInvitationList(this.clubId, this.queryInfo).then(response => {
        this.invitationList = response.data.items
        this.total = response.data.totalCount
      })
    },

    // 获取社团详情
    getClubDetail() {
      getClubDetail(this.clubId).then(response => {
        this.clubDetail = response.data
      })
    },
    pushToActivityDetail(id) {
      this.$router.push({ path: '/forum/activityDetail', query: { id: id }})
    },
    getClubScore() {
      getClubScore(this.$route.query.id).then(response => {
        if (response.status === 200) {
          console.log(response)
          this.clubInfo = response.data
        } else {
          return this.$message.error('获取社团积分信息失败')
        }
      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getInvitationsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getInvitationsList()
    },
    ApplyToJoin() {
      this.$router.push({
        path: '/joinClub',
        query: { id: this.id, name: this.clubDetail.name }
      })
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.carousel {
  margin: 20px auto;
  padding: 20px;
  width: 90%;
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
</style>
