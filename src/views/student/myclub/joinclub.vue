<template>
  <div style="margin-top: 15px;text-align:center;">

    <!-- 社团列表 -->
    <el-table :data="JoinclubsList" stripe border>
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
      <el-table-column label="社团类别" prop="type" />
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
import { getJoinclubsList } from '@/api/club'
import { switchRole } from '@/api/club'
export default {
  name: 'JoinClubs',
  data() {
    return {
      listLoading: true,
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      userId: this.$store.getters.userId,
      JoinclubsList: []
    }
  },
  created() {
    this.getJoinclubsList()
  },
  methods: {
    getJoinclubsList() {
      this.listLoading = true
      getJoinclubsList(this.userId, this.queryInfo).then(response => {
        if (response.status === 200) {
          this.JoinclubsList = response.data.items
          this.total = response.data.totalCount
        } else {
          return this.$message.error('获取社团列表失败')
        }
        // console.log(this.JoinclubsList)
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getJoinclubsList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getJoinclubsList()
    },
    // 跳转到社团风采页面
    EnterToClub(id) {
      this.$store.dispatch('user/changeRoles', 'member')
      this.$router.push({ path: '/clubstyle/index', query: { id: id }})
    },
    switchRole() {
      const input = {
        clubId: this.id,
        type: 0
      }
      switchRole(input).then(response => {
        if (response.status === 204) {
          return this.$message.success('切换角色成功')
        } else {
          return this.$message.error('切换角色失败')
        }
      })
    }
  }
}
</script>
