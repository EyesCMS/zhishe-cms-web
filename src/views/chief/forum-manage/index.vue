<template>
  <div>
    <!-- 帖子部分 -->
    <el-card style="margin-top:20px;">
      <el-button
        type="primary"
        style="margin-top:10px;float:right;cursor:pointer;"
        @click="myForum"
      >我的帖子></el-button>
      <div
        v-show="total === 0"
        align="center"
        style="margin-top:100px;"
      >
        <img
          src="../../../assets/images/noContent.png"
          alt="item"
          style="width:200px;height:180px;"
        >
        <h2 style="color:silver">暂无帖子</h2>
      </div>
      <div
        v-for="(item, key) in forumsList"
        :key="key"
        class="forum"
      >
        <!-- 头像标题啥的 -->
        <el-row style="align-items: center;display: flex;">
          <!-- 头像 -->
          <el-col :span="3">
            <el-avatar
              :src="item.avatarUrl"
              style="float:left;"
            />
          </el-col>
          <!-- 创建时间和发帖者 -->
          <el-col :span="4">
            <p style="font-size:16px">{{ item.posterName }}</p>
            <p
              v-time="item.createAt"
              style=" font-size:12px;"
            />
          </el-col>
          <!-- 帖子标题 -->
          <h2 style="margin-top:0; padding: 0;">{{ item.title }}</h2>
        </el-row>
        <!-- 图片 -->
        <el-row v-show="item.imgUrl">
          <!--cursor:pointer,鼠标滑过变成手指-->
          <el-image
            style="width: 100px; height: 100px;"
            :src="item.imgUrl"
            onerror="this.style.display='none'"
            lazy
          />
        </el-row>
        <!-- 具体内容 -->
        <el-row>
          <p>{{ item.content }}</p>
        </el-row>
        <!-- 评论列表 -->
        <el-row>
          <!-- 发表评论 -->
          <el-form
            ref="remark"
            :model="forumsList[key]"
          >
            <el-form-item>
              <div style="margin-top: 15px;">
                <el-input
                  v-if="remark.id!==item.id"
                  placeholder="发表评论"
                  class="input-with-select"
                  @focus="state(item.id)"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-position"
                  />
                </el-input>
                <el-input
                  v-if="remark.id===item.id"
                  v-model="remark.content"
                  placeholder="发表评论"
                  class="input-with-select"
                  @keyup.enter.native="publishRemark(item)"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-position"
                    @click="publishRemark(item)"
                  />
                </el-input>
              </div>
            </el-form-item>
          </el-form>
        </el-row>
        <!-- 查看评论 -->
        <el-row>
          <el-badge
            v-show="!forumsList[key].remarkVisiable"
            :value="forumsList[key].remark.totalCount"
            style="display: inline;float:right;cursor:pointer;"
            class="item"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="查看评论"
              placement="top"
            >
              <p @click="getRemarkList(item)">
                <i
                  style="display: inline; float:right;cursor:pointer;"
                  class="el-icon-s-comment"
                />
              </p>
            </el-tooltip>
          </el-badge>
          <el-tooltip
            class="item"
            effect="dark"
            content="收起评论"
            placement="top"
          >
            <p
              v-show="forumsList[key].remarkVisiable"
              style="display: inline;float:right;cursor:pointer;"
              @click="removeRemark(item)"
            >
              <i
                style="display: inline; float:right;cursor:pointer;"
                class="el-icon-s-comment"
              />
            </p>
          </el-tooltip>
          <el-badge
            :value="item.likeCount"
            :max="99"
            class="item"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="点赞"
              placement="top"
            >
              <p
                v-show="!forumsList[key].status"
                style="display: inline;float:right;cursor:pointer;background:#DCDFE6;padding:4px;border-radius:2px;"
              >
                <i
                  style="display: inline; float:right;cursor:pointer;"
                  class="el-icon-star-on"
                  @click="likeForum(item)"
                />
              </p>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="取消点赞"
              placement="top"
            >
              <p
                v-show="forumsList[key].status"
                style="display: inline;float:right;cursor:pointer;background:#DCDFE6;padding:4px;border-radius:2px;"
              >
                <i
                  style="display: inline; float:right;cursor:pointer;color:blue;"
                  class="el-icon-star-on"
                  @click="unlikeForum(item)"
                />
              </p>
            </el-tooltip>
          </el-badge>
          <div v-show="forumsList[key].remarkVisiable">
            <div
              v-for="(index, I) in forumsList[key].remark.items"
              :key="I"
              style="box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);border-radius: 5px; padding: 10px;"
            >
              <!-- 评论具体内容 -->
              <el-row style="align-items: center;display: flex;background-color: #F2F6FC;">
                <!-- 评论头像 -->
                <el-col :span="3">
                  <el-avatar
                    :src="index.avatarUrl"
                    style="float:left;"
                  />
                </el-col>
                <!-- 评论时间和发评论者 -->
                <el-col :span="3">
                  <p style="font-size:18px;">{{ index.nickname }}</p>
                  <p
                    v-time="index.createAt"
                    style=" font-size:10px;"
                  />
                </el-col>
                <el-col :span="17">
                  <!-- 评论内容 -->
                  <p style="margin-top:0; padding: 0; ">{{ index.content }}</p>
                </el-col>
                <el-col
                  v-show="index.userId===uid"
                  :span="2"
                >
                  <div
                    style="display:inline;float:right;margin:10px;"
                    @click="showDeletRemark(index)"
                  >
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="删除评论"
                      placement="top"
                    >
                      <i
                        style="cursor:pointer"
                        class="el-icon-delete icon"
                      />
                    </el-tooltip>
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-col>
              <div style="text-align:center;">
                <el-pagination
                  :ref="item.content"
                  :current-page="item.query.page"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-count="5"
                  :page-size="item.query.limit"
                  layout="total, prev, pager, next"
                  :total="item.remark.totalCount"
                  @current-change="remarkCurrentChange(item)"
                />
              </div>
            </el-col>
          </div>
        </el-row>
      </div>

      <!-- 分页区域 -->
      <div
        v-show="total != 0"
        style="text-align:center;"
      >
        <el-pagination
          :current-page="queryInfo.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="queryInfo.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
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
import {
  getRemarksList,
  getForumList,
  postComment,
  getUserLike,
  like,
  unlike,
  deleteRemark
} from '@/api/forum'
import '../../../../time.js'
export default {
  data() {
    return {
      uid: this.$store.getters.userId,
      dialogVisible: false,
      deletRemarkVisible: false,
      length: {},
      forumsList: [],
      forumDetile: {},
      remarklist: [],
      clubId: window.sessionStorage.getItem('clubId')
        ? window.sessionStorage.getItem('clubId')
        : this.$store.getters.userId,
      queryInfo: {
        keyword: '',
        page: 1,
        limit: 5,
        type: window.sessionStorage.getItem('roles') === 'chief' ? 1 : 0,
        sort: 'created_at',
        order: 'desc'
      },
      deletRemark: { content: '', id: '' },
      remark: {
        content: '',
        id: ''
      },
      total: 0,
      btnShow: true
    }
  },
  created: function () {
    this.getForumsList()
  },
  methods: {
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.limit = newSize
      this.getForumsList()
    },
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.page = newPage
      this.getForumsList()
    },
    remarkCurrentChange(item) {
      // console.log(newPage)
      // console.log(item.query)
      // console.log(this.$refs[item.content][0].internalCurrentPage)
      item.query.page = this.$refs[item.content][0].internalCurrentPage
      this.$forceUpdate
      // console.log(item.query)
      this.getRemarkList(item)
      // console.log(this.remarkQuery)
      // this.queryInfo.page = newPage
      // this.getForumsList()
    },
    // 获取帖子列表
    getForumsList() {
      getForumList(this.queryInfo, this.originState).then(response => {
        // console.log('@club forum-mamage getForumsList response')
        // console.log(response)
        this.forumsList = response.data.items
        this.total = response.data.totalCount
        this.forumsList.forEach(element => {
          element['query'] = {
            page: 1,
            limit: 5
          }
          element['remark'] = {
            items: null,
            totalCount: 0
          }
          element['remarkVisiable'] = true
          this.getUserLike(element)
          this.getRemarkList(element)
        })
        // console.log(this.forumsList)
        // this.total = response.data.totalCount
        // return response.data.items
      })
    },
    // 获取评论列表
    getRemarkList(element) {
      // console.log('@getRemarkList element')
      // console.log(element.remark.items)
      element.remarkVisiable = true
      this.$forceUpdate()
      getRemarksList(element.id, element.query).then(response => {
        // console.log('@forum index getRemarkList response')
        // console.log(response)
        element.remark = response.data
        this.$forceUpdate()
      })
    },
    // 发表评论
    publishRemark(element) {
      // console.log(element)
      if (this.remark.content !== '') {
        this.remark['postId'] = element.id
        postComment(this.remark).then(response => {
          this.remark.content = ''
          getRemarksList(element.id, element.query).then(response => {
            // console.log('@forum index publish response')
            // console.log(response)
            element.remark = response.data
            this.$forceUpdate()
          })
        })
      }
    },
    state(id) {
      this.remark.content = ''
      this.remark.id = id
    },
    myForum() {
      this.$router.push('/forum/postManage')
    },
    removeRemark(element) {
      element.remarkVisiable = false
      this.$forceUpdate()
    },
    getUserLike(element) {
      // 获取当前用户是否对帖子点赞
      const data = { postId: element.id }
      getUserLike(data).then(response => {
        // console.log('@getUserLike response:')
        // console.log(response)
        element['status'] = response.data.status
      })
    },
    likeForum(element) {
      element.likeCount++
      this.$forceUpdate()
      const data = { likedPostId: element.id }
      like(data).then(response => {
        // console.log('@likeForum response:')
        // console.log(response)
        element['status'] = 1
        this.$forceUpdate()
      })
    },
    unlikeForum(element) {
      element.likeCount--
      this.$forceUpdate()
      const data = { likedPostId: element.id }
      unlike(data).then(response => {
        // console.log('@unlikeForum response:')
        // console.log(response)
        element['status'] = 0
        this.$forceUpdate()
      })
    },
    showMoreRemarks(item) {
      item.query.limit += 5
      this.$forceUpdate()
      this.getRemarkList(item)
    },
    showDeletRemark(index) {
      console.log(index)
      this.deletRemark = index
      this.deletRemarkVisible = true
    },
    deletRemarks(id) {
      this.deletRemarkVisible = false
      deleteRemark(id).then(response => {
        this.$message.success(response)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  line-height: 100%;
}
el-col {
  text-align: center;
}
.forum {
  margin: 30px auto;
  margin-bottom: 50px;
  width: 60%;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 15px;
}
</style>
