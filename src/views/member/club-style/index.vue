<template>
  <div>
    <el-card>
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
      <el-row :gutter="25">
        <el-col :span="8">
          <el-card style="margin-top:30px">
            <div style="display:flex;justify-content: space-between">
              <h3>公告列表</h3>
              <el-button plain size="mini" style="height:30px;position:relative;top:10px" @click="pushToBulletins()">更多<i class="el-icon-arrow-right" /></el-button>
            </div>
            <div
              v-for="(item, i) in bulletinsList"
              id="bulletin"
              :key="i"
            >
              <div style="display:flex;justify-content: space-between">
                <div>
                  <el-tag v-if="i <= 2" type="danger">{{ i + 1 }}</el-tag>
                  <el-tag v-else type="info">{{ i + 1 }}</el-tag>
                  <el-link style="display:inline;" @click="openBulletinDetailDiaglog(item.id)">{{ item.title }}</el-link>
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
              <el-button plain size="mini" style="height:30px;position:relative;top:10px" @click="pushToActivities()">更多<i class="el-icon-arrow-right" /></el-button>
            </div>
            <div
              v-for="(item, i) in invitationList"
              id="bulletin"
              :key="i"
            >
              <div style="display:flex;justify-content: space-between">
                <div>
                  <el-tag v-if="i <= 2" type="warning">{{ i + 1 }}</el-tag>
                  <el-tag v-else type="info">{{ i + 1 }}</el-tag>
                  <el-link style="display:inline;" @click="pushToActivityDetail(item.id)">{{ item.title }}</el-link>
                </div>
                <p style="font-size:10px">{{ item.createAt }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="margin-top:30px">
            <el-row>
              <el-col :span="10">
                <el-avatar :size="50" :src="clubDetail.avatarUrl" />
              </el-col>
              <el-col :span="14">
                <h3>{{ clubDetail.name }}</h3>
              </el-col>
            </el-row>
            <h4>社长：{{ clubDetail.chiefName }}</h4>
            <h4>成员数：{{ clubDetail.memberCount }}</h4>
            <h4>qq群：{{ clubDetail.qqGroup }}</h4>
            <h4>简介：{{ clubDetail.slogan }}</h4>
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
    <!-- 公告详情对话框 -->
    <el-dialog
      title="公告"
      :visible.sync="bulletinDetailDialogVisible"
      width="70%"
      center
      modal
    >
      <h2 style="text-align:center;margin-bottom:50px">{{ bulletin.title }}</h2>
      <p>{{ bulletin.body }}</p>
      <p>发布时间:{{ bulletin.createAt }}</p>
      <p>上次修改:{{ bulletin.updateAt }}</p>
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

    <!-- 退社申请对话框 -->
    <el-dialog
      title="退社申请"
      :visible.sync="quitClubDialogVisible"
      width="70%"
      center
      modal
    >
      <el-form>
        <el-form-item label="退社理由">
          <el-input
            v-model="quitReason"
            type="textarea"
          >1</el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="quitClubConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listBulletins } from '@/api/club'
import { getBulletinDetail } from '@/api/club'
import { getInvitationList } from '@/api/forum'
import { getClubDetail } from '@/api/club'
import { quitClub } from '@/api/club'
export default {
  name: 'MemClubStyle',
  data() {
    return {
      userId: this.$store.getters.userId,
      clubId: 5000,
      queryInfo: {
        type: 1,
        page: 1,
        limit: 10,
        sort: 'updateAt',
        order: 'desc'
      },
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
    console.log('风采页面userId为' + this.userId)
    if (this.$route.query.id !== undefined) {
      this.clubId = this.$route.query.id
      console.log('接收cid')
      console.log('clubId为' + this.clubId)
      sessionStorage.setItem('clubId', this.clubId)
    } else {
      this.clubId = sessionStorage.getItem('clubId')
    }
    // this.clubId = this.$route.query.cid
    this.getBulletinsList()
    this.getInvitationsList()
    this.getClubDetail()
  },
  methods: {
    getBulletinsList() {
      listBulletins(this.clubId, this.queryInfo).then(response => {
        this.bulletinsList = response.data.items
        console.log(this.bulletinsList)
        // console.log(this.memberInfo)
      })
    },
    getInvitationsList() {
      getInvitationList(this.clubId, this.queryInfo).then(response => {
        this.invitationList = response.data.items
        console.log(this.invitationList)
        // console.log(this.memberInfo)
      })
    },

    // 获取社团详情
    getClubDetail() {
      getClubDetail(this.clubId).then(response => {
        console.log(123)
        console.log(response)
        this.clubDetail = response.data
        console.log(this.clubDetail)
        // console.log(this.memberInfo)
      })
    },
    // 弹出公告详情对话框
    openBulletinDetailDiaglog(id) {
      // 发起查询公告详情请求
      getBulletinDetail(this.clubId, id).then(response => {
        console.log(response)
        this.bulletin = response.data
      })
      this.bulletinDetailDialogVisible = true
    },

    // 退社申请对话框
    quitClubDialog() {
      this.quitClubDialogVisible = true
    },

    // 退出社团
    quitClubConfirm() {
      const param = {
        clubId: this.clubId,
        reason: this.quitReason
      }
      quitClub(param).then(response => {
        if (response.status === 201) {
          this.$message.success('退出社团成功')
          // console.log('123' + response.data)
          // console.log('公告是' + this.bulletin)
        } else {
          return this.$message.error('退出社团失败')
        }
      })
      this.quitClubDialogVisible = false
      // 跳转到其他页面
    },
    pushToActivityDetail(id) {
      this.$router.push({ path: '/activityforum/detail', query: { id: id }})
    },
    pushToBulletins() {
      this.$router.replace('/announcement/index')
    },
    pushToActivities() {
      this.$router.replace('/activityforum/index')
    },
    isMember() {
      return sessionStorage.getItem('roles') === 'member'
    }
  }
}
</script>

<style scoped lang="scss">
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

#bulletin {
  margin-bottom: 5px;
}
</style>
