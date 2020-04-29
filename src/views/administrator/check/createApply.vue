<template>
  <div>
    <!-- 卡片视图区 -->
    <el-card>
      <el-form :inline="true" :model="form" label-width="200px">
        <el-form-item label="申请人" prop="applicant">
          <el-input v-model="form.applicant" placeholder="" />
        </el-form-item>
        <el-form-item label="社团名称">
          <el-input v-model="form.clubName" placeholder="" />
        </el-form-item>
        <el-form-item label="官方状态" prop="officialState">
          <el-select v-model="form.officialState" placeholder="请选择">
            <el-option label="非正式" value="0" />
            <el-option label="正式" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-form-item prop="createAt">
            <el-date-picker v-model="form.createAt" type="date" placeholder="选择日期" style="width: 90%;" />
          </el-form-item>
        </el-form-item>
        <div style="text-align:center">
          <el-button type="primary" @click="check">查询</el-button>
          <el-button type="primary" @click="renew">重置</el-button>
        </div>
      </el-form>
      <!-- 社团创建申请列表 -->
      <el-table :data="createApplyList" stripe border>
        <el-table-column type="index" label="#" />
        <el-table-column label="社团名称" prop="clubName" />
        <el-table-column label="申请时间" prop="createAt" />
        <el-table-column label="申请人" prop="applicant" />
        <el-table-column label="申请原因" prop="reason" />
        <el-table-column label="" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" @click="pushToAgree(scope)">批准</el-button>
            <el-button type="primary" @click="pushToRefuse(scope)">退回</el-button>
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
import { getCreateApplyList, pushToCreateApply } from '@/api/club'
export default {
  name: 'CreateApply',
  data() {
    return {
      listLoading: true,
      clubId: 0,
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      createApplyList: [],
      form: {
        applicant: '',
        clubName: '',
        officialState: '',
        createAt: ''
      }
    }
  },
  created() {
    this.getCreateApplyList()
  },
  methods: {
    getCreateApplyList() {
      this.listLoading = true
      const param = {
        applicant: this.form.applicant,
        clubName: this.form.clubName,
        officialState: this.form.officialState,
        createAt: this.form.createAt,
        query: this.queryInfo
      }
      getCreateApplyList(param).then(response => {
        if (response.status === 200) {
          this.$message.success('获取社团创建申请成功')
          this.createApplyList = response.items
          this.total = response.total_count
        } else {
          return this.$message.error('获取社团创建申请失败')
        }
        console.log(this.createApplyList)
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.limit = newSize
      this.getCreateApplyList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getCreateApplyList()
    },
    // 修改申请状态
    pushToAgree({ $index, row }) {
      const data = {
        id: row.id,
        state: 1
      }
      pushToCreateApply(data).then(response => {
        if (response.status === 204) {
          this.$message.success('审核申请成功')
        } else {
          return this.$message.error('审核申请失败')
        }
        this.createApplyList.splice($index, 1)
      })
    },
    pushToRefuse({ $index, row }) {
      const data = {
        id: row.id,
        state: 2
      }
      pushToCreateApply(data).then(response => {
        if (response.status === 204) {
          this.$message.success('审核申请成功')
        } else {
          return this.$message.error('审核申请失败')
        }
        this.createApplyList.splice($index, 1)
      })
    },
    // 组合查询
    renew() {
      this.form.applicant = ''
      this.form.clubName = ''
      this.form.officialState = ''
      this.form.createAt = ''
    },
    check() {
      this.getCreateApplyList()
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
