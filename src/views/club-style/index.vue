<template>
  <div>
    <el-card>
      <!-- 社团风采走马灯 -->
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-divider />
          <h3 style="text-align:center;">公告列表</h3>
          <el-divider />
          <div v-for="(item, i) in bulletinsList" id="bulletin" :key="i">
            <el-tag>{{ i + 1 }}</el-tag>
            <p style="display:inline;">{{ item.title }}</p>
            <el-link type="primary" @click="openBulletinDetailDiaglog(item.id)">详情</el-link>
          </div>
        </el-col>
        <el-col :span="8">
          <el-divider />
          <h3 style="text-align:center;">帖子列表</h3>
          <el-divider />
          <div v-for="(item, i) in invitationList" id="bulletin" :key="i">
            <el-tag type="warning">{{ i + 1 }}</el-tag>
            <p style="display:inline;">{{ item.title }}</p>
            <el-link type="primary" @click="pushToActivityDetail(item.id)">详情</el-link>
          </div>
        </el-col>
        <el-col :span="8">
          <el-divider />
          <h3 style="text-align:center;">社团简介</h3>
          <el-divider />
          <el-card>
            <h4>社长：{{ clubDetail.chief_name }}</h4>
            <h4>成员数：{{ clubDetail.member_count }}</h4>
            <h4>qq群：{{ clubDetail.qq_group }}</h4>
            <h4>简介：{{ clubDetail.slogan }}</h4>
          </el-card>
          <el-button style="display:block;margin:15px auto" type="info" @click="quitClubDialog()">退出社团</el-button>
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
      <p>{{ bulletin.content }}</p>
      <p>发布时间:{{ bulletin.create_at }}</p>
      <p>上次修改:{{ bulletin.update_at }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bulletinDetailDialogVisible = false">确 定</el-button>
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
          <el-input v-model="quitReason" type="textarea">1</el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="quitClubConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getBulletinList } from '@/api/club'
import { getBulletinDetail } from '@/api/club'
import { getInvitationList } from '@/api/forum'
import { getClubDetail } from '@/api/club'
import { quitClub } from '@/api/club'
export default {
  name: 'MemClubStyle',
  data() {
    return {
      userId: 0,
      clubId: 0,
      queryInfo: {
        page: 1,
        limit: 10,
        sort: 'update_at',
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
    if (this.$route.params.clubid) {
      this.clubId = this.$route.params.clubid
    }
    localStorage.setItem('clubid', this.clubid)
    this.getBulletinsList()
    this.getInvitationsList()
    this.getClubDetail()
  },
  methods: {
    getBulletinsList() {
      getBulletinList(this.clubId, this.queryInfo).then(response => {
        this.bulletinsList = response.items
        console.log(this.bulletinsList)
        // console.log(this.memberInfo)
      })
    },
    getInvitationsList() {
      getInvitationList(this.clubId, this.queryInfo).then(response => {
        this.invitationList = response.items
        console.log(this.invitationList)
        // console.log(this.memberInfo)
      })
    },

    // 获取社团详情
    getClubDetail() {
      getClubDetail(this.clubId).then(response => {
        console.log(response)
        this.clubDetail = response.items
        console.log(this.clubDetail)
        // console.log(this.memberInfo)
      })
    },
    // 弹出公告详情对话框
    openBulletinDetailDiaglog(id) {
      // 发起查询公告详情请求
      getBulletinDetail(this.clubId, id).then(response => {
        console.log(response)
        this.bulletin = response.items
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
        userId: this.userId,
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

.el-link {
  float: right;
}

#bulletin {
  margin-bottom: 5px;
}
</style>
