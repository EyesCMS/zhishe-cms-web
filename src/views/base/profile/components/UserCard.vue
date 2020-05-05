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
        <div class="user-role text-center text-muted">{{ user.role }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>头像修改</span></div>
        <div class="user-bio-section-body" style="text-align:center">
          <el-button size="small" type="primary" @click="dialogFormVisible = true">点击上传</el-button>
          <el-dialog title="上传头像" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="头像地址" :label-width="formLabelWidth">
                <el-input v-model="form.avatarUrl" autocomplete="off" />
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitProfile();dialogFormVisible = false">确 定</el-button>
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
      form: {
        avatarUrl: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    submitProfile() {
      console.log(this.form.avatarUrl)
      submitProfile(this.form).then(response => {
        console.log(response)
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
