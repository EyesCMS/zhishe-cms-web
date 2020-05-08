<template>
  <div>
    <div class="change">
      <h3>社长换届申请</h3>
      <!-- 社长换届表单显示 -->
      <el-form ref="Form" :model="leaderChange" :rules="rules" label-width="100px">
        <!-- 社团名称 -->
        <el-form-item label="社团名称">
          <el-input v-model="leaderChange.clubname" style="width:550px;" :readonly="readOnly" :disabled="true" />
        </el-form-item>
        <!-- 原社长 -->
        <el-form-item label="原社长">
          <el-input v-model="leaderChange.oldChiefName" style="width:550px;" :readonly="readOnly" :disabled="true" />
        </el-form-item>
        <!-- 新社长 -->
        <el-form-item label="新社长" prop="newChiefName">
          <el-input v-model="leaderChange.newChiefName" style="width:550px;" placeholder="请输入新社长姓名" />
        </el-form-item>
        <!-- 换届原因 -->
        <el-form-item label="原因" prop="reason">
          <el-input v-model="leaderChange.reason" type="textarea" style="width:550px;" placeholder="请输入换届原因">换届原因</el-input>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
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
      readOnly: true,
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
          // const result = await leaderchange(data)
          // console.log(result)
          leaderchange(data).then(response => {
            if (response.status === 201) {
              this.$message.success('提交成功！')
            } else {
              this.$message.error('提交失败！')
            }
          })
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
