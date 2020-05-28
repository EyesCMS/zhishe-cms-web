<template>
  <div>
    <el-card>
      <el-row>
        <el-table
          :data="leaderChangeApply"
          stripe
          border
        >
          <el-table-column
            type="index"
            label="#"
          />
          <el-table-column
            label="申请时间"
            prop="createAt"
          />
          <el-table-column
            label="申请原因"
            prop="reason"
          />
          <el-table-column
            label="申请状态"
            prop="state"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.state === 0"
                style="text-align:center"
                type="warning"
                :disable-transitions="true"
                effect="dark"
              >{{ scope.row.state | statusFilter }}</el-tag>
              <el-tag
                v-else-if="scope.row.state === 1"
                style="text-align:center"
                type="success"
                :disable-transitions="true"
                effect="dark"
              >{{ scope.row.state | statusFilter }}</el-tag>
              <el-tag
                v-else
                style="text-align:center"
                type="danger"
                :disable-transitions="true"
                effect="dark"
              >{{ scope.row.state | statusFilter }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <div
      v-show="formVisiable"
      class="change"
    >
      <el-card>
        <el-row>
          <h3>社长换届申请</h3>
          <!-- 社长换届表单显示 -->
          <el-form
            ref="Form"
            :model="leaderChange"
            :rules="rules"
            label-width="100px"
          >
            <!-- 社团名称 -->
            <el-form-item label="社团名称">
              <el-input
                v-model="leaderChange.clubname"
                :readonly="readOnly"
                :disabled="true"
              />
            </el-form-item>
            <!-- 原社长 -->
            <el-form-item label="原社长">
              <el-input
                v-model="leaderChange.oldChiefName"
                :readonly="readOnly"
                :disabled="true"
              />
            </el-form-item>
            <!-- 新社长 -->
            <el-form-item
              label="新社长"
              prop="newChiefName"
            >
              <el-input
                v-model="leaderChange.newChiefName"
                placeholder="请输入新社长姓名"
              />
            </el-form-item>
            <!-- 换届原因 -->
            <el-form-item
              label="原因"
              prop="reason"
            >
              <el-input
                v-model="leaderChange.reason"
                type="textarea"
                placeholder="请输入换届原因"
              >换届原因</el-input>
            </el-form-item>
            <!-- 提交按钮 -->
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm"
              >提交</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </el-card>

    </div>
  </div>
</template>

<script>
import { leaderchange, getClubDetail, getLeaderChangeApply } from '@/api/club'
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
      leaderChange: {
        clubId: window.sessionStorage.getItem('clubId'),
        clubname: '这是社团名称',
        oldChiefName: '老社长',
        oldChiefId: 'oldId',
        newChiefName: '',
        reason: ''
      },
      formVisiable: false,
      readOnly: true,
      leaderChangeApply: [],
      rules: {
        newChiefName: [
          { required: true, message: '请输新社长名字', trigger: 'blur' }
          // { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        reason: [{ required: true, message: '请输入理由', trigger: 'blur' }]
      }
    }
  },
  created() {
    // 获取社长换届申请
    getLeaderChangeApply(this.leaderChange.clubId).then(response => {
      if (response.data.totalCount === 0) this.formVisiable = true
      else if (response.data.items[0].state !== 0) this.formVisiable = true
      this.leaderChangeApply = response.data.items
    })

    // 获取社团信息
    getClubDetail(this.leaderChange.clubId).then(response => {
      if (response.data) {
        this.leaderChange.clubname = response.data.name
        this.leaderChange.oldChiefName = response.data.chiefName
      } else {
        return this.$message.error('获取社团信息失败')
      }
    })
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs.Form.validate(async valid => {
        if (valid) {
          const data = {
            clubId: this.leaderChange.clubId,
            oldChiefId: this.leaderChange.oldChiefId,
            newChiefName: this.leaderChange.newChiefName,
            reason: this.leaderChange.reason
          }
          leaderchange(data).then(response => {
            if (response.status === 201) {
              this.$message.success('提交成功！')
              this.getApply()
              this.formVisiable = false
            } else {
              this.$message.error('提交失败！')
            }
          })
        } else this.$message.error('error submit!!')
      })
    },

    // 获取表单
    getApply() {
      getLeaderChangeApply(this.leaderChange.clubId).then(response => {
        this.leaderChangeApply = response.data.items
      })
    }
  }
}
</script>

<style lang="scss" scope>
.change {
  margin: 50px auto;
  width: 50%;
  margin-top: 100px;
  text-align: center;
}
</style>
