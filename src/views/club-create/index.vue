<template>
  <div>
    <h2 align="center" />
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="社团名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="申请人用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="社团类别">
        <el-select v-model="form.region" placeholder="请选择社团类别">
          <el-option label="艺术" value="art" />
          <el-option label="运动" value="sport" />
          <el-option label="学习" value="study" />
          <el-option label="休闲" value="play" />
          <el-option label="其他" value="other" />
        </el-select>
      </el-form-item>
      <el-form-item label="申请原因">
        <el-input v-model="form.reason" />
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
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <div style="text-align:center">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      this.$alert('提交成功', '创建社团', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: $ { action }`
          })
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
    }
  }
}
</script>
