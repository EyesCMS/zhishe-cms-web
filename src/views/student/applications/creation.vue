<template>
  <div>
    <!-- 加入社团申请列表 -->
    <el-table :data="JoinApplicationsList" stripe border>
      <el-table-column label="社团ID" prop="id" />
      <el-table-column label="社团头像" prop="avatarUrl">
        <template slot-scope="scope" width="40">
          <el-image
            :src="scope.row.avatarUrl"
            style="width: 50px; height: 50px"
          />
        </template>
      </el-table-column>
      <el-table-column label="社团名称" prop="name" />
      <el-table-column label="申请原因" prop="reason" />
      <el-table-column label="申请状态" prop="state" />
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getCreateApplicationsList } from '@/api/club'
export default {
  name: 'CreateApplications',
  data() {
    return {
      listLoading: true,
      userID: this.$store.getters.name,
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      CreateApplicationsList: []
    }
  },
  created() {
    this.getCreateApplicationsList()
  },
  methods: {
    getCreateApplicationsList() {
      this.listLoading = true
      getCreateApplicationsList(this.userID, this.queryInfo).then(response => {
        if (response.status === 200) {
          this.CreateApplicationsList = response.data.items
          this.total = response.data.totalCount
        } else {
          return this.$message.error('获取申请加入社团列表失败')
        }
        console.log(this.CreateApplicationsList)
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.limit = newSize
      this.getCreateApplicationsList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getCreateApplicationsList()
    }
  }
}
</script>

<style lang="stylus" scoped></style>
