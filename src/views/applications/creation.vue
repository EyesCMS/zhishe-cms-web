<template>
  <div>
    <!-- 加入社团申请列表 -->
    <el-table :data="CreateApplicationsList" stripe border>
      <el-table-column label="序号" prop="cid" />
      <el-table-column label="社团名称" prop="club_name" />
      <el-table-column label="社团类别" prop="club_type" />
      <el-table-column label="申请原因" prop="reason" />
      <el-table-column label="申请状态" prop="state" />
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="Back(scope.row.user_id)">撤销</el-button>
        </template>
      </el-table-column>
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
      // user_id: this.$store.getters.name,
      user_id: 1,
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
      getCreateApplicationsList(this.user_id, this.queryInfo).then(response => {
        if (response.status === 200) {
          this.CreateApplicationsList = response.data
          this.total = response.total
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
