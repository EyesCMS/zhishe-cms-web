<template>
  <div>
    <el-card style="margin: 15px 15px;">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button
          style="float: right;"
          type="primary"
          size="small"
          @click="searchMembers"
        >
          查询
        </el-button>
        <el-button
          style="float: right; margin-right: 15px;"
          size="small"
          @click="cleanSearchField"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 55px;">
        <el-form
          :inline="true"
          :model="queryInfo"
          size="small"
          label-width="140px"
        >
          <div style="text-align: center;">
            <el-form-item label="昵称/用户名">
              <el-input
                v-model="queryInfo.name"
                style="width: 300px;"
                placeholder="请输入昵称/用户名"
                @keyup.enter.native="searchMembers"
              />
            </el-form-item>
            <el-form-item label="头衔：">
              <el-select
                v-model="queryInfo.honorId"
                placeholder="请选择分类"
                clearable
                style="width: 300px;"
                @change="searchMembers"
              >
                <el-option
                  label="潜水"
                  value="1"
                />
                <el-option
                  label="冒泡"
                  value="2"
                />
                <el-option
                  label="吐槽"
                  value="3"
                />
                <el-option
                  label="活跃"
                  value="4"
                />
                <el-option
                  label="话痨"
                  value="5"
                />
                <el-option
                  label="传说"
                  value="6"
                />
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <!-- 卡片视图区 -->
    <el-card style="margin: 15px 15px;">

      <!-- 用户列表 -->
      <el-table
        :data="membersList"
        stripe
        border
      >
        <el-table-column
          type="index"
          label="#"
        />
        <el-table-column
          label="昵称"
          prop="nickname"
        />
        <el-table-column
          label="用户名"
          prop="username"
        />
        <el-table-column
          label="头衔"
          prop="honor"
        />
        <el-table-column
          label="积分"
          prop="credit"
        />
        <el-table-column
          label="角色"
          prop="role"
        />
        <el-table-column
          label="操作"
          width="100px"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="enterMemberDetail(scope.row.userId)"
            >
              查看
            </el-button>
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
      style="margin: 25px 15px; text-align: center;"
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
      total: 0,
      membersList: []
    }
  },
  created() {
    this.getMembersListData()
  },
  methods: {
    getMembersListData() {
      this.listLoading = true
      getMemberList(this.clubId, this.queryInfo).then(response => {
        this.membersList = response.data.items
        this.total = response.data.totalCount
      })
    },

    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getMembersListData()
    },

    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getMembersListData()
    },

    // 跳转到成员信息详细页面
    enterMemberDetail(userId) {
      this.$router.push({ path: 'detail', query: { userId: userId } })
    },

    searchMembers() {
      this.queryInfo.page = 1
      this.getMembersListData()
    },

    cleanSearchField() {
      this.queryInfo.name = this.queryInfo.honorId = ''
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
