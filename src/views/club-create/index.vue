<template>
  <div>
    <h2 align="center" />
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="社团名称">
        <el-input v-model="form.name" placeholder="请输入社团名称" />
      </el-form-item>
      <el-form-item label="申请人用户名">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="社团类别">
        <el-select v-model="form.category" placeholder="请选择社团类别">
          <el-option label="艺术" value="art" />
          <el-option label="运动" value="sport" />
          <el-option label="学习" value="study" />
          <el-option label="休闲" value="play" />
          <el-option label="其他" value="other" />
        </el-select>
      </el-form-item>
      <el-form-item label="申请原因">
        <el-input v-model="form.reason" placeholder="请输入申请原因" />
      </el-form-item>
      <div style="text-align:center">
        <el-button type="primary" @click="postSubmit">立即创建</el-button>
        <el-button @click="renew">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { postSubmit } from '@/api/club'
export default {
  data() {
    return {
      form: {
        name: '',
        username: '',
        category: '',
        reason: ''
      }
    }
  },
  methods: {
    postSubmit() {
      postSubmit(this.form).then(response => {
        if (response.status === 201) {
          this.$alert('提交成功', '创建社团', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `创建成功！`
              })
            }
          })
        } else {
          return this.$message.error('创建社团失败')
        }
        console.log(this.clubsList)
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 $ { file.name }？`)
    },
    renew() {
      this.form.name = ''
      this.form.username = ''
      this.form.category = ''
      this.form.reason = ''
    }
  }
}
</script>
