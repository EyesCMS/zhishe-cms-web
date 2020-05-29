<template>
  <div style="padding: 20px;">
    <!-- 创建社团申请列表 -->
    <el-table v-loading="listLoading" :data="CreateApplicationsList" stripe border>
      <el-table-column label="社团名称" prop="clubName" />
      <el-table-column label="申请原因" prop="reason" />
      <el-table-column label="申请时间" prop="createAt" />
      <el-table-column label="申请状态" prop="state">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.state === 0"
            style="text-align: center;"
            type="warning"
            :disable-transitions="true"
            effect="dark"
          >{{ scope.row.state | statusFilter }}</el-tag>
          <el-tag
            v-else-if="scope.row.state === 1"
            style="text-align: center;"
            type="success"
            :disable-transitions="true"
            effect="dark"
          >{{ scope.row.state | statusFilter }}</el-tag>
          <el-tag
            v-else
            style="text-align: center;"
            type="danger"
            :disable-transitions="true"
            effect="dark"
          >{{ scope.row.state | statusFilter }}</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <div style="text-align: center; margin-top: 30px;">
      <el-pagination
        :current-page="queryInfo.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getCreateApplicationsListData } from '@/api/club'
export default {
  name: 'CreateApplications',
  filters: {
    statusFilter(value) {
      if (value === 0) {
        return '待审核'
      } else if (value === 1) {
        return '已通过'
      } else {
        return '未通过'
      }
    }
  },
  data() {
    return {
      listLoading: true,
      userID: this.$store.getters.userid,
      queryInfo: {
        // clubName: '',好像未实现
        // state: '',
        page: 1,
        limit: 5
      },
      total: 0,
      CreateApplicationsList: []
    }
  },
  created() {
    this.getCreateApplicationsListData()
  },
  methods: {
    getCreateApplicationsListData() {
      this.listLoading = true
      getCreateApplicationsListData(this.queryInfo).then(response => {
        if (response.status === 200) {
          this.CreateApplicationsList = response.data.items
          this.total = response.data.totalCount
          this.listLoading = false
        } else {
          this.listLoading = false
          return this.$message.error('获取申请加入社团列表失败')
        }
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.limit = newSize
      this.getCreateApplicationsListData()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getCreateApplicationsListData()
    },
    handleResetSearch() {
      this.form.name = ''
      this.form.type = ''
      this.form.chiefName = ''
      this.form.id = ''
    }
  }
}
</script>

<style scoped>

</style>
