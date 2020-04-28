<template>
  <div>
    <!-- 卡片视图区 -->
    <el-card>

      <!-- 社团活动申请列表 -->
      <el-table :data="activityApplyList" stripe border>
        <el-table-column type="index" label="#" />
        <el-table-column label="社团名称" prop="clubName" />
        <el-table-column label="活动名称" prop="name" />
        <el-table-column label="活动标题" prop="title" />
        <el-table-column label="活动内容" prop="content" />
        <el-table-column label="开始时间" prop="startDate" />
        <el-table-column label="结束时间" prop="endDate" />
        <el-table-column label="活动场地" prop="location" />
        <el-table-column label="附件" prop="accessoryUrl" />
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
import { getActivityApplyList, pushToActivityApply } from '@/api/club'
export default {
  name: 'ActivityApply',
  data() {
    return {
      listLoading: true,
      clubId: 0,
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      activityApplyList: []
    }
  },
  created() {
    this.clubId = localStorage.getItem('clubid')
    this.getActivityApplyList()
  },
  methods: {
    getActivityApplyList() {
      this.listLoading = true
      getActivityApplyList(this.clubId, this.queryInfo).then(response => {
        if (response.status === 200) {
          this.$message.success('获取社团活动申请成功')
          this.activityApplyList = response.items
          this.total = response.total_count
        } else {
          return this.$message.error('获取社团活动申请失败')
        }
        console.log(this.activityApplyList)
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.limit = newSize
      this.getActivityApplyList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getActivityApplyList()
    },
    // 修改申请状态
    pushToAgree({ $index, row }) {
      const data = {
        id: row.id,
        state: 1
      }
      pushToActivityApply(data).then(response => {
        if (response.status === 204) {
          this.$message.success('审核申请成功')
        } else {
          return this.$message.error('审核申请失败')
        }
        this.activityApplyList.splice($index, 1)
      })
    },
    pushToRefuse({ $index, row }) {
      const data = {
        id: row.id,
        state: 2
      }
      pushToActivityApply(data).then(response => {
        if (response.status === 204) {
          this.$message.success('审核申请成功')
        } else {
          return this.$message.error('审核申请失败')
        }
        this.activityApplyList.splice($index, 1)
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
