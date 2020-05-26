<template>
  <div style="padding: 20px;">
    <!-- 组合搜索 -->
    <!--
    <el-card shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          size="small"
          @click="handleSearchList"
        >
          查询
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          size="small"
          @click="handleResetSearch"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="form" size="small" label-width="140px">
          <div style="text-align:center">
            <el-form-item label="社团名称：">
              <el-input v-model="queryInfo.clubName" style="width: 203px" placeholder="请输入社团名称" />
            </el-form-item>
          </div>
          <div style="text-align:center">
            <el-form-item label="申请状态：">
              <el-select v-model="queryInfo.state" placeholder="请选择分类" clearable style="width: 203px">
                <el-option label="待审核" value="0" />
                <el-option label="已通过" value="1" />
                <el-option label="未通过" value="2" />
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>
-->
    <!-- 创建社团申请列表 -->
    <el-table v-loading="listLoading" :data="CreateApplicationsList" stripe border>
      <el-table-column label="社团名称" prop="clubName" />
      <el-table-column label="申请原因" prop="reason" />
      <el-table-column label="申请时间" prop="createAt" />
      <el-table-column label="申请状态" prop="state">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state === 0" style="text-align:center;" type="warning" :disable-transitions="true" effect="dark">{{ scope.row.state | statusFilter }}</el-tag>
          <el-tag v-else-if="scope.row.state === 1" style="text-align:center;" type="success" :disable-transitions="true" effect="dark">{{ scope.row.state | statusFilter }}</el-tag>
          <el-tag v-else style="text-align:center;" type="danger" :disable-transitions="true" effect="dark">{{ scope.row.state | statusFilter }}</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <div style="text-align: center;margin-top: 30px;">
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
