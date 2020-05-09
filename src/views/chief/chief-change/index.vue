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
    </div>

  </div>
</template>

<script>
import { leaderchange, getClubDetail } from '@/api/club'
export default {
  data() {
    return {
      leaderChange: {
        club_id: window.sessionStorage.getItem('clubId'),
        clubname: '这是社团名称',
        oldChiefName: '老社长',
        oldChiefId: 'oldId',
        newChiefName: '',
        reason: ''
      },
      formVisiable: true,
      readOnly: true,
      leaderChangeApply: [],
      rules: {
        newChiefName: [
          { required: true, message: '请输新社长名字', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        reason: [
          { required: true, message: '请输入理由', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    getClubDetail(window.sessionStorage.getItem('clubId')).then(response => {
      console.log('@chief-change created reaponse:')
      console.log(response)
      if (response.data) {
        this.leaderChange.clubname = response.data.name
        this.leaderChange.oldChiefName = response.data.chiefName
        // console.log('detile=' + this.clubInfo)
      } else {
        return this.$message.error('获取社团信息失败')
      }
    })
  },
  methods: {
    submitForm() {
      this.$refs.Form.validate(async valid => {
        if (valid) {
          const data = {
            clubId: this.leaderChange.club_id,
            oldChiefId: this.leaderChange.oldChiefId,
            newChiefName: this.leaderChange.newChiefName,
            reason: this.leaderChange.reason
          }
          const result = await leaderchange(data)
          console.log(result)
          if (result.Status === 201) {
            this.$message.success('修改成功！')
          } else {
            this.$message.error('修改失败')
          }
        } else this.$message.error('error submit!!')
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
