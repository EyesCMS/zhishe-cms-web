<template>
  <div>
    <!-- 卡片视图 -->
    <el-card>
      <el-input
        v-model="queryInfo.keyword"
        placeholder="请输入公告标题关键字"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search" @click="queryAnnouncementList" />
      </el-input>
      <p>共搜索到{{ total }}条相关公告</p>
      <el-row v-for="(item, index) in bulletinsList" :key="index" :gutter="10">
        <el-col :span="12">
          <el-card :style="{'background':'rgb('+Math.floor(Math.random()*50+180)+','+Math.floor(Math.random()*50+180)+','+Math.floor(Math.random()*50+180)+')'}">
            <h2 class="title">{{ item.title }}</h2>
            <p>{{ item.body }}</p>
            <!-- <p class="createAt">{{ item.createAt }}  </p> -->
            <p class="createAt">{{ item.updateAt }}  </p>
            <div class="ww">
              <el-link @click="openBulletinDetailDiaglog(item.id)"><i class="el-icon-view el-icon--right" />详情</el-link>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card :style="{'background':'rgb('+Math.floor(Math.random()*50+180)+','+Math.floor(Math.random()*50+180)+','+Math.floor(Math.random()*50+180)+')'}">
            <h2 class="title">{{ item.title }}</h2>
            <p>{{ item.body }}</p>
            <!-- <p class="createAt">{{ item.createAt }}  </p> -->
            <p class="createAt">{{ item.updateAt }}  </p>
            <div class="ww">
              <el-link @click="openBulletinDetailDiaglog(item.id)"><i class="el-icon-view el-icon--right" />详情</el-link>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- <div >
        <h2>{{ item.title }}</h2>
        <p>{{ item.create_at }}  </p>
        <p>{{ item.content }}</p>
        <el-link type="primary" @click="openBulletinDetailDiaglog(item.id)">详情</el-link>
        <el-divider><i class="el-icon-message-solid" /></el-divider>
      </div> -->

      <!-- 分页 -->
      <el-pagination
        :current-page="queryInfo.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
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
        <p>发布时间:{{ bulletin.createAt }}</p>
        <p>上次修改:{{ bulletin.updateAt }}</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="bulletinDetailDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { listBulletins } from '@/api/club'
import { getBulletinDetail } from '@/api/club'
export default {
  name: 'ClubAnnouncement',
  data() {
    return {
      clubId: 5000,
      queryInfo: {
        // keyword: '',
        page: 1,
        limit: 5,
        sort: 'updateAt',
        order: 'desc'
      },
      total: 0,
      bulletinsList: [],
      bulletin: {},
      bulletinDetailDialogVisible: false
    }
  },
  created() {
    // this.clubId = sessionStorage.getItem('clubId')
    // this.clubId = localStorage.getItem('clubid')
    this.getBulletinsList()
  },
  methods: {
    getBulletinsList() {
      listBulletins(this.clubId, this.queryInfo).then(response => {
        // console.log(response.clubId)
        this.bulletinsList = response.data.items
        this.total = response.data.totalCount
        console.log(this.bulletinsList)
        // console.log(this.memberInfo)
      })
    },
    // 监听页值变化
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.limit = newSize
      this.getBulletinsList()
    },
    // 监听页码变化
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getBulletinsList()
    },
    // 弹出公告详情对话框
    openBulletinDetailDiaglog(id) {
      // 发起查询公告详情请求
      getBulletinDetail(this.clubId, id).then(response => {
        console.log(response)
        this.bulletin = response.data
        // console.log('123' + response.data)
        // console.log('公告是' + this.bulletin)
        // console.log(this.memberInfo)
      })
      this.bulletinDetailDialogVisible = true
    },

    // 根据公告标题关键字搜索公告
    queryAnnouncementList() {
      this.getBulletinsList()
      this.queryInfo.keyword = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-family: "PingFang SC";
  text-align: center;
  font-size: 12px Extra Small
}
.createAt {
  font-size: 14px;
  text-align: left;
}
.el-card {
  margin-top: 15px;
}
.ww {
   text-align: center;
   margin: 0 auto;
}
.el-pagination {
  position: relative;
  margin-top: 20px;
}
</style>
