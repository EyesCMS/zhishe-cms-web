<template>
  <div>
    <h2 align="center" />
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="申请原因">
        <el-input v-model="form.reason" placeholder="请输入申请原因" />
      </el-form-item>
      <div style="text-align:center">
        <el-button type="primary" @click="postIdentifyApply">申请认证</el-button>
        <el-button @click="renew">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { postIdentifyApply } from '@/api/club'
export default {
  data() {
    return {
      clubId: 10013,
      form: {
        reason: ''
      }
    }
  },
  created() {
    if (this.$route.query.cid !== undefined) {
      this.clubId = this.$route.query.cid
      console.log('接收cid')
      console.log('clubId为' + this.clubId)
      sessionStorage.setItem('clubId', this.clubId)
    }
    localStorage.setItem('clubid', this.clubid)
  },
  methods: {
    postIdentifyApply() {
      if (this.form.reason) {
        const param = {
          clubId: this.clubId,
          reason: this.form.reason
        }
        postIdentifyApply(param).then(response => {
          if (response.status === 201) {
            this.$alert('提交成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `已申请认证社团！`
                })
              }
            })
            this.form.reason = ''
          } else {
            return this.$message.error('申请认证社团失败')
          }
        })
      } else {
        this.$alert('申请原因不能为空！', {
          confirmButtonText: '确定'
        })
      }
    },
    renew() {
      this.form.reason = ''
    }
  }
}
</script>
