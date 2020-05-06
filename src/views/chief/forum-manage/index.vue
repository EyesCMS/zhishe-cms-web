<template>
  <div>
    <!-- 发布活动的button -->
    <div
      v-show="btnShow"
      style="text-align:center"
    >
      <el-button
        style="margin-top:20px;"
        type="primary"
        @click="myForum"
      >我的帖子</el-button>
    </div>
    <!-- 帖子部分 -->
    <el-card style="margin-top:20px">
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
            <p style=" font-size:12px">{{ item.createAt }}</p>
          </el-col>
          <!-- 帖子标题 -->
          <h2 style="margin-top:0 padding: 0">{{ item.title }}</h2>
        </el-row>
        <el-row>
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
          <el-form
            ref="remark"
            :model="remark"
            :rules="remarkRules"
          >
            <el-form-item prop="content">
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
                    @click="publishRemark(item.id)"
                  />
                </el-input>
                <el-input
                  v-if="remark.id===item.id"
                  v-model="remark.content"
                  placeholder="发表评论"
                  class="input-with-select"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-position"
                    @click="publishRemark(item.id)"
                  />
                </el-input>
              </div>
            </el-form-item>
          </el-form>

        </el-row>
        <el-row>
          <p
            style="display: inline;float:right;cursor:pointer"
            @click="getRemarkList(item.id)"
          >
            查看评论
            <i
              style="display: inline; float:right;cursor:pointer"
              class="el-icon-s-comment"
            />
          </p>
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
              <p style="font-size:18px">{{ index.nickname }}</p>
              <p style=" font-size:10px">{{ index.createAt }}</p>
            </el-col>
            <!-- 评论内容 -->
            <p style="margin-top:0 padding: 0; ">{{ index.content }}</p>
          </el-row>
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
  </div>
</template>

<script>
import { getRemarksList, getForumList, postComment } from '@/api/forum'
export default {
  data() {
    return {
      dialogVisible: false,
      length: {},
      forumsList: [],
      forumDetile: {},
      remarklist: [],
      clubId: window.sessionStorage.getItem('clubId') ? window.sessionStorage.getItem('clubId') : this.$store.getters.userId,
      queryInfo: {
        keyword: '',
        page: 1,
        limit: 5,
        type: window.sessionStorage.getItem('roles') === 'chief' ? 1 : 0,
        sort: 'created_at',
        order: 'desc'
      },
      remark: {
        content: '',
        id: ''
      },
      remarkRules: {
        content: [{ required: true, trigger: 'blur', message: '请输入评论' }]
      },
      total: 0,
      originState: 1,
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
    getForumsList() {
      console.log(this.queryInfo)
      getForumList(this.queryInfo, this.originState).then(response => {
        console.log('@club forum-mamage getForumsList response')
        console.log(response)
        this.forumsList = response.data.items
        this.forumsList.forEach(element => {
          element['remark'] = { content: 'dfa' }
        })
        // console.log(this.remark)
        this.total = response.data.totalCount
        return response.data.items
      })
    },
    getRemarkList(id) {
      getRemarksList(id, this.queryInfo).then(response => {
        console.log('@forum index getRemarkList response')
        console.log(response)
        response.data.items.forEach(Element => {
          var check = false
          Element['id'] = id
          this.remarklist.forEach(element => {
            if (this.deepEquals(element, Element)) {
              check = true
            }
          })
          if (!check) {
            this.remarklist.push(Element)
          }
        })
        this.length = this.remarklist.length
        console.log(this.remarklist)
      })
    },
    publishRemark(id) {
      if (this.remark.content !== '') {
        this.remark['postId'] = id
        postComment(this.remark).then(response => {
          this.$message.success('发表成功')
          this.getRemarkList(id)
          this.remark.content = ''
        })
      }
    },
    state(id) {
      this.remark.id = id
    },
    deepEquals(x, y) {
      if (x.createAt === y.createAt && x.content === y.content && x.id === y.id) return true
      else return false
    },
    myForum() {
      this.$router.push('/forumManage/manage')
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
