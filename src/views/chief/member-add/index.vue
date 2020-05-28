<template>
  <div>
    <el-card>
      <el-card>
        <div>
          <i class="el-icon-search" />
          <span>筛选搜索</span>
          <el-button
            style="float: right;"
            type="primary"
            size="small"
            @click="searchJoinApplies"
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
            <div>
              <el-form-item label="申请人">
                <el-input
                  v-model="queryInfo.applicant"
                  style="width: 200px;"
                  placeholder="请输入申请人"
                />
              </el-form-item>
              <el-form-item label="申请理由">
                <el-input
                  v-model="queryInfo.reason"
                  style="width: 200px;"
                  placeholder="请输入申请理由"
                />
              </el-form-item>
              <el-form-item label="申请状态">
                <el-select
                  v-model="queryInfo.state"
                  style="width: 203px;"
                  placeholder="请选择申请状态"
                >
                  <el-option
                    label="未审核"
                    value="0"
                  />
                  <el-option
                    label="审核通过"
                    value="1"
                  />
                  <el-option
                    label="审核未通过"
                    value="2"
                  />
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="申请时间">
                <el-date-picker
                  v-model="queryInfo.createAt"
                  type="datetime"
                  placeholder="选择开始时间"
                  align="right"
                  style="width: 203px"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :picker-options="pickerOptions"
                />
              </el-form-item> -->
            </div>
          </el-form>
        </div>
      </el-card>
      <el-card style="margin-top: 15px;">
        <!-- 用户列表 -->
        <el-table
          v-loading="listLoading"
          :data="addList"
          stripe
          border
        >
          <el-table-column
            type="index"
            label="#"
          />
          <el-table-column
            label="昵称"
            prop="applicant"
            width="150px"
          />
          <el-table-column
            label="申请理由"
            prop="reason"
          />
          <el-table-column
            label="申请时间"
            prop="createAt"
            width="200px"
          />
          <el-table-column
            label="状态"
            width="150px"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.state === 0"
                style="text-align: center;"
                type="warning"
                :disable-transitions="true"
                effect="dark"
              >
                {{ scope.row.state | verifyStatusFilter }}
              </el-tag>
              <el-tag
                v-else-if="scope.row.state === 1"
                type="primary"
                :disable-transitions="true"
                effect="dark"
              >
                {{ scope.row.state | verifyStatusFilter }}
              </el-tag>
              <el-tag
                v-else
                type="danger"
                :disable-transitions="true"
                effect="dark"
              >
                {{ scope.row.state | verifyStatusFilter }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="220px"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="medium"
                :disabled="judgeDisabled(scope.row.state)"
                @click="approveJoinApply(scope.row.id, 1)"
              >
                同意
              </el-button>
              <el-button
                type="danger"
                size="medium"
                :disabled="judgeDisabled(scope.row.state)"
                @click="approveJoinApply(scope.row.id, 2)"
              >
                拒绝
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
      listLoading: true,
      clubId: sessionStorage.getItem('clubId'),
      addList: [],
      queryInfo: {
        applicant: '',
        reason: '',
        createAt: '',
        state: '',
        page: 1,
        limit: 5
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
      ],
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  created() {
    // this.userId = this.$store.getters.userid
    this.getAddsListData()
  },
  methods: {
    // 获取申请加入列表数据
    getAddsListData() {
      this.listLoading = true
      getAddList(this.clubId, this.queryInfo).then(response => {
        this.addList = response.data.items
        this.total = response.data.totalCount
        this.listLoading = false
      })
    },

    // 判断是否禁用按钮
    judgeDisabled(state) {
      if (state === 0) {
        return false
      }
      return true
    },

    // 监听页值变化
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getAddsListData()
    },

    // 监听页码变化
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getAddsListData()
    },

    // 审批加入申请
    async approveJoinApply(id, state) {
      const input = {
        id: id,
        state: state
      }

      await joinAudit(input).then(response => {
        this.$message.success('已审批')
      })
      this.getAddsListData()
    },

    // 搜索加入申请
    searchJoinApplies() {
      this.queryInfo.page = 1
      this.getAddsListData()
    },

    // 重置搜索区
    cleanSearchField() {
      this.queryInfo.applicant = this.queryInfo.reason = this.queryInfo.state = this.queryInfo.createAt = ''
    }
  }
}
</script>

<style scoped lang="scss">
.el-tag td{
  text-align: center !important;
}

.el-pagination{
  margin-top: 30px;
  text-align: center;
}
</style>
