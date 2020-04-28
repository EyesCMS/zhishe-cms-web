<template>
  <div>
    <el-card>
      <el-row style="margin-top:20px">
        <el-button
          type="primary"
          @click="publishAnnouncement()"
        >发布公告</el-button>
      </el-row>
      <!-- 公告列表 -->
      <div
        v-for="(item, index) in bulletinsList"
        :key="index"
      >
        <h2>{{ item.title }}</h2>
        <p>{{ item.create_at }} </p>
        <p>{{ item.content }}</p>
        <el-link
          type="primary"
          @click="openBulletinDetailDiaglog(item.id)"
        >修改</el-link>
        <el-link
          type="primary"
          @click="deleteBulletin(item.id)"
        >删除</el-link>
        <el-divider><i class="el-icon-message-solid" /></el-divider>
      </div>

      <!-- 分页 -->
      <el-pagination
        :current-page="queryInfo.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <!-- 发布公告对话框 -->
      <el-dialog
        title="发布公告"
        :visible.sync="publishAnnouncementDialogVisible"
        width="50%"
        center
        modal
        @close="publishAnnouncementDialogClosed"
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
            prop="content"
          >
            <el-input
              v-model="publishForm.content"
              type="textarea"
            />
          </el-form-item>
        </el-form>
        <el-upload
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          accept="image/gif, image/jpeg"
          :limit="1"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img
            width="100%"
            :src="publishForm.imgUrl"
            alt=""
          >
        </el-dialog>
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
            prop="content"
            label="公告内容"
          >
            <el-input
              v-model="bulletin.content"
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
    </el-card>
  </div>
</template>

<script>
import { getBulletinList, getBulletinDetail, publishBulletin, deleteBulletin, changeBulletinDetail } from '@/api/club'
export default {
  name: 'ActivityManage',
  data() {
    return {
      clubId: 0,
      total: 0,
      queryInfo: {
        keyword: '',
        page: 1,
        limit: 5,
        sort: '',
        order: ''
      },
      bulletin: {},
      bulletinsList: [],
      publishAnnouncementDialogVisible: false,
      bulletinDetailDialogVisible: false,
      dialogVisible: false,
      dialogImageUrl: '',
      publishForm: {
        title: '',
        content: '',
        imgUrl: '',
        publishData: ''
      },
      publishRules: {
        title: [
          { required: true, message: '请输入公告标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入公告内容', trigger: 'blur' }
        ]
      },
      bulletinRules: {
        title: [
          { required: true, message: '请输入公告标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入公告内容', trigger: 'blur' }
        ]
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
          const cid = 0
          this.publishForm.publishData = new Date().toLocaleString()
          console.log(new Date().toLocaleString())
          publishBulletin(cid, this.publishForm).then(response => {
            console.log(response)
            this.$message.success('发布成功')
            this.publishAnnouncementDialogVisible = false
          })
        } else {
          this.$message.error('表单提交失败')
        }
      })
    },
    // 删除公告
    deleteBulletin(id) {
      deleteBulletin(id).then(response => {
        if (response.Status === 204) {
          this.$message.success('删除成功')
          this.getBulletinsList()
        } else {
          this.$message.success('删除失败')
        }
      })
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
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    publishAnnouncementDialogClosed() {
      this.$refs.publishFormRef.resetFields()
    },
    // 获取共公告列表
    getBulletinsList() {
      getBulletinList(this.clubId, this.queryInfo).then(response => {
        // console.log(response)
        this.bulletinsList = response.items
        this.total = response.total_count
        console.log(this.bulletinsList)
        // console.log(this.memberInfo)
      })
    },
    // 点击详情
    openBulletinDetailDiaglog(id) {
      // 发起查询公告详情请求
      getBulletinDetail(this.clubId, id).then(response => {
        console.log(response)
        this.bulletin = response.items
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
          changeBulletinDetail(cid, this.bulletin.id, this.bulletin).then(response => {
            if (response.Status === 204) {
              this.$message.success('修改成功')
              this.bulletinDetailDialogVisible = false
            } else this.$message.error('修改失败')
          })
        } else {
          this.$message.error('提交失败')
        }
      })
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
</style>
