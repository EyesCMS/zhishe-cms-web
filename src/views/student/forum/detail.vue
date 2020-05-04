<template>
  <div>
    <el-card>
      <el-row>
        <el-avatar style="float:left" :src="detailInfo.avatarUrl" />
        <p style="float: left">{{ detailInfo.posterName }}</p>
      </el-row>
      <el-image :src="detailInfo.imgUrl" lazy />
      <p>{{ detailInfo.content }}</p>
      <p>{{ detailInfo.createAt }}</p>

      <!-- 评论区 -->
      <el-card>
        <div v-for="(item, index) in remarksList" :key="index">
          <el-row>
            <el-avatar style="float:left" :src="item.avatarUrl" />
            <p style="float: left;margin-left:5px">{{ item.nickname }}</p>
          </el-row>
          <p>{{ item.content }}</p>
          <p>{{ item.createAt }}</p>
          <el-divider />
        </div>
        <div style="text-align:center">
          <el-link v-if="queryInfo.limit < remarksTotal" type="primary" @click="showMoreRemarks">查看更多评论</el-link>
          <p v-else>已加载全部评论</p>
        </div>
        <el-row style="margin-top:15px">
          <el-input
            v-model="comment"
            type="textarea"
            placeholder="请发表评论"
            class="input-with-select"
          />
        </el-row>
        <el-row style="margin-top:15px">
          <el-button id="postButton" type="primary" @click="postComment">发表</el-button>
        </el-row>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { getInvitationDetail } from '@/api/forum'
import { getRemarksList } from '@/api/forum'
import { postComment } from '@/api/forum'
export default {
  name: 'ActivityDetail',
  data() {
    return {
      id: 1,
      userId: 10088,
      queryInfo: {
        page: 1,
        limit: 5,
        sort: 'updateAt',
        order: 'desc'
      },
      detailQuery: {
        type: 1
      },
      detailInfo: {},
      remarksList: [],
      // 评论条数
      remarksTotal: 0,
      clubAvator: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      comment: ''
    }
  },
  created() {
    this.id = this.$route.query.id
    this.userId = this.$store.getters.userid
    this.getInvitationDetail()
    this.getRemarksList()
  },
  methods: {
    // 获取帖子详情
    getInvitationDetail() {
      getInvitationDetail(this.id, this.detailQuery).then(response => {
        this.detailInfo = response.data
        console.log(this.detailInfo)
      })
    },
    getRemarksList() {
      getRemarksList(1, this.queryInfo).then(response => {
        this.remarksList = response.data.items
        this.remarksTotal = response.data.totalCount
        console.log(this.remarksList)
      })
    },
    showMoreRemarks() {
      this.queryInfo.limit += 5
      this.getRemarksList()
    },
    postComment() {
      const data = {
        postId: this.id,
        content: this.comment
      }
      postComment(this.id, data).then(response => {
        console.log(response)
        this.$message.success('发表成功')
      })
      this.comment = ''
      this.getRemarksList()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input {
  margin-bottom: 15px;
}
#postButton {
  display: block;
  margin: 0 auto
}
</style>
