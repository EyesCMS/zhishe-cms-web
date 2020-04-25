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
        <el-form style="margin-top:10px">
          <el-form-item label="发表评论">
            <el-input v-model="remark" type="textarea" />
          </el-form-item>
          <el-button type="primary" style="display:block;margin:0 auto" @click="publishRemark()">发表</el-button>
        </el-form>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { getInvitationDetail } from '@/api/forum'
import { publishRemark } from '@/api/forum'
export default {
  name: 'ActivityDetail',
  data() {
    return {
      id: 1,
      userId: 1,
      queryInfo: {
        page: 1,
        limit: 5,
        sort: 'update_at',
        order: 'desc'
      },
      detailInfo: {},
      clubAvator: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      remark: ''
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
        if (response.status === 200) {
          this.detailInfo = response.data
          console.log(this.detailInfo)
          // console.log(132)
        }
      })
    },
    showMoreRemarks() {
      this.queryInfo.limit += 5
      this.getInvitationDetail()
    },
    publishRemark() {
      if (this.remark === '') {
        return this.$message.error('评论不可为空')
      }
      publishRemark(this.id, {
        uid: this.userId,
        pid: this.id,
        content: this.remark
      }).then(response => {
        if (response.status === 201) {
          this.remark = ''
          return this.$message.success('发表成功')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
