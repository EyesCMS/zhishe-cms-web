<template>
  <div style="margin-top: 15px;text-align:center;">
    <el-input v-model="search" placeholder="请输入社团名称" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="Search()" />
    </el-input>
    <el-button type="primary" @click="ApplyToCreate()">创建社团</el-button>

    <!-- 社团列表 -->
    <el-table :data="clubsList" stripe border>
      <el-table-column label="序号" prop="id" />
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
          <el-button type="primary" size="mini" @click="LookForDetail(scope.row.id,scope.row.name,scope.row.chiefName)">查看详情</el-button>
          <el-button type="primary" size="mini" @click="ApplyToJoin(scope.row.name)">申请加入</el-button>
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
import { getClubsList } from '@/api/club'
export default {
  name: 'Clubs',
  data() {
    return {
      search: '',
      listLoading: true,
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      clubsList: []
    }
  },
  created() {
    this.getClubsList()
  },
  methods: {
    getClubsList() {
      this.listLoading = true
      getClubsList(this.queryInfo).then(response => {
        if (response.status === 200) {
          this.clubsList = response.data.items
          this.total = response.data.totalCount
        } else {
          return this.$message.error('获取社团列表失败')
        }
        console.log(this.clubsList)
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.limit = newSize
      this.getClubsList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getClubsList()
    },
    // 跳转到社团信息详细页面
    LookForDetail(id, name, chiefName) {
      this.$router.push({ path: '/clubDetail', query: { id: id, name: name, chiefName: chiefName }})
    },
    ApplyToCreate() {
      this.$router.replace('/createClub')
    },
    // 申请加入社团
    ApplyToJoin(name) {
      this.$router.push({ path: '/joinClub', query: { name: name }})
    }
  }
}
</script>
