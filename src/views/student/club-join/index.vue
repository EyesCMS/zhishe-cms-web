<template>
  <div>
    <h2 align="center" />
    <el-form ref="form" :model="form" :rules="formRules" label-width="150px">
      <el-form-item label="申请人ID">
        <el-input v-model="userid" :disabled="true" />
      </el-form-item>
      <el-form-item label="社团名称">
        <el-input v-model="clubName" :disabled="true" />
      </el-form-item>
      <el-form-item label="申请原因" prop="reason">
        <el-input v-model="form.reason" placeholder="请输入申请原因" />
      </el-form-item>
      <div style="text-align:center">
        <el-button type="primary" @click="ApplyToJoin">申请</el-button>
        <el-button @click="renew">重置</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { ApplyToJoin } from '@/api/club'
export default {
  data() {
    return {
      clubName: this.$route.query.name,
      userid: this.$store.getters.userid,
      form: {
        id: this.$route.query.id,
        reason: ''
      },
      formRules: {
        reason: [
          { required: true, message: '请输入申请原因', trigger: 'blur' }
        ]
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
        console.log(data)
        ApplyToJoin(data).then(response => {
          if (response.status === 201) {
            this.$alert('提交成功', '申请加入社团', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `提交成功！`
                })
              }
            })
          } else {
            return this.$message.error('申请加入社团失败')
          }
        })
      })
    },
    renew() {
      this.form.reason = ''
    }
  }
}
</script>
