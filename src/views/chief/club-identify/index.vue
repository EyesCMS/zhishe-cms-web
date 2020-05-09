<template>
  <div>
    <el-card>
      <h2 align="center" />
      <el-row style="margin-top:20px">
        <el-button type="primary" @click="applyIdentify()">申请认证</el-button>
      </el-row>
    </el-card>
    <el-card>
      <!-- 社团认证申请列表 -->
      <el-table v-loading="listLoading" :data="identifyApplyList" stripe border>
        <el-table-column type="index" label="#" />
        <el-table-column label="申请时间" prop="createAt" />
        <el-table-column label="申请原因" prop="reason" />
        <el-table-column label="申请状态" prop="state">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state === 0" style="text-align:center" type="warning" :disable-transitions="true" effect="dark">{{ scope.row.state | statusFilter }}</el-tag>
            <el-tag v-else-if="scope.row.state === 1" style="text-align:center" type="success" :disable-transitions="true" effect="dark">{{ scope.row.state | statusFilter }}</el-tag>
            <el-tag v-else style="text-align:center" type="danger" :disable-transitions="true" effect="dark">{{ scope.row.state | statusFilter }}</el-tag>
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
      <el-dialog
        title="申请认证"
        :visible.sync="applyIdentifyDialogVisible"
        width="70%"
        center
        modal
        @close="applyIdentifyDialogClosed"
      >
        <el-form ref="form" :model="form">
          <el-form-item label="申请原因" label-width="70px">
            <el-input v-model="form.reason" placeholder="请输入申请原因" />
          </el-form-item>
          <div style="text-align:center">
            <el-button type="primary" @click="postIdentifyApply">申请认证</el-button>
            <el-button @click="renew">重置</el-button>
          </div>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { postIdentifyApply, getMyIdentifyApplyList } from '@/api/club'
export default {
  filters: {
    statusFilter(value) {
      if (value === 0) {
        return '待审核'
      } else if (value === 1) {
        return '已批准'
      } else {
        return '已退回'
      }
    }
  },
  data() {
    return {
      listLoading: true,
      clubId: sessionStorage.getItem('clubId'),
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      identifyApplyList: [],
      applyIdentifyDialogVisible: false,
      dialogVisible: false,
      form: {
        reason: ''
      }
    }
  },
  created() {
    this.getMyIdentifyApplyList()
  },
  methods: {
    getMyIdentifyApplyList() {
      this.listLoading = true
      getMyIdentifyApplyList(this.clubId, this.queryInfo).then(response => {
        if (response.status === 200) {
          this.$message.success('获取社团认证申请成功')
          this.identifyApplyList = response.data.items
          this.total = response.data.totalCount
          this.listLoading = false
        } else {
          this.listLoading = false
          return this.$message.error('获取社团认证申请失败')
        }
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getMyIdentifyApplyList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getMyIdentifyApplyList()
    },
    // 提交认证申请
    postIdentifyApply() {
      if (this.form.reason) {
        const param = {
          clubId: this.clubId,
          reason: this.form.reason
        }
        postIdentifyApply(param).then(response => {
          if (response.status === 201) {
            this.$alert('提交成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `已申请认证社团！`
                })
              }
            })
            this.form.reason = ''
          } else {
            return this.$message.error('申请认证社团失败')
          }
        })
      } else {
        this.$alert('申请原因不能为空！', {
          confirmButtonText: '确定'
        })
      }
    },
    renew() {
      this.form.reason = ''
    },
    applyIdentify() {
      this.applyIdentifyDialogVisible = true
    },
    applyIdentifyDialogClosed() {
      this.$refs.addFormRef.resetFields()
    }
  }
}
</script>
