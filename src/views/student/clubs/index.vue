<template>
  <div style="padding: 20px;">
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
            <el-form-item label="输入搜索：">
              <el-input v-model="form.keyword" style="width: 203px" placeholder="请输入社团名称" />
            </el-form-item>
            <el-form-item label="社团类别：">
              <el-select v-model="form.type" placeholder="请选择分类" clearable style="width: 203px">
                <el-option label="艺术" value="艺术" />
                <el-option label="运动" value="运动" />
                <el-option label="学习" value="学习" />
                <el-option label="休闲" value="休闲" />
                <el-option label="其他" value="其他" />
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>
    <el-card style="margin-top: 20px;" shadow="never">
      <i class="el-icon-tickets" />
      <span>创建社团</span>
      <el-button style="float:right" size="small" type="primary" @click="ApplyToCreate()">创建</el-button>
    </el-card>

    <!-- 社团列表 -->
    <div style="margin-top: 20px;">
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
        <el-table-column label="社团类别" prop="type" />
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="LookForDetail(scope.row.id,scope.row.name,scope.row.chiefName,scope.row.avatarUrl)">查看详情</el-button>
            <el-button type="primary" size="mini" @click="ApplyToJoin(scope.row.id,scope.row.name)">申请加入</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页区域 -->
    <div style="text-align:center;margin-top: 10px;">
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
      listLoading: true,
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      clubsList: [],
      form: {
        keyword: '',
        type: ''
      }
    }
  },
  created() {
    this.getClubsList()
  },
  methods: {
    getClubsList() {
      this.listLoading = true
      const params = {
        keyword: this.form.keyword,
        type: this.form.type,
        page: this.queryInfo.page,
        limit: this.queryInfo.limit
      }
      getClubsList(params).then(response => {
        console.log(response)
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
    ApplyToJoin(id, name) {
      this.$router.push({ path: '/joinClub', query: { id: id, name: name }})
    },
    handleSearchList() {
      this.queryInfo.page = 1
      this.getClubsList()
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
