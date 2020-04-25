<template>
  <div>
    <el-card>
      <el-input
        v-model="queryInfo.keyword"
        placeholder="请输入文章标题关键字"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search" @click="queryInvitation" />
      </el-input>
      <h4>共搜索到 {{ total }} 条记录</h4>
      <el-card v-for="(item, index) in invitationsList" :key="index" style="margin-top:20px">
        <el-row>
          <el-avatar style="float:left" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <p style="float: left">{{ item.club_name }}</p>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="15">
            <el-image :src="imgUrl" :fit="fit" lazy />
          </el-col>
          <el-col :span="9">
            <el-card>
              <h2 style="text-align:center">{{ item.title }}</h2>
              <p>{{ item.content }}</p>
              <p>{{ item.create_at }}</p>
              <el-button type="primary" style="display:block;margin:10 auto;" @click="pushToDetail(item.id)">查看详情</el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-card>

      <!-- 分页区域 -->
      <el-pagination
        :current-page="queryInfo.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import { getInvitationList } from '@/api/forum'
export default {
  name: 'ActivityForum',
  data() {
    return {
      clubId: 0,
      queryInfo: {
        keyword: '',
        page: 1,
        limit: 5,
        sort: 'created_at',
        order: 'desc'
      },
      imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      invitationsList: [],
      total: 0,
      fit: 'contain'
    }
  },
  created() {
    this.getInvitationsList()
  },
  methods: {
    getInvitationsList() {
      getInvitationList(this.clubId, this.queryInfo).then(response => {
        console.log(response)
        this.invitationsList = response.items
        this.total = response.total_count
        console.log(this.invitationsList)
        // console.log(this.memberInfo)
      })
    },
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.limit = newSize
      this.getInvitationsList()
    },
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getInvitationsList()
    },

    // 跳转到帖子详情页面
    pushToDetail(id) {
      this.$router.push({ path: 'detail', query: { id: id }})
    },
    queryInvitation() {
      this.getInvitationsList()
      this.queryInfo.keyword = ''
    }
  }
}
</script>

<style scoped lang="scss">

</style>
