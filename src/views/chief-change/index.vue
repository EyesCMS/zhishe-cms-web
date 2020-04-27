<template>
  <div>
    <el-card>
      <el-row>
        <el-col>
          <div>
            <h3>社长换届申请</h3>
            <!-- 社长换届表单显示 -->
            <el-form
              ref="Form"
              :model="leaderChange"
              :rules="rules"
              class="Form"
              label-width="100px"
            >
              <!-- 社团名称 -->
              <el-form-item label="社团名称">
                <el-input
                  v-model="leaderChange.clubname"
                  readonly="readonly"
                />
              </el-form-item>
              <!-- 原社长 -->
              <el-form-item label="原社长">
                <el-input
                  v-model="leaderChange.oldChiefName"
                  readonly="readonly"
                />
              </el-form-item>
              <!-- 新社长 -->
              <el-form-item
                label="新社长"
                prop="newChiefName"
              >
                <el-input v-model="leaderChange.newChiefName" />
              </el-form-item>
              <!-- 换届原因 -->
              <el-form-item
                label="原因"
                prop="reason"
              >
                <textarea
                  v-model="leaderChange.reason"
                  style="margin: 0px; width: 65%; height: 200px;"
                >换届原因</textarea>
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
        </el-col>

      </el-row>
    </el-card>
  </div>
</template>

<script>
import { leaderchange } from '../../api/club'
export default {
  data() {
    return {
      leaderChange: {
        club_id: 'club_id',
        clubname: '这是社团名称',
        oldChiefName: '老社长',
        oldChiefId: 'oldId',
        newChiefName: 'newName',
        reason: '没啥原因'
      },
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
  methods: {
    submitForm() {
      this.$refs.Form.validate(async valid => {
        if (valid) {
          const data = {
            club_id: this.leaderChange.club_id,
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
.Form {
  width: 60%;
  margin: 0 auto;
  background-color: aliceblue;
  margin: 0 auto;
}
</style>
