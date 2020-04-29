<template>
  <div>
    <el-card>
      <el-row>
        <el-col>
          <div>
            <h3>社团简介管理</h3>
            <!-- 社团简介表单显示 -->
            <el-form
              :model="clubInfo"
              label-width="100px"
            >
              <!-- 社团名称 -->
              <el-form-item label="社团名称">
                <el-input
                  v-show="change"
                  v-model="clubInfo.name"
                  disabled
                />
              </el-form-item>
              <!-- 社长 -->
              <el-form-item label="社长">
                <el-input v-model="clubInfo.chief_name" />
              </el-form-item>
              <!-- 社团人数 -->
              <el-form-item label="社团人数">
                <el-input v-model="clubInfo.member_count" />
              </el-form-item>
              <!-- 社团qq群 -->
              <el-form-item label="社团QQ群">
                <el-input v-model="clubInfo.qq_group" />
              </el-form-item>
              <!-- 社团简介 -->
              <el-form-item label="简介">
                <textarea
                  v-model="clubInfo.slogan"
                  style="margin: 0px; width: 697px; height: 161px;"
                >社团介绍</textarea>
              </el-form-item>
              <!-- 提交按钮 -->
              <el-form-item>
                <el-button type="primary">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>

      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getClubDetail, dissolution } from '@/api/club'
export default {
  data() {
    return {
      clubInfo: {},
      change: 'false',
      dissolution: {
        clubName: '这是社团名字',
        clubId: 'club_id',
        applicant: '申请人姓名',
        accessoryUrl: '附加地址',
        reason: '没啥原因'
      },
      rules: {
        clubName: [
          { required: true, message: '社团名字不为空', trigger: 'blur' }
        ],
        applicant: [
          { required: true, message: '请输入申请人', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    getClubDetail(2).then(response => {
      console.log(response)
      if (response.items) {
        this.clubInfo = response.items
        // console.log('detile=' + this.clubInfo)
      } else {
        return this.$message.error('获取社团详情失败')
      }
    })
  },
  methods: {
    submitForm() {
      this.$refs.Form.validate(async valid => {
        if (valid) {
          const data = {
            clubId: this.dissolution.clubId,
            applicant: this.dissolution.applicant,
            accessoryUrl: this.dissolution.accessoryUrl,
            reason: this.dissolution.reason
          }
          const result = await dissolution(data)
          console.log(result)
          if (result.Status === 201) {
            this.$message.success('修改成功！')
          } else {
            this.$message.error('修改失败')
          }
        } else this.$message.error('error submit!!')
      })
    }
  }
}
</script>

<style lang="scss" scope>
</style>
