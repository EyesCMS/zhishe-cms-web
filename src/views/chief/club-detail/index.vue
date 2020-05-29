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
              <el-tab-pane
                label="关于社团"
                name="about"
              >
                <user-card :clubinfo="clubInfo" />
              </el-tab-pane>
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
              <el-tab-pane
                label="相册展示"
                name="carousel"
              >
                <p>选择图片上传相册</p>
                <p
                  v-show="fileList.length === 5"
                  style="color:red;"
                >上传数已达到最大(5张)</p>
                <el-upload
                  ref="upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                  :http-request="uploadFile"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :limit="5"
                >
                  <i class="el-icon-plus" />
                </el-upload>
                <div style="text-align:center;margin-top:20px">
                  <el-button
                    type="primary"
                    @click="addEnsure"
                  >确定上传</el-button>
                </div>
                <div style="margin-top:20px">
                  <p>已上传图片</p>
                  <el-image
                    v-for="(item, index) in carouselImgList"
                    :key="index"
                    :src="item"
                    style="width: 100px; height: 100px"
                  >
                    <div
                      slot="error"
                      class="image-slot"
                    >
                      {{ item }}
                      <i class="el-icon-picture-outline" />
                    </div>
                  </el-image>
                  <!-- <img   width="100%"  alt="社团图片"> -->
                </div>
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
import { listClubImgs } from '@/api/club'
import clubImg1 from '@/assets/images/club1.jpg'
import clubImg2 from '@/assets/images/club2.jpeg'
import clubImg3 from '@/assets/images/club3.jpeg'
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
      carouselImgList: [
        clubImg1,
        clubImg2,
        clubImg3
      ],
      uploadComplete: true // 图片上传完成状态
    }
  },
  created() {
    this.getClubDetial()
    this.getClubImgs()
  },
  methods: {
    // 获取社团相册
    getClubImgs() {
      listClubImgs(this.clubId).then(response => {
        // console.log(response.data)
        this.carouselImgList = response.data
        // console.log(this.carouselImgList)
      })
    },

    // 获取社团信息
    getClubDetial() {
      getClubDetail(this.clubId).then(response => {
        // console.log('@club-detail getClubDetial reaponse:')
        // console.log(response)
        if (response.data) {
          this.clubInfo = response.data
          // console.log('detile=' + this.clubInfo)
        } else {
          return this.$message.error('获取失败！')
        }
      })
    },

    // 上传图片
    uploadFile(file) {
      this.fileList.push(file.file)
      // console.log(this.fileList)
    },

    // 上传图片前调用
    beforeAvatarUpload(file) {
      const isValidStyle = file.type === 'image/jpeg' || file.type === 'image/jpg' ||
       file.type === 'image/png' || file.type === 'image/svg' || file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isValidStyle) {
        this.$message.error('上传图片格式不正确!')
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

    // 删除图片
    handleRemove(file, fileList) {
      var index = this.fileList.indexOf(file)
      this.fileList.splice(index, 1)
      // console.log(file, fileList)
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    // 确认添加
    addEnsure: function () {
      if (!this.uploadComplete) {
        this.$message.error('图片正在上传，请稍等')
        return
      }
      // console.log(this.images)
      const fd = new FormData()
      // console.log('123是' + this.fileList)
      for (var i = 0; i < this.fileList.length; ++i) {
        fd.append('image', this.fileList[i])
        fd.append('index', i.toString())
      }
      // console.log(fd)
      uploadLocalImages(this.clubId, fd).then(response => {
        // console.log(response)
        this.imgsUrl = response.data
        this.$message.success('上传成功')
        this.getClubImgs()
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

<style scoped>
.el-image {
  margin-left: 20px;
}
</style>
