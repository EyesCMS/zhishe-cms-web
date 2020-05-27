<template>
  <div>
    <el-card>
      <el-row style="margin-top:30px; width:60%">
        <el-button
          type="primary"
          @click="publishAnnouncement()"
        >发布公告</el-button>
      </el-row>
      <div v-show="total === 0" align="center" style="margin-top:100px;">
        <img src="../../../assets/images/noContent.png" alt="item" style="width:200px;height:180px;">
        <h2 style="color:silver">暂无公告</h2>
      </div>
      <!-- 公告列表 -->
      <div
        v-for="(item, index) in bulletinsList"
        :key="index"
        class="bulletions"
      >
        <h2>{{ item.title }}</h2>
        <p>{{ item.createAt }}</p>
        <p>{{ item.body }}</p>
        <el-link
          type="primary"
          style="float:right;margin-left:5px"
          @click="openBulletinDetailDiaglog(item.id)"
        >修改</el-link>
        <el-link
          type="primary"
          style="float:right;margin-left:5px"
          @click="showDelete(item)"
        >删除</el-link>
      </div>

      <!-- 分页 -->
      <div v-show="total != 0" style="text-align:center;margin-top: 10px;">
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
      <!-- 发布公告对话框 -->
      <el-dialog
        title="发布公告"
        :visible.sync="publishAnnouncementDialogVisible"
        width="50%"
        center
        modal
        @closed="publishAnnouncementDialogClosed"
      >
        <el-form
          ref="publishFormRef"
          :model="publishForm"
          :rules="publishRules"
          label-width="90px"
        >
          <el-form-item
            label="公告标题"
            prop="title"
          >
            <el-input v-model="publishForm.title" />
          </el-form-item>
          <el-form-item
            label="公告内容"
            prop="body"
          >
            <el-input
              v-model="publishForm.body"
              :rows="5"
              type="textarea"
            />
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="publishBulletin"
          >发 布</el-button>
        </span>
      </el-dialog>
      <!-- 修改公告框 -->
      <el-dialog
        title="修改公告"
        :visible.sync="bulletinDetailDialogVisible"
        width="55%"
        center
        modal
      >
        <el-form
          ref="changeForm"
          :model="bulletin"
          :rules="bulletinRules"
          label-width="90px"
        >
          <el-form-item
            prop="title"
            label="公告标题"
          >
            <el-input v-model="bulletin.title" />
          </el-form-item>
          <el-form-item
            prop="body"
            label="公告内容"
          >
            <el-input
              v-model="bulletin.body"
              rows="5"
              type="textarea"
            />
          </el-form-item>
          <el-form-item>
            <span class="dialog-footer">
              <el-button
                type="primary"
                @click="changeBulletinDetail"
              >确 定</el-button>
            </span>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 删除对话框 -->
      <el-dialog
        title="删除公告"
        :visible.sync="delteAnnouncementDialogVisible"
        width="50%"
        center
        modal
      >
        <h3>{{ DeleteBulletin.title }}</h3>
        <p>{{ DeleteBulletin.createAt }}</p>
        <p>{{ DeleteBulletin.body }}</p>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="deleteBulletin(DeleteBulletin.id)"
          >确认删除</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  listBulletins,
  getBulletinDetail,
  publishBulletin,
  deleteBulletin,
  changeBulletinDetail
} from '@/api/club'
export default {
  name: 'ActivityManage',
  data() {
    return {
      clubId: window.sessionStorage.getItem('clubId'),
      total: 0,
      queryInfo: {
        keyword: '',
        page: 1,
        limit: 5,
        sort: '',
        order: ''
      },
      bulletin: {},
      DeleteBulletin: {
        title: '',
        body: '',
        createAt: '',
        id: ''
      },
      bulletinsList: [],
      publishAnnouncementDialogVisible: false,
      bulletinDetailDialogVisible: false,
      delteAnnouncementDialogVisible: false,
      dialogVisible: false,
      dialogImageUrl: '',
      publishForm: {
        title: '',
        body: ''
      },
      publishRules: {
        title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
        body: [{ required: true, message: '请输入公告内容', trigger: 'blur' }]
      },
      bulletinRules: {
        title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
        body: [{ required: true, message: '请输入公告内容', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getBulletinsList()
  },
  methods: {
    // 发布公告test
    publishBulletin() {
      this.$refs.publishFormRef.validate(valid => {
        if (valid) {
          console.log('@publishBulletin clubId ' + this.clubId)
          publishBulletin(this.clubId, this.publishForm).then(response => {
            console.log(response)
            this.$message.success('发布成功')
            this.getBulletinsList()
            this.publishAnnouncementDialogVisible = false
          })
        } else {
          this.$message.error('表单提交失败')
        }
      })
    },
    showDelete(item) {
      this.delteAnnouncementDialogVisible = true
      this.DeleteBulletin.title = item.title
      this.DeleteBulletin.body = item.body
      this.DeleteBulletin.createAt = item.createAt
      this.DeleteBulletin.id = item.id
    },
    // 删除公告
    deleteBulletin(id) {
      deleteBulletin(id).then(response => {
        this.$message.success('删除成功')
        this.getBulletinsList()
      })
      this.delteAnnouncementDialogVisible = false
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.limit = newSize
      this.getBulletinsList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getBulletinsList()
    },
    // 显示出发布公告界面
    publishAnnouncement() {
      this.publishAnnouncementDialogVisible = true
    },
    // 获取共公告列表
    getBulletinsList() {
      listBulletins(this.clubId, this.queryInfo).then(response => {
        console.log('@announcement-mamage getBulletinList:')
        console.log(response)
        this.bulletinsList = response.data.items
        this.total = response.data.totalCount
      })
    },
    // 点击详情
    openBulletinDetailDiaglog(id) {
      // 发起查询公告详情请求
      getBulletinDetail(this.clubId, id).then(response => {
        console.log('@announcement-mamage openBulletinDetailDiaglog:')
        console.log(response)
        this.bulletin = response.data
        this.bulletin['id'] = id
        // console.log('123' + response.data)
        // console.log('公告是' + this.bulletin)
        // console.log(this.memberInfo)
      })
      this.bulletinDetailDialogVisible = true
    },
    // 改变公告
    changeBulletinDetail(id) {
      this.$refs.changeForm.validate(valid => {
        if (valid) {
          const cid = this.clubId
          this.bulletin.update_at = new Date().toLocaleString()
          changeBulletinDetail(cid, this.bulletin.id, this.bulletin).then(
            response => {
              this.$message.success('修改成功')
              this.bulletinDetailDialogVisible = false
              this.getBulletinsList()
            }
          )
        } else {
          this.$message.error('提交失败')
        }
      })
    },
    publishAnnouncementDialogClosed() {
      this.publishForm.title = this.publishForm.body = ''
    }
  }
}
</script>

<style scoped lang="scss">
.el-table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
}
.bulletions {
  width: 80%;
  margin: 30px auto;
  padding: 20px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
</style>
