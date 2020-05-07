<template>
  <div>

    <div class="dissolution">
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
        <!-- 附件 -->
        <el-form-item label="附件">
          <el-input v-model="dissolution.accessoryUrl" />
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
    </div>
  </div>
</template>

<script>
import { dissolution, getClubDetail } from '@/api/club'
export default {
  data() {
    return {
      dissolution: {
        clubName: '这是社团名字',
        clubId: window.sessionStorage.getItem('clubId'),
        applicant: '申请人姓名',
        accessoryUrl: '',
        reason: ''
      },
      readonly: true,
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
  created() {
    getClubDetail(window.sessionStorage.getItem('clubId')).then(response => {
      console.log('@club-dissolution getClubDetial reaponse:')
      console.log(response)
      if (response.data) {
        this.dissolution.clubName = response.data.name
        this.dissolution.applicant = response.data.chiefName
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
.dissolution {
  width: 50%;
  margin: 50px auto;
  margin-top: 100px;
  text-align: center;
}
</style>
