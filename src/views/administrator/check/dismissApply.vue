<template>
  <div>
    <!-- 卡片视图区 -->
    <el-card>

      <!-- 社团解散申请列表 -->
      <el-table :data="dismissApplyList" stripe border>
        <el-table-column type="index" label="#" />
        <el-table-column label="社团名称" prop="clubName" />
        <el-table-column label="申请时间" prop="createAt" />
        <el-table-column label="申请原因" prop="reason" />
        <el-table-column label="" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" @click="pushToAgree(scope)">批准</el-button>
            <el-button type="primary" @click="pushToRefuse(scope)">退回</el-button>
          </template>
        </el-table-column>
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
import { getDismissApplyList, pushToDismissApply } from '@/api/club'
export default {
  name: 'DismissApply',
  data() {
    return {
      listLoading: true,
      clubId: 0,
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      dismissApplyList: []
    }
  },
  created() {
    // this.clubId = localStorage.getItem('clubid')
    this.getDismissApplyList()
  },
  methods: {
    getDismissApplyList() {
      this.listLoading = true
      getDismissApplyList(this.queryInfo).then(response => {
        if (response.status === 200) {
          this.$message.success('获取社团解散申请成功')
          this.dismissApplyList = response.items
          this.total = response.total_count
        } else {
          return this.$message.error('获取社团解散申请失败')
        }
        console.log(this.dismissApplyList)
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.limit = newSize
      this.getDismissApplyList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getDismissApplyList()
    },
    // 修改申请状态
    pushToAgree({ $index, row }) {
      const data = {
        id: row.id,
        state: 1
      }
      pushToDismissApply(data).then(response => {
        if (response.status === 204) {
          this.$message.success('审核申请成功')
        } else {
          return this.$message.error('审核申请失败')
        }
        this.dismissApplyList.splice($index, 1)
      })
    },
    pushToRefuse({ $index, row }) {
      const data = {
        id: row.id,
        state: 2
      }
      pushToDismissApply(data).then(response => {
        if (response.status === 204) {
          this.$message.success('审核申请成功')
        } else {
          return this.$message.error('审核申请失败')
        }
        this.dismissApplyList.splice($index, 1)
      })
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
