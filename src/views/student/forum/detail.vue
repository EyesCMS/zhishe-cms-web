<template>
  <div>
    <el-card>
      <el-card style="margin:15px 15px">
        <el-row>
          <el-avatar style="float:left" :src="detailInfo.avatarUrl" />
          <p style="float: left">{{ detailInfo.posterName }}</p>
        </el-row>
        <div style="text-align:center;">
          <p style="font-size:22px;font-weight:bold;">{{ detailInfo.title }}</p>
          <p style="font-size:15px;text-align:center">
            评论({{ detailInfo.commentCount }})
          </p>
          <el-image :src="detailInfo.imgUrl" lazy />
          <p style="text-indent: 2em; font-size: 20px;line-height: 37px;text-align:left">{{ detailInfo.content }}</p>
          <p>{{ detailInfo.createAt }}</p>
        </div>
        <div style="text-align:center;">
          <el-badge :value="detailInfo.likeCount" class="item" type="warning">
            <el-button
              v-if="unlikeShow"
              type="info"
              icon="el-icon-star-off"
              @click="like()"
            />
            <el-button v-else type="danger" icon="el-icon-star-off" @click="unlike()" />
          </el-badge>
        </div>
      </el-card>

      <!-- 评论区 -->
      <el-card id="comment" style="margin:15px 15px">
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
          <el-link
            v-if="queryInfo.limit < remarksTotal"
            type="primary"
            @click="showMoreRemarks"
          >查看更多评论</el-link>
          <p v-else>已加载全部评论</p>
        </div>
        <el-row style="margin-top:15px">
          <el-input
            v-model="comment"
            type="textarea"
            placeholder="请发表评论"
            class="input-with-select"
            @keyup.enter.exact.native="postComment"
            @keyup.ctrl.enter="lineFeed()"
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
import { getUserLike } from '@/api/forum'
import { like } from '@/api/forum'
import { unlike } from '@/api/forum'
export default {
  name: 'ActivityDetail',
  data() {
    return {
      id: this.$route.query.id,
      userId: this.$store.getters.userId,
      queryInfo: {
        page: 1,
        limit: 5,
        sort: 'updateAt',
        order: 'desc'
      },
      likeInfo: {
        likedPostId: this.$route.query.id
      },
      getLikeInfo: {
        postId: this.$route.query.id
      },
      unlikeShow: true,
      detailQuery: {
        type: 1
      },
      detailInfo: {},
      remarksList: [],
      // 评论条数
      remarksTotal: 0,
      clubAvator:
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      comment: ''
    }
  },
  created() {
    this.getInvitationDetail()
    this.getRemarksList()
    this.getUserLike()
  },
  methods: {
    // 获取帖子详情
    getInvitationDetail() {
      getInvitationDetail(this.id, this.detailQuery).then(response => {
        this.detailInfo = response.data
      })
    },
    getRemarksList() {
      getRemarksList(this.id, this.queryInfo).then(response => {
        this.remarksList = response.data.items
        this.remarksTotal = response.data.totalCount
        // console.log(this.remarksList)
      })
    },
    showMoreRemarks() {
      this.queryInfo.limit += 5
      this.getRemarksList()
    },
    async postComment() {
      const data = {
        postId: this.id,
        content: this.comment
      }
      if (data.content === '') {
        this.$message.error('评论不能为空')
      } else {
        await postComment(data).then(response => {
          // console.log(response)
          this.$message.success('发表成功')
        })
        this.comment = ''
        this.getRemarksList()
        var element = document.getElementById('comment')
        element.scrollIntoView()
      }
    },
    getUserLike() {
      getUserLike(this.getLikeInfo).then(response => {
        if (response.status === 200) {
          if (response.data.status === 1) {
            this.unlikeShow = false
          } else {
            this.unlikeShow = true
          }
        } else {
          return this.$message.error('获取点赞信息失败')
        }
      })
    },
    // 点赞
    like() {
      like(this.likeInfo).then(response => {
        console.log(response)
        if (response.status === 204) {
          this.unlikeShow = false
          this.getInvitationDetail()
          return this.$message.success('点赞成功')
        } else {
          return this.$message.error('点赞失败')
        }
      })
    },
    // 取消点赞
    unlike() {
      unlike(this.likeInfo).then(response => {
        console.log(response)
        if (response.status === 204) {
          this.unlikeShow = true
          this.getInvitationDetail()
          return this.$message.success('取消点赞成功')
        } else {
          return this.$message.error('取消点赞失败')
        }
      })
    },
    back() {
      this.$router.go(-1)
    },
    // shift+enter换行
    lineFeed () {
      this.textContent = this.textContent + '\n'
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
  margin: 0 auto;
}
</style>
