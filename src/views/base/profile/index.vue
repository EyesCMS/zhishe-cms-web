<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="个人信息" name="account">
                <account :user="user" />
              </el-tab-pane>
              <el-tab-pane label="修改密码" name="changePassword">
                <changePassword />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import ChangePassword from './components/ChangePassword'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Account, ChangePassword },
  data() {
    return {
      user: {},
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters(['nickname', 'avatar', 'major', 'slogan', 'phone', 'role'])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.$store.getters.name,
        nickname: this.$store.getters.nickname,
        role: this.$store.getters.roles,
        email: this.$store.getters.email,
        address: this.$store.getters.address,
        avatar: this.$store.getters.avatar,
        major: this.$store.getters.major,
        phone: this.$store.getters.phone,
        slogan: this.$store.getters.slogan
      }
    }
  }
}
</script>
