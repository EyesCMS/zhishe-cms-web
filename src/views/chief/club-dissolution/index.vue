<template>
  <div>
    <el-card>
      <el-row>
        <!-- 解散社团列表 -->
        <el-table
          :data="dissolutionApply"
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
    <!-- 解散社团表格 -->
    <div
      v-show="dissolutionVisiable"
      class="dissolution"
    >
      <el-card>
        <el-row>
          <h3>社团解散申请</h3>
          <!-- 社团解散表单显示 -->
          <el-form
            ref="Form"
            :model="dissolution"
            :rules="rules"
            label-width="100px"
          >
            <!-- 社团名称 -->
            <el-form-item
              prop="clubName"
              label="社团名称"
            >
              <el-input
                v-model="dissolution.clubName"
                :readonly="readonly"
                :disabled="true"
              />
            </el-form-item>
            <!-- 申请人 -->
            <el-form-item
              prop="applicant"
              label="申请人"
            >
              <el-input
                v-model="dissolution.applicant"
                :readonly="readonly"
                :disabled="true"
              />
            </el-form-item>
            <!-- 换届原因 -->
            <el-form-item label="原因">
              <el-input
                v-model="dissolution.reason"
                type="textarea"
                :span="5"
                placeholder="请输入解散原因"
              />
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
import { dissolution, getClubDetail, getDissolutionApply } from '@/api/club'
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
      dissolution: {
        clubName: '',
        clubId: window.sessionStorage.getItem('clubId'),
        applicant: '',
        accessoryUrl: '',
        reason: ''
      },
      dissolutionApply: [
        {
          id: 1,
          clubName: '羽毛球社',
          createAt: '2018-04-19 18:14:12',
          reason: 'xxx',
          state: 0
        }
      ],
      dissolutionVisiable: false,
      readonly: true,
      rules: {
        clubName: [
          { required: true, message: '社团名字不为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 获取解散社团列表
    getDissolutionApply(this.dissolution.clubId).then(response => {
      // console.log('@getDissolutionApply response')
      // console.log(response)
      this.dissolutionApply = response.data.items
      if (response.data.totalCount === 0 || response.data.items[0].state !== 0) {
        // console.log(response.data.items[0])
        this.dissolutionVisiable = true
      } else this.dissolutionVisiable = false
    })

    // 获取社团详情
    getClubDetail(window.sessionStorage.getItem('clubId')).then(response => {
      // console.log('@club-dissolution getClubDetial reaponse:')
      // console.log(response)
      if (response.data) {
        this.dissolution.clubName = response.data.name
        this.dissolution.applicant = response.data.chiefName
      } else {
        return this.$message.error('获取社团信息失败')
      }
    })
  },
  methods: {
    // 提交换届申请表单
    submitForm() {
      this.$refs.Form.validate(async valid => {
        if (valid) {
          const data = {
            clubId: this.dissolution.clubId,
            applicant: this.dissolution.applicant,
            accessoryUrl: this.dissolution.accessoryUrl,
            reason: this.dissolution.reason
          }
          dissolution(data).then(response => {
            // console.log('@ clubDissolution submitForm')
            // console.log(response)
            if (response.status === 201) {
              this.$message.success('申请已提交')
              this.getDissolutionApply()
              this.dissolutionVisiable = false
            } else {
              this.$message.error('提交失败')
            }
          })
        } else this.$message.error('error submit!!')
      })
    },

    // 获取解散社团的历史申请记录
    getDissolutionApply() {
      getDissolutionApply(this.dissolution.clubId).then(response => {
        // console.log('@getDissolutionApply response')
        // console.log(response)
        this.dissolutionApply = response.data.items
      })
    }
  }
}
</script>

<style lang="scss" scope>
.dissolution {
  width: 50%;
  margin: 50px auto;
  margin-top: 100px;
  text-align: center;
}
</style>
