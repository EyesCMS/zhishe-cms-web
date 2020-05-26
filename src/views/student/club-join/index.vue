<template>
  <div>
    <el-card shadow="never">
      <el-steps :active="active" align-center>
        <el-step title="填写申请信息" />
        <el-step title="等待社长审核" />
      </el-steps>
    </el-card>
    <div v-show="formShow" style="margin-top:30px">
      <el-form ref="form" :model="form" :rules="formRules" label-width="450px">
        <el-form-item label="申请人姓名">
          <el-input v-model="username" style="width:400px;" :disabled="true" />
        </el-form-item>
        <el-form-item label="社团名称">
          <el-input v-model="clubName" style="width:400px;" :disabled="true" />
        </el-form-item>
        <el-form-item label="申请原因" prop="reason">
          <el-input
            v-model="form.reason"
            style="width:400px;"
            :rows="3"
            type="textarea"
            placeholder="请输入申请原因"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
        <div style="text-align:center">
          <el-button type="primary" @click="ApplyToJoin">申请</el-button>
          <el-button @click="renew">重置</el-button>
        </div>
      </el-form>
    </div>
    <div v-show="successShow" style="text-align:center;margin-top:30px">
      <i class="el-icon-success" style="font-size:150px;color:#66CDAA" />
      <p />
      <p style="font-size:22px;color:#707070">您已申请成功，请等待社长审核!</p>
      <p />
      <el-button type="primary" @click="viewApplications">查看申请结果</el-button>
    </div>
  </div>
</template>
<script>
import { ApplyToJoin } from '@/api/club'
export default {
  data() {
    return {
      formShow: true,
      successShow: false,
      active: 0,
      clubName: this.$route.query.name,
      username: this.$store.getters.name,
      form: {
        id: this.$route.query.id,
        reason: ''
      },
      formRules: {
        reason: [{ required: true, message: '请输入申请原因', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ApplyToJoin() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        const data = {
          clubId: this.form.id,
          reason: this.form.reason
        }
        ApplyToJoin(data).then(response => {
          if (response.status === 201) {
            if (this.active++ > 1) this.active = 0
            this.$alert('提交成功', '申请加入社团', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `提交成功！`
                })
              }
            })
            this.formShow = false
            this.successShow = true
          } else {
            return this.$message.error('申请加入社团失败')
          }
        })
      })
    },
    renew() {
      this.form.reason = ''
    },
    viewApplications() {
      this.$router.replace('/applications/join')
    }
  }
}
</script>
