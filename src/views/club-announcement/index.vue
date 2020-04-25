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
      <p>共搜索到100条相关公告</p>
      <div v-for="(item, index) in bulletinsList" :key="index">
        <h2>{{ item.title }}</h2>
        <p>{{ item.create_at }}  </p>
        <p>{{ item.content }}</p>
        <el-link type="primary" @click="openBulletinDetailDiaglog(item.id)">详情</el-link>
        <el-divider><i class="el-icon-message-solid" /></el-divider>
      </div>

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
        <p>发布时间:{{ bulletin.create_at }}</p>
        <p>上次修改:{{ bulletin.update_at }}</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="bulletinDetailDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getBulletinList } from '@/api/club'
import { getBulletinDetail } from '@/api/club'
export default {
  name: 'ClubAnnouncement',
  data() {
    return {
      clubId: 0,
      queryInfo: {
        keyword: '',
        page: 1,
        limit: 5,
        sort: 'create_at',
        order: 'desc'
      },
      total: 0,
      bulletinsList: [],
      bulletin: {},
      bulletinDetailDialogVisible: false
    }
  },
  created() {
    // this.clubId = localStorage.getItem('clubid')
    this.getBulletinsList()
  },
  methods: {
    getBulletinsList() {
      getBulletinList(this.clubId, this.queryInfo).then(response => {
        // console.log(response.clubId)
        this.bulletinsList = response.items
        this.total = response.total_count
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
        this.bulletin = response.items
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

</style>
