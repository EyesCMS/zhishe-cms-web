<template>
  <div>
    <!-- 卡片视图区 -->
    <el-card>
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          size="small"
          @click="check"
        >
          查询
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          size="small"
          @click="renew"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 30px">
        <el-form :inline="true" :model="form" label-width="100px">
          <el-form-item label="社团名称">
            <el-input v-model="form.clubName" placeholder="" />
          </el-form-item>
          <el-form-item label="申请状态" prop="state">
            <el-select v-model="form.state" placeholder="请选择">
              <el-option label="未审核" value="0" />
              <el-option label="已批准" value="1" />
              <el-option label="已发布" value="2" />
              <el-option label="已退回" value="3" />
              <el-option label="已结束" value="4" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
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
        <el-table-column label="申请状态" prop="state">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state === 0" style="text-align:center" type="warning" :disable-transitions="true" effect="dark">{{ scope.row.state | statusFilter }}</el-tag>
            <el-tag v-else-if="scope.row.state === 1" style="text-align:center" type="success" :disable-transitions="true" effect="dark">{{ scope.row.state | statusFilter }}</el-tag>
            <el-tag v-else-if="scope.row.state === 2" style="text-align:center" type="success" :disable-transitions="true" effect="dark">{{ scope.row.state | statusFilter }}</el-tag>
            <el-tag v-else-if="scope.row.state === 3" style="text-align:center" type="success" :disable-transitions="true" effect="dark">{{ scope.row.state | statusFilter }}</el-tag>
            <el-tag v-else style="text-align:center" type="danger" :disable-transitions="true" effect="dark">{{ scope.row.state | statusFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="" width="200px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state === 0" type="primary" @click="pushToAgree(scope)">批准</el-button>
            <el-button v-if="scope.row.state === 0" type="primary" @click="pushToRefuse(scope)">退回</el-button>
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
  filters: {
    statusFilter(value) {
      if (value === 0) {
        return '待审核'
      } else if (value === 1) {
        return '已批准'
      } else if (value === 2) {
        return '已发布'
      } else if (value === 3) {
        return '已退回'
      } else {
        return '已结束'
      }
    }
  },
  data() {
    return {
      listLoading: true,
      clubId: 0,
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      activityApplyList: [],
      form: {
        clubName: '',
        state: ''
      }
    }
  },
  created() {
    this.getActivityApplyList()
  },
  methods: {
    getActivityApplyList() {
      this.listLoading = true
      const param = {
        clubName: this.form.clubName,
        state: this.form.state,
        page: this.queryInfo.page,
        limit: this.queryInfo.limit
      }
      getActivityApplyList(param).then(response => {
        if (response.status === 200) {
          this.$message.success('获取社团活动申请成功')
          this.activityApplyList = response.data.items
          this.total = response.data.totalCount
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
      })
      row.state = 1
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
      })
      row.state = 2
    },
    // 组合查询
    renew() {
      this.form.clubName = ''
      this.form.state = ''
    },
    check() {
      this.getActivityApplyList()
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
