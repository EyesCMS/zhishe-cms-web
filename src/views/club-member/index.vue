<template>
  <div>
    <!-- 卡片视图区 -->
    <el-card>
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search" />
      </el-input>

      <!-- 用户列表 -->
      <el-table :data="membersList" stripe border>
        <el-table-column type="index" label="#" />
        <el-table-column label="姓名" prop="nickname" />
        <el-table-column label="学号" prop="username" />
        <el-table-column label="活跃度" prop="honor" />
        <el-table-column label="角色" prop="role" />
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button type="primary" @click="pushToDetail(scope.row.userid)">查看</el-button>
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
    </el-card>
  </div>
</template>

<script>
import { getMemberList } from '@/api/user'
export default {
  name: 'ClubMember',
  data() {
    return {
      listLoading: true,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      membersList: []
    }
  },
  created() {
    this.getMembersList()
  },
  methods: {
    getMembersList() {
      this.listLoading = true
      getMemberList(this.queryInfo).then(response => {
        if (response.status === 200) {
          this.$message.success('获取成员列表成功')
          this.membersList = response.data
        } else {
          return this.$message.error('获取成员列表失败')
        }
        console.log(this.membersList)
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getMembersList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
    },
    // 跳转到成员信息详细页面
    pushToDetail(userId) {
      this.$router.push({ path: '/detail', query: { userid: userId }})
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
