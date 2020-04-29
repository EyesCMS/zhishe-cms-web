<template>
  <div>
    <el-button
      type="primary"
      @click="addForum"
    >添加动态</el-button>
    <el-card>
      <div
        v-for="(item, i) in forumsList"
        :key="i"
      >
        <el-row>
          <el-col :span="2">
            <el-avatar style="float:left" />
          </el-col>
          <el-col :span="10">
            <p>{{ item.posterName }}</p>
            <p>{{ item.createAt }}</p>
          </el-col>
          <el-col :span="6">
            <p>{{ item.title }}</p>
          </el-col>
          <el-col :span="10">

            <i
              style="float:right"
              class="el-icon-edit"
            />
            <i
              style="float:right"
              class="el-icon-delete"
              @click="deleteForum"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-image
            src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
            lazy
          />
        </el-row>
        <el-row>
          <p>{{ item.content }}</p>
        </el-row>
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
      <h2 style="text-align:center;margin-bottom:50px">添加动态</h2>
      <el-form>
        <el-form-item label="标题">
          <el-input />
        </el-form-item>
        <el-form-item label="内容">
          <el-input />
        </el-form-item>
        <el-form-item label="添加图片">
          <el-input />
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
  </div>
</template>

<script>
import { getInvitationList } from '@/api/forum'
export default {
  data() {
    return {
      forumsList: [],
      clubId: 0,
      queryInfo: {
        keyword: '',
        page: 1,
        limit: 5,
        sort: 'created_at',
        order: 'desc'
      },
      total: 0,
      addForumDialogVisible: false,
      originState: 1
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
      getInvitationList(this.clubId, this.queryInfo, this.originState).then(response => {
        console.log(response)
        this.forumsList = response.items
        this.total = response.totalCount
      })
    },
    addForum() {
      this.addForumDialogVisible = true
    },
    handleForm() {
      this.addForumDialogVisible = false
    },
    deleteForum() {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
