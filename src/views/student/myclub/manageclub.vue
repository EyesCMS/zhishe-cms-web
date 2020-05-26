<template>
  <div style="margin-top: 15px;text-align:center;">

    <!-- 社团列表 -->
    <el-table v-loading="listLoading" :data="ManageclubsList" stripe border>
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
      <el-table-column label="社长名称" prop="chiefName" />
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="EnterToClub(scope.row.id)">进入社团</el-button>
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
  </div>
</template>

<style>
.el-input {
  width: 600px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
<script>
import { getManageclubsListData } from '@/api/club'
export default {
  name: 'ManageClubs',
  data() {
    return {
      search: '',
      listLoading: true,
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      userid: this.$store.getters.userId,
      ManageclubsList: []
    }
  },
  created() {
    this.getManageclubsListData()
  },
  methods: {
    getManageclubsListData() {
      this.listLoading = true
      getManageclubsListData(this.userid, this.queryInfo).then(response => {
        if (response.status === 200) {
          this.ManageclubsList = response.data.items
          this.total = response.data.totalCount
          this.listLoading = false
        } else {
          this.listLoading = false
          return this.$message.error('获取社团列表失败')
        }
        // console.log(this.ManageclubsList)
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getManageclubsListData()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getManageclubsListData()
    },
    // 跳转到社团风采页面
    EnterToClub(id) {
      this.$store.dispatch('user/changeRoles', 'chief')
      this.$router.push({ path: '/clubstyle/index', query: { id: id }})
    }
  }
}
</script>
