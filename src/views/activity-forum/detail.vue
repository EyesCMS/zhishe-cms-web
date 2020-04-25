<template>
  <div>
    <el-card>
      <el-row>
        <el-avatar style="float:left" :src="detailInfo.avator_url" />
        <p style="float: left">{{ detailInfo.club_name }}</p>
      </el-row>
      <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" lazy />
      <p>{{ detailInfo.content }}</p>
      <p>{{ detailInfo.create_at }}</p>
      <el-card>
        <div v-for="(item, index) in detailInfo.remarks" :key="index">
          <el-row>
            <el-avatar style="float:left" :src="item.avator_url" />
            <p style="float: left;margin-left:5px">{{ item.nickname }}</p>
          </el-row>
          <p>{{ item.content }}</p>
          <p>{{ item.create_at }}</p>
          <el-divider />
        </div>
        <div style="text-align:center">
          <el-link type="primary" @click="showMoreRemarks">查看更多评论</el-link>
        </div>
        <el-input
          placeholder="请发表评论"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { getInvitationDetail } from '@/api/forum'
export default {
  name: 'ActivityDetail',
  data() {
    return {
      id: 1,
      queryInfo: {
        page: 1,
        limit: 5,
        sort: 'update_at',
        order: 'desc'
      },
      detailInfo: {},
      clubAvator: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },
  created() {
    // this.id = this.$route.query.id
    console.log(this.id)
    this.getInvitationDetail()
  },
  methods: {
    // 获取帖子详情
    getInvitationDetail() {
      getInvitationDetail(this.id, this.queryInfo).then(response => {
        this.detailInfo = response.items
        console.log(this.detailInfo)
        // console.log(132)
      })
    },
    showMoreRemarks() {
      this.queryInfo.limit += 5
      this.getInvitationDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
