<template>
  <div>
    <!-- 发布活动的button -->
    <div v-show="btnShow">
      <el-button
        type="primary"
        @click="addForum"
      >添加动态</el-button>
    </div>
    <!-- 帖子部分 -->
    <el-card style="margin-top:30px">
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
          <el-col :span="3">
            <p style="font-size:14px">{{ item.posterName }}</p>
            <p style=" font-size:5px">{{ item.createAt }}</p>
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
            <i class="el-icon-edit icon" />
          </div>
          <div
            style="display:inline;float:right;margin:10px;"
            @click="deleteForum(item.id)"
          >
            <i class="el-icon-delete icon" />
          </div>
        </el-row>

        <el-row>
          <el-image
            :src="item.imgUrl"
            lazy
          />
        </el-row>
        <el-row>
          <p>{{ item.content }}</p>
        </el-row>
        <el-row>
          <i
            style="display: inline; float:right"
            class="el-icon-s-comment"
            @click="getRemarkList(item.id)"
          />
        </el-row>
        <div
          v-for="(index, I) in remarklist"
          v-show="index.id === item.id"
          :key="I"
          style="box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);border-radius: 5px; padding: 10px"
        >
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
              <p style="font-size:14px">{{ index.nickname }}</p>
              <p style=" font-size:5px">{{ index.createAt }}</p>
            </el-col>
            <!-- 帖子标题 -->
            <p style="margin-top:0 padding: 0; ">{{ index.content }}</p>
          </el-row>
        </div>

      </div>

      <!-- 分页区域 -->
      <el-pagination
        :current-page="queryInfo.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 添加动态 -->
    <el-dialog
      :visible.sync="addForumDialogVisible"
      width="70%"
      center
      modal
    >
      <h2 style="text-align:center;margin-bottom:50px">发帖</h2>
      <el-form
        ref="publish"
        :model="forumForm"
        :rules="rules"
      >
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input v-model="forumForm.title" />
        </el-form-item>
        <el-form-item
          label="内容"
          prop="content"
        >
          <el-input
            v-model="forumForm.content"
            type="textarea"
            :rows="5"
          />
        </el-form-item>
        <el-form-item label="添加图片">
          <el-input v-model="forumForm.imgUrl" />
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
import { getInvitationList, getRemarksList, getInvitationDetail, changeForum, publishForum, deletForum } from '@/api/forum'
export default {
  data() {
    return {
      forumsList: [],
      forumDetile: {},
      remarklist: [],
      clubId: 10000,
      queryInfo: {
        keyword: '',
        page: 1,
        limit: 5,
        type: window.sessionStorage.getItem('roles') === 'chief' ? 1 : 0,
        sort: 'created_at',
        order: 'desc'
      },
      total: 0,
      addForumDialogVisible: false,
      changeForumDialogVisible: false,
      originState: 1,
      btnShow: window.sessionStorage.getItem('roles') !== 'chief',
      forumForm: {
        title: '这是标题',
        content: '这是内容',
        imgUrl: '这是图片路径'
      },
      rules: {
        title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
        content: [{ required: true, trigger: 'blur', message: '请输入具体内容' }]
      }
    }
  },
  created: function () {
    this.getForumsList()
    console.log(this.remarklist)
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
      getInvitationList(this.clubId, this.queryInfo, this.originState).then(response => {
        console.log('@club forum-mamage getForumsList response')
        console.log(response)
        this.forumsList = response.data.items
        this.total = response.data.totalCount
        return response.data.items
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
            this.addForumDialogVisible = false
          })
        } else {
          this.$message.error('发布失败！')
        }
      })
    },
    deleteForum(id) {
      deletForum(id)
      this.getForumsList()
      this.$message.success('删除帖子')
    },
    getRemarkList(id) {
      getRemarksList(id, this.queryInfo).then(response => {
        console.log('@forun getRemarkList response')
        console.log(response)
        console.log(id)
        this.remarklist = response.data.items
        this.remarklist.forEach(element => {
          element['id'] = id
        })
        console.log(this.remarklist)
      })
    },
    changeForum(id) { // 显示修改界面
      this.changeForumDialogVisible = true
      var puery = {
        type: window.sessionStorage.getItem('roles') === 'chief' ? 1 : 0
      }
      getInvitationDetail(id, puery).then(response => {
        console.log('@forum getInvitationDetail')
        console.log(response)
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
  width: 75%;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 15px;
}
</style>
