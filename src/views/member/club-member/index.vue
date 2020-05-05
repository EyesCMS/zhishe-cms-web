<template>
  <div>
    <el-card style="margin: 15px 15px">
      <el-row>
        <i class="el-icon-search">筛选搜索</i>
      </el-row>
      <el-row style="margin-top: 25px" :gutter="10">
        <el-form ref="form" :model="queryInfo" label-width="80px">
          <el-col :span="10">
            <el-form-item label="昵称/用户名">
              <el-input v-model="queryInfo.name" placeholder="请输入昵称/用户名" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="头衔">
              <el-select v-model="form.selectedHonor" placeholder="请选择头衔">
                <el-option label="潜水" value="1" />
                <el-option label="冒泡" value="2" />
                <el-option label="吐槽" value="3" />
                <el-option label="活跃" value="4" />
                <el-option label="话痨" value="5" />
                <el-option label="传说" value="6" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row style="text-align: center; margin-top: 15px">
        <el-button type="primary" @click="getInvitationsList">查询</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </el-row>
    </el-card>
    <el-card>
      <el-input
        v-model="queryInfo.keyword"
        placeholder="请输入内容"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search" @click="getMembersList" />
      </el-input>
    </el-card>
    <!-- 卡片视图区 -->
    <el-card>

      <!-- 用户列表 -->
      <el-table :data="membersList" stripe border>
        <el-table-column type="index" label="#" />
        <el-table-column label="昵称" prop="nickname" />
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="头衔" prop="honor" />
        <el-table-column label="积分" prop="credit" />
        <el-table-column label="角色" prop="role" />
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button type="primary" @click="pushToDetail(scope.row.userId)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>
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

<script>
import { getMemberList } from '@/api/club'
export default {
  name: 'ClubMember',
  data() {
    return {
      listLoading: true,
      clubId: sessionStorage.getItem('clubId'),
      queryInfo: {
        name: '',
        honorId: '',
        page: 1,
        limit: 5
      },
      selectedHonor: '',
      total: 0,
      membersList: []
    }
  },
  created() {
    // this.clubId = sessionStorage.getItem('clubId')
    // this.clubId = localStorage.getItem('clubid')
    this.getMembersList()
  },
  methods: {
    getMembersList() {
      this.listLoading = true
      getMemberList(this.clubId, this.queryInfo).then(response => {
        // console.log('response为' + response.status)
        this.membersList = response.data.items
        this.total = response.data.totalCount
        console.log(this.membersList)
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.limit = newSize
      this.getMembersList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getMembersList()
    },
    // 跳转到成员信息详细页面
    pushToDetail(userId) {
      this.$router.push({ path: 'detail', query: { userId: userId }})
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
