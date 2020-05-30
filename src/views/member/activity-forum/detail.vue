<template>
  <div>
    <el-card>
      <el-card style="margin: 15px 15px;">
        <el-row>
          <el-image
            v-if="detailInfo.avatarUrl !== null"
            style="width: 40px; height: 40px; border-radius: 50%; float: left;"
            :src="detailInfo.avatarUrl"
            lazy
          />
          <img
            v-else
            src="../../../assets/images/default.jpg"
            style="width: 40px; height: 40px; border-radius: 50%; float: left;"
            lazy
          >
          <p style="float: left;">{{ detailInfo.posterName }}</p>
        </el-row>
        <div style="text-align: center;">
          <p style="font-size: 22px; font-weight: bold;">{{ detailInfo.title }}</p>
          <div v-show="detailInfo.imgUrl">
            <el-image
              :src="detailInfo.imgUrl"
            />
          </div>
          <p style="text-indent: 2em; font-size: 20px;line-height: 37px;text-align:left;">{{ detailInfo.content }}</p>
          <p>{{ detailInfo.createAt }}</p>
        </div>
        <div style="text-align:center;">
          <el-tooltip
            class="item"
            effect="dark"
            :content="content"
            placement="top"
          >
            <el-badge
              :value="detailInfo.likeCount"
              class="item"
              type="warning"
            >
              <el-button
                v-if="unlikeShow"
                type="info"
                icon="el-icon-star-off"
                circle
                @click="like()"
              />
              <el-button
                v-else
                type="danger"
                icon="el-icon-star-off"
                circle
                @click="unlike()"
              />
            </el-badge>
          </el-tooltip>
        </div>

        <!-- 折叠评论区 -->
        <el-row>
          <el-badge
            v-show="!showComment"
            :value="detailInfo.commentCount"
            style="display: inline; float: right; cursor: pointer;"
            class="item"
          >
            <p @click="showComment=true;getRemarksListData()">
              查看评论
              <i
                style="display: inline; float: right; cursor: pointer;"
                class="el-icon-s-comment"
              />
            </p>
          </el-badge>
          <p
            v-show="showComment"
            style="display: inline; float: right; cursor: pointer;"
            @click="showComment=false"
          >
            收起评论
            <i
              style="display: inline; float: right; cursor: pointer;"
              class="el-icon-s-comment"
            />
          </p>
        </el-row>
      </el-card>

      <!-- 评论区 -->
      <el-card
        v-show="showComment"
        id="comment"
        style="margin: 15px 15px;"
      >
        <div
          v-for="(item, index) in remarksList"
          :key="index"
        >
          <div @click="viewUserDetail(item.userId)">
            <el-row>
              <el-avatar
                style="float: left;"
                :src="item.avatarUrl"
              />
              <p style="float: left; margin-left: 5px;">{{ item.nickname }}</p>
            </el-row>
          </div>
          <el-row>
            <el-col :span="22">
              <p>{{ item.content }}</p>
              <p>{{ item.createAt }}</p>
            </el-col>
            <!-- 删除评论 -->
            <el-col v-show="item.userId===userId" :span="1">
              <div style="display: inline; float: right; margin: 10px;" @click="showDeletRemark(item)">
                <el-tooltip class="item" effect="dark" content="删除评论" placement="top">
                  <i style="cursor:pointer" class="el-icon-delete icon" />
                </el-tooltip>
              </div>
            </el-col>
          </el-row>
          <el-divider />
        </div>
        <div style="text-align: center;">
          <el-link
            v-if="queryInfo.limit < remarksTotal"
            type="primary"
            @click="viewMoreRemarks"
          >查看更多评论</el-link>
          <p v-else>已加载全部评论</p>
        </div>
        <el-row style="margin-top: 15px;">
          <el-input
            v-model="comment"
            type="textarea"
            placeholder="请发表评论"
            class="input-with-select"
            @keyup.enter.exact.native="sendComment"
            @keyup.ctrl.enter="createLineFeed()"
          />
        </el-row>
        <el-row style="margin-top: 15px;">
          <el-button
            id="postButton"
            type="primary"
            @click="sendComment"
          >发表</el-button>
        </el-row>
      </el-card>
    </el-card>
    <!-- 删除评论 -->
    <el-dialog
      title="提示"
      :visible.sync="deletRemarkVisible"
      width="30%"
    >
      <p>{{ deletRemark.content }}</p>
      <span style="float:right">确认删除该评论吗？</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="deletRemarkVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="deletRemarks(deletRemark.id)"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInvitationDetail } from '@/api/forum'
import { getRemarksList } from '@/api/forum'
import { postComment, deleteRemark } from '@/api/forum'
import { getUserLike } from '@/api/forum'
import { like } from '@/api/forum'
import { unlike } from '@/api/forum'
export default {
  name: 'ActivityDetail',
  data() {
    return {
      content: '',
      id: this.$route.query.id,
      clubId: sessionStorage.getItem('clubId'),
      userId: this.$store.getters.userId,
      queryInfo: {
        page: 1,
        limit: 5,
        sort: 'updateAt',
        order: 'desc'
      },
      detailQuery: {
        type: 1
      },
      likeInfo: {
        likedPostId: this.$route.query.id
      },
      getLikeInfo: {
        postId: this.$route.query.id
      },
      unlikeShow: true,
      detailInfo: {},
      remarksList: [],
      // 评论条数
      remarksTotal: 0,
      clubAvator: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      comment: '',
      showComment: false,
      memberInfo: {},
      deletRemark: { content: '', id: '' },
      deletRemarkVisible: false
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getInvitationDetailData()
    this.getUserLikeData()
  },
  methods: {
    // 获取帖子详情
    getInvitationDetailData() {
      getInvitationDetail(this.id, this.detailQuery).then(response => {
        this.detailInfo = response.data
      })
    },
    getRemarksListData() {
      getRemarksList(this.id, this.queryInfo).then(response => {
        this.remarksList = response.data.items
        this.remarksTotal = response.data.totalCount
      })
    },
    viewMoreRemarks() {
      this.queryInfo.limit += 5
      this.getRemarksListData()
    },
    async sendComment() {
      const data = {
        postId: this.detailInfo.id,
        content: this.comment
      }
      if (data.content === '') {
        this.$message.error('评论不能为空')
      } else {
        await postComment(data).then(response => {
          this.$message.success('发表成功')
        })
        this.comment = ''
        this.getRemarksListData()
        var element = document.getElementById('comment')
        element.scrollIntoView()
      }
    },
    getUserLikeData() {
      getUserLike(this.getLikeInfo).then(response => {
        if (response.status === 200) {
          if (response.data.status === 1) {
            this.content = '取消点赞'
            this.unlikeShow = false
          } else {
            this.content = '点赞'
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
        // console.log(response)
        if (response.status === 204) {
          this.unlikeShow = false
          this.getInvitationDetailData()
          this.content = '取消点赞'
          return this.$message.success('点赞成功')
        } else {
          return this.$message.error('点赞失败')
        }
      })
    },
    // 取消点赞
    unlike() {
      unlike(this.likeInfo).then(response => {
        // console.log(response)
        if (response.status === 204) {
          this.unlikeShow = true
          this.getInvitationDetailData()
          this.content = '点赞'
          return this.$message.success('取消点赞成功')
        } else {
          return this.$message.error('取消点赞失败')
        }
      })
    },
    createLineFeed() {
      // console.log(this.textContent)
      this.textContent = this.textContent + '\n'
    },
    // 显示删除评论对话框
    showDeletRemark(item) {
      this.deletRemark = item
      this.deletRemarkVisible = true
    },
    // 删除评论
    deletRemarks(id) {
      this.deletRemarkVisible = false
      deleteRemark(id).then(response => {
        this.$message.success('删除成功')
        this.getRemarksListData()
      })
    },
    viewUserDetail(userId) {
      this.$router.push({ path: '/clubmember/detail', query: { userId: userId }})
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
