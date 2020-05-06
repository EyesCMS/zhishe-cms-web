<template>
  <div>
    <h2 align="center" />
    <el-form ref="form" :model="form" :rules="formRules" label-width="150px">
      <el-form-item label="社团名称" prop="clubName">
        <el-input v-model="form.clubName" placeholder="请输入社团名称" />
      </el-form-item>
      <el-form-item label="申请人用户名">
        <el-input v-model="username" :disabled="true" />
      </el-form-item>
      <el-form-item label="社团类别" prop="type">
        <el-select v-model="form.type" placeholder="请选择社团类别">
          <el-option label="艺术" value="艺术" />
          <el-option label="运动" value="运动" />
          <el-option label="学习" value="学习" />
          <el-option label="休闲" value="休闲" />
          <el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>
      <el-form-item label="申请原因" prop="reason">
        <el-input v-model="form.reason" placeholder="请输入申请原因" />
      </el-form-item>
      <!--社团上传头像组件
      <el-form-item label="社团头像" prop="avatarUrl">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
          list-type="picture"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>-->
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
      username: this.$store.getters.nickname,
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
        reason: [
          { required: true, message: '请输入申请原因', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    postSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
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
        })
      })
    },
    renew() {
      this.form.clubName = ''
      this.form.type = ''
      this.form.reason = ''
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

