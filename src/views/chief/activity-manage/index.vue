<template>
  <div>
    <el-card>
      <el-card>
        <div>
          <i class="el-icon-search" />
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            type="primary"
            size="small"
            @click="getActivitiesList"
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
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="queryInfo" size="small" label-width="140px">
            <div>
              <el-form-item label="活动名称">
                <el-input v-model="queryInfo.name" style="width: 203px" placeholder="请输入活动名称" />
              </el-form-item>
              <el-form-item label="活动内容">
                <el-input v-model="queryInfo.content" style="width: 203px" placeholder="请输入活动内容" />
              </el-form-item>
              <el-form-item label="活动地点">
                <el-select v-model="queryInfo.location" style="width: 203px" placeholder="请选择活动地点">
                  <el-option label="青春广场" value="青春广场" />
                  <el-option label="生活三区" value="生活三区" />
                  <el-option label="风雨操场" value="风雨操场" />
                </el-select>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="queryInfo" size="small" label-width="140px">
            <div>
              <el-form-item label="活动状态">
                <el-select v-model="queryInfo.state" style="width: 203px" placeholder="请选择活动状态">
                  <el-option label="未审核" value="0" />
                  <el-option label="审核通过" value="1" />
                  <el-option label="已发布" value="2" />
                  <el-option label="审核未通过" value="3" />
                  <el-option label="已结束" value="4" />
                </el-select>
              </el-form-item>
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="queryInfo.startDate"
                  type="datetime"
                  placeholder="选择开始时间"
                  align="right"
                  style="width: 203px"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :picker-options="pickerOptions"
                />
              </el-form-item>
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="queryInfo.endDate"
                  type="datetime"
                  placeholder="选择结束时间"
                  align="right"
                  style="width: 203px"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :picker-options="pickerOptions"
                />
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-card>
      <el-row style="margin-top:20px">
        <el-button type="primary" @click="applyActivity()">申请活动</el-button>
      </el-row>
      <!-- 活动申请列表 -->
      <el-table :data="activitiesList" stripe border>
        <el-table-column type="index" label="#" />
        <el-table-column label="活动名称" prop="name" />
        <el-table-column label="活动时间" width="300px">
          <template slot-scope="scope">
            {{ scope.row.startDate }} - {{ scope.row.endDate }}
          </template>
        </el-table-column>
        <el-table-column label="活动地点" prop="location" />
        <el-table-column label="活动内容">
          <template slot-scope="scope">
            {{ scope.row.content | interceptAbstract }}
          </template>
        </el-table-column>
        <el-table-column label="参与人数" prop="memberCount" />
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
            <el-button type="primary" @click="checkActivityApplyDetail(scope.row.id)">查看</el-button>
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
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" required>
            <el-date-picker
              v-model="addForm.startDate"
              type="datetime"
              placeholder="选择开始时间"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item label="结束时间" required>
            <el-date-picker
              v-model="addForm.endDate"
              type="datetime"
              placeholder="选择结束时间"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
            />
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

      <el-dialog
        title="活动申请详情"
        :visible.sync="applyDetailDialogVisible"
        width="50%"
        center
      >
        <el-form ref="addFormRef" :model="applyDetailForm" label-width="90px">
          <el-form-item label="活动名称">
            <el-input v-model="applyDetailForm.name" disabled />
          </el-form-item>
          <el-form-item label="活动标题">
            <el-input v-model="applyDetailForm.title" disabled />
          </el-form-item>
          <el-form-item label="活动内容">
            <el-input v-model="applyDetailForm.body" type="textarea" disabled />
          </el-form-item>
          <el-form-item label="活动地点">
            <el-input v-model="applyDetailForm.location" disabled />
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker v-model="applyDetailForm.startDate" type="date" placeholder="选择日期" style="width: 90%;" disabled />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker v-model="applyDetailForm.endDate" type="date" placeholder="选择日期" style="width: 90%;" disabled />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-image
            style="width: 600px; height: 500px"
            :src="applyDetailForm.imgUrl"
          />
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="applyDetailDialogVisible = false">确 定</el-button>
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
import { getActivityApplyDetail } from '@/api/club'
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
      clubId: sessionStorage.getItem('clubId'),
      queryInfo: {
        name: '',
        content: '',
        location: '',
        state: '',
        startDate: '',
        endDate: '',
        page: 1,
        limit: 5,
        sort: '',
        order: ''
      },
      applyDetailForm: {},
      total: 0,
      date: [],
      applyActivityDialogVisible: false,
      dialogVisible: false,
      applyDetailDialogVisible: false,
      dialogImageUrl: '',
      addForm: {
        clubId: sessionStorage.getItem('clubId'),
        name: '',
        title: '',
        content: '',
        startDate: '',
        endDate: '',
        location: '',
        imgUrl: ''
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
        ]
        // startDate: [
        //   { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
        // ],
        // endDate: [
        //   { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
        // ]
      },
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      options: [{
        value: '青春广场',
        label: '青春广场'
      }, {
        value: '风雨操场',
        label: '风雨操场'
      }, {
        value: '生活一区',
        label: '生活一区'
      }, {
        value: '生活二区',
        label: '生活二区'
      }, {
        value: '生活三区',
        label: '生活三区'
      }]
    }
  },
  created() {
    // this.clubId = sessionStorage.getItem('clubId')
    this.getActivitiesList()
  },
  methods: {
    getActivitiesList() {
      getActivitiesList(this.clubId, this.queryInfo).then(response => {
        console.log(response)
        this.activitiesList = response.data.items
        this.total = response.totalCount
        console.log(this.activitiesList)
      })
    },
    publishActivity(id, state) {
      const confirmResult = this.$confirm('此操作将发布活动, 是否继续?', '发布确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消发布')
      }
      const input = {
        id: id,
        state: state
      }
      reviseActivityState(input).then(response => {
        this.$message.success('发布成功')
        this.getActivitiesList()
      })
    },
    deleteActivity(id) {
      const confirmResult = this.$confirm('此操作将撤销活动, 是否继续?', '撤销确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消撤销')
      }
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
        console.log(this.addForm)
        publishApply(this.addForm).then(response => {
          this.$message.success('申请成功')
        })
        // console.log(this.addForm)
        this.applyActivityDialogVisible = false
        this.getActivitiesList()
      })
    },
    applyActivityDialogClosed() {
      // this.$refs.addFormRef.resetFields()
      // this.addForm.startDate = this.addForm.endDate = ''
    },
    checkActivityApplyDetail(id) {
      getActivityApplyDetail(id).then(response => {
        this.applyDetailForm = response.data
        console.log('applyDetail为' + this.applyDetailForm)
        this.applyDetailDialogVisible = true
      })
    },
    reset() {
      this.queryInfo.name = this.queryInfo.content = this.queryInfo.location = ''
    }
  }
}
</script>

<style scoped lang="scss">
.el-table {
  margin-top: 20px;
}
.el-pagination {
  // margin-top: 20px;
  margin: 30px 15px;
  text-align:center
}
</style>
