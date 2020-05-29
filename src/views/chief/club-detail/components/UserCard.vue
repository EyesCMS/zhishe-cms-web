<template>
  <el-card style="margin-bottom:20px;">
    <div class="user-profile">
      <div class="box-center">
        <pan-thumb
          :image="form.avatarUrl"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <div>Hello</div>
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ clubinfo.name }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="skill" /><span>头像修改</span></div>

        <div
          class="user-bio-section-body"
          style="text-align:center"
        >
          <el-button
            size="small"
            type="primary"
            icon="el-icon-upload"
            @click="dialogFormVisible = true"
          >上传头像</el-button>
          <el-dialog
            title="修改头像"
            :visible.sync="dialogFormVisible"
          >
            <el-card>
              <el-tabs
                v-model="activeTab"
                @tab-click="changeTab"
              >
                <el-tab-pane
                  label="上传网络照片"
                  name="uploadWeb"
                >
                  <el-form :model="form">
                    <el-form-item
                      label="头像地址"
                      label-width="80px"
                    >
                      <el-input
                        v-model="form.avatarUrl"
                        autocomplete="off"
                        style="width:500px;"
                      />
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane
                  label="上传本地照片"
                  name="uploadLocal"
                >
                  <el-upload
                    :show-file-list="false"
                    accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="form.avatarUrl"
                      :src="form.avatarUrl"
                      class="avatar"
                    >
                    <i
                      v-else
                      class="el-icon-plus avatar-uploader-icon"
                    />
                  </el-upload>
                </el-tab-pane>
              </el-tabs>
            </el-card>
            <div
              v-show="showButtonGroup"
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                dialog-form-visible="false"
                @click="submitProfile()"
              >确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import { submitPic } from '@/api/club'
import { getClubDetail } from '@/api/club'
import { uploadLocalAvatar } from '@/api/club'
export default {
  components: { PanThumb },
  props: {
    clubinfo: {
      type: Object,
      default: () => {
        return {
          name: '',
          chiefName: '',
          avatarUrl: '',
          id: ''
        }
      }
    }
  },
  data() {
    return {
      clubId: window.sessionStorage.getItem('clubId'),
      activeTab: 'uploadWeb',
      imagecropperShow: false,
      imagecropperKey: 0,
      form: {
        avatarUrl: ''
      },
      dialogFormVisible: false,
      showButtonGroup: true
    }
  },
  created() {
    this.getClubDetail()
  },
  methods: {
    // 上传头像
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isJPG && isLt2M) {
        const image = new FormData()
        image.append('image', file)
        uploadLocalAvatar(this.clubId, image).then(response => {
          this.form.avatarUrl = response.data.avatarUrl
          this.$message.success('修改头像成功')
          this.imagecropperShow = false
        })
      }
      // 不自动上传
      return false
    },

    // 提交表单
    submitProfile() {
      // console.log(this.form)
      this.dialogFormVisible = false
      submitPic(this.clubId, this.form).then(response => {
        // console.log(response)
        if (response.status === 204) {
          this.$message.success('修改成功')
        }
      })
      this.getClubDetail()
    },

    // 获取社团信息
    getClubDetail() {
      getClubDetail(this.clubId).then(response => {
        this.form.avatarUrl = response.data.avatarUrl
      })
    },

    // 处理Tab切换
    changeTab(tab, event) {
      if (tab.name === 'uploadLocal') {
        this.showButtonGroup = false
      } else {
        this.showButtonGroup = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 252px;
  height: 252px;
  display: block;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
