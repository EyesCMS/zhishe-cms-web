<template>
  <div>
    <el-card>
      <!-- 社团风采走马灯 -->
      <div class="carousel">
        <el-carousel :interval="4000" arrow="always" type="card">
          <el-carousel-item v-for="item in carouselImgList" :key="item">
            <img style="width:100%" :src="item" alt="item">
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-row :gutter="25">
        <el-col :span="8">
          <el-card style="margin-top:30px">
            <div style="display:flex;justify-content: space-between">
              <h3>公告列表</h3>
              <el-button
                plain
                size="mini"
                style="height:30px;position:relative;top:10px"
                @click="pushToBulletins()"
              >
                更多
                <i class="el-icon-arrow-right" />
              </el-button>
            </div>
            <div v-for="(item, i) in bulletinsList" id="bulletin" :key="i">
              <div style="display:flex;justify-content: space-between">
                <div>
                  <el-tag v-if="i <= 2" type="danger">{{ i + 1 }}</el-tag>
                  <el-tag v-else type="info">{{ i + 1 }}</el-tag>
                  <el-link
                    style="display:inline;"
                    @click="openBulletinDetailDiaglog(item.id)"
                  >{{ item.title }}</el-link>
                </div>
                <p style="font-size:10px">{{ item.createAt }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="margin-top:30px">
            <div style="display:flex;justify-content: space-between">
              <h3>帖子列表</h3>
              <el-button
                plain
                size="mini"
                style="height:30px;position:relative;top:10px"
                @click="pushToActivities()"
              >
                更多
                <i class="el-icon-arrow-right" />
              </el-button>
            </div>
            <div v-for="(item, i) in invitationList" id="bulletin" :key="i">
              <div style="display:flex;justify-content: space-between">
                <div>
                  <el-tag v-if="i <= 2" type="warning">{{ i + 1 }}</el-tag>
                  <el-tag v-else type="info">{{ i + 1 }}</el-tag>
                  <el-link
                    style="display:inline;"
                    @click="pushToActivityDetail(item.id)"
                  >{{ item.title | interceptAbstract }}</el-link>
                </div>
                <p style="font-size:10px">{{ item.createAt }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="margin-top:30px">
            <el-row>
              <el-col :span="6">
                <el-avatar :size="50" :src="avatar" />
                <el-tag>{{ userInfo.grade }}</el-tag>
              </el-col>
              <el-col :span="14">
                <div>
                  <el-link type="primary" @click="getUserScoreDetail()">积分规则</el-link>
                  <p />
                  <div class="progress-item">
                    <span>积分：{{ userInfo.score }}</span>
                    <el-progress :percentage="userInfo.percentage" />
                  </div>
                  <!--
                  <div class="progress-item">
                    <span>另一个测试样式</span>
                    <el-progress :percentage="100" status="success" />
                  </div>-->
                </div>
                <p />
                <el-button v-if="SignInShow" style="width:80px" type="primary" @click="signIn()">签到</el-button>
                <el-button v-else style="width:80px" type="primary" disabled>已签到</el-button>
              </el-col>
            </el-row>
          </el-card>
          <el-card style="margin-top:20px">
            <el-row>
              <el-col :span="6">
                <el-avatar :size="50" :src="clubDetail.avatarUrl" />
                <el-tag>LV{{ clubInfo.grade }}</el-tag>
              </el-col>
              <el-col :span="14">
                <div>
                  <el-link type="primary" @click="getClubScoreDetail()">积分规则</el-link>
                  <p />
                  <div class="progress-item">
                    <span>积分：{{ clubInfo.score }}</span>
                    <el-progress :percentage="clubInfo.percentage" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-card style="margin-top:20px">
              <el-divider>
                <p style="font-family:'微软雅黑',sans-serif;font-size:22px;font-weight:lighter;">
                  {{ clubDetail.name }}
                  <i v-if="isMember()" class="el-icon-user" />
                  <i v-else class="el-icon-edit" style="cursor:pointer" @click="edit()" />
                </p>
              </el-divider>
              <h4>社 长：{{ clubDetail.chiefName }}</h4>
              <el-divider />
              <h4>成员数：{{ clubDetail.memberCount }}</h4>
              <el-divider />
              <h4>QQ 群：{{ clubDetail.qqGroup }}</h4>
              <el-divider />
              <h4>简 介：{{ clubDetail.slogan }}</h4>
            </el-card>
          </el-card>
          <el-button
            v-show="isMember()"
            style="display:block;margin:15px auto"
            type="info"
            @click="quitClubDialog()"
          >退出社团</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 成员积分规则-->
    <el-dialog :visible.sync="userScoreShow" width="50%" center modal>
      <h2
        style="text-align:center;margin-bottom:30px;font-family:'微软雅黑',sans-serif;font-size:28px;font-weight:lighter;"
      >成员积分规则</h2>
      <el-card style="margin: 20px 15px 20px 20px;">
        <div>
          <el-table v-loading="listLoading" :data="UserScoreDetailList" stripe border>
            <el-table-column label="等级" prop="name" />
            <el-table-column label="积分下限" prop="lowerLimit" />
            <el-table-column label="积分上限" prop="upperLimit" />
          </el-table>
        </div>
      </el-card>
      <div style="text-align:center">
        <el-button type="primary" @click="userScoreShow = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 社团积分规则-->
    <el-dialog :visible.sync="clubScoreShow" width="50%" center modal>
      <h2
        style="text-align:center;margin-bottom:30px;font-family:'微软雅黑',sans-serif;font-size:28px;font-weight:lighter;"
      >社团积分规则</h2>
      <el-card style="margin: 20px 15px 20px 20px;">
        <div>
          <el-table v-loading="listLoading" :data="ClubScoreDetailList" stripe border>
            <el-table-column label="等级" prop="name" />
            <el-table-column label="积分下限" prop="lowerLimit" />
            <el-table-column label="积分上限" prop="upperLimit" />
          </el-table>
        </div>
      </el-card>
      <div style="text-align:center">
        <el-button type="primary" @click="clubScoreShow = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 公告详情对话框 -->
    <el-dialog title="公告" :visible.sync="bulletinDetailDialogVisible" width="70%" center modal>
      <h2 style="text-align:center;margin-bottom:50px">{{ bulletin.title }}</h2>
      <p>{{ bulletin.body }}</p>
      <p>发布时间:{{ bulletin.createAt }}</p>
      <p>上次修改:{{ bulletin.updateAt }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bulletinDetailDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 退社申请对话框 -->
    <el-dialog
      title="退社申请"
      :visible.sync="quitClubDialogVisible"
      width="30%"
      center
      modal
      @closed="quitClubDialogClosed"
    >
      <el-form>
        <el-form-item label="退社理由">
          <el-input v-model="quitReason" style="width: 400px;margin-top:30px" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="quitClubConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listBulletins } from '@/api/club'
import { listClubImgs } from '@/api/club'
import { getBulletinDetail } from '@/api/club'
import { getInvitationList } from '@/api/forum'
import { getClubDetail } from '@/api/club'
import { getSignInInfo } from '@/api/club'
import {
  getUserScore,
  getClubScore,
  getUserScoreDetail,
  getClubScoreDetail
} from '@/api/club'
import { signIn } from '@/api/club'
import { quitClub } from '@/api/club'
import clubImg1 from '@/assets/images/club1.jpg'
import clubImg2 from '@/assets/images/club2.jpeg'
import clubImg3 from '@/assets/images/club3.jpeg'
export default {
  name: 'MemClubStyle',
  filters: {
    interceptAbstract(content) {
      if (content.length > 15) {
        return content.substr(0, 15) + '......'
      }
      return content
    }
  },
  data() {
    return {
      // 暂时死数据
      userInfo: {
        percentage: 30,
        score: 6,
        grade: '冒泡'
      },
      clubInfo: {
        percentage: 40,
        score: 8,
        grade: 1
      },
      UserScoreDetailList: [],
      ClubScoreDetailList: [],
      userScoreShow: false,
      clubScoreShow: false,
      SignInShow: true,
      avatar: this.$store.getters.avatar,
      userId: this.$store.getters.userId,
      clubId: 5000,
      queryInfo: {
        type: 1,
        page: 1,
        limit: 10,
        sort: 'updateAt',
        order: 'desc'
      },
      // 走马灯图片
      carouselImgList: [clubImg1, clubImg2, clubImg3],
      // 公告列表
      bulletinsList: [],
      // 帖子列表
      invitationList: [],
      bulletin: {},
      // 社团详情
      clubDetail: {},
      bulletinDetailDialogVisible: false,
      quitClubDialogVisible: false,
      quitReason: ''
    }
  },
  created() {
    if (this.$route.query.id !== undefined) {
      this.clubId = this.$route.query.id
      sessionStorage.setItem('clubId', this.clubId)
    } else {
      this.clubId = sessionStorage.getItem('clubId')
    }
    // this.clubId = this.$route.query.cid
    this.getClubImgs()
    this.getBulletinsList()
    this.getInvitationsList()
    this.getClubDetail()
    this.getSignInInfo()
    this.getUserScore()
    this.getClubScore()
  },
  methods: {
    async getClubImgs() {
      await listClubImgs(this.clubId).then(response => {
        this.carouselImgList = response.data
      })
      this.solveImgs(this.carouselImgList)
    },
    getBulletinsList() {
      listBulletins(this.clubId, this.queryInfo).then(response => {
        this.bulletinsList = response.data.items
      })
    },
    getInvitationsList() {
      getInvitationList(this.clubId, this.queryInfo).then(response => {
        this.invitationList = response.data.items
      })
    },

    // 获取社团详情
    getClubDetail() {
      getClubDetail(this.clubId).then(response => {
        this.clubDetail = response.data
      })
    },
    // 弹出公告详情对话框
    openBulletinDetailDiaglog(id) {
      // 发起查询公告详情请求
      getBulletinDetail(this.clubId, id).then(response => {
        this.bulletin = response.data
      })
      this.bulletinDetailDialogVisible = true
    },

    // 退社申请对话框
    quitClubDialog() {
      this.quitClubDialogVisible = true
    },

    // 退出社团
    async quitClubConfirm() {
      const param = {
        clubId: this.clubId,
        reason: this.quitReason
      }
      await quitClub(param).then(response => {
        if (response.status === 201) {
          this.$message.success('退出社团成功')
        } else {
          return this.$message.error('退出社团失败')
        }
      })
      this.quitClubDialogVisible = false
      // 跳转到其他页面
      this.$router.push({ path: '/home' })
    },
    pushToActivityDetail(id) {
      this.$router.push({ path: '/activityforum/detail', query: { id: id }})
    },
    pushToBulletins() {
      this.$router.push('/announcement/index')
    },
    pushToActivities() {
      this.$router.push('/activityforum/index')
    },
    isMember() {
      return sessionStorage.getItem('roles') === 'member'
    },
    quitClubDialogClosed() {
      this.quitReason = ''
    },
    edit() {
      this.$router.replace('/Detailmanage/Detail')
    },
    signIn() {
      // this.SignInShow = false
      signIn(this.clubId).then(response => {
        if (response.status === 201) {
          this.SignInShow = false
          this.getUserScore()
          return this.$message.success('签到成功')
        } else {
          return this.$message.error('签到失败')
        }
      })
    },
    getSignInInfo() {
      getSignInInfo(this.clubId).then(response => {
        if (response.status === 200) {
          if (response.data.state === 1) {
            this.SignInShow = true
          } else {
            this.SignInShow = false
          }
        } else {
          return this.$message.error('获取签到信息失败')
        }
      })
    },
    getUserScore() {
      getUserScore(this.clubId).then(response => {
        if (response.status === 200) {
          this.userInfo = response.data
        } else {
          return this.$message.error('获取用户积分信息失败')
        }
      })
    },
    getClubScore() {
      getClubScore(this.clubId).then(response => {
        if (response.status === 200) {
          console.log(response)
          this.clubInfo = response.data
        } else {
          return this.$message.error('获取社团积分信息失败')
        }
      })
    },
    getUserScoreDetail() {
      this.userScoreShow = true
      getUserScoreDetail().then(response => {
        if (response.status === 200) {
          this.UserScoreDetailList = response.data
        } else {
          return this.$message.error('获取用户积分规则失败')
        }
      })
    },
    getClubScoreDetail() {
      this.clubScoreShow = true
      getClubScoreDetail().then(response => {
        if (response.status === 200) {
          this.ClubScoreDetailList = response.data
        } else {
          return this.$message.error('获取社团积分规则失败')
        }
      })
    },
    solveImgs(carouselImgList) {
      // const tmp = []
      // 清除数组中的null
      console.log(carouselImgList.length)
      for (var i = 0; i < carouselImgList.length; i++) {
        console.log(i)
        if (carouselImgList[i] == null) {
          carouselImgList.splice(i, 1)
          i--
        }
      }

      // 如果长度小于3，则补至3
      if (carouselImgList.length === 0) {
        carouselImgList.push(clubImg1)
        carouselImgList.push(clubImg2)
        carouselImgList.push(clubImg3)
      }
      if (carouselImgList.length === 1) {
        carouselImgList.push(clubImg1)
        carouselImgList.push(clubImg2)
      }
      if (carouselImgList.length === 2) {
        carouselImgList.push(clubImg1)
      }
      console.log(carouselImgList)
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

#bulletin {
  margin-bottom: 5px;
}
</style>
