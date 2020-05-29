<template>
  <div>
    <el-card>
      <el-card>
        <div>
          <i class="el-icon-search" />
          <span>筛选搜索</span>
          <el-button
            style="float: right;"
            type="primary"
            size="small"
            @click="searchActivityApplies"
          >
            查询
          </el-button>
          <el-button
            style="float: right; margin-right: 15px;"
            size="small"
            @click="cleanSearchField"
          >
            重置
          </el-button>
        </div>
        <div style="margin-top: 55px;">
          <el-form
            :inline="true"
            :model="queryInfo"
            size="small"
            label-width="140px"
          >
            <div>
              <el-form-item label="活动名称">
                <el-input
                  v-model="queryInfo.name"
                  style="width: 203px;"
                  placeholder="请输入活动名称"
                />
              </el-form-item>
              <el-form-item label="活动内容">
                <el-input
                  v-model="queryInfo.content"
                  style="width: 203px;"
                  placeholder="请输入活动内容"
                />
              </el-form-item>
              <el-form-item label="活动地点">
                <el-select
                  v-model="queryInfo.location"
                  placeholder="请选择活动地点"
                  style="width: 203px;"
                  :clearable="true"
                >
                  <el-option
                    label="青春广场"
                    value="青春广场"
                  />
                  <el-option
                    label="生活三区"
                    value="生活三区"
                  />
                  <el-option
                    label="风雨操场"
                    value="风雨操场"
                  />
                </el-select>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div style="margin-top: 15px;">
          <el-form
            :inline="true"
            :model="queryInfo"
            size="small"
            label-width="140px"
          >
            <div>
              <el-form-item label="活动状态">
                <el-select
                  v-model="queryInfo.state"
                  placeholder="请选择活动状态"
                  style="width: 203px;"
                  :clearable="true"
                >
                  <el-option
                    label="未审核"
                    value="0"
                  />
                  <el-option
                    label="审核通过"
                    value="1"
                  />
                  <el-option
                    label="已发布"
                    value="2"
                  />
                  <el-option
                    label="审核未通过"
                    value="3"
                  />
                  <el-option
                    label="已结束"
                    value="4"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="queryInfo.startDate"
                  type="datetime"
                  placeholder="选择开始时间"
                  align="right"
                  style="width: 203px;"
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
                  style="width: 203px;"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :picker-options="pickerOptions"
                />
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-card>
      <el-row style="margin-top: 20px;">
        <el-button
          type="primary"
          @click="applyActivity()"
        >
          申请活动
        </el-button>
      </el-row>
      <!-- 活动申请列表 -->
      <el-table
        v-loading="listLoading"
        :data="activitiesList"
        stripe
        border
      >
        <el-table-column
          type="index"
          label="#"
        />
        <el-table-column
          label="活动名称"
          prop="name"
        />
        <el-table-column
          label="活动时间"
          width="300px"
        >
          <template slot-scope="scope">
            {{ scope.row.startDate }} - {{ scope.row.endDate }}
          </template>
        </el-table-column>
        <el-table-column
          label="活动地点"
          prop="location"
        />
        <el-table-column label="活动内容">
          <template slot-scope="scope">
            {{ scope.row.content | interceptAbstract }}
          </template>
        </el-table-column>
        <el-table-column
          label="参与人数"
          prop="memberCount"
        />
        <el-table-column
          label="状态"
          prop="state"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.state === 0"
              style="text-align: center;"
              type="warning"
              :disable-transitions="true"
              effect="dark"
            >
              {{ scope.row.state | verifyStatusFilter }}
            </el-tag>
            <el-tag
              v-else-if="scope.row.state === 1"
              type="primary"
              :disable-transitions="true"
              effect="dark"
            >
              {{ scope.row.state | verifyStatusFilter }}
            </el-tag>
            <el-tag
              v-else-if="scope.row.state === 2"
              type="success"
              :disable-transitions="true"
              effect="dark"
            >
              {{ scope.row.state | verifyStatusFilter }}
            </el-tag>
            <el-tag
              v-else-if="scope.row.state === 3"
              type="danger"
              :disable-transitions="true"
              effect="dark"
            >
              {{ scope.row.state | verifyStatusFilter }}
            </el-tag>
            <el-tag
              v-else
              type="info"
              :disable-transitions="true"
              effect="dark"
            >
              {{ scope.row.state | verifyStatusFilter }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200px"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="viewActivityApplyDetail(scope.row.id)"
            >
              查看
            </el-button>
            <el-button
              v-if="scope.row.state === 0"
              type="danger"
              @click="undoActivity(scope.row.id)"
            >
              撤销
            </el-button>
            <el-button
              v-else-if="scope.row.state === 1"
              type="success"
              @click="publishActivity(scope.row.id, 2)"
            >
              发布
            </el-button>
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
          <el-form-item label="参与人数">
            <el-input-number v-model="addForm.memberCount" style="width:200px" :min="1" size="small" label="添加参与人数" />
          </el-form-item>
          <el-form-item label="开始时间" required>
            <el-date-picker
              v-model="addForm.startDate"
              type="datetime"
              placeholder="选择开始时间"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-value="startDateDefaultTime"
              :picker-options="startTimePickerOptions"
            />
          </el-form-item>
          <el-form-item label="结束时间" required>
            <el-date-picker
              v-model="addForm.endDate"
              type="datetime"
              placeholder="选择结束时间"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-value="endDateDefaultTime"
              :picker-options="endTimePickerOptions"
              :disabled="hasStartTime"
            />
          </el-form-item>
        </el-form>
        <p
          v-show="hasImage === true"
          style="color: red;"
        >
          最多上传1张图片
        </p>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="beforeImageUpload"
          :limit="1"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <p v-show="!canApply" style="color: red;">图片上传中，不可申请</p>
          <el-button type="primary" :disabled="!canApply" @click="publishApply">申请</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="活动申请详情"
        :visible.sync="applyDetailDialogVisible"
        width="50%"
        center
      >
        <el-row>
          <h1 style="text-align: center;">{{ applyDetailForm.title }}</h1>
        </el-row>
        <p style="text-indent: 2em;">{{ applyDetailForm.body }}</p>
        <br>
        <br>
        <label>
          名称：
          <el-tag
            type="info"
            style="font-size: 15px;"
          >
            {{ applyDetailForm.name }}
          </el-tag>
        </label>
        <br>
        <br>
        <label>
          地点：
          <el-tag
            type="success"
            style="font-size: 15px;"
          >
            {{ applyDetailForm.location }}
          </el-tag>
        </label>
        <br>
        <br>
        <label>
          时间：
          <el-tag type="warning" style="font-size: 15px;">{{ applyDetailForm.startDate }}</el-tag>
          -
          <el-tag type="warning" style="font-size: 15px;">{{ applyDetailForm.endDate }}</el-tag>
        </label>
        <br>
        <br>
        <label>人数：<el-tag style="font-size: 15px;">{{ applyDetailForm.memberCount }}</el-tag></label>
        <br>
        <br>
        <div align="center">
          <el-image
            style="width: 600px; height: 500px"
            :src="applyDetailForm.imgUrl"
          />
        </div>
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
      listLoading: true,
      activitiesList: [],
      clubId: sessionStorage.getItem('clubId'),
      queryInfo: {
        name: '',
        content: '',
        location: '',
        state: '',
        endDate: '',
        page: 1,
        limit: 5,
        sort: '',
        order: ''
      },
      startDateDefaultTime: '',
      endDateDefaultTime: '',
      applyDetailForm: {},
      total: 0,
      date: [],
      applyActivityDialogVisible: false,
      dialogVisible: false,
      applyDetailDialogVisible: false,
      dialogImageUrl: '',
      hasImage: false,
      canApply: true,
      addForm: {
        clubId: sessionStorage.getItem('clubId'),
        name: '',
        title: '',
        content: '',
        startDate: '',
        endDate: '',
        location: '',
        memberCount: 1,
        imgUrl: ''
      },
      applyData: new FormData(),
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
      startTimePickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      endTimePickerOptions: {
        disabledDate: (time) => {
          const beginDateVal = this.addForm.startDate
          if (beginDateVal) {
            return (
              time.getTime() < new Date(beginDateVal).getTime()
            )
          }
        }
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
  computed: {
    hasStartTime: function() {
      if (this.addForm.startDate !== '') { return false }
      return true
    }
  },
  created() {
    // this.clubId = sessionStorage.getItem('clubId')
    this.getActivitiesListData()
    var currentTime = new Date()
    var nextTime = new Date()
    currentTime.setDate(currentTime.getDate() + 1)
    this.startDateDefaultTime = currentTime
    nextTime.setDate(currentTime.getDate() + 1)
    this.endDateDefaultTime = nextTime
  },
  methods: {
    getActivitiesListData() {
      this.listLoading = true
      getActivitiesList(this.clubId, this.queryInfo).then(response => {
        this.activitiesList = response.data.items
        this.total = response.data.totalCount
        this.listLoading = false
      })
    },

    async publishActivity(id, state) {
      const confirmResult = await this.$confirm('此操作将发布活动, 是否继续?', '发布确认', {
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
      })
      this.getActivitiesListData()
    },

    // 撤销活动点击事件
    async undoActivity(id) {
      const confirmResult = await this.$confirm('此操作将撤销活动, 是否继续?', '撤销确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消撤销')
      }
      deleteActivity(id).then(response => {
        this.$message.success('撤销成功')
        this.getActivitiesListData()
      })
    },

    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getActivitiesListData()
    },

    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getActivitiesListData()
    },

    // 申请活动点击事件
    applyActivity() {
      this.addForm.name = this.addForm.title = this.addForm.content = this.addForm.location = this.addForm.startDate = this.addForm.endDate = ''
      this.addForm.memberCount = 1
      this.applyActivityDialogVisible = true
    },

    // 监听移除活动事件
    handleRemove(file, fileList) {
      this.canApply = true
      this.hasImage = false
    },

    // 监听图片预览事件
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    // 监听上传图片成功事件
    handleSuccess(response, file, fileList) {
      this.canApply = true
      this.hasImage = true
    },

    // 对话框中申请按钮点击事件
    async publishApply() {
      await this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        if (this.addForm.startDate === '') return this.$message.error('请填写开始日期')
        if (this.addForm.endDate === '') return this.$message.error('请填写结束日期')

        this.applyData.append('clubId', this.addForm.clubId)
        this.applyData.append('name', this.addForm.name)
        this.applyData.append('title', this.addForm.title)
        this.applyData.append('content', this.addForm.content)
        this.applyData.append('startDate', this.addForm.startDate)
        this.applyData.append('endDate', this.addForm.endDate)
        this.applyData.append('location', this.addForm.location)
        this.applyData.append('memberCount', this.addForm.memberCount)

        publishApply(this.applyData).then(response => {
          this.$message.success('申请成功')
          this.applyActivityDialogVisible = false
          this.getActivitiesListData()
        })
        // console.log(this.addForm)
      })
    },

    // 监听申请对话框关闭事件
    applyActivityDialogClosed() {
      // this.$refs.addFormRef.resetFields()
      // this.addForm.startDate = this.addForm.endDate = ''
    },

    // 查看活动申请详情
    viewActivityApplyDetail(id) {
      getActivityApplyDetail(id).then(response => {
        this.applyDetailForm = response.data
        this.applyDetailDialogVisible = true
      })
    },

    // 搜索活动申请列表
    searchActivityApplies() {
      this.queryInfo.page = 1
      this.getActivitiesListData()
    },

    // 重置搜索区
    cleanSearchField() {
      this.queryInfo.name = this.queryInfo.content = this.queryInfo.location = ''
      this.queryInfo.state = this.queryInfo.startDate = this.queryInfo.endDate = ''
    },

    // 监听图片上传前事件
    beforeImageUpload(file) {
      this.canApply = false
      const isValid = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'

      if (!isValid) {
        this.$message.error('上传图片只能是 JPG/JPEG/PNG 格式!')
        return
      }
      this.applyData.append('imgUrl', file)
      return true
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
  text-align:center;
}
// .__web-inspector-hide-shortcut__, .__web-inspector-hide-shortcut__ *, .__web-inspector-hidebefore-shortcut__::before, .__web-inspector-hideafter-shortcut__::after {
//     visibility: hidden !important;
// }
.el-date-picker span{
  display: none;
}
</style>
