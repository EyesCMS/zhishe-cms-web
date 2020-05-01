<template>
  <div>
    <el-card>
      <!-- 用户列表 -->
      <el-table :data="addList" stripe border>
        <el-table-column type="index" label="#" />
        <el-table-column label="昵称" prop="applicant" width="150px" />
        <el-table-column label="申请理由" prop="reason" />
        <el-table-column label="申请时间" prop="createAt" width="200px" />
        <el-table-column label="状态" width="150px">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state === 0" style="text-align:center" type="warning" :disable-transitions="true" effect="dark">{{ scope.row.state | verifyStatusFilter }}</el-tag>
            <el-tag v-else-if="scope.row.state === 1" type="primary" :disable-transitions="true" effect="dark">{{ scope.row.state | verifyStatusFilter }}</el-tag>
            <el-tag v-else type="danger" :disable-transitions="true" effect="dark">{{ scope.row.state | verifyStatusFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220px">
          <template slot-scope="scope">
            <el-button type="primary" :disabled="isDisabled(scope.row.state)" @click="joinAudit(scope.row.id, 1)">同意</el-button>
            <el-button type="danger" :disabled="isDisabled(scope.row.state)" @click="joinAudit(scope.row.id, 2)">拒绝</el-button>
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
    </el-card>
  </div>
</template>

<script>
import { getAddList } from '@/api/club'
import { joinAudit } from '@/api/club'
export default {
  name: 'MemberAdd',
  filters: {
    verifyStatusFilter(value) {
      if (value === 0) {
        return '未审核'
      } else if (value === 1) {
        return '审核通过'
      } else {
        return '审核未通过'
      }
    }
  },
  data() {
    return {
      clubId: 5000,
      addList: [],
      queryInfo: {
        keyword: '',
        page: 1,
        limit: 5,
        sort: 'createAt',
        order: 'desc'
      },
      total: 0,
      publishStatusOptions: [
        {
          value: 0,
          label: '未审核'
        },
        {
          value: 1,
          label: '审核通过'
        },
        {
          value: 2,
          label: '审核未通过'
        }
      ]
    }
  },
  created() {
    // this.userId = this.$store.getters.userid
    this.getAddsList()
  },
  methods: {
    getAddsList() {
      getAddList(this.clubId, this.queryInfo).then(response => {
        console.log(response)
        this.addList = response.data.items
        this.total = response.data.totalCount
        console.log(this.addList)
      })
    },
    isDisabled(state) {
      if (state === 0) {
        return false
      }
      return true
    },
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.limit = newSize
      this.getAddsList()
    },
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getAddsList()
    },
    joinAudit(id, state) {
      const input = {
        id: id,
        state: state
      }
      joinAudit(input).then(response => {
        this.$message.success('已审批')
      })
      this.getAddsList()
    }
  }
}
</script>
<style>
.el-tag td{
  text-align: center !important
}
</style>
<style scoped lang="scss">
.el-pagination{
  margin-top: 20px;
}
</style>
