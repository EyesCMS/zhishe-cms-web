<template>
  <div style="margin-top: 15px;text-align:center;">

    <!-- 社团列表 -->
    <el-table :data="JoinclubsList" stripe border>
      <el-table-column label="社团ID" prop="cid" />
      <el-table-column label="社团头像" prop="avatar_url" />
      <el-table-column label="社团名称" prop="name" />
      <el-table-column label="社长名称" prop="chief_name" />
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="EnterToClub(scope.row.cid)">进入社团</el-button>
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
      search: '',
      listLoading: true,
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      // userid: this.$store.getters.name,
      userid: 0,
      JoinclubsList: []
    }
  },
  created() {
    this.getJoinclubsList()
  },
  methods: {
    getJoinclubsList() {
      this.listLoading = true
      getJoinclubsList(this.userid, this.queryInfo).then(response => {
        if (response.status === 200) {
          this.JoinclubsList = response.data
          this.total = response.total
        } else {
          return this.$message.error('获取社团列表失败')
        }
        console.log(this.JoinclubsList)
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.limit = newSize
      this.getJoinclubsList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getJoinclubsList()
    },
    // 跳转到社团风采页面
    EnterToClub(cid) {
      this.$store.dispatch('user/changeRoles', 'menber')
      this.$router.push({ path: '/clubstyle/index', query: { cid: cid }})
      this.switchRole(cid)
    },
    switchRole(cid) {
      switchRole(cid).then(response => {
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
