<template>
  <div style="margin-top: 15px;text-align:center;">
    <div style="margin-top: 15px;">
      <el-input v-model="search" placeholder="请输入内容" class="input-with-select">
        <el-select slot="prepend" v-model="select" placeholder="请选择">
          <el-option label="社团ID" value="1" />
          <el-option label="社团名称" value="2" />
          <el-option label="社长名称" value="3" />
        </el-select>
        <el-button slot="append" icon="el-icon-search" />
      </el-input>
    </div>
    <el-button type="primary" @click="ApplyToCreate()">创建社团</el-button>

    <!-- 社团列表 -->
    <el-table :data="clubsList" stripe border>
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
          <el-button type="primary" size="mini" @click="LookForDetail(scope.row.id,scope.row.name,scope.row.chiefName,scope.row.avatarUrl)">查看详情</el-button>
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
.el-select .el-input {
    width: 130px;
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
      search: '', // 复选框还未完成，缺select待讨论
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
      const params = {
        search: this.search,
        query: this.queryInfo
      }
      getClubsList(params).then(response => {
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
    LookForDetail(id, name, chiefName, avatarUrl) {
      this.$router.push({ path: '/clubDetail', query: { id: id, name: name, chiefName: chiefName, avatarUrl: avatarUrl }})
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
