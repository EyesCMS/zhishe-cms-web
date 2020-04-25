<template>
  <div>
    <!-- 卡片视图区 -->
    <el-card>

      <!-- 社长换届申请列表 -->
      <el-table :data="changeApplyList" stripe border>
        <el-table-column type="index" label="#" />
        <el-table-column label="社团名称" prop="club_name" />
        <el-table-column label="现任社长" prop="old_chief_name" />
        <el-table-column label="新任社长" prop="new_chief_name" />
        <el-table-column label="申请时间" prop="create_at" />
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
import { getChangeApplyList, pushToChangeApply } from '@/api/club'
export default {
  name: 'ChangeApply',
  data() {
    return {
      listLoading: true,
      clubId: 0,
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      changeApplyList: []
    }
  },
  created() {
    this.clubId = localStorage.getItem('clubid')
    this.getChangeApplyList()
  },
  methods: {
    getChangeApplyList() {
      this.listLoading = true
      getChangeApplyList(this.clubId, this.queryInfo).then(response => {
        if (response.status === 200) {
          this.$message.success('获取社长换届申请成功')
          this.changeApplyList = response.items
          this.total = response.total_count
        } else {
          return this.$message.error('获取社长换届申请失败')
        }
        console.log(this.changeApplyList)
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.limit = newSize
      this.getChangeApplyList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getChangeApplyList()
    },
    // 修改申请状态
    pushToAgree({ $index, row }) {
      const data = {
        id: row.id,
        state: 1
      }
      pushToChangeApply(data).then(response => {
        if (response.status === 204) {
          this.$message.success('审核申请成功')
        } else {
          return this.$message.error('审核申请失败')
        }
        this.changeApplyList.splice($index, 1)
      })
    },
    pushToRefuse({ $index, row }) {
      const data = {
        id: row.id,
        state: 2
      }
      pushToChangeApply(data).then(response => {
        if (response.status === 204) {
          this.$message.success('审核申请成功')
        } else {
          return this.$message.error('审核申请失败')
        }
        this.changeApplyList.splice($index, 1)
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
