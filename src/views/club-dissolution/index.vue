<template>
  <div>
    <el-card>
      <el-row>
        <el-col>
          <div>
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
                <el-input v-model="dissolution.clubName" />
              </el-form-item>
              <!-- 申请人 -->
              <el-form-item
                prop="applicant"
                label="申请人"
              >
                <el-input v-model="dissolution.applicant" />
              </el-form-item>
              <!-- 附件 -->
              <el-form-item label="附件">
                <el-input v-model="dissolution.accessoryUrl" />
              </el-form-item>
              <!-- 换届原因 -->
              <el-form-item label="原因">
                <textarea
                  v-model="dissolution.reason"
                  style="margin: 0px; width: 65%; height: 200px;"
                >解散原因</textarea>
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
import { dissolution } from '@/api/club'
export default {
  data() {
    return {
      dissolution: {
        clubName: '这是社团名字',
        clubId: 'club_id',
        applicant: '申请人姓名',
        accessoryUrl: '附加地址',
        reason: '没啥原因'
      },
      rules: {
        clubName: [
          { required: true, message: '社团名字不为空', trigger: 'blur' }
        ],
        applicant: [
          { required: true, message: '请输入申请人', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.Form.validate(async valid => {
        if (valid) {
          const data = {
            clubId: this.dissolution.clubId,
            applicant: this.dissolution.applicant,
            accessoryUrl: this.dissolution.accessoryUrl,
            reason: this.dissolution.reason
          }
          const result = await dissolution(data)
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
</style>
