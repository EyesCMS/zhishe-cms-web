<template>
  <div class="app-container">
    <div v-if="clubInfo">
      <el-row :gutter="20">

        <el-col
          :span="6"
          :xs="24"
        >
          <user-card :clubinfo="clubInfo" />
        </el-col>

        <el-col
          :span="18"
          :xs="24"
        >
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane
                label="社团信杯"
                name="account"
              >
                <account :clubinfo="clubInfo" />
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
import UserCard from './components/UserCard'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Account },
  data() {
    return {
      clubInfo: {},
      clubId: window.sessionStorage.getItem('clubId'),
      activeTab: 'account'
    }
  },
  created() {
    this.getClubDetial()
  },
  methods: {
    getClubDetial() {
      this.clubId
      getClubDetail(this.clubId).then(response => {
        console.log('@club-detail getClubDetial reaponse:')
        console.log(response)
        if (response.data) {
          this.clubInfo = response.data
          // console.log('detile=' + this.clubInfo)
        } else {
          return this.$message.error('????????')
        }
      })
    }
  }
}
</script>
