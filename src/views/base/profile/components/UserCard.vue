<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>关于我</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="form.avatarUrl" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello</div>
          {{ user.role }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <!--<div class="user-role text-center text-muted">{{ user.role }}</div>-->
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>头像修改</span></div>

        <div class="user-bio-section-body" style="text-align:center">
          <!--<el-button type="primary" icon="el-icon-upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">
            上传头像图片
          </el-button>
          <el-dialog title="上传头像图片" :visible.sync="imagecropperShow">
            <el-upload
              :show-file-list="false"
              accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-dialog>-->
          <el-button size="small" type="primary" icon="el-icon-upload" @click="dialogFormVisible = true">上传头像</el-button>
          <el-dialog title="修改头像" :visible.sync="dialogFormVisible">
            <el-card>
              <el-tabs v-model="activeTab">
                <el-tab-pane
                  label="上传网络照片"
                  name="uploadWeb"
                >
                  <el-form :model="form">
                    <el-form-item label="头像地址" label-width="80px">
                      <el-input v-model="form.avatarUrl" autocomplete="off" style="width:500px;" />
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="上传本地照片" name="uploadLocal">
                  <el-upload
                    :show-file-list="false"
                    accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                    :before-upload="beforeAvatarUpload"
                    action=""
                  >
                    <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-tab-pane>
              </el-tabs>
            </el-card>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" dialog-form-visible="false" @click="submitProfile()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import { submitProfile } from '@/api/user'
import { getInfo } from '@/api/user'
import { uploadAvatar } from '@/api/user'
export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          nickname: this.$store.getters.nickname,
          email: this.$store.getters.email,
          address: this.$store.getters.address,
          role: this.$store.getters.role,
          major: this.$store.getters.major,
          phone: this.$store.getters.phone,
          slogan: this.$store.getters.slogan
        }
      }
    }
  },
  data() {
    return {
      activeTab: 'uploadWeb',
      imagecropperShow: false,
      imagecropperKey: 0,
      form: {
        avatarUrl: ''
      },
      dialogFormVisible: false
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
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
        const fd = new FormData()
        fd.append('image', file)
        uploadAvatar(fd).then(response => {
          this.form.avatarUrl = response.data.avatarUrl
          this.$message.success('修改头像成功')
          this.imagecropperShow = false
          // FIXME: 修改成功后右上角的头像没有变化
        })
      }

      // 不自动上传
      return false
    },
    submitProfile() {
      // console.log(this.form.avatarUrl)
      this.dialogFormVisible = false
      submitProfile(this.form).then(response => {
        // console.log(response)
        if (response.status === 204) {
          this.$message.success('修改成功')
        }
      })
      this.getInfo()
    },
    getInfo() {
      getInfo().then(response => {
        this.form.avatarUrl = response.data.avatar
      })
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
  border-color: #409EFF;
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
