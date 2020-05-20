<template>
  <div class="app-container">
    <div v-if="clubInfo">
      <el-row :gutter="20">

        <el-col
          :span="6"
          :xs="24"
        >
          <el-card>
            <el-tabs v-model="leftActiveTab">
              <el-tab-pane label="关于社团" name="about"><user-card :clubinfo="clubInfo" /></el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

        <el-col
          :span="18"
          :xs="24"
        >
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane
                label="社团信息"
                name="account"
              >
                <account :clubinfo="clubInfo" />
              </el-tab-pane>
              <el-tab-pane label="相册展示" name="carousel">
                <p>选择图片上传相册</p>

                <el-upload
                  ref="upload"
                  action="${pageContext.request.contextPath}/lookup/editEvidence/123"
                  :multiple="multiple"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-plus" />
                </el-upload>
                <!-- <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog> -->
                <el-button @click="subPicForm">确定上传</el-button>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { getClubDetail } from '@/api/club'
import { uploadLocalImages } from '@/api/club'
// import { postCarousel } from '@/api/club'
import UserCard from './components/UserCard'
import Account from './components/Account'
// import { config } from '@vue/test-utils'

export default {
  name: 'Profile',
  components: { UserCard, Account },
  data() {
    return {
      clubInfo: {},
      clubId: window.sessionStorage.getItem('clubId'),
      leftActiveTab: 'about',
      activeTab: 'account',
      images: '',
      showUpload: false,
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      imgsUrl: [],
      formData: '',
      // test: '',
      multiple: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      uploadComplete: true // 图片上传完成状态
    }
  },
  created() {
    this.getClubDetial()
  },
  methods: {
    getClubDetial() {
      this.clubId
      getClubDetail(this.clubId).then(response => {
        // console.log('@club-detail getClubDetial reaponse:')
        // console.log(response)
        if (response.data) {
          this.clubInfo = response.data
          // console.log('detile=' + this.clubInfo)
        } else {
          return this.$message.error('????????')
        }
      })
    },
    uploadImgs() {
      console.log(123)
      console.log(this.imgsList)
    },
    uploadFile(file) {
      this.formData.append('image', file.file)
      // this.test = '123abc'
      console.log(file.file)
    },
    subPicForm() {
      this.formData = new FormData()
      this.$refs.upload.submit()
      this.formData.append('WS_CODE', '12133')
      // const config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }
      console.log(this.formData)
      uploadLocalImages(this.clubId, this.formData).then(response => {
        this.imgsUrl = response.data
        console.log(response)
        // this.$message.success('上传成功')
      })
    },
    // 上传图片前调用
    beforeAvatarUpload(file) {
      const isValidStyle = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isValidStyle) {
        this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isValidStyle && isLt2M) {
        this.fileList.push(file)
      }
      // 不自动上传
      return isValidStyle && isLt2M
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 确认添加
    async addEnsure() {
      if (!this.uploadComplete) {
        this.$message.error('图片正在上传，请稍等')
        return
      }
      console.log(this.images)
      const image = new FormData()
      for (var i = 0; i < this.fileList.length; ++i) {
        image.append(this.fileList[i].name, this.fileList[i])
      }
      await uploadLocalImages(this.clubId, image).then(response => {
        this.imgsUrl = response.data
        // this.$message.success('上传成功')
      })
      // 调用接口
      // await postCarousel(this.clubId, this.imgsUrl).then(response => {
      //   if (response.status === 204) {
      //     this.$message.success('上传成功')
      //   }
      // })
    //  postCarousel(this.clubId, )
    }
  }
}
</script>
