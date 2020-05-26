<template>
  <div>
    <!-- 发布活动的button -->
    <!-- <div
      v-show="btnShow"
      style="text-align:center"
    >
      <p
        style="margin-top:20px;color:blue;float:left;"
        type="primary"
        @click="back"
      >&lt;返回</p>
      <p
        style="margin-top:20px;color:blue;float:right;"
        type="primary"
        @click="addForum"
      >发布动态</p>
    </div> -->
    <!-- 帖子部分 -->
    <el-card style="margin-top:20px">
      <el-button type="primary" style="margin-top:10px;float:left;cursor:pointer;" @click="back">&lt;返回</el-button>
      <el-button type="primary" style="margin-top:10px;float:right;cursor:pointer;" @click="addForum">发布动态</el-button>
      <div
        v-for="(item, key) in forumsList"
        :key="key"
        class="forum"
      >
        <el-row style="align-items: center;display: flex;">
          <!-- 头像 -->
          <el-col :span="2">
            <el-avatar
              :src="item.avatarUrl"
              style="float:left"
            />
          </el-col>
          <!-- 创建时间和发帖者 -->
          <el-col :span="4">
            <p style="font-size:16px">{{ item.posterName }}</p>
            <p
              v-time="item.createAt"
              style=" font-size:12px"
            />
          </el-col>
          <!-- 帖子标题 -->
          <h2 style="margin-top:0 padding: 0">{{ item.title }}</h2>
        </el-row>
        <!-- 删除和修改的按钮 -->
        <el-row>
          <div
            v-show="btnShow"
            style="display:inline;float:right;margin:10px;"
            @click="changeForum(item.id)"
          >
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <i
                style="cursor:pointer"
                class="el-icon-edit icon"
              />
            </el-tooltip>
          </div>
          <div
            style="display:inline;float:right;margin:10px;"
            @click="showDeleteForum(item);dialogVisible = true"
          >
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <i
                style="cursor:pointer"
                class="el-icon-delete icon"
              />
            </el-tooltip>
          </div>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
          >
            <h3>{{ DeleteForum.title }}</h3>
            <p>{{ DeleteForum.content }}</p>
            <span style="float:right">确认删除该帖子吗？</span>
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="deleteForum(DeleteForum.id)"
              >确 定</el-button>
            </span>
          </el-dialog>
        </el-row>
        <el-row v-show="item.imgUrl">
          <!--cursor:pointer,鼠标滑过变成手指-->
          <el-image
            style="width: 100px; height: 100px;"
            :src="item.imgUrl"
            onerror="this.style.display='none'"
            lazy
          />
        </el-row>
        <el-row>
          <p>{{ item.content }}</p>
        </el-row>
        <el-row>
          <el-badge
            :value="item.likeCount"
            class="item"
          >
            <p style="display: inline;float:right;cursor:pointer">
              赞
              <i
                style="display: inline; float:right;cursor:pointer;"
                class="el-icon-star-on"
              />
            </p>
          </el-badge>
          <el-badge
            v-show="!forumsList[key].remarkVisiable"
            style="display: inline;float:right;cursor:pointer"
            :value="item.remark.totalCount"
            class="item"
          >
            <p @click="getRemarkList(item)">
              查看评论
              <i
                style="display: inline; float:right;cursor:pointer"
                class="el-icon-s-comment"
              />
            </p>
          </el-badge>
          <p
            v-show="forumsList[key].remarkVisiable"
            style="display: inline;float:right;cursor:pointer"
            @click="removeRemark(item)"
          >
            收起评论
            <i
              style="display: inline; float:right;cursor:pointer"
              class="el-icon-s-comment"
            />
          </p>

        </el-row>
        <div v-show="forumsList[key].remarkVisiable">
          <div
            v-for="(index, I) in forumsList[key].remark.items"
            :key="I"
            style="box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);border-radius: 5px; padding: 10px"
          >
            <!-- 评论具体内容 -->
            <el-row style="align-items: center;display: flex;background-color: #F2F6FC">
              <!-- 评论头像 -->
              <el-col :span="2">
                <el-avatar
                  :src="index.avatarUrl"
                  style="float:left"
                />
              </el-col>
              <!-- 评论时间和发评论者 -->
              <el-col :span="3">
                <p style="font-size:18px">{{ index.nickname }}</p>
                <p
                  v-time="index.createAt"
                  style=" font-size:10px"
                />
              </el-col>
              <!-- 评论内容 -->
              <p style="margin-top:0 padding: 0; ">{{ index.content }}</p>
            </el-row>
          </div>
          <div style="text-align:center">
            <el-link
              v-if="item.query.limit < item.remark.totalCount"
              type="primary"
              @click="showMoreRemarks(item)"
            >查看更多评论</el-link>
            <p v-else>已加载全部评论</p>
          </div>
        </div>
      </div>

      <!-- 分页区域 -->
      <div style="text-align:center">
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
    <!-- 添加动态 -->
    <el-dialog
      :visible.sync="addForumDialogVisible"
      width="70%"
      center
      modal
    >
      <h2 style="text-align:center;margin-bottom:50px">发布动态</h2>
      <el-form
        ref="publish"
        :model="forumForm"
        :rules="rules"
      >
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input
            v-model="forumForm.title"
            placeholder="请输入标题"
          />
        </el-form-item>
        <el-form-item
          label="内容"
          prop="content"
        >
          <el-input
            v-model="forumForm.content"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="添加图片">
          <el-input
            v-model="forumForm.imgUrl"
            placeholder="请输入图片地址"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="handleForm"
        >发 布</el-button>
      </span>
    </el-dialog>
    <!-- 修改动态 -->
    <el-dialog
      :visible.sync="changeForumDialogVisible"
      width="70%"
      center
      modal
    >
      <h2 style="text-align:center;margin-bottom:50px">Change Forum</h2>
      <el-form
        ref="change"
        :model="forumDetile"
        :rules="rules"
      >
        <el-form-item
          label="title"
          prop="title"
        >
          <el-input v-model="forumDetile.title" />
        </el-form-item>
        <el-form-item
          label="content"
          prop="content"
        >
          <el-input
            v-model="forumDetile.content"
            type="textarea"
            :rows="5"
          />
        </el-form-item>
        <el-form-item label="imgUrl">
          <el-input v-model="forumDetile.imgUrl" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="handleChange(forumDetile.id)"
        >Handle Change</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMyForums, getRemarksList, getInvitationDetail, changeForum, publishForum, deleteForum } from '@/api/forum'
import '../../../../time.js'
export default {
  data() {
    return {
      dialogVisible: false,
      length: 0,
      forumsList: [],
      forumDetile: {},
      remarklist: [],
      DeleteForum: {
        id: '',
        title: '',
        content: ''
      },
      queryInfo: {
        keyword: '',
        page: 1,
        limit: 5,
        type: 0,
        sort: 'created_at',
        order: 'desc'
      },
      total: 0,
      addForumDialogVisible: false,
      changeForumDialogVisible: false,
      originState: 1,
      btnShow: window.sessionStorage.getItem('roles') !== 'chief',
      forumForm: {
        title: '',
        content: '',
        imgUrl: ''
      },
      rules: {
        title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
        content: [{ required: true, trigger: 'blur', message: '请输入具体内容' }]
      }
    }
  },
  created: function () {
    this.getForumsList()
    // console.log(this.remarklist)
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
    getForumsList() {
      getMyForums(this.queryInfo, this.originState).then(response => {
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
          this.getRemarkList(element)
        })
        // console.log(this.remark)
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
        // console.log(element)
        this.$forceUpdate()
        // console.log(element.remark.items)
      })
    },
    addForum() {
      this.addForumDialogVisible = true
    },
    handleForm() {
      this.$refs.publish.validate(valid => {
        if (valid) {
          publishForum(this.forumForm).then(response => {
            this.$message.success('发布成功！')
            this.getForumsList()
            // console.log(this.forumsList)
            this.addForumDialogVisible = false
          })
        } else {
          this.$message.error('发布失败！')
        }
      })
    },
    deleteForum(id) {
      console.log(id)
      deleteForum(id).then(response => {
        if (response.status === 204) {
          this.getForumsList()
          this.$message.success('删除帖子成功')
          // console.log(this.forumsList)
        } else {
          return this.$message.error('删除帖子失败')
        }
      })
      this.dialogVisible = false
    },
    changeForum(id) { // 显示修改界面
      console.log(id)
      this.changeForumDialogVisible = true
      var puery = {
        type: window.sessionStorage.getItem('roles') === 'chief' ? 1 : 0
      }
      getInvitationDetail(id, puery).then(response => {
        // console.log('@forum getInvitationDetail')
        // console.log(response)
        this.forumDetile = response.data
      })
    },
    handleChange(id) {
      this.$refs.change.validate(valid => {
        if (valid) {
          changeForum(id, this.forumDetile).then(response => {
            this.$message.success('修改成功')
            this.getForumsList()
            this.changeForumDialogVisible = false
          })
        }
      })
    },
    removeRemark(element) {
      element.remarkVisiable = false
      this.$forceUpdate()
    },
    back() {
      this.$router.push('/forum/personalPost')
    },
    showDeleteForum(item) {
      this.dialogVisible = true
      this.DeleteForum.id = item.id
      this.DeleteForum.title = item.title
      this.DeleteForum.content = item.content
    },
    showMoreRemarks(item) {
      item.query.limit += 5
      this.$forceUpdate()
      this.getRemarkList(item)
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
