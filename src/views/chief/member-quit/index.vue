<template>
  <div>
    <!-- 卡片视图区 -->
    <el-card>

      <!-- 社员退社通知列表 -->
      <el-table v-loading="listLoading" :data="quitList" stripe border>
        <el-table-column type="index" label="#" />
        <el-table-column label="社员名" prop="username" />
        <el-table-column label="退社原因" prop="reason" />
        <el-table-column label="退社时间" prop="createAt" :formatter="formatDate" />
      </el-table>

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
import { getQuitList } from '@/api/club'
export default {
  name: 'QuitList',
  data() {
    return {
      listLoading: true,
      clubId: sessionStorage.getItem('clubId'),
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      quitList: []
    }
  },
  created() {
    this.getQuitList()
  },
  methods: {
    getQuitList() {
      this.listLoading = true
      getQuitList(this.clubId, this.queryInfo).then(response => {
        if (response.status === 200) {
          this.$message.success('获取成员退出通知成功')
          this.quitList = response.data.items
          this.total = response.data.totalCount
          this.listLoading = false
        } else {
          this.listLoading = false
          return this.$message.error('获取成员退出通知失败')
        }
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getQuitList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getQuitList()
    },
    // 设置时间格式
    formatDate(row, column) {
      // 获取单元格数据
      const data = row[column.property]
      if (data == null) {
        return null
      }
      const dt = new Date(data)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
    }
  }
}
</script>

<style scoped lang="scss">
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.el-table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
}
</style>
