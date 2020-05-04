<template>
  <div>
    <el-card>
      <el-input
        placeholder="请输入文章标题关键字"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search" />
      </el-input>
      <h4>共搜索到 {{ total }} 条记录</h4>
      <el-card v-for="(item, index) in AllinvitationsList" :key="index" style="margin-top:20px">
        <el-row>
          <el-avatar style="float:left" :src="item.avatarUrl" />
          <p style="float: left">{{ item.posterName }}</p>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="15">
            <el-image :src="item.imgUrl" :fit="fit" lazy />
          </el-col>
          <el-col :span="9">
            <el-card>
              <h2 style="text-align:center">{{ item.title }}</h2>
              <p>{{ item.content }}</p>
              <p>{{ item.createAt }}</p>
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
import { getAllInvitationList } from '@/api/forum'
export default {
  name: 'AllActivityForum',
  data() {
    return {
      clubId: 0,
      queryInfo: {
        type: 1,
        page: 1,
        limit: 5,
        sort: 'created_at',
        order: 'desc'
      },
      AllinvitationsList: [],
      total: 0,
      fit: 'contain'
    }
  },
  created() {
    this.getAllInvitationList()
  },
  methods: {
    getAllInvitationList() {
      getAllInvitationList(this.queryInfo).then(response => {
        console.log(response)
        if (response.status === 200) {
          this.AllinvitationsList = response.data.items
          this.total = response.data.totalCount
        } else {
          return this.$message.error('获取帖子列表失败')
        }
      })
    },
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.limit = newSize
      this.getAllInvitationList()
    },
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getAllInvitationList()
    },

    // 跳转到帖子详情页面
    pushToDetail(id) {
      this.$router.push({ path: 'studentforum', query: { id: id }})
    }
  }
}
</script>

<style scoped lang="scss">

</style>
