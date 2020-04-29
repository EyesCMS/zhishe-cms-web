<template>
  <div>
    <el-card>
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search" />
      </el-input>
      <el-row style="margin-top:20px">
        <el-button type="primary" @click="applyActivity()">申请活动</el-button>
      </el-row>
      <!-- 活动申请列表 -->
      <el-table :data="activitiesList" stripe border>
        <el-table-column type="index" label="#" />
        <el-table-column label="活动名称" prop="name" />
        <el-table-column label="活动时间" width="300px">
          <template slot-scope="scope">
            {{ scope.row.start_date }} - {{ scope.row.end_date }}
          </template>
        </el-table-column>
        <el-table-column label="活动地点" prop="location" />
        <el-table-column label="活动内容">
          <template slot-scope="scope">
            {{ scope.row.content | interceptAbstract }}
          </template>
        </el-table-column>
        <el-table-column label="参与人数" prop="member_count" />
        <el-table-column label="状态" prop="state">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state === 0" style="text-align:center" type="warning" :disable-transitions="true" effect="dark">{{ scope.row.state | verifyStatusFilter }}</el-tag>
            <el-tag v-else-if="scope.row.state === 1" type="primary" :disable-transitions="true" effect="dark">{{ scope.row.state | verifyStatusFilter }}</el-tag>
            <el-tag v-else-if="scope.row.state === 2" type="success" :disable-transitions="true" effect="dark">{{ scope.row.state | verifyStatusFilter }}</el-tag>
            <el-tag v-else-if="scope.row.state === 3" type="danger" :disable-transitions="true" effect="dark">{{ scope.row.state | verifyStatusFilter }}</el-tag>
            <el-tag v-else type="info" :disable-transitions="true" effect="dark">{{ scope.row.state | verifyStatusFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button type="primary">查看</el-button>
            <el-button v-if="scope.row.state === 0" type="danger" @click="deleteActivity(scope.row.id)">撤销</el-button>
            <el-button v-else-if="scope.row.state === 1" type="success" @click="publishActivity(scope.row.id, 2)">发布</el-button>
          </template>
        </el-table-column>
      </el-table>

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
      <!-- 申请活动对话框 -->
      <el-dialog
        title="申请活动"
        :visible.sync="applyActivityDialogVisible"
        width="50%"
        center
        modal
        @close="applyActivityDialogClosed"
      >
        <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="90px">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="addForm.name" />
          </el-form-item>
          <el-form-item label="活动标题" prop="title">
            <el-input v-model="addForm.title" />
          </el-form-item>
          <el-form-item label="活动内容" prop="content">
            <el-input v-model="addForm.content" type="textarea" />
          </el-form-item>
          <el-form-item label="活动地点" prop="location">
            <el-select v-model="addForm.location" placeholder="请选择活动地点">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="startDate">
                <el-date-picker v-model="addForm.startDate" type="date" placeholder="选择日期" style="width: 90%;" />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="endDate">
                <el-date-picker v-model="addForm.endDate" type="date" placeholder="选择日期" style="width: 90%;" />
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="1"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="addForm.imgUrl" alt="">
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="publishApply">申请</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getActivitiesList } from '@/api/club'
import { reviseActivityState } from '@/api/club'
import { deleteActivity } from '@/api/club'
import { publishApply } from '@/api/club'
export default {
  name: 'ActivityManage',
  filters: {
    interceptAbstract(content) {
      return content.substr(0, 10)
    },
    verifyStatusFilter(value) {
      if (value === 0) {
        return '未审核'
      } else if (value === 1) {
        return '审核通过'
      } else if (value === 2) {
        return '已发布'
      } else if (value === 3) {
        return '审核未通过'
      } else {
        return '已结束'
      }
    }
  },
  data() {
    return {
      activitiesList: [],
      clubId: 0,
      queryInfo: {
        keyword: '',
        page: 1,
        limit: 5,
        sort: '',
        order: ''
      },
      total: 0,
      date: [],
      applyActivityDialogVisible: false,
      dialogVisible: false,
      dialogImageUrl: '',
      addForm: {
        clubId: 0,
        name: '',
        title: '',
        content: '',
        startDate: '',
        endDate: '',
        location: '',
        imgUrl: '',
        accessoryUrl: ''
      },
      addFormRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入活动标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入活动内容', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '请输入活动地点', trigger: 'blur' }
        ],
        startDate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        endDate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.clubId = sessionStorage.getItem('clubId')
    this.getActivitiesList()
  },
  methods: {
    getActivitiesList() {
      getActivitiesList(this.clubId, this.queryInfo).then(response => {
        console.log(response)
        this.activitiesList = response.items
        this.total = response.total_count
        console.log(this.activitiesList)
      })
    },
    publishActivity(id, state_id) {
      const input = {
        id: id,
        state_id: state_id
      }
      reviseActivityState(input).then(response => {
        this.$message.success('发布成功')
      })
    },
    deleteActivity(id) {
      deleteActivity(id).then(response => {
        this.$message.success('撤销成功')
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.limit = newSize
      this.getActivitiesList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage
      this.getActivitiesList()
    },
    applyActivity() {
      this.applyActivityDialogVisible = true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    publishApply() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        publishApply(this.addForm).then(response => {
          this.$message.success('申请成功')
        })
        this.applyActivityDialogVisible = false
      })
    },
    applyActivityDialogClosed() {
      this.$refs.addFormRef.resetFields()
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
