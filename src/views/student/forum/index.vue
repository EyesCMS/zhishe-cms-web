<template>
  <div>
    <el-card style="margin: 15px 15px;">
      <el-row>
        <i class="el-icon-search">筛选结果</i>
      </el-row>
      <el-row
        style="margin-top: 25px;"
        :gutter="20"
      >
        <el-form
          ref="form"
          :model="queryInfo"
          label-width="80px"
        >
          <el-col :span="10">
            <el-form-item label="社团名">
              <el-input
                v-model="queryInfo.posterName"
                placeholder="请输入社团名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="标题">
              <el-input
                v-model="queryInfo.title"
                placeholder="请输入标题"
              />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row
        style="margin-top: 15px;"
        :gutter="20"
      >
        <el-form
          ref="form"
          :model="queryInfo"
          label-width="80px"
        >
          <el-col :span="10">
            <el-form-item label="内容">
              <el-input
                v-model="queryInfo.content"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="发布日期">
              <el-date-picker
                v-model="queryInfo.createAt"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row style="text-align: center; margin-top: 15px;">
        <el-button
          type="primary"
          @click="searchInvitationList"
        >查询</el-button>
        <el-button
          type="info"
          @click="reset"
        >重置</el-button>
      </el-row>
    </el-card>
    <el-card style="margin: 15px 15px;">
      <h4>共 {{ total }} 条帖子</h4>
      <div
        v-show="total === 0"
        align="center"
        style="margin-top: 100px;"
      >
        <img
          src="../../../assets/images/noContent.png"
          alt="item"
          style="width: 200px; height: 180px;"
        >
        <h2 style="color:silver">暂无帖子</h2>
      </div>
      <el-card
        v-for="(item, index) in AllinvitationsList"
        :key="index"
        style="margin: 20px 100px;"
      >
        <el-row>
          <el-image
            v-if="item.avatarUrl !== null"
            style="width: 40px; height: 40px; border-radius: 50%; float: left;"
            :src="item.avatarUrl"
            lazy
          />
          <img
            v-else
            src="../../../assets/images/default.jpg"
            style="width: 40px; height: 40px; border-radius: 50%; float: left;"
            lazy
          >
          <p style="float: left;">{{ item.posterName }}</p>
        </el-row>
        <div>
          <h2 style="text-align: center; font-size: 25px;">{{ item.title }}</h2>
          <p style="font-size: 15px; text-align: center;">
            <i class="el-icon-date" />
            {{ item.createAt }}
          </p>
          <p style="font-size: 15px; text-align: center;">点赞({{ item.likeCount }}) 评论({{ item.commentCount }})</p>
          <el-divider />
        </div>
        <el-row>
          <div style="margin-left: 20px;">
            <el-image
              v-if="item.imgUrl !== ''"
              :src="item.imgUrl"
              lazy
              style="height: 200px; width: 300px; float: left; margin-right: 40px;"
            />
            <img
              v-else
              src="../../../assets/images/404.jpg"
              lazy
              style="height: 200px; width: 300px; float: left; margin-right: 40px;"
            >
            <div style="margin-right: 20px">
              <p style="float: none; text-indent: 2em; font-size: 20px;text-align: justify; margin-left: 20px; line-height: 37px;">{{ item.content | interceptAbstract }}</p>
            </div>
          </div>
        </el-row>
        <div style="text-align: center; margin-top: 20px;">
          <el-button
            type="primary"
            @click="pushToDetail(item.id)"
          >查看详情</el-button>
        </div>
      </el-card>

      <!-- 分页区域 -->
      <div style="text-align: center;">
        <el-pagination
          v-show="total != 0"
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
import { getAllInvitationListData } from '@/api/forum'
export default {
  name: 'AllActivityForum',
  filters: {
    interceptAbstract(content) {
      if (content.length > 400) {
        return content.substr(0, 400) + '......'
      }
      return content
    }
  },
  data() {
    return {
      clubId: 0,
      queryInfo: {
        type: 1,
        posterName: '',
        title: '',
        content: '',
        createAt: '',
        page: 1,
        limit: 5,
        sort: 'createAt',
        order: 'desc'
      },
      AllinvitationsList: [],
      total: 0,
      fit: 'contain'
    }
  },
  created() {
    this.getAllInvitationListData()
  },
  methods: {
    getAllInvitationListData() {
      getAllInvitationListData(this.queryInfo).then(response => {
        if (response.status === 200) {
          this.AllinvitationsList = response.data.items
          this.total = response.data.totalCount
          return this.$message.success('获取帖子列表成功')
        } else {
          return this.$message.error('获取帖子列表失败')
        }
      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getAllInvitationListData()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getAllInvitationListData()
    },
    // 跳转到帖子详情页面
    pushToDetail(id) {
      this.$router.push({ path: 'activityDetail', query: { id: id }})
    },
    searchInvitationList() {
      this.queryInfo.page = 1
      this.getAllInvitationListData()
    },
    reset() {
      this.queryInfo.posterName = this.queryInfo.title = this.queryInfo.content = this.queryInfo.createAt =
        ''
    }
  }
}
</script>

