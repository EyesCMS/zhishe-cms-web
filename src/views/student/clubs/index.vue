<template>
  <div style="padding: 15px;">
    <el-card shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button style="float: right;" type="primary" size="small" @click="findClubsListData">查询</el-button>
        <el-button
          style="float: right;margin-right: 15px;"
          size="small"
          @click="handleResetSearch"
        >重置</el-button>
      </div>
      <div style="margin-top: 15px;">
        <el-form :inline="true" :model="form" size="small" label-width="140px">
          <div style="text-align: center;">
            <el-form-item label="输入搜索：">
              <el-input v-model="form.keyword" style="width: 203px;" placeholder="请输入社团名称" />
            </el-form-item>
            <el-form-item label="社团类别：">
              <el-select v-model="form.type" placeholder="请选择分类" clearable style="width: 203px;">
                <el-option label="艺术" value="艺术" />
                <el-option label="运动" value="运动" />
                <el-option label="学习" value="学习" />
                <el-option label="休闲" value="休闲" />
                <el-option label="其他" value="其他" />
              </el-select>
            </el-form-item>
            <el-form-item label="官方状态：">
              <el-select v-model="form.state" placeholder="请选择分类" clearable style="width: 203px;">
                <el-option label="非官方" value="0" />
                <el-option label="官方" value="1" />
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <!-- 社团列表 -->
    <div style="margin-top: 20px;">
      <el-table v-loading="listLoading" :data="clubsList" stripe border>
        <el-table-column label="社团ID" prop="id" />
        <el-table-column label="社团头像" prop="avatarUrl">
          <template slot-scope="scope" width="40">
            <el-image :src="scope.row.avatarUrl" style="width: 50px; height: 50px;" />
          </template>
        </el-table-column>
        <el-table-column label="社团名称" prop="name" />
        <el-table-column label="社长名称" prop="chiefName" />
        <el-table-column label="社团类别" prop="type" />
        <el-table-column label="官方状态" prop="state">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state === 0" type="info">{{ scope.row.state | statusFilter }}</el-tag>
            <el-tag v-else type="success">{{ scope.row.state | statusFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="LookForDetail(scope.row.id,scope.row.name,scope.row.chiefName,scope.row.avatarUrl)"
            >查看详情</el-button>
            <el-button
              v-if="scope.row.joinState === '未加入'"
              type="primary"
              size="mini"
              @click="ApplyToJoin(scope.row.id,scope.row.name)"
            >申请加入</el-button>
            <el-button
              v-else
              type="success"
              size="mini"
              @click="EnterToClub(scope.row.id)"
            >进入社团</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页区域 -->
    <div style="text-align: center; margin-top: 30px;">
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

<style scoped>
.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
<script>
import { getClubsListData } from '@/api/club'
export default {
  name: 'Clubs',
  filters: {
    statusFilter(value) {
      if (value === 0) {
        return '非官方'
      } else {
        return '官方'
      }
    }
  },
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
        type: '',
        state: ''
      }
    }
  },
  created() {
    this.getClubsListData()
  },
  methods: {
    getClubsListData() {
      this.listLoading = true
      const params = {
        keyword: this.form.keyword,
        type: this.form.type,
        state: this.form.state,
        page: this.queryInfo.page,
        limit: this.queryInfo.limit
      }
      getClubsListData(params).then(response => {
        if (response.status === 200) {
          // console.log(response)
          this.clubsList = response.data.items
          this.total = response.data.totalCount
          this.listLoading = false
        } else {
          this.listLoading = false
          return this.$message.error('获取社团列表失败')
        }
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getClubsListData()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getClubsListData()
    },
    // 跳转到社团信息详细页面
    LookForDetail(id, name, chiefName, avatarUrl) {
      this.$router.push({
        path: '/clubDetail',
        query: {
          id: id,
          name: name,
          chiefName: chiefName,
          avatarUrl: avatarUrl
        }
      })
    },
    // 申请加入社团
    ApplyToJoin(id, name) {
      this.$router.push({ path: '/joinClub', query: { id: id, name: name }})
    },
    EnterToClub(id) {
      this.$store.dispatch('user/changeRoles', 'member')
      this.$router.push({ path: '/clubstyle/index', query: { id: id }})
    },
    findClubsListData() {
      this.queryInfo.page = 1
      this.getClubsListData()
    },
    handleResetSearch() {
      this.form.keyword = ''
      this.form.type = ''
      this.form.state = ''
    }
  }
}
</script>
