<template>
  <div>
    <h2 align="center" />
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="申请原因">
        <el-input v-model="form.reason" placeholder="请输入申请原因" />
      </el-form-item>
      <el-form-item label="附件">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
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
      clubId: 0,
      fileList: [
      ],
      form: {
        reason: ''
      }
    }
  },
  created() {
    if (this.$route.query.cid) {
      this.clubId = this.$route.query.cid
    }
    localStorage.setItem('clubid', this.clubid)
  },
  methods: {
    postIdentifyApply() {
      const param = {
        clubId: this.clubId,
        reason: this.form.reason,
        form: this.form
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
        } else {
          return this.$message.error('申请认证社团失败')
        }
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
      this.form.reason = ''
    }
  }
}
</script>
