<template>
  <div>
    <el-card shadow="never">
      <el-steps :active="active" align-center>
        <el-step title="填写社团信息" />
        <el-step title="等待管理员审核" />
      </el-steps>
    </el-card>
    <div v-show="formShow" style="margin-left :auto; margin-right: auto; width: 700px ;margin-top: 30px;">
      <el-form ref="form" :model="form" :rules="formRules" label-width="150px">
        <el-form-item label="社团名称" prop="clubName">
          <el-input
            v-model="form.clubName"
            style="width: 500px;"
            placeholder="请输入社团名称"
            maxlength="20"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="申请人用户名">
          <el-input v-model="username" style="width: 500px;" :disabled="true" />
        </el-form-item>
        <el-form-item label="社团类别" prop="type">
          <el-select v-model="form.type" style="width: 500px;" placeholder="请选择社团类别">
            <el-option label="艺术" value="艺术" />
            <el-option label="运动" value="运动" />
            <el-option label="学习" value="学习" />
            <el-option label="休闲" value="休闲" />
            <el-option label="其他" value="其他" />
          </el-select>
        </el-form-item>
        <el-form-item label="申请原因" prop="reason">
          <el-input
            v-model="form.reason"
            style="width: 500px;"
            :rows="3"
            type="textarea"
            placeholder="请输入申请原因"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary" @click="postSubmit">立即创建</el-button>
          <el-button @click="renew">重置</el-button>
        </div>
      </el-form>
    </div>
    <div v-show="successShow" style="text-align: center; margin-top: 30px;">
      <i class="el-icon-success" style="font-size: 150px; color: #66CDAA;" />
      <p />
      <p style="font-size: 22px; color: #707070;">您已申请成功，请等待管理员审核!</p>
      <p />
      <el-button type="primary" @click="viewApplications">查看申请结果</el-button>
    </div>
  </div>
</template>

<script>
import { postSubmit } from '@/api/club'
export default {
  data() {
    return {
      formShow: true,
      successShow: false,
      active: 0,
      username: this.$store.getters.name,
      form: {
        clubName: '',
        type: '',
        reason: '',
        officialState: 0
      },
      formRules: {
        clubName: [
          { required: true, message: '请输入社团名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择社团类别', trigger: 'change' }
        ],
        reason: [{ required: true, message: '请输入申请原因', trigger: 'blur' }]
      }
    }
  },
  methods: {
    postSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        postSubmit(this.form).then(response => {
          if (response.status === 201) {
            if (this.active++ > 1) this.active = 0
            this.$alert('提交成功', '创建社团', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `创建成功！`
                })
              }
            })
            this.formShow = false
            this.successShow = true
          } else {
            return this.$message.error('创建社团失败')
          }
        })
      })
    },
    renew() {
      this.form.clubName = ''
      this.form.type = ''
      this.form.reason = ''
    },
    viewApplications() {
      this.$router.replace('/applications/creation')
    }
  }
}
</script>

