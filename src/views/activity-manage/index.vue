<template>
  <div>
    <el-card>
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search" />
      </el-input>
      <el-row style="margin-top:20px">
        <el-button type="primary">申请活动</el-button>
      </el-row>
      <!-- 活动申请列表 -->
      <el-table :data="activitiesList" stripe border>
        <el-table-column type="index" label="#" />
        <el-table-column label="活动名称" prop="name" />
        <el-table-column label="活动时间" width="300px">
          <template slot-scope="scope">
            {{ scope.row.start_date }} - {{ scope.row.end_date }}
          </template>
        </el-table-column>
        <el-table-column label="活动地点" prop="location" />
        <el-table-column label="活动内容" prop="content" />
        <el-table-column label="参与人数" prop="member_count" />
        <el-table-column label="状态" prop="state">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state === 0" style="text-align:center" type="warning" :disable-transitions="true" effect="dark">{{ scope.row.state | verifyStatusFilter }}</el-tag>
            <el-tag v-else-if="scope.row.state === 1" type="primary" :disable-transitions="true" effect="dark">{{ scope.row.state | verifyStatusFilter }}</el-tag>
            <el-tag v-else-if="scope.row.state === 2" type="success" :disable-transitions="true" effect="dark">{{ scope.row.state | verifyStatusFilter }}</el-tag>
            <el-tag v-else-if="scope.row.state === 3" type="danger" :disable-transitions="true" effect="dark">{{ scope.row.state | verifyStatusFilter }}</el-tag>
            <el-tag v-else type="info" :disable-transitions="true" effect="dark">{{ scope.row.state | verifyStatusFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" @click="pushToDetail(scope.row.userid)">查看</el-button>
            <el-button v-if="scope.row.state === 0" type="danger" @click="pushToDetail(scope.row.userid)">撤销</el-button>
            <el-button v-else-if="scope.row.state === 1" type="success" @click="pushToDetail(scope.row.userid)">发布</el-button>
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
import { getActivitiesList } from '@/api/club'
export default {
  name: 'ActivityManage',
  filters: {
    verifyStatusFilter(value) {
      if (value === 0) {
        return '未审核'
      } else if (value === 1) {
        return '审核通过'
      } else if (value === 2) {
        return '已发布'
      } else if (value === 3) {
        return '审核未通过'
      } else {
        return '已结束'
      }
    }
  },
  data() {
    return {
      activitiesList: [],
      clubId: 0,
      queryInfo: {
        keyword: '',
        page: 1,
        limit: 5,
        sort: '',
        order: ''
      },
      total: 0
    }
  },
  created() {
    this.getActivitiesList()
  },
  methods: {
    getActivitiesList() {
      getActivitiesList(this.clubId, this.queryInfo).then(response => {
        console.log(response)
        this.activitiesList = response.items
        this.total = response.total_count
        console.log(this.activitiesList)
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.limit = newSize
      this.getActivitiesList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getActivitiesList()
    }
  }
}
</script>

<style scoped lang="scss">
.el-table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
}
</style>
