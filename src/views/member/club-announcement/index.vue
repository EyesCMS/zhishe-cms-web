<template>
  <div>
    <!-- 卡片视图 -->
    <el-card>
      <el-card>
        <div>
          <i class="el-icon-search" />
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            type="primary"
            size="small"
            @click="handleSearchList"
          >
            查询
          </el-button>
          <el-button
            style="float: right;margin-right: 15px"
            size="small"
            @click="reset"
          >
            重置
          </el-button>
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="queryInfo" size="small" label-width="140px">
            <div style="text-align:center">
              <el-form-item label="公告标题">
                <el-input v-model="queryInfo.title" style="width: 203px" placeholder="请输入公告标题" />
              </el-form-item>
              <el-form-item label="公告内容">
                <el-input v-model="queryInfo.body" style="width: 203px" placeholder="请输入公告内容" />
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-card>
      <el-card>
        <p>共搜索到{{ total }}条相关公告</p>
        <el-card v-for="(item, index) in bulletinsList" :key="index" style="margin: 50px auto;width: 800px">
          <h2 class="title">{{ item.title }}</h2>
          <p>{{ item.body }}</p>
          <!-- <p class="createAt">{{ item.createAt }}  </p> -->
          <p class="createAt">{{ item.updateAt }}  </p>
          <div class="ww">
            <el-link @click="openBulletinDetailDiaglog(item.id)"><i class="el-icon-view el-icon--right" />详情</el-link>
          </div>
        </el-card>

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
          style="margin: 25px 15px;text-align:center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
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
      clubId: sessionStorage.getItem('clubId'),
      queryInfo: {
        title: '',
        body: '',
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
    this.getBulletinsList()
  },
  methods: {
    getBulletinsList() {
      listBulletins(this.clubId, this.queryInfo).then(response => {
        this.bulletinsList = response.data.items
        this.total = response.data.totalCount
      })
    },
    // 监听页值变化
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getBulletinsList()
    },
    // 监听页码变化
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getBulletinsList()
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

    // 根据公告标题关键字搜索公告
    queryAnnouncementList() {
      this.getBulletinsList()
      this.queryInfo.keyword = ''
    },
    handleSearchList() {
      this.queryInfo.page = 1
      this.getBulletinsList()
    },
    reset() {
      this.queryInfo.title = this.queryInfo.body = ''
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
