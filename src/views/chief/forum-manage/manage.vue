<template>
  <div>
    <!-- 帖子部分 -->
    <el-card style="margin-top:20px">
      <el-button
        type="primary"
        style="margin-top:10px;float:left;cursor:pointer;"
        @click="back"
      >返回</el-button>
      <el-button
        type="primary"
        style="margin-top:10px;float:right;cursor:pointer;"
        @click="addForum"
      >发布动态</el-button>
      <div
        v-for="(item, key) in forumsList"
        :key="key"
        class="forum"
      >
        <!-- 帖子主体 -->
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
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
            >
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
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <i
                style="cursor:pointer"
                class="el-icon-delete icon"
              />
            </el-tooltip>
          </div>
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
        <!-- 帖子内容 -->
        <el-row>
          <p>{{ item.content }}</p>
        </el-row>
        <el-row>
          <!-- 点赞数 -->
          <el-badge
            :value="item.likeCount"
            class="item"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="点赞数"
              placement="top"
            >
              <p style="display: inline;float:right;cursor:pointer">
                <i
                  style="display: inline; float:right;cursor:pointer;"
                  class="el-icon-star-on"
                />
              </p>
            </el-tooltip>
          </el-badge>
          <!-- 查看评论 -->
          <el-badge
            v-show="!forumsList[key].remarkVisiable"
            style="display: inline;float:right;cursor:pointer"
            :value="item.remark.totalCount"
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
                  style="display: inline; float:right;cursor:pointer"
                  class="el-icon-s-comment"
                />
              </p>
            </el-tooltip>
          </el-badge>
          <!-- 收起评论 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="收起评论"
            placement="top"
          >
            <p
              v-show="forumsList[key].remarkVisiable"
              style="display: inline;float:right;cursor:pointer"
              @click="removeRemark(item)"
            >

              <i
                style="display: inline; float:right;cursor:pointer"
                class="el-icon-s-comment"
              />
            </p>
          </el-tooltip>
          <!-- 评论列表 -->
          <div v-show="forumsList[key].remarkVisiable">
            <div
              v-for="(index, I) in forumsList[key].remark.items"
              :key="I"
              style="box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);border-radius: 5px; padding: 10px"
            >
              <!-- 评论具体内容 -->
              <el-row style="align-items: center;display: flex;background-color: #F2F6FC">
                <!-- 评论头像 -->
                <el-col :span="3">
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
                <el-col :span="17">
                  <p style="margin-top:0 padding: 0; ">{{ index.content }}</p>
                </el-col>
                <el-col
                  v-show="index.userId===userId"
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
            <!-- 评论分页 -->
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
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="beforeImgUpload"
            :on-remove="handleRemove"
            :on-preview="handlePreview"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button
              v-show="fileList.length !== 1"
              size="small"
              type="primary"
            >点击上传</el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
          @click="deletRemarks(deletRemark)"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除帖子 -->
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
  </div>
</template>

<script>
import { getMyForums, getRemarksList, getInvitationDetail, changeForum, publishForum, deleteForum, deleteRemark } from '@/api/forum'
import '../../../../time.js'
export default {
  data() {
    return {
      userId: this.$store.getters.userId,
      dialogVisible: false,
      deletRemarkVisible: false,
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
        image: ''
      },
      rules: {
        title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
        content: [{ required: true, trigger: 'blur', message: '请输入具体内容' }]
      },
      deletRemark: { content: '', id: '' },
      fileList: []
    }
  },
  created: function () {
    this.getForumsList()
    // console.log(this.remarklist)
  },
  methods: {
    // 页面limit改变
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.limit = newSize
      this.getForumsList()
    },

    // 页面page改变
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getForumsList()
    },

    // 评论page改变
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
      getMyForums(this.queryInfo, this.originState).then(response => {
        // console.log('@club forum-mamage getForumsList response')
        // console.log(response)
        // console.log(this.queryInfo)
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
        if (response.status === 200) {
          element.remark = response.data
          // console.log(element)
          this.$forceUpdate()
          // console.log(element.remark.items)
        }
      })
    },

    // 显示发布帖子
    addForum() {
      this.addForumDialogVisible = true
    },

    // 提交发布帖子
    handleForm() {
      this.$refs.publish.validate(valid => {
        if (valid) {
          const formData = new FormData()
          // formData.append('data', postParam)
          // console.log(this.forumForm)
          formData.append('title', this.forumForm.title)
          formData.append('content', this.forumForm.content)
          formData.append('image', this.forumForm.image)
          // console.log(data)
          publishForum(formData).then(response => {
            this.$message.success('发布成功！')
            this.getForumsList()
            this.addForumDialogVisible = false
          }).catch(e => {
            console.log(e)
          })
        } else {
          this.$message.error('发布失败！')
        }
      })
    },

    // 删除帖子
    deleteForum(id) {
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

    // 修改帖子
    changeForum(id) { // 显示修改界面
      // console.log(id)
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

    // 提交修改
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

    // 隐藏评论
    removeRemark(element) {
      element.remarkVisiable = false
      this.$forceUpdate()
    },

    // 跳转到个人贴
    back() {
      this.$router.push('/forum/personalPost')
    },

    // 显示删除帖子
    showDeleteForum(item) {
      this.dialogVisible = true
      this.DeleteForum.id = item.id
      this.DeleteForum.title = item.title
      this.DeleteForum.content = item.content
    },

    // 显示删除评论对话框
    showDeletRemark(index) {
      // console.log(index)
      this.deletRemark = index
      this.deletRemarkVisible = true
    },

    // 删除评论
    deletRemarks(item) {
      this.deletRemarkVisible = false
      deleteRemark(item.id).then(response => {
        this.getForumsList()
        this.$forceUpdate()
      })
    },

    // 删除图片
    handleRemove(file, fileList) {
      this.fileList.splice(file)
      console.log(file, fileList)
    },

    // 点击图片
    handlePreview(file) {
      console.log(this.fileList)
      // console.log(file)
    },

    // 上传图片之前
    beforeImgUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isJPG && isLt2M) {
        this.fileList.push(file.file)
        // const image = new FormData()
        // image.append('image', file)
        this.forumForm.image = file
        // console.log(image)
        // console.log(this.forumForm)
      }
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
