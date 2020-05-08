<template>
  <div>
    <el-card style="margin: 15px 15px">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          size="small"
          @click="handleSearchList"
        >
          查询
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          size="small"
          @click="reset"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 55px">
        <el-form :inline="true" :model="queryInfo" size="small" label-width="140px">
          <div>
            <el-form-item label="帖子标题">
              <el-input v-model="queryInfo.title" style="width: 203px" placeholder="请输入帖子标题" />
            </el-form-item>
            <el-form-item label="帖子内容">
              <el-input v-model="queryInfo.content" style="width: 203px" placeholder="请输入帖子内容" />
            </el-form-item>
            <el-form-item label="发布日期">
              <el-date-picker
                v-model="queryInfo.createAt"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                style="width: 100%;"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>
    <el-card style="margin: 15px 15px">
      <h4>共搜索到 {{ total }} 条帖子</h4>
      <p v-show="total === 0" style="text-align: center">暂无帖子</p>
      <el-card v-for="(item, index) in invitationsList" :key="index" style="margin:20px 100px">
        <el-row>
          <el-avatar style="float:left" :src="item.avatarUrl" />
          <p style="float: left">{{ item.posterName }}</p>
        </el-row>
        <div>
          <h2 style="text-align:center;font-size: 25px">{{ item.title }}</h2>
          <p style="font-size:15px;text-align:center">
            <i class="el-icon-date" />
            {{ item.createAt }}
          </p>
          <el-divider />
        </div>
        <el-row>
          <div style="margin-left:20px">
            <el-image :src="item.imgUrl" lazy style="height:200px;width:300px;float:left;" />
            <div style="margin-right:20px">
              <p
                style="float:none; text-indent: 2em; font-size: 20px;text-align:justify"
              >{{ item.content | interceptAbstract }}</p>
            </div>
          </div>
        </el-row>
        <div style="text-align:center;margin-top:20px">
          <el-button type="primary" @click="pushToDetail(item.id)">查看详情</el-button>
        </div>
      </el-card>

      <!-- 分页区域 -->
      <el-pagination
        :current-page="queryInfo.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin: 25px 15px;text-align:center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import { getInvitationList } from '@/api/forum'
export default {
  name: 'ActivityForum',
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
      clubId: sessionStorage.getItem('clubId'),
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
      invitationsList: [],
      total: 0,
      fit: 'contain'
    }
  },
  created() {
    this.getInvitationsList()
  },
  methods: {
    getInvitationsList() {
      getInvitationList(this.clubId, this.queryInfo).then(response => {
        this.invitationsList = response.data.items
        this.total = response.data.totalCount
      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getInvitationsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getInvitationsList()
    },

    // 跳转到帖子详情页面
    pushToDetail(id) {
      this.$router.push({ path: 'detail', query: { id: id }})
    },
    queryInvitation() {
      this.getInvitationsList()
      this.queryInfo.keyword = ''
    },
    handleSearchList() {
      this.queryInfo.page = 1
      this.getInvitationsList()
    },
    reset() {
      this.queryInfo.posterName = this.queryInfo.title = this.queryInfo.content = this.queryInfo.createAt =
        ''
    }
  }
}
</script>

<style scoped lang="scss">
</style>
